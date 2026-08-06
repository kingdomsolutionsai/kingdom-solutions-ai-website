import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function ClarityPro() {
  usePageMeta({
    title: "Clarity Pro™ — Strategic Clarity & Content System | Kingdom Solutions AI™",
    description: "Clarity Pro™ helps new coaches, founders, and consultants clarify their niche, build a strong offer, develop their business voice, and create a content strategy. Three tiers from self-guided to full buildout.",
    canonicalUrl: "https://kingdomsolutionsai.com/clarity-pro",
    ogImage: "https://kingdomsolutionsai.com/assets/clarity-visual_f897fefc.png",
  });
  const revealRef = useScrollReveal();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    clarityNeed: "",
    background: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.forms.submitClarityProIntake.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <div ref={revealRef}>
      {/* Hero — exploratory, voice-forward */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url(/assets/clarity-visual_f897fefc.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/50 to-cream" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 fade-up">
              <p className="editorial-label mb-6">AI Business Clarity Strategist</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-charcoal leading-[1.08] mb-8">
                Turn Your Expertise Into a Business People{" "}
                <em className="text-gold italic">Understand.</em>
              </h1>
              <p className="font-body text-lg lg:text-xl text-charcoal-light leading-relaxed max-w-xl mb-10">
                Clarity Pro™ helps new coaches, founders, consultants, corporate escapees, and experienced professionals define their niche, structure their offer, develop their voice, sharpen their messaging, and build a content strategy that attracts.
              </p>
              <a href="#begin-clarity" className="btn-gold rounded-sm inline-flex items-center gap-2">
                Begin with Clarity <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Positioning — asymmetric two-column */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 fade-up">
            <div className="lg:col-span-5 lg:col-start-2">
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-snug">
                You Are Not Behind. You Are Untranslated.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-7">
              <p className="font-body text-base text-charcoal-light leading-relaxed mb-6">
                You may be new to business ownership, but you are not starting empty. You have years of expertise, lived experience, and professional depth.
              </p>
              <p className="font-body text-base text-charcoal-light leading-relaxed">
                The gap is not competence. The gap is translation — turning what you know into a business people can find, understand, and buy from.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="gold-hairline" /></div>

      {/* Responsible by Design — moved up so trust is earned before the pitch, not after */}
      <section className="py-16 lg:py-20 bg-charcoal">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 fade-up">
            <div className="lg:col-span-5 lg:col-start-2">
              <p className="editorial-label mb-4">Responsible By Design</p>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-cream-dark leading-snug mb-4">
                Strategy supported by AI. <em className="text-gold italic">Judgment remains human.</em>
              </h2>
              <p className="font-body text-sm text-warm-gray leading-relaxed">
                Clarity Pro™ is designed for business strategy, positioning, messaging, offers, voice development, and content direction. Please do not enter passwords, payment information, confidential client records, medical information, legal documents, or highly sensitive business data.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-7 space-y-6">
              <div className="border-l-2 border-gold/50 pl-5">
                <h3 className="font-body text-sm font-semibold text-cream-dark mb-1">You retain authority</h3>
                <p className="font-body text-sm text-warm-gray leading-relaxed">AI helps analyze and structure. You decide what fits, what changes, and what moves forward.</p>
              </div>
              <div className="border-l-2 border-gold/50 pl-5">
                <h3 className="font-body text-sm font-semibold text-cream-dark mb-1">Your voice stays yours</h3>
                <p className="font-body text-sm text-warm-gray leading-relaxed">The system develops your distinct perspective instead of pushing generic imitation.</p>
              </div>
              <div className="border-l-2 border-gold/50 pl-5">
                <h3 className="font-body text-sm font-semibold text-cream-dark mb-1">Clear data boundaries</h3>
                <p className="font-body text-sm text-warm-gray leading-relaxed">Use the system for strategy and non-sensitive business context only.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Clarity Pro Helps You Clarify — editorial blocks, not uniform cards */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 fade-up">
              <div className="lg:col-span-6">
                <p className="editorial-label mb-4">Strategic Clarity</p>
                <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal">
                  What Clarity Pro™ Helps You Clarify
                </h2>
              </div>
            </div>

            {/* Staggered editorial blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 fade-up">
              {[
                { num: "01", title: "Your Niche", desc: "Define who you serve and what problem you solve with precision that attracts the right people — and repels the wrong ones." },
                { num: "02", title: "Your Offer", desc: "Structure your expertise into a clear, compelling offer that people understand and want to buy — not a vague menu of services." },
                { num: "03", title: "Your Voice", desc: "Develop a distinct business voice that sounds like you — not like everyone else in your industry or a generic template." },
                { num: "04", title: "Your Messaging", desc: "Articulate what you do in language that resonates with your ideal audience and differentiates you from the noise." },
                { num: "05", title: "Your Content Strategy", desc: "Build a content approach that establishes authority and attracts clients without burning you out or requiring you to post constantly." },
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

      {/* The Problem — dark statement */}
      <section className="py-20 lg:py-28 bg-charcoal">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 fade-up">
            <div className="lg:col-span-8 lg:col-start-3">
              <div className="gold-hairline mb-10 max-w-[60px]" />
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-cream-dark mb-8 leading-snug">
                The Problem Is Not That You Need More Content
              </h2>
              <p className="font-body text-lg text-warm-gray leading-relaxed mb-6">
                The problem is that the business underneath the content is not yet clear. When the niche is unclear, the offer is unclear. When the offer is unclear, the messaging is unclear. When the messaging is unclear, content does not convert — no matter how much of it you produce.
              </p>
              <p className="font-body text-base text-warm-gray leading-relaxed">
                Clarity Pro™ works from the foundation up — so that every piece of content, every sales page, and every conversation is built on something solid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Built For + What You Walk Away With — side by side */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            <div className="fade-up">
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-charcoal mb-8">
                Clarity Pro™ Is Built For
              </h2>
              <div className="space-y-4">
                {[
                  "New coaches who know they can help people but cannot yet articulate what they do",
                  "Corporate escapees with decades of expertise but no business language for it yet",
                  "Founders who have been posting content without a clear niche or offer underneath",
                  "Consultants whose services are too broad, too vague, or too hard to explain quickly",
                  "Experienced professionals who are ready to build but need strategic clarity first",
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
                What You Can Walk Away With
              </h2>
              <div className="space-y-4">
                {[
                  "A defined niche that is specific enough to attract and broad enough to grow",
                  "A structured offer that people understand and want to buy",
                  "Messaging that differentiates you from others in your space",
                  "A business voice that sounds like you — not like a template",
                  "A content strategy that builds authority without burning you out",
                  "Clarity on what to say, where to say it, and who you are saying it to",
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

      {/* Voice Protection — unique to Clarity Pro */}
      <section className="py-20 lg:py-28 bg-cream-dark">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 fade-up">
            <div className="lg:col-span-4 lg:col-start-2">
              <p className="editorial-label mb-4">Voice Protection</p>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-charcoal leading-snug">
                Your Voice Is Developed and Protected
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-7">
              <p className="font-body text-base text-charcoal-light leading-relaxed mb-6">
                Clarity Pro™ does not just help you find your voice — it protects it. Your distinct tone, perspective, and language are documented and preserved so that every piece of content, every sales page, and every future system sounds unmistakably like you.
              </p>
              <p className="font-body text-base text-charcoal-light leading-relaxed">
                This is not about sounding polished. It is about sounding <em className="text-charcoal">true</em>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Note */}
      <section className="py-20 lg:py-28 bg-charcoal">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center fade-up">
            <div className="lg:col-span-4 lg:col-start-2">
              <img
                src="/assets/tabitha-headshot_fea7ebce.webp"
                alt="Tabitha Rector, Founder of Kingdom Solutions AI™"
                className="w-full rounded-sm object-cover"
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="editorial-label mb-4">A Note From The Founder</p>
              <p className="font-display text-2xl sm:text-3xl font-medium text-cream-dark leading-snug mb-8">
                "You are not starting from zero.{" "}
                <em className="text-gold italic">You are starting from experience.</em>{" "}
                Clarity is how the market learns to see it."
              </p>
              <p className="font-body text-sm text-warm-gray leading-relaxed mb-8">
                Clarity Pro™ was created to help experienced leaders and emerging business owners turn what they already know into a focused, sellable business — without copying someone else's voice or carrying the entire strategy in their nervous system.
              </p>
              <div className="border-t border-gold/20 pt-6">
                <p className="font-body text-sm font-semibold text-cream-dark">Tabitha Rector</p>
                <p className="font-body text-xs tracking-[0.1em] uppercase text-warm-gray">Founder · Kingdom Solutions AI™</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof — placeholders until real client quotes are ready to swap in */}
      <section className="py-20 lg:py-28 bg-cream-dark">
        <div className="container">
          <div className="text-center mb-14 fade-up">
            <p className="editorial-label mb-4">In Their Own Words</p>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-charcoal">
              What clarity sounds like once it lands.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-up">
            {[
              { quote: "I finally have language for what I do. It's the difference between explaining myself and being understood.", who: "Business coach, Guided tier" },
              { quote: "Every dollar I spent on content before this was aimed at the wrong niche. Now it lands.", who: "Faith-based coach, Starter tier" },
              { quote: "The offer pressure-test alone was worth it — I cut two services I was quietly dreading.", who: "Consultant, Buildout tier" },
            ].map((t, i) => (
              <div key={i} className="bg-card border border-taupe rounded-sm p-8">
                <p className="font-display text-lg text-charcoal leading-snug mb-5">"{t.quote}"</p>
                <p className="font-body text-xs text-charcoal-light mb-3">Placeholder — swap for real client quote<br />{t.who}</p>
                <span className="inline-block font-body text-[0.65rem] tracking-[0.1em] uppercase text-gold bg-gold/10 rounded-sm px-2 py-1">
                  Add real testimonial here
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Choose Your Clarity Pro Path — Pricing Tiers */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 fade-up">
              <p className="editorial-label mb-4">Choose Your Path</p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal mb-4">
                Choose Your Clarity Pro™ Path
              </h2>
              <p className="font-body text-base text-charcoal-light max-w-2xl mx-auto">
                Whether you are starting with a business idea, refining your first offer, or preparing to become more visible, Clarity Pro™ gives you a clear path forward.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-taupe/60 fade-up">
              {/* Starter */}
              <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-taupe/60">
                <p className="font-body text-[0.7rem] tracking-[0.16em] uppercase text-charcoal-light font-medium mb-3">Self-Guided</p>
                <h3 className="font-display text-2xl font-medium text-charcoal mb-2">Clarity Pro™ Starter</h3>
                <p className="font-display text-3xl font-medium text-gold mb-1">$197</p>
                <p className="font-body text-xs text-charcoal-light mb-6">one-time</p>
                <div className="w-10 h-[1px] bg-gold/40 mb-6" />
                <p className="font-body text-sm text-charcoal-light leading-relaxed mb-4">
                  For the new coach or founder who wants to clarify the foundation before creating more content.
                </p>
                <p className="font-body text-sm text-charcoal-light leading-relaxed mb-4">
                  Clarity Pro™ Starter gives you a self-guided clarity and content creation experience. You can clarify your niche, pressure-test your offer, define your business voice, and generate strategic content ideas, posts, emails, and weekly content direction using the Clarity Pro™ system.
                </p>
                <p className="font-body text-xs text-charcoal-light/60 italic leading-relaxed mb-6 border-l-2 border-gold/30 pl-3">
                  This tier does not include personal review, private coaching, or custom strategy feedback from Kingdom Solutions AI™.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Niche clarity guidance", "Offer pressure-testing", "Messaging prompts", "Business voice direction", "Content strategy prompts", "Weekly content planning support", "Clear next-step framework"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-3 h-px bg-gold/50 mt-2.5 shrink-0" />
                      <span className="font-body text-sm text-charcoal-light">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-body text-xs text-charcoal-light/70 mb-6">Best for: Self-guided clarity.</p>
                <a href="https://buy.stripe.com/28E3cxapFfC8bMV0NugrS08" target="_blank" rel="noopener noreferrer" className="btn-gold rounded-sm w-full text-center block text-sm">
                  Start Clarity Pro™ — $197
                </a>
              </div>

              {/* Guided — Most Popular */}
              <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-taupe/60 relative bg-cream-dark/30">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold" />
                <p className="font-body text-[0.7rem] tracking-[0.16em] uppercase text-gold font-semibold mb-3">Most Popular</p>
                <h3 className="font-display text-2xl font-medium text-charcoal mb-2">Clarity Pro™ Guided</h3>
                <p className="font-display text-3xl font-medium text-gold mb-1">$497</p>
                <p className="font-body text-xs text-charcoal-light mb-6">one-time</p>
                <div className="w-10 h-[1px] bg-gold/40 mb-6" />
                <p className="font-body text-sm text-charcoal-light leading-relaxed mb-6">
                  For the coach, founder, or consultant who wants strategic support refining their niche, offer, voice, and content direction.
                </p>
                <ul className="space-y-3 mb-4">
                  {["Everything in Starter", "One 60-minute Clarity Review Session", "Positioning refinement", "Offer language review", "Voice and messaging feedback", "14 days of light follow-up support"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-3 h-px bg-gold/50 mt-2.5 shrink-0" />
                      <span className="font-body text-sm text-charcoal-light">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-body text-xs text-charcoal-light/70 mb-6">Best for: Clearer direction with strategic review.</p>
                <a href="https://buy.stripe.com/9B6aEZ7dtblS3gpdAggrS09" target="_blank" rel="noopener noreferrer" className="btn-gold rounded-sm w-full text-center block text-sm">
                  Start Clarity Pro™ — $497
                </a>
              </div>

              {/* Buildout */}
              <div className="p-8 lg:p-10">
                <p className="font-body text-[0.7rem] tracking-[0.16em] uppercase text-charcoal-light font-medium mb-3">Full Buildout</p>
                <h3 className="font-display text-2xl font-medium text-charcoal mb-2">Clarity Pro™ Buildout</h3>
                <p className="font-display text-3xl font-medium text-gold mb-1">$1,497</p>
                <p className="font-body text-xs text-charcoal-light mb-6">one-time</p>
                <div className="w-10 h-[1px] bg-gold/40 mb-6" />
                <p className="font-body text-sm text-charcoal-light leading-relaxed mb-6">
                  For the founder, coach, or consultant who wants help turning clarity into launch-ready business and content assets.
                </p>
                <ul className="space-y-3 mb-4">
                  {["Everything in Guided", "Full offer refinement", "Buyer messaging framework", "Business voice profile", "30-day content plan", "Sales page direction", "Lead magnet outline", "Email nurture sequence direction", "Authority campaign direction", "Two strategy sessions"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-3 h-px bg-gold/50 mt-2.5 shrink-0" />
                      <span className="font-body text-sm text-charcoal-light">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-body text-xs text-charcoal-light/70 mb-6">Best for: Turning clarity into a stronger market presence.</p>
                <Link href="/strategy-call" className="btn-gold rounded-sm w-full text-center block text-sm">
                  Apply for Buildout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="gold-hairline" /></div>

      {/* FAQ — answers visible, not collapsed, since this is often where the sale actually happens */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 lg:col-start-2 fade-up">
              <p className="editorial-label mb-4">Frequently Asked</p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal leading-snug">
                Before you choose <em className="text-gold italic">your path.</em>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 fade-up">
              {[
                {
                  q: "What exactly is Clarity Pro™?",
                  a: "A guided strategy process that turns your existing expertise into a clear niche, a pressure-tested offer, a recognizable voice, and a practical content direction — built with AI support, refined by your judgment.",
                },
                {
                  q: "How are Starter, Guided, and Buildout different?",
                  a: "Starter gives you the full self-guided framework. Guided adds a live 60-minute review session with Tabitha plus a written before/after positioning statement so a human checks your work. Buildout goes further, turning the strategy into launch-ready assets like a sales page and content plan.",
                },
                {
                  q: "Can Clarity Pro™ create content for me?",
                  a: "It gives you direction, prompts, and a plan — not a stream of generic posts. The goal is a clearer business first; better content is what naturally follows.",
                },
                {
                  q: "Is this only for brand-new coaches?",
                  a: "No. It's built for anyone whose experience is real but whose business language hasn't caught up yet — new coaches, corporate-to-coach professionals, founders, and consultants alike.",
                },
                {
                  q: "What should I prepare before I begin?",
                  a: "Nothing formal. Come with your honest sense of who you help and how, even if it feels rough or unclear — that's exactly the raw material the process works with.",
                },
                {
                  q: "How should I handle confidential information?",
                  a: "Use Clarity Pro™ for strategy and general business context only. Do not enter passwords, payment details, confidential client records, medical information, legal documents, or other highly sensitive data.",
                },
                {
                  q: "What is the refund policy?",
                  a: (
                    <>
                      Refund eligibility depends on the tier. Starter is generally non-refundable once access is delivered (contact us within 24 hours if purchased in error). Guided allows cancellation before your review session is delivered (case-by-case within 48 hours). Buildout terms are set in your proposal. Full details in our{" "}
                      <Link href="/refund-policy" className="text-gold hover:text-gold-dark underline underline-offset-4 transition-colors">
                        Refund Policy
                      </Link>
                      .
                    </>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className="border-b border-taupe/60 py-6 first:pt-0">
                  <h3 className="font-display text-lg font-medium text-charcoal mb-2">{item.q}</h3>
                  <p className="font-body text-sm text-charcoal-light leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="gold-hairline" /></div>

      {/* Begin with Clarity Form */}
      <section id="begin-clarity" className="py-20 lg:py-28 bg-cream">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {!submitted ? (
              <div className="fade-up">
                <div className="mb-10">
                  <p className="editorial-label mb-4">Clarity Pro™ Intake</p>
                  <h2 className="font-display text-3xl font-medium text-charcoal mb-3">
                    Begin with Clarity
                  </h2>
                  <p className="font-body text-base text-charcoal-light">
                    Tell us where you are and what kind of clarity you need most. We will follow up within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-card border border-taupe rounded-sm p-8 lg:p-10 space-y-6">
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
                  <div>
                    <label className="font-body text-sm font-medium text-charcoal mb-2 block">What kind of clarity do you need most?</label>
                    <select
                      value={formData.clarityNeed}
                      onChange={(e) => setFormData({ ...formData, clarityNeed: e.target.value })}
                      className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors"
                    >
                      <option value="">Select one...</option>
                      <option value="niche">Niche Clarity — I need to define who I serve</option>
                      <option value="offer">Offer Clarity — I need to structure what I sell</option>
                      <option value="voice">Voice Clarity — I need to sound like me</option>
                      <option value="messaging">Messaging Clarity — I need people to understand what I do</option>
                      <option value="content">Content Strategy — I need a plan that builds authority</option>
                      <option value="all">All of the above — I need the full foundation</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-charcoal mb-2 block">Brief Background</label>
                    <textarea
                      value={formData.background}
                      onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors resize-none"
                      placeholder="What is your background and what are you building? (e.g., 15 years in HR, starting a coaching practice...)"
                    />
                  </div>
                  <button type="submit" className="w-full btn-gold rounded-sm">
                    Begin with Clarity
                  </button>
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
                  Your clarity journey begins.
                </h3>
                <p className="font-body text-base text-charcoal-light leading-relaxed">
                  We have received your intake. You will hear from us within 24 hours with your next steps.
                </p>
              </div>
            )}

            <p className="font-body text-sm text-charcoal-light text-center mt-10">
              Prefer strategic support?{" "}
              <Link href="/strategy-call" className="text-gold hover:text-gold-dark underline underline-offset-4 transition-colors">
                Book a Strategy Call
              </Link>
            </p>

            <p className="font-body text-xs text-warm-gray text-center mt-6 max-w-lg mx-auto">
              Strategy supported by AI. Judgment remains human. Please do not enter passwords, payment information, confidential records, or other highly sensitive data.
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}
