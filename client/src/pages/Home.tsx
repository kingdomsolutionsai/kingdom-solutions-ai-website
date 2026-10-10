import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight } from "lucide-react";
import { GAPS, GAP_DESCRIPTIONS, type Gap } from "@shared/entrepreneurAssessment";
import { RIGHT_ORDER_PROMISE, nextQuarterLabel } from "@shared/const";
import { CLIENT_STORIES } from "@/lib/clientStories";

/*
 * Home page, organized around the Four Gaps framework:
 * Find the gap (assessment) -> Close the right gap (offers) -> Build what's next.
 * Gap names and one-line descriptions come from the assessment so the two
 * always match.
 */

const FAQS = [
  {
    question: "Who does Kingdom Solutions AI™ help?",
    answer: "Kingdom Solutions AI™ helps experienced women entrepreneurs turn their expertise into a clear offer and build a credible business in the right order.",
  },
  {
    question: "What are the four business gaps?",
    answer: "The Direction, Offer, Audience, and Structure gaps describe common places where a business can stall. The Entrepreneur Next Step™ Assessment helps identify which gap to address first.",
  },
  {
    question: "What happens in the 30-Day Business Fast Track™?",
    answer: "It is a guided 30-day experience to shape one clear offer, a message buyers understand, and a revenue path for the next 90 days. Enrollment begins with a Strategy Call.",
  },
  {
    question: "When should a business add AI?",
    answer: "Start by clarifying the business and its process. Add human-authorized AI when it supports a clear business need, with the business owner remaining in control of decisions.",
  },
];

const GAP_SIGNS: Record<Gap, string> = {
  Direction: "You have ideas and skills, but no settled answer to who you serve and what you sell first.",
  Offer: "People like what you do, yet the value and the decision to buy are not clear enough to say yes.",
  Audience: "You are visible and getting compliments, but conversations with best-fit buyers are inconsistent.",
  Structure: "The work is real, but too much depends on you remembering, chasing, and holding it all together.",
};

const textLink =
  "font-body text-[0.78rem] font-medium text-charcoal/70 hover:text-gold inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-gold";
const primaryBtn =
  "bg-charcoal text-cream-dark font-body text-[0.78rem] font-medium tracking-[0.08em] uppercase px-8 py-4 inline-flex items-center gap-3 transition-all duration-300 hover:bg-charcoal/90 active:scale-[0.97]";
const secondaryLink =
  "font-body text-[0.82rem] font-medium text-charcoal/60 hover:text-gold inline-flex items-center gap-2 py-4 transition-colors duration-300";

