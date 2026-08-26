/** Single source of truth for the canonical production origin. */
export const SITE_URL = "https://asmanprimehub.com";

export const canonical = (path = "/") =>
  `${SITE_URL}${path === "/" ? "/" : path.replace(/\/$/, "")}`;

export const OG_IMAGE = `${SITE_URL}/logo.png`;

type MetaEntry = Record<string, string>;

/** Builds a complete, self-referencing metadata block for a public page. */
export function pageHead(opts: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
}) {
  const url = canonical(opts.path);
  const image = opts.image ?? OG_IMAGE;
  const meta: MetaEntry[] = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:url", content: url },
    { property: "og:type", content: opts.type ?? "website" },
    { property: "og:site_name", content: "ASMAN Prime Hub" },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
    { name: "twitter:image", content: image },
  ];
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}

export const NOINDEX = { name: "robots", content: "noindex, nofollow" };

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: canonical(it.path),
    })),
  };
}

export function serviceLd(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: canonical(opts.path),
    serviceType: opts.name,
    areaServed: "Worldwide",
    provider: { "@id": `${SITE_URL}/#organization` },
  };
}
