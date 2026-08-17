/**
 * Constance lead webhook integration.
 *
 * Files every audit/intake submission into the Notion Pipeline via
 * Constance's existing `/lead` endpoint (see constance-main/src/server.js),
 * so leads land in the same CRM the Lead Generator & Qualifier already
 * writes to instead of a second, parallel integration.
 *
 * Constance's contract (confirmed directly from its source):
 *   POST https://constance.onrender.com/lead
 *   Header: x-lead-secret: <LEAD_WEBHOOK_SECRET>
 *   Body:   { name (required), email, phone, source, stage, notes,
 *             fit_score, urgency_score, follow_up }
 *
 * The secret here (`CONSTANCE_LEAD_SECRET`) must be set in this site's
 * Render environment to the SAME value as `LEAD_WEBHOOK_SECRET` on the
 * Constance service itself — it's one shared secret, not two different
 * ones. Filing a lead is treated as best-effort: a Constance/Notion
 * failure is logged but never blocks the visitor's email confirmation.
 */

const CONSTANCE_LEAD_URL = "https://constance.onrender.com/lead";

interface LeadPayload {
  name: string;
  email?: string;
  source: string;
  notes?: string;
  stage?: string;
}

export async function fileLeadWithConstance(payload: LeadPayload): Promise<boolean> {
  const secret = process.env.CONSTANCE_LEAD_SECRET;
  if (!secret) {
    console.warn("[Constance] CONSTANCE_LEAD_SECRET not configured — skipping Pipeline lead filing.");
    return false;
  }

  try {
    const response = await fetch(CONSTANCE_LEAD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-lead-secret": secret,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("[Constance] Lead webhook rejected the request:", response.status, errorText);
      return false;
    }

    const data = (await response.json()) as { ok?: boolean; created?: boolean; name?: string };
    console.log("[Constance] Lead filed:", { name: payload.name, created: data.created });
    return true;
  } catch (error) {
    console.error("[Constance] Lead webhook request failed:", error);
    return false;
  }
}

/**
 * Build the Notes field for a Capacity Leak Audit submission. Role and
 * Company/Ministry Name have no dedicated Pipeline columns, so per
 * decision they're folded into Notes as readable text.
 */
export function buildCapacityLeakAuditNotes(data: {
  role?: string;
  company?: string;
  challenge?: string;
  calendarText?: string;
}): string {
  const parts: string[] = [];
  if (data.role) parts.push(`Role: ${data.role}`);
  if (data.company) parts.push(`Company/Ministry: ${data.company}`);
  if (data.challenge) parts.push(`Biggest challenge: ${data.challenge}`);
  if (data.calendarText) parts.push("Provided a representative week (see submission email for full text)");
  return parts.join(" | ");
}
