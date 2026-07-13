import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function RefundPolicy() {
  usePageMeta({
    title: "Refund Policy — Kingdom Solutions AI™",
    description: "Refund policy for Kingdom Solutions AI™ products including Clarity Pro™ Starter, Guided, and Buildout tiers. Clear terms for digital access, strategy sessions, and consultative services.",
    canonicalUrl: "https://kingdomsolutionsai.com/refund-policy",
    ogImage: "https://kingdomsolutionsai.com/manus-storage/ksai-logo-transparent-400_82fa1f46.png",
  });
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-cream">
        <div className="container">
          <div className="max-w-3xl mx-auto fade-up">
            <p className="editorial-label mb-6">Legal</p>
            <h1 className="font-display text-4xl sm:text-5xl font-medium text-charcoal leading-[1.1] mb-6">
              Refund Policy
            </h1>
            <div className="w-12 h-px bg-gold/50 mb-10" />

            <div className="space-y-10 font-body text-base text-charcoal-light leading-relaxed">
              <p>
                At Kingdom Solutions AI™, we want every client to make a thoughtful and confident purchase. Because Clarity Pro™ includes digital access, AI-guided strategy prompts, intake review, and/or scheduled strategy support depending on the tier purchased, refund eligibility depends on the offer selected.
              </p>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">Clarity Pro™ Starter</h2>
                <p className="mb-4">
                  Clarity Pro™ Starter is a self-guided digital clarity and content creation experience. Because access and materials are delivered digitally, Starter purchases are generally non-refundable once access instructions or onboarding materials have been delivered.
                </p>
                <p>
                  If you believe you purchased in error, please contact us within 24 hours of purchase at{" "}
                  <a href="mailto:tabitha@kingdomsolutionsai.com" className="text-gold hover:text-gold-light transition-colors duration-200">
                    tabitha@kingdomsolutionsai.com
                  </a>.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">Clarity Pro™ Guided</h2>
                <p className="mb-4">
                  Clarity Pro™ Guided includes the self-guided Clarity Pro™ experience plus one 60-minute Clarity Review Session.
                </p>
                <p className="mb-4">
                  If you need to cancel before your review session has been scheduled or delivered, please contact us within 48 hours of purchase. Refund requests will be reviewed on a case-by-case basis.
                </p>
                <p>
                  Once the strategy session has been delivered, the purchase is non-refundable.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">Clarity Pro™ Buildout</h2>
                <p className="mb-4">
                  Clarity Pro™ Buildout is a higher-touch strategic service and is not offered as public self-serve checkout. Payment is handled after fit, scope, and next steps are confirmed.
                </p>
                <p>
                  Because this tier involves custom strategy and implementation support, refund terms will be outlined during the proposal or agreement process.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">Constance™ AI Chief of Staff and Executive AI Strategy</h2>
                <p>
                  Constance™ and Executive AI Strategy are consultative offers that begin with a Strategy Call. These services are not public self-serve checkout offers. Any payment, cancellation, or refund terms will be provided in the proposal, invoice, or service agreement before work begins.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">Missed or Rescheduled Sessions</h2>
                <p>
                  If your offer includes a scheduled session, please provide at least 24 hours' notice if you need to reschedule. Missed sessions without notice may be considered fulfilled.
                </p>
              </div>

              <div className="pt-6 border-t border-taupe/40">
                <p className="text-sm text-charcoal-light/80">
                  Kingdom Solutions AI™ reserves the right to review refund requests individually and to decline refund requests when digital access, strategy review, or service delivery has already begun.
                </p>
              </div>

              {/* Billing Questions Section */}
              <div className="mt-16 pt-12 border-t border-taupe/40">
                <h2 className="font-display text-2xl font-medium text-charcoal mb-5">Billing Questions</h2>
                <p className="mb-8">
                  If you have a question about a purchase, refund request, or billing issue, please contact Kingdom Solutions AI™ using the Contact page or email{" "}
                  <a href="mailto:tabitha@kingdomsolutionsai.com" className="text-gold hover:text-gold-light transition-colors duration-200">
                    tabitha@kingdomsolutionsai.com
                  </a>.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-charcoal text-cream-dark font-body text-[0.78rem] font-medium tracking-[0.08em] uppercase px-8 py-4 transition-all duration-300 hover:bg-charcoal/90 active:scale-[0.97]"
                >
                  Contact Kingdom Solutions AI™
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
