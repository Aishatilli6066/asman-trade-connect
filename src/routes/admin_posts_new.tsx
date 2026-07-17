import { createFileRoute } from "@tanstack/react-router";
import PostEditor from "@/components/admin/PostEditor";

export const Route = createFileRoute("/admin_posts_new")({});

function NewPostPage() {
  return <PostEditor />;
}

Route.component = NewPostPage;
