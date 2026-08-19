import { Link } from "wouter";
import { useEffect } from "react";
import "@/styles/constance-sales-page.css";

const STRIPE_URL = "https://buy.stripe.com/9B6aEZ7dtblS3gpdAggrS09";

const Arrow = () => <span aria-hidden="true">↗</span>;

const Check = () => (
  <span className="check" aria-hidden="true">
    ✓
  </span>
);

export default function ClarityPro() {
  useEffect(() => {
    document.title = "Clarity Pro™ — Strategic Clarity System | Kingdom Solutions AI™";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Clarity Pro™ is a private 1:1 session that turns your expertise into a clear niche, offer, voice, and message — delivered to you in writing, so the market finally understands what you do."
      );
    }

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://kingdomsolutionsai.com/clarity-pro");

    const ogTags: Record<string, string> = {
      "og:title": "Clarity Pro™ — Turn Your Expertise Into a Business People Understand",
      "og:description": "A private 1:1 clarity engagement that defines your niche, offer, voice, and message — and delivers it in writing.",
      "og:url": "https://kingdomsolutionsai.com/clarity-pro",
      "og:type": "website",
      "og:image": "https://kingdomsolutionsai.com/assets/constance-lion-crown-circle_b1d9c829.png",
    };
    const createdOg: HTMLMetaElement[] = [];
    Object.entries(ogTags).forEach(([property, content]) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (el) {
        el.setAttribute("content", content);
      } else {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        el.setAttribute("content", content);
        document.head.appendChild(el);
        createdOg.push(el);
      }
    });

    const twitterTags: Record<string, string> = {
      "twitter:card": "summary_large_image",
      "twitter:title": "Clarity Pro™ — Turn Your Expertise Into a Business People Understand",
      "twitter:description": "A private 1:1 clarity engagement that defines your niche, offer, voice, and message — delivered in writing.",
      "twitter:image": "https://kingdomsolutionsai.com/assets/constance-lion-crown-circle_b1d9c829.png",
    };
    const createdTw: HTMLMetaElement[] = [];
    Object.entries(twitterTags).forEach(([name, content]) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (el) {
        el.setAttribute("content", content);
      } else {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        el.setAttribute("content", content);
        document.head.appendChild(el);
        createdTw.push(el);
      }
    });

    return () => {
      if (canonical) canonical.remove();
      createdOg.forEach((el) => el.remove());
      createdTw.forEach((el) => el.remove());
    };
  }, []);

  return (
    <div className="constance-page" style={{ marginTop: "-1px" }}>
      {/* HERO */}
      <section className="hero" id="top" style={{ scrollMarginTop: "128px" }}>
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">AI BUSINESS CLARITY STRATEGIST</p>
          <h1>
            Turn your expertise into a business people
            <em> understand.</em>
          </h1>
          <p className="hero-lead">
            Clarity Pro™ is a private 1:1 session that defines your niche,
            structures your offer, develops your voice, and sharpens your
            message—so what you already know becomes something the market can
            find, understand, and buy from.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="#pricing">
              Get Clarity Pro™ <Arrow />
            </a>
            <a className="text-link" href="#clarify">
              See what we clarify <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-meta" aria-label="Offer highlights">
            <span>Private 1:1 with Tabitha</span>
            <span>Your voice, protected</span>
            <span>Delivered in writing</span>
          </div>
        </div>

        <aside className="command-card" aria-label="Clarity Pro positioning preview">
          <div className="command-card-head">
            <div>
              <p>CLARITY PRO</p>
              <span>POSITIONING SYSTEM</span>
            </div>
            <span className="live-status">CLEAR</span>
          </div>
          <div className="briefing-title">
            <span>60m</span>
            <div>
              <p>CLARITY REVIEW</p>
              <h2>You, translated.</h2>
            </div>
          </div>
          <div className="priority-block">
            <p>YOUR POSITIONING</p>
            <strong>
              "I help [specific who] achieve [clear outcome]—without [the usual
              struggle]."
            </strong>
            <span>
              Niche, offer, and message—clarified and delivered in writing.
            </span>
          </div>
          <div className="signal-grid">
            <div>
              <span>NICHE</span>
              <strong>✓</strong>
              <small>defined</small>
            </div>
            <div>
              <span>OFFER</span>
              <strong>✓</strong>
              <small>structured</small>
            </div>
            <div>
              <span>VOICE</span>
              <strong>✓</strong>
              <small>yours</small>
            </div>
          </div>
          <div className="briefing-note">
            <span className="gold-dot" aria-hidden="true" />
            <p>
              Your positioning statement and personal voice note are delivered
              by email after your session.
            </p>
          </div>
        </aside>
      </section>

      <div className="truth-bar">
        <p>NOT MORE CONTENT.</p>
        <strong>A CLEAR BUSINESS UNDERNEATH IT.</strong>
      </div>

      {/* OUTCOMES */}
      <section className="outcomes section-shell" id="outcomes" style={{ scrollMarginTop: "128px" }}>
        <div className="section-intro">
          <p className="eyebrow eyebrow-dark">THE CLARITY SHIFT</p>
          <h2>
            You are not behind.
            <em> You are untranslated.</em>
          </h2>
          <p>
            You are not starting empty—you have years of expertise and lived
            experience. The gap is not competence. It is translation: turning
            what you know into a business people understand.
          </p>
        </div>

        <div className="outcome-grid">
          <article className="outcome-card outcome-card-dark">
            <span className="card-number">01</span>
            <p className="card-kicker">NICHE &amp; OFFER</p>
            <h3>Know exactly who you serve and what you sell.</h3>
            <p>
              Define the person you help and structure your expertise into an
              offer people understand and want to buy—not a vague menu of
              services.
            </p>
            <div className="mini-visual">
              <span className="mini-line line-long" />
              <span className="mini-line line-medium" />
              <span className="mini-line line-short" />
            </div>
          </article>
          <article className="outcome-card">
            <span className="card-number">02</span>
            <p className="card-kicker">VOICE &amp; MESSAGE</p>
            <h3>Sound like you—and be understood.</h3>
            <p>
              Develop a distinct business voice and messaging that resonates
              with the right people and differentiates you from the noise.
            </p>
            <div className="capacity-ring" aria-label="Your voice, protected">
              <div>
                <strong>VOICE</strong>
                <span>protected</span>
              </div>
            </div>
          </article>
          <article className="outcome-card outcome-card-gold">
            <span className="card-number">03</span>
            <p className="card-kicker">IN WRITING</p>
            <h3>Walk away with it documented, not just discussed.</h3>
            <p>
              Your clarity is captured and delivered—so every future post, page,
              and conversation is built on something solid.
            </p>
            <ul className="task-list">
              <li><Check /> Positioning statement</li>
              <li><Check /> Personal voice note</li>
              <li><Check /> Content direction</li>
            </ul>
          </article>
        </div>
      </section>

      {/* WHAT WE CLARIFY */}
      <section className="capabilities" id="clarify" style={{ scrollMarginTop: "128px" }}>
        <div className="capabilities-copy">
          <p className="eyebrow">ONE GUIDED SESSION</p>
          <h2>Clarity works from the foundation up—not the content down.</h2>
          <p className="capabilities-lead">
            When the niche is unclear, the offer is unclear. When the offer is
            unclear, the message is unclear—and content does not convert, no
            matter how much you produce. Clarity Pro™ starts at the foundation.
          </p>
          <div className="capability-list">
            <article>
              <span>01</span>
              <div>
                <h3>Your Niche</h3>
                <p>
                  Define who you serve and the problem you solve with precision
                  that attracts the right people and repels the wrong ones.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Your Offer</h3>
                <p>
                  Structure your expertise into a clear, compelling offer people
                  understand and want to buy.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Your Voice</h3>
                <p>
                  Develop and protect a distinct business voice that sounds
                  unmistakably like you—not a template.
                </p>
              </div>
            </article>
            <article>
              <span>04</span>
              <div>
                <h3>Your Message</h3>
                <p>
                  Articulate what you do in language that resonates and
                  differentiates—so people finally get it.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="command-flow" aria-label="Clarity Pro clarity system">
          <div className="flow-orbit orbit-one" />
          <div className="flow-orbit orbit-two" />
          <div className="flow-center">
            <span>C</span>
            <strong>CLARITY PRO</strong>
            <small>CLARITY SYSTEM</small>
          </div>
          <div className="flow-node node-calendar">
            <span>NICHE</span>
            <strong>WHO</strong>
          </div>
          <div className="flow-node node-pipeline">
            <span>OFFER</span>
            <strong>WHAT</strong>
          </div>
          <div className="flow-node node-briefing">
            <span>VOICE</span>
            <strong>HOW</strong>
          </div>
          <div className="flow-node node-followup">
            <span>MESSAGE</span>
            <strong>WHY</strong>
          </div>
        </div>
      </section>

      {/* RESPONSIBLE BY DESIGN */}
      <section className="control-section section-shell">
        <div className="control-quote">
          <span className="quote-mark">"</span>
          <blockquote>
            This is not about sounding polished.
            <em> It is about sounding true.</em>
          </blockquote>
        </div>
        <div className="control-copy">
          <p className="eyebrow eyebrow-dark">RESPONSIBLE BY DESIGN</p>
          <h2>Strategy supported by AI. Judgment remains human.</h2>
          <p>
            Clarity Pro™ helps you analyze, structure, and articulate—but you
            decide what fits, what changes, and what moves forward. Please use
            it for strategy and non-sensitive business context only.
          </p>
          <ul>
            <li><Check /> You retain authority</li>
            <li><Check /> Your voice stays yours</li>
            <li><Check /> Clear data boundaries</li>
            <li><Check /> Built around your business</li>
          </ul>
        </div>
      </section>

      {/* THE OFFER */}
      <section className="investment" id="pricing" style={{ scrollMarginTop: "128px" }}>
        <div className="investment-intro">
          <p className="eyebrow">THE ENGAGEMENT</p>
          <h2>One focused session. One clear direction.</h2>
          <p>
            Clarity Pro™ is a private, guided engagement with Tabitha—no course
            to grind through, no group to hide in. You leave with your niche,
            offer, voice, and message clarified, and you leave with it in
            writing.
          </p>
        </div>

        <div className="offer-card">
          <div className="offer-main">
            <p className="offer-label">WHAT'S INCLUDED</p>
            <h3>Clarity Pro™</h3>
            <ul className="included-list">
              <li><Check /> A 60-minute 1:1 Clarity Review with Tabitha</li>
              <li><Check /> A written before/after positioning statement, by email</li>
              <li><Check /> A personal voice note walking through your direction</li>
              <li><Check /> Live feedback on your offer, voice, and message</li>
              <li><Check /> 14 days of light follow-up support</li>
              <li><Check /> Your clarity captured and documented</li>
            </ul>
          </div>
          <aside className="strategy-call-panel">
            <span>KINGDOM SOLUTIONS AI™</span>
            <h3>$497</h3>
            <p>
              A private 1:1 with Tabitha. You leave with your niche, offer,
              voice, and message—clarified and in writing.
            </p>
            <div className="call-outcomes" aria-label="Clarity Pro process">
              <div><strong>01</strong><span>CLARIFY</span></div>
              <div><strong>02</strong><span>REFINE</span></div>
              <div><strong>03</strong><span>ACTIVATE</span></div>
            </div>
            <a
              className="button button-dark"
              href={STRIPE_URL}
              target="_blank"
              rel="noreferrer"
            >
              Start Clarity Pro™ — $497 <Arrow />
            </a>
          </aside>
        </div>
        <p className="investment-note">
          Want the full build-out—sales page, content plan, and launch-ready
          assets? That is handled through{" "}
          <Link to="/executive-ai-strategy">Executive AI Strategy</Link>. Prefer
          to talk first? <Link to="/strategy-call">Book a strategy call</Link>.
        </p>
      </section>

      {/* FIT */}
      <section className="fit-section section-shell">
        <div>
          <p className="eyebrow eyebrow-dark">BUILT FOR THE UNTRANSLATED EXPERT</p>
          <h2>You do not need more tactics. You need clarity first.</h2>
        </div>
        <div className="fit-columns">
          <article>
            <p className="fit-label fit-label-gold">THIS IS FOR YOU IF</p>
            <ul>
              <li>You know you can help people but cannot yet articulate what you do.</li>
              <li>You have decades of expertise but no business language for it yet.</li>
              <li>You have been posting content without a clear niche or offer underneath.</li>
              <li>Your services are too broad, too vague, or too hard to explain quickly.</li>
            </ul>
          </article>
          <article>
            <p className="fit-label">THIS IS NOT THE RIGHT FIT IF</p>
            <ul>
              <li>Your niche, offer, and message are already crystal clear.</li>
              <li>You want done-for-you content instead of clarity underneath it.</li>
              <li>You want someone else to decide your niche and voice for you.</li>
              <li>
                You need the full build-out—that is{" "}
                <Link to="/executive-ai-strategy" style={{ color: "var(--c-gold-dark)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Executive AI Strategy
                </Link>
                .
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="faq-intro">
          <p className="eyebrow">BEFORE YOU BEGIN</p>
          <h2>Clear answers. No unnecessary complexity.</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>What exactly is Clarity Pro™?</summary>
            <p>
              A guided 1:1 process that turns your existing expertise into a
              clear niche, a pressure-tested offer, a recognizable voice, and a
              practical content direction—built with AI support, refined by your
              judgment, and delivered to you in writing.
            </p>
          </details>
          <details>
            <summary>Is Clarity Pro™ one-on-one?</summary>
            <p>
              Yes. It is a private 60-minute Clarity Review with Tabitha,
              followed by a written before/after positioning statement and a
              personal voice note—not a course, and not a group program.
            </p>
          </details>
          <details>
            <summary>Can Clarity Pro™ create content for me?</summary>
            <p>
              It gives you direction and a clear plan—not a stream of generic
              posts. The goal is a clearer business first; better content is
              what naturally follows.
            </p>
          </details>
          <details>
            <summary>Is this only for brand-new coaches?</summary>
            <p>
              No. It is built for anyone whose experience is real but whose
              business language has not caught up yet—new coaches,
              corporate-to-coach professionals, founders, and consultants alike.
            </p>
          </details>
          <details>
            <summary>What if I need the full build-out, not just clarity?</summary>
            <p>
              Clarity Pro™ is the clarity engagement. If you want that clarity
              turned into launch-ready assets—a sales page, content plan, and
              campaign direction—that is handled through{" "}
              <Link to="/executive-ai-strategy" style={{ color: "var(--c-gold-dark)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Executive AI Strategy
              </Link>
              .
            </p>
          </details>
          <details>
            <summary>How should I handle confidential information?</summary>
            <p>
              Use Clarity Pro™ for strategy and general business context only.
              Do not enter passwords, payment details, confidential client
              records, medical information, legal documents, or other highly
              sensitive data.
            </p>
          </details>
          <details>
            <summary>What is the refund policy?</summary>
            <p>
              Clarity Pro™ allows cancellation before your Clarity Review
              session is delivered, handled case-by-case within 48 hours of
              purchase. Full details are in our Refund Policy.
            </p>
          </details>
        </div>
      </section>

      {/* CLOSING */}
      <section className="closing" id="apply">
        <div className="closing-glow" aria-hidden="true" />
        <p className="eyebrow">CLARITY BEFORE COMPLEXITY</p>
        <h2>
          Your expertise was never the problem.
          <em> Being understood was.</em>
        </h2>
        <p>
          If the business underneath your content is not yet clear, Clarity Pro™
          gives you the niche, offer, voice, and message to build on—in one
          focused session, delivered in writing.
        </p>
        <a
          className="button button-gold button-large"
          href={STRIPE_URL}
          target="_blank"
          rel="noreferrer"
        >
          Start Clarity Pro™ — $497 <Arrow />
        </a>
        <small>Secure one-time checkout via Stripe.</small>
      </section>

      {/* Compliance Note */}
      <section style={{ padding: "2rem 1.5rem", background: "var(--c-cream)" }}>
        <p
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "0.75rem",
            color: "var(--c-muted)",
            textAlign: "center",
            maxWidth: "42rem",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Strategy supported by AI. Judgment remains human. Please do not enter
          passwords, payment information, confidential records, or other highly
          sensitive data into any Kingdom Solutions AI™ system.
        </p>
      </section>
    </div>
  );
}
