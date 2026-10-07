/** Shared by the page and server so the same answers produce the same result.
 * Scores are a practical prioritization heuristic, not a validated diagnostic.
 */
export const GAPS = ["Direction", "Offer", "Audience", "Structure"] as const;
export type Gap = (typeof GAPS)[number];
export type AssessmentAnswers = Record<string, number>;

type Question = {
  key: string;
  gap: Gap | null;
  prompt: string;
  helper?: string;
  options: string[];
};

// Options go from least to most established. The context question is not scored.
export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    key: "context",
    gap: null,
    prompt: "Which best describes your business today?",
    helper:
      "Choose the closest fit. Your experience matters, even if the business is still taking shape.",
    options: [
      "I am deciding how to turn my experience into a business",
      "I am building or refining an offer, but do not yet have regular clients",
      "I have paying clients, but attracting and serving them is inconsistent",
      "I have a working offer and regular demand, but operations need stronger support",
    ],
  },
  {
    key: "directionBuyer",
    gap: "Direction",
    prompt: "How settled are you on the person you are best equipped to help?",
    options: [
      "I have not chosen an audience",
      "I keep switching between possible audiences",
      "I have chosen an audience, but need to narrow it",
      "I can describe one specific best-fit buyer",
    ],
  },
  {
    key: "directionProblem",
    gap: "Direction",
    prompt: "Can you name the problem your business helps that person solve?",
    options: [
      "I can describe my skills, but not a specific problem",
      "I have several possible problems in mind",
      "I have chosen a problem, but the outcome needs refining",
      "I can name the problem and a credible outcome clearly",
    ],
  },
  {
    key: "directionOffer",
    gap: "Direction",
    prompt: "Have you chosen one primary offer to build or strengthen?",
    options: [
      "I have not chosen what people can buy",
      "I keep changing what I plan to offer",
      "I have chosen one offer and am refining it",
      "I have one settled offer that guides my business decisions",
    ],
  },
  {
    key: "offerMessage",
    gap: "Offer",
    prompt: "How easily can a potential buyer understand your offer?",
    options: [
      "I do not yet have an offer message",
      "I describe my services, but the value is hard to explain",
      "The value is there, but my explanation changes too often",
      "My message consistently explains who it is for, what changes, and what they buy",
    ],
  },
  {
    key: "offerScope",
    gap: "Offer",
    prompt:
      "How clearly are your offer's scope, delivery, boundaries, and price defined?",
    options: [
      "These are not defined yet",
      "I work them out differently for each inquiry",
      "Most are defined, but some important decisions remain",
      "They are clear enough to explain and deliver consistently",
    ],
  },
  {
    key: "offerEvidence",
    gap: "Offer",
    prompt:
      "What evidence do you have that the offer addresses something buyers value?",
    options: [
      "I am working from assumptions",
      "People compliment the idea, but I have not explored buying interest",
      "Best-fit prospects have discussed the need or tested a small version",
      "Paying clients or specific buying requests provide evidence",
    ],
  },
  {
    key: "audienceReach",
    gap: "Audience",
    prompt:
      "How often does your content, outreach, or referral activity reach your intended buyers?",
    options: [
      "I have not started reaching them",
      "Most engagement comes from people outside my intended audience",
      "I reach some intended buyers, but inconsistently",
      "My chosen channels regularly reach people who fit the offer",
    ],
  },
  {
    key: "audienceFit",
    gap: "Audience",
    prompt:
      "How well do the people who inquire match the offer you want to sell?",
    options: [
      "I have too few inquiries to know",
      "Most inquiries are from people who do not need or fit the offer",
      "Some are a fit, but I need a better way to reach them",
      "Inquiries regularly come from people with the relevant need and buying interest",
    ],
  },
  {
    key: "audienceConversations",
    gap: "Audience",
    prompt:
      "How consistently are you having useful conversations with potential buyers or referral partners?",
    options: [
      "Almost never",
      "Occasionally, without a clear approach",
      "Fairly regularly, but the rhythm needs strengthening",
      "I have a repeatable approach that creates qualified conversations",
    ],
  },
  {
    key: "structureWorkflow",
    gap: "Structure",
    prompt:
      "How clear is the path from an inquiry to a buying decision and client delivery?",
    options: [
      "The path is not defined yet",
      "I keep changing the steps while trying to add tools",
      "The steps are clear, but execution is still inconsistent",
      "The steps are clear and happen reliably",
    ],
  },
  {
    key: "structureFollowup",
    gap: "Structure",
    prompt:
      "How reliably do follow-up, client commitments, and next steps get handled?",
    options: [
      "They mostly depend on my memory",
      "I use scattered reminders and miss important next steps",
      "I track them in one place, but still need stronger routines",
      "A dependable process keeps the important work moving",
    ],
  },
  {
    key: "structureTools",
    gap: "Structure",
    prompt: "What guides your decisions about systems, delegation, or AI?",
    options: [
      "I add tools hoping they will clarify how the business should work",
      "I am testing tools before the underlying process is settled",
      "I know the process and am choosing support for specific recurring work",
      "I use support where it helps a clear process and keeps decisions under my authority",
    ],
  },
];

