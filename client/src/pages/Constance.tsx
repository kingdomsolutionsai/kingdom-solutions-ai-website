import { useEffect } from "react";
import "@/styles/constance-sales-page.css";

const CALENDLY_URL =
  "https://calendly.com/tabitha-kingdomsolutionsai/ks-ai-intelligence-systems-strategy-call";

const LOGO_URL = "/manus-storage/constance-lion-crown-circle_b1d9c829.png";

const Arrow = () => <span aria-hidden="true">↗</span>;

const Check = () => (
  <span className="check" aria-hidden="true">
    ✓
  </span>
);

export default function Constance() {
  useEffect(() => {
    // SEO Title
    document.title = "Constance AI Chief of Staff™ | Kingdom Solutions AI™";

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Constance is your AI Chief of Staff™, helping leaders protect their capacity, strengthen follow-up, prepare for meetings, and operate with greater clarity and control."
      );
    }

    // Canonical URL
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://kingdomsolutionsai.com/constance");

    // Open Graph tags
    const ogTags: Record<string, string> = {
      "og:title": "Constance AI Chief of Staff™ | Executive Capacity, Protected",
      "og:description": "A strategic AI Chief of Staff system designed to help high-capacity leaders protect their time, strengthen execution, and stop carrying the business alone.",
      "og:url": "https://kingdomsolutionsai.com/constance",
      "og:type": "website",
      "og:image": "https://kingdomsolutionsai.com/manus-storage/constance-lion-crown-circle_b1d9c829.png",
    };

    const createdOgElements: HTMLMetaElement[] = [];
    Object.entries(ogTags).forEach(([property, content]) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (el) {
        el.setAttribute("content", content);
      } else {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        el.setAttribute("content", content);
        document.head.appendChild(el);
        createdOgElements.push(el);
      }
    });

    // Twitter Card tags
    const twitterTags: Record<string, string> = {
      "twitter:card": "summary_large_image",
      "twitter:title": "Constance AI Chief of Staff™ | Executive Capacity, Protected",
      "twitter:description": "A strategic AI Chief of Staff system designed to help high-capacity leaders protect their time, strengthen execution, and stop carrying the business alone.",
      "twitter:image": "https://kingdomsolutionsai.com/manus-storage/constance-lion-crown-circle_b1d9c829.png",
    };

    const createdTwitterElements: HTMLMetaElement[] = [];
    Object.entries(twitterTags).forEach(([name, content]) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (el) {
        el.setAttribute("content", content);
      } else {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        el.setAttribute("content", content);
        document.head.appendChild(el);
        createdTwitterElements.push(el);
      }
    });

    return () => {
      if (canonical) canonical.remove();
      createdOgElements.forEach((el) => el.remove());
      createdTwitterElements.forEach((el) => el.remove());
    };
  }, []);

  return (
    <div className="constance-page" style={{ marginTop: "-1px" }}>
      <section className="hero" id="top" style={{ scrollMarginTop: "128px" }}>
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">YOUR BUSINESS, UNDER COMMAND</p>
          <h1>
            Stop being the
            <em> operating system.</em>
          </h1>
          <p className="hero-lead">
            Constance AI Chief of Staff™ turns your calendar, pipeline,
            priorities, and follow-up into one intelligent executive command
            system—so you can lead with clarity without carrying every detail.
          </p>
          <div className="hero-actions">
            <a
              className="button button-gold"
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
            >
              Book your strategy call <Arrow />
            </a>
            <a className="text-link" href="#capabilities">
              See what Constance handles <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-meta" aria-label="Offer highlights">
            <span>Built around your business</span>
            <span>Human authority retained</span>
            <span>Executive-level visibility</span>
          </div>
        </div>

        <aside className="command-card" aria-label="Constance executive briefing preview">
          <div className="command-card-head">
            <div>
              <p>CONSTANCE</p>
              <span>EXECUTIVE INTELLIGENCE</span>
            </div>
            <span className="live-status">ACTIVE</span>
          </div>
          <div className="briefing-title">
            <span>07:00</span>
            <div>
              <p>FRIDAY BRIEFING</p>
              <h2>Good morning, Tabitha.</h2>
            </div>
          </div>
          <div className="priority-block">
            <p>YOUR FOCUS</p>
            <strong>Protect the revenue conversation.</strong>
            <span>
              Three priorities aligned. Two follow-ups need your approval.
            </span>
          </div>
          <div className="signal-grid">
            <div>
              <span>CALENDAR</span>
              <strong>4</strong>
              <small>key moments</small>
            </div>
            <div>
              <span>PIPELINE</span>
              <strong>3</strong>
              <small>next actions</small>
            </div>
            <div>
              <span>DECISIONS</span>
              <strong>2</strong>
              <small>need review</small>
            </div>
          </div>
          <div className="briefing-note">
            <span className="gold-dot" aria-hidden="true" />
            <p>
              Strategy call at 11:00. Brief is prepared and the lead history is
              attached.
            </p>
          </div>
        </aside>
      </section>

      <div className="truth-bar">
        <p>NOT ANOTHER APP TO MANAGE.</p>
        <strong>A CHIEF OF STAFF PRESENCE THAT HELPS YOU STAY AHEAD.</strong>
      </div>

      <section className="outcomes section-shell" id="outcomes" style={{ scrollMarginTop: "128px" }}>
        <div className="section-intro">
          <p className="eyebrow eyebrow-dark">THE EXECUTIVE SHIFT</p>
          <h2>
            The business stops
            <em> living in your head.</em>
          </h2>
          <p>
            Constance gathers what is scattered, identifies what matters, and
            places the right information in front of you before the moment
            demands it.
          </p>
        </div>

        <div className="outcome-grid">
          <article className="outcome-card outcome-card-dark">
            <span className="card-number">01</span>
            <p className="card-kicker">COMMAND</p>
            <h3>Know what needs your attention.</h3>
            <p>
              Walk into the day with priorities, schedule pressure, lead
              movement, and open decisions already organized.
            </p>
            <div className="mini-visual">
              <span className="mini-line line-long" />
              <span className="mini-line line-medium" />
              <span className="mini-line line-short" />
            </div>
          </article>
          <article className="outcome-card">
            <span className="card-number">02</span>
            <p className="card-kicker">CAPACITY</p>
            <h3>Protect what only you can carry.</h3>
            <p>
              Remove routine operational weight from your nervous system so
              your best energy stays available for leadership, discernment,
              and growth.
            </p>
            <div className="capacity-ring" aria-label="Protected leadership capacity">
              <div>
                <strong>FOCUS</strong>
                <span>protected</span>
              </div>
            </div>
          </article>
          <article className="outcome-card outcome-card-gold">
            <span className="card-number">03</span>
            <p className="card-kicker">FOLLOW-THROUGH</p>
            <h3>Keep momentum without chasing details.</h3>
            <p>
              Surface the follow-up, preparation, and next action that keeps
              revenue conversations and important relationships moving.
            </p>
            <ul className="task-list">
              <li><Check /> Sales brief prepared</li>
              <li><Check /> Follow-up drafted</li>
              <li><Check /> Next action surfaced</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="capabilities" id="capabilities" style={{ scrollMarginTop: "128px" }}>
        <div className="capabilities-copy">
          <p className="eyebrow">ONE INTELLIGENT COMMAND LAYER</p>
          <h2>Constance sees across the work—not just inside one task.</h2>
          <p className="capabilities-lead">
            She connects the operational signals that shape an executive day,
            then turns them into clear, timely intelligence.
          </p>
          <div className="capability-list">
            <article>
              <span>01</span>
              <div>
                <h3>Owns your calendar intelligence</h3>
                <p>
                  Reads the day ahead, surfaces pressure points, and makes sure
                  you enter important meetings prepared.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Watches the lead pipeline</h3>
                <p>
                  Keeps fit, urgency, status, and next-step signals visible so
                  promising opportunities do not quietly disappear.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Briefs you before the conversation</h3>
                <p>
                  Organizes the person, context, opportunity, history, and
                  desired outcome before you walk into the room.
                </p>
              </div>
            </article>
            <article>
              <span>04</span>
              <div>
                <h3>Surfaces follow-up and drafts the response</h3>
                <p>
                  Prepares reviewable communication and next actions while you
                  retain the final decision and voice.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="command-flow" aria-label="Constance command flow">
          <div className="flow-orbit orbit-one" />
          <div className="flow-orbit orbit-two" />
          <div className="flow-center">
            <span>C</span>
            <strong>CONSTANCE</strong>
            <small>COMMAND LAYER</small>
          </div>
          <div className="flow-node node-calendar">
            <span>CALENDAR</span>
            <strong>TIME</strong>
          </div>
          <div className="flow-node node-pipeline">
            <span>PIPELINE</span>
            <strong>REVENUE</strong>
          </div>
          <div className="flow-node node-briefing">
            <span>BRIEFINGS</span>
            <strong>CLARITY</strong>
          </div>
          <div className="flow-node node-followup">
            <span>FOLLOW-UP</span>
            <strong>MOMENTUM</strong>
          </div>
        </div>
      </section>

      <section className="control-section section-shell">
        <div className="control-quote">
          <span className="quote-mark">"</span>
          <blockquote>
            A great Chief of Staff does not make more noise.
            <em> She makes the leader more effective.</em>
          </blockquote>
        </div>
        <div className="control-copy">
          <p className="eyebrow eyebrow-dark">DESIGNED WITH BOUNDARIES</p>
          <h2>Intelligence without surrendering authority.</h2>
          <p>
            Constance organizes, monitors, prepares, and drafts within the
            access you approve. She does not replace your judgment, your voice,
            or your final decisions.
          </p>
          <ul>
            <li><Check /> Permission-led setup</li>
            <li><Check /> Reviewable communication</li>
            <li><Check /> Clear operating boundaries</li>
            <li><Check /> Built around your existing workflow</li>
          </ul>
        </div>
      </section>

      <section className="investment" id="strategy-call" style={{ scrollMarginTop: "128px" }}>
        <div className="investment-intro">
          <p className="eyebrow">PRIVATE STRATEGY CALL</p>
          <h2>Identify what your business needs to stop requiring from you.</h2>
          <p>
            This is a focused executive conversation about the operational
            weight you are carrying, the intelligence your systems are missing,
            and where Constance can create the greatest shift.
          </p>
        </div>

        <div className="offer-card">
          <div className="offer-main">
            <p className="offer-label">WHAT WE WILL EXAMINE TOGETHER</p>
            <h3>Map the right command layer for your business.</h3>
            <ul className="included-list">
              <li><Check /> The work currently living in your head</li>
              <li><Check /> Calendar and meeting-preparation pressure</li>
              <li><Check /> Lead visibility and follow-up gaps</li>
              <li><Check /> Decisions that need better intelligence</li>
              <li><Check /> The boundaries and authority you want to retain</li>
              <li><Check /> The strongest first implementation priority</li>
            </ul>
          </div>
          <aside className="strategy-call-panel">
            <span>KS AI INTELLIGENCE SYSTEMS</span>
            <h3>Strategy Call</h3>
            <p>
              Bring the places where visibility, preparation, and follow-through
              are breaking. We will clarify what Constance should carry—and
              what must remain with you.
            </p>
            <div className="call-outcomes" aria-label="Strategy call outcomes">
              <div><strong>01</strong><span>DISCOVER</span></div>
              <div><strong>02</strong><span>ALIGN</span></div>
              <div><strong>03</strong><span>DECIDE</span></div>
            </div>
            <a
              className="button button-dark"
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
            >
              Choose your call time <Arrow />
            </a>
          </aside>
        </div>
        <p className="investment-note">
          This is not a generic product demo. The conversation is centered on
          your leadership, your systems, and the operational outcomes you need.
        </p>
      </section>

      <section className="fit-section section-shell">
        <div>
          <p className="eyebrow eyebrow-dark">BUILT FOR THE LEADER AT CAPACITY</p>
          <h2>You do not need more discipline. You need a stronger operating layer.</h2>
        </div>
        <div className="fit-columns">
          <article>
            <p className="fit-label fit-label-gold">THIS IS FOR YOU IF</p>
            <ul>
              <li>Your business has outgrown memory and manual follow-up.</li>
              <li>You are the only person who can see the whole picture.</li>
              <li>Revenue opportunities are moving across disconnected tools.</li>
              <li>You want AI support without losing human control.</li>
            </ul>
          </article>
          <article>
            <p className="fit-label">THIS IS NOT THE RIGHT FIT IF</p>
            <ul>
              <li>You want a generic assistant with no implementation.</li>
              <li>You are not prepared to clarify workflows or permissions.</li>
              <li>You expect AI to make final leadership decisions for you.</li>
              <li>You need a full human executive assistant replacement.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-intro">
          <p className="eyebrow">BEFORE WE BEGIN</p>
          <h2>Clear answers. No unnecessary complexity.</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>Is Constance a chatbot?</summary>
            <p>
              No. Chat can be one way you interact with her, but the value is
              the connected executive intelligence she prepares from approved
              business systems and workflows.
            </p>
          </details>
          <details>
            <summary>Will Constance make decisions or send messages for me?</summary>
            <p>
              You retain final authority. Communication can be drafted for
              review, and any automation is configured within the permissions
              and boundaries agreed during implementation.
            </p>
          </details>
          <details>
            <summary>Will this replace my existing tools?</summary>
            <p>
              Not necessarily. Constance is designed to create an intelligent
              command layer across the tools that already support your
              business, reducing fragmentation instead of creating another
              system to manage.
            </p>
          </details>
          <details>
            <summary>How is my final scope determined?</summary>
            <p>
              The fit call confirms your highest-value workflows, required
              integrations, access boundaries, and implementation priorities
              before work begins.
            </p>
          </details>
        </div>
      </section>

      <section className="closing" id="apply">
        <div className="closing-glow" aria-hidden="true" />
        <p className="eyebrow">THE NEXT LEVEL OF LEADERSHIP NEEDS INFRASTRUCTURE</p>
        <h2>
          Your business was never meant to be carried by
          <em> your nervous system.</em>
        </h2>
        <p>
          If growth is asking more of you than you can sustainably hold,
          Constance can help turn scattered operations into executive command.
        </p>
        <a
          className="button button-gold button-large"
          href={CALENDLY_URL}
          target="_blank"
          rel="noreferrer"
        >
          Book your strategy call <Arrow />
        </a>
        <small>
          Select the time that works best for you through Calendly.
        </small>
      </section>

      {/* Compliance Note — preserved from existing site */}
      <section style={{ padding: "2rem 1.5rem", background: "var(--c-cream)" }}>
        <p style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "0.75rem", color: "var(--c-muted)", textAlign: "center", maxWidth: "42rem", margin: "0 auto", lineHeight: 1.6 }}>
          Kingdom Solutions AI™ does not currently position Constance™ as independently SOC 2 Type II certified. Constance™ is designed with privacy-conscious workflows, clear data boundaries, and responsible AI implementation practices.
        </p>
      </section>
    </div>
  );
}
