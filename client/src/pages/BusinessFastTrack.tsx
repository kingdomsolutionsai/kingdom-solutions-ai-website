import { usePageMeta } from "@/hooks/usePageMeta";
import "@/styles/business-fast-track.css";

/**
 * 30-Day Business Fast Track™ landing page.
 * First cohort starts November 2, 2026 (enrollment closes October 30) and is limited to eight women.
 * Styles live in styles/business-fast-track.css, scoped under .bft.
 */

/**
 * Enrollment for the first cohort: a Business Fast Track Strategy Call (Calendly,
 * with intake questions) comes first, then a private payment link.
 * After enrollment closes, the calls to action switch to asking about the next
 * cohort, so the page never invites anyone to book for a cohort that has started.
 */
const CALL_URL = "https://calendly.com/tabitha-kingdomsolutionsai/business-fast-track-strategy-call";
const NEXT_COHORT_URL =
  "mailto:tabitha@kingdomsolutionsai.com?subject=" + encodeURIComponent("Next Business Fast Track cohort");
const STARTS = "Monday, November 2";
const CLOSES = "Friday, October 30";
/** End of Friday, October 30, 2026, Eastern time. */
const ENROLLMENT_CLOSES_AT = Date.parse("2026-10-31T04:00:00Z");

function useEnrollment() {
  const open = Date.now() < ENROLLMENT_CLOSES_AT;
  return {
    open,
    href: open ? CALL_URL : NEXT_COHORT_URL,
    label: open ? "Book a Fast Track Strategy Call" : "Ask About the Next Cohort",
  };
}

function Cta({ className = "button" }: { className?: string }) {
  const { href, label } = useEnrollment();
  return (
    <a className={className} href={href}>
      {label}
    </a>
  );
}

const OUTCOMES = [
  { n: "01", title: "Business Priority Map", desc: "Know what your business needs now, what can wait, and where your attention belongs." },
  { n: "02", title: "Signature Offer Blueprint", desc: "Define the client, problem, outcome, structure, and pricing direction for one focused offer." },
  { n: "03", title: "Sales-Ready Message Kit", desc: "Explain your value clearly through positioning, a concise offer message, and authority themes." },
  { n: "04", title: "Revenue Path", desc: "Choose a practical way to begin conversations, validate the offer, and invite the right people forward." },
  { n: "05", title: "90-Day Roadmap", desc: "Enter Q1 with prioritized actions and a realistic plan for what to build, test, and refine next." },
];

const WEEKS = [
  { title: "Diagnose", desc: "Assess the business you are building, identify the most important gaps, and separate immediate priorities from later-stage work.", build: "Business Priority Map" },
  { title: "Clarify", desc: "Define the right client, meaningful problem, desired transformation, and focused signature offer.", build: "Signature Offer Blueprint" },
  { title: "Build", desc: "Shape the positioning, core message, concise explanation, and authority themes that make your value easier to understand.", build: "Sales-Ready Message Kit" },
  { title: "Activate", desc: "Choose a revenue path, take one real-market action, and organize the next ninety days around the work that matters most.", build: "Revenue Path + 90-Day Roadmap" },
];

const INCLUDED = [
  { title: "Private 90-Minute Kickoff", desc: "Assessment, priorities, and a clear starting point for your business." },
  { title: "Four Weekly Implementation Sessions", desc: "Guided work through Diagnose, Clarify, Build, and Activate." },
  { title: "Two Strategic Reviews", desc: "Focused feedback on your offer and sales-ready message." },
  { title: "Between-Session Support", desc: "A private place to ask questions and keep decisions moving." },
  { title: "90 Days of Clarity Pro™", desc: "Continued access to support your clarity, messaging, and next-step decisions." },
  { title: "Templates + Implementation Tools", desc: "Worksheets and practical tools to turn decisions into usable business assets." },
];

const FIT = [
  "You bring meaningful professional, leadership, coaching, consulting, or service experience.",
  "You are turning that expertise into a business or strengthening one you have already started.",
  "You need clarity around your audience, offer, message, or what to build next.",
  "You are willing to make decisions, complete focused work, and test your thinking in the real market.",
  "You want AI to support your work without replacing your judgment or authority.",
];

const NOT_FIT = [
  "You are looking for a passive, self-paced course with no implementation expectations.",
  "You want a guaranteed income claim or an instant-business promise.",
  "You want someone else, or an AI tool, to make every foundational decision for you.",
  "You are not able to protect time each week to complete the focused work.",
  "You are looking for a full website, funnel, legal setup, or automation buildout during this program.",
];

