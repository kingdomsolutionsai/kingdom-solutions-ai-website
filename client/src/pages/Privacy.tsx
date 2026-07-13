import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Privacy() {
  usePageMeta({
    title: "Privacy Policy & Data Boundaries — Kingdom Solutions AI™",
    description: "How Kingdom Solutions AI™ protects your data, respects your boundaries, and maintains ethical AI practices. Clear data handling, no selling, no unauthorized sharing.",
    canonicalUrl: "https://kingdomsolutionsai.com/privacy",
    ogImage: "https://kingdomsolutionsai.com/manus-storage/ksai-logo-transparent-400_82fa1f46.png",
  });
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-cream">
        <div className="container">
          <div className="max-w-3xl fade-up">
            <p className="editorial-label mb-6">Legal & Ethics</p>
            <h1 className="font-display text-4xl sm:text-5xl font-medium text-charcoal leading-[1.1] mb-8">
              Privacy Policy & Data Boundaries
            </h1>
            <p className="font-body text-lg text-charcoal-light leading-relaxed">
              Kingdom Solutions AI™ is committed to responsible AI use, data privacy, and clear boundaries in how information is handled across our systems.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-cream-dark">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-12 fade-up">
            {/* Section 1 */}
            <div>
              <h2 className="font-display text-2xl font-medium text-charcoal mb-4">
                Our Commitment
              </h2>
              <div className="space-y-4 font-body text-base text-charcoal-light leading-relaxed">
                <p>
                  We believe that AI should serve leaders — not surveil them. Every system we build is designed with privacy, consent, and ethical boundaries at the foundation.
                </p>
                <p>
                  Kingdom Solutions AI™ does not sell, share, or monetize your personal data. Information you provide through our forms, audits, and consultations is used exclusively to serve you.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="font-display text-2xl font-medium text-charcoal mb-4">
                What We Collect
              </h2>
              <div className="space-y-4 font-body text-base text-charcoal-light leading-relaxed">
                <p>When you interact with Kingdom Solutions AI™, we may collect:</p>
                <div className="space-y-2 pl-6">
                  <p>• Name and email address (provided through forms)</p>
                  <p>• Role and company information (provided voluntarily)</p>
                  <p>• Responses to audit questions and intake forms</p>
                  <p>• Calendar data (only when explicitly pasted by you for audit purposes)</p>
                  <p>• Communication history related to your engagement</p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="font-display text-2xl font-medium text-charcoal mb-4">
                How We Use Your Information
              </h2>
              <div className="space-y-4 font-body text-base text-charcoal-light leading-relaxed">
                <p>Your information is used to:</p>
                <div className="space-y-2 pl-6">
                  <p>• Personalize your audit results and recommendations</p>
                  <p>• Communicate with you about services and next steps</p>
                  <p>• Deliver the systems and support you have engaged</p>
                  <p>• Improve our services and client experience</p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="font-display text-2xl font-medium text-charcoal mb-4">
                Data Boundaries for AI Systems
              </h2>
              <div className="space-y-4 font-body text-base text-charcoal-light leading-relaxed">
                <p>
                  Our AI systems (including the Capacity Leak Audit™, Clarity Pro™, and Constance™) operate within clear boundaries:
                </p>
                <div className="space-y-2 pl-6">
                  <p>• We do not train AI models on your personal data</p>
                  <p>• Your calendar data, business information, and audit responses are not shared with third parties</p>
                  <p>• AI-generated recommendations are based on the information you provide and our proprietary frameworks</p>
                  <p>• You retain ownership of all information you provide</p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="font-display text-2xl font-medium text-charcoal mb-4">
                What You Should Not Enter
              </h2>
              <div className="space-y-4 font-body text-base text-charcoal-light leading-relaxed">
                <p>
                  Our systems are designed for business strategy, operational assessment, and leadership support. Please do not enter:
                </p>
                <div className="space-y-2 pl-6">
                  <p>• Passwords or login credentials</p>
                  <p>• Payment card numbers or banking details</p>
                  <p>• Confidential client files or protected health information</p>
                  <p>• Legal documents or court records</p>
                  <p>• Social security numbers or government IDs</p>
                  <p>• Any information you would not share with a trusted advisor</p>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="font-display text-2xl font-medium text-charcoal mb-4">
                Your Rights
              </h2>
              <div className="space-y-4 font-body text-base text-charcoal-light leading-relaxed">
                <p>You have the right to:</p>
                <div className="space-y-2 pl-6">
                  <p>• Request access to the information we hold about you</p>
                  <p>• Request deletion of your data at any time</p>
                  <p>• Opt out of communications</p>
                  <p>• Ask questions about how your data is used</p>
                </div>
                <p>
                  To exercise any of these rights, contact us at{" "}
                  <a href="mailto:tabitha@kingdomsolutionsai.com" className="text-gold hover:text-gold-dark underline underline-offset-4">
                    tabitha@kingdomsolutionsai.com
                  </a>
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="font-display text-2xl font-medium text-charcoal mb-4">
                Third-Party Services
              </h2>
              <div className="space-y-4 font-body text-base text-charcoal-light leading-relaxed">
                <p>
                  Kingdom Solutions AI™ may use third-party services (such as email delivery, scheduling, and analytics) to operate our business. These services are selected for their privacy practices and are bound by their own privacy policies.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="font-display text-2xl font-medium text-charcoal mb-4">
                Changes to This Policy
              </h2>
              <div className="space-y-4 font-body text-base text-charcoal-light leading-relaxed">
                <p>
                  We may update this policy as our services evolve. Material changes will be communicated through our website or direct correspondence.
                </p>
                <p className="text-sm text-warm-gray mt-6">
                  Last updated: July 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
