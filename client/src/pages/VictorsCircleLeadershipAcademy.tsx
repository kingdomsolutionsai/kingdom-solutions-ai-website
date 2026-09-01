import { useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { trpc } from "@/lib/trpc";

/**
 * Victor's Circle Leadership Academy™
 * Premier / flagship program page. Christ-centered leadership formation
 * for Christian women in leadership. Paid cohort — applications only.
 * Content pulled from revivedspirit.com/product/victors-circle-leadership-academy
 * and reframed for a January-cohort application (per Tabitha's direction).
 */

const WEEKS = [
  {
    n: "Week 1",
    title: "Grounded",
    desc: "Calm your nervous system and reset your daily rhythm — the foundation everything else is built on.",
  },
  {
    n: "Week 2",
    title: "Clear",
    desc: "Replace spiraling thoughts with Scripture-anchored clarity, so your decisions come from a settled place.",
  },
  {
    n: "Week 3",
    title: "Confident",
    desc: "Practice real leadership tools that strengthen your voice and your boundaries.",
  },
  {
    n: "Week 4",
    title: "Strong",
    desc: "Build the rhythms that sustain peace long after the 30 days are over.",
  },
];

const INCLUSIONS = [
  "4 live group coaching & formation calls (weekly)",
  "2 private 1:1 sessions with Tabitha (30 minutes each)",
  "Community access with weekly office hours for questions and support",
  "Pop-up \"Quick Lives\" — short, powerful live sessions",
  "Fearless Faith Video Course (3 hours, lifetime access)",
  "Fearless Faith Workbook — reflection prompts and journaling space",
  "Free access to Clarity Pro™",
  "Private community access",
];

export default function VictorsCircleLeadershipAcademy() {
  usePageMeta({
    title: "Victor's Circle Leadership Academy™ — Christ-Centered Leadership for Women | Kingdom Solutions AI™",
    description:
      "Victor's Circle Leadership Academy™ is a Christ-centered leadership formation program for Christian women in leadership. Now accepting applications for the January cohort.",
    canonicalUrl: "https://kingdomsolutionsai.com/victors-circle-leadership-academy",
    ogImage: "https://kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentRole: "",
    motivation: "",
    commitmentConfirmed: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.forms.submitVictorsCircleApplication.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(form);
  };

  return (
    <>
      {/* HERO */}
      <section className="pt-28 pb-16 lg:pt-36 border-b border-gold/20">
        <div className="container max-w-3xl text-center">
          <p className="editorial-label mb-4">Premier Program · For Christian Women Carrying Real Leadership Responsibility</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-charcoal leading-tight mb-4">
            Victor's Circle Leadership Academy&trade;
          </h1>
          <p className="font-display italic text-xl sm:text-2xl text-gold mb-8">
            Grow in wisdom. Lead with peace. Rise with strength.
          </p>
          <p className="font-body text-lg text-charcoal-light leading-relaxed max-w-2xl mx-auto mb-10">
            A Christ-centered formation space for Christian women carrying real leadership
            responsibility — founders, executives, coaches, and ministry leaders navigating growth
            and transition. A 30-day reset that strengthens your decisions, your boundaries, and
            your leadership presence — so you lead from a settled place instead of overextension.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#apply"
              className="rounded-sm inline-flex items-center gap-2 bg-charcoal text-cream font-body text-[0.72rem] font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-charcoal/90 transition-colors"
            >
              Apply for the January 2027 Cohort →
            </a>
          </div>
          <p className="font-body text-xs text-charcoal-light/70 uppercase tracking-[0.08em] mt-5">
            Now accepting applications · Limited seats
          </p>
          <p className="font-body text-sm text-charcoal-light/80 mt-4">
            Not sure yet?{" "}
            <a
              href="https://calendly.com/tabitha-kingdomsolutionsai/victors-circle-leadership-academy-inquiry-call"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-gold/50 hover:text-gold transition-colors"
            >
              Book an Inquiry Call
            </a>{" "}
            to talk it through first.
          </p>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20 lg:py-24">
        <div className="container max-w-2xl text-center">
          <p className="editorial-label mb-4">Is This You?</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-tight mb-10">
            This is for you if you're already carrying real responsibility — as a founder, an
            executive, a coach or consultant, or a leader in your ministry or organization.
          </h2>
          <div className="space-y-5 text-left">
            {[
              "You're the one people come to when a decision has to get made.",
              "You're leading through real pressure — growth, transition, or a season asking more of you than the last one did.",
              "You want to lead from decisiveness and settled confidence, not second-guessing or overextension.",
              "You want your leadership to be sustainable — not something that quietly costs you your peace.",
              "You're looking for a faith-rooted space built specifically for women carrying this kind of weight.",
            ].map((line, i) => (
              <p key={i} className="font-body text-base text-charcoal-light leading-relaxed pl-6 border-l-2 border-gold/40">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL WALK AWAY WITH */}
      <section className="py-20 lg:py-24">
        <div className="container max-w-2xl text-center">
          <p className="editorial-label mb-4">What You'll Walk Away With</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-tight mb-6">
            Built from years of setting goals and strategy for individuals and entire teams — this
            isn't theory.
          </h2>
          <p className="font-body text-sm text-charcoal-light/70 uppercase tracking-[0.08em] mb-10">
            By the end of 30 days, you'll have:
          </p>
          <div className="space-y-5 text-left">
            {[
              "A decision-making practice you can actually use under pressure",
              "One boundary or hard conversation finally had — not just planned",
              "Clarity on whether what's holding you back is a belief, a boundary, or a structural gap — and what to do about it",
              "A personal growth strategy built to protect your capacity — mentally, physically, and financially",
              "A rhythm that outlasts the 30 days",
            ].map((line, i) => (
              <p key={i} className="font-body text-base text-charcoal-light leading-relaxed pl-6 border-l-2 border-gold/40">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="py-20 lg:py-24 bg-cream/40 border-y border-gold/20">
        <div className="container max-w-4xl">
          <p className="editorial-label text-center mb-4">The Four-Week Journey</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-tight text-center mb-14">
            Grounded. Clear. Confident. Strong.
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {WEEKS.map((w) => (
              <div key={w.n} className="border border-gold/30 rounded-sm p-7 bg-white/60">
                <span className="editorial-label !mb-0 text-gold">{w.n}</span>
                <h3 className="font-display text-xl font-medium text-charcoal mt-2 mb-2">
                  {w.title}
                </h3>
                <p className="font-body text-sm text-charcoal-light leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-20 lg:py-24">
        <div className="container max-w-2xl">
          <p className="editorial-label text-center mb-4">What's Included</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-tight text-center mb-12">
            A complete support system for the 30 days — and beyond.
          </h2>
          <div className="border border-gold/30 rounded-sm divide-y divide-gold/20 bg-white/60">
            {INCLUSIONS.map((item, i) => (
              <div key={i} className="flex items-start gap-4 px-6 py-4">
                <span className="text-gold font-display text-lg leading-none mt-0.5">✦</span>
                <span className="font-body text-sm text-charcoal leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
          <p className="font-body text-xs text-charcoal-light/70 uppercase tracking-[0.08em] text-center mt-6">
            A package valued at over $3,000
          </p>
        </div>
      </section>

      {/* APPLICATION */}
      <section id="apply" className="py-20 lg:py-24 bg-charcoal text-cream">
        <div className="container max-w-xl">
          <div className="text-center mb-10">
            <p className="editorial-label !text-gold mb-4">January 2027 Cohort · Application</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight mb-4">
              Apply for Victor's Circle.
            </h2>
            <p className="font-body text-sm text-cream/70 leading-relaxed">
              Applications are reviewed personally. We'll follow up by email with next steps and
              enrollment details.
            </p>
            <p className="font-body text-sm text-cream/60 leading-relaxed mt-3">
              Not ready to apply?{" "}
              <a
                href="https://calendly.com/tabitha-kingdomsolutionsai/victors-circle-leadership-academy-inquiry-call"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-gold/50 hover:text-gold transition-colors"
              >
                Book an Inquiry Call
              </a>{" "}
              instead.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <p className="editorial-label !text-gold mb-4">Application Received</p>
              <h3 className="font-display text-2xl font-medium mb-4">
                Thank you, {form.firstName}.
              </h3>
              <p className="font-body text-sm text-cream/70 leading-relaxed">
                Your application is in. Check your inbox at <strong>{form.email}</strong> for
                confirmation, and we'll be in touch personally with next steps for the January
                cohort.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="First name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="rounded-sm bg-cream/5 border border-cream/20 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold"
                />
                <input
                  required
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="rounded-sm bg-cream/5 border border-cream/20 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold"
                />
              </div>
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-sm bg-cream/5 border border-cream/20 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  placeholder="Phone (optional)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="rounded-sm bg-cream/5 border border-cream/20 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold"
                />
                <input
                  required
                  placeholder="Current role / life season"
                  value={form.currentRole}
                  onChange={(e) => setForm({ ...form, currentRole: e.target.value })}
                  className="rounded-sm bg-cream/5 border border-cream/20 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold"
                />
              </div>
              <textarea
                required
                rows={4}
                placeholder="What's bringing you to Victor's Circle right now?"
                value={form.motivation}
                onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                className="w-full rounded-sm bg-cream/5 border border-cream/20 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold resize-none"
              />
              <label className="flex items-start gap-3 text-xs text-cream/70 leading-relaxed pt-1">
                <input
                  required
                  type="checkbox"
                  checked={form.commitmentConfirmed}
                  onChange={(e) =>
                    setForm({ ...form, commitmentConfirmed: e.target.checked })
                  }
                  className="mt-0.5"
                />
                I understand this is a paid cohort program and I'm ready to commit to the full
                experience if accepted.
              </label>
              <button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full rounded-sm bg-gold text-charcoal font-body text-[0.72rem] font-medium tracking-[0.1em] uppercase px-6 py-4 hover:bg-gold/90 transition-colors disabled:opacity-60"
              >
                {submitMutation.isPending ? "Submitting…" : "Submit My Application →"}
              </button>
              {submitMutation.isError && (
                <p className="text-xs text-red-400 text-center pt-1">
                  Something went wrong submitting your application. Please try again, or email us
                  directly.
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </>
  );
}
