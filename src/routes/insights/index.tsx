import { createFileRoute, Link } from "@tanstack/react-router";
import { getPublishedPosts } from "@/lib/posts.server";
import { PostCard } from "@/components/insights/PostCard";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights | ASMAN Prime Hub" },
      { name: "description", content: "Trade insights, export guides, and global sourcing perspectives from the ASMAN Prime Hub team." },
      { property: "og:title", content: "Insights | ASMAN Prime Hub" },
      { property: "og:description", content: "Trade insights, export guides, and global sourcing perspectives from the ASMAN Prime Hub team." },
      { property: "og:url", content: "https://asmanprimehub.com/insights" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://asmanprimehub.com/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Insights | ASMAN Prime Hub" },
      { name: "twitter:image", content: "https://asmanprimehub.com/logo.png" },
      { rel: "canonical", href: "https://asmanprimehub.com/insights" },
    ],
  }),
  loader: () => getPublishedPosts(),
  component: InsightsPage,
});

function InsightsPage() {
  const posts = Route.useLoaderData();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--color-burgundy)] pt-36 pb-20">
        <div className="container-x">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[var(--color-gold)]" />
            <span className="text-[11px] uppercase tracking-[0.32em] text-[var(--color-gold)]">
              Insights
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-medium text-white leading-tight max-w-xl">
            Trade Intelligence,{" "}
            <span className="italic text-[var(--color-gold-soft)]">Delivered.</span>
          </h1>
          <p className="mt-5 text-white/65 text-base max-w-lg leading-relaxed">
            Perspectives on global sourcing, export markets, and international
            trade from the ASMAN Prime Hub team.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-[var(--color-linen)] py-20">
        <div className="container-x">
          {posts.length === 0 ? (
            <p className="text-[var(--color-ink)]/50 text-center py-20">
              No posts published yet. Check back soon.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