const FAQS = [
  { q: "Is this only for brand-new entrepreneurs?", a: "No. It is for experienced women who are turning their expertise into a service business or refining a business that was built without a clear sequence. You may be new to entrepreneurship without being new to leadership, service, or results." },
  { q: "Will I have a complete business in thirty days?", a: "You will have the essential decisions, offer, message, revenue path, and 90-day implementation plan your business needs. You will not be promised that every website, funnel, legal, operational, or automation component will be completed in thirty days." },
  { q: "How much time should I plan to protect each week?", a: "Plan for the weekly session plus focused implementation time. The work is intentionally prioritized so you can complete the right pieces without trying to build the entire business at once." },
  { q: "Is AI used in the program?", a: "Yes, where it genuinely supports clarity, research, drafting, and implementation. AI will not be positioned as the authority over your offer, values, client commitments, or business decisions. You remain the leader throughout." },
  { q: "How do I enroll?", a: `Start by booking a 30-minute Business Fast Track Strategy Call. We will look at where your business is today, what you most want settled in the next 30 days, and whether the Fast Track is the right next step. If it is a fit, you will receive a private enrollment link after the call. Enrollment for the first cohort closes ${CLOSES}, and the program begins ${STARTS}.` },
  { q: "Can I pay in more than one payment?", a: "Yes. You can pay in full or choose a payment plan. Your payment options are shared after your Strategy Call. A payment plan is a commitment to the full program price, as described in our Refund Policy." },
  { q: "Is the seat guaranteed when I book a call?", a: "No. Each cohort is limited to eight women, and seats are confirmed in the order enrollment is completed. Booking a call does not hold a seat." },
  { q: "What if I am not sure the timing is right?", a: "Book the call anyway. You will leave knowing your next step, whether or not the Fast Track is the right fit for you now." },
];

