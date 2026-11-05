/**
 * Server-side SEO metadata injection.
 * Replaces the static homepage meta tags in index.html with per-route metadata
 * so that non-JavaScript crawlers (LinkedIn, Facebook, Twitter/X) receive the
 * correct title, description, canonical, OG, and Twitter Card tags on first load.
 *
 * This does NOT add any dependencies or SSR framework.
 * The client-side usePageMeta hook still runs for SPA navigation.
 */

const BASE_URL = "https://www.kingdomsolutionsai.com";

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

const FAST_TRACK_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}/business-fast-track#service`,
  name: "30-Day Business Fast Track",
  serviceType: "Business and entrepreneurship strategy",
  description: "A guided 30-day implementation program helping experienced women clarify an offer, sales-ready message, and practical path to clients.",
  url: `${BASE_URL}/business-fast-track`,
  provider: { "@id": `${BASE_URL}/#organization` },
  audience: { "@type": "Audience", audienceType: "Experienced women building expertise-based businesses" },
  offers: { "@type": "Offer", price: "1997", priceCurrency: "USD", url: `${BASE_URL}/business-fast-track` },
};

const ROUTE_METADATA: Record<string, PageMeta> = {
  "/video-experience": {
    title: "Build in the Right Order™ | Sneak Peek | Kingdom Solutions Business & AI",
    description: "A 13-minute, 46-second sneak peek into the four business gaps, building in the right order, and the eight foundational business systems with Tabitha Rector.",
    canonicalUrl: `${BASE_URL}/video-experience`,
    ogTitle: "Build in the Right Order™ — A Sneak Peek",
    ogDescription: "Discover why the order of building matters with Tabitha Rector, Kingdom Solutions Business & AI™.",
    ogUrl: `${BASE_URL}/video-experience`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Build in the Right Order™ — A Sneak Peek",
    twitterDescription: "A free preview of the four business gaps, the right order, and eight foundational systems.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/video-experience/watch": {
    title: "Private Video Viewing | Build in the Right Order™",
    description: "Your verified private video viewing page.",
    canonicalUrl: `${BASE_URL}/video-experience/watch`,
    ogTitle: "Private Video Viewing | Kingdom Solutions Business & AI™",
    ogDescription: "Verified access required.",
    ogUrl: `${BASE_URL}/video-experience/watch`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary",
    twitterTitle: "Private Video Viewing",
    twitterDescription: "Verified access required.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/": {
    title: "Business Strategy for Experienced Women | Kingdom Solutions Business & AI",
    description: "Turn your professional expertise into a consulting or service business built in the right order. Business strategy first, with practical AI to increase capacity.",
    canonicalUrl: `${BASE_URL}/`,
    ogTitle: "Business Strategy for Experienced Women | Kingdom Solutions Business & AI",
    ogDescription: "Turn your professional expertise into a consulting or service business built in the right order. Business strategy first, with practical AI to increase capacity.",
    ogUrl: `${BASE_URL}/`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Business Strategy for Experienced Women | Kingdom Solutions Business & AI",
    twitterDescription: "Turn your professional expertise into a consulting or service business built in the right order. Business strategy first, with practical AI to increase capacity.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/about": {
    title: "Tabitha Rector | Business & Entrepreneurship Strategist",
    description: "Meet Tabitha Rector, PCC: 30+ years in banking, sales, leadership, and business advisory. Helping experienced women build expertise-based businesses in the right order.",
    canonicalUrl: `${BASE_URL}/about`,
    ogTitle: "About Tabitha Rector — Kingdom Solutions Business & AI™",
    ogDescription: "Meet Tabitha Rector, founder of Kingdom Solutions Business & AI™, helping experienced women build clear businesses in the right order and grow without being consumed by them.",
    ogUrl: `${BASE_URL}/about`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/tabitha-headshot_fea7ebce.webp`,
    twitterCard: "summary_large_image",
    twitterTitle: "About Tabitha Rector — Kingdom Solutions Business & AI™",
    twitterDescription: "Business & Entrepreneurship Strategist helping experienced women turn their expertise into a clear business and build it in the right order.",
    twitterImage: `${BASE_URL}/assets/tabitha-headshot_fea7ebce.webp`,
  },
  "/clarity-pro": {
    title: "Clarity Pro™ — Strategic Clarity & Content System | Kingdom Solutions Business & AI™",
    description: "Clarity Pro™ helps experienced women translate their expertise into a clear niche, credible offer, distinct voice, and message buyers understand.",
    canonicalUrl: `${BASE_URL}/clarity-pro`,
    ogTitle: "Clarity Pro™ — Strategic Clarity & Content System | Kingdom Solutions Business & AI™",
    ogDescription: "A private positioning experience that turns expertise into a clear niche, credible offer, distinct voice, and message buyers understand.",
    ogUrl: `${BASE_URL}/clarity-pro`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/clarity-visual_f897fefc.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Clarity Pro™ — Strategic Clarity & Content System | Kingdom Solutions Business & AI™",
    twitterDescription: "Turn your expertise into a clear niche, credible offer, distinct voice, and message buyers understand.",
    twitterImage: `${BASE_URL}/assets/clarity-visual_f897fefc.png`,
  },
  "/constance": {
    title: "Constance AI Chief of Staff™ | Kingdom Solutions Business & AI™",
    description: "Constance™ is a human-authorized AI Chief of Staff that helps women entrepreneurs protect capacity, strengthen follow-up, prepare for meetings, and stay in control.",
    canonicalUrl: `${BASE_URL}/constance`,
    ogTitle: "Constance AI Chief of Staff™ | Executive Capacity, Protected",
    ogDescription: "Human-authorized AI support that helps women entrepreneurs protect capacity, strengthen execution, and stop carrying every operational thread alone.",
    ogUrl: `${BASE_URL}/constance`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/constance-lion-crown-circle_b1d9c829.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Constance AI Chief of Staff™ | Executive Capacity, Protected",
    twitterDescription: "Human-authorized AI support that helps women entrepreneurs protect capacity and stop carrying every operational thread alone.",
    twitterImage: `${BASE_URL}/assets/constance-lion-crown-circle_b1d9c829.png`,
  },
  "/executive-ai-strategy": {
    title: "Executive AI Strategy — Custom AI Systems Advisory | Kingdom Solutions Business & AI™",
    description: "Executive AI Strategy is the premium advisory layer for leaders who need a custom AI systems roadmap, Capacity Reset™ methodology, and deeper implementation planning. Private strategy engagement.",
    canonicalUrl: `${BASE_URL}/executive-ai-strategy`,
    ogTitle: "Executive AI Strategy — Custom AI Systems Advisory | Kingdom Solutions Business & AI™",
    ogDescription: "Executive AI Strategy is the premium advisory layer for leaders who need a custom AI systems roadmap, Capacity Reset™ methodology, and deeper implementation planning.",
    ogUrl: `${BASE_URL}/executive-ai-strategy`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Executive AI Strategy — Custom AI Systems Advisory | Kingdom Solutions Business & AI™",
    twitterDescription: "Premium advisory for leaders who need a custom AI systems roadmap and deeper implementation planning.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/capacity-leak-audit": {
    title: "Capacity Leak Audit™ — Find Where Your Business Is Leaking | Kingdom Solutions Business & AI™",
    description: "The Capacity Leak Audit™ helps leaders identify where time, clarity, focus, follow-up, or revenue is leaking — so you can build the right system next. Free strategic diagnostic from Kingdom Solutions Business & AI™.",
    canonicalUrl: `${BASE_URL}/capacity-leak-audit`,
    ogTitle: "Capacity Leak Audit™ — Find Where Your Business Is Leaking | Kingdom Solutions Business & AI™",
    ogDescription: "The Capacity Leak Audit™ helps leaders identify where time, clarity, focus, follow-up, or revenue is leaking — so you can build the right system next.",
    ogUrl: `${BASE_URL}/capacity-leak-audit`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/capacity-audit-visual_7655f585.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Capacity Leak Audit™ — Find Where Your Business Is Leaking | Kingdom Solutions Business & AI™",
    twitterDescription: "Identify where time, clarity, focus, follow-up, or revenue is leaking — so you can build the right system next.",
    twitterImage: `${BASE_URL}/assets/capacity-audit-visual_7655f585.png`,
  },
  "/contact": {
    title: "Contact Kingdom Solutions Business & AI™ — Reach Tabitha Rector",
    description: "Contact Kingdom Solutions Business & AI™ by Tabitha Rector about business-building support, Clarity Pro™, the 30-Day Business Fast Track™, or human-authorized AI systems.",
    canonicalUrl: `${BASE_URL}/contact`,
    ogTitle: "Contact Kingdom Solutions Business & AI™ — Reach Tabitha Rector",
    ogDescription: "Reach Tabitha Rector about business-building support and human-authorized AI systems from Kingdom Solutions Business & AI™.",
    ogUrl: `${BASE_URL}/contact`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Contact Kingdom Solutions Business & AI™ — Reach Tabitha Rector",
    twitterDescription: "Reach Tabitha Rector about business-building support and human-authorized AI systems from Kingdom Solutions Business & AI™.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/strategy-call": {
    title: "Book a Strategy Call — Kingdom Solutions Business & AI™",
    description: "Book a private strategy call with Tabitha Rector to identify whether your next step is business clarity, guided implementation, or human-authorized AI support.",
    canonicalUrl: `${BASE_URL}/strategy-call`,
    ogTitle: "Book a Strategy Call — Kingdom Solutions Business & AI™",
    ogDescription: "Identify whether your next step is business clarity, guided implementation, or human-authorized AI support.",
    ogUrl: `${BASE_URL}/strategy-call`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "Book a Strategy Call — Kingdom Solutions Business & AI™",
    twitterDescription: "Identify whether your next step is business clarity, guided implementation, or human-authorized AI support.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/privacy": {
    title: "Privacy Policy & Data Boundaries — Kingdom Solutions Business & AI™",
    description: "How Kingdom Solutions Business & AI™ protects your data, respects your boundaries, and maintains ethical AI practices. Clear data handling, no selling, no unauthorized sharing.",
    canonicalUrl: `${BASE_URL}/privacy`,
    ogTitle: "Privacy Policy & Data Boundaries — Kingdom Solutions Business & AI™",
    ogDescription: "How Kingdom Solutions Business & AI™ protects your data, respects your boundaries, and maintains ethical AI practices.",
    ogUrl: `${BASE_URL}/privacy`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary",
    twitterTitle: "Privacy Policy & Data Boundaries — Kingdom Solutions Business & AI™",
    twitterDescription: "How Kingdom Solutions Business & AI™ protects your data, respects your boundaries, and maintains ethical AI practices.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/terms": {
    title: "Terms of Service — Kingdom Solutions Business & AI™",
    description: "Terms of Service for Kingdom Solutions Business & AI™ products and advisory services including Clarity Pro™, Constance™, and Executive AI Strategy.",
    canonicalUrl: `${BASE_URL}/terms`,
    ogTitle: "Terms of Service — Kingdom Solutions Business & AI™",
    ogDescription: "Terms of Service for Kingdom Solutions Business & AI™ products and advisory services including Clarity Pro™, Constance™, and Executive AI Strategy.",
    ogUrl: `${BASE_URL}/terms`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary",
    twitterTitle: "Terms of Service — Kingdom Solutions Business & AI™",
    twitterDescription: "Terms of Service for Kingdom Solutions Business & AI™ products and advisory services.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
   "/refund-policy": {
    title: "Refund Policy — Kingdom Solutions Business & AI™",
    description: "Refund policy for Kingdom Solutions Business & AI™ products including Clarity Pro™ Starter, Guided, and Buildout tiers. Clear terms for digital access, strategy sessions, and consultative services.",
    canonicalUrl: `${BASE_URL}/refund-policy`,
    ogTitle: "Refund Policy — Kingdom Solutions Business & AI™",
    ogDescription: "Refund policy for Kingdom Solutions Business & AI™ products including Clarity Pro™ Starter, Guided, and Buildout tiers.",
    ogUrl: `${BASE_URL}/refund-policy`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary",
    twitterTitle: "Refund Policy — Kingdom Solutions Business & AI™",
    twitterDescription: "Refund policy for Kingdom Solutions Business & AI™ products including Clarity Pro™ Starter, Guided, and Buildout tiers.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/handbook": {
    title: "The Right-Order Business Starter Handbook™ | Free Guide",
    description: "Get the free Right-Order Business Starter Handbook™ from Kingdom Solutions Business & AI™, a practical guide to building a clear, compliant, revenue-ready business without the overwhelm.",
    canonicalUrl: `${BASE_URL}/handbook`,
    ogTitle: "The Right-Order Business Starter Handbook™ | Kingdom Solutions Business & AI™",
    ogDescription: "A practical guide to the systems and sequence behind a clear, compliant, revenue-ready business.",
    ogUrl: `${BASE_URL}/handbook`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "The Right-Order Business Starter Handbook™ | Kingdom Solutions Business & AI™",
    twitterDescription: "A practical guide to the systems and sequence behind a clear, compliant, revenue-ready business.",
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
    title: "30-Day Business Fast Track™ | Build a Clear Offer & Client Path",
    description: "Business strategy for experienced women starting or refining a consulting or service business. Clarify your offer, message, and practical path to clients in 30 days.",
    canonicalUrl: `${BASE_URL}/business-fast-track`,
    ogTitle: "30-Day Business Fast Track™ | Build Your Business in the Right Order",
    ogDescription: "Business strategy for experienced women starting or refining a consulting or service business. Clarify your offer, message, and practical path to clients in 30 days.",
    ogUrl: `${BASE_URL}/business-fast-track`,
    ogType: "website",
    ogImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
    twitterCard: "summary_large_image",
    twitterTitle: "30-Day Business Fast Track™ | Build Your Business in the Right Order",
    twitterDescription: "Business strategy for experienced women starting or refining a consulting or service business. Clarify your offer, message, and practical path to clients in 30 days.",
    twitterImage: `${BASE_URL}/assets/ksai-logo-transparent-400_82fa1f46.png`,
  },
  "/victors-circle-leadership-academy": {
    title: "Victor's Circle Leadership Academy™ — Christ-Centered Leadership for Women | Kingdom Solutions Business & AI™",
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

  // Replace the homepage canonical from the shared template, rather than
  // emitting two canonical tags on inner pages.
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${canonical}" />`
  );

  // Keep private, token-gated viewing pages out of search results.
  if (path === "/video-experience/watch") {
    html = html.replace(/<\/head>/, '    <meta name="robots" content="noindex, nofollow" />\n  </head>');
  }

  // This is a real, publicly described paid service, not an inferred rating or review.
  if (path === "/business-fast-track") {
    const serviceJson = JSON.stringify(FAST_TRACK_STRUCTURED_DATA);
    html = html.replace(
      /<\/head>/,
      `    <script type="application/ld+json">${serviceJson}</script>\n  </head>`
    );
  }

  return html;
}
