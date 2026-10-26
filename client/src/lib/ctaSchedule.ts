/**
 * Site-wide call to action.
 * Lead with the confirmed November 17 live webinar, then return to the
 * Entrepreneur Next Step™ Assessment. Fast Track cohort dates are not
 * baked into the public CTA schedule.
 */
export const WEBINAR_URL = "https://whatentrepreneursneedtoknow.com";

export type SiteCta = {
  label: string;
  shortLabel: string;
  href: string;
  external: boolean;
  webinarDate: string | null;
};

const NOVEMBER_WEBINAR_END = Date.parse("2026-11-17T17:00:00Z"); // noon Eastern

export function getSiteCta(now: number = Date.now()): SiteCta {
  if (now < NOVEMBER_WEBINAR_END) {
    return {
      label: "Register for the November 17 Webinar",
      shortLabel: "Nov 17 Webinar: Register",
      href: WEBINAR_URL,
      external: true,
      webinarDate: "Nov 17",
    };
  }

  return {
    label: "Find Your Business Gap",
    shortLabel: "Find Your Gap",
    href: "/entrepreneur-assessment",
    external: false,
    webinarDate: null,
  };
}