export default function Home() {
  usePageMeta({
    title: "Business Strategy for Women Entrepreneurs | Kingdom Solutions AI™",
    description:
      "Kingdom Solutions AI™ by Tabitha Rector helps experienced women entrepreneurs turn expertise into a clear offer, build their business in the right order, and add human-authorized AI where it creates capacity.",
    canonicalUrl: "https://kingdomsolutionsai.com/",
    ogImage: "https://kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
  });
  const revealRef = useScrollReveal();
  const quarter = nextQuarterLabel();
  return (
    <div ref={revealRef}>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/assets/hero-abstract_83e59dd7.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/75 to-cream" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 py-24 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 lg:col-start-1">
              <div className="w-16 h-[2px] bg-gold mb-8 fade-up" />
              <p className="editorial-label mb-6 fade-up">For experienced women entrepreneurs building a business that lasts</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-medium text-charcoal leading-[1.1] mb-8 fade-up">
                Turn your expertise into a clear offer. Build your business in the 
                <em className="text-gold italic">right order.</em>
              </h1>
              <p className="font-body text-lg lg:text-xl text-charcoal-light leading-[1.7] max-w-2xl mb-12 fade-up">
                Kingdom Solutions AI™ helps experienced women entrepreneurs turn what they know into a clear offer, build the business in the right order, and use human-authorized AI when it supports the work. Tabitha Rector brings more than 30 years of leadership, business, and coaching experience.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-5 fade-up">
                <Link href="/entrepreneur-assessment" className={primaryBtn}>
                  Find Your Gap <ArrowRight size={15} />
                </Link>
                <Link href="/business-fast-track" className={secondaryLink}>
                  Explore the 30-Day Business Fast Track™ <ArrowRight size={14} />
                </Link>
              </div>
              <p className="font-body text-[0.8rem] text-charcoal/50 mt-4 fade-up">
                Free assessment. 13 questions, about three minutes. Find your gap now and start {quarter} ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="gold-hairline" />
      </div>

      {/* Context line */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-8 lg:col-start-3 text-center fade-up">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-medium text-charcoal leading-[1.15] mb-6">
                You don't need to close every gap. You need to close the one keeping you from{" "}
                <em className="text-gold italic">what's next.</em>
              </h2>
              <p className="font-body text-lg text-charcoal-light leading-relaxed max-w-2xl mx-auto">
                The longer the wrong gap stays open, the more time, money, and energy go into solving the wrong problem. More content, more platforms, or more AI will not fix a gap they were never designed to close.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="gold-hairline" />
      </div>

      {/* The Four Gaps */}
      <section id="gaps" className="py-28 lg:py-36 bg-cream scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-6 lg:col-start-1 fade-up">
              <p className="editorial-label mb-5">The Four Gaps</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.5rem] font-medium text-charcoal leading-[1.15]">
                Four gaps stall a growing business. Which one is yours?
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-8 flex items-end fade-up">
              <p className="font-body text-base text-charcoal-light leading-relaxed">
                <span className="font-semibold text-charcoal">Why check now? So you start {quarter} ready.</span> Each gap calls for a different first move. The Entrepreneur Next Step™ Assessment shows you which one to close first and what can wait.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-taupe/60 border border-taupe/60 fade-up">
            {GAPS.map((gap, index) => (
              <div key={gap} className="group bg-cream p-8 lg:p-10 transition-colors duration-500 hover:bg-cream-dark/40">
                <p className="font-body text-[0.7rem] tracking-[0.16em] uppercase text-gold font-medium mb-6">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-2xl font-medium text-charcoal mb-3 leading-snug">{gap} Gap</h3>
                <p className="font-body text-sm font-medium text-charcoal mb-4">{GAP_DESCRIPTIONS[gap]}</p>
                <div className="w-10 h-[1px] bg-gold/50 mb-4" />
                <p className="font-body text-sm text-charcoal-light leading-[1.8] mb-8">{GAP_SIGNS[gap]}</p>
                <Link href="/entrepreneur-assessment" className={textLink}>
                  Find your gap <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
          <p className="font-display italic text-xl text-gold text-center mt-12 fade-up">
            Find the gap. Close the right gap. Build what's next.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="gold-hairline" />
      </div>

      {/* Close the right gap: pathways */}
      <section id="pathways" className="py-28 lg:py-40 bg-cream scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
            <div className="lg:col-span-6 lg:col-start-1 fade-up">
              <p className="editorial-label mb-5">Close the Right Gap</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.5rem] font-medium text-charcoal leading-[1.15]">
                Choose the support that closes your gap.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-8 flex items-end fade-up">
              <p className="font-body text-base text-charcoal-light leading-relaxed">
                If you already know your gap, go directly to the right support. If you are not sure,{" "}
                <Link href="/entrepreneur-assessment" className="text-gold hover:text-gold-light underline underline-offset-4 decoration-gold/40">
                  start with the assessment
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-taupe/60 fade-up">
            {/* Clarity Pro */}
            <div className="group p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-taupe/60 transition-colors duration-500 hover:bg-cream-dark/40">
              <p className="font-body text-[0.7rem] tracking-[0.16em] uppercase text-gold font-medium mb-8">
                Direction or Offer Gap
              </p>
              <h3 className="font-display text-2xl lg:text-[1.65rem] font-medium text-charcoal mb-4 leading-snug">
                Clarity Pro™
              </h3>
              <div className="w-10 h-[1px] bg-gold/50 mb-6" />
              <p className="font-body text-sm text-charcoal-light leading-[1.8] mb-10">
                A private 1:1 positioning session for women who need a clear niche, a strong offer, a distinct business voice, and messaging people understand.
              </p>
              <Link href="/clarity-pro" className={textLink}>
                Explore Clarity Pro™ <ArrowRight size={14} />
              </Link>
            </div>
            {/* Business Fast Track */}
            <div className="group p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-taupe/60 bg-cream-dark/30 transition-colors duration-500 hover:bg-cream-dark/50">
              <p className="font-body text-[0.7rem] tracking-[0.16em] uppercase text-gold font-medium mb-8">
                Direction, Offer, or Audience Gap
              </p>
              <h3 className="font-display text-2xl lg:text-[1.65rem] font-medium text-charcoal mb-4 leading-snug">
                30-Day Business Fast Track™
              </h3>
              <div className="w-10 h-[1px] bg-gold/50 mb-6" />
              <p className="font-body text-sm text-charcoal-light leading-[1.8] mb-10">
                Thirty days of guided work to build in the right order: one clear offer, a message people understand, and a revenue path for your next 90 days. Every enrollment starts with a Strategy Call.
              </p>
              <p className="font-body text-[0.8rem] text-charcoal-light leading-[1.7] border-l-2 border-gold/50 pl-4 -mt-4 mb-10">
                <span className="font-semibold text-charcoal">The Right Order Promise.</span> {RIGHT_ORDER_PROMISE}
              </p>
              <Link href="/business-fast-track" className={textLink}>
                Explore the Fast Track <ArrowRight size={14} />
              </Link>
            </div>
            {/* Constance */}
            <div className="group p-10 lg:p-12 transition-colors duration-500 hover:bg-cream-dark/40">
              <p className="font-body text-[0.7rem] tracking-[0.16em] uppercase text-gold font-medium mb-8">
                Structure Gap
              </p>
              <h3 className="font-display text-2xl lg:text-[1.65rem] font-medium text-charcoal mb-4 leading-snug">
                Constance™ AI Chief of Staff
              </h3>
              <div className="w-10 h-[1px] bg-gold/50 mb-6" />
              <p className="font-body text-sm text-charcoal-light leading-[1.8] mb-6">
                Human-authorized support around inbox, calendar, CRM, follow-up, and meeting prep, so the business stops depending on you holding every thread.
              </p>
              <p className="font-body text-sm text-charcoal-light leading-[1.8] mb-10">
                Not sure where your operations are leaking?{" "}
                <Link href="/capacity-leak-audit" className="text-gold hover:text-gold-light underline underline-offset-4 decoration-gold/40">
                  Take the Capacity Leak Audit™
                </Link>
                .
              </p>
              <Link href="/constance" className={textLink}>
                Meet Constance™ <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="gold-hairline" />
      </div>

      {/* Questions prospects ask */}
      <section className="py-24 lg:py-32 bg-cream-dark/40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto">
            <p className="editorial-label mb-5 text-center">Questions, Clearly Answered</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal text-center mb-12">
              Start with clarity. Add systems in the right order.
            </h2>
            <div className="space-y-8">
              {FAQS.map((item) => (
                <article key={item.question} className="border-b border-taupe/70 pb-7">
                  <h3 className="font-display text-xl font-medium text-charcoal mb-3">{item.question}</h3>
                  <p className="font-body text-base text-charcoal-light leading-relaxed">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }),
          }}
        />
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="gold-hairline" />
      </div>

      {/* Executive AI Strategy */}
      <section className="py-28 lg:py-36 bg-charcoal">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7 lg:col-start-1 fade-up">
              <p className="editorial-label mb-5">Premium Advisory</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.5rem] font-medium text-cream-dark leading-[1.15] mb-8">
                For Leaders Who Need More Than One System
              </h2>
              <p className="font-body text-lg text-warm-gray leading-relaxed mb-6">
                Some leaders do not need a single tool. They need a strategic operating model that identifies, designs, and prioritizes the AI systems their business actually needs next.
              </p>
              <p className="font-body text-base text-warm-gray/80 leading-relaxed mb-10">
                Executive AI Strategy is the premium advisory layer for leaders who need more than a single product. It is where custom AI systems strategy and deeper implementation planning live.
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
                  <p className="font-body text-[0.65rem] tracking-[0.16em] uppercase text-gold/60 mb-1.5">Format</p>
                  <p className="font-body text-sm text-cream-dark/80">Private strategy engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client stories: hidden until a story is added in lib/clientStories.ts */}
      {CLIENT_STORIES.length > 0 && (
        <section className="py-24 lg:py-32 bg-cream-dark/40">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="max-w-2xl mb-14 fade-up">
              <p className="editorial-label mb-5">Gaps Closed</p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-[1.15]">
                What changes when the right gap closes first.
              </h2>
            </div>
            <div className={`grid grid-cols-1 gap-8 ${CLIENT_STORIES.length > 1 ? "lg:grid-cols-2" : "max-w-3xl"} fade-up`}>
              {CLIENT_STORIES.map((story) => (
                <article key={story.name} className="bg-cream border border-taupe/60 p-8 lg:p-10">
                  <p className="font-body text-[0.7rem] tracking-[0.16em] uppercase text-gold font-medium mb-6">
                    {story.gap} Gap
                  </p>
                  <p className="font-body text-sm text-charcoal-light leading-[1.8] mb-4">
                    <span className="font-semibold text-charcoal">Before.</span> {story.before}
                  </p>
                  <p className="font-body text-sm text-charcoal-light leading-[1.8] mb-6">
                    <span className="font-semibold text-charcoal">After.</span> {story.after}
                  </p>
                  {story.quote && (
                    <blockquote className="font-display italic text-lg text-charcoal border-l-2 border-gold/50 pl-5 mb-6">
                      "{story.quote}"
                    </blockquote>
                  )}
                  <p className="font-body text-sm font-medium text-charcoal">
                    {story.name}
                    {story.detail && <span className="font-normal text-charcoal-light">, {story.detail}</span>}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Tabitha */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-4 lg:col-start-2 fade-up">
              <img
                src="/assets/tabitha-headshot_fea7ebce.webp"
                alt="Tabitha Rector, Founder, Kingdom Solutions AI™"
                className="w-full max-w-[320px] mx-auto lg:mx-0"
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7 fade-up">
              <p className="editorial-label mb-5">Why Tabitha</p>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-charcoal leading-snug mb-6">
                Experience that sees the gap. Integrity that closes it the right way.
              </h2>
              <p className="font-body text-base text-charcoal-light leading-[1.8] mb-8">
                Tabitha Rector has spent more than 30 years helping small businesses through banking, lending, business advisory, and coaching. She has sat on the other side of the desk, so she knows what a business that is ready to grow actually looks like.
              </p>
              <ul className="space-y-5 mb-10">
                <li className="border-l-2 border-gold/50 pl-5">
                  <p className="font-body text-sm font-semibold text-charcoal mb-1">Banking and compliance background</p>
                  <p className="font-body text-sm text-charcoal-light leading-[1.7]">Risk, accuracy, and accountability are habits, not add-ons.</p>
                </li>
                <li className="border-l-2 border-gold/50 pl-5">
                  <p className="font-body text-sm font-semibold text-charcoal mb-1">Professional Certified Coach (PCC), ICF</p>
                  <p className="font-body text-sm text-charcoal-light leading-[1.7]">Credentialed coaching, not guesswork.</p>
                </li>
                <li className="border-l-2 border-gold/50 pl-5">
                  <p className="font-body text-sm font-semibold text-charcoal mb-1">Responsible AI with human authority</p>
                  <p className="font-body text-sm text-charcoal-light leading-[1.7]">AI supports your work. You stay in charge of every decision.</p>
                </li>
                <li className="border-l-2 border-gold/50 pl-5">
                  <p className="font-body text-sm font-semibold text-charcoal mb-1">Author and faith-rooted leader</p>
                  <p className="font-body text-sm text-charcoal-light leading-[1.7]">
                    Author of <em>What Every New Entrepreneur Needs to Know</em> and <em>Reflect Restore Revive</em>.
                  </p>
                </li>
              </ul>
              <p className="font-display italic text-lg text-gold mb-8">
                Every claim I make is one I can stand behind.
              </p>
              <Link href="/about" className="font-body text-[0.78rem] font-medium text-charcoal/60 hover:text-gold inline-flex items-center gap-2 transition-colors duration-300">
                Read the full story <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="gold-hairline" />
      </div>

      {/* Final CTA */}
      <section className="py-28 lg:py-36 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center fade-up">
            <div className="w-12 h-[2px] bg-gold mx-auto mb-10" />
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal mb-6 leading-snug">
              You do not have to build everything at once. Build the right thing next.
            </h2>
            <p className="font-body text-lg text-charcoal-light leading-relaxed mb-12">
              Close the right gap now, and you walk into {quarter} ready instead of still deciding. Finding your gap takes about three minutes, and your results arrive with one action you can take this week.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/entrepreneur-assessment" className={primaryBtn}>
                Find Your Gap <ArrowRight size={15} />
              </Link>
              <Link href="/business-fast-track" className="font-body text-[0.82rem] font-medium text-charcoal/60 hover:text-gold inline-flex items-center gap-2 transition-colors duration-300">
                Book a Fast Track Strategy Call <ArrowRight size={14} />
              </Link>
            </div>
            <p className="font-body text-[0.82rem] text-charcoal-light leading-[1.7] max-w-xl mx-auto mt-10">
              <span className="font-semibold text-charcoal">The Right Order Promise.</span> {RIGHT_ORDER_PROMISE}{" "}
              <Link href="/refund-policy" className="underline underline-offset-4 hover:text-gold">Details</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
