import { createFileRoute } from "@tanstack/react-router";
import PostEditor from "@/components/admin/PostEditor";

export const Route = createFileRoute("/admin/posts/new")({});

function NewPostPage() {
  return <PostEditor />;
}

Route.component = NewPostPage;
