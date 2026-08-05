import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  usePageMeta({
    title: "Contact Kingdom Solutions AI™ — Reach Tabitha Rector",
    description: "Contact Kingdom Solutions AI™ for questions about strategic AI systems, Clarity Pro™, Constance™, or Executive AI Strategy. Reach Tabitha Rector directly.",
    canonicalUrl: "https://kingdomsolutionsai.com/contact",
    ogImage: "https://kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
  });
  const revealRef = useScrollReveal();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.forms.submitContact.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <div ref={revealRef}>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-cream">
        <div className="container">
          <div className="max-w-3xl fade-up">
            <p className="editorial-label mb-6">Correspondence</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-charcoal leading-[1.1] mb-8">
              Get in Touch
            </h1>
            <p className="font-body text-lg text-charcoal-light leading-relaxed">
              Whether you have a question about our services, want to explore a partnership, or simply want to connect — we welcome your message.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 lg:py-24 bg-cream-dark">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              {!submitted ? (
                <div className="fade-up">
                  <form onSubmit={handleSubmit} className="bg-card border border-taupe rounded-sm p-8 lg:p-10 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="font-body text-sm font-medium text-charcoal mb-2 block">First Name</label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label className="font-body text-sm font-medium text-charcoal mb-2 block">Last Name</label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-charcoal mb-2 block">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-charcoal mb-2 block">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors"
                      >
                        <option value="">Select a topic...</option>
                        <option value="capacity-audit">Capacity Leak Audit™</option>
                        <option value="clarity-pro">Clarity Pro™</option>
                        <option value="constance">Constance™ AI Chief of Staff</option>
                        <option value="executive-strategy">Executive AI Strategy</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="general">General Question</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-charcoal mb-2 block">Message</label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-3 bg-cream border border-taupe rounded-sm font-body text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors resize-none"
                        placeholder="How can we help?"
                      />
                    </div>
                    <button type="submit" className="w-full btn-gold rounded-sm">
                      Send Message
                    </button>
                  </form>
                </div>
              ) : (
                <div className="fade-up text-center bg-card border border-taupe rounded-sm p-12">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-medium text-charcoal mb-4">
                    Message received.
                  </h3>
                  <p className="font-body text-base text-charcoal-light leading-relaxed">
                    Thank you for reaching out. We will respond within 24–48 business hours.
                  </p>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 fade-up">
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-xl font-medium text-charcoal mb-4">Direct Contact</h3>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-gold" />
                    <a href="mailto:tabitha@kingdomsolutionsai.com" className="font-body text-base text-charcoal-light hover:text-gold transition-colors">
                      tabitha@kingdomsolutionsai.com
                    </a>
                  </div>
                </div>

                <div className="gold-hairline" />

                <div>
                  <h3 className="font-display text-xl font-medium text-charcoal mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    <Link href="/capacity-leak-audit" className="font-body text-sm text-charcoal-light hover:text-gold transition-colors flex items-center gap-2">
                      <ArrowRight size={14} className="text-gold" /> Take the Capacity Leak Audit™
                    </Link>
                    <Link href="/strategy-call" className="font-body text-sm text-charcoal-light hover:text-gold transition-colors flex items-center gap-2">
                      <ArrowRight size={14} className="text-gold" /> Book a Strategy Call
                    </Link>
                    <Link href="/clarity-pro" className="font-body text-sm text-charcoal-light hover:text-gold transition-colors flex items-center gap-2">
                      <ArrowRight size={14} className="text-gold" /> Explore Clarity Pro™
                    </Link>
                    <Link href="/constance" className="font-body text-sm text-charcoal-light hover:text-gold transition-colors flex items-center gap-2">
                      <ArrowRight size={14} className="text-gold" /> Meet Constance™
                    </Link>
                  </div>
                </div>

                <div className="gold-hairline" />

                <div>
                  <h3 className="font-display text-xl font-medium text-charcoal mb-4">Response Time</h3>
                  <p className="font-body text-sm text-charcoal-light leading-relaxed">
                    We respond to all inquiries within 24–48 business hours. For urgent matters, please indicate so in your subject line.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
