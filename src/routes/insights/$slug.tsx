import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getPostBySlug } from "@/lib/posts.server";
import { Calendar, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/insights/$slug")({
  loader: async ({ params }) => {
    const post = await getPostBySlug({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData: post }) => ({
    meta: [
      { title: post?.seo_title || post?.title || "Insights | ASMAN Prime Hub" },
      { name: "description", content: post?.seo_description || post?.excerpt || "" },
      { property: "og:title", content: post?.seo_title || post?.title || "" },
      { property: "og:description", content: post?.seo_description || post?.excerpt || "" },
      { property: "og:image", content: post?.og_image || post?.featured_image || "https://asmanprimehub.com/logo.png" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: post?.canonical_url || `https://asmanprimehub.com/insights/${post?.slug}` },
      { property: "og:site_name", content: "ASMAN Prime Hub" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: post?.seo_title || post?.title || "" },
      { name: "twitter:description", content: post?.seo_description || post?.excerpt || "" },
      { name: "twitter:image", content: post?.og_image || post?.featured_image || "https://asmanprimehub.com/logo.png" },
    ],
    links: post?.canonical_url
      ? [{ rel: "canonical", href: post.canonical_url }]
      : [],
  }),
  component: PostPage,
});

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function PostPage() {
  const post = Route.useLoaderData();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--color-burgundy)] pt-36 pb-16">
        <div className="container-x max-w-3xl">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--color-gold)]/70 hover:text-[var(--color-gold)] transition-colors mb-8"
          >
            <ArrowLeft size={12} /> All Insights
          </Link>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--color-gold)] mb-5">
            <Calendar size={11} />
            <span>{formatDate(post.published_at)}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
            {post.title}
          </h1>
          <p className="mt-5 text-white/65 text-base leading-relaxed max-w-2xl">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Featured image */}
      {post.featured_image && (
        <div className="bg-[var(--color-linen)]">
          <div className="container-x max-w-3xl">
            <div className="aspect-[16/7] overflow-hidden -mt-0">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Body */}
      <section className="bg-[var(--color-linen)] py-16">
        <div className="container-x max-w-3xl">
          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-[var(--color-sand)]">
            <p className="text-sm text-[var(--color-ink)]/60 mb-4">
              Ready to discuss your trade or sourcing requirements?
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--color-burgundy)] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[var(--color-burgundy-deep)] transition-colors"
              >
                Submit an Inquiry
              </Link>
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--color-burgundy)] text-[var(--color-burgundy)] text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[var(--color-burgundy)] hover:text-white transition-colors"
              >
                More Insights
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
