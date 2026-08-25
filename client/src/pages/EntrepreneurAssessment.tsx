import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

/**
 * Entrepreneur Next Step™ Assessment
 * 15 questions → 7-stage scoring → routed result + lead capture.
 * Files each lead into Notion segmented by result stage via submitAssessmentRequest.
 */

type Stage = "Clarify" | "Validate" | "Establish" | "Offer" | "Sell" | "Systemize" | "Grow";
const STAGES: Stage[] = ["Clarify", "Validate", "Establish", "Offer", "Sell", "Systemize", "Grow"];

type Q = {
  key: string;
  stage: Stage | null; // null = context question, not scored
  eyebrow: string;
  prompt: string;
  helper?: string;
  options: [string, number][];
};

const QUESTIONS: Q[] = [
  {
    key: "context", stage: null, eyebrow: "Your Starting Point",
    prompt: "Which best describes where you are right now?",
    helper: "Choose the closest fit. This helps personalize the result, but it does not decide the result by itself.",
    options: [
      ["I am thinking about entrepreneurship", 0],
      ["I have an idea but I am still figuring out the business", 0],
      ["I have started building the business", 0],
      ["I have an offer and need more customers", 0],
      ["I have clients or revenue but the business feels inconsistent", 0],
      ["The business is growing and too much depends on me", 0],
      ["The business is established and I am evaluating systems, AI, or scale", 0],
    ],
  },
  { key: "clarifyAudience", stage: "Clarify", eyebrow: "01 · Clarify", prompt: "How clearly can you describe the person or business you are best equipped to help?", options: [["I am not sure yet", 0], ["I have several possible audiences", 1], ["I have a likely audience, but it still feels broad", 2], ["I can describe my best-fit audience clearly", 3]] },
  { key: "clarifyProblem", stage: "Clarify", eyebrow: "01 · Clarify", prompt: "How clearly can you explain the problem you solve and the movement you create?", options: [["I cannot explain it clearly yet", 0], ["I can describe my skills, but not the problem", 1], ["I can explain it with some effort", 2], ["I can explain it simply in one or two sentences", 3]] },
  { key: "validateEvidence", stage: "Validate", eyebrow: "02 · Validate", prompt: "What evidence do you have that people actually want help with this problem?", options: [["I have not tested it yet", 0], ["People have reacted positively to the idea", 1], ["I have had real conversations or small tests", 2], ["People have bought, booked, asked for help, or shown strong demand", 3]] },
  { key: "validateInvestment", stage: "Validate", eyebrow: "02 · Validate", prompt: "Have you tested your idea before making major investments in branding, technology, or marketing?", options: [["No, I am mostly building from assumptions", 0], ["A little, but I still need more evidence", 1], ["Yes, I have tested parts of the idea", 2], ["Yes, customer evidence is shaping what I build", 3]] },
  { key: "establishSetup", stage: "Establish", eyebrow: "03 · Establish", prompt: "How complete is the basic legal, tax, banking, and recordkeeping foundation for your business?", helper: "This assessment does not provide legal or tax advice. It simply identifies whether setup may be your next priority.", options: [["I have not started that yet", 0], ["I have handled a few pieces", 1], ["Most core pieces are in place", 2], ["The foundation is established and I know what applies to my business", 3]] },
  { key: "establishSeparation", stage: "Establish", eyebrow: "03 · Establish", prompt: "How well separated and organized are your business finances and records?", options: [["They are not separated yet", 0], ["I have started, but it is inconsistent", 1], ["They are mostly separated and organized", 2], ["They are clearly separated with a repeatable process", 3]] },
  { key: "offerClarity", stage: "Offer", eyebrow: "04 · Offer", prompt: "If someone asked what they can buy from you today, how easy would it be to answer?", options: [["I do not have a clear offer yet", 0], ["I have several ideas, but nothing feels settled", 1], ["I have an offer, but it takes too much explanation", 2], ["I can explain the offer, outcome, and who it is for clearly", 3]] },
  { key: "offerStructure", stage: "Offer", eyebrow: "04 · Offer", prompt: "How confident are you in the scope, delivery, and pricing of your primary offer?", options: [["Not confident yet", 0], ["I am still piecing it together", 1], ["It is mostly defined, but needs refinement", 2], ["It is clear enough to sell and deliver consistently", 3]] },
  { key: "sellConversations", stage: "Sell", eyebrow: "05 · Sell", prompt: "How consistently are you creating conversations with potential customers or referral sources?", options: [["Almost never", 0], ["Occasionally", 1], ["Fairly consistently, but not every week", 2], ["I have a repeatable weekly rhythm", 3]] },
  { key: "sellFollowup", stage: "Sell", eyebrow: "05 · Sell", prompt: "Do you have a repeatable path from interest to conversation to follow-up to a buying decision?", options: [["No, it is mostly ad hoc", 0], ["I have pieces of a process", 1], ["I have a process, but it is inconsistent", 2], ["Yes, the path is clear and consistent", 3]] },
  { key: "systemizeMemory", stage: "Systemize", eyebrow: "06 · Systemize", prompt: "How much of your business still depends on your memory to keep leads, follow-up, meetings, and next steps moving?", options: [["Almost all of it", 0], ["A lot of it", 1], ["Some of it", 2], ["Very little, the important work has a reliable process", 3]] },
  { key: "systemizeAbsence", stage: "Systemize", eyebrow: "06 · Systemize", prompt: "If you stepped away for several business days, how much would keep moving without you?", options: [["Very little would move", 0], ["Some things would move, but key follow-up would stall", 1], ["Most routine work would keep moving", 2], ["The business has dependable systems and handoffs", 3]] },
  { key: "growRepeatability", stage: "Grow", eyebrow: "07 · Grow", prompt: "How repeatable are the core workflows that produce and serve your business?", options: [["They change constantly or live mostly in my head", 0], ["A few are repeatable", 1], ["Most core workflows are repeatable", 2], ["They are repeatable enough to delegate, automate, or enhance with AI", 3]] },
  { key: "growLeverage", stage: "Grow", eyebrow: "07 · Grow", prompt: "Why are you considering automation, AI, delegation, or additional operating support?", options: [["Mostly because I feel like I should be using more tools", 0], ["I am curious, but the business is still fairly simple", 1], ["Recurring volume is creating real capacity pressure", 2], ["The business has repeatable work and clear leverage opportunities", 3]] },
];

