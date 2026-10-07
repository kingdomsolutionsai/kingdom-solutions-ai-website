/**
 * 30-Day Business Fast Track™ cohorts, in date order.
 *
 * The Fast Track page always shows the first cohort whose enrollment is still
 * open. When the last one closes, the page switches to "Ask About the Next
 * Cohort". To add a cohort, add an entry here (and extend the Calendly
 * Strategy Call so it can be booked through the new close date).
 *
 * closesAt is the end of the closing day in Eastern time, written in UTC
 * (ET is UTC-4 until Nov 1, then UTC-5).
 */
export type FastTrackCohort = {
  /** Month name used in copy, e.g. "the November cohort". */
  name: string;
  starts: string;
  closes: string;
  closesAt: number;
  /** Short line on the hero card. */
  badge: string;
  /** Finishes "... with prioritized actions and a realistic plan". */
  roadmapLead: string;
  /** Finishes "... and ___ with a credible business direction." */
  directionLine: string;
};

export const FAST_TRACK_COHORTS: FastTrackCohort[] = [
  {
    name: "November",
    starts: "Monday, November 2",
    closes: "Friday, October 30",
    closesAt: Date.parse("2026-10-31T04:00:00Z"),
    badge: "Q1 2027 Ready",
    roadmapLead: "Enter Q1 2027",
    directionLine: "move into Q1 2027",
  },
  {
    name: "January",
    starts: "Monday, January 11",
    closes: "Friday, December 18",
    closesAt: Date.parse("2026-12-19T05:00:00Z"),
    badge: "Built for Q1 2027",
    roadmapLead: "Lead Q1 2027",
    directionLine: "lead Q1 2027",
  },
];

/** The cohort currently enrolling, or the most recent one once all have closed. */
export function currentCohort(now: number = Date.now()): { cohort: FastTrackCohort; open: boolean } {
  const enrolling = FAST_TRACK_COHORTS.find((c) => now < c.closesAt);
  if (enrolling) return { cohort: enrolling, open: true };
  return { cohort: FAST_TRACK_COHORTS[FAST_TRACK_COHORTS.length - 1], open: false };
}
