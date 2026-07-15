import { createFileRoute } from "@tanstack/react-router";
import PostEditor from "@/components/admin/PostEditor";

export const Route = createFileRoute("/admin/posts/$id/edit")({
  params: {
    parse: (params) => ({ id: parseInt(params.id) }),
    stringify: (params) => ({ id: String(params.id) }),
  },
});

function EditPostPage() {
  const { id } = Route.useParams();
  return <PostEditor postId={id} />;
}

Route.component = EditPostPage;
