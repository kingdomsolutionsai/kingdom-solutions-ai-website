import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  ASSESSMENT_QUESTIONS,
  GAPS,
  GAP_DESCRIPTIONS,
  calculateAssessment,
  assessmentResultLabel,
  type AssessmentAnswers,
  type AssessmentResult,
} from "@shared/entrepreneurAssessment";

type Screen = "landing" | "assessment" | "capture" | "result";
const buttonClass =
  "bg-charcoal text-cream-dark font-body text-[0.72rem] font-medium tracking-[0.1em] uppercase px-7 py-3.5 rounded-sm hover:bg-charcoal/90 transition-colors inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

export default function EntrepreneurAssessment() {
  usePageMeta({
    title: "Entrepreneur Next Step™ Assessment | Find Your Business Gap",
    description:
      "Find the gap in your Direction, Offer, Audience, or Structure and the next step to build your business in the right order. Free, about three minutes.",
    canonicalUrl: "https://kingdomsolutionsai.com/entrepreneur-assessment",
    ogImage:
      "https://kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
  });
  const revealRef = useScrollReveal();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [screen, setScreen] = useState<Screen>("landing");
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [form, setForm] = useState({ firstName: "", email: "" });
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const submitMutation = trpc.forms.submitAssessmentRequest.useMutation({
    onSuccess: (data) => setResult(data.result),
  });

  useEffect(() => {
    if (screen !== "landing") headingRef.current?.focus();
    window.scrollTo(0, 0);
  }, [screen, i]);

  const pick = (idx: number) => {
    setAnswers((a) => ({ ...a, [ASSESSMENT_QUESTIONS[i].key]: idx }));
    if (i === ASSESSMENT_QUESTIONS.length - 1) setScreen("capture");
    else setI(i + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The result is available immediately, even if email is unavailable.
    setResult(calculateAssessment(answers));
    setScreen("result");
    submitMutation.mutate({
      firstName: form.firstName.trim(),
      email: form.email.trim(),
      answers,
    });
  };

  const reset = () => {
    setScreen("landing");
    setI(0);
    setAnswers({});
    setResult(null);
    setForm({ firstName: "", email: "" });
    submitMutation.reset();
  };

  return (
    <div ref={revealRef} className="bg-cream min-h-screen">
      {screen === "landing" && (
        <>
          <section
            className="pt-32 pb-16 lg:pt-40 lg:pb-20"
            style={{ background: "linear-gradient(#f4efe5aa,#fbf8f1)" }}
          >
            <div className="container">
              <div className="max-w-3xl">
                <p className="editorial-label mb-5">
                  Entrepreneur Next Step™ Assessment · About 3 Minutes
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[4.4rem] font-medium text-charcoal leading-[1.04] mb-6">
                  Find your gap.
                  <br />
                  <em className="text-gold italic">Build what's next.</em>
                </h1>
                <p className="font-body text-lg lg:text-xl text-charcoal-light leading-relaxed max-w-2xl mb-6">
                  You do not have to build everything at once. Find which part
                  of your business deserves attention first: Direction, Offer,
                  Audience, or Structure.
                </p>
                <p className="font-body text-base text-charcoal-light leading-relaxed max-w-2xl mb-9">
                  For experienced women turning expertise into a business or
                  strengthening one they already lead. Answer 13 questions for a
                  practical priority, a first action, and an appropriate
                  next-step recommendation.
                </p>
                <button
                  onClick={() => setScreen("assessment")}
                  className={buttonClass}
                >
                  Find My Gap <ArrowRight size={16} aria-hidden="true" />
                </button>
                <p className="font-body text-xs text-charcoal-light mt-4">
                  Free. Your result appears on screen, with a copy requested by
                  email.
                </p>
              </div>
            </div>
          </section>
          <section className="py-14 bg-cream-dark">
            <div className="container">
              <p className="editorial-label mb-5">
                Find the gap. Close the right gap. Build what's next.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-taupe border border-taupe">
                {GAPS.map((gap, index) => (
                  <div key={gap} className="bg-card p-6">
                    <span className="editorial-label text-gold">
                      0{index + 1}
                    </span>
                    <h2 className="font-display text-xl text-charcoal mt-3 mb-2">
                      {gap} Gap
                    </h2>
                    <p className="font-body text-sm text-charcoal-light leading-relaxed">
                      {GAP_DESCRIPTIONS[gap]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {screen === "assessment" && (
        <section className="pt-28 pb-20 lg:pt-32">
          <div className="container max-w-3xl">
            <div className="flex justify-between items-center">
              <button
                onClick={() => i > 0 && setI(i - 1)}
                disabled={i === 0}
                className="font-body text-sm text-charcoal-light hover:text-charcoal disabled:opacity-40"
              >
                ← Back
              </button>
              <span className="editorial-label">
                {i + 1} of {ASSESSMENT_QUESTIONS.length}
              </span>
            </div>
            <div
              role="progressbar"
              aria-label="Assessment progress"
              aria-valuemin={0}
              aria-valuemax={ASSESSMENT_QUESTIONS.length}
              aria-valuenow={i + 1}
              className="h-1 bg-taupe my-5 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-gold transition-all duration-300"
                style={{
                  width: `${((i + 1) / ASSESSMENT_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
            <div className="mt-10">
              <p className="editorial-label mb-4">
                {ASSESSMENT_QUESTIONS[i].gap
                  ? `${ASSESSMENT_QUESTIONS[i].gap} Gap`
                  : "Your Starting Point"}
              </p>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-charcoal leading-tight mb-4 outline-none"
              >
                {ASSESSMENT_QUESTIONS[i].prompt}
              </h2>
              {ASSESSMENT_QUESTIONS[i].helper && (
                <p className="font-body text-sm text-charcoal-light leading-relaxed mb-2">
                  {ASSESSMENT_QUESTIONS[i].helper}
                </p>
              )}
              <div className="grid gap-3 mt-8">
                {ASSESSMENT_QUESTIONS[i].options.map((label, idx) => (
                  <button
                    key={idx}
                    onClick={() => pick(idx)}
                    aria-pressed={answers[ASSESSMENT_QUESTIONS[i].key] === idx}
                    className={`bg-charcoal border rounded-sm px-5 py-4 text-left font-body text-cream-dark flex gap-4 items-start hover:bg-charcoal/90 hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${answers[ASSESSMENT_QUESTIONS[i].key] === idx ? "border-gold ring-1 ring-gold" : "border-charcoal"}`}
                  >
                    <span
                      aria-hidden="true"
                      className="w-6 h-6 border border-gold/50 rounded-full grid place-items-center text-[11px] text-gold shrink-0 mt-0.5"
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              <p className="font-body text-xs text-charcoal-light mt-5">
                Choosing an answer moves to the next question. Use Back to
                review or change an answer.
              </p>
            </div>
          </div>
        </section>
      )}

      {screen === "capture" && (
        <section className="pt-28 pb-20 lg:pt-32">
          <div className="container max-w-xl">
            <button
              onClick={() => setScreen("assessment")}
              className="font-body text-sm text-charcoal-light hover:text-charcoal mb-8"
            >
              ← Back to last question
            </button>
            <p className="editorial-label mb-4">Your Result Is Ready</p>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-tight mb-6 outline-none"
            >
              See your priority.
              <br />
              Know your next step.
            </h2>
            <p className="font-body text-base text-charcoal-light leading-relaxed mb-8">
              Enter your details to view your result now and request a copy by
              email.
            </p>
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-taupe rounded-sm p-6 sm:p-8 space-y-5"
            >
              <div>
                <label
                  htmlFor="assessment-name"
                  className="font-body text-sm font-medium text-charcoal mb-2 block"
                >
                  First name
                </label>
                <input
                  id="assessment-name"
                  autoComplete="given-name"
                  required
                  maxLength={100}
                  pattern=".*\S.*"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label
                  htmlFor="assessment-email"
                  className="font-body text-sm font-medium text-charcoal mb-2 block"
                >
                  Email
                </label>
                <input
                  id="assessment-email"
                  autoComplete="email"
                  type="email"
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <button type="submit" className={`${buttonClass} w-full`}>
                Show My Result <ArrowRight size={16} aria-hidden="true" />
              </button>
              <p className="font-body text-xs text-charcoal-light leading-relaxed">
                We use these details to deliver your result and recommend an
                appropriate next step. This form does not subscribe you to a
                marketing sequence. Read our{" "}
                <a href="/privacy" className="underline underline-offset-4">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </section>
      )}

      {screen === "result" && result && (
        <section className="pt-28 pb-24 lg:pt-32">
          <div className="container max-w-3xl">
            <p className="editorial-label mb-4">
              {result.primaryGap ? "Your First Priority" : "Your Next Step"}
            </p>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-4xl sm:text-5xl text-charcoal leading-tight mb-5 outline-none"
            >
              {assessmentResultLabel(result)}
            </h2>
            <h3 className="font-display text-2xl sm:text-3xl text-charcoal mb-5">
              {result.headline}
            </h3>
            <p className="font-body text-base sm:text-lg text-charcoal-light leading-relaxed mb-6">
              {result.summary}
            </p>
            <p className="font-body text-xs text-charcoal-light leading-relaxed mb-8">
              This is a practical starting point based on your answers, not a
              complete business evaluation. Your judgment and real-world
              evidence remain essential.
            </p>
            {result.secondaryGaps.length > 0 && (
              <div className="bg-gold/10 border-l-2 border-gold p-5 mb-8">
                <p className="font-body text-sm text-charcoal leading-relaxed">
                  Your answers also suggest areas to revisit:{" "}
                  <strong>
                    {result.secondaryGaps.map((g) => `${g} Gap`).join(", ")}
                  </strong>
                  . Begin with the priority above, then reassess as you make
                  progress.
                </p>
              </div>
            )}
            <div className="bg-card border border-taupe p-6 sm:p-8 mb-6">
              <h3 className="font-display text-xl text-charcoal mb-3">
                {result.primaryGap
                  ? "What leaving this unresolved can cost"
                  : "What to keep in view"}
              </h3>
              <p className="font-body text-base text-charcoal-light leading-relaxed">
                {result.consequence}
              </p>
              <h3 className="font-display text-xl text-charcoal mt-7 mb-3">
                What can wait
              </h3>
              <p className="font-body text-base text-charcoal-light leading-relaxed">
                {result.notYet}
              </p>
            </div>
            <div className="bg-card border border-taupe p-6 sm:p-8 mb-6">
              <h3 className="font-display text-xl text-charcoal mb-5">
                {result.primaryGap
                  ? "Close the right gap"
                  : "Build the right thing next"}
              </h3>
              <ol className="list-decimal pl-5 space-y-3 font-body text-base text-charcoal-light leading-relaxed">
                {result.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              <div className="border-t border-taupe mt-7 pt-6">
                <p className="editorial-label mb-3">
                  One action you can take now
                </p>
                <p className="font-body text-base text-charcoal leading-relaxed">
                  {result.firstAction}
                </p>
              </div>
            </div>
            <div className="bg-charcoal text-cream-dark rounded-sm p-6 sm:p-8 mb-8">
              <p className="editorial-label text-gold mb-4">
                Build What's Next
              </p>
              <h3 className="font-display text-2xl mb-4">
                Your recommended next step
              </h3>
              <p className="font-body text-base leading-relaxed mb-6">
                {result.recommendation.reason}
              </p>
              <a
                href={result.recommendation.href}
                className="bg-gold text-charcoal font-body text-sm font-medium px-6 py-4 rounded-sm inline-flex items-center justify-center gap-3 hover:bg-gold/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {result.recommendation.label}{" "}
                <ArrowRight size={16} className="shrink-0" aria-hidden="true" />
              </a>
              <p className="font-body text-sm leading-relaxed mt-5">
                Need to clarify fit, timing, or scope first?{" "}
                <a
                  href="mailto:tabitha@kingdomsolutionsai.com"
                  className="underline underline-offset-4"
                >
                  Ask Tabitha a question.
                </a>
              </p>
            </div>
            <div
              role="status"
              className="font-body text-sm text-charcoal-light leading-relaxed mb-8"
            >
              {submitMutation.isPending
                ? "Your result is ready above. We are requesting your email copy."
                : submitMutation.data?.participantNotified
                  ? `Your email copy was accepted for delivery to ${form.email}. If it does not arrive, check your spam or promotions folder.`
                  : "We could not confirm delivery of your email copy. Your complete result is above; please save or print this page."}
            </div>
            <p className="font-body text-sm text-charcoal-light mb-6">
              Clarity before complexity. Capacity before scale. Human authority
              throughout.
            </p>
            <button
              onClick={reset}
              disabled={submitMutation.isPending}
              className="inline-flex items-center gap-2 border border-gold text-charcoal font-body text-sm px-6 py-3.5 rounded-sm hover:bg-gold/5 disabled:opacity-50"
            >
              <RotateCcw size={15} aria-hidden="true" /> Take It Again
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