type ResultCopy = { headline: string; summary: string; focus: string[]; notYet: string };
const RESULTS: Record<Stage, ResultCopy> = {
  Clarify: { headline: "Before you build more, make sure you are building the right thing.", summary: "Your business direction, audience, problem, or promise needs to become clearer before more execution will help.", focus: ["Choose the person or business you are best equipped to serve.", "Name the specific problem your experience can credibly address.", "Turn that into one simple business direction and first offer hypothesis."], notYet: "You do not need multiple offers, expensive branding, paid ads, or advanced automation yet." },
  Validate: { headline: "Your idea is taking shape. Now make sure the market agrees.", summary: "You have enough clarity to begin testing, but you need stronger evidence before building too much around the idea.", focus: ["Talk with real best-fit prospects about the problem in their words.", "Test the offer or concept in a small, low-risk way.", "Let evidence shape your message, scope, and next investment."], notYet: "You do not need to perfect the brand, build a complicated funnel, or automate an unproven customer journey." },
  Establish: { headline: "The idea is becoming a business. Put the right foundation underneath it.", summary: "Your next priority is making sure the business is established appropriately for how you plan to operate.", focus: ["Identify the registrations, tax accounts, licenses, and protections that apply.", "Separate business money and records from personal activity.", "Create a simple operating foundation you can maintain."], notYet: "Do not let setup become an excuse to overbuild. Establish what is required and useful for your actual stage." },
  Offer: { headline: "You do not need more products. You need one offer people understand.", summary: "The thing someone can actually buy needs to become clearer, easier to explain, and easier to deliver consistently.", focus: ["Choose one primary problem and one best-fit buyer.", "Define the outcome, scope, delivery, boundaries, and price.", "Write the offer so a potential client understands the value quickly."], notYet: "You do not need a large product suite. One strong offer is enough to create evidence and revenue." },
  Sell: { headline: "The business is ready to meet the market more consistently.", summary: "Your next constraint appears to be customer acquisition and follow-through.", focus: ["Choose one or two reliable ways to create qualified conversations each week.", "Make referral, content, and follow-up activity consistent.", "Track which conversations move toward purchases."], notYet: "You do not need five marketing channels, a giant audience, or a complicated sales funnel." },
  Systemize: { headline: "The business is active. It should not depend on you remembering everything.", summary: "Leads, follow-up, meetings, information, or repeatable work need stronger structure before adding more volume.", focus: ["Find recurring work that still depends on memory or manual chasing.", "Give follow-up, client information, meetings, and next steps a reliable home.", "Systemize the highest-cost leak before adding another tool."], notYet: "Do not automate every process at once. Fix the capacity leak that costs the most first." },
  Grow: { headline: "Your next step is leverage, without surrendering judgment.", summary: "You have enough clarity, evidence, structure, and repeatability to evaluate stronger systems, delegation, automation, or human-authorized AI.", focus: ["Identify repeatable workflows creating the most pressure or delay.", "Separate work AI can prepare from decisions requiring human judgment.", "Add leverage only where the business already has clarity and repetition."], notYet: "Growth does not require automating everything. Use technology where it protects capacity and keeps the leader in control." },
};

