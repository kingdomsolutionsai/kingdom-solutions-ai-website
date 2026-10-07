import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight } from "lucide-react";
import { GAPS, GAP_DESCRIPTIONS, type Gap } from "@shared/entrepreneurAssessment";

/*
 * Home page, organized around the Four Gaps framework:
 * Find the gap (assessment) -> Close the right gap (offers) -> Build what's next.
 * Gap names and one-line descriptions come from the assessment so the two
 * always match.
 */

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
    title: "Kingdom Solutions AI™ | Find the Gap, Close the Gap, Build What's Next",
    description:
      "Kingdom Solutions AI™ helps women entrepreneurs find the gap holding their business back, close it in the right order, and build what's next with AI that keeps them in charge. Led by Tabitha Rector, PCC.",
    canonicalUrl: "https://kingdomsolutionsai.com/",
    ogImage: "https://kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
  });
  const revealRef = useScrollReveal();
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
              <p className="editorial-label mb-6 fade-up">For women building a business that lasts</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-medium text-charcoal leading-[1.1] mb-8 fade-up">
                Build your business with clarity, capacity, and{" "}
                <em className="text-gold italic">intelligent support.</em>
              </h1>
              <p className="font-body text-lg lg:text-xl text-charcoal-light leading-[1.7] max-w-2xl mb-12 fade-up">
                Most stalled businesses are not short on effort. They are working on the wrong gap. Kingdom Solutions AI™ helps women entrepreneurs find the gap holding them back, close it in the right order, and build what's next with AI that supports the work and keeps you in charge.
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
                Free assessment. 13 questions, about three minutes.
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
                Each gap calls for a different first move. The Entrepreneur Next Step™ Assessment shows you which one to close first and what can wait.
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

      {/* Victor's Circle Leadership Academy */}
      <section className="py-28 lg:py-36 bg-cream-dark/40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="border-2 border-gold/40 bg-cream px-8 py-14 lg:px-16 lg:py-20 relative fade-up">
            <span className="absolute -top-3 left-8 lg:left-16 bg-gold text-charcoal font-body text-[0.65rem] font-semibold tracking-[0.14em] uppercase px-4 py-1.5">
              Premier Program
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <p className="font-body text-[0.7rem] tracking-[0.16em] uppercase text-gold font-medium mb-6">
                  For Christian Women in Leadership
                </p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.5rem] font-medium text-charcoal leading-[1.15] mb-4">
                  Victor's Circle Leadership Academy™
                </h2>
                <p className="font-display italic text-lg text-gold mb-6">
                  Grow in wisdom. Lead with peace. Rise with strength.
                </p>
                <p className="font-body text-lg text-charcoal-light leading-relaxed mb-6">
                  A Christ-centered formation space for women who carry influence, responsibility, and the weight of leadership at home, at work, in ministry, and in their communities.
                </p>
                <p className="font-body text-base text-charcoal-light/80 leading-relaxed mb-10">
                  A 90-day formation journey that quiets anxiety, restores clarity, and equips you to lead with steady confidence. Now accepting applications for the January cohort.
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <Link href="/victors-circle-leadership-academy" className={primaryBtn}>
                    Explore Victor's Circle <ArrowRight size={15} />
                  </Link>
                  <Link href="/victors-circle-leadership-academy#apply" className={secondaryLink}>
                    Apply for the January Cohort <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <div className="space-y-8 border-l border-gold/30 pl-8">
                  <div>
                    <p className="font-body text-[0.65rem] tracking-[0.16em] uppercase text-gold/70 mb-1.5">Who It's For</p>
                    <p className="font-body text-sm text-charcoal-light">Christian women carrying influence and leadership</p>
                  </div>
                  <div>
                    <p className="font-body text-[0.65rem] tracking-[0.16em] uppercase text-gold/70 mb-1.5">Format</p>
                    <p className="font-body text-sm text-charcoal-light">90-day cohort, application required</p>
                  </div>
                  <div>
                    <p className="font-body text-[0.65rem] tracking-[0.16em] uppercase text-gold/70 mb-1.5">Next Cohort</p>
                    <p className="font-body text-sm text-charcoal-light">Now enrolling for January</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                    Author of the Founder's Handbook and <em>Reflect Restore Revive</em>, with a faith-centered path for women who want it.
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
              Start by finding your gap. It takes about three minutes, and your results arrive with one action you can take this week.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/entrepreneur-assessment" className={primaryBtn}>
                Find Your Gap <ArrowRight size={15} />
              </Link>
              <Link href="/business-fast-track" className="font-body text-[0.82rem] font-medium text-charcoal/60 hover:text-gold inline-flex items-center gap-2 transition-colors duration-300">
                Book a Fast Track Strategy Call <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
