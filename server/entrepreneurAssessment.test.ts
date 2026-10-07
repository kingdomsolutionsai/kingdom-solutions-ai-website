import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ASSESSMENT_QUESTIONS,
  GAPS,
  calculateAssessment,
  type AssessmentAnswers,
  type Gap,
} from "../shared/entrepreneurAssessment";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { sendBrevoEmail, formatAssessmentResultsEmail } from "./brevo";
import { fileLeadWithConstance } from "./constance";

vi.mock("./brevo", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./brevo")>()),
  sendBrevoEmail: vi.fn().mockResolvedValue(true),
}));
vi.mock("./constance", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./constance")>()),
  fileLeadWithConstance: vi.fn().mockResolvedValue(true),
}));

const strongAnswers = (): AssessmentAnswers =>
  Object.fromEntries(ASSESSMENT_QUESTIONS.map((q) => [q.key, 3]));
function weakGap(gap: Gap): AssessmentAnswers {
  const answers = strongAnswers();
  for (const q of ASSESSMENT_QUESTIONS) if (q.gap === gap) answers[q.key] = 0;
  return answers;
}

describe("Four Gaps prioritization", () => {
  it.each(GAPS)("identifies a pronounced %s gap", (gap) => {
    expect(calculateAssessment(weakGap(gap)).primaryGap).toBe(gap);
  });

  it("prioritizes a missing primary offer ahead of downstream audience problems", () => {
    const answers = weakGap("Audience");
    answers.directionOffer = 0;
    const result = calculateAssessment(answers);
    expect(result.primaryGap).toBe("Direction");
    expect(result.secondaryGaps).toContain("Audience");
  });

  it("prioritizes an unclear offer over low visibility when both show pronounced gaps", () => {
    const answers = weakGap("Audience");
    answers.offerMessage = 0;
    answers.offerScope = 1;
    const result = calculateAssessment(answers);
    expect(result.primaryGap).toBe("Offer");
    expect(result.secondaryGaps).toContain("Audience");
  });

  it("distinguishes operational support from automating an unsettled foundation", () => {
    const foundation = calculateAssessment(weakGap("Structure"));
    expect(foundation.structureType).toBe("foundation");
    expect(foundation.recommendation.href).toBe("/business-fast-track");
    const answers = strongAnswers();
    answers.structureFollowup = 0;
    const operations = calculateAssessment(answers);
    expect(operations.primaryGap).toBe("Structure");
    expect(operations.structureType).toBe("operations");
    expect(operations.recommendation.href).toBe("/capacity-leak-audit");
  });

  it("does not invent a gap or prescribe Fast Track when all areas are strong", () => {
    const result = calculateAssessment(strongAnswers());
    expect(result.primaryGap).toBeNull();
    expect(result.secondaryGaps).toEqual([]);
    expect(result.recommendation.href).toBe("/contact");
  });

  it("handles moderate scores deterministically with foundational order breaking ties", () => {
    const answers = Object.fromEntries(
      ASSESSMENT_QUESTIONS.map((q) => [q.key, 2]),
    );
    expect(calculateAssessment(answers).primaryGap).toBe("Direction");
  });

  it.each([
    {},
    { ...strongAnswers(), offerMessage: 4 },
    { ...strongAnswers(), context: 0.5 },
    { ...strongAnswers(), extra: 0 },
  ])("rejects incomplete or invalid answers", (answers) => {
    expect(() => calculateAssessment(answers)).toThrow(
      "Please answer every assessment question",
    );
  });
});

const context = {
  req: { protocol: "https", headers: {} },
  res: { clearCookie: () => {} },
} as TrpcContext;

describe("Assessment submission and result email", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(sendBrevoEmail).mockResolvedValue(true);
    vi.mocked(fileLeadWithConstance).mockResolvedValue(true);
  });

  it("calculates the result on the server and files the gap and scope into the CRM", async () => {
    const caller = appRouter.createCaller(context);
    const response = await caller.forms.submitAssessmentRequest({
      firstName: " Jane ",
      email: "jane@example.com",
      answers: weakGap("Offer"),
    });
    expect(response.result.primaryGap).toBe("Offer");
    expect(response.participantNotified).toBe(true);
    expect(sendBrevoEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: { name: "Jane", email: "jane@example.com" },
        htmlContent: expect.stringContaining(
          'href="https://kingdomsolutionsai.com/business-fast-track"',
        ),
      }),
    );
    expect(fileLeadWithConstance).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Jane",
        notes: expect.stringContaining("Priority: Offer Gap"),
      }),
    );
  });

  it("returns the full result when email and lead filing are unavailable", async () => {
    vi.mocked(sendBrevoEmail).mockResolvedValue(false);
    vi.mocked(fileLeadWithConstance).mockResolvedValue(false);
    const response = await appRouter
      .createCaller(context)
      .forms.submitAssessmentRequest({
        firstName: "Jane",
        email: "jane@example.com",
        answers: weakGap("Audience"),
      });
    expect(response.participantNotified).toBe(false);
    expect(response.filedWithConstance).toBe(false);
    expect(response.result.primaryGap).toBe("Audience");
    expect(response.result.firstAction).toBeTruthy();
  });

  it("rejects forged result copy rather than emailing a client-selected recommendation", async () => {
    const input = {
      firstName: "Jane",
      email: "jane@example.com",
      answers: strongAnswers(),
      headline: "Forged result",
    };
    await expect(
      appRouter.createCaller(context).forms.submitAssessmentRequest(input),
    ).rejects.toThrow();
    expect(sendBrevoEmail).not.toHaveBeenCalled();
  });

  it("rejects incomplete answers before attempting any deliveries", async () => {
    await expect(
      appRouter.createCaller(context).forms.submitAssessmentRequest({
        firstName: "Jane",
        email: "jane@example.com",
        answers: { context: 1 },
      }),
    ).rejects.toThrow();
    expect(sendBrevoEmail).not.toHaveBeenCalled();
  });

  it("escapes a submitted name and includes an operational CTA for an operational result", () => {
    const answers = strongAnswers();
    answers.structureFollowup = 0;
    const html = formatAssessmentResultsEmail({
      firstName: "<img src=x>",
      result: calculateAssessment(answers),
    });
    expect(html).not.toContain("<img src=x>");
    expect(html).toContain("&lt;img src=x&gt;");
    expect(html).toContain(
      'href="https://kingdomsolutionsai.com/capacity-leak-audit"',
    );
    expect(html).toContain("One action you can take now");
  });
});
