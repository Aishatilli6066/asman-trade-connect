import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminCreatePost, checkAdminSession } from "@/lib/posts.server";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PostForm } from "@/components/admin/PostForm";
import type { PostFormValues } from "@/components/admin/PostForm";

export const Route = createFileRoute("/admin/insights/new")({
  loader: async () => {
    const isAuth = await checkAdminSession();
    if (!isAuth) throw redirect({ to: "/admin/login" });
    return null;
  },
  component: NewPostPage,
});

function NewPostPage() {
  const navigate = useNavigate();
  const createFn = useServerFn(adminCreatePost);

  async function handleSubmit(values: PostFormValues) {
    await createFn({ data: values });
    navigate({ to: "/admin/insights" });
  }

  return (
    <AdminLayout title="New Post">
      <div className="max-w-2xl">
        <PostForm onSubmit={handleSubmit} submitLabel="Create Post" />
      </div>
    </AdminLayout>
  );
}
