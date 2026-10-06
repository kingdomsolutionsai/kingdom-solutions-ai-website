import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Link } from "wouter";

export default function Terms() {
  usePageMeta({
    title: "Terms of Service | Kingdom Solutions AI™",
    description: "Terms of Service for Kingdom Solutions AI™ products, programs, and advisory services, including Clarity Pro™, the 30-Day Business Fast Track™, Victor's Circle Leadership Academy™, Constance™, and Executive AI Strategy.",
    canonicalUrl: "https://kingdomsolutionsai.com/terms",
    ogImage: "https://kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
  });
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-cream">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="editorial-label mb-6">Legal</p>
            <h1 className="font-display text-4xl sm:text-5xl font-medium text-charcoal leading-[1.1] mb-6">
              Terms of Service
            </h1>
            <div className="w-12 h-px bg-gold/50 mb-10" />
            <p className="font-body text-sm text-charcoal-light mb-12">
              Last Updated: October 6, 2026
            </p>

            <div className="space-y-10 font-body text-base text-charcoal-light leading-relaxed">
              <p>
                Welcome to Kingdom Solutions AI™. These Terms of Service govern your use of the Kingdom Solutions AI™ website, forms, digital products, AI-supported systems, strategy services, and related offers, including Clarity Pro™, the 30-Day Business Fast Track™, Victor's Circle Leadership Academy™, Constance™ AI Chief of Staff, Capacity Leak Audit™, Executive AI Strategy, and our digital products.
              </p>
              <p>
                By accessing this website, submitting a form, purchasing a product, booking a strategy call, or using any Kingdom Solutions AI™ service, you agree to these Terms.
              </p>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">1. About Kingdom Solutions AI™</h2>
                <p>
                  Kingdom Solutions AI™ provides AI-supported strategy, clarity systems, capacity diagnostics, content direction, operational support planning, guided business programs, leadership programs, digital products, and advisory services for coaches, founders, consultants, executives, and high-capacity leaders.
                </p>
                <p className="mt-4">
                  Our services are designed to help clients clarify their business, protect capacity, improve operational visibility, and develop strategic AI-supported systems.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">2. No Guarantee of Results</h2>
                <p>
                  Kingdom Solutions AI™ provides strategic guidance, AI-supported tools, content direction, operational recommendations, and advisory support. We do not guarantee specific business results, revenue outcomes, audience growth, client acquisition, productivity gains, or financial performance.
                </p>
                <p className="mt-4">
                  Your results depend on many factors, including your implementation, offer, market, audience, consistency, business model, tools, and decision-making.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">3. AI-Assisted Services</h2>
                <p>
                  Some Kingdom Solutions AI™ services use artificial intelligence to support strategy, messaging, content development, workflow planning, and operational clarity.
                </p>
                <p className="mt-4">
                  AI-generated or AI-assisted outputs are intended for review, refinement, and human judgment. You are responsible for reviewing, editing, approving, and deciding how to use any output provided through our systems or services.
                </p>
                <p className="mt-4">
                  Kingdom Solutions AI™ does not guarantee that AI-assisted outputs will be error-free, complete, compliant with your industry requirements, or appropriate for every use case.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">4. Not Legal, Financial, Medical, or Clinical Advice</h2>
                <p>
                  Kingdom Solutions AI™ does not provide legal, financial, tax, medical, mental health, therapeutic, or clinical advice.
                </p>
                <p className="mt-4">
                  Any business strategy, AI implementation guidance, content direction, or operational recommendation is provided for general business and educational purposes. You should consult qualified professionals for legal, financial, tax, medical, or regulated industry matters.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">5. Client Responsibilities</h2>
                <p className="mb-4">By using Kingdom Solutions AI™ services, you agree to:</p>
                <ul className="list-disc list-outside pl-5 space-y-2">
                  <li>Provide accurate information when submitting forms, booking calls, or completing intake materials.</li>
                  <li>Use your own judgment before implementing any strategy, content, workflow, or AI-supported recommendation.</li>
                  <li>Avoid submitting passwords, payment details, confidential client records, medical records, legal files, or unnecessary sensitive information.</li>
                  <li>Ensure that anything you publish, send, automate, or implement complies with your own business policies, industry requirements, and applicable laws.</li>
                  <li>Maintain appropriate access controls for your own systems, tools, documents, and accounts.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">6. Data Boundaries</h2>
                <p>
                  Kingdom Solutions AI™ services are designed for business strategy, positioning, messaging, content direction, operational clarity, and AI-supported workflow planning.
                </p>
                <p className="mt-4">
                  You should not submit sensitive personal data, protected health information, confidential legal records, private client case files, passwords, payment card details, or unnecessary third-party confidential information through our forms, tools, or intake materials.
                </p>
                <p className="mt-4">
                  If a service requires access to business tools such as email, calendar, CRM, task systems, or other platforms, the scope, permissions, and boundaries should be clearly agreed upon before implementation begins.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">7. Payments</h2>
                <p>
                  Payments are processed through Stripe or another secure payment provider. Self-serve offers such as Clarity Pro™ and digital products may be purchased directly at checkout.
                </p>
                <p className="mt-4">
                  Programs such as the 30-Day Business Fast Track™ and Victor's Circle Leadership Academy™ begin with a conversation to confirm fit. Payment is completed through a private payment link shared after that conversation. Higher-touch offers such as Constance™ AI Chief of Staff and Executive AI Strategy require a strategy call and a proposal, agreement, or invoice before work begins.
                </p>
                <p className="mt-4">
                  <strong className="text-charcoal">Payment plans.</strong> Where a program is offered in more than one payment, choosing a payment plan is a commitment to pay the full program price. You authorize the payment provider to save your payment method and charge each remaining payment automatically on the dates shown at enrollment. If a payment fails, it may be retried, and sessions, support, and access may be paused until it is completed. The remaining balance stays due even if you stop participating.
                </p>
                <p className="mt-4">
                  <strong className="text-charcoal">Pay-over-time providers.</strong> If you choose a pay-over-time option such as Klarna or Affirm at checkout, your repayment agreement is with that provider. Kingdom Solutions AI™ is paid in full at the time of purchase, and your purchase is governed by these Terms and our Refund Policy in the same way as any other payment.
                </p>
                <p className="mt-4">
                  <strong className="text-charcoal">Disputes.</strong> If you have a concern about a charge, please contact us before filing a dispute with your bank or card provider. If a chargeback is filed for a purchase that is non-refundable under our Refund Policy, access to programs, sessions, and digital materials may be suspended while it is reviewed, and we may provide records of your purchase and delivery to the payment provider.
                </p>
                <p className="mt-4">
                  You agree to provide accurate billing information and authorize the applicable payment provider to process your payment.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">8. Refunds</h2>
                <p>
                  Services that have been provided are not refundable, and digital downloads and digital access are not refundable once delivered. The full terms for each offer, including payment plans and the limited exceptions for billing errors, are set out in our{" "}
                  <Link href="/refund-policy" className="text-gold hover:text-gold-light transition-colors duration-200">
                    Refund Policy
                  </Link>
                  , which forms part of these Terms. Please review it before purchasing.
                </p>
                <p className="mt-4">
                  Where a written proposal or service agreement for a specific engagement includes different terms, that agreement governs for that engagement.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">9. Scheduling and Missed Sessions</h2>
                <p>
                  Some offers may include strategy calls, review sessions, or advisory sessions. If you need to reschedule, please provide at least 24 hours' notice when possible.
                </p>
                <p className="mt-4">
                  Missed sessions without notice may be considered fulfilled. Repeated cancellations or missed appointments may affect access to future support.
                </p>
                <p className="mt-4">
                  Sessions included in a program are held during the program dates. Sessions not used during the program period do not carry forward.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">10. Intellectual Property</h2>
                <p>
                  The Kingdom Solutions AI™ name, Clarity Pro™, Constance™, Capacity Leak Audit™, Capacity Reset™, 30-Day Business Fast Track™, Right-Order Method™, Victor's Circle Leadership Academy™, Entrepreneur Next Step™ Assessment, website copy, frameworks, systems, prompts, strategy materials, visuals, and related content are owned by Kingdom Solutions AI™ unless otherwise stated.
                </p>
                <p className="mt-4">
                  You may not copy, resell, redistribute, reproduce, or package Kingdom Solutions AI™ materials, prompts, frameworks, systems, or content as your own product or service without written permission.
                </p>
                <p className="mt-4">
                  Where a product or service includes digital access, such as a GPT link, download link, login credential, access code, toolkit, or onboarding material, that access is licensed to the purchasing individual or business only and may not be shared, forwarded, or made available to any other person or entity. Sharing access, or allowing more than one individual to use a single purchased credential, is a material breach of these Terms, voids refund eligibility under our Refund Policy, and may result in immediate suspension or termination of access without refund.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">11. Client-Created Content</h2>
                <p>
                  You retain responsibility for the content, ideas, business information, and materials you submit or create using Kingdom Solutions AI™ services.
                </p>
                <p className="mt-4">
                  For Clarity Pro™, the 30-Day Business Fast Track™, and similar offers, you may use your resulting business language, content drafts, offer language, and messaging in your own business. You may not resell or redistribute the underlying Kingdom Solutions AI™ system, prompts, process, or proprietary materials.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">12. Third-Party Tools</h2>
                <p>
                  Kingdom Solutions AI™ may use or recommend third-party tools such as Stripe, Klarna, Affirm, Calendly, Zoom, Brevo, OpenAI, Notion, CRM systems, email platforms, calendar tools, automation platforms, or other services.
                </p>
                <p className="mt-4">
                  Your use of third-party platforms may be governed by their own terms, privacy policies, pricing, and data practices. Kingdom Solutions AI™ is not responsible for outages, policy changes, data handling, billing issues, or service limitations caused by third-party providers.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">13. Website Forms and Communication</h2>
                <p>
                  When you submit a form on the Kingdom Solutions AI™ website, you agree that we may contact you using the information you provided.
                </p>
                <p className="mt-4">
                  Form submissions may be used to respond to inquiries, process intake information, deliver next steps, or evaluate fit for a service. You are responsible for ensuring the information you submit is accurate and appropriate to share.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">14. Acceptable Use</h2>
                <p className="mb-4">You agree not to use Kingdom Solutions AI™ services, forms, systems, or materials to:</p>
                <ul className="list-disc list-outside pl-5 space-y-2">
                  <li>Submit unlawful, harmful, abusive, deceptive, or misleading content.</li>
                  <li>Violate another person's privacy, intellectual property, or contractual rights.</li>
                  <li>Upload or share passwords, payment data, protected health information, confidential legal files, or unnecessary sensitive information.</li>
                  <li>Attempt to reverse engineer, copy, resell, or misuse Kingdom Solutions AI™ systems or materials.</li>
                  <li>Use AI-supported outputs to deceive, impersonate, defame, spam, or mislead others.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">15. Service Changes</h2>
                <p>
                  Kingdom Solutions AI™ may update, modify, pause, or discontinue portions of the website, services, offers, pricing, or systems at any time.
                </p>
                <p className="mt-4">
                  If you have already purchased a specific offer, we will make reasonable efforts to honor the scope of that purchase or provide an appropriate alternative if changes are necessary.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">16. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Kingdom Solutions AI™ is not liable for indirect, incidental, consequential, special, punitive, or lost-profit damages arising from your use of the website, services, AI-assisted outputs, third-party tools, or business decisions made based on our materials or recommendations.
                </p>
                <p className="mt-4">
                  Your use of Kingdom Solutions AI™ services is at your own discretion and responsibility.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">17. No Warranties</h2>
                <p>
                  Kingdom Solutions AI™ services are provided on an "as available" and "as provided" basis. We make no warranty that the website, services, forms, third-party integrations, AI outputs, or digital materials will be uninterrupted, error-free, fully secure, or suitable for every specific business need.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">18. Privacy</h2>
                <p>
                  Your use of the website and services is also governed by our Privacy Policy & Data Boundaries page, which explains how we approach form submissions, data boundaries, third-party tools, and responsible AI use.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">19. Changes to These Terms</h2>
                <p>
                  Kingdom Solutions AI™ may update these Terms of Service from time to time. The updated version will be posted on this page with a revised "Last Updated" date.
                </p>
                <p className="mt-4">
                  Continued use of the website or services after changes are posted means you accept the updated Terms.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-medium text-charcoal mb-4">20. Contact</h2>
                <p className="mb-4">
                  For questions about these Terms, purchases, billing, or service access, contact:
                </p>
                <p className="mb-2">
                  <a href="mailto:tabitha@kingdomsolutionsai.com" className="text-gold hover:text-gold-light transition-colors duration-200 font-medium">
                    tabitha@kingdomsolutionsai.com
                  </a>
                </p>
                <p className="text-charcoal font-medium">
                  Kingdom Solutions AI™
                </p>
                <p>
                  <a href="https://kingdomsolutionsai.com" className="text-gold hover:text-gold-light transition-colors duration-200">
                    kingdomsolutionsai.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
