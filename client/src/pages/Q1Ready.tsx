import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, Video } from "lucide-react";

// Direct Payhip link for the one-time $22 General Admission plan.
// Keep this in sync with the Payhip product if the price or plan changes.
const CHECKOUT_URL = "https://payhip.com/order?link=Nrvy5&pricing_plan=20zAqveozr";

const gaps = [
  { number: "01", name: "Direction", text: "Clarify what you're building and which decision deserves attention first." },
  { number: "02", name: "Offer", text: "Find the specific result a client could pay you to help achieve." },
  { number: "03", name: "Audience", text: "Understand who needs that result and how to begin genuine conversations." },
  { number: "04", name: "Structure", text: "Recognize what is missing from your priorities, follow-up, and delivery systems." },
];

const outcomes = [
  "Score your business across Direction, Offer, Audience, and Structure.",
  "Identify your leading gap and what leaving it unresolved could cost you.",
  "Watch real-time coaching through practical business situations.",
  "Learn where human-authorized AI may help and where your judgment must lead.",
  "Choose one useful action to take within the next seven days.",
];

const faqs = [
  {
    question: "Is this only for women starting a business?",
    answer: "No. Q1 Ready welcomes experienced women considering a consulting or service business and women who already have a business but want a stronger foundation.",
  },
  {
    question: "Will there be a replay?",
    answer: "General Admission is live-only and does not include a replay. A separate $29 VIP experience is planned to include the replay and an additional live group-coaching hour on December 12.",
  },
  {
    question: "How do I attend?",
    answer: "Registration is completed securely through Payhip. Workshop access information will be provided to purchasers before the live Zoom session. Please use an email address you check regularly.",
  },
  {
    question: "Is the workshop faith-based?",
    answer: "Kingdom Solutions Business & AI™ is faith-rooted, and the workshop may include a brief reflection or prayer. Women of every faith background are welcome. The business work is practical and collaborative.",
  },
  {
    question: "Does my workshop payment count toward Business Fast Track?",
    answer: "Yes. Your $22 General Admission fee may be credited toward the January 2027 30-Day Business Fast Track™ when you complete enrollment by January 10, 2027. Details are shared during the strategy-call process.",
  },
];

function RegisterButton({ label = "Reserve My Seat — $22", className = "" }: { label?: string; className?: string }) {
  return (
    <a
      href={CHECKOUT_URL}
      className={`inline-flex items-center justify-center gap-3 bg-gold px-7 py-4 font-body text-sm font-bold uppercase tracking-[0.09em] text-charcoal transition hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${className}`}
      aria-label="Reserve a Q1 Ready general admission seat for $22 through Payhip"
    >
      {label}
      <ArrowRight size={18} aria-hidden="true" />
    </a>
  );
}

