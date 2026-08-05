import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function StrategyCall() {
  usePageMeta({
    title: "Book a Strategy Call — Kingdom Solutions AI™",
    description: "Book a private strategy call with Tabitha Rector to assess your leadership context, operational pressure, and AI systems needs. The first step toward clarity and capacity.",
    canonicalUrl: "https://kingdomsolutionsai.com/strategy-call",
    ogImage: "https://kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
  });
  const revealRef = useScrollReveal();

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div ref={revealRef}>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 lg:col-start-1 fade-up">
              <p className="editorial-label mb-6">Private Consultation</p>
              <h1 className="font-display text-4xl sm:text-5xl font-medium text-charcoal leading-[1.1] mb-8">
                Book a Strategy Call
              </h1>
              <p className="font-body text-lg text-charcoal-light leading-relaxed max-w-xl">
                A private conversation to assess where your business is leaking capacity, which systems should come first, and whether Constance™, Clarity Pro™, or Executive AI Strategy is the right fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Embed */}
      <section className="py-12 lg:py-16 bg-cream-dark">
        <div className="container">
          <div className="max-w-4xl mx-auto fade-up">
            <div
              className="calendly-inline-widget rounded-sm overflow-hidden"
              data-url="https://calendly.com/tabitha-kingdomsolutionsai/ks-ai-intelligence-systems-strategy-call?hide_gdpr_banner=1&background_color=faf8f5&text_color=1a1a1a&primary_color=c5a044"
              style={{ minWidth: "320px", height: "700px" }}
            />
            <p className="font-body text-sm text-charcoal-light text-center mt-8">
              Prefer email? Reach out directly at{" "}
              <a href="mailto:tabitha@kingdomsolutionsai.com" className="text-gold hover:text-gold-dark underline underline-offset-4">
                tabitha@kingdomsolutionsai.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* What Happens on the Strategy Call */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 fade-up">
            <div className="lg:col-span-4 lg:col-start-2">
              <p className="editorial-label mb-4">What to Expect</p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-snug">
                What Happens on the Strategy Call
              </h2>
              <p className="font-body text-base text-charcoal-light leading-relaxed mt-6">
                The Strategy Call is designed to determine whether Constance™, Clarity Pro™, or Executive AI Strategy is the right fit for your business and what level of support would be appropriate.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-7">
              <p className="font-body text-sm text-charcoal-light leading-relaxed mb-6">
                On the call, we will look at:
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Where operational capacity is currently leaking",
                  "Which tools you already use",
                  "Where follow-up, inbox, calendar, CRM, or meeting prep may be breaking down",
                  "What should be systematized, organized, delegated, or left alone",
                  "Whether Constance™, Clarity Pro™, or Executive AI Strategy is the right next step",
                  "What implementation scope would make sense",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="font-display text-sm text-gold/40 shrink-0 w-5">{String(i + 1).padStart(2, '0')}</span>
                    <p className="font-body text-sm text-charcoal-light leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="w-12 h-px bg-gold/40 my-8" />
              <div className="space-y-6">
                {[
                  { title: "A Focused Conversation", desc: "This is not a sales pitch. It is a strategic assessment of where your business is right now and what system would serve you best." },
                  { title: "No Pressure", desc: "If we are not the right fit, we will tell you. Our goal is to serve leaders well — not to sell systems they do not need." },
                ].map((item, i) => (
                  <div key={i} className="pl-5 border-l border-gold/40">
                    <h3 className="font-display text-base font-medium text-charcoal mb-1">{item.title}</h3>
                    <p className="font-body text-sm text-charcoal-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative CTA */}
      <section className="py-12 bg-cream-dark">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center fade-up">
            <div className="gold-hairline mb-8 max-w-[80px] mx-auto" />
            <p className="font-body text-base text-charcoal-light mb-4">
              Not sure if you need a strategy call yet?
            </p>
            <Link href="/capacity-leak-audit" className="bg-charcoal text-cream-dark font-body text-[0.78rem] font-medium tracking-[0.08em] uppercase px-8 py-4 inline-flex items-center gap-3 transition-all duration-300 hover:bg-charcoal/90 active:scale-[0.97]">
              Take the Capacity Leak Audit™ <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
