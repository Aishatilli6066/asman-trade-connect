import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { openConsultation } from "@/components/site/consultation-store";
import { Eyebrow, GoldButton } from "@/components/site/primitives";

export const Route = createFileRoute("/insights/$slug")({
  params: {
    parse: (params) => ({ slug: params.slug }),
  },
});

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  featuredImageAlt: string;
  publishedAt: string;
  readingTimeMinutes: number;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
}

interface RelatedPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
}

function ArticlePage() {
  const navigate = useNavigate();
  const { slug } = Route.useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
        fetchRelatedPosts(data.id);
      } else {
        navigate({ to: "/insights" });
      }
    } catch (error) {
      navigate({ to: "/insights" });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedPosts = async (postId: number) => {
    try {
      const res = await fetch(`/api/posts/related/${postId}`);
      if (res.ok) {
        setRelatedPosts(await res.json());
      }
    } catch (error) {
      // Silently fail
    }
  };

  const shareUrl = post ? `https://asmanprimehub.com/insights/${post.slug}` : "";
  const shareTitle = post?.title || "";

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <article className="bg-white">
        {/* Hero */}
        <div className="relative">
          <img
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            className="w-full h-[400px] md:h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="container-x py-16 md:py-24 max-w-3xl">
          <div className="mb-8">
            <Eyebrow>Article</Eyebrow>
            <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight mb-4">{post.title}</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-ink)]/60">
              <time dateTime={post.publishedAt}>{formatDate(new Date(post.publishedAt))}</time>
              <span>·</span>
              <span>{post.readingTimeMinutes} minute read</span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-wrap gap-3 mb-12 pb-12 border-b border-[var(--color-line)]">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"
              title="Share on Twitter"
            >
              <Twitter size={18} />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"
              title="Share on Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"
              title="Share on LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
              }}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
              title="Copy link"
            >
              <Share2 size={18} />
            </button>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none mb-16 text-[var(--color-ink)] leading-relaxed">
            {post.content.split('\n').map((paragraph, idx) => {
              if (!paragraph.trim()) return null;
              return (
                <p key={idx} className="mb-4 text-lg">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="bg-[var(--color-burgundy)] text-white rounded-lg p-8 md:p-12 mb-16">
            <h3 className="font-display text-2xl mb-4">Ready to explore trade opportunities?</h3>
            <p className="mb-6 text-white/80">
              Discuss your sourcing, export, or logistics needs with ASMAN Prime Hub.
            </p>
            <GoldButton onClick={openConsultation}>Book Consultation <ArrowRight size={14} /></GoldButton>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="bg-[var(--color-bone)] border-t border-[var(--color-line)]">
            <div className="container-x py-16 md:py-24">
              <h2 className="font-display text-3xl mb-12">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((related) => (
                  <Link key={related.id} to={`/insights/${related.slug}`} className="group">
                    <div className="relative overflow-hidden aspect-video mb-4">
                      <img
                        src={related.featuredImage}
                        alt={related.slug}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-display text-lg group-hover:text-[var(--color-burgundy)] transition">
                      {related.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}

Route.component = ArticlePage;
