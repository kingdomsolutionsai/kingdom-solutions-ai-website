/**
 * Brevo transactional email helpers.
 *
 * All outbound mail for the site funnels through sendBrevoEmail(), which
 * calls Brevo's transactional email API directly (no SDK). Every template
 * function below builds the htmlContent string for one specific email;
 * sendBrevoEmail() itself is transport-only and knows nothing about which
 * form triggered it.
 *
 * User-submitted values are escaped with escapeHtml() before being
 * interpolated into any template, since this content comes straight from
 * public forms.
 */

import { assessmentResultLabel, type AssessmentResult } from "../shared/entrepreneurAssessment";
import { nextQuarterLabel } from "../shared/const";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const SENDER = { email: "tabitha@kingdomsolutionsai.com", name: "Kingdom Solutions AI" };

export function escapeHtml(value: string | undefined | null): string {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface SendBrevoEmailOptions {
  to: { email: string; name: string };
  subject: string;
  htmlContent: string;
  replyToEmail?: string;
  replyToName?: string;
}

export async function sendBrevoEmail(options: SendBrevoEmailOptions): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("[Brevo] BREVO_API_KEY not configured — skipping email send.");
    return false;
  }

  try {
    const body: Record<string, unknown> = {
      sender: SENDER,
      to: [{ email: options.to.email, name: options.to.name }],
      subject: options.subject,
      htmlContent: options.htmlContent,
    };

    if (options.replyToEmail) {
      body.replyTo = { email: options.replyToEmail, name: options.replyToName || options.replyToEmail };
    }

    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("[Brevo] Email send failed:", response.status, errorText);
      return false;
    }

    console.log(`[Brevo] Email sent successfully to ${options.to.email}`);
    return true;
  } catch (error) {
    console.error("[Brevo] Email send request failed:", error);
    return false;
  }
}

