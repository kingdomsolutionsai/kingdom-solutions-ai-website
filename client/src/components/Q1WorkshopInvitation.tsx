import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Video } from "lucide-react";
import "@/styles/q1-workshop.css";

export const Q1_WORKSHOP_URL = "https://payhip.com/b/Nrvy5";
export const Q1_WORKSHOP_START = Date.parse("2026-12-08T18:00:00Z");

export function q1WorkshopIsOpen(now = Date.now()) {
  return now < Q1_WORKSHOP_START;
}

export default function Q1WorkshopInvitation({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(() => q1WorkshopIsOpen());
  useEffect(() => {
    const timer = window.setInterval(() => setOpen(q1WorkshopIsOpen()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  if (!open) return null;

  return (
    <section id={compact ? "q1-workshop-fast-track" : "q1-workshop"} className={"q1-workshop" + (compact ? " q1-workshop--compact" : "")} aria-labelledby={compact ? "q1-fast-track-title" : "q1-home-title"}>
      <div className="q1-workshop__inner">
        {!compact && (
          <div className="q1-workshop__art" aria-hidden="true">
            <img src="/assets/ksai-logo-transparent-400_82fa1f46.png" alt="" width="108" height="108" />
            <div className="q1-workshop__brand">Kingdom Solutions<br/><small>Business &amp; AI™</small></div>
            <div className="q1-workshop__name">Q1 READY</div>
            <div className="q1-workshop__ribbon">The Business Fast Track Workshop</div>
            <div className="q1-workshop__tagline">Find Your Gap. Build What’s Next.</div>
            <div className="q1-workshop__art-date">December 8, 2026<br/><small>1 PM Eastern · Live on Zoom</small></div>
            <div className="q1-workshop__host">With Tabitha Rector</div>
          </div>
        )}
        <div className="q1-workshop__copy">
          <div className="q1-workshop__label">Live, interactive workshop</div>
          <h2 id={compact ? "q1-fast-track-title" : "q1-home-title"}>{compact ? "Not quite ready for the full Fast Track?" : "Is Your Business Ready for Q1 2027?"}</h2>
          <p>{compact ? "Start with Q1 Ready: The Business Fast Track Workshop. Together, we’ll identify the business gap that deserves your attention first and choose a practical next step." : "Your experience has value. But knowing what to build next can make all the difference. Join me for Q1 Ready: The Business Fast Track Workshop, where we’ll work together to identify your most important business gap and determine your next practical step."}</p>
          {!compact && <p className="q1-workshop__expertise">With more than 30 years in business, banking, sales and leadership, I understand both the business and the people responsible for making it work. You don’t have to figure everything out alone.</p>}
          <div className="q1-workshop__details">
            <span><CalendarDays size={18} aria-hidden="true"/> Tuesday, December 8, 2026</span>
            <span><Video size={18} aria-hidden="true"/> 1–2 PM Eastern · Live on Zoom</span>
          </div>
          <a className="q1-workshop__button" href={Q1_WORKSHOP_URL}>Reserve My Seat <ArrowRight size={17} aria-hidden="true"/></a>
          <p className="q1-workshop__note">Workshop details and secure registration through Payhip.</p>
        </div>
      </div>
    </section>
  );
}
