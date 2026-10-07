import type { Gap } from "@shared/entrepreneurAssessment";

/**
 * Client stories shown on the home page. The section stays hidden until at
 * least one story is listed here.
 *
 * Before adding a story:
 *   - You have the client's written permission to share it, in these words.
 *   - Every result in it is something she actually said or experienced.
 *   - It is checked against the Claims Register (no income or results
 *     promises beyond what she reported).
 *
 * Example:
 *   {
 *     name: "Jane D.",
 *     detail: "Business coach, Ohio",
 *     gap: "Offer",
 *     before: "Where she was before.",
 *     after: "What changed, in her own words or close to them.",
 *     quote: "Optional short quote from her.",
 *   },
 */
export type ClientStory = {
  name: string;
  detail?: string;
  gap: Gap;
  before: string;
  after: string;
  quote?: string;
};

export const CLIENT_STORIES: ClientStory[] = [];
