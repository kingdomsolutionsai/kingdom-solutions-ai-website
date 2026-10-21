/**
 * Build in the Right Order™ video experience.
 *
 * Completely independent of the live webinar registration pipeline.
 * Visitors request a link, verify control of their email by opening it,
 * and only then can the browser request playback details.
 *
 * Brevo records verified viewing in its OWN lists. Marketing permission is
 * explicit and optional; access alone is not a newsletter subscription.
 */
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";
import type { Request, Response } from "express";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./_core/trpc";
import { escapeHtml, sendBrevoEmail } from "./brevo";

const BREVO_API = "https://api.brevo.com/v3";
const FOLDER = "KSAI Video Experiences";
const VERIFIED_LIST = "KSAI Video Experience: Verified Access";
const OPT_IN_LIST = "KSAI Video Experience: Optional Updates";
const EXPIRY_MS = 14 * 24 * 60 * 60 * 1000;
const COOLDOWN_MS = 45 * 1000;
const VIDEO_FILENAME = "Build_In_Right_Order_Website_Approved.mp4";
function videoPath(): string {
  return path.resolve(process.cwd(), process.env.NODE_ENV === "production" ? "dist/private_media" : "server/private_media", VIDEO_FILENAME);
}
const lastRequest = new Map<string, number>();

type TicketData = {
  v: 1; firstName: string; email: string; source: string;
  marketingConsent: boolean; expiresAt: number;
};

function accessSecret(): Buffer {
  const secret = process.env.VIDEO_ACCESS_SECRET || process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Video access is not configured yet.",
    });
  }
  return createHash("sha256").update(secret).digest();
}

function issueTicket(data: TicketData): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", accessSecret(), iv);
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(data), "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), ciphertext]).toString("base64url");
}

function readTicket(ticket: string): TicketData {
  try {
    const buf = Buffer.from(ticket, "base64url");
    if (buf.length < 32 || buf.length > 4096) throw Error("Invalid ticket size");
    const decipher = createDecipheriv("aes-256-gcm", accessSecret(), buf.subarray(0, 12));
    decipher.setAuthTag(buf.subarray(12, 28));
    const parsed = JSON.parse(Buffer.concat([
      decipher.update(buf.subarray(28)), decipher.final(),
    ]).toString("utf8")) as TicketData;
    if (parsed.v !== 1 || !Number.isFinite(parsed.expiresAt) ||
        parsed.expiresAt < Date.now() || parsed.expiresAt > Date.now() + EXPIRY_MS ||
        !z.string().email().safeParse(parsed.email).success ||
        !z.string().min(1).max(80).safeParse(parsed.firstName).success ||
        typeof parsed.marketingConsent !== "boolean" ||
        !z.string().max(60).safeParse(parsed.source).success) {
      throw Error("Invalid ticket payload");
    }
    return parsed;
  } catch {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "This access link is invalid or has expired. Request a fresh link.",
    });
  }
}

