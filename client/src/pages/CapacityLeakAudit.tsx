import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function CapacityLeakAudit() {
  usePageMeta({
    title: "Capacity Leak Audit™ — Find Where Your Business Is Leaking | Kingdom Solutions AI™",
    description: "The Capacity Leak Audit™ helps leaders identify where time, clarity, focus, follow-up, or revenue is leaking — so you can build the right system next. Free strategic diagnostic from Kingdom Solutions AI™.",
    canonicalUrl: "https://kingdomsolutionsai.com/capacity-leak-audit",
    ogImage: "https://kingdomsolutionsai.com/manus-storage/capacity-audit-visual_7655f585.png",
  });
  const revealRef = useScrollReveal();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    company: "",
    challenge: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.forms.submitCapacityLeakAudit.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <div ref={revealRef}>
      {/* Hero — diagnostic document feel */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url(/manus-storage/capacity-audit-visual_7655f585.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/50 to-cream" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 fade-up">
              <img
                src="/manus-storage/ksai-logo-transparent-400_82fa1f46.png"
                alt="Kingdom Solutions AI™"
                className="w-16 h-16 mb-6"
              />
              <div className="flex items-center gap-3 mb-6">
                <p className="editorial-label">Executive Diagnostic</p>
                <span className="w-6 h-px bg-gold/50" />
                <p className="editorial-label">No Login Required</p>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-charcoal leading-[1.08] mb-8">
                Find Where Your Business Is Leaking{" "}
                <em className="text-gold italic">Capacity.</em>
              </h1>
              <p className="font-body text-lg lg:text-xl text-charcoal-light leading-relaxed max-w-xl mb-10">
                The Capacity Leak Audit™ helps you identify where time, follow-up, focus, clarity, and revenue are quietly slipping through the cracks — so you can choose the right system to fix it.
              </p>
              <a href="#start-audit" className="btn-gold rounded-sm inline-flex items-center gap-2">
                Take the Capacity Leak Audit™ <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic Intro — asymmetric two-column */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5 lg:col-start-2 fade-up">
              <p className="font-display text-2xl sm:text-3xl font-medium text-charcoal leading-snug">
                You are not overwhelmed because you lack discipline.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-7 fade-up">
              <p className="font-body text-base text-charcoal-light leading-relaxed mb-6">
                You are overwhelmed because too much of the business still depends on you remembering, tracking, deciding, following up, preparing, and holding everything together.
              </p>
              <p className="font-body text-base text-charcoal-light leading-relaxed mb-8">
                The Capacity Leak Audit™ is designed to help you see where the breakdown is happening:
              </p>
              <div className="space-y-3 pl-5 border-l border-gold/30">
                {["Is it clarity?", "Is it capacity?", "Is it follow-up?", "Is it your calendar?", "Is it your offer?", "Is it operational visibility?"].map((q, i) => (
                  <p key={i} className="font-body text-sm text-charcoal italic">{q}</p>
                ))}
              </div>
              <p className="font-body text-base text-charcoal-light leading-relaxed mt-8">
                Before you add another tool, course, hire, or content plan, you need to know where the leak is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What the Audit Reveals — document-style blocks, not uniform cards */}
      <section className="py-20 lg:py-28 bg-cream-dark">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
              <div className="lg:col-span-5 fade-up">
                <p className="editorial-label mb-4">Diagnostic Framework</p>
                <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal">
                  What the Audit Helps Reveal
                </h2>
              </div>
            </div>

            {/* Staggered diagnostic blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 fade-up">
              {[
                { num: "01", title: "Clarity Leaks", desc: "Unclear niche, unclear offer, unclear messaging, inconsistent content, or a business voice that does not yet sound distinct." },
                { num: "02", title: "Capacity Leaks", desc: "Overloaded calendar, too many decisions, scattered priorities, and a business that still depends too heavily on the leader." },
                { num: "03", title: "Follow-Up Leaks", desc: "Dropped leads, delayed responses, inconsistent CRM updates, or revenue opportunities going cold." },
                { num: "04", title: "Operational Leaks", desc: "Inbox chaos, meeting prep gaps, lack of visibility, disconnected systems, or repeatable work still being carried manually." },
                { num: "05", title: "Revenue Leaks", desc: "Missed opportunities caused by unclear offers, weak follow-up, slow response time, or lack of systemized next steps." },
              ].map((card) => (
                <div key={card.num} className="flex gap-5">
                  <span className="font-display text-2xl font-light text-gold/30 shrink-0 w-8">{card.num}</span>
                  <div>
                    <h3 className="font-display text-lg font-medium text-charcoal mb-2">{card.title}</h3>
                    <p className="font-body text-sm text-charcoal-light leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gold hairline */}
      <div className="container"><div className="gold-hairline" /></div>

      {/* What Happens After — routing section */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 lg:col-start-2 fade-up">
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal">
                What Happens After the Audit
              </h2>
              <p className="font-body text-base text-charcoal-light leading-relaxed mt-4">
                The audit helps route you into the right next step.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-7 space-y-6 fade-up">
              <div className="pl-6 border-l border-gold/40">
                <p className="font-body text-base text-charcoal-light leading-relaxed">
                  If your biggest leak is <strong className="text-charcoal">clarity</strong>, <Link href="/clarity-pro" className="text-gold hover:text-gold-dark underline underline-offset-4">Clarity Pro™</Link> may be the right fit.
                </p>
              </div>
              <div className="pl-6 border-l border-charcoal/15">
                <p className="font-body text-base text-charcoal-light leading-relaxed">
                  If your biggest leak is <strong className="text-charcoal">operational capacity</strong>, <Link href="/constance" className="text-gold hover:text-gold-dark underline underline-offset-4">Constance™</Link> may be the right fit.
                </p>
              </div>
              <div className="pl-6 border-l border-charcoal/15">
                <p className="font-body text-base text-charcoal-light leading-relaxed">
                  If your business has <strong className="text-charcoal">multiple systems breaking at once</strong>, <Link href="/executive-ai-strategy" className="text-gold hover:text-gold-dark underline underline-offset-4">Executive AI Strategy</Link> may be the right fit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Start Audit Form */}
      <section id="start-audit" className="py-20 lg:py-28 bg-cream-dark">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {!submitted ? (
              <div className="fade-up">
                <div className="mb-10">
                  <p className="editorial-label mb-4">Step 1 · Tell Us Who You Are</p>
                  <h2 className="font-display text-3xl font-medium text-charcoal mb-3">
                    Begin Your Capacity Leak Audit™
                  </h2>
                  <p className="font-body text-base text-charcoal-light">
                    Six fields. Your private audit begins immediately.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-card border border-taupe rounded-sm p-8 lg:p-10 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-body text-sm font-medium text-charcoal mb-2 block">First Name</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-charcoal mb-2 block">Last Name</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-charcoal mb-2 block">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-body text-sm font-medium text-charcoal mb-2 block">Role</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors"
                        placeholder="Founder, Coach, Executive..."
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-charcoal mb-2 block">Company or Ministry Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors"
                        placeholder="Your organization"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-charcoal mb-2 block">Biggest Capacity Challenge Right Now</label>
                    <textarea
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors resize-none"
                      placeholder="Where is your capacity leaking? What never seems to get done?"
                    />
                  </div>
                  <button type="submit" className="w-full btn-gold rounded-sm">
                    Start the Capacity Leak Audit™
                  </button>
                  <p className="font-body text-xs text-warm-gray text-center">
                    We respect your inbox. Your information is used only to personalize your audit and send you your results.
                  </p>
                </form>
              </div>
            ) : (
              <div className="fade-up text-center bg-card border border-taupe rounded-sm p-12">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-medium text-charcoal mb-4">
                  Your audit is being prepared.
                </h3>
                <p className="font-body text-base text-charcoal-light leading-relaxed mb-6">
                  Over the next 24 hours, you will receive your personalized Capacity Leak Audit™ results and recommended next steps.
                </p>
                <p className="font-body text-sm text-warm-gray">
                  Please check your email for next steps.
                </p>
              </div>
            )}

            {/* Privacy Note */}
            <p className="font-body text-xs text-warm-gray text-center mt-8 max-w-lg mx-auto">
              The Capacity Leak Audit™ is designed to assess business clarity, capacity, and operational pressure. Do not enter passwords, payment details, confidential client files, legal documents, medical records, or unnecessary sensitive information.
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}