type NextLink = { label: string; href: string; external?: boolean };
const NEXT_LINKS: Record<Stage, NextLink> = {
  Clarify: { label: "Explore Clarity Pro™", href: "/clarity-pro" },
  Validate: { label: "Get the Free Handbook", href: "/handbook" },
  Establish: { label: "Use the Free Handbook", href: "/handbook" },
  Offer: { label: "Explore Clarity Pro™", href: "/clarity-pro" },
  Sell: { label: "Watch the Entrepreneur Webinar", href: "https://whatentrepreneursneedtoknow.com", external: true },
  Systemize: { label: "Take the Capacity Leak Audit™", href: "/capacity-leak-audit" },
  Grow: { label: "Explore Executive AI Strategy", href: "/executive-ai-strategy" },
};

export default function EntrepreneurAssessment() {
  usePageMeta({
    title: "The Entrepreneur Next Step™ Assessment | Kingdom Solutions AI™",
    description: "Not sure what to do next in your business? The Entrepreneur Next Step™ Assessment identifies your current stage — and what you can stop worrying about for now — in about three minutes.",
    canonicalUrl: "https://kingdomsolutionsai.com/entrepreneur-assessment",
    ogImage: "https://kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
  });

  const revealRef = useScrollReveal();
  type Screen = "landing" | "assessment" | "capture" | "result";
  const [screen, setScreen] = useState<Screen>("landing");
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [form, setForm] = useState({ firstName: "", email: "" });
  const [result, setResult] = useState<Stage | null>(null);

  const submitMutation = trpc.forms.submitAssessmentRequest.useMutation({
    onSuccess: () => setScreen("result"),
    onError: () => setScreen("result"),
  });

  const calc = (): Stage => {
    const scores: Record<Stage, number> = { Clarify: 0, Validate: 0, Establish: 0, Offer: 0, Sell: 0, Systemize: 0, Grow: 0 };
    QUESTIONS.forEach((q) => { if (q.stage && typeof answers[q.key] === "number") scores[q.stage] += answers[q.key]; });
    for (const s of STAGES.slice(0, -1)) { if (scores[s] <= 3) return s; }
    return "Grow";
  };

  const pick = (idx: number) => {
    const q = QUESTIONS[i];
    setAnswers((a) => ({ ...a, [q.key]: q.options[idx][1] }));
    if (i === QUESTIONS.length - 1) { setScreen("capture"); window.scrollTo(0, 0); }
    else { setI(i + 1); }
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const r = calc();
  setResult(r);
  submitMutation.mutate({
    firstName: form.firstName,
    email: form.email,
    resultStage: r,
    recommendedStep: NEXT_LINKS[r].label,
    headline: RESULTS[r].headline,
    summary: RESULTS[r].summary,
    focus: RESULTS[r].focus,
    notYet: RESULTS[r].notYet,
  });
};

  const goNext = () => {
    if (!result) return;
    const link = NEXT_LINKS[result];
    if (link.external) window.open(link.href, "_blank", "noopener,noreferrer");
    else window.location.href = link.href;
  };

  const StageStrip = ({ active }: { active?: Stage }) => (
    <div className="grid grid-cols-2 md:grid-cols-7 gap-px bg-taupe border border-taupe mt-7">
      {STAGES.map((s, idx) => (
        <div key={s} className={`p-4 ${active === s ? "bg-gold/10" : "bg-card"}`}>
          <span className="block text-[10px] tracking-[0.12em] text-gold mb-1.5">0{idx + 1}</span>
          <b className="font-display text-base text-charcoal">{s}</b>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={revealRef} className="bg-cream min-h-screen">
      {/* LANDING */}
      {screen === "landing" && (
        <>
          <section className="pt-32 pb-16 lg:pt-40 lg:pb-20" style={{ background: "linear-gradient(#f4efe5aa,#fbf8f1)" }}>
            <div className="container">
              <div className="max-w-3xl fade-up">
                <p className="editorial-label mb-5">Entrepreneur Diagnostic · About 3 Minutes</p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[4.4rem] font-medium text-charcoal leading-[1.04] mb-6">
                  What Should You Do <em className="text-gold italic">Next?</em>
                </h1>
                <p className="font-body text-lg lg:text-xl text-charcoal-light leading-relaxed max-w-2xl mb-9">
                  The Entrepreneur Next Step™ Assessment identifies the first
                  business priority that deserves your attention now—and what you
                  can stop worrying about for the moment.
                </p>
                <button onClick={() => setScreen("assessment")} className="bg-charcoal text-cream-dark font-body text-[0.72rem] font-medium tracking-[0.1em] uppercase px-7 py-3.5 rounded-sm hover:bg-charcoal/90 transition-colors active:scale-[0.98] inline-flex items-center gap-2">
                  Find My Next Step <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>
          <section className="py-14 bg-cream-dark">
            <div className="container">
              <p className="editorial-label mb-1">The Entrepreneur Roadmap™</p>
              <StageStrip />
            </div>
          </section>
        </>
      )}

      {/* ASSESSMENT */}
      {screen === "assessment" && (
        <section className="pt-28 pb-20 lg:pt-32">
          <div className="container max-w-3xl">
            <div className="flex justify-between items-center">
              <button onClick={() => i > 0 && setI(i - 1)} className="font-body text-sm text-charcoal-light hover:text-charcoal transition-colors" disabled={i === 0} style={{ opacity: i === 0 ? 0.4 : 1 }}>
                ← Back
              </button>
              <span className="editorial-label">{i + 1} of {QUESTIONS.length}</span>
            </div>
            <div className="h-1 bg-taupe my-5 rounded-full overflow-hidden">
              <div className="h-full bg-gold transition-all duration-300" style={{ width: `${Math.round(((i + 1) / QUESTIONS.length) * 100)}%` }} />
            </div>

            <div className="mt-10">
              <p className="editorial-label mb-4">{QUESTIONS[i].eyebrow}</p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-charcoal leading-tight mb-4">
                {QUESTIONS[i].prompt}
              </h2>
              {QUESTIONS[i].helper && (
                <p className="font-body text-sm text-charcoal-light leading-relaxed max-w-2xl mb-2">{QUESTIONS[i].helper}</p>
              )}
              <div className="grid gap-3 mt-8">
                {QUESTIONS[i].options.map(([label], idx) => (
                  <button
                    key={idx}
                    onClick={() => pick(idx)}
                    className="bg-charcoal border border-charcoal rounded-sm px-5 py-4 text-left font-body text-cream-dark flex gap-4 items-start hover:bg-charcoal/90 hover:border-gold transition-colors"
                  >
                    <span className="w-6 h-6 border border-gold/50 rounded-full grid place-items-center text-[11px] text-gold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CAPTURE */}
      {screen === "capture" && (
        <section className="pt-28 pb-20 lg:pt-32">
          <div className="container max-w-xl">
            <button onClick={() => { setScreen("assessment"); window.scrollTo(0, 0); }} className="font-body text-sm text-charcoal-light hover:text-charcoal transition-colors mb-8">
              ← Back to last question
            </button>
            <p className="editorial-label mb-4">Your Result Is Ready</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-tight mb-8">
              Where should we send your next-step summary?
            </h2>
            <form onSubmit={handleSubmit} className="bg-card border border-taupe rounded-sm p-8 lg:p-10 space-y-5">
              <div>
                <label className="font-body text-sm font-medium text-charcoal mb-2 block">First name</label>
                <input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors" placeholder="Your first name" />
              </div>
              <div>
                <label className="font-body text-sm font-medium text-charcoal mb-2 block">Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors" placeholder="your@email.com" />
              </div>
              <button type="submit" disabled={submitMutation.isPending} className="w-full bg-charcoal text-cream-dark font-body text-[0.72rem] font-medium tracking-[0.1em] uppercase px-7 py-3.5 rounded-sm hover:bg-charcoal/90 transition-colors active:scale-[0.98] disabled:opacity-60">
                {submitMutation.isPending ? "Preparing your result…" : "Show My Next Step"}
              </button>
              <p className="font-body text-xs text-charcoal-light text-center">Free. No spam. Unsubscribe anytime.</p>
            </form>
          </div>
        </section>
      )}

      {/* RESULT */}
      {screen === "result" && result && (
        <section className="pt-28 pb-24 lg:pt-32">
          <div className="container max-w-3xl fade-up">
            <p className="editorial-label mb-3">Your Assessment Result</p>
            <p className="font-body text-charcoal-light mb-4">{form.firstName}, your next step is</p>
            <div className="bg-charcoal rounded-sm px-8 py-10 mb-8">
              <h1 className="font-display text-6xl lg:text-8xl font-medium text-cream-dark leading-none">
                {result}<span className="text-gold">.</span>
              </h1>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-charcoal leading-snug mb-4">
              {RESULTS[result].headline}
            </h2>
            <p className="font-body text-base text-charcoal-light leading-relaxed max-w-2xl mb-8">
              {RESULTS[result].summary}
            </p>

            <StageStrip active={result} />

            <h3 className="font-display text-2xl font-medium text-charcoal mt-14 mb-6">Focus on these three things</h3>
            <div className="grid gap-5">
              {RESULTS[result].focus.map((f, idx) => (
                <div key={idx} className="flex gap-4">
                  <b className="font-display text-gold text-lg shrink-0">0{idx + 1}</b>
                  <span className="font-body text-charcoal-light leading-relaxed">{f}</span>
                </div>
              ))}
            </div>

            <p className="editorial-label mt-12 mb-3">What you can stop worrying about</p>
            <div className="border-l-2 border-gold pl-5 py-4 bg-card font-body text-charcoal-light leading-relaxed">
              {RESULTS[result].notYet}
            </div>

            <div className="flex gap-3 flex-wrap mt-10">
              <button onClick={goNext} className="bg-charcoal text-cream-dark font-body text-[0.72rem] font-medium tracking-[0.1em] uppercase px-7 py-3.5 rounded-sm hover:bg-charcoal/90 transition-colors active:scale-[0.98] inline-flex items-center gap-2">
                {NEXT_LINKS[result].label} <ArrowRight size={16} />
              </button>
              <button
                onClick={() => { setScreen("landing"); setI(0); setAnswers({}); setResult(null); setForm({ firstName: "", email: "" }); window.scrollTo(0, 0); }}
                className="rounded-sm inline-flex items-center gap-2 border border-gold text-charcoal font-body text-[0.72rem] font-medium tracking-[0.1em] uppercase px-6 py-3.5 hover:bg-gold/5 transition-colors"
              >
                <RotateCcw size={15} /> Retake
              </button>
            </div>

            <p className="font-body text-xs text-warm-gray leading-relaxed mt-12 max-w-2xl">
              This assessment is educational and is not legal, tax, financial, or business advice. It identifies a likely current priority based on your answers.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
