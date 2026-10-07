export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = 'Please login (10001)';
export const NOT_ADMIN_ERR_MSG = 'You do not have required permission (10002)';

/**
 * The Right Order Promise for the 30-Day Business Fast Track™.
 * Keep this wording aligned with the Refund Policy page. It is a service
 * commitment, not a refund or money-back guarantee.
 */
export const RIGHT_ORDER_PROMISE =
  "Complete the week-one work. If you do not leave week one with a clear priority and plan, you will receive a private realignment session at no additional cost.";

/**
 * The quarter a visitor is getting ready for: the next calendar quarter.
 * October to December gives "Q1", January to March gives "Q2", and so on,
 * so "start Q1 ready" lines stay current without editing.
 */
export function nextQuarterLabel(now: Date = new Date()): string {
  const current = Math.floor(now.getMonth() / 3) + 1;
  return `Q${(current % 4) + 1}`;
}
