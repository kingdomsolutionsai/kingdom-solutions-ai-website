/**
 * Site-wide call-to-action schedule.
 *
 * The header button and the webinar links change on their own as each date
 * passes, so nobody has to remember to edit them:
 *
 *   until Oct 20 at noon ET   -> register for the Oct 20 webinar
 *   until Oct 30 (end of day) -> book a Fast Track Strategy Call
 *   until Nov 17 at noon ET   -> register for the Nov 17 webinar
 *   until Dec 8 at noon ET    -> register for the Dec 8 webinar
 *   after that                -> take the assessment
 *
 * To change a date or add a webinar, edit PHASES below. Times are UTC
 * (ET is UTC-4 until Nov 1, then UTC-5).
 */

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

const PHASES: Phase[] = [
  {
    until: Date.parse("2026-10-20T16:00:00Z"), // Oct 20, noon ET
    label: "Register for the Oct 20 Webinar",
    shortLabel: "Oct 20 Webinar: Register",
    href: WEBINAR_URL,
    external: true,
    webinarDate: "Oct 20",
  },
  {
    until: Date.parse("2026-10-31T04:00:00Z"), // end of Oct 30 ET, when Fast Track enrollment closes
    label: "Book a Fast Track Strategy Call",
    shortLabel: "Fast Track: Book a Call",
    href: "/business-fast-track",
    external: false,
    webinarDate: "Nov 17",
  },
  {
    until: Date.parse("2026-11-17T17:00:00Z"), // Nov 17, noon ET
    label: "Register for the Nov 17 Webinar",
    shortLabel: "Nov 17 Webinar: Register",
    href: WEBINAR_URL,
    external: true,
    webinarDate: "Nov 17",
  },
  {
    until: Date.parse("2026-12-08T17:00:00Z"), // Dec 8, noon ET
    label: "Register for the Dec 8 Webinar",
    shortLabel: "Dec 8 Webinar: Register",
    href: WEBINAR_URL,
    external: true,
    webinarDate: "Dec 8",
  },
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
