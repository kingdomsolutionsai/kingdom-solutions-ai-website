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
