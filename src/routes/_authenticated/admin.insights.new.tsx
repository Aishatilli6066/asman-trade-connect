import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminCreatePost } from "@/lib/posts.functions";
import { PostEditor, emptyPost } from "@/components/admin/PostEditor";

export const Route = createFileRoute("/_authenticated/admin/insights/new")({
  head: () => ({ meta: [{ title: "New post" }, { name: "robots", content: "noindex" }] }),
  component: NewPost,
});

function NewPost() {
  const create = useServerFn(adminCreatePost);
  const router = useRouter();

  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-24">
      <div className="container-x max-w-3xl">
        <Link to="/admin/insights" className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-burgundy)]">
          ← All posts
        </Link>
        <h1 className="mt-3 font-display text-3xl text-[var(--color-ink)]">New post</h1>

        <div className="mt-8 bg-white p-6 md:p-8 shadow-sm">
          <PostEditor
            initial={emptyPost}
            submitLabel="Create post"
            onSubmit={async (v) => {
              await create({
                data: {
                  ...v,
                  seo_title: v.seo_title || null,
                  meta_description: v.meta_description || null,
                  og_image_url: v.og_image_url || null,
                  canonical_url: v.canonical_url || null,
                  featured_image_path: v.featured_image_path,
                },
              });
              router.navigate({ to: "/admin/insights" });
            }}
          />
        </div>
      </div>
    </main>
  );
}