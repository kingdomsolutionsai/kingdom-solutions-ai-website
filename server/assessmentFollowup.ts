import type { AssessmentResult } from "../shared/entrepreneurAssessment";
import {
  ASSESSMENT_FOLLOWUP_LISTS,
  assessmentFollowupRoute,
  type AssessmentFollowupStatus,
} from "../shared/assessmentFollowup";

const API = "https://api.brevo.com/v3";
const TEMPLATE_ID = 312;
const CONFIRMATION_REDIRECT =
  "https://kingdomsolutionsai.com/entrepreneur-assessment?followup=confirmed";
const CONFIRMED_LIST_IDS: readonly number[] = Object.values(ASSESSMENT_FOLLOWUP_LISTS);

// Only Brevo's confirmation link can add a contact to these dedicated lists.
// The result email never establishes consent to the optional follow-up series.
export async function requestAssessmentFollowup(input: {
  email: string;
  firstName: string;
  result: AssessmentResult;
  followupOptIn: boolean;
}): Promise<AssessmentFollowupStatus> {
  if (!input.followupOptIn) return "not-requested";
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return "failed";
  const headers = { "api-key": apiKey, "Content-Type": "application/json" };
  try {
    const existing = await fetch(`${API}/contacts/${encodeURIComponent(input.email)}`, {
      headers,
      signal: AbortSignal.timeout(10000),
    });
    if (existing.ok) {
      const contact = await existing.json() as { emailBlacklisted?: boolean; listIds?: number[] };
      // Preserve existing opt-outs and avoid restarting/overlapping confirmed series.
      if (contact.emailBlacklisted) return "blocked";
      if (contact.listIds?.some(id => CONFIRMED_LIST_IDS.includes(id))) {
        return "already-confirmed";
      }
    } else if (existing.status !== 404) {
      console.error("[Assessment follow-up] Contact lookup failed", existing.status);
      return "failed";
    }
    const response = await fetch(`${API}/contacts/doubleOptinConfirmation`, {
      method: "POST",
      headers,
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        email: input.email,
        attributes: { FIRSTNAME: input.firstName },
        includeListIds: [ASSESSMENT_FOLLOWUP_LISTS[assessmentFollowupRoute(input.result)]],
        templateId: TEMPLATE_ID,
        redirectionUrl: CONFIRMATION_REDIRECT,
        contactPixelTrackingConsent: false,
      }),
    });
    if (!response.ok) {
      console.error("[Assessment follow-up] Confirmation request failed", response.status);
      return "failed";
    }
    return "confirmation-requested";
  } catch {
    console.error("[Assessment follow-up] Confirmation request unavailable");
    return "failed";
  }
}
