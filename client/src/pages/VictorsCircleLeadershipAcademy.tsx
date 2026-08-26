import { useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { trpc } from "@/lib/trpc";

/**
 * Victor's Circle Leadership Academy™
 * Premier / flagship program page. Christ-centered leadership formation
 * for Christian women entrepreneurs. Paid cohort — applications only.
 *
 * NOTE TO TABITHA: The copy below (pillars, program details, cohort dates)
 * is a starting draft written to match the site's tone and layout. Please
 * swap in your real curriculum language, price, dates, and any testimonials
 * from your existing revivedspirit.com page before this goes live. Search
 * for "PLACEHOLDER" comments below to find what to review first.
 */

const PILLARS = [
  {
    n: "01",
    title: "Identity & Calling",
    desc: "Anchoring your leadership in who God says you are, not in your title, your revenue, or your reach — so your decisions come from a settled place, not a scramble.",
  },
  {
    n: "02",
    title: "Wisdom & Discernment",
    desc: "Learning to hear God clearly in the decisions that actually matter — hiring, pricing, partnerships, timing — instead of leading purely on instinct or industry noise.",
  },
  {
    n: "03",
    title: "Leadership Capacity",
    desc: "Building the internal steadiness and practical skill to lead a team, a household, and a growing business without burning out or losing yourself in the process.",
  },
  {
    n: "04",
    title: "Kingdom Impact",
    desc: "Connecting your work to something larger than your own success — building a business and a life that leave a legacy, not just a bank balance.",
  },
];

export default function VictorsCircleLeadershipAcademy() {
  usePageMeta({
    title: "Victor's Circle Leadership Academy™ — Christ-Centered Leadership for Women | Kingdom Solutions AI™",
    description:
      "Victor's Circle Leadership Academy™ is a Christ-centered leadership formation program for Christian women entrepreneurs. Now accepting applications for the January cohort.",
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
          <p className="editorial-label mb-4">Premier Program · For Women Entrepreneurs</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-charcoal leading-tight mb-6">
            Victor's Circle Leadership Academy&trade;
          </h1>
          <p className="font-body text-lg sm:text-xl text-charcoal-light leading-relaxed max-w-2xl mx-auto mb-10">
            A Christ-centered leadership formation program for Christian women called to lead —
            in their business, their home, and their calling. This is where clarity, capacity,
            and conviction come together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#apply"
              className="rounded-sm inline-flex items-center gap-2 bg-charcoal text-cream font-body text-[0.72rem] font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-charcoal/90 transition-colors"
            >
              Apply for the January Cohort →
            </a>
          </div>
          <p className="font-body text-xs text-charcoal-light/70 uppercase tracking-[0.08em] mt-5">
            Now accepting applications · Limited seats
          </p>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="py-20 lg:py-24">
        <div className="container max-w-2xl text-center">
          <p className="editorial-label mb-4">This Isn't Another Business Program</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-tight mb-6">
            Leadership formation, not just tactics.
          </h2>
          <p className="font-body text-base text-charcoal-light leading-relaxed">
            {/* PLACEHOLDER: replace with your own language from revivedspirit.com */}
            Most programs hand you strategy. Victor's Circle builds the woman who can carry it.
            Over the course of the cohort, you'll be formed in your identity, sharpened in your
            discernment, and equipped to lead — so the growth in your business is matched by
            growth in you.
          </p>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-20 lg:py-24 bg-cream/40 border-y border-gold/20">
        <div className="container max-w-4xl">
          <p className="editorial-label text-center mb-4">The Four Pillars</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-tight text-center mb-14">
            What you'll walk through.
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {PILLARS.map((p) => (
              <div key={p.n} className="border border-gold/30 rounded-sm p-7 bg-white/60">
                <span className="font-display text-3xl text-gold">{p.n}</span>
                <h3 className="font-display text-xl font-medium text-charcoal mt-3 mb-2">
                  {p.title}
                </h3>
                <p className="font-body text-sm text-charcoal-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20 lg:py-24">
        <div className="container max-w-2xl text-center">
          <p className="editorial-label mb-4">Who This Is For</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-tight mb-6">
            Christian women entrepreneurs ready to lead differently.
          </h2>
          <p className="font-body text-base text-charcoal-light leading-relaxed">
            {/* PLACEHOLDER: replace with your real audience description */}
            Victor's Circle is built for the woman already leading a business, a team, or a
            calling — who wants her leadership to be shaped by her faith, not separated from it.
            If you're ready to grow as a leader, not just grow your revenue, you're in the right
            place.
          </p>
        </div>
      </section>

      {/* APPLICATION */}
      <section id="apply" className="py-20 lg:py-24 bg-charcoal text-cream">
        <div className="container max-w-xl">
          <div className="text-center mb-10">
            <p className="editorial-label !text-gold mb-4">January Cohort · Application</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight mb-4">
              Apply for Victor's Circle.
            </h2>
            <p className="font-body text-sm text-cream/70 leading-relaxed">
              Applications are reviewed personally. We'll follow up by email with next steps and
              enrollment details.
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
                  placeholder="Current role / business"
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