export const GAP_DESCRIPTIONS: Record<Gap, string> = {
  Direction: "Choose the buyer, problem, and primary offer.",
  Offer: "Make the value and buying decision clear.",
  Audience: "Reach people who fit the offer.",
  Structure: "Give the right work a reliable process.",
};

export type AssessmentResult = {
  primaryGap: Gap | null;
  secondaryGaps: Gap[];
  scores: Record<Gap, number>;
  structureType: "foundation" | "operations" | null;
  headline: string;
  summary: string;
  consequence: string;
  notYet: string;
  focus: string[];
  firstAction: string;
  recommendation: { label: string; href: string; reason: string };
};

type ResultCopy = Omit<
  AssessmentResult,
  "primaryGap" | "secondaryGaps" | "scores" | "structureType"
>;
const FAST_TRACK = {
  label: "Explore the 30-Day Business Fast Track™",
  href: "/business-fast-track",
};

const COPY: Record<Gap, ResultCopy> = {
  Direction: {
    headline: "Choose the direction before you build more.",
    summary:
      "Your answers suggest the buyer, problem, or primary offer still needs a firmer decision. Your expertise is a starting point; the priority is choosing how it becomes a focused business.",
    consequence:
      "An unsettled direction can lead to repeated changes in your offers, message, and tools, using time and energy before you have tested one clear path.",
    notYet:
      "Hold off on adding offers, a large marketing campaign, or advanced automation until you have a focused direction to test.",
    focus: [
      "Choose one best-fit buyer.",
      "Name one problem your experience can credibly help solve.",
      "Choose one primary offer hypothesis to test with that buyer.",
    ],
    firstAction:
      "Finish this sentence: I help [specific buyer] address [specific problem] through [one offer]. Treat it as a hypothesis to test, not a permanent commitment.",
    recommendation: {
      ...FAST_TRACK,
      reason:
        "If you want guided implementation, the Fast Track helps you choose your business priority, shape one offer, and build a practical next-step plan. Review the scope and book the Fast Track Strategy Call to confirm fit.",
    },
  },
  Offer: {
    headline: "Make the offer easier to understand and choose.",
    summary:
      "You have a direction or an offer in mind, but the value, message, scope, or evidence needs strengthening. Interest alone does not tell you whether someone understands what they can buy.",
    consequence:
      "Sending more people toward an unclear offer can create more explanation and follow-up without resolving the uncertainty behind the buying decision.",
    notYet:
      "Before increasing visibility, refine what you sell and test whether best-fit buyers understand and value it.",
    focus: [
      "Define the outcome, scope, delivery, boundaries, and pricing direction.",
      "Use one consistent explanation of the offer's value.",
      "Test that explanation with real best-fit prospects.",
    ],
    firstAction:
      "Write a short offer description: who it is for, the problem it addresses, the intended outcome, what is included, and how to take the next step. Ask a best-fit prospect what they understand from it.",
    recommendation: {
      ...FAST_TRACK,
      reason:
        "The Fast Track includes a Signature Offer Blueprint, Sales-Ready Message Kit, and real-market action. It may fit if you want guided help refining and testing the offer rather than adding more products.",
    },
  },
  Audience: {
    headline: "Put a clear offer in front of the right people.",
    summary:
      "Your answers suggest reaching and engaging best-fit buyers deserves attention. Visibility, likes, and compliments are useful signals, but they do not establish that the audience fits your offer.",
    consequence:
      "Activity with the wrong audience can consume your content and conversation time while leaving qualified buying conversations inconsistent.",
    notYet:
      "You do not need to be on every platform. Strengthen one or two ways to reach people with the relevant need and buying interest.",
    focus: [
      "Check where your intended buyers already seek help.",
      "Choose a focused content, referral, or warm-conversation approach.",
      "Track qualified conversations and buying interest, not just engagement.",
    ],
    firstAction:
      "Identify five people or referral partners who match your intended buyer. Choose one useful question about the problem to explore in a warm conversation.",
    recommendation: {
      ...FAST_TRACK,
      reason:
        "The Fast Track's Revenue Path and Activate work can help you choose a practical way to reach buyers and test your message. The Strategy Call confirms whether this foundational work fits your acquisition challenge.",
    },
  },
  Structure: {
    headline: "Settle the process before adding more tools.",
    summary:
      "Your answers suggest the business needs a clearer operating foundation before more automation will help. First decide what should happen, in what order, and who is responsible.",
    consequence:
      "Tools added around an unsettled process can create duplicate work, scattered information, and more decisions for you to manage.",
    notYet:
      "Avoid automating an undefined process. Make one important workflow clear and repeatable first.",
    focus: [
      "Map the steps from inquiry to buying decision and delivery.",
      "Give client commitments and next steps one reliable home.",
      "Decide which work needs a routine before choosing technology.",
    ],
    firstAction:
      "Map one inquiry from first contact to delivery. Mark the next action, owner, and place it is tracked at each step before selecting another tool.",
    recommendation: {
      ...FAST_TRACK,
      reason:
        "The Fast Track can help prioritize the foundation and create a Business Priority Map and 90-Day Roadmap. It does not include a complete operations or automation buildout; confirm the scope on the Strategy Call.",
    },
  },
};

