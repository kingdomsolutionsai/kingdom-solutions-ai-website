import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight, Download } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

const HANDBOOK_PDF = "/assets/handbook.pdf";
const WEBINAR_URL = "https://whatentrepreneursneedtoknow.com";

export default function Handbook() {
  usePageMeta({
    title: "The Entrepreneur Handbook — What Every New Entrepreneur Needs to Know | Kingdom Solutions AI™",
    description:
      "A free step-by-step handbook for moving from expertise and vision to a clear, compliant, revenue-ready business — in the right order, without the overwhelm. From Kingdom Solutions AI™.",
    canonicalUrl: "https://kingdomsolutionsai.com/handbook",
    ogImage: "https://kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
  });

  const revealRef = useScrollReveal();
  const [formData, setFormData] = useState({ firstName: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.forms.submitHandbookRequest.useMutation({
    onSuccess: () => setSubmitted(true),
    // Never trap the reader — if the backend hiccups, still reveal the download.
    onError: () => setSubmitted(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <div ref={revealRef}>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-cream">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center fade-up">
            <img
              src="/assets/ksai-logo-transparent-400_82fa1f46.png"
              alt="Kingdom Solutions AI™"
              className="w-16 h-16 mx-auto mb-6"
            />
            <p className="editorial-label mb-6">The Emerging Entrepreneur Series</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-medium text-charcoal leading-[1.1] mb-6">
              What Every New Entrepreneur{" "}
              <em className="text-gold italic">Needs to Know</em>
            </h1>
            <p className="font-body text-lg lg:text-xl text-charcoal-light leading-relaxed max-w-2xl mx-auto mb-10">
              A step-by-step handbook for moving from expertise and vision to a
              clear, compliant, revenue-ready business—in the right order,
              without the overwhelm.
            </p>
            <a href="#get-handbook" className="btn-gold rounded-sm inline-flex items-center gap-2">
              Get the Handbook <ArrowRight size={16} />
            </a>
            <p className="font-body text-xs tracking-[0.1em] uppercase text-charcoal-light mt-5">
              Free · delivered to your inbox
            </p>
          </div>
        </div>
      </section>

      <div className="container"><div className="gold-hairline" /></div>

      {/* The principle */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center fade-up">
            <p className="editorial-label mb-5">The Fast-Track Principle</p>
            <p className="font-display text-2xl sm:text-3xl font-medium text-charcoal leading-snug">
              Clarity before complexity. Paid proof before scale.{" "}
              <em className="text-gold italic">Systems after the process works.</em>
            </p>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-16 lg:py-24 bg-cream-dark">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14 fade-up">
              <p className="editorial-label mb-4">What's Inside</p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal">
                The whole path, in the right order.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 fade-up">
              {[
                { num: "01", title: "The Eight Systems", desc: "The systems every healthy business needs—and how to tell which one is quietly limiting all the others." },
                { num: "02", title: "The Correct Start Order", desc: "From founder readiness to customer validation, offer design, and paid proof—so you build in the right sequence." },
                { num: "03", title: "Legal, Tax & Protection", desc: "Structure, EIN, licensing, banking, insurance, contracts, copyright, and trademarks—explained plainly." },
                { num: "04", title: "The Revenue Engine", desc: "A minimum launch kit, a simple pipeline, a pressure-free sales process, and a referral loop that compounds." },
                { num: "05", title: "Operating Rhythms", desc: "A daily command center plus weekly, monthly, quarterly, and annual reviews that guide action, not anxiety." },
                { num: "06", title: "Using AI Wisely", desc: "One tool at a time, human authority retained, data protected—automating only what's already proven." },
              ].map((item) => (
                <div key={item.num} className="flex gap-5">
                  <span className="font-display text-2xl font-light text-gold/40 shrink-0 w-8">{item.num}</span>
                  <div>
                    <h3 className="font-display text-lg font-medium text-charcoal mb-2">{item.title}</h3>
                    <p className="font-body text-sm text-charcoal-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-body text-sm text-charcoal-light text-center mt-14 max-w-2xl mx-auto fade-up">
              Plus a practical <span className="text-charcoal font-medium">90-Day Fast-Track Roadmap</span>—clarity to
              validation to paid proof to a repeatable engine.
            </p>
          </div>
        </div>
      </section>

      <div className="container"><div className="gold-hairline" /></div>

      {/* Email capture / download */}
      <section id="get-handbook" className="py-20 lg:py-28 bg-cream">
        <div className="container">
          <div className="max-w-xl mx-auto">
            {!submitted ? (
              <div className="fade-up">
                <div className="text-center mb-10">
                  <p className="editorial-label mb-4">Get Your Copy</p>
                  <h2 className="font-display text-3xl font-medium text-charcoal mb-3">
                    Send me the Handbook
                  </h2>
                  <p className="font-body text-base text-charcoal-light">
                    Enter your name and email—your copy arrives in your inbox,
                    and downloads right here.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-card border border-taupe rounded-sm p-8 lg:p-10 space-y-5">
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
                  <button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="w-full btn-gold rounded-sm disabled:opacity-60"
                  >
                    {submitMutation.isPending ? "Preparing your copy…" : "Send me the Handbook"}
                  </button>
                  <p className="font-body text-xs text-charcoal-light text-center">
                    Free. No spam. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            ) : (
              <div className="fade-up text-center bg-card border border-taupe rounded-sm p-10 lg:p-12">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-medium text-charcoal mb-3">
                  Your Handbook is on its way.
                </h3>
                <p className="font-body text-base text-charcoal-light leading-relaxed mb-8">
                  Check your inbox for your copy—and you can download it right
                  now below.
                </p>
                <a
                  href={HANDBOOK_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold rounded-sm inline-flex items-center gap-2"
                >
                  <Download size={16} /> Download the Handbook
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container"><div className="gold-hairline" /></div>

      {/* What's next */}
      <section className="py-20 lg:py-28 bg-charcoal">
        <div className="container">
          <div className="text-center mb-14 fade-up">
            <p className="editorial-label mb-4">When You're Ready</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-cream-dark">
              Your next right step.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto fade-up">
            {/* Webinar — live */}
            <a
              href={WEBINAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-gold/25 rounded-sm p-8 hover:border-gold/60 transition-colors"
            >
              <p className="font-body text-[0.7rem] tracking-[0.16em] uppercase text-gold mb-4">Live Event</p>
              <h3 className="font-display text-2xl font-medium text-cream-dark mb-3">
                Join the Webinar
              </h3>
              <p className="font-body text-sm text-warm-gray leading-relaxed mb-6">
                Go deeper on the eight-systems framework, live. See the ideas in
                the Handbook put to work.
              </p>
              <span className="font-body text-sm text-gold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Register <ArrowRight size={15} />
              </span>
            </a>

            {/* Entrepreneur Next Step Assessment — activate when built.
                When /entrepreneur-assessment exists, change this <div> to a
                <Link to="/entrepreneur-assessment"> and drop the "Coming soon" pill. */}
            <div className="border border-gold/15 rounded-sm p-8 opacity-90">
              <p className="font-body text-[0.7rem] tracking-[0.16em] uppercase text-gold mb-4">
                Coming Soon
              </p>
              <h3 className="font-display text-2xl font-medium text-cream-dark mb-3">
                The Entrepreneur Next Step™ Assessment
              </h3>
              <p className="font-body text-sm text-warm-gray leading-relaxed mb-6">
                Not sure what to do next? Find your current stage—and what you
                can stop worrying about for now—in about three minutes.
              </p>
              <span className="font-body text-sm text-warm-gray/70 inline-flex items-center gap-2">
                Launching soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance note */}
      <section className="py-8 bg-cream">
        <div className="container">
          <p className="font-body text-xs text-warm-gray text-center max-w-2xl mx-auto leading-relaxed">
            This handbook is educational and is not legal, tax, financial,
            insurance, or licensing advice. Requirements vary by location and
            profession—confirm with qualified professionals and official
            agencies before acting.
          </p>
        </div>
      </section>
    </div>
  );
}
