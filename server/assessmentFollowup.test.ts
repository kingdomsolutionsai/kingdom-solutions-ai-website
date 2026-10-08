import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { requestAssessmentFollowup } from "./assessmentFollowup";
import { ASSESSMENT_QUESTIONS, calculateAssessment, type AssessmentResult } from "../shared/entrepreneurAssessment";

const result = calculateAssessment(Object.fromEntries(ASSESSMENT_QUESTIONS.map(q => [q.key, 3])));
const signup = { email: "jane@example.com", firstName: "Jane", result, followupOptIn: true };
const fakeFetch = vi.fn();
beforeEach(() => { vi.stubEnv("BREVO_API_KEY", "test-key"); vi.stubGlobal("fetch", fakeFetch); fakeFetch.mockReset(); });
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

describe("Assessment follow-up confirmation", () => {
  it("makes no Brevo request when follow-ups are not selected", async () => {
    expect(await requestAssessmentFollowup({ ...signup, followupOptIn: false })).toBe("not-requested");
    expect(fakeFetch).not.toHaveBeenCalled();
  });
  it.each([
    ["Direction", null, 33], ["Offer", null, 34], ["Audience", null, 35],
    ["Structure", "foundation", 36], ["Structure", "operations", 37], [null, null, 38],
  ] as const)("requests DOI for %s / %s using only list %s", async (primaryGap, structureType, listId) => {
    fakeFetch.mockResolvedValueOnce(new Response("", { status: 404 })).mockResolvedValueOnce(new Response("{}", { status: 201 }));
    const routeResult: AssessmentResult = { ...result, primaryGap, structureType };
    expect(await requestAssessmentFollowup({ ...signup, result: routeResult })).toBe("confirmation-requested");
    expect(fakeFetch).toHaveBeenCalledTimes(2);
    expect(fakeFetch.mock.calls[1][0]).toBe("https://api.brevo.com/v3/contacts/doubleOptinConfirmation");
    const payload = JSON.parse(fakeFetch.mock.calls[1][1].body);
    expect(payload).toMatchObject({ email: "jane@example.com", includeListIds: [listId], templateId: 312, attributes: { FIRSTNAME: "Jane" }, contactPixelTrackingConsent: false });
    expect(payload.redirectionUrl).toBe("https://kingdomsolutionsai.com/entrepreneur-assessment?followup=confirmed");
    expect(payload).not.toHaveProperty("emailBlacklisted");
  });
  it("preserves a previous unsubscribe and requests no confirmation", async () => {
    fakeFetch.mockResolvedValueOnce(Response.json({ emailBlacklisted: true }));
    expect(await requestAssessmentFollowup(signup)).toBe("blocked");
    expect(fakeFetch).toHaveBeenCalledTimes(1);
  });
  it("does not restart an existing series or add a second result route", async () => {
    fakeFetch.mockResolvedValueOnce(Response.json({ listIds: [35] }));
    expect(await requestAssessmentFollowup(signup)).toBe("already-confirmed");
    expect(fakeFetch).toHaveBeenCalledTimes(1);
  });
  it("requires confirmation even for existing newsletter contacts", async () => {
    fakeFetch.mockResolvedValueOnce(Response.json({ listIds: [18] })).mockResolvedValueOnce(new Response("{}", { status: 201 }));
    expect(await requestAssessmentFollowup(signup)).toBe("confirmation-requested");
  });
  it("fails closed when contact status cannot be checked", async () => {
    fakeFetch.mockResolvedValueOnce(new Response("", { status: 503 }));
    expect(await requestAssessmentFollowup(signup)).toBe("failed");
    expect(fakeFetch).toHaveBeenCalledTimes(1);
  });
  it("reports an API rejection instead of completed signup", async () => {
    fakeFetch.mockResolvedValueOnce(new Response("", { status: 404 })).mockResolvedValueOnce(new Response("", { status: 400 }));
    expect(await requestAssessmentFollowup(signup)).toBe("failed");
  });
  it("preserves the result path when the request throws", async () => {
    fakeFetch.mockRejectedValueOnce(new Error("unavailable"));
    expect(await requestAssessmentFollowup(signup)).toBe("failed");
  });
});
