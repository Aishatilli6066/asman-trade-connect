import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { GoldButton, SectionHeader, Eyebrow } from "@/components/site/primitives";
import { formatDate, truncateText } from "@/lib/utils";

export const Route = createFileRoute("/insights")({});

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  publishedAt: string;
  readingTimeMinutes: number;
  seoTitle: string;
  seoDescription: string;
}

function InsightsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts?status=published&limit=12");
      if (res.ok) {
        setPosts(await res.json());
      }
    } catch (error) {
      console.error("Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="relative bg-[var(--color-burgundy)] text-white pt-40 pb-24">
        <div className="container-x">
          <Eyebrow dark>Insights</Eyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-7xl leading-[1.02] max-w-4xl">
            Trade insights <span className="italic text-[var(--color-gold)] font-normal">&amp; industry news.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-white/70 text-lg leading-relaxed">
            Stay informed with the latest updates on global sourcing, export opportunities, and international trade.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x py-24 md:py-32">
          {isLoading ? (
            <p className="text-center py-12">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-center py-12 text-muted-foreground">No posts published yet.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="group">
                  <div className="relative overflow-hidden bg-[var(--color-bone)] aspect-video mb-4">
                    <img
                      src={post.featuredImage}
                      alt={post.featuredImageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-burgundy)] mb-2">
                    {formatDate(new Date(post.publishedAt))} · {post.readingTimeMinutes} min read
                  </div>
                  <h3 className="font-display text-lg mb-2 group-hover:text-[var(--color-burgundy)] transition">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--color-ink)]/70 mb-4 leading-relaxed">
                    {truncateText(post.excerpt, 120)}
                  </p>
                  <Link to={`/insights/${post.slug}`}>
                    <span className="text-sm font-medium text-[var(--color-burgundy)] hover:text-[var(--color-burgundy)]/80 flex items-center gap-2">
                      Read More <ArrowRight size={14} />
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

Route.component = InsightsPage;
