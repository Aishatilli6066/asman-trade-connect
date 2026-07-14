import { createFileRoute, redirect, useNavigate, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminGetPost, adminUpdatePost, checkAdminSession } from "@/lib/posts.server";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PostForm } from "@/components/admin/PostForm";
import type { PostFormValues } from "@/components/admin/PostForm";

export const Route = createFileRoute("/admin/insights/$id/edit")({
  loader: async ({ params }) => {
    const isAuth = await checkAdminSession();
    if (!isAuth) throw redirect({ to: "/admin/login" });
    const post = await adminGetPost({ data: { id: params.id } });
    if (!post) throw notFound();
    return post;
  },
  component: EditPostPage,
});

function EditPostPage() {
  const post = Route.useLoaderData();
  const navigate = useNavigate();
  const updateFn = useServerFn(adminUpdatePost);

  async function handleSubmit(values: PostFormValues) {
    await updateFn({ data: { ...values, id: post.id } });
    navigate({ to: "/admin/insights" });
  }

  return (
    <AdminLayout title="Edit Post">
      <div className="max-w-2xl">
        <PostForm
          initialValues={{
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            body: post.body,
            featured_image: post.featured_image,
            status: post.status,
            seo_title: post.seo_title,
            seo_description: post.seo_description,
            og_image: post.og_image,
            canonical_url: post.canonical_url,
          }}
          onSubmit={handleSubmit}
          submitLabel="Update Post"
        />
      </div>
    </AdminLayout>
  );
}
