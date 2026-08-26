import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

// The live webinar registration site (external).
const WEBINAR_URL = "https://whatentrepreneursneedtoknow.com";

// "For Entrepreneurs" lane — emerging-entrepreneur resources.
// Ordered so the Assessment (the lane's front door) sits first.
// The Handbook line is ready to activate once the PDF is hosted on-site.
type NavLink = { href: string; label: string; external?: boolean; premier?: boolean };

const entrepreneurLinks: NavLink[] = [
  { href: "/victors-circle-leadership-academy", label: "Victor's Circle Leadership Academy™", premier: true },
  { href: "/entrepreneur-assessment", label: "Don't Know Where to Start?" },
  { href: "/handbook", label: "Handbook (Free)" },
  { href: WEBINAR_URL, label: "The Webinar", external: true },
];

// Offers, ordered as the ladder — this is what lives inside "Services".
const serviceLinks = [
  { href: "/capacity-leak-audit", label: "Capacity Leak Audit™" },
  { href: "/clarity-pro", label: "Clarity Pro™" },
  { href: "/constance", label: "Constance™" },
  { href: "/executive-ai-strategy", label: "Executive AI Strategy" },
];

// Top-level nav after the dropdowns.
const simpleLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [entOpen, setEntOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const entRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setEntOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // Close the desktop Services dropdown when clicking outside it.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (entRef.current && !entRef.current.contains(e.target as Node)) {
        setEntOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // The header's "Apply Now" CTA needs to land on Victor's Circle's actual
  // application form (#apply), not just the top of the page — and it needs
  // to work even when the visitor is already on
  // /victors-circle-leadership-academy, where a plain route Link is a no-op
  // because the route never changes.
  const goToApply = () => {
    setMobileOpen(false);
    const scrollToForm = () => {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location === "/victors-circle-leadership-academy") {
      scrollToForm();
    } else {
      setLocation("/victors-circle-leadership-academy");
      window.setTimeout(scrollToForm, 100);
    }
  };

  const isServiceActive = serviceLinks.some((l) => l.href === location);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation — refined, spacious, premium */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-cream/97 backdrop-blur-xl ${
          scrolled
            ? "shadow-[0_1px_0_0_rgba(197,160,68,0.12)]"
            : "shadow-none"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-24 lg:h-32">
          {/* Logo — generous breathing room */}
          <Link href="/" className="flex items-center gap-4 group shrink-0 mr-8 lg:mr-14">
            <img
              src="/assets/ksai-logo-transparent-400_82fa1f46.png"
              alt="Kingdom Solutions AI™"
              className="w-16 h-16 lg:w-[90px] lg:h-[90px] transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-body text-base lg:text-lg font-bold tracking-[0.08em] uppercase text-charcoal leading-tight">
                Kingdom Solutions
              </span>
              <span className="font-body text-base lg:text-lg font-bold tracking-[0.08em] uppercase text-gold leading-tight">
                AI™
              </span>
            </div>
          </Link>

          {/* Desktop Navigation — Start Here · Services ▾ · About · Contact */}
          <div className="hidden xl:flex items-center gap-7 2xl:gap-9">
           

            {/* For Entrepreneurs dropdown */}
            <div className="relative" ref={entRef}>
              <button
                type="button"
                onClick={() => setEntOpen((v) => !v)}
                className="font-body text-[0.8rem] tracking-[0.02em] transition-colors duration-300 whitespace-nowrap inline-flex items-center gap-1 text-charcoal/70 hover:text-charcoal"
                aria-expanded={entOpen}
                aria-haspopup="true"
              >
                For Entrepreneurs
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${entOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {entOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 min-w-[220px] bg-cream/98 backdrop-blur-xl border border-gold/15 shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-2 z-50">
                  {entrepreneurLinks.map((link) =>
                    link.external ? (
                      
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-body text-[0.82rem] tracking-[0.02em] px-5 py-3 transition-colors duration-200 whitespace-nowrap text-charcoal/75 hover:text-charcoal hover:bg-gold/5"
                      >
                        {link.label}
                      </a>
                    ) : (        
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-2 font-body text-[0.82rem] tracking-[0.02em] px-5 py-3 transition-colors duration-200 whitespace-nowrap ${
                          location === link.href
                            ? "text-gold font-medium bg-gold/5"
                            : "text-charcoal/75 hover:text-charcoal hover:bg-gold/5"
                        }`}
                      >
                        {link.label}
                        {link.premier && (
                          <span className="text-[0.6rem] font-semibold tracking-[0.08em] uppercase text-gold border border-gold/40 rounded-sm px-1.5 py-0.5">
                            Premier
                          </span>
                        )}
                      </Link>
                    )
                  )}   
                </div>
              )}
            </div>

            {/* Services dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                className={`font-body text-[0.8rem] tracking-[0.02em] transition-colors duration-300 whitespace-nowrap inline-flex items-center gap-1 ${
                  isServiceActive
                    ? "text-gold font-medium"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {servicesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 min-w-[260px] bg-cream/98 backdrop-blur-xl border border-gold/15 shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-2 z-50">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block font-body text-[0.82rem] tracking-[0.02em] px-5 py-3 transition-colors duration-200 whitespace-nowrap ${
                        location === link.href
                          ? "text-gold font-medium bg-gold/5"
                          : "text-charcoal/75 hover:text-charcoal hover:bg-gold/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About · Contact */}
            {simpleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-[0.8rem] tracking-[0.02em] transition-colors duration-300 whitespace-nowrap ${
                  location === link.href
                    ? "text-gold font-medium"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop — premium, distinguished */}
          <button
            type="button"
            onClick={goToApply}
            className="hidden xl:inline-flex items-center gap-2 ml-8 lg:ml-12 shrink-0 bg-charcoal text-cream-dark font-body text-[0.72rem] font-medium tracking-[0.1em] uppercase px-7 py-3.5 transition-all duration-300 hover:bg-charcoal/90 active:scale-[0.97]"
          >
            Apply Now
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 text-charcoal"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="xl:hidden bg-cream/98 backdrop-blur-xl border-t border-gold/10">
                        <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col gap-5">
              {/* For Entrepreneurs group */}
              <div className="flex flex-col gap-3">
                <span className="font-body text-[0.65rem] font-medium tracking-[0.18em] uppercase text-gold/80">
                  For Entrepreneurs
                </span>
                               {entrepreneurLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-base py-1 pl-3 transition-colors duration-200 text-charcoal/70 hover:text-charcoal"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 font-body text-base py-1 pl-3 transition-colors duration-200 ${
                        location === link.href
                          ? "text-gold font-medium"
                          : "text-charcoal/70 hover:text-charcoal"
                      }`}
                    >
                      {link.label}
                      {link.premier && (
                        <span className="text-[0.6rem] font-semibold tracking-[0.08em] uppercase text-gold border border-gold/40 rounded-sm px-1.5 py-0.5">
                          Premier
                        </span>
                      )}
                    </Link>
                  )
                )}
              </div>

              {/* For Entrepreneurs group */}
              <div className="flex flex-col gap-3">
                <span className="font-body text-[0.65rem] font-medium tracking-[0.18em] uppercase text-gold/80">
                  For Entrepreneurs
                </span>
                {entrepreneurLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-base py-1 pl-3 transition-colors duration-200 text-charcoal/70 hover:text-charcoal"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`font-body text-base py-1 pl-3 transition-colors duration-200 ${
                        location === link.href
                          ? "text-gold font-medium"
                          : "text-charcoal/70 hover:text-charcoal"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>

              {/* Services group — shown as a labeled cluster on mobile */}
              <div className="flex flex-col gap-3">
                <span className="font-body text-[0.65rem] font-medium tracking-[0.18em] uppercase text-gold/80">
                  Services
                </span>
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-body text-base py-1 pl-3 transition-colors duration-200 ${
                      location === link.href
                        ? "text-gold font-medium"
                        : "text-charcoal/70 hover:text-charcoal"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* About · Contact */}
              {simpleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-base py-1 transition-colors duration-200 ${
                    location === link.href
                      ? "text-gold font-medium"
                      : "text-charcoal/70 hover:text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 mt-2 border-t border-taupe">
                <button
                  type="button"
                  onClick={goToApply}
                  className="w-full bg-charcoal text-cream-dark font-body text-[0.72rem] font-medium tracking-[0.1em] uppercase px-7 py-3.5 inline-block text-center transition-all duration-300 hover:bg-charcoal/90"
                >
                  Apply Now
                </button>   
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer — premium, editorial */}
      <footer className="bg-charcoal text-cream-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-[80px] h-[80px] rounded-full bg-cream flex items-center justify-center shrink-0">
                  <img
                    src="/assets/ksai-logo-transparent-400_82fa1f46.png"
                    alt="Kingdom Solutions AI™"
                    className="w-[68px] h-[68px]"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-[0.75rem] font-semibold tracking-[0.13em] uppercase text-cream-dark leading-tight">
                    Kingdom Solutions
                  </span>
                  <span className="font-body text-[0.75rem] font-semibold tracking-[0.13em] uppercase text-gold leading-tight">
                    AI™
                  </span>
                </div>
              </div>
              <p className="font-body text-sm text-warm-gray leading-relaxed max-w-xs">
                Strategic AI systems for coaches, founders, consultants, executives, and high-capacity leaders who need clarity, capacity, and intelligent support.
              </p>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-body text-[0.65rem] font-medium tracking-[0.18em] uppercase text-gold mb-7">
                Services
              </h4>
              <div className="flex flex-col gap-3.5">
                <Link href="/capacity-leak-audit" className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300">
                  Capacity Leak Audit™
                </Link>
                <Link href="/clarity-pro" className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300">
                  Clarity Pro™
                </Link>
                <Link href="/constance" className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300">
                  Constance™ AI Chief of Staff
                </Link>
                <Link href="/executive-ai-strategy" className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300">
                  Executive AI Strategy
                </Link>
              </div>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-body text-[0.65rem] font-medium tracking-[0.18em] uppercase text-gold mb-7">
                Company
              </h4>
              <div className="flex flex-col gap-3.5">
                <Link href="/about" className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300">
                  About Tabitha
                </Link>
                <Link href="/contact" className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300">
                  Contact
                </Link>
                <Link href="/strategy-call" className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300">
                  Book a Strategy Call
                </Link>
                <Link href="/privacy" className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300">
                  Privacy Policy & Data Boundaries
                </Link>
                <Link href="/terms" className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/refund-policy" className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300">
                  Refund Policy
                </Link>
              </div>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-body text-[0.65rem] font-medium tracking-[0.18em] uppercase text-gold mb-7">
                Correspondence
              </h4>
              <div className="flex flex-col gap-3.5">
                <a
                  href="mailto:tabitha@kingdomsolutionsai.com"
                  className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300"
                >
                  tabitha@kingdomsolutionsai.com
                </a>
                <a
                  href="https://www.linkedin.com/company/kingdomsolutionsai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300 inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-20 pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-warm-gray/70">
              © 2026 Kingdom Solutions AI™. All rights reserved.
            </p>
            <p className="font-body text-xs text-warm-gray/70">
              Founded by Tabitha Rector · Executive AI Strategist
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
