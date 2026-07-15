import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { slugify, calculateReadingTime } from "@/lib/utils";

interface PostData {
  id?: number;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  featuredImageAlt: string;
  status: "draft" | "published";
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  canonicalUrl?: string;
}

interface PostEditorProps {
  postId?: number;
}

export default function PostEditor({ postId }: PostEditorProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(!!postId);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<PostData>({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    featuredImageAlt: "",
    status: "draft",
    seoTitle: "",
    seoDescription: "",
  });

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/admin/posts/${postId}`);
      if (res.ok) {
        const data = await res.json();
        setForm(data);
      }
    } catch (error) {
      toast.error("Failed to load post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...form,
        slug: slugify(form.title),
        readingTimeMinutes: calculateReadingTime(form.content),
      };

      const url = postId ? `/api/admin/posts/${postId}` : `/api/admin/posts`;
      const method = postId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(postId ? "Post updated" : "Post created");
        navigate({ to: "/admin/dashboard" });
      } else {
        toast.error("Failed to save post");
      }
    } catch (error) {
      toast.error("Save error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bone)] py-10">
      <div className="container-x max-w-4xl">
        <h1 className="font-display text-3xl mb-8">{postId ? "Edit Post" : "Create New Post"}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Excerpt *</label>
                <Textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Content *</label>
                <Textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  required
                  rows={10}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={form.status} onValueChange={(value: any) => setForm({ ...form, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Featured Image URL *</label>
                <Input
                  value={form.featuredImage}
                  onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Featured Image Alt Text *</label>
                <Input
                  value={form.featuredImageAlt}
                  onChange={(e) => setForm({ ...form, featuredImageAlt: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">OG Image URL</label>
                <Input
                  value={form.ogImage || ""}
                  onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">SEO Title *</label>
                <Input
                  value={form.seoTitle}
                  onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">SEO Description *</label>
                <Textarea
                  value={form.seoDescription}
                  onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Canonical URL</label>
                <Input
                  value={form.canonicalUrl || ""}
                  onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/admin/dashboard" })}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : postId ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