async function brevo<T>(method: "GET" | "POST", path: string, body?: unknown): Promise<T> {
  const key = process.env.BREVO_API_KEY;
  if (!key) throw Error("BREVO_API_KEY is not configured");
  const response = await fetch(BREVO_API + path, {
    method,
    headers: {
      "api-key": key, accept: "application/json",
      ...(body ? { "content-type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(12000),
  });
  const data = (await response.text()).trim();
  if (!response.ok) {
    throw Error("Brevo status " + response.status + ": " + data.slice(0, 160));
  }
  return (data ? JSON.parse(data) : {}) as T;
}

async function ensureFolder(): Promise<number> {
  for (let offset = 0; offset < 500; offset += 50) {
    const res = await brevo<{ folders: { id: number; name: string }[] }>(
      "GET", `/contacts/folders?limit=50&offset=${offset}`
    );
    const found = res.folders?.find(f => f.name === FOLDER);
    if (found) return found.id;
    if ((res.folders?.length ?? 0) < 50) break;
  }
  const res = await brevo<{ id: number }>("POST", "/contacts/folders", { name: FOLDER });
  return res.id;
}

async function ensureList(name: string, folderId: number): Promise<number> {
  for (let offset = 0; offset < 500; offset += 50) {
    const res = await brevo<{ lists: { id: number; name: string }[] }>(
      "GET", `/contacts/lists?limit=50&offset=${offset}`
    );
    const found = res.lists?.find(l => l.name === name);
    if (found) return found.id;
    if ((res.lists?.length ?? 0) < 50) break;
  }
  const res = await brevo<{ id: number }>("POST", "/contacts/lists", { name, folderId });
  return res.id;
}

async function recordVerifiedAccess(data: TicketData): Promise<void> {
  const folderId = await ensureFolder();
  const listIds = [await ensureList(VERIFIED_LIST, folderId)];
  if (data.marketingConsent) listIds.push(await ensureList(OPT_IN_LIST, folderId));
  const attrs = await brevo<{ attributes: { name: string }[] }>("GET", "/contacts/attributes");
  if (!attrs.attributes?.some(a => a.name.toUpperCase() === "VIDEO_SOURCE")) {
    try {
      await brevo("POST", "/contacts/attributes/normal/VIDEO_SOURCE", { type: "text" });
    } catch (error) {
      if (!String(error).includes("exist")) throw error;
    }
  }
  await brevo("POST", "/contacts", {
    email: data.email, updateEnabled: true, listIds,
    attributes: { FIRSTNAME: data.firstName, VIDEO_SOURCE: data.source },
  });
}

const inputSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  source: z.string().trim().max(60).default("website"),
  marketingConsent: z.boolean().default(false),
  // Honeypot: bots that complete this hidden field do not trigger email.
  companyUrl: z.string().max(200).default(""),
}).strict();

export const videoExperienceRouter = router({
  availability: publicProcedure.query(() => ({ ready: existsSync(videoPath()) })),
  requestAccess: publicProcedure.input(inputSchema).mutation(async ({ input }) => {
    if (!existsSync(videoPath())) {
      throw new TRPCError({ code: "PRECONDITION_FAILED", message: "The video is not yet available. Please check back soon." });
    }
    if (input.companyUrl) return { success: true };
    const now = Date.now();
    // Avoid repeated transactional-email blasts. Harmless across restarts.
    const key = input.email.toLowerCase();
    if ((lastRequest.get(key) ?? 0) > now - COOLDOWN_MS) return { success: true };
    // Never allow the browser to choose a malicious confirmation-link host.
    const baseUrl = "https://www.kingdomsolutionsai.com";
    const ticket = issueTicket({
      v: 1, firstName: input.firstName, email: key,
      source: input.source.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 60) || "website",
      marketingConsent: input.marketingConsent, expiresAt: now + EXPIRY_MS,
    });
    const link = `${baseUrl}/video-experience/watch?ticket=${encodeURIComponent(ticket)}`;
    lastRequest.set(key, now);
    const sent = await sendBrevoEmail({
      to: { email: key, name: input.firstName },
      subject: "Confirm your Build in the Right Order™ video access",
      htmlContent: `
        <div style="background:#111114;color:#f8f4eb;padding:36px 30px;font-family:Arial,sans-serif;max-width:560px;margin:auto">
          <p style="color:#c9a358;font-size:12px;letter-spacing:2px">KINGDOM SOLUTIONS AI™</p>
          <h1 style="font-size:28px;font-weight:500;line-height:1.25">Your private learning experience</h1>
          <p>Hi ${escapeHtml(input.firstName)},</p>
          <p>Thank you for requesting <strong>Build in the Right Order™</strong>. Confirm your email to watch the selected teaching experience from my October 20 webinar.</p>
          <p style="margin:34px 0"><a href="${link}" style="display:inline-block;background:#c9a358;color:#111114;padding:15px 22px;text-decoration:none;font-weight:bold">Confirm and watch</a></p>
          <p style="font-size:13px;color:#d5caba">Your link is valid for 14 days. If you did not request it, simply ignore this email.</p>
          <p style="border-top:1px solid #76643f;padding-top:20px;font-size:13px">Tabitha Rector · Kingdom Solutions AI™</p>
        </div>`,
    });
    if (!sent) {
      lastRequest.delete(key);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR",
        message: "We couldn't send your access email. Please try again shortly." });
    }
    return { success: true };
  }),
  redeemAccess: publicProcedure.input(z.object({
    ticket: z.string().min(20).max(4096),
  })).mutation(async ({ input }) => {
    const data = readTicket(input.ticket);
    try {
      await recordVerifiedAccess(data);
    } catch (error) {
      // Email verification succeeded. Do not lock people out if Brevo is down.
      console.error("[Video experience] Verified access could not sync to Brevo:", error);
    }
    const ready = existsSync(videoPath());
    return {
      firstName: data.firstName, ready,
      videoUrl: ready ? `/api/video-experience/stream?ticket=${encodeURIComponent(input.ticket)}` : "",
      marketingConsent: data.marketingConsent,
    };
  }),
});

/**
 * Serve the MP4 directly from a private (not web-accessible) build directory.
 * Range support is required for normal browser seeking/playback. Only a
 * ticket delivered to a verified mailbox grants access.
 */
export function streamPrivateVideo(req: Request, res: Response): void {
  const ticket = typeof req.query.ticket === "string" ? req.query.ticket : "";
  if (!ticket || ticket.length > 4096) {
    res.status(403).send("A verified email link is required.");
    return;
  }
  try {
    readTicket(ticket);
  } catch {
    res.status(403).send("This viewing link has expired. Please request a new one.");
    return;
  }
  const file = videoPath();
  if (!existsSync(file)) {
    res.status(404).send("The preview is not available yet.");
    return;
  }
  const size = statSync(file).size;
  res.setHeader("Content-Type", "video/mp4");
  res.setHeader("Content-Disposition", 'inline; filename="Build-In-The-Right-Order-Preview.mp4"');
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Accept-Ranges", "bytes");

  const range = req.headers.range;
  if (!range) {
    res.status(200).setHeader("Content-Length", String(size));
    createReadStream(file).on("error", () => res.destroy()).pipe(res);
    return;
  }
  // Single byte-range only; reject malformed or out-of-bounds requests.
  const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  const start = m && m[1] ? Number(m[1]) : m && m[2] ? Math.max(0, size - Number(m[2])) : NaN;
  const end = m && m[1] && m[2] ? Number(m[2]) : size - 1;
  if (!m || !Number.isSafeInteger(start) || !Number.isSafeInteger(end) ||
      start < 0 || start >= size || end < start) {
    res.status(416).setHeader("Content-Range", `bytes */${size}`);
    res.end();
    return;
  }
  const last = Math.min(end, size - 1);
  res.status(206);
  res.setHeader("Content-Range", `bytes ${start}-${last}/${size}`);
  res.setHeader("Content-Length", String(last - start + 1));
  createReadStream(file, { start, end: last }).on("error", () => res.destroy()).pipe(res);
}
