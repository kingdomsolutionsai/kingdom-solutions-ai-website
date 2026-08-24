export default function StartHere() {
  return (
    <main className="ksa-start-here">
      <style>
        {`
          .ksa-start-here {
            min-height: 100vh;
            background: #faf8f4;
            color: #171717;
            padding: 88px 24px 104px;
          }

          .ksa-start-container {
            max-width: 1120px;
            margin: 0 auto;
          }

          .ksa-start-hero {
            max-width: 820px;
            margin: 0 auto 64px;
            text-align: center;
          }

          .ksa-start-eyebrow {
            display: inline-block;
            margin-bottom: 18px;
            color: #a78035;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 2.4px;
            text-transform: uppercase;
          }

          .ksa-start-hero h1 {
            margin: 0 0 22px;
            font-family: Georgia, serif;
            font-size: clamp(40px, 6vw, 70px);
            font-weight: 700;
            line-height: 1.08;
          }

          .ksa-start-hero p {
            max-width: 720px;
            margin: 0 auto;
            color: #5b5650;
            font-size: 19px;
            line-height: 1.8;
          }

          .ksa-start-divider {
            width: 82px;
            height: 2px;
            margin: 30px auto;
            background: #b08a43;
          }

          .ksa-start-pathways {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 28px;
            margin-bottom: 42px;
          }

          .ksa-start-card {
            display: flex;
            flex-direction: column;
            padding: 38px;
            background: #ffffff;
            border: 1px solid #e7e0d4;
            border-radius: 18px;
            box-shadow: 0 12px 36px rgba(23, 23, 23, 0.045);
          }

          .ksa-start-card-label {
            margin-bottom: 14px;
            color: #a78035;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1.8px;
            text-transform: uppercase;
          }

          .ksa-start-card h2 {
            margin: 0 0 16px;
            font-family: Georgia, serif;
            font-size: 34px;
            line-height: 1.2;
          }

          .ksa-start-card p {
            margin: 0 0 18px;
            color: #59544e;
            font-size: 16px;
            line-height: 1.75;
          }

          .ksa-start-card ul {
            margin: 0 0 30px;
            padding-left: 19px;
            color: #46413c;
          }

          .ksa-start-card li {
            margin-bottom: 10px;
            line-height: 1.6;
          }

          .ksa-start-button {
            display: inline-block;
            align-self: flex-start;
            margin-top: auto;
            padding: 15px 23px;
            background: #171717;
            border: 1px solid #171717;
            border-radius: 8px;
            color: #ffffff;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.2px;
            text-decoration: none;
            transition: background 180ms ease, border-color 180ms ease;
          }

          .ksa-start-button:hover {
            background: #a78035;
            border-color: #a78035;
          }

          .ksa-start-leadership {
            padding: 38px;
            background: #171717;
            border-radius: 18px;
            color: #ffffff;
          }

          .ksa-start-leadership-label {
            margin-bottom: 12px;
            color: #d6b76e;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1.8px;
            text-transform: uppercase;
          }

          .ksa-start-leadership h2 {
            margin: 0 0 14px;
            font-family: Georgia, serif;
            font-size: 34px;
            line-height: 1.2;
          }

          .ksa-start-leadership p {
            max-width: 760px;
            margin: 0 0 24px;
            color: #e4ded4;
            font-size: 16px;
            line-height: 1.75;
          }

          .ksa-start-leadership-button {
            display: inline-block;
            padding: 14px 21px;
            border: 1px solid #d6b76e;
            border-radius: 8px;
            color: #f4dfad;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
          }

          .ksa-start-closing {
            margin: 44px 0 0;
            color: #59544e;
            font-family: Georgia, serif;
            font-size: 24px;
            text-align: center;
          }

          @media (max-width: 760px) {
            .ksa-start-here {
              padding: 68px 18px 84px;
            }

            .ksa-start-pathways {
              grid-template-columns: 1fr;
            }

            .ksa-start-card,
            .ksa-start-leadership {
              padding: 28px;
            }

            .ksa-start-card h2,
            .ksa-start-leadership h2 {
              font-size: 29px;
            }
          }
        `}
      </style>

      <div className="ksa-start-container">
        <section className="ksa-start-hero">
          <span className="ksa-start-eyebrow">Start Here</span>

          <h1>Build the Right Things in the Right Order</h1>

          <div className="ksa-start-divider" />

          <p>
            Your next step depends on where you are in your business.
            Some entrepreneurs need clarity about their audience, offer,
            and message. Others need better systems, stronger follow-up,
            and more capacity to grow.
          </p>
        </section>

        <section
          className="ksa-start-pathways"
          aria-label="Choose your business pathway"
        >
          <article className="ksa-start-card">
            <span className="ksa-start-card-label">
              Path One: Business Clarity
            </span>

            <h2>I Need Clarity to Build My Business</h2>

            <p>
              You have experience, ideas, or a calling, but you need
              help turning them into a business people can understand,
              trust, and buy from.
            </p>

            <ul>
              <li>Clarify your ideal client.</li>
              <li>Strengthen your offer.</li>
              <li>Refine your message.</li>
              <li>Identify the right next steps.</li>
            </ul>

            <a className="ksa-start-button" href="/clarity-pro">
              Explore Clarity Pro™
            </a>
          </article>

          <article className="ksa-start-card">
            <span className="ksa-start-card-label">
              Path Two: Business Capacity
            </span>

            <h2>I Need More Capacity to Grow</h2>

            <p>
              Your business is moving, but too much depends on you.
              Follow-up, scheduling, decisions, and disconnected
              systems may be quietly limiting your growth.
            </p>

            <ul>
              <li>Identify time and revenue leaks.</li>
              <li>Improve follow-up and organization.</li>
              <li>Reduce unnecessary manual work.</li>
              <li>Create capacity for sustainable growth.</li>
            </ul>

            <a
              className="ksa-start-button"
              href="/capacity-leak-audit"
            >
              Take the Capacity Leak Audit™
            </a>
          </article>
        </section>

        <section className="ksa-start-leadership">
          <div className="ksa-start-leadership-label">
            For Christian Women in Leadership
          </div>

          <h2>Lead With Greater Clarity, Confidence, and Peace</h2>

          <p>
            If you are carrying the weight of leadership and need space
            to restore your peace, strengthen your faith, and lead with
            steady confidence, explore Victor’s Circle Leadership Academy.
          </p>

          <a
            className="ksa-start-leadership-button"
            href="https://revivedspirit.com/product/victors-circle-leadership-academy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Victor’s Circle
          </a>
        </section>

        <p className="ksa-start-closing">
          You do not have to build alone. You need the right next step.
        </p>
      </div>
    </main>
  );
}
