import type { AssessmentResult } from "./entrepreneurAssessment";

export const ASSESSMENT_FOLLOWUP_CONSENT_VERSION = "assessment-followup-v1";
export const ASSESSMENT_FOLLOWUP_CONSENT =
  "Yes, send me three follow-up emails over the next week with practical guidance for my assessment result and relevant ways to work with Tabitha. I can unsubscribe at any time.";

export const ASSESSMENT_FOLLOWUP_LISTS = {
  direction: 33,
  offer: 34,
  audience: 35,
  "structure-foundation": 36,
  "structure-operations": 37,
  "build-whats-next": 38,
} as const;

export function assessmentFollowupRoute(result: AssessmentResult): keyof typeof ASSESSMENT_FOLLOWUP_LISTS {
  if (!result.primaryGap) return "build-whats-next";
  if (result.primaryGap === "Structure") {
    return result.structureType === "operations" ? "structure-operations" : "structure-foundation";
  }
  return result.primaryGap.toLowerCase() as "direction" | "offer" | "audience";
}

export type AssessmentFollowupStatus =
  | "not-requested"
  | "confirmation-requested"
  | "already-confirmed"
  | "blocked"
  | "failed";
