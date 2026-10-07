/**
 * Site-wide call-to-action schedule.
 *
 * The header button and the webinar links change on their own as each date
 * passes, so nobody has to remember to edit them:
 *
 *   until Oct 20 at noon ET  -> register for the Oct 20 webinar
 *   until Oct 30 (end)       -> book a Fast Track Strategy Call (November cohort)
 *   until Nov 17 at noon ET  -> register for the Nov 17 webinar
 *   until Dec 1 (end)        -> book a Fast Track Strategy Call (January cohort)
 *   until Dec 8 at noon ET   -> register for the Dec 8 webinar
 *   until Dec 18 (end)       -> book a Fast Track Strategy Call (final week for January)
 *   after that               -> take the assessment
 *
 * Fast Track close dates come from lib/fastTrackCohorts.ts. To change a
 * webinar date, edit PHASES below. Times are UTC (ET is UTC-4 until Nov 1,
 * then UTC-5).
 */

import { FAST_TRACK_COHORTS } from "@/lib/fastTrackCohorts";

export const WEBINAR_URL = "https://whatentrepreneursneedtoknow.com";

export type SiteCta = {
  /** Full button text, used on wide and mobile screens. */
  label: string;
  /** Shorter button text for medium-width screens. */
  shortLabel: string;
  href: string;
  external: boolean;
  /** The next live webinar date, for menu notes and the footer, or null if none is scheduled. */
  webinarDate: string | null;
};

type Phase = SiteCta & { until: number };

const STRATEGY_CALL = {
  label: "Book a Fast Track Strategy Call",
  shortLabel: "Fast Track: Book a Call",
  href: "/business-fast-track",
  external: false,
};

const webinar = (date: string) => ({
  label: `Register for the ${date} Webinar`,
  shortLabel: `${date} Webinar: Register`,
  href: WEBINAR_URL,
  external: true,
  webinarDate: date,
});

const PHASES: Phase[] = [
  { until: Date.parse("2026-10-20T16:00:00Z"), ...webinar("Oct 20") }, // Oct 20, noon ET
  { until: FAST_TRACK_COHORTS[0].closesAt, ...STRATEGY_CALL, webinarDate: "Nov 17" }, // November enrollment closes
  { until: Date.parse("2026-11-17T17:00:00Z"), ...webinar("Nov 17") }, // Nov 17, noon ET
  { until: Date.parse("2026-12-02T05:00:00Z"), ...STRATEGY_CALL, webinarDate: "Dec 8" }, // end of Dec 1 ET
  { until: Date.parse("2026-12-08T17:00:00Z"), ...webinar("Dec 8") }, // Dec 8, noon ET
  { until: FAST_TRACK_COHORTS[1].closesAt, ...STRATEGY_CALL, webinarDate: null }, // January enrollment closes
];

const AFTER_ALL_PHASES: SiteCta = {
  label: "Find Your Gap",
  shortLabel: "Find Your Gap",
  href: "/entrepreneur-assessment",
  external: false,
  webinarDate: null,
};

export function getSiteCta(now: number = Date.now()): SiteCta {
  const phase = PHASES.find((p) => now < p.until);
  if (!phase) return AFTER_ALL_PHASES;
  const { until: _until, ...cta } = phase;
  return cta;
}
