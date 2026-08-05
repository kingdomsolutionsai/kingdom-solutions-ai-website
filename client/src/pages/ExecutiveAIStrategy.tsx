import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight } from "lucide-react";

export default function ExecutiveAIStrategy() {
  usePageMeta({
    title: "Executive AI Strategy — Custom AI Systems Advisory | Kingdom Solutions AI™",
    description: "Executive AI Strategy is the premium advisory layer for leaders who need a custom AI systems roadmap, Capacity Reset™ methodology, and deeper implementation planning. Private strategy engagement.",
    canonicalUrl: "https://kingdomsolutionsai.com/executive-ai-strategy",
    ogImage: "https://kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
  });
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      {/* Hero — dark, premium advisory */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-charcoal">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 fade-up">
              <p className="editorial-label mb-6">Premium Advisory</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-cream-dark leading-[1.08] mb-8">
                For Leaders Who Need the Right AI Strategy Before They Add Another Tool.
              </h1>
              <p className="font-body text-lg lg:text-xl text-warm-gray leading-relaxed max-w-xl mb-10">
                Executive AI Strategy helps high-capacity leaders identify where clarity, capacity, follow-up, and operations are breaking — then design the right AI systems to support the business without adding more noise.
              </p>
              <Link
                href="/strategy-call"
                className="btn-gold rounded-sm inline-flex items-center gap-2"
              >
                Book a Strategy Call <ArrowRight size={16} />
              </Link>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 hidden lg:flex items-end fade-up">
              <div className="border-l border-gold/20 pl-8 space-y-6">
                <div>
                  <p className="font-body text-xs tracking-[0.12em] uppercase text-gold/60 mb-1">Engagement</p>
                  <p className="font-body text-sm text-cream-dark/80">Private strategic advisory</p>
                </div>
                <div>
                  <p className="font-body text-xs tracking-[0.12em] uppercase text-gold/60 mb-1">Methodology</p>
                  <p className="font-body text-sm text-cream-dark/80">Capacity Reset™</p>
                </div>
                <div>
                  <p className="font-body text-xs tracking-[0.12em] uppercase text-gold/60 mb-1">Outcome</p>
                  <p className="font-body text-sm text-cream-dark/80">Custom AI systems roadmap</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When One Tool Is Not Enough — asymmetric */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 fade-up">
            <div className="lg:col-span-4 lg:col-start-2">
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-snug">
                When One Tool Is Not Enough
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-7">
              <p className="font-body text-base text-charcoal-light leading-relaxed mb-6">
                Some leaders do not need a single system. They need a strategic operating model — a clear understanding of which systems should come first, what should be delegated, and how to protect the leader while building the business.
              </p>
              <p className="font-body text-base text-charcoal-light leading-relaxed">
                Executive AI Strategy is the premium advisory layer for leaders who need more than a single product. It is where custom AI systems strategy, Capacity Reset™ methodology, and deeper implementation planning live.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="gold-hairline" /></div>

      {/* What It Helps Clarify — document-style blocks */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 fade-up">
              <div className="lg:col-span-6">
                <p className="editorial-label mb-4">Strategic Clarity</p>
                <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal">
                  What Executive AI Strategy Helps Clarify
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 fade-up">
              {[
                { num: "01", title: "Where Capacity Is Leaking", desc: "Identify the specific operational areas where time, focus, and revenue are being lost — before choosing a solution." },
                { num: "02", title: "Which Systems Should Come First", desc: "Not everything needs to be built at once. We help you prioritize based on impact, readiness, and resource." },
                { num: "03", title: "What Should Be Systematized, Delegated, or Simplified", desc: "Not every problem needs AI. Some need process. Some need people. We help you see the difference." },
                { num: "04", title: "How to Protect the Leader While Building the Business", desc: "The goal is not to add more. It is to create structure that holds — so the leader can lead without carrying." },
              ].map((item) => (
                <div key={item.num} className="flex gap-5">
                  <span className="font-display text-2xl font-light text-gold/30 shrink-0 w-8">{item.num}</span>
                  <div>
                    <h3 className="font-display text-lg font-medium text-charcoal mb-2">{item.title}</h3>
                    <p className="font-body text-sm text-charcoal-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capacity Reset — asymmetric */}
      <section className="py-20 lg:py-28 bg-cream-dark">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 fade-up">
            <div className="lg:col-span-4 lg:col-start-2">
              <p className="editorial-label mb-4">Methodology</p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-snug">
                The Capacity Reset™
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-7">
              <p className="font-body text-base text-charcoal-light leading-relaxed mb-6">
                The Capacity Reset™ is part of the Kingdom Solutions AI™ method for identifying where time, schedule pressure, follow-up gaps, and operational overload are draining leadership capacity.
              </p>
              <p className="font-body text-base text-charcoal-light leading-relaxed">
                Within Executive AI Strategy, this methodology is used to diagnose and restructure how the leader’s week, systems, and support rhythms operate — creating protected time, restored focus, clearer priorities, and sustainable capacity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For + What You Walk Away With — side by side */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            <div className="fade-up">
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-charcoal mb-8">
                Who This Is For
              </h2>
              <div className="space-y-4">
                {[
                  "Founders who have outgrown DIY systems and need strategic infrastructure",
                  "Executives managing complex operations with no clear AI roadmap",
                  "Consultants scaling beyond one-to-one and needing operational support systems",
                  "Leaders who have tried multiple tools and still feel like the bottleneck",
                  "Organizations ready to invest in custom AI strategy, not generic solutions",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-4 h-px bg-gold/50 mt-3 shrink-0" />
                    <p className="font-body text-sm text-charcoal-light leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-up">
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-charcoal mb-8">
                What You Walk Away With
              </h2>
              <div className="space-y-4">
                {[
                  "A clear map of where your business is leaking capacity",
                  "A prioritized AI systems roadmap — what to build first, second, and later",
                  "Strategic recommendations on systematization, delegation, and simplification",
                  "A Capacity Reset™ diagnosis of your operational week",
                  "An implementation plan designed around your leadership context and resources",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-4 h-px bg-charcoal/20 mt-3 shrink-0" />
                    <p className="font-body text-sm text-charcoal-light leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA — dark, invitational */}
      <section className="py-20 lg:py-28 bg-charcoal">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center fade-up">
            <div className="gold-hairline mb-10 max-w-[80px] mx-auto" />
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-cream-dark mb-6">
              Ready for a strategic AI operating model?
            </h2>
            <p className="font-body text-lg text-warm-gray leading-relaxed mb-10">
              Executive AI Strategy begins with a private strategy call to assess your leadership context, operational pressure, and systems needs.
            </p>
            <Link
              href="/strategy-call"
              className="btn-gold rounded-sm inline-flex items-center gap-2"
            >
              Book a Strategy Call <ArrowRight size={16} />
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}
