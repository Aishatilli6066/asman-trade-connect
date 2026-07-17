import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2, LogOut } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/admin_dashboard")({
  head: () => ({
    meta: [{ title: "Admin Dashboard | ASMAN Prime Hub" }],
  }),
});

interface Post {
  id: number;
  title: string;
  slug: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/posts");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else if (res.status === 401) {
        navigate({ to: "/admin/login" });
      }
    } catch (error) {
      toast.error("Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Post deleted");
        fetchPosts();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bone)]">
      <div className="container-x py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-display text-3xl">Blog Admin</h1>
          <div className="flex gap-3">
            <Link to="/admin/posts/new">
              <Button className="gap-2">
                <Plus size={16} /> New Post
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
            <CardDescription>{posts.length} post{posts.length !== 1 ? 's' : ''}</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center py-8">Loading...</p>
            ) : posts.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No posts yet. Create your first post!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Title</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Published</th>
                      <th className="text-left p-3 font-medium">Created</th>
                      <th className="text-right p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{post.title}</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            post.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="p-3">{post.publishedAt ? formatDate(new Date(post.publishedAt)) : "-"}</td>
                        <td className="p-3">{formatDate(new Date(post.createdAt))}</td>
                        <td className="p-3 text-right space-x-2">
                          <Link to={`/admin/posts/${post.id}/edit`}>
                            <Button variant="ghost" size="sm" className="gap-2 inline-flex">
                              <Edit2 size={14} /> Edit
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 hover:text-red-700 gap-2"
                          >
                            <Trash2 size={14} /> Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

Route.component = AdminDashboard;
