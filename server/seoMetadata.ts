/**
 * Server-side SEO metadata injection.
 * Replaces the static homepage meta tags in index.html with per-route metadata
 * so that non-JavaScript crawlers (LinkedIn, Facebook, Twitter/X) receive the
 * correct title, description, canonical, OG, and Twitter Card tags on first load.
 *
 * This does NOT add any dependencies or SSR framework.
 * The client-side usePageMeta hook still runs for SPA navigation.
 */

const BASE_URL = "https://kingdomsolutionsai.com";

interface PageMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogType: string;
  ogImage: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  noIndex?: boolean;
}

/** Escape HTML special characters in metadata values to prevent injection */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Strip query strings from the path to produce a clean canonical */
function cleanPath(urlPath: string): string {
  const questionMark = urlPath.indexOf("?");
  if (questionMark !== -1) {
    return urlPath.slice(0, questionMark);
  }
  return urlPath;
}

const ROUTE_METADATA: Record<string, PageMeta> = {
  "/": {
    title: "Business Strategy for Women Entrepreneurs | Kingdom Solutions AI™",
    description: "Kingdom Solutions AI™ by Tabitha Rector helps experienced women entrepreneurs turn expertise into a clear offer, build in the right order, and add human-authorized AI where it creates capacity.",
    canonicalUrl: `${BASE_URL}/`,
    ogTitle: "Business Strategy for Women Entrepreneurs | Kingdom Solutions AI™",
    ogDescription: "Kingdom Solutions AI™ helps coaches, founders, consultants, and executives build strategic AI systems for clarity, capacity, and intelligent support. Premium advisory by Tabitha Rector.",
    ogUrl: `${BASE_URL}/`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Business Strategy for Women Entrepreneurs | Kingdom Solutions AI™",
    twitterDescription: "Premium executive advisory firm building strategic AI systems for coaches, founders, consultants, and high-capacity leaders.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/about": {
    title: "About Tabitha Rector — Kingdom Solutions AI™",
    description: "Tabitha Rector is a Business & Entrepreneurship Strategist with 30+ years of leadership and coaching experience, helping experienced women entrepreneurs turn expertise into a clear offer and build in the right order.",
    canonicalUrl: `${BASE_URL}/about`,
    ogTitle: "About Tabitha Rector — Kingdom Solutions AI™",
    ogDescription: "30 years of leadership, management, and coaching. Tabitha Rector founded Kingdom Solutions AI™ to help high-capacity leaders build strategic AI systems for clarity, capacity, and sustainable growth.",
    ogUrl: `${BASE_URL}/about`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/tabitha-headshot_fea7ebce.webp`,
    twitterCard: "summary_large_image",
    twitterTitle: "About Tabitha Rector — Kingdom Solutions AI™",
    twitterDescription: "30 years of leadership, management, and coaching. Tabitha Rector founded Kingdom Solutions AI™ to help high-capacity leaders build strategic AI systems.",
    twitterImage: `${BASE_URL}/assets/tabitha-headshot_fea7ebce.webp`,
  },
  "/clarity-pro": {
    title: "Clarity Pro™ — Clear Offers & Messaging for Women Entrepreneurs | KSAI",
    description: "Clarity Pro™ helps experienced women entrepreneurs clarify who they serve, shape a strong offer, and create messaging buyers understand.",
    canonicalUrl: `${BASE_URL}/clarity-pro`,
    ogTitle: "Clarity Pro™ — Strategic Clarity & Content System | Kingdom Solutions AI™",
    ogDescription: "Clarity Pro™ helps new coaches, founders, and consultants clarify their niche, build a strong offer, develop their business voice, and create a content strategy.",
    ogUrl: `${BASE_URL}/clarity-pro`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/clarity-visual_f897fefc.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Clarity Pro™ — Strategic Clarity & Content System | Kingdom Solutions AI™",
    twitterDescription: "Clarity Pro™ helps new coaches, founders, and consultants clarify their niche, build a strong offer, and create a content strategy.",
    twitterImage: `${BASE_URL}/assets/clarity-visual_f897fefc.png`,
  },
  "/constance": {
    title: "Constance AI Chief of Staff™ | Kingdom Solutions AI™",
    description: "Constance is your AI Chief of Staff™, helping leaders protect their capacity, strengthen follow-up, prepare for meetings, and operate with greater clarity and control.",
    canonicalUrl: `${BASE_URL}/constance`,
    ogTitle: "Constance AI Chief of Staff™ | Executive Capacity, Protected",
    ogDescription: "A strategic AI Chief of Staff system designed to help high-capacity leaders protect their time, strengthen execution, and stop carrying the business alone.",
    ogUrl: `${BASE_URL}/constance`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/constance-lion-crown-circle_b1d9c829.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Constance AI Chief of Staff™ | Executive Capacity, Protected",
    twitterDescription: "A strategic AI Chief of Staff system designed to help high-capacity leaders protect their time, strengthen execution, and stop carrying the business alone.",
    twitterImage: `${BASE_URL}/assets/constance-lion-crown-circle_b1d9c829.png`,
  },
  "/executive-ai-strategy": {
    title: "Executive AI Strategy — Custom AI Systems Advisory | Kingdom Solutions AI™",
    description: "Executive AI Strategy is the premium advisory layer for leaders who need a custom AI systems roadmap, Capacity Reset™ methodology, and deeper implementation planning. Private strategy engagement.",
    canonicalUrl: `${BASE_URL}/executive-ai-strategy`,
    ogTitle: "Executive AI Strategy — Custom AI Systems Advisory | Kingdom Solutions AI™",
    ogDescription: "Executive AI Strategy is the premium advisory layer for leaders who need a custom AI systems roadmap, Capacity Reset™ methodology, and deeper implementation planning.",
    ogUrl: `${BASE_URL}/executive-ai-strategy`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Executive AI Strategy — Custom AI Systems Advisory | Kingdom Solutions AI™",
    twitterDescription: "Premium advisory for leaders who need a custom AI systems roadmap and deeper implementation planning.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/capacity-leak-audit": {
    title: "Capacity Leak Audit™ — Find Where Your Business Is Leaking | Kingdom Solutions AI™",
    description: "The Capacity Leak Audit™ helps leaders identify where time, clarity, focus, follow-up, or revenue is leaking — so you can build the right system next. Free strategic diagnostic from Kingdom Solutions AI™.",
    canonicalUrl: `${BASE_URL}/capacity-leak-audit`,
    ogTitle: "Capacity Leak Audit™ — Find Where Your Business Is Leaking | Kingdom Solutions AI™",
    ogDescription: "The Capacity Leak Audit™ helps leaders identify where time, clarity, focus, follow-up, or revenue is leaking — so you can build the right system next.",
    ogUrl: `${BASE_URL}/capacity-leak-audit`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/capacity-audit-visual_7655f585.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Capacity Leak Audit™ — Find Where Your Business Is Leaking | Kingdom Solutions AI™",
    twitterDescription: "Identify where time, clarity, focus, follow-up, or revenue is leaking — so you can build the right system next.",
    twitterImage: `${BASE_URL}/assets/capacity-audit-visual_7655f585.png`,
  },
  "/contact": {
    title: "Contact Kingdom Solutions AI™ — Reach Tabitha Rector",
    description: "Contact Kingdom Solutions AI™ by Tabitha Rector about business strategy, Clarity Pro™, the 30-Day Business Fast Track™, or human-authorized AI support.",
    canonicalUrl: `${BASE_URL}/contact`,
    ogTitle: "Contact Kingdom Solutions AI™ — Reach Tabitha Rector",
    ogDescription: "Contact Kingdom Solutions AI™ for questions about strategic AI systems, Clarity Pro™, Constance™, or Executive AI Strategy. Reach Tabitha Rector directly.",
    ogUrl: `${BASE_URL}/contact`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Contact Kingdom Solutions AI™ — Reach Tabitha Rector",
    twitterDescription: "Contact Kingdom Solutions AI™ for questions about strategic AI systems, Clarity Pro™, Constance™, or Executive AI Strategy.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/strategy-call": {
    title: "Book a Strategy Call — Kingdom Solutions AI™",
    description: "Book a strategy call with Tabitha Rector to identify your business's next right step, clarify your offer, and see whether the 30-Day Business Fast Track™ is a fit.",
    canonicalUrl: `${BASE_URL}/strategy-call`,
    ogTitle: "Book a Strategy Call — Kingdom Solutions AI™",
    ogDescription: "Book a private strategy call with Tabitha Rector to assess your leadership context, operational pressure, and AI systems needs.",
    ogUrl: `${BASE_URL}/strategy-call`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Book a Strategy Call — Kingdom Solutions AI™",
    twitterDescription: "Book a private strategy call with Tabitha Rector to assess your leadership context, operational pressure, and AI systems needs.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/privacy": {
    title: "Privacy Policy & Data Boundaries — Kingdom Solutions AI™",
    description: "How Kingdom Solutions AI™ protects your data, respects your boundaries, and maintains ethical AI practices. Clear data handling, no selling, no unauthorized sharing.",
    canonicalUrl: `${BASE_URL}/privacy`,
    ogTitle: "Privacy Policy & Data Boundaries — Kingdom Solutions AI™",
    ogDescription: "How Kingdom Solutions AI™ protects your data, respects your boundaries, and maintains ethical AI practices.",
    ogUrl: `${BASE_URL}/privacy`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary",
    twitterTitle: "Privacy Policy & Data Boundaries — Kingdom Solutions AI™",
    twitterDescription: "How Kingdom Solutions AI™ protects your data, respects your boundaries, and maintains ethical AI practices.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/terms": {
    title: "Terms of Service — Kingdom Solutions AI™",
    description: "Terms of Service for Kingdom Solutions AI™ products and advisory services including Clarity Pro™, Constance™, and Executive AI Strategy.",
    canonicalUrl: `${BASE_URL}/terms`,
    ogTitle: "Terms of Service — Kingdom Solutions AI™",
    ogDescription: "Terms of Service for Kingdom Solutions AI™ products and advisory services including Clarity Pro™, Constance™, and Executive AI Strategy.",
    ogUrl: `${BASE_URL}/terms`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary",
    twitterTitle: "Terms of Service — Kingdom Solutions AI™",
    twitterDescription: "Terms of Service for Kingdom Solutions AI™ products and advisory services.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
   "/refund-policy": {
    title: "Refund Policy — Kingdom Solutions AI™",
    description: "Refund policy for Kingdom Solutions AI™ products including Clarity Pro™ Starter, Guided, and Buildout tiers. Clear terms for digital access, strategy sessions, and consultative services.",
    canonicalUrl: `${BASE_URL}/refund-policy`,
    ogTitle: "Refund Policy — Kingdom Solutions AI™",
    ogDescription: "Refund policy for Kingdom Solutions AI™ products including Clarity Pro™ Starter, Guided, and Buildout tiers.",
    ogUrl: `${BASE_URL}/refund-policy`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary",
    twitterTitle: "Refund Policy — Kingdom Solutions AI™",
    twitterDescription: "Refund policy for Kingdom Solutions AI™ products including Clarity Pro™ Starter, Guided, and Buildout tiers.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/handbook": {
    title: "What Every New Entrepreneur Needs to Know | Kingdom Solutions AI™",
    description: "A practical guide to building a business in the right order. Chapter One is included with registration for the What Every New Entrepreneur Needs to Know webinar.",
    canonicalUrl: `${BASE_URL}/handbook`,
    ogTitle: "What Every New Entrepreneur Needs to Know | Kingdom Solutions AI™",
    ogDescription: "A clear, practical guide to the legal, tax, and compliance basics every new business owner needs to get right from day one.",
    ogUrl: `${BASE_URL}/handbook`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "What Every New Entrepreneur Needs to Know | Kingdom Solutions AI™",
    twitterDescription: "A clear, practical guide to the legal, tax, and compliance basics every new business owner needs to get right from day one.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/entrepreneur-assessment": {
    title: "Entrepreneur Next Step™ Assessment | Find Your Business Gap",
    description:
      "Find the gap in your Direction, Offer, Audience, or Structure and the next step to build your business in the right order. Free, about three minutes.",
    canonicalUrl: `${BASE_URL}/entrepreneur-assessment`,
    ogTitle: "Entrepreneur Next Step™ Assessment | Find Your Business Gap",
    ogDescription:
      "Find the gap. Close the right gap. Build what's next. A free, three-minute assessment of Direction, Offer, Audience, and Structure.",
    ogUrl: `${BASE_URL}/entrepreneur-assessment`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary_large_image",
    twitterTitle:
      "Entrepreneur Next Step™ Assessment | Find Your Business Gap",
    twitterDescription:
      "Find the gap. Close the right gap. Build what's next. A free, three-minute assessment of Direction, Offer, Audience, and Structure.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/business-fast-track": {
    title: "30-Day Business Fast Track™ | Kingdom Solutions AI™",
    description: "A guided 30-day implementation experience for experienced women ready to turn their expertise into a clear, credible, buyer-ready business, built in the right order.",
    canonicalUrl: `${BASE_URL}/business-fast-track`,
    ogTitle: "30-Day Business Fast Track™ | Build Your Business in the Right Order",
    ogDescription: "A guided 30-day implementation experience for experienced women ready to turn their expertise into a clear, credible, buyer-ready business.",
    ogUrl: `${BASE_URL}/business-fast-track`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "30-Day Business Fast Track™ | Build Your Business in the Right Order",
    twitterDescription: "A guided 30-day implementation experience for experienced women ready to turn their expertise into a clear, credible, buyer-ready business.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/victors-circle-leadership-academy": {
    title: "Victor's Circle Leadership Academy™ — Christ-Centered Leadership for Women | Kingdom Solutions AI™",
    description: "Victor's Circle Leadership Academy™ is a Christ-centered leadership formation program for Christian women entrepreneurs. Now accepting applications for the February 2027 cohort.",
    canonicalUrl: `${BASE_URL}/victors-circle-leadership-academy`,
    ogTitle: "Victor's Circle Leadership Academy™ — Christ-Centered Leadership for Women",
    ogDescription: "A Christ-centered leadership formation program for Christian women entrepreneurs. Now accepting applications for the February 2027 cohort.",
    ogUrl: `${BASE_URL}/victors-circle-leadership-academy`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Victor's Circle Leadership Academy™ — Christ-Centered Leadership for Women",
    twitterDescription: "A Christ-centered leadership formation program for Christian women entrepreneurs. Now accepting applications for the February 2027 cohort.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    noIndex: true,
  },
};
/** The set of known public routes that should return HTTP 200 */
export const KNOWN_PUBLIC_ROUTES = new Set(Object.keys(ROUTE_METADATA));

/**
 * Check if a request URL matches a known public route.
 * Strips query strings before checking.
 */
export function isKnownRoute(requestUrl: string): boolean {
  return KNOWN_PUBLIC_ROUTES.has(cleanPath(requestUrl));
}

/**
 * Inject noindex/nofollow into the HTML for unknown routes (404 pages).
 * Also removes any og:url that points to the homepage to avoid confusion.
 */
export function injectNoindexForUnknownRoute(html: string): string {
  // Inject noindex, nofollow before </head>
  html = html.replace(
    /<\/head>/,
    `    <meta name="robots" content="noindex, nofollow" />\n  </head>`
  );
  return html;
}

/**
 * Inject per-route metadata into the HTML template.
 * Replaces the static homepage tags with route-specific ones.
 * If the route is unknown, returns the original HTML unchanged (404 handled by React).
 */
export function injectSeoMetadata(html: string, requestUrl: string): string {
  const path = cleanPath(requestUrl);
  const meta = ROUTE_METADATA[path];

  // If no metadata for this route, return HTML unchanged
  if (!meta) {
    return html;
  }

  const t = escapeHtml(meta.title);
  const d = escapeHtml(meta.description);
  const canonical = escapeHtml(meta.canonicalUrl);
  const ogTitle = escapeHtml(meta.ogTitle);
  const ogDesc = escapeHtml(meta.ogDescription);
  const ogUrl = escapeHtml(meta.ogUrl);
  const ogType = escapeHtml(meta.ogType);
  const ogImage = escapeHtml(meta.ogImage);
  const twCard = escapeHtml(meta.twitterCard);
  const twTitle = escapeHtml(meta.twitterTitle);
  const twDesc = escapeHtml(meta.twitterDescription);
  const twImage = escapeHtml(meta.twitterImage);

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${t}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${d}" />`
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${ogTitle}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${ogDesc}" />`
  );
  html = html.replace(
    /<meta property="og:type" content="[^"]*" \/>/,
    `<meta property="og:type" content="${ogType}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${ogUrl}" />`
  );
  html = html.replace(
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${ogImage}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:card" content="[^"]*" \/>/,
    `<meta name="twitter:card" content="${twCard}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${twTitle}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${twDesc}" />`
  );

  // Add twitter:image (not in original HTML, so inject after twitter:description)
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${twDesc}" />\n    <meta name="twitter:image" content="${twImage}" />`
  );

  if (meta.noIndex) {
    html = html.replace(/<\/head>/, `    <meta name="robots" content="noindex, follow" />\n  </head>`);
  }

  // Add canonical link (inject before </head>)
  html = html.replace(
    /<\/head>/,
    `    <link rel="canonical" href="${canonical}" />\n  </head>`
  );

  return html;
}
