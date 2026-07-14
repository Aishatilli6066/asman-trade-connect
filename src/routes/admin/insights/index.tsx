import { createFileRoute, redirect, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminGetPosts, adminDeletePost, checkAdminSession } from "@/lib/posts.server";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PenSquare, Trash2, Plus, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/admin/insights/")({
  loader: async () => {
    const isAuth = await checkAdminSession();
    if (!isAuth) throw redirect({ to: "/admin/login" });
    return adminGetPosts();
  },
  component: AdminPostsPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function AdminPostsPage() {
  const posts = Route.useLoaderData();
  const router = useRouter();
  const deleteFn = useServerFn(adminDeletePost);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteFn({ data: { id } });
      router.invalidate();
    } catch {
      alert("Delete failed. Please try again.");
    }
  }

  return (
    <AdminLayout title="Insights Posts">
      {/* New post button */}
      <div className="flex justify-end mb-6">
        <Link
          to="/admin/insights/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-burgundy)] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[var(--color-burgundy-deep)] transition-colors rounded-lg"
        >
          <Plus size={15} /> New Post
        </Link>
      </div>

      {/* Post list */}
      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="mb-4">No posts yet.</p>
          <Link to="/admin/insights/new" className="text-[var(--color-burgundy)] underline text-sm">
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              {/* Image thumbnail */}
              {post.featured_image && (
                <div className="shrink-0 h-16 w-24 rounded-lg overflow-hidden bg-gray-100 hidden sm:block">
                  <img
                    src={post.featured_image}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                  />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-medium ${
                      post.status === "published"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {post.status === "published" ? <Eye size={9} /> : <EyeOff size={9} />}
                    {post.status}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {post.status === "published" && post.published_at
                      ? formatDate(post.published_at)
                      : `Created ${formatDate(post.created_at)}`}
                  </span>
                </div>
                <h3 className="font-medium text-[var(--color-ink)] text-sm leading-snug line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{post.excerpt}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {post.status === "published" && (
                  <a
                    href={`/insights/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-gray-200 text-gray-400 hover:text-[var(--color-burgundy)] hover:border-[var(--color-burgundy)] transition-colors"
                    title="View post"
                  >
                    <Eye size={15} />
                  </a>
                )}
                <Link
                  to="/admin/insights/$id/edit"
                  params={{ id: post.id }}
                  className="p-2.5 rounded-lg border border-gray-200 text-gray-400 hover:text-[var(--color-burgundy)] hover:border-[var(--color-burgundy)] transition-colors"
                  title="Edit post"
                >
                  <PenSquare size={15} />
                </Link>
                <button
                  onClick={() => handleDelete(post.id, post.title)}
                  className="p-2.5 rounded-lg border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-300 transition-colors"
                  title="Delete post"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
