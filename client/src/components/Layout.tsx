import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { getSiteCta, WEBINAR_URL } from "@/lib/ctaSchedule";
// The header button and webinar links follow the date schedule in ctaSchedule.ts.
const siteCta = getSiteCta();
const ACADEMY_PATH = "/victors-circle-leadership-academy";

type NavLink = { href: string; label: string; note?: string; external?: boolean };
type NavGroup = { id: string; label: string; links: NavLink[] };

// The site is organized around the decision a visitor is trying to make:
// build the business (For Entrepreneurs), support a growing business
// (Services), or pursue Christ-centered leadership formation (Faith & Leadership).
const entrepreneurLinks: NavLink[] = [
  { href: "/entrepreneur-assessment", label: "Find Your Starting Point", note: "Entrepreneur Assessment" },
  ...(siteCta.webinarDate
    ? [{ href: WEBINAR_URL, label: "The Webinar", note: `Next live session: ${siteCta.webinarDate}`, external: true }]
    : []),
  { href: "/business-fast-track", label: "30-Day Business Fast Track™" },
  { href: "/handbook", label: "Handbook (Free)" },
];
// Offers, ordered as the ladder.
const serviceLinks: NavLink[] = [
  { href: "/capacity-leak-audit", label: "Capacity Leak Audit™" },
  { href: "/clarity-pro", label: "Clarity Pro™" },
  { href: "/constance", label: "Constance™" },
  { href: "/executive-ai-strategy", label: "Executive AI Strategy" },
];
// Faith-based leadership path, kept separate so it never competes with the business offers.
const faithLinks: NavLink[] = [
  { href: ACADEMY_PATH, label: "Victor's Circle Leadership Academy™", note: "90-day cohort · February 2027" },
];
const navGroups: NavGroup[] = [
  { id: "entrepreneurs", label: "For Entrepreneurs", links: entrepreneurLinks },
  { id: "services", label: "Services", links: serviceLinks },
  { id: "faith", label: "Faith & Leadership", links: faithLinks },
];
// Top-level nav after the dropdowns.
const simpleLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const ctaClass =
  "bg-charcoal text-cream-dark font-body text-[0.72rem] font-medium tracking-[0.1em] uppercase px-4 2xl:px-6 py-3.5 transition-all duration-300 hover:bg-charcoal/90 active:scale-[0.97]";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
    window.scrollTo(0, 0);
  }, [location]);

  // Close any open desktop dropdown when clicking outside the menu.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // The top button follows the page: the academy page keeps its own
  // application button, and every other page follows the date schedule.
  const onAcademyPage = location === ACADEMY_PATH;
  const goToApply = () => {
    setMobileOpen(false);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderCta = (extra = "") =>
    onAcademyPage ? (
      <button type="button" onClick={goToApply} className={`${ctaClass} ${extra}`}>
        Apply for February 2027
      </button>
    ) : (
      <a
        href={siteCta.href}
        {...(siteCta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`${ctaClass} ${extra}`}
      >
        <span className="xl:hidden 2xl:inline">{siteCta.label}</span>
        <span className="hidden xl:inline 2xl:hidden">{siteCta.shortLabel}</span>
      </a>
    );

  const renderLink = (link: NavLink, variant: "desktop" | "mobile") => {
    const active = !link.external && location === link.href;
    const base =
      variant === "desktop"
        ? "block px-5 py-3 transition-colors duration-200 whitespace-nowrap"
        : "block py-1 pl-3 transition-colors duration-200";
    const tone = active
      ? "text-gold font-medium bg-gold/5"
      : "text-charcoal/75 hover:text-charcoal hover:bg-gold/5";
    const content = (
      <>
        <span className={variant === "desktop" ? "font-body text-[0.82rem] tracking-[0.02em]" : "font-body text-base"}>
          {link.label}
        </span>
        {link.note && (
          <span className="block font-body text-[0.68rem] tracking-[0.04em] text-charcoal/50 mt-0.5">
            {link.note}
          </span>
        )}
      </>
    );
    return link.external ? (
      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={`${base} ${tone}`}>
        {content}
      </a>
    ) : (
      <Link key={link.href} href={link.href} className={`${base} ${tone}`}>
        {content}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-cream/97 backdrop-blur-xl ${
          scrolled ? "shadow-[0_1px_0_0_rgba(197,160,68,0.12)]" : "shadow-none"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-24 lg:h-32">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group shrink-0 mr-6 lg:mr-10">
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

          {/* Desktop Navigation: three lanes, then About and Contact */}
          <div ref={navRef} className="hidden xl:flex items-center gap-4 2xl:gap-9">
            {navGroups.map((group) => {
              const isOpen = openGroup === group.id;
              const isActive = group.links.some((l) => !l.external && l.href === location);
              return (
                <div key={group.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenGroup(isOpen ? null : group.id)}
                    className={`font-body text-[0.8rem] tracking-[0.02em] transition-colors duration-300 whitespace-nowrap inline-flex items-center gap-1 ${
                      isActive ? "text-gold font-medium" : "text-charcoal/70 hover:text-charcoal"
                    }`}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    {group.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 min-w-[260px] bg-cream/98 backdrop-blur-xl border border-gold/15 shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-2 z-50">
                      {group.links.map((link) => renderLink(link, "desktop"))}
                    </div>
                  )}
                </div>
              );
            })}
            {simpleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-[0.8rem] tracking-[0.02em] transition-colors duration-300 whitespace-nowrap ${
                  location === link.href ? "text-gold font-medium" : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          {renderCta("hidden xl:inline-flex items-center gap-2 ml-6 shrink-0 whitespace-nowrap")}

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
          <div className="xl:hidden bg-cream/98 backdrop-blur-xl border-t border-gold/10 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col gap-5">
              {navGroups.map((group) => (
                <div key={group.id} className="flex flex-col gap-3">
                  <span className="font-body text-[0.65rem] font-medium tracking-[0.18em] uppercase text-gold/80">
                    {group.label}
                  </span>
                  {group.links.map((link) => renderLink(link, "mobile"))}
                </div>
              ))}
              {simpleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-base py-1 transition-colors duration-200 ${
                    location === link.href ? "text-gold font-medium" : "text-charcoal/70 hover:text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-taupe">
                {renderCta("w-full inline-block text-center")}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-charcoal text-cream-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-12">
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
                Helping women entrepreneurs find the gap, close the right gap, and build what's next, with human-authorized AI that keeps you in charge.
              </p>
            </div>
            {/* For Entrepreneurs + Faith & Leadership */}
            <div>
              <h4 className="font-body text-[0.65rem] font-medium tracking-[0.18em] uppercase text-gold mb-7">
                For Entrepreneurs
              </h4>
              <div className="flex flex-col gap-3.5 mb-10">
                <Link href="/entrepreneur-assessment" className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300">
                  Find Your Starting Point
                </Link>
                {siteCta.webinarDate && (
                  <a href={WEBINAR_URL} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300">
                    The Webinar ({siteCta.webinarDate})
                  </a>
                )}
                <Link href="/business-fast-track" className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300">
                  30-Day Business Fast Track™
                </Link>
                <Link href="/handbook" className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300">
                  Handbook (Free)
                </Link>
              </div>
              <h4 className="font-body text-[0.65rem] font-medium tracking-[0.18em] uppercase text-gold mb-7">
                Faith &amp; Leadership
              </h4>
              <div className="flex flex-col gap-3.5">
                <Link href="/victors-circle-leadership-academy" className="font-body text-sm text-warm-gray hover:text-cream-dark transition-colors duration-300">
                  Victor's Circle Leadership Academy™
                </Link>
              </div>
            </div>
            {/* Services */}
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
