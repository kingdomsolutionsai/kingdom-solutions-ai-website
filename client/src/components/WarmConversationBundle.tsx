import { useEffect, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";

// Payhip's script initializes on window load. Bind the newly mounted button
// again when a visitor returns to the home page through client-side navigation.
type PayhipWindow = Window & {
  Payhip?: {
    Setup: () => void;
    Button: { initiateBuyButtons: () => void };
  };
  PayhipSetupFinished?: boolean;
};

export default function WarmConversationBundle() {
  const buyButton = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const initialize = () => {
      const payhipWindow = window as PayhipWindow;
      if (!payhipWindow.Payhip) return;
      if (!payhipWindow.PayhipSetupFinished) {
        payhipWindow.Payhip.Setup();
      } else if (buyButton.current?.dataset.initiated !== "true") {
        payhipWindow.Payhip.Button.initiateBuyButtons();
      }
    };

    if (document.readyState === "complete") initialize();
    else window.addEventListener("load", initialize, { once: true });
    return () => window.removeEventListener("load", initialize);
  }, []);

  return (
    <section aria-labelledby="warm-conversation-title" className="py-24 lg:py-32 bg-cream-dark/40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <img
              src="/assets/warm-conversation-bundle.webp"
              alt="The Warm Conversation Method™ Bundle by Tabitha Rector: digital playbook, fillable workbook, and simple CRM tracker"
              width={1254}
              height={1254}
              loading="lazy"
              className="w-full max-w-[520px] mx-auto border border-gold/20"
            />
          </div>
          <div className="lg:col-span-7">
            <p className="editorial-label mb-5">From the Resource Shop</p>
            <h2 id="warm-conversation-title" className="font-display text-3xl sm:text-4xl lg:text-[2.5rem] font-medium text-charcoal leading-[1.15] mb-6">
              The Complete Warm Conversation Method™ Bundle
            </h2>
            <p className="font-body text-lg text-charcoal-light leading-relaxed mb-6">
              Build meaningful relationships and start thoughtful conversations on LinkedIn. Put what you learn into practice over 30 days, at your own pace.
            </p>
            <ul className="space-y-3 mb-8 font-body text-sm text-charcoal-light">
              {[
                "The Warm Conversation Method™ Digital Playbook (PDF)",
                "30-Day Fillable Workbook (PDF)",
                "Relationship Toolkit — Simple CRM Tracker (Excel)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={17} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-6">
              <p className="font-display text-4xl text-charcoal">$47 <span className="font-body text-xs tracking-[0.08em]">USD</span></p>
              <p className="font-body text-sm text-charcoal-light">$54 purchased separately · Save $7</p>
            </div>
            <a
              ref={buyButton}
              href="https://payhip.com/b/cTDH9"
              className="payhip-buy-button bg-charcoal text-cream-dark font-body text-[0.78rem] font-medium tracking-[0.08em] uppercase px-8 py-4 inline-flex items-center gap-3 transition-colors duration-300 hover:bg-charcoal/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              data-theme="none"
              data-product="cTDH9"
            >
              Get the Bundle — $47 <ArrowRight size={15} aria-hidden="true" />
            </a>
            <p className="font-body text-xs text-charcoal-light leading-relaxed mt-4 mb-6">
              Instant digital downloads. Two PDFs and one Excel file. No physical products are shipped.
            </p>
            <a href="https://payhip.com/KingdomSolutionsAIResourceShop" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-charcoal/70 hover:text-gold inline-flex items-center gap-2 underline underline-offset-4">
              Browse the Resource Shop <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