export default function Q1Ready() {
  usePageMeta({
    title: "Q1 Ready Workshop | Find Your Business Gap | December 8, 2026",
    description:
      "A live $22 workshop for experienced women: identify your leading business gap, get practical coaching, and choose your next move. December 8, 2026 at 1 PM ET.",
    canonicalUrl: "https://www.kingdomsolutionsai.com/q1-ready",
    ogTitle: "Q1 Ready — The Business Fast Track Workshop",
    ogUrl: "https://www.kingdomsolutionsai.com/q1-ready",
    ogImage: "https://www.kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
  });

  return (
    <main className="bg-cream text-charcoal">
      <section className="bg-charcoal px-6 pb-20 pt-40 text-cream lg:pb-28 lg:pt-52">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Live workshop · Tuesday, December 8, 2026
            </p>
            <h1 className="max-w-3xl font-display text-5xl leading-[1.1] md:text-6xl">
              Q1 Ready: <span className="text-gold">The Business Fast Track Workshop</span>
            </h1>
            <p className="mt-7 max-w-2xl font-body text-xl leading-relaxed text-cream/90">
              Find the one gap holding your business back, and head into 2027 knowing what to address first.
            </p>
            <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-cream/75">
              You have experience. You have skills. You may even have a business already. What you need now is
              a clearer starting point—not another overwhelming list of things to do alone.
            </p>
            <div className="mt-9">
              <RegisterButton />
            </div>
            <p className="mt-4 font-body text-sm text-cream/65">
              Secure checkout through Payhip · General Admission $22 · Live attendance
            </p>
          </div>
          <aside className="border border-gold/50 bg-[#252322] p-8 shadow-xl" aria-label="Workshop details">
            <div className="mb-7 border-b border-gold/30 pb-6">
              <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-gold">General Admission</p>
              <p className="mt-3 font-display text-6xl font-bold text-cream">$22</p>
              <p className="mt-2 font-body text-sm text-cream/70">One focused hour. One meaningful next step.</p>
            </div>
            <div className="space-y-5 font-body text-base">
              <p className="flex items-center gap-3"><CalendarDays className="shrink-0 text-gold" size={20} aria-hidden="true" /> Tuesday, December 8, 2026</p>
              <p className="flex items-center gap-3"><Clock3 className="shrink-0 text-gold" size={20} aria-hidden="true" /> 1:00–2:00 PM Eastern</p>
              <p className="flex items-center gap-3"><Video className="shrink-0 text-gold" size={20} aria-hidden="true" /> Live on Zoom</p>
            </div>
            <div className="mt-7 border-t border-gold/30 pt-6">
              <p className="font-body text-sm leading-relaxed text-cream/80">
                General Admission is live-only. Come ready to reflect, participate, and make a practical decision.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-label">A different way to prepare for Q1</p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl leading-tight md:text-5xl">
            You don't need to solve everything. <span className="text-gold-dark">You need to know what matters first.</span>
          </h2>
          <p className="mt-6 max-w-3xl font-body text-lg leading-relaxed text-charcoal-light">
            Maybe you're thinking about turning your career experience into a service. Maybe you've been in
            business for a while and the foundation isn't working the way it should. In either case, your
            next move should begin with a clear understanding of where the real gap is.
          </p>
          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {gaps.map((gap) => (
              <article key={gap.name} className="border border-gold/25 bg-white p-7">
                <span className="font-body text-sm font-semibold tracking-widest text-gold-dark">{gap.number}</span>
                <h3 className="mt-5 font-display text-2xl">{gap.name}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-charcoal-light">{gap.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-dark px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2">
          <div>
            <p className="editorial-label">What we'll work through together</p>
            <h2 className="mt-3 font-display text-4xl">Leave with clarity you can act on.</h2>
            <p className="mt-5 font-body text-base leading-relaxed text-charcoal-light">
              This isn't another long webinar full of disconnected advice. It's a focused live workshop
              with teaching, an assessment, and practical coaching.
            </p>
            <RegisterButton className="mt-8" />
          </div>
          <ul className="space-y-5">
            {outcomes.map((item) => (
              <li key={item} className="flex gap-4 border-b border-gold/20 pb-5 font-body text-base leading-relaxed">
                <CheckCircle2 className="mt-1 shrink-0 text-gold-dark" size={22} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <img
            src="/assets/tabitha-headshot_fea7ebce.webp"
            alt="Tabitha Rector, founder of Kingdom Solutions Business & AI"
            className="mx-auto aspect-[4/5] w-full max-w-sm object-cover"
            loading="lazy"
          />
          <div>
            <p className="editorial-label">Meet your strategist</p>
            <h2 className="mt-3 font-display text-4xl">Experienced business guidance. A collaborative next step.</h2>
            <p className="mt-5 font-body text-base leading-relaxed text-charcoal-light">
              I'm Tabitha Rector, founder of Kingdom Solutions Business & AI™. I spent more than three
              decades making business decisions, developing people, leading teams, and helping bank
              branches generate millions of dollars in results. I understand both the business and the
              people responsible for making it work.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-charcoal-light">
              My role isn't simply to cheer you on. It's to help you think strategically, see what needs
              attention, and make informed decisions. You bring the expertise. We work through what's
              next together, with your judgment and authority at the center.
            </p>
            <p className="mt-6 font-display text-2xl italic text-gold-dark">
              Clarity before complexity. Capacity before scale. Human authority throughout.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-charcoal px-6 py-16 text-cream">
        <div className="mx-auto max-w-5xl">
          <p className="editorial-label">Optional next steps</p>
          <h2 className="mt-3 font-display text-3xl">Want to go deeper after the workshop?</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="border border-gold/30 p-7">
              <h3 className="font-display text-2xl text-gold">VIP Experience — $29 upgrade</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-cream/80">
                Planned upgrade: full workshop replay plus an additional hour of live group coaching
                on Saturday, December 12 at 12 PM Eastern. Upgrade enrollment will be provided separately.
              </p>
            </div>
            <div className="border border-gold/30 p-7">
              <h3 className="font-display text-2xl text-gold">$22 credit toward Business Fast Track</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-cream/80">
                If you enroll in the January 2027 Business Fast Track by January 10,
                your $22 workshop payment can count toward your program investment.
                <a href="/business-fast-track" className="mt-3 block font-semibold text-gold underline underline-offset-4">
                  Learn about Business Fast Track
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="editorial-label">Questions before you register?</p>
          <h2 className="mt-3 font-display text-4xl">Good to know.</h2>
          <div className="mt-8 divide-y divide-gold/25 border-y border-gold/25">
            {faqs.map((faq) => (
              <details className="group py-5" key={faq.question}>
                <summary className="cursor-pointer font-body text-lg font-semibold">{faq.question}</summary>
                <p className="mt-4 max-w-3xl font-body text-base leading-relaxed text-charcoal-light">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-dark px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="editorial-label">Find the gap. Close the gap. Build what's next.</p>
          <h2 className="mt-4 font-display text-4xl">Be Q1 ready—with a clearer next decision.</h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-charcoal-light">
            Tuesday, December 8 at 1 PM Eastern. One live hour. $22 General Admission.
          </p>
          <RegisterButton className="mt-8" />
          <p className="mt-5 font-body text-xs leading-relaxed text-charcoal-light">
            Registration is processed securely by Payhip. General Admission does not include a replay.
            For questions, <a href="/contact" className="underline underline-offset-4">contact us</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
