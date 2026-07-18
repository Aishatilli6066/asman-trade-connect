import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPublishedPost } from "@/lib/posts.functions";
import { getStaticPostBySlug } from "@/lib/static-posts";

const SITE_URL = "https://asman-trade-connect.lovable.app";

export const Route = createFileRoute("/insights/$slug")({
  loader: async ({ params }) => {
    const staticPost = getStaticPostBySlug(params.slug);
    if (staticPost) {
      return {
        title: staticPost.title,
        excerpt: staticPost.excerpt,
        body_markdown: staticPost.body_markdown,
        featured_image_path: null,
        featured_image_url: staticPost.featured_image_url,
        seo_title: staticPost.seo_title,
        meta_description: staticPost.meta_description,
        og_image_url: staticPost.og_image_url,
        canonical_url: staticPost.canonical_url,
        published_at: staticPost.published_at,
      };
    }
    try {
      const post = await getPublishedPost({ data: { slug: params.slug } });
      if (!post) throw notFound();
      return { ...post, featured_image_url: null };
    } catch (e) {
      throw notFound();
    }
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — ASMAN Prime Hub" }, { name: "robots", content: "noindex" }] };
    }
    const canonical = loaderData.canonical_url || `${SITE_URL}/insights/${params.slug}`;
    const title = loaderData.seo_title || `${loaderData.title} — ASMAN Prime Hub`;
    const desc = loaderData.meta_description || loaderData.excerpt || "";
    const ogImage =
      loaderData.og_image_url ||
      (loaderData.featured_image_url
        ? (loaderData.featured_image_url.startsWith("http")
            ? loaderData.featured_image_url
            : `${SITE_URL}${loaderData.featured_image_url}`)
        : loaderData.featured_image_path
          ? `${SITE_URL}/api/public/insights/media/${loaderData.featured_image_path}`
          : undefined);
    const meta: Array<Record<string, string>> = [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "article" },
      { property: "og:url", content: canonical },
    ];
    if (ogImage) {
      meta.push({ property: "og:image", content: ogImage });
      meta.push({ name: "twitter:card", content: "summary_large_image" });
      meta.push({ name: "twitter:image", content: ogImage });
    }
    return {
      meta,
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.title,
            description: desc,
            image: ogImage,
            datePublished: loaderData.published_at,
            mainEntityOfPage: canonical,
            author: { "@type": "Organization", name: "ASMAN Prime Hub" },
            publisher: { "@type": "Organization", name: "ASMAN Prime Hub" },
          }),
        },
      ],
    };
  },
  errorComponent: () => <div className="pt-32 pb-24 container-x">Failed to load post.</div>,
  notFoundComponent: () => (
    <div className="pt-32 pb-24 container-x">
      <p className="text-neutral-600">This post is not available.</p>
      <Link to="/insights" className="mt-4 inline-block text-[var(--color-burgundy)] underline">
        ← Back to Insights
      </Link>
    </div>
  ),
  component: PostView,
});

function renderMarkdown(md: string): string {
  // Minimal markdown-to-HTML: headings, bold, italic, lists, paragraphs, line breaks. No HTML in input allowed.
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = esc(md).split(/\r?\n/);
  const out: string[] = [];
  let inUl = false;
  let inOl = false;
  const flush = () => {
    if (inUl) { out.push("</ul>"); inUl = false; }
    if (inOl) { out.push("</ol>"); inOl = false; }
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { flush(); continue; }
    let m;
    if ((m = line.match(/^(#{1,4})\s+(.*)$/))) {
      flush();
      const lvl = m[1].length;
      out.push(`<h${lvl}>${inline(m[2])}</h${lvl}>`);
      continue;
    }
    if ((m = line.match(/^\s*[-*]\s+(.*)$/))) {
      if (!inUl) { flush(); out.push("<ul>"); inUl = true; }
      out.push(`<li>${inline(m[1])}</li>`);
      continue;
    }
    if ((m = line.match(/^\s*\d+\.\s+(.*)$/))) {
      if (!inOl) { flush(); out.push("<ol>"); inOl = true; }
      out.push(`<li>${inline(m[1])}</li>`);
      continue;
    }
    flush();
    out.push(`<p>${inline(line)}</p>`);
  }
  flush();
  return out.join("\n");
}
function inline(s: string) {
  return s
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function PostView() {
  const post = Route.useLoaderData();
  const heroImg =
    (post as any).featured_image_url ||
    (post.featured_image_path ? `/api/public/insights/media/${post.featured_image_path}` : null);

  return (
    <main className="bg-white min-h-screen">
      <article>
        <header className="pt-32 pb-10 bg-[var(--color-burgundy)] text-white">
          <div className="container-x max-w-4xl">
            <Link
              to="/insights"
              className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-gold)] hover:text-white"
            >
              ← Insights
            </Link>
            <h1 className="mt-4 font-display text-3xl md:text-5xl leading-tight">{post.title}</h1>
            <p className="mt-4 text-sm text-white/70">{formatDate(post.published_at)}</p>
          </div>
        </header>

        {heroImg && (
          <div className="container-x max-w-4xl -mt-6 mb-10">
            <img src={heroImg} alt={post.title} className="w-full aspect-[16/9] object-cover shadow-xl" />
          </div>
        )}

        <div className="container-x max-w-3xl pb-24">
          {post.excerpt && (
            <p className="text-lg text-neutral-700 leading-relaxed font-display italic border-l-4 border-[var(--color-gold)] pl-4 mb-8">
              {post.excerpt}
            </p>
          )}
          <div
            className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:text-[var(--color-ink)] prose-a:text-[var(--color-burgundy)]"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body_markdown || "") }}
          />
        </div>
      </article>
    </main>
  );
}