const OPERATIONS_COPY: ResultCopy = {
  headline: "Support the working business with a reliable process.",
  summary:
    "Your answers suggest a working business whose follow-up or recurring operations need stronger support. The priority is improving the process that is creating pressure around existing demand.",
  consequence:
    "When commitments rely on memory or scattered reminders, missed follow-up and repeated manual work can limit how reliably you serve the clients you already have.",
  notYet:
    "You do not need to replace every system. Identify one recurring workflow to improve before adding more volume or technology.",
  focus: [
    "Find where follow-up or client commitments become unreliable.",
    "Give that recurring work a clear owner, next action, and routine.",
    "Then evaluate tools, delegation, or AI for the defined process.",
  ],
  firstAction:
    "Choose one recurring task that was delayed or missed recently. Document the trigger, responsible person, next action, and completion check.",
  recommendation: {
    label: "Take the Capacity Leak Audit™",
    href: "/capacity-leak-audit",
    reason:
      "Your answers point toward operational support for an active business. The Capacity Leak Audit is a more relevant starting point than automatically repeating foundational offer work in the Fast Track.",
  },
};

const READY_COPY: ResultCopy = {
  headline: "Build what's next from a foundation that is working.",
  summary:
    "Your answers do not point to a pronounced gap in these four areas. That does not mean every part of the business is settled; it means this short assessment has not identified a clear first gap to close.",
  consequence:
    "Adding complexity without a specific goal can still spread your attention. Choose the outcome that matters next and use real business evidence to guide the decision.",
  notYet:
    "You do not need to assume something is wrong or buy a program because you completed an assessment.",
  focus: [
    "Choose one business outcome for the next 90 days.",
    "Review buyer feedback and operational evidence against that goal.",
    "Identify the specific support, if any, that would help you move forward.",
  ],
  firstAction:
    "Write down one 90-day goal, how you will measure it, and the next decision it requires. If no gap is preventing it, begin with that action.",
  recommendation: {
    label: "Discuss your next step with Tabitha",
    href: "/contact",
    reason:
      "If you want a second perspective, share your goal and what remains uncertain. A conversation can clarify whether foundational strategy, operational support, or simply taking the next action fits.",
  },
};

export function calculateAssessment(
  answers: AssessmentAnswers,
): AssessmentResult {
  if (
    Object.keys(answers).length !== ASSESSMENT_QUESTIONS.length ||
    ASSESSMENT_QUESTIONS.some(
      (q) =>
        !Number.isInteger(answers[q.key]) ||
        answers[q.key] < 0 ||
        answers[q.key] >= q.options.length,
    )
  ) {
    throw new Error(
      "Please answer every assessment question with a valid option.",
    );
  }

  const scores: Record<Gap, number> = {
    Direction: 0,
    Offer: 0,
    Audience: 0,
    Structure: 0,
  };
  const weakAnswers: Record<Gap, number> = {
    Direction: 0,
    Offer: 0,
    Audience: 0,
    Structure: 0,
  };
  for (const q of ASSESSMENT_QUESTIONS) {
    if (q.gap) {
      scores[q.gap] += answers[q.key];
      if (answers[q.key] <= 1) weakAnswers[q.gap]++;
    }
  }

  // A missing/changing primary offer needs a direction decision first.
  // Otherwise, fix pronounced foundational patterns before downstream ones.
  let primaryGap: Gap | null =
    answers.directionOffer <= 1
      ? "Direction"
      : (GAPS.find((gap) => weakAnswers[gap] >= 2) ?? null);
  if (!primaryGap) {
    const lowest = GAPS.reduce((a, b) => (scores[b] < scores[a] ? b : a));
    if (scores[lowest] <= 6) primaryGap = lowest;
  }
  const secondaryGaps = GAPS.filter(
    (gap) => gap !== primaryGap && scores[gap] <= 6,
  );
  const structureType =
    primaryGap === "Structure"
      ? answers.context >= 2 &&
        answers.structureWorkflow >= 2 &&
        answers.structureTools >= 2
        ? "operations"
        : "foundation"
      : null;
  const copy =
    primaryGap === null
      ? READY_COPY
      : structureType === "operations"
        ? OPERATIONS_COPY
        : COPY[primaryGap];
  return { ...copy, primaryGap, secondaryGaps, scores, structureType };
}

export function assessmentResultLabel(result: AssessmentResult): string {
  return result.primaryGap ? `${result.primaryGap} Gap` : "Build What's Next";
}