function emailWrapper(bodyHtml: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      ${bodyHtml}
      <p style="margin-top: 32px; font-size: 12px; color: #888;">Kingdom Solutions AI™ · kingdomsolutionsai.com</p>
    </div>
  `;
}

export function formatCapacityLeakAuditEmail(data: {
  firstName: string;
  lastName?: string;
  email: string;
  role?: string;
  company?: string;
  challenge?: string;
  calendarText?: string;
}): string {
  const calendarBlock = data.calendarText
    ? `
      <p style="margin-top: 20px;"><strong>Representative Week (Step 2):</strong></p>
      <p style="white-space: pre-wrap; background: #f7f7f7; border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px;">${escapeHtml(data.calendarText)}</p>
    `
    : "";

  return emailWrapper(`
    <h2>New Capacity Leak Audit Submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Role:</strong> ${escapeHtml(data.role) || "—"}</p>
    <p><strong>Company/Ministry:</strong> ${escapeHtml(data.company) || "—"}</p>
    <p><strong>Biggest Time Challenge:</strong><br/>${escapeHtml(data.challenge) || "—"}</p>
    ${calendarBlock}
  `);
}

export function formatCapacityLeakAuditParticipantEmail(data: { firstName: string }): string {
  return emailWrapper(`
    <h2>Thank you, ${escapeHtml(data.firstName)}!</h2>
    <p>Your Capacity Leak Audit™ has been received. You'll hear back with your personalized results within 24 hours.</p>
  `);
}

export function formatCapacityLeakAuditResultsEmail(data: { firstName: string; auditText: string }): string {
  const paragraphs = data.auditText
    .split(/\n{2,}/)
    .map((p) => `<p style="margin: 0 0 14px;">${escapeHtml(p.trim())}</p>`)
    .join("");

  return emailWrapper(`
    <h2>${escapeHtml(data.firstName)}, your Capacity Leak Audit™ results</h2>
    <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background: #fafafa; margin-top: 12px;">
      ${paragraphs}
    </div>
    <p style="margin-top: 20px;">If it would help to walk through this together, you can always reach out directly.</p>
  `);
}

export function formatClarityProIntakeEmail(data: {
  firstName: string;
  email: string;
  clarityNeed?: string;
  background?: string;
}): string {
  return emailWrapper(`
    <h2>New Clarity Pro™ Intake Submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.firstName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Clarity Need:</strong><br/>${escapeHtml(data.clarityNeed) || "—"}</p>
    <p><strong>Background:</strong><br/>${escapeHtml(data.background) || "—"}</p>
  `);
}

export function formatClarityProParticipantEmail(data: { firstName: string }): string {
  return emailWrapper(`
    <h2>Welcome, ${escapeHtml(data.firstName)}!</h2>
    <p>Your clarity journey begins now. We'll be in touch shortly with next steps.</p>
  `);
}

export function formatContactEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return emailWrapper(`
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
    <p><strong>Message:</strong><br/>${escapeHtml(data.message)}</p>
  `);
}
export function formatAssessmentEmail(data: {
  firstName: string;
  email: string;
  result: AssessmentResult;
}): string {
  return emailWrapper(`
    <h2>Entrepreneur Next Step™ Assessment Completed</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.firstName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>First priority:</strong> ${escapeHtml(assessmentResultLabel(data.result))}</p>
    <p><strong>Other areas:</strong> ${escapeHtml(data.result.secondaryGaps.join(", ") || "None flagged")}</p>
    <p><strong>Structure focus:</strong> ${escapeHtml(data.result.structureType || "Not the primary gap")}</p>
    <p><strong>Recommended next step:</strong> ${escapeHtml(data.result.recommendation.label)}</p>
    <p><strong>Why:</strong> ${escapeHtml(data.result.recommendation.reason)}</p>
    <p>Requested a result email. This submission does not create a marketing subscription.</p>
  `);
}
export function formatVictorsCircleOwnerEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  currentRole: string;
  motivation: string;
}): string {
  return emailWrapper(`
    <h2>New Victor's Circle Application</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone || "—")}</p>
    <p><strong>Current role / business:</strong> ${escapeHtml(data.currentRole)}</p>
    <h3 style="margin-top:20px;">What's bringing her to Victor's Circle</h3>
    <p style="border-left: 3px solid #cda34b; padding-left: 14px;">${escapeHtml(data.motivation)}</p>
  `);
}

export function formatVictorsCircleApplicantEmail(data: { firstName: string }): string {
  return emailWrapper(`
    <p style="text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px; color: #8c6927; margin-bottom: 6px;">Application Received</p>
    <h1 style="font-size: 28px; margin: 0 0 20px;">Thank you, ${escapeHtml(data.firstName)}.</h1>
    <p style="margin: 0 0 20px;">Your application for Victor's Circle Leadership Academy&trade; is in. Applications are reviewed personally, and we'll follow up soon with next steps for the February 2027 cohort.</p>
    <p style="margin-top: 20px; font-size: 13px; color: #666;">In the meantime, feel free to reply to this email with any questions.</p>
  `);
}
export function formatAssessmentResultsEmail(data: {
  firstName: string;
  result: AssessmentResult;
}): string {
  const result = data.result;
  const focusItems = result.focus
    .map(
      (f, idx) =>
        `<p style="margin: 0 0 10px;"><strong>${idx + 1}.</strong> ${escapeHtml(f)}</p>`,
    )
    .join("");
  const secondary = result.secondaryGaps.length
    ? `<p>Your answers also suggest areas to revisit: <strong>${escapeHtml(result.secondaryGaps.map((g) => `${g} Gap`).join(", "))}</strong>. Start with the priority above, then reassess as you make progress.</p>`
    : "";
  // Recommendations come from shared, server-generated copy, never public input.
  const recommendationUrl = `https://kingdomsolutionsai.com${result.recommendation.href}`;
  return emailWrapper(`
    <p style="text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px; color: #8c6927; margin-bottom: 6px;">Your Assessment Result</p>
    <p>Hello ${escapeHtml(data.firstName)},</p>
    <h1 style="font-size: 32px; margin: 0 0 20px;">${escapeHtml(assessmentResultLabel(result))}</h1>
    <h2 style="font-size: 20px; margin: 0 0 12px;">${escapeHtml(result.headline)}</h2>
    <p style="margin: 0 0 20px;">${escapeHtml(result.summary)}</p>
    <p style="font-size: 13px; color: #666;">This is a practical starting point based on your answers, not a complete business evaluation. Your judgment and real-world evidence remain essential.</p>
    ${secondary}
    <h3 style="font-size: 16px; margin: 24px 0 10px;">${result.primaryGap ? "What leaving this unresolved can cost" : "What to keep in view"}</h3>
    <p>${escapeHtml(result.consequence)}</p>
    <h3 style="font-size: 16px; margin: 24px 0 10px;">${result.primaryGap ? "Close the right gap" : "Build the right thing next"}</h3>
    ${focusItems}
    <h3 style="font-size: 16px; margin: 24px 0 10px;">What can wait</h3>
    <p style="border-left: 3px solid #cda34b; padding-left: 14px; margin: 0 0 24px;">${escapeHtml(result.notYet)}</p>
    <h3 style="font-size: 16px; margin: 24px 0 10px;">Your next step this week</h3>
    <p>${escapeHtml(result.firstAction)}</p>
    <h3 style="font-size: 16px; margin: 24px 0 10px;">Your recommended next step</h3>
    ${result.primaryGap ? `<p style="color: #8c6927; font-weight: 600;">Close this gap now, and you start ${nextQuarterLabel()} ready.</p>` : ""}
    <p>${escapeHtml(result.recommendation.reason)}</p>
    <p style="margin: 24px 0;"><a href="${escapeHtml(recommendationUrl)}" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 14px 20px; text-decoration: none;">${escapeHtml(result.recommendation.label)}</a></p>
    <p>Questions about fit, timing, or scope? Reply to this email and tell me what remains uncertain.</p>
    <p>Clarity before complexity. Capacity before scale. Human authority throughout.</p>
    <p style="margin-top: 20px; font-size: 13px; color: #666;">You can <a href="https://kingdomsolutionsai.com/entrepreneur-assessment">retake the assessment</a> as your business evolves.</p>
  `);
}
