import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight } from "lucide-react";

export default function About() {
  usePageMeta({
    title: "About Tabitha Rector — Kingdom Solutions AI™",
    description: "Tabitha Rector is a Business & Entrepreneurship Strategist who helps experienced women turn their expertise into a clear business, build it in the right order, and grow with human-authorized AI support.",
    canonicalUrl: "https://www.kingdomsolutionsai.com/about",
    ogImage: "https://www.kingdomsolutionsai.com/assets/tabitha-headshot_fea7ebce.webp",
  });
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      {/* Hero — asymmetric with founder image */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-cream">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 fade-up">
              <p className="editorial-label mb-6">About the Founder</p>
              <h1 className="font-display text-4xl sm:text-5xl font-medium text-charcoal leading-[1.1] mb-6">
                Tabitha Rector
              </h1>
              <div className="w-12 h-px bg-gold/50 mb-6" />
              <p className="font-body text-lg text-charcoal-light leading-relaxed mb-4">
                Business &amp; Entrepreneurship Strategist · Professional Certified Coach
              </p>
              <p className="font-body text-base text-charcoal-light leading-relaxed">
                Founder of Kingdom Solutions AI™ · Human-authorized AI systems that protect the leader
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 fade-up">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/assets/tabitha-headshot_fea7ebce.webp"
                  alt="Tabitha Rector, founder of Kingdom Solutions AI"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story — asymmetric two-column */}
      <section className="py-20 lg:py-28 bg-cream-dark">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 fade-up">
            <div className="lg:col-span-3 lg:col-start-2">
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-snug">
                The Story Behind the Work
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-6 space-y-6 font-body text-base text-charcoal-light leading-relaxed">
              <p>
                With more than 30 years of experience across banking, business leadership, management, and coaching, I know that experienced women rarely lack ability. The challenge is translating what they know into a clear business people understand and building it in the right order.
              </p>
              <p>
                After walking through my own season of burnout and restoration, I began studying the brain-body connection, nervous system resilience, and the spiritual roots of clarity and peace. That journey shaped my book, <em className="text-charcoal">Reflect Restore Revive: Overcoming Anxiety Through the Power of Faith</em>, and ultimately led to the creation of Victor's Circle Leadership Academy.
              </p>
              <p>
                Today, I help experienced women clarify who they serve, shape their expertise into a credible offer, and build the foundation their growth can support. When the business is ready, human-authorized AI systems can reduce decision fatigue, strengthen follow-up, and create more room for the work only the founder can do.
              </p>
              <p className="font-medium text-charcoal italic">
                Clarity before complexity. Capacity before scale. Human authority throughout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy — asymmetric */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 fade-up">
            <div className="lg:col-span-3 lg:col-start-2">
              <p className="editorial-label mb-4">Philosophy</p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-snug">
                The Kingdom Solutions AI™ Philosophy
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-6 space-y-6 font-body text-base text-charcoal-light leading-relaxed">
              <p>
                A strong business begins with clarity, not technology. First we identify the right buyer, problem, offer, and message. Then we build the structure that allows the business to grow without consuming the woman behind it.
              </p>
              <p>
                We believe in strategic restraint. Not every problem needs a tool. Not every tool needs AI. And not every AI system needs to be complex. The right system, at the right time, in the right order — that is what creates sustainable change.
              </p>
              <p>
                Human-authorized AI has a specific supporting role: it can organize information, strengthen follow-up, and reduce repetitive operational weight. It does not replace judgment, relationships, or leadership. You remain the authority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values — dark section */}
      <section className="py-20 lg:py-28 bg-charcoal">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 fade-up">
            <div className="lg:col-span-4 lg:col-start-2">
              <h2 className="font-display text-3xl font-medium text-cream-dark">
                What We Stand On
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-7 space-y-8">
              {[
                { title: "Integrity Over Speed", desc: "We do not build systems that cut corners. Every tool, every workflow, every recommendation is grounded in ethical practice and strategic care." },
                { title: "Protection Over Productivity", desc: "The goal is not to make you do more. It is to protect you from carrying what the business should hold — so you can lead with clarity and calm." },
                { title: "Faith-Aligned, Not Faith-Required", desc: "Our work is shaped by faith-centered values — wisdom, stewardship, rest, and purpose. But we serve leaders of all backgrounds who share a commitment to leading with integrity." },
              ].map((item, i) => (
                <div key={i} className="pl-6 border-l border-gold/30">
                  <h3 className="font-display text-lg font-medium text-cream-dark mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-warm-gray leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center fade-up">
            <div className="gold-hairline mb-10 max-w-[80px] mx-auto" />
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal mb-6">
              Build the right thing next.
            </h2>
            <p className="font-body text-lg text-charcoal-light leading-relaxed mb-10">
              If you are unsure whether your next step is business clarity or operational support, start with the assessment. It will show you which gap to close first.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/entrepreneur-assessment" className="btn-gold rounded-sm inline-flex items-center justify-center gap-2">
                Find Your Business Gap <ArrowRight size={16} />
              </Link>
              <Link href="/strategy-call" className="font-body text-sm font-medium text-charcoal-light hover:text-gold inline-flex items-center justify-center gap-2 transition-colors duration-200">
                Book a Strategy Call <ArrowRight size={14} />
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
