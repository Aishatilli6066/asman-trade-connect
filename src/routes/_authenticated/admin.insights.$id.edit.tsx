import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { adminGetPost, adminUpdatePost } from "@/lib/posts.functions";
import { PostEditor, type PostFormValues } from "@/components/admin/PostEditor";

export const Route = createFileRoute("/_authenticated/admin/insights/$id/edit")({
  head: () => ({ meta: [{ title: "Edit post" }, { name: "robots", content: "noindex" }] }),
  component: EditPost,
});

function EditPost() {
  const { id } = Route.useParams();
  const get = useServerFn(adminGetPost);
  const update = useServerFn(adminUpdatePost);
  const router = useRouter();
  const [initial, setInitial] = useState<PostFormValues | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    get({ data: { id } })
      .then((p: any) => {
        setInitial({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt || "",
          body_markdown: p.body_markdown || "",
          featured_image_path: p.featured_image_path,
          seo_title: p.seo_title || "",
          meta_description: p.meta_description || "",
          og_image_url: p.og_image_url || "",
          canonical_url: p.canonical_url || "",
          published: !!p.published,
        });
      })
      .catch((e) => setErr(e?.message || "Failed to load"));
  }, [id]);

  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-24">
      <div className="container-x max-w-3xl">
        <Link to="/admin/insights" className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-burgundy)]">
          ← All posts
        </Link>
        <h1 className="mt-3 font-display text-3xl text-[var(--color-ink)]">Edit post</h1>

        {err && <p className="mt-6 text-sm text-[var(--color-burgundy)]">{err}</p>}
        {!initial && !err && <p className="mt-6 text-sm text-neutral-600">Loading…</p>}

        {initial && (
          <div className="mt-8 bg-white p-6 md:p-8 shadow-sm">
            <PostEditor
              initial={initial}
              submitLabel="Save changes"
              onSubmit={async (v) => {
                await update({
                  data: {
                    id,
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
        )}
      </div>
    </main>
  );
}