export default function BusinessFastTrack() {
  const enrollment = useEnrollment();
  usePageMeta({
    title: "30-Day Business Fast Track™ | Kingdom Solutions AI™",
    description:
      "A guided 30-day implementation experience for experienced women ready to turn their expertise into a clear, credible, buyer-ready business, built in the right order.",
    canonicalUrl: "https://kingdomsolutionsai.com/business-fast-track",
    ogTitle: "30-Day Business Fast Track™ | Build Your Business in the Right Order",
    ogUrl: "https://kingdomsolutionsai.com/business-fast-track",
    ogImage: "https://kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
  });

  return (
    <div className="bft">
      <header className="hero">
        <div className="shell hero-grid">
          <div>
            <p className="eyebrow">30-Day Business Fast Track™</p>
            <h1>
              Build your business <span className="gold">in the right order.</span>
            </h1>
            <p className="hero-copy">
              A guided 30-day implementation experience for experienced women ready to turn what they know into a
              clear, credible, buyer-ready business, with the message, revenue path, and 90-day plan to move forward
              with confidence.
            </p>
            <div className="hero-actions">
              <Cta />
              <a className="button ghost" href="#program">See the 30-Day Plan</a>
            </div>
            <p className="micro">
              {enrollment.open
                ? `Enrollment is open through ${CLOSES}. We begin ${STARTS}. Every enrollment starts with a short Strategy Call to make sure it is the right fit.`
                : `Enrollment for the November cohort has closed. Reach out to hear first when the next cohort opens.`}
            </p>
          </div>
          <aside className="hero-card" aria-label="Program overview">
            <span className="small">Begins {STARTS.replace("Monday, ", "")} • 8 Seats • Q1 2027 Ready</span>
            <h2>Focused implementation. Personal strategic guidance. A business you can explain and sell.</h2>
            <div className="proof-row">
              <div className="proof"><strong>30</strong><span>Focused days</span></div>
              <div className="proof"><strong>8</strong><span>Women maximum</span></div>
              <div className="proof"><strong>$1,997</strong><span>Investment</span></div>
            </div>
            <ul className="checklist">
              <li>One clear client and valuable problem</li>
              <li>One focused, buyer-ready offer</li>
              <li>One message people understand</li>
              <li>One practical revenue path</li>
              <li>One prioritized 90-day roadmap</li>
            </ul>
          </aside>
        </div>
      </header>

      <section className="section-cream">
        <div className="shell recognition">
          <blockquote>
            New to entrepreneurship does not mean <span>new to leadership.</span>
          </blockquote>
          <div className="recognition-copy">
            <p>You do not need another pile of ideas. You need a clear building order.</p>
            <p>
              You may have led teams, served clients, managed budgets, solved difficult problems, or carried significant
              responsibility for years. The challenge is not whether you have enough experience. It is knowing how to
              translate that experience into a business people can understand, trust, and buy from, without wasting
              months building disconnected pieces.
            </p>
            <p>
              The Business Fast Track gives you a focused place to make the right decisions, complete the foundational
              work, and move into Q1 with a credible business direction.
            </p>
          </div>
        </div>
      </section>

      <section id="outcomes">
        <div className="shell">
          <div className="section-head">
            <div className="kicker">Your Day 30 outcomes</div>
            <h2>Leave with the decisions that make everything else easier to build.</h2>
            <p>
              This is not thirty days of information. It is thirty days of guided implementation centered on the
              essential decisions your business needs now.
            </p>
          </div>
          <div className="outcome-grid">
            {OUTCOMES.map((o) => (
              <article className="outcome" key={o.n}>
                <span className="number">{o.n}</span>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
              </article>
            ))}
          </div>
          <div className="definition">
            <strong>What “ready” means</strong>
            <p>
              Your direction is decided, your offer and message are market-ready, and you know what to implement next.
              It does not mean every website page, funnel, legal document, or automation is completed in thirty days.
            </p>
          </div>
        </div>
      </section>

      <section className="section-dark" id="program">
        <div className="shell">
          <div className="section-head">
            <div className="kicker">The Right-Order Method™</div>
            <h2>Four weeks. One deliberate sequence.</h2>
            <p>
              Each week produces a tangible business asset and prepares you for the next decision, so you are not
              trying to build everything at once.
            </p>
          </div>
          <div className="timeline">
            {WEEKS.map((w) => (
              <article className="week" key={w.title}>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <span className="deliverable">You build: {w.build}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className="shell included">
          <div>
            <div className="kicker">What is included</div>
            <h2>Strategic guidance and a structure that keeps you moving.</h2>
            <p>
              You will be supported through the decisions and the implementation, not left alone with another course
              to finish someday.
            </p>
          </div>
          <div className="included-list">
            {INCLUDED.map((i) => (
              <div className="include-item" key={i.title}>
                <strong>{i.title}</strong>
                <span>{i.desc}</span>
              </div>
            ))}
            <div className="include-item bonus">
              <span className="bonus-badge">Included Bonus</span>
              <span>
                <strong>
                  Digital book: <em>What Every New Entrepreneur Needs to Know</em>
                </strong>{" "}
                Your complete reference for building the essential business systems in the right order.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="shell">
          <div className="section-head">
            <div className="kicker">Is this the right next step?</div>
            <h2>For women ready to make decisions and build.</h2>
          </div>
          <div className="fit-grid">
            <article className="fit-card">
              <h3>The Fast Track may be right for you if…</h3>
              <ul>{FIT.map((f) => <li key={f}>{f}</li>)}</ul>
            </article>
            <article className="fit-card not">
              <h3>It may not be the right fit if…</h3>
              <ul>{NOT_FIT.map((f) => <li key={f}>{f}</li>)}</ul>
            </article>
          </div>
        </div>
      </section>

      <section className="investment" id="investment">
        <div className="shell">
          <div className="investment-card">
            <div className="kicker">Your investment</div>
            <h2>30-Day Business Fast Track™</h2>
            <div className="price">$1,997</div>
            <p className="seat-note">
              Limited to eight women for personal strategic guidance and meaningful implementation support.
            </p>
            <div className="price-points">
              <span>Private kickoff</span>
              <span>Four weekly sessions</span>
              <span>Two reviews</span>
              <span>Private support</span>
              <span>90 days Clarity Pro™</span>
              <span>Digital-book bonus</span>
            </div>
            <p className="seat-note">Pay in full or choose a payment plan. Payment options are shared after your Strategy Call.</p>
            <Cta />
            <p className="micro" style={{ marginInline: "auto" }}>
              {enrollment.open
                ? `Enrollment closes ${CLOSES}. We begin ${STARTS}. Seats are confirmed in the order enrollment is completed.`
                : `Enrollment for the November cohort has closed.`}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="shell founder">
          <div className="portrait">
            <img src="/assets/tabitha-headshot_fea7ebce.webp" alt="Tabitha Rector, founder of Kingdom Solutions AI" />
          </div>
          <div>
            <div className="kicker">Your strategist</div>
            <h2>Strategy grounded in real leadership experience.</h2>
            <p>
              Tabitha Rector brings more than thirty years of experience across banking, sales, management, business
              growth, coaching, and community leadership. She has helped people think through financing, guided teams,
              developed leaders, and watched capable people succeed and struggle when the structure around their work
              was unclear.
            </p>
            <p>
              Her work with experienced women entrepreneurs begins with order: clarify the business before adding
              complexity, build capacity before pursuing scale, and use AI in ways that protect human authority.
            </p>
            <p className="signature">“Your expertise deserves a business people can understand, trust, and buy from.”</p>
            <div className="principles">
              <span>Clarity before complexity</span>
              <span>Capacity before scale</span>
              <span>Human authority throughout</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-cream" id="faq">
        <div className="shell faq">
          <div>
            <div className="kicker">Common questions</div>
            <h2>What you should know before joining.</h2>
          </div>
          <div>
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="shell">
          <div className="kicker">Your expertise is not the problem</div>
          <h2>Your business needs a clear structure for turning it into value.</h2>
          <p>
            {enrollment.open
              ? `Book a Strategy Call to see whether the 30-Day Business Fast Track™ is your right next step. Enrollment closes ${CLOSES}.`
              : "Ask about the next cohort of the 30-Day Business Fast Track™."}
          </p>
          <Cta />
        </div>
      </section>
    </div>
  );
}
