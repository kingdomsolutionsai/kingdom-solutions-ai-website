import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogType?: string;
  ogImage: string;
  twitterCard?: "summary" | "summary_large_image";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

/**
 * Sets document title, meta description, canonical URL, Open Graph tags,
 * and Twitter Card tags for SEO. Cleans up created elements on unmount
 * to prevent tag leakage between routes.
 */
export function usePageMeta({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogUrl,
  ogType = "website",
  ogImage,
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
}: PageMeta) {
  useEffect(() => {
    // Track elements we create so we can remove them on cleanup
    const createdElements: HTMLElement[] = [];

    // Title
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    } else {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      metaDesc.setAttribute("content", description);
      document.head.appendChild(metaDesc);
      createdElements.push(metaDesc);
    }

    // Canonical URL
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
      createdElements.push(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // Open Graph tags
    const ogTags: Record<string, string> = {
      "og:title": ogTitle || title,
      "og:description": ogDescription || description,
      "og:url": ogUrl || canonicalUrl,
      "og:type": ogType,
      "og:image": ogImage,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let el = document.querySelector(
        `meta[property="${property}"]`
      ) as HTMLMetaElement | null;
      if (el) {
        el.setAttribute("content", content);
      } else {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        el.setAttribute("content", content);
        document.head.appendChild(el);
        createdElements.push(el);
      }
    });

    // Twitter Card tags
    const twitterTags: Record<string, string> = {
      "twitter:card": twitterCard,
      "twitter:title": twitterTitle || ogTitle || title,
      "twitter:description": twitterDescription || ogDescription || description,
      "twitter:image": twitterImage || ogImage,
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let el = document.querySelector(
        `meta[name="${name}"]`
      ) as HTMLMetaElement | null;
      if (el) {
        el.setAttribute("content", content);
      } else {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        el.setAttribute("content", content);
        document.head.appendChild(el);
        createdElements.push(el);
      }
    });

    // Cleanup: remove elements we created, reset others to defaults
    return () => {
      createdElements.forEach((el) => el.remove());
      // Reset canonical if it was pre-existing (not created by us)
      if (!createdElements.includes(canonical as HTMLElement) && canonical) {
        canonical.removeAttribute("href");
      }
    };
  }, [
    title,
    description,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogUrl,
    ogType,
    ogImage,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
  ]);
}
