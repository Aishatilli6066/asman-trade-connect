import { createFileRoute, Link } from "@tanstack/react-router";
import { listPublishedPosts } from "@/lib/posts.functions";

export const Route = createFileRoute("/insights")({
  loader: () => listPublishedPosts(),
  head: () => ({
    meta: [
      { title: "Insights — ASMAN Prime Hub" },
      { name: "description", content: "Trade, sourcing and agricultural export insights from ASMAN Prime Hub." },
      { property: "og:title", content: "Insights — ASMAN Prime Hub" },
      { property: "og:description", content: "Trade, sourcing and agricultural export insights from ASMAN Prime Hub." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://asman-trade-connect.lovable.app/insights" },
    ],
    links: [{ rel: "canonical", href: "https://asman-trade-connect.lovable.app/insights" }],
  }),
  errorComponent: () => <div className="pt-32 pb-24 container-x">Failed to load insights.</div>,
  notFoundComponent: () => <div className="pt-32 pb-24 container-x">Not found.</div>,
  component: InsightsList,
});

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function imgUrl(path: string | null) {
  if (!path) return null;
  return `/api/public/insights/media/${path}`;
}

function InsightsList() {
  const posts = Route.useLoaderData();

  return (
    <main className="bg-[var(--color-bone,#faf8f4)] min-h-screen">
      <section className="pt-32 pb-16 bg-[var(--color-burgundy)] text-white">
        <div className="container-x">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-gold)]">Insights</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Trade & Sourcing Insights</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Field notes on global sourcing, agricultural export, freight coordination, and the Nigerian trade landscape.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x">
          {posts.length === 0 ? (
            <p className="text-neutral-600">No posts yet. Check back soon.</p>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: any) => (
                <article key={post.id} className="bg-white shadow-sm flex flex-col overflow-hidden">
                  <div className="aspect-[16/10] bg-neutral-100 overflow-hidden">
                    {imgUrl(post.featured_image_path) ? (
                      <img
                        src={imgUrl(post.featured_image_path)!}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--color-burgundy)] to-[var(--color-ink)]" />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                      {formatDate(post.published_at)}
                    </p>
                    <h2 className="mt-2 font-display text-xl text-[var(--color-ink)] leading-snug">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm text-neutral-700 leading-relaxed flex-1">{post.excerpt}</p>
                    <Link
                      to="/insights/$slug"
                      params={{ slug: post.slug }}
                      className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--color-burgundy)] hover:text-[var(--color-ink)]"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}