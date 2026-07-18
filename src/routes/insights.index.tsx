import { createFileRoute, Link } from "@tanstack/react-router";
import { listPublishedPosts } from "@/lib/posts.functions";
import { STATIC_POSTS } from "@/lib/static-posts";

export const Route = createFileRoute("/insights/")({
  loader: async () => {
    let dbPosts: any[] = [];
    try {
      dbPosts = (await listPublishedPosts()) as any[];
    } catch {
      dbPosts = [];
    }
    const staticAsListItems = STATIC_POSTS.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      featured_image_path: null,
      featured_image_url: p.featured_image_url,
      published_at: p.published_at,
    }));
    const seen = new Set(staticAsListItems.map((p) => p.slug));
    const merged = [
      ...staticAsListItems,
      ...dbPosts.filter((p: any) => !seen.has(p.slug)),
    ];
    merged.sort(
      (a, b) => new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime(),
    );
    return merged;
  },
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

function imgUrl(post: any): string | null {
  if (post.featured_image_url) return post.featured_image_url;
  if (post.featured_image_path) return `/api/public/insights/media/${post.featured_image_path}`;
  return null;
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
                <Link
                  key={post.id}
                  to="/insights/$slug"
                  params={{ slug: post.slug }}
                  className="group bg-white shadow-sm flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[16/10] bg-neutral-100 overflow-hidden">
                    {imgUrl(post) ? (
                      <img
                        src={imgUrl(post)!}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--color-burgundy)] group-hover:text-[var(--color-ink)]">
                      Read more →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}