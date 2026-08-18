import { Link } from "wouter";
import { useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { trpc } from "@/lib/trpc";

/**
 * Capacity Leak Audit™ — auto-routing diagnostic
 * Flow: intro → 6 scored questions → contact capture → result (auto-routed).
 * Lead still submits through the EXISTING trpc.forms.submitCapacityLeakAudit
 * mutation (same input shape), so no server/router change is required.
 * The audit result is packed into the `challenge` field so it shows in Notion.
 */

type LeakKey = "clarity" | "pipeline" | "ops";
type Route = "clarity" | "ops" | "call";

const QUESTIONS: { leak: LeakKey; q: string; a: [string, number][] }[] = [
  {
    leak: "clarity",
    q: "When someone asks what you do, how clearly can you answer?",
    a: [["Crystal clear, every time", 0], ["Mostly, but it wanders", 1], ["It depends on the day", 2], ["I ramble and lose them", 3]],
  },
  {
    leak: "pipeline",
    q: "Do you know your best-fit prospects right now, ranked by who's ready?",
    a: [["Yes — I can see them clearly", 0], ["A few come to mind", 1], ["Only vaguely", 2], ["No idea who's warm", 3]],
  },
  {
    leak: "ops",
    q: "How much of your week goes to inbox, scheduling, and admin?",
    a: [["Very little", 0], ["Some of it", 1], ["A lot of it", 2], ["Most of my week", 3]],
  },
  {
    leak: "clarity",
    q: "Could a stranger read your content and know exactly who you serve and what you sell?",
    a: [["Yes, unmistakably", 0], ["Roughly", 1], ["Not really", 2], ["No — it's scattered", 3]],
  },
  {
    leak: "pipeline",
    q: "How often do good opportunities go cold before you follow up?",
    a: [["Rarely", 0], ["Sometimes", 1], ["Often", 2], ["Constantly", 3]],
  },
  {
    leak: "ops",
    q: "If you stepped away for a week, would follow-up and operations keep running?",
    a: [["Yes, smoothly", 0], ["Mostly", 1], ["Barely", 2], ["No — it would stop", 3]],
  },
];

const DOORS: Record<Route, { name: string; desc: string; cta: string; href: string }> = {
  clarity: {
    name: "Clarity Pro™",
    desc: "Turn your experience into one clear, sellable direction — the client you serve, the problem you solve, and the words that make people say yes.",
    cta: "Begin Clarity Pro™",
    href: "/clarity-pro",
  },
  ops: {
    name: "Constance™",
    desc: "Your Human-Authorized AI Chief of Staff takes the inbox, follow-up, and admin off your plate — every action approval-gated, so you stay in authority.",
    cta: "Meet Constance™",
    href: "/constance",
  },
  call: {
    name: "Book a call with Tabitha",
    desc: "Your leaks span more than one area — a short conversation is the fastest way to find what to fix first. No pitch; honest diagnosis.",
    cta: "Book a call",
    href: "/strategy-call",
  },
};

const LEAK_NAMES: Record<LeakKey, string> = {
  clarity: "Clarity Leak",
  pipeline: "Pipeline Leak",
  ops: "Operations Leak",
};

function levelLabel(v: number) {
  return v <= 1 ? "Minor" : v <= 3 ? "Moderate" : v <= 4 ? "Significant" : "Major";
}

export default function CapacityLeakAudit() {
  usePageMeta({
    title: "Capacity Leak Audit™ — Find Where Your Business Is Leaking | Kingdom Solutions AI™",
    description:
      "The Capacity Leak Audit™ pinpoints whether your time, leads, or revenue is leaking through clarity, pipeline, or operations — and routes you to the right next step. Free strategic diagnostic from Kingdom Solutions AI™.",
    canonicalUrl: "https://kingdomsolutionsai.com/capacity-leak-audit",
    ogImage: "https://kingdomsolutionsai.com/assets/capacity-audit-visual_7655f585.png",
  });

  type Step = "intro" | number | "capture" | "result";
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<({ leak: LeakKey; pts: number } | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    company: "",
    challenge: "",
  });

  // computed result
  const scores = { clarity: 0, pipeline: 0, ops: 0 } as Record<LeakKey, number>;
  answers.forEach((a) => { if (a) scores[a.leak] += a.pts; });
  const ranked = (Object.entries(scores) as [LeakKey, number][]).sort((a, b) => b[1] - a[1]);
  const top = ranked[0];
  const second = ranked[1];
  const mixed = top[1] - second[1] <= 1 && top[1] >= 3;
  const severe = scores.clarity >= 4 && scores.ops >= 4;
  let route: Route;
  if (top[0] === "pipeline" || mixed || severe) route = "call";
  else if (top[0] === "clarity") route = "clarity";
  else route = "ops";

  const submitMutation = trpc.forms.submitCapacityLeakAudit.useMutation({
    onSuccess: () => setStep("result"),
    onError: () => setStep("result"), // never trap the user on a webhook hiccup
  });

  function answer(qi: number, leak: LeakKey, pts: number) {
    const next = [...answers];
    next[qi] = { leak, pts };
    setAnswers(next);
    if (qi < QUESTIONS.length - 1) setStep(qi + 1);
    else setStep("capture");
  }

  function submitLead(e: React.FormEvent) {
    e.preventDefault();
    const summary =
      `AUTO-AUDIT RESULT → recommended: ${DOORS[route].name}. ` +
      `Scores — Clarity ${scores.clarity}/6 (${levelLabel(scores.clarity)}), ` +
      `Pipeline ${scores.pipeline}/6 (${levelLabel(scores.pipeline)}), ` +
      `Operations ${scores.ops}/6 (${levelLabel(scores.ops)}).`;
    submitMutation.mutate({ ...formData, challenge: summary });
  }

  const pct = (v: number) => Math.round((v / 6) * 100);
  const otherKeys = (["clarity", "ops", "call"] as Route[]).filter((k) => k !== route);

  return (
    <div className="cla-root">
      <style>{claStyles}</style>

      <div className="cla-wrap">
        <img
          className="cla-crest"
          src="/assets/ksai-lion-crown-white-disc.png"
          alt="Kingdom Solutions AI™"
        />
        <div className="cla-wordmark">Kingdom Solutions <b>AI™</b></div>

        {step !== "result" && (
          <>
            <div className="cla-eyebrow">Capacity Leak Audit™</div>
            <h1 className="cla-h1">
              {step === "capture"
                ? "One last step to see your Leak Report."
                : "Find where your time, leads, and revenue are leaking."}
            </h1>
            <p className="cla-lede">
              {step === "capture"
                ? "Where should we send your results? Your report and recommended next step appear on the next screen."
                : "Six quick questions. You'll see your leak across three areas — and your clearest next step."}
            </p>
          </>
        )}

        {/* progress */}
        {step !== "result" && (
          <div className="cla-prog">
            <span
              style={{
                width:
                  step === "intro"
                    ? "0%"
                    : step === "capture"
                    ? "100%"
                    : `${((step as number) / QUESTIONS.length) * 100}%`,
              }}
            />
          </div>
        )}

        {/* INTRO */}
        {step === "intro" && (
          <div className="cla-center">
            <button className="cla-cta" onClick={() => setStep(0)}>
              Start the audit →
            </button>
            <p className="cla-fine">Free · takes about 90 seconds · no charge to see your result</p>
          </div>
        )}

        {/* QUESTIONS */}
        {typeof step === "number" && (
          <div className="cla-q">
            <div className="cla-qcount">Question {step + 1} of {QUESTIONS.length}</div>
            <div className="cla-qtext">{QUESTIONS[step].q}</div>
            <div className="cla-opts">
              {QUESTIONS[step].a.map(([label, pts], idx) => (
                <button
                  key={idx}
                  className="cla-opt"
                  onClick={() => answer(step, QUESTIONS[step].leak, pts)}
                >
                  {label}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button className="cla-back" onClick={() => setStep((step as number) - 1)}>
                ← Back
              </button>
            )}
          </div>
        )}

        {/* CAPTURE */}
        {step === "capture" && (
          <form className="cla-form" onSubmit={submitLead}>
            <div className="cla-grid2">
              <input required placeholder="First name" value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
              <input required placeholder="Last name" value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
            </div>
            <input required type="email" placeholder="Email" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <div className="cla-grid2">
              <input placeholder="Role (optional)" value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
              <input placeholder="Company / ministry (optional)" value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
            </div>
            <button className="cla-cta cla-full" type="submit" disabled={submitMutation.isPending}>
              {submitMutation.isPending ? "Preparing your report…" : "See my Leak Report →"}
            </button>
            <button type="button" className="cla-back" onClick={() => setStep(QUESTIONS.length - 1)}>
              ← Back
            </button>
          </form>
        )}

        {/* RESULT */}
        {step === "result" && (
          <div className="cla-result">
            <div className="cla-verdict-label">Your primary leak</div>
            <div className="cla-verdict">
              {route === "call" ? (
                <>Leaks in <b>more than one area</b></>
              ) : (
                <>The <b>{LEAK_NAMES[top[0]]}</b></>
              )}
            </div>
            <p className="cla-verdict-sub">
              {route === "call"
                ? "You're losing capacity in several places at once — which is common, and exactly why a short conversation beats a self-serve fix here."
                : route === "clarity"
                ? "Your biggest leak is in how clearly you're positioned — who you serve and how you say it. That's the first thing to fix."
                : "Your biggest leak is operational — the doing is eating the hours that should go to leading and selling."}
            </p>

            <div className="cla-bars">
              <h3>Your leak breakdown</h3>
              {(["clarity", "pipeline", "ops"] as LeakKey[]).map((k) => (
                <div className="cla-bar" key={k}>
                  <div className="cla-bar-top">
                    <span>{LEAK_NAMES[k]}</span>
                    <span className="cla-lv">{levelLabel(scores[k])}</span>
                  </div>
                  <div className="cla-track">
                    <div
                      className="cla-fill"
                      style={{
                        width: `${pct(scores[k])}%`,
                        background: k === "clarity" ? "var(--gold)" : k === "pipeline" ? "#7FA8D8" : "var(--green)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="cla-rec">
              <span className="cla-flag">Recommended for you</span>
              <h2>{DOORS[route].name}</h2>
              <p>{DOORS[route].desc}</p>
              <Link href={DOORS[route].href} className="cla-cta">{DOORS[route].cta} →</Link>
            </div>

            <div className="cla-peruse">Or explore the other doors</div>
            <div className="cla-others">
              {otherKeys.map((k) => (
                <Link key={k} href={DOORS[k].href} className="cla-door">
                  <span>
                    <span className="cla-dn">{DOORS[k].name}</span>
                    <span className="cla-dd">
                      {k === "clarity" ? "For a clarity leak" : k === "ops" ? "For an operations leak" : "Not sure? Talk it through"}
                    </span>
                  </span>
                  <span className="cla-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <footer className="cla-footer">
          <div className="cla-foot-name">Kingdom Solutions <b>AI™</b></div>
          <div className="cla-foot-tag">Clarity · Alignment · Leverage · Legacy</div>
        </footer>
      </div>
    </div>
  );
}

const claStyles = `
.cla-root{
  --ink:#0E1522;--ink-2:#16213A;--ink-3:#1E2C49;
  --gold:#C9A24B;--gold-soft:#E4C878;--green:#37C08A;
  --cream:#F3EEE3;--dim:#AFB3BE;--line:rgba(201,162,75,0.26);
  --serif:Georgia,'Times New Roman',serif;--mono:'IBM Plex Mono',ui-monospace,monospace;--sans:'Inter',system-ui,sans-serif;
  background:radial-gradient(1100px 560px at 80% -10%,rgba(201,162,75,0.09),transparent 60%),radial-gradient(800px 500px at 6% 110%,rgba(55,192,138,0.05),transparent 60%),var(--ink);
  color:var(--cream);font-family:var(--sans);line-height:1.55;min-height:100vh;padding:0 20px;
}
.cla-wrap{max-width:680px;margin:0 auto;padding:56px 0 80px}
.cla-crest{width:140px;height:140px;display:block;margin:0 auto 10px;border-radius:50%;background:#fff;object-fit:cover;box-shadow:0 4px 18px rgba(0,0,0,.35);border:1px solid rgba(201,162,75,.5)}
.cla-wordmark{font-family:var(--serif);font-size:1.35rem;letter-spacing:.02em;color:var(--cream);text-align:center;margin-bottom:14px}
.cla-wordmark b{color:var(--gold);font-weight:400}
.cla-eyebrow{font-family:var(--mono);font-size:16px;letter-spacing:.26em;text-transform:uppercase;color:var(--gold);text-align:center;margin-bottom:16px}
.cla-h1{font-family:var(--serif);font-weight:400;font-size:clamp(1.9rem,5vw,2.7rem);line-height:1.14;text-align:center;margin:0 0 14px}
.cla-lede{color:var(--dim);text-align:center;max-width:520px;margin:0 auto 30px;font-size:1.02rem}
.cla-prog{height:3px;background:rgba(201,162,75,0.15);border-radius:3px;margin-bottom:34px;overflow:hidden}
.cla-prog span{display:block;height:100%;background:var(--gold);transition:width .4s ease}
.cla-center{text-align:center}
.cla-fine{font-family:var(--mono);font-size:11px;letter-spacing:.06em;color:var(--dim);margin-top:16px}
.cla-cta{display:inline-flex;align-items:center;gap:9px;font-family:var(--mono);font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink);font-weight:600;background:var(--gold);padding:13px 24px;border-radius:8px;text-decoration:none;border:none;cursor:pointer;transition:transform .2s,background .2s}
.cla-cta:hover{background:var(--gold-soft);transform:translateY(-1px)}
.cla-cta:disabled{opacity:.6;cursor:default;transform:none}
.cla-cta.cla-full{width:100%;justify-content:center;margin-top:6px}
.cla-q{animation:cla-fade .35s ease}
@keyframes cla-fade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.cla-qcount{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);margin-bottom:10px}
.cla-qtext{font-family:var(--serif);font-size:clamp(1.35rem,3.6vw,1.7rem);line-height:1.25;margin-bottom:22px}
.cla-opts{display:flex;flex-direction:column;gap:11px}
.cla-opt{text-align:left;background:var(--ink-2);border:1px solid var(--line);border-radius:12px;padding:16px 18px;color:var(--cream);font-family:var(--sans);font-size:1rem;cursor:pointer;transition:border-color .2s,background .2s,transform .15s}
.cla-opt:hover{border-color:var(--gold);background:var(--ink-3);transform:translateY(-1px)}
.cla-back{margin-top:22px;background:none;border:none;color:var(--dim);font-family:var(--mono);font-size:12px;letter-spacing:.06em;cursor:pointer;text-transform:uppercase}
.cla-back:hover{color:var(--gold)}
.cla-form{display:flex;flex-direction:column;gap:12px;animation:cla-fade .35s ease}
.cla-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:520px){.cla-grid2{grid-template-columns:1fr}}
.cla-form input{background:var(--ink-2);border:1px solid var(--line);border-radius:10px;padding:14px 16px;color:var(--cream);font-family:var(--sans);font-size:1rem}
.cla-form input:focus{outline:2px solid var(--green);outline-offset:1px;border-color:var(--gold)}
.cla-form input::placeholder{color:var(--dim)}
.cla-result{animation:cla-fade .45s ease}
.cla-verdict-label{font-family:var(--mono);font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--dim);text-align:center;margin-bottom:12px}
.cla-verdict{font-family:var(--serif);font-size:clamp(1.6rem,4.5vw,2.2rem);text-align:center;line-height:1.2;margin-bottom:8px}
.cla-verdict b{color:var(--gold-soft);font-weight:400}
.cla-verdict-sub{text-align:center;color:var(--dim);max-width:500px;margin:0 auto 30px}
.cla-bars{background:var(--ink-2);border:1px solid var(--line);border-radius:14px;padding:22px 22px 8px;margin-bottom:30px}
.cla-bars h3{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--dim);margin-bottom:16px}
.cla-bar{margin-bottom:16px}
.cla-bar-top{display:flex;justify-content:space-between;font-size:.9rem;margin-bottom:6px}
.cla-bar-top .cla-lv{font-family:var(--mono);font-size:11px;letter-spacing:.06em;color:var(--dim)}
.cla-track{height:8px;background:rgba(255,255,255,0.06);border-radius:5px;overflow:hidden}
.cla-fill{height:100%;border-radius:5px;transition:width .8s cubic-bezier(.2,.8,.2,1)}
.cla-rec{border:1px solid rgba(201,162,75,0.5);background:linear-gradient(180deg,rgba(201,162,75,0.10),transparent);border-radius:16px;padding:26px 24px;margin-bottom:16px;position:relative}
.cla-flag{position:absolute;top:-11px;left:22px;font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink);background:var(--gold);padding:4px 10px;border-radius:6px}
.cla-rec h2{font-family:var(--serif);font-weight:400;font-size:1.6rem;margin:6px 0 8px}
.cla-rec p{color:var(--dim);font-size:.98rem;margin-bottom:18px}
.cla-peruse{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);text-align:center;margin:26px 0 14px}
.cla-others{display:flex;flex-direction:column;gap:11px}
.cla-door{display:flex;justify-content:space-between;align-items:center;gap:14px;background:var(--ink-2);border:1px solid var(--line);border-radius:12px;padding:16px 18px;text-decoration:none;color:var(--cream);transition:border-color .2s,background .2s}
.cla-door:hover{border-color:var(--gold);background:var(--ink-3)}
.cla-dn{font-family:var(--serif);font-size:1.1rem;display:block}
.cla-dd{font-size:.85rem;color:var(--dim);margin-top:2px;display:block}
.cla-arrow{color:var(--gold);font-family:var(--mono);flex-shrink:0}
.cla-footer{text-align:center;padding:44px 0 8px;margin-top:36px;border-top:1px solid var(--line)}
.cla-foot-name{font-family:var(--serif);font-size:1.1rem;letter-spacing:.02em;color:var(--cream);margin-bottom:6px}
.cla-foot-name b{color:var(--gold);font-weight:400}
.cla-foot-tag{font-family:var(--mono);font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--dim)}
`;
