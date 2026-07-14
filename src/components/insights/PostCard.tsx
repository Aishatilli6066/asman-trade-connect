import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import type { Post } from "@/lib/posts.server";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col bg-white border border-[var(--color-sand)] hover:border-[var(--color-gold)] transition-colors duration-300">
      {post.featured_image && (
        <Link to="/insights/$slug" params={{ slug: post.slug }}>
          <div className="aspect-[16/9] overflow-hidden bg-[var(--color-sand)]">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </Link>
      )}
      <div className="flex flex-col flex-1 p-7">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--color-burgundy)] mb-4">
          <Calendar size={11} />
          <span>{formatDate(post.published_at)}</span>
        </div>
        <h2 className="font-display text-xl font-medium text-[var(--color-ink)] leading-snug mb-3">
          <Link
            to="/insights/$slug"
            params={{ slug: post.slug }}
            className="hover:text-[var(--color-burgundy)] transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-sm text-[var(--color-ink)]/65 leading-relaxed flex-1 mb-5">
          {post.excerpt}
        </p>
        <Link
          to="/insights/$slug"
          params={{ slug: post.slug }}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--color-burgundy)] hover:text-[var(--color-gold)] transition-colors"
        >
          Read More <ArrowRight size={12} />
        </Link>
      </div>
    </article>
  );
}
