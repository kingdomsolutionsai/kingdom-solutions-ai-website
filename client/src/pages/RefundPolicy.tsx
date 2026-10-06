import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";
import type { ReactNode } from "react";

const EMAIL = "tabitha@kingdomsolutionsai.com";
const EFFECTIVE_DATE = "October 6, 2026";

function Email() {
  return (
    <a href={`mailto:${EMAIL}`} className="text-gold hover:text-gold-light transition-colors duration-200">
      {EMAIL}
    </a>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-medium text-charcoal mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function RefundPolicy() {
  usePageMeta({
    title: "Refund Policy | Kingdom Solutions AI™",
    description:
      "Refund policy for all Kingdom Solutions AI™ offers: digital downloads, Clarity Pro™, the 30-Day Business Fast Track™, Victor's Circle Leadership Academy™, Constance™, and Executive AI Strategy. Services provided and digital downloads are non-refundable.",
    canonicalUrl: "https://kingdomsolutionsai.com/refund-policy",
    ogImage: "https://kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
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
            <p className="font-body text-sm text-charcoal-light/80 mb-6">Effective {EFFECTIVE_DATE}</p>
            <div className="w-12 h-px bg-gold/50 mb-10" />

            <div className="space-y-10 font-body text-base text-charcoal-light leading-relaxed">
              <p>
                At Kingdom Solutions AI™, we want every client to make a thoughtful and confident decision before
                purchasing. Most of our paid offers begin with a conversation for exactly that reason. Because our
                work is delivered as digital materials, scheduled time, and personal strategic guidance, this policy
                is simple:
              </p>

              <div className="border-l-2 border-gold/60 pl-6 space-y-2">
                <p className="text-charcoal">
                  <strong>Services that have been provided are not refundable.</strong>
                </p>
                <p className="text-charcoal">
                  <strong>Digital downloads and digital access are not refundable once delivered.</strong>
                </p>
              </div>

              <p>
                Please ask any questions you have before you purchase by emailing <Email />. This policy applies to
                every offer listed below and to any new offer unless its written agreement states otherwise.
              </p>

              <Section title="Definitions">
                <p>
                  <strong className="text-charcoal">Delivered</strong> means the moment your download link, access
                  link, GPT link, login credentials, toolkit, or onboarding materials are sent to the email address
                  you provided at checkout. Delivery is determined by the time that email or message was sent, not by
                  whether you have opened, downloaded, logged in to, or used the materials.
                </p>
                <p>
                  <strong className="text-charcoal">Provided</strong> means that a session has taken place, a
                  scheduled session time has passed without at least 24 hours' notice, a program's kickoff has
                  occurred, or written strategy, reviews, or other deliverables have been sent to you.
                </p>
              </Section>

              <Section title="Digital Products and Downloads">
                <p>
                  This includes digital books, workbooks, worksheets, templates, appendix tools, guides, GPTs, recorded
                  content, and any product sold through our website or online store.
                </p>
                <p>
                  Digital products are non-refundable once delivered, because they cannot be returned once accessed.
                  If a file will not open or a link does not work, contact us and we will replace it promptly.
                </p>
              </Section>

              <Section title="Clarity Pro™">
                <p>
                  Clarity Pro™ is a private 1:1 session with written strategy delivered afterward. Once your session
                  has been provided, the purchase is non-refundable.
                </p>
                <p>
                  Payments are not refunded before the session takes place. If you need a different time, you may
                  reschedule with at least 24 hours' notice, and your session must be used within 90 days of
                  purchase.
                </p>
              </Section>

              <Section title="30-Day Business Fast Track™">
                <p>
                  Enrollment in the 30-Day Business Fast Track™ follows a Business Fast Track Strategy Call, so you
                  can confirm the program is right for you before paying. Payment secures one of a limited number of
                  seats, which we hold for you and cannot offer to anyone else.
                </p>
                <Bullets
                  items={[
                    "Fast Track payments are non-refundable once your enrollment is confirmed and your onboarding materials, toolkit, or Clarity Pro™ access have been delivered, or once the program kickoff has occurred, whichever comes first.",
                    "Sessions are held during the program dates. Sessions not used during the program, including those missed without 24 hours' notice, are considered provided and do not carry forward.",
                    "Stepping back from the program, missing sessions, or not completing the work does not create a refund or a credit.",
                  ]}
                />
                <p>
                  <strong className="text-charcoal">The Right Order Promise.</strong> If you complete the week-one
                  work and do not leave week one with a clear priority and plan, you will receive a private
                  realignment session at no additional cost. The Right Order Promise is a service commitment, not a
                  refund or money-back guarantee.
                </p>
              </Section>

              <Section title="Victor's Circle Leadership Academy™">
                <p>
                  Victor's Circle Leadership Academy™ is a 90-day cohort program. Payments are non-refundable once
                  your enrollment is confirmed and program materials have been delivered, or once the cohort has
                  begun, whichever comes first. Sessions and materials not used during the program period do not
                  carry forward and do not create a refund or credit.
                </p>
              </Section>

              <Section title="Constance™ AI Chief of Staff and Executive AI Strategy">
                <p>
                  Constance™ and Executive AI Strategy are consultative offers that begin with a Strategy Call. Scope,
                  pricing, and payment schedule are set out in your proposal, invoice, or service agreement before
                  work begins.
                </p>
                <Bullets
                  items={[
                    "Work that has been provided, including strategy, configuration, setup, and implementation time, is non-refundable.",
                    "If your service is billed on a recurring basis, you may cancel at any time. Cancellation takes effect at the end of the current billing period, and partial periods are not refunded.",
                    "Where a written agreement includes different terms, the agreement governs.",
                  ]}
                />
              </Section>

              <Section title="Payment Plans">
                <p>
                  Some programs may be offered in more than one payment. Choosing a payment plan is a commitment to
                  pay the full program price, not a month-to-month or session-by-session arrangement.
                </p>
                <Bullets
                  items={[
                    "Your card is saved securely at checkout and each remaining payment is charged automatically on the date shown at enrollment.",
                    "If a payment fails, our payment provider will retry it and notify you. Sessions, support, and access may be paused until the payment is completed.",
                    "The remaining balance stays due even if you stop participating in the program.",
                    "Payment plan payments are non-refundable on the same terms as paying in full.",
                  ]}
                />
              </Section>

              <Section title="Pay-Over-Time Providers (such as Klarna or Affirm)">
                <p>
                  If you choose a pay-over-time option at checkout, your repayment agreement is between you and that
                  provider, and Kingdom Solutions AI™ is paid in full at the time of purchase. Your purchase is
                  covered by this policy in the same way as any other payment. Questions about your repayment
                  schedule should be directed to the provider.
                </p>
              </Section>

              <Section title="Scheduling, Rescheduling, and Missed Sessions">
                <p>
                  If your offer includes a scheduled session, please give at least 24 hours' notice if you need to
                  reschedule. Sessions missed without notice are considered provided. Repeated cancellations or
                  missed sessions may affect access to future support.
                </p>
              </Section>

              <Section title="When We Will Issue a Refund">
                <p>The only exceptions to this policy are:</p>
                <Bullets
                  items={[
                    "Duplicate charges or billing errors, which will be refunded in full.",
                    "If Kingdom Solutions AI™ cancels a program or session and cannot offer a reasonable alternative date, you will receive a refund for the portion that has not been provided.",
                  ]}
                />
                <p>Approved refunds are returned to the original payment method.</p>
              </Section>

              <Section title="Disputes and Chargebacks">
                <p>
                  If you have a concern about a charge, please contact us at <Email /> first. Most questions can be
                  resolved quickly and directly. If a chargeback or payment dispute is filed for a purchase that is
                  non-refundable under this policy, access to programs, sessions, and digital materials may be
                  suspended while it is reviewed, and we will provide our records of purchase and delivery to the
                  payment provider.
                </p>
              </Section>

              <Section title="Unauthorized Sharing, Copying, or Resale">
                <p>
                  Access to our programs, digital products, materials, prompts, frameworks, and AI tools is licensed
                  to the purchasing individual or business only, as set out in our{" "}
                  <Link href="/terms" className="text-gold hover:text-gold-light transition-colors duration-200">
                    Terms of Service
                  </Link>
                  . Sharing, copying, reselling, or otherwise redistributing access without authorization is a
                  violation of those Terms and may result in access being revoked without refund.
                </p>
              </Section>

              <Section title="Free Resources">
                <p>
                  Free resources, including the Capacity Leak Audit™, the Founder's Handbook, the Entrepreneur Next
                  Step™ Assessment, and our webinars, involve no payment and are not covered by this policy.
                </p>
              </Section>

              <div className="pt-6 border-t border-taupe/40">
                <p className="text-sm text-charcoal-light/80">
                  Kingdom Solutions AI™ may update this policy from time to time. The version in effect on the date of
                  your purchase applies to that purchase.
                </p>
              </div>

              {/* Billing Questions Section */}
              <div className="mt-16 pt-12 border-t border-taupe/40">
                <h2 className="font-display text-2xl font-medium text-charcoal mb-5">Billing Questions</h2>
                <p className="mb-8">
                  If you have a question about a purchase, a payment plan, or a billing issue, please contact Kingdom
                  Solutions AI™ using the Contact page or email <Email />.
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
