import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight } from "lucide-react";

export default function Home() {
  usePageMeta({
    title: "Kingdom Solutions AI™ — Strategic AI Systems for High-Capacity Leaders",
    description: "Kingdom Solutions AI™ helps coaches, founders, consultants, and executives build strategic AI systems for clarity, capacity, and intelligent support. Premium advisory by Tabitha Rector.",
    canonicalUrl: "https://kingdomsolutionsai.com/",
    ogImage: "https://kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
  });
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      {/* Hero Section — premium executive invitation */}
      <section className="relative min-h-[92vh] flex items-center pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/assets/hero-abstract_83e59dd7.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/75 to-cream" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 py-24 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 lg:col-start-1">
              {/* Elegant gold accent line */}
              <div className="w-16 h-[2px] bg-gold mb-10 fade-up" />
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-medium text-charcoal leading-[1.1] mb-8 fade-up">
                Build your business with clarity, capacity, and{" "}
                <em className="text-gold italic">intelligent support.</em>
              </h1>
              <p className="font-body text-lg lg:text-xl text-charcoal-light leading-[1.7] max-w-2xl mb-12 fade-up">
                Kingdom Solutions AI™ helps new coaches, founders, consultants, executives, and high-capacity leaders clarify their message, protect their time, and install the right AI-supported systems for their next stage of growth.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-5 fade-up">
                <a href="#pathways" className="bg-charcoal text-cream-dark font-body text-[0.78rem] font-medium tracking-[0.08em] uppercase px-8 py-4 inline-flex items-center gap-3 transition-all duration-300 hover:bg-charcoal/90 active:scale-[0.97]">
                  Choose Your Next System <ArrowRight size={15} />
                </a>
                <Link href="/capacity-leak-audit" className="font-body text-[0.82rem] font-medium text-charcoal/60 hover:text-gold inline-flex items-center gap-2 py-4 transition-colors duration-300">
                  Take the Capacity Leak Audit™ <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="gold-hairline" />
      </div>

      {/* Section 2 — "Your business was never meant..." — powerful context line */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-8 lg:col-start-3 text-center fade-up">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-medium text-charcoal leading-[1.15] mb-6">
                Your business was never meant to be carried by your{" "}
                <em className="text-gold italic">nervous system.</em>
              </h2>
              <p className="font-body text-lg text-charcoal-light leading-relaxed max-w-2xl mx-auto">
                Most high-capacity leaders are running on adrenaline, not infrastructure. Kingdom Solutions AI™ builds the systems that let you lead from clarity instead of survival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gold divider — before Pathways */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="gold-hairline" />
      </div>

      {/* Section 3 — Premium Advisory Pathways */}
      <section id="pathways" className="py-28 lg:py-40 bg-cream scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Section header — asymmetric */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
            <div className="lg:col-span-6 lg:col-start-1 fade-up">
              <p className="editorial-label mb-5">Strategic Pathways</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.5rem] font-medium text-charcoal leading-[1.15]">
                Choose the support your business needs next.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-8 flex items-end fade-up">
              <p className="font-body text-base text-charcoal-light leading-relaxed">
                If you already know what you need, go directly to the right system. If you are not sure where time, clarity, follow-up, or revenue is leaking, start with the Capacity Leak Audit™.
              </p>
            </div>
          </div>

          {/* Three premium advisory pathway panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-taupe/60 fade-up">
            {/* Pathway 1 — Clarity Pro */}
            <div className="group p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-taupe/60 transition-colors duration-500 hover:bg-cream-dark/40">
              <p className="font-body text-[0.7rem] tracking-[0.16em] uppercase text-gold font-medium mb-8">
                I need clarity.
              </p>
              <h3 className="font-display text-2xl lg:text-[1.65rem] font-medium text-charcoal mb-4 leading-snug">
                Clarity Pro™
              </h3>
              <div className="w-10 h-[1px] bg-gold/50 mb-6" />
              <p className="font-body text-sm text-charcoal-light leading-[1.8] mb-10">
                For new coaches, founders, consultants, corporate escapees, and experienced professionals who need a clear niche, strong offer, distinct business voice, messaging, and content strategy.
              </p>
              <Link
                href="/clarity-pro"
                className="font-body text-[0.78rem] font-medium text-charcoal/70 hover:text-gold inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-gold"
              >
                Explore Clarity Pro™ <ArrowRight size={14} />
              </Link>
            </div>

            {/* Pathway 2 — Constance */}
            <div className="group p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-taupe/60 transition-colors duration-500 hover:bg-cream-dark/40">
              <p className="font-body text-[0.7rem] tracking-[0.16em] uppercase text-gold font-medium mb-8">
                I need operational capacity.
              </p>
              <h3 className="font-display text-2xl lg:text-[1.65rem] font-medium text-charcoal mb-4 leading-snug">
                Constance™ AI Chief of Staff
              </h3>
              <div className="w-10 h-[1px] bg-gold/50 mb-6" />
              <p className="font-body text-sm text-charcoal-light leading-[1.8] mb-10">
                For founders, coaches, consultants, executives, and high-capacity leaders who need support around inbox, calendar, CRM, follow-up, meeting prep, and operational visibility.
              </p>
              <Link
                href="/constance"
                className="font-body text-[0.78rem] font-medium text-charcoal/70 hover:text-gold inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-gold"
              >
                Meet Constance™ <ArrowRight size={14} />
              </Link>
            </div>

            {/* Pathway 3 — Capacity Leak Audit */}
            <div className="group p-10 lg:p-12 transition-colors duration-500 hover:bg-cream-dark/40">
              <p className="font-body text-[0.7rem] tracking-[0.16em] uppercase text-gold font-medium mb-8">
                I need a diagnosis.
              </p>
              <h3 className="font-display text-2xl lg:text-[1.65rem] font-medium text-charcoal mb-4 leading-snug">
                Capacity Leak Audit™
              </h3>
              <div className="w-10 h-[1px] bg-gold/50 mb-6" />
              <p className="font-body text-sm text-charcoal-light leading-[1.8] mb-10">
                For leaders who know something is leaking — time, clarity, focus, follow-up, capacity, or revenue — but need help identifying where the breakdown is happening.
              </p>
              <Link
                href="/capacity-leak-audit"
                className="font-body text-[0.78rem] font-medium text-charcoal/70 hover:text-gold inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-gold"
              >
                Take the Audit <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Clarifying line */}
          <p className="font-body text-sm text-charcoal-light/80 mt-10 text-center fade-up">
            New to entrepreneurship or unsure where to begin? <Link href="/entrepreneur-assessment" className="text-gold hover:text-gold-light underline underline-offset-4 decoration-gold/30">Take the Entrepreneur Assessment</Link>. Already running a business but feeling stretched thin? <Link href="/capacity-leak-audit" className="text-gold hover:text-gold-light underline underline-offset-4 decoration-gold/30">Take the Capacity Leak Audit™</Link>. Know what you need? Explore <Link href="/clarity-pro" className="text-gold hover:text-gold-light underline underline-offset-4 decoration-gold/30">Clarity Pro™</Link> or <Link href="/constance" className="text-gold hover:text-gold-light underline underline-offset-4 decoration-gold/30">Constance™</Link>.
          </p>
        </div>
      </section>

      {/* Gold divider — before Executive AI Strategy */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="gold-hairline" />
      </div>

      {/* Section 4 — Executive AI Strategy — dark, authoritative */}
      <section className="py-28 lg:py-36 bg-charcoal">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7 lg:col-start-1 fade-up">
              <p className="editorial-label mb-5">Premium Advisory</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.5rem] font-medium text-cream-dark leading-[1.15] mb-8">
                For Leaders Who Need More Than One System
              </h2>
              <p className="font-body text-lg text-warm-gray leading-relaxed mb-6">
                Some leaders do not need a single tool. They need a strategic operating model — one that identifies, designs, and prioritizes the AI systems their business actually needs next.
              </p>
              <p className="font-body text-base text-warm-gray/80 leading-relaxed mb-10">
                Executive AI Strategy is the premium advisory layer for leaders who need more than a single product. It is where custom AI systems strategy, Capacity Reset™ methodology, and deeper implementation planning live.
              </p>
              <Link
                href="/executive-ai-strategy"
                className="font-body text-[0.78rem] font-medium text-gold hover:text-gold-light inline-flex items-center gap-2 transition-colors duration-300"
              >
                Explore Executive AI Strategy <ArrowRight size={14} />
              </Link>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex items-center fade-up">
              <div className="w-full border-l border-gold/20 pl-8 space-y-8">
                <div>
                  <p className="font-body text-[0.65rem] tracking-[0.16em] uppercase text-gold/60 mb-1.5">Includes</p>
                  <p className="font-body text-sm text-cream-dark/80">Custom AI systems roadmap</p>
                </div>
                <div>
                  <p className="font-body text-[0.65rem] tracking-[0.16em] uppercase text-gold/60 mb-1.5">Methodology</p>
                  <p className="font-body text-sm text-cream-dark/80">Capacity Reset™</p>
                </div>
                <div>
                  <p className="font-body text-[0.65rem] tracking-[0.16em] uppercase text-gold/60 mb-1.5">Format</p>
                  <p className="font-body text-sm text-cream-dark/80">Private strategy engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Founder Trust — subtle, not personality-heavy */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-4 lg:col-start-2 fade-up">
              <img
                src="/assets/tabitha-headshot_fea7ebce.webp"
                alt="Tabitha Rector — Founder, Kingdom Solutions AI™"
                className="w-full max-w-[320px] mx-auto lg:mx-0"
              />
            </div>
            <div className="lg:col-span-5 lg:col-start-7 fade-up">
              <p className="editorial-label mb-5">Founded by Tabitha Rector</p>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-charcoal leading-snug mb-6">
                30 years of leadership. One clear mission.
              </h2>
              <p className="font-body text-base text-charcoal-light leading-[1.8] mb-4">
                After walking through her own season of burnout and restoration, Tabitha began studying the brain-body connection, nervous system resilience, and the spiritual roots of clarity and peace.
              </p>
              <p className="font-body text-base text-charcoal-light leading-[1.8] mb-8">
                Today, she helps overwhelmed leaders use AI intentionally — not to replace human connection, but to create more space for what matters most.
              </p>
              <Link
                href="/about"
                className="font-body text-[0.78rem] font-medium text-charcoal/60 hover:text-gold inline-flex items-center gap-2 transition-colors duration-300"
              >
                Read the full story <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gold divider — before final CTA */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="gold-hairline" />
      </div>

      {/* Section 6 — Final CTA — refined, invitational */}
      <section className="py-28 lg:py-36 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center fade-up">
            <div className="w-12 h-[2px] bg-gold mx-auto mb-10" />
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal mb-6 leading-snug">
              Start with the system your business needs most.
            </h2>
            <p className="font-body text-lg text-charcoal-light leading-relaxed mb-12">
              Whether you need clarity, capacity, or a strategic diagnosis — the first step is always simple.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/capacity-leak-audit" className="bg-charcoal text-cream-dark font-body text-[0.78rem] font-medium tracking-[0.08em] uppercase px-8 py-4 inline-flex items-center gap-3 transition-all duration-300 hover:bg-charcoal/90 active:scale-[0.97]">
                Take the Capacity Leak Audit™ <ArrowRight size={15} />
              </Link>
              <Link href="/strategy-call" className="font-body text-[0.82rem] font-medium text-charcoal/60 hover:text-gold inline-flex items-center gap-2 transition-colors duration-300">
                Book a Strategy Call <ArrowRight size={14} />
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
