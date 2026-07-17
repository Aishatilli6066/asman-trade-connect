import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminUploadImage } from "@/lib/posts.functions";

export type PostFormValues = {
  slug: string;
  title: string;
  excerpt: string;
  body_markdown: string;
  featured_image_path: string | null;
  seo_title: string;
  meta_description: string;
  og_image_url: string;
  canonical_url: string;
  published: boolean;
};

export function PostEditor({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial: PostFormValues;
  submitLabel: string;
  onSubmit: (v: PostFormValues) => Promise<void>;
}) {
  const [v, setV] = useState<PostFormValues>(initial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const upload = useServerFn(adminUploadImage);

  const set = <K extends keyof PostFormValues>(k: K, val: PostFormValues[K]) =>
    setV((s) => ({ ...s, [k]: val }));

  const handleFile = async (file: File) => {
    if (!file) return;
    if (file.size > 8_000_000) { setError("Image is too large (max 8MB)."); return; }
    setUploading(true);
    setError(null);
    try {
      const buf = new Uint8Array(await file.arrayBuffer());
      let bin = "";
      for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i]);
      const base64 = btoa(bin);
      const res = await upload({
        data: { filename: file.name, contentType: file.type, base64 },
      });
      set("featured_image_path", res.path);
    } catch (e: any) {
      setError(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await onSubmit(v);
    } catch (e: any) {
      setError(e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const imgPreview = v.featured_image_path
    ? `/api/public/insights/media/${v.featured_image_path}`
    : null;

  const F = "w-full border border-neutral-300 px-3 py-3 text-base focus:outline-none focus:border-[var(--color-burgundy)]";
  const L = "text-[11px] uppercase tracking-[0.2em] text-neutral-600";

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={L}>Title</label>
          <input required maxLength={200} value={v.title} onChange={(e) => set("title", e.target.value)} className={"mt-1 " + F} />
        </div>
        <div>
          <label className={L}>Slug (URL)</label>
          <input
            required
            maxLength={120}
            pattern="^[a-z0-9-]+$"
            placeholder="e.g. hibiscus-export-guide"
            value={v.slug}
            onChange={(e) => set("slug", e.target.value.toLowerCase())}
            className={"mt-1 " + F}
          />
        </div>
      </div>

      <div>
        <label className={L}>Excerpt (short summary)</label>
        <textarea maxLength={500} rows={2} value={v.excerpt} onChange={(e) => set("excerpt", e.target.value)} className={"mt-1 " + F} />
      </div>

      <div>
        <label className={L}>Featured image</label>
        <div className="mt-1 flex flex-col gap-3">
          {imgPreview && <img src={imgPreview} alt="preview" className="max-h-56 object-cover" />}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="text-sm"
          />
          {uploading && <p className="text-xs text-neutral-500">Uploading…</p>}
          {v.featured_image_path && (
            <button
              type="button"
              onClick={() => set("featured_image_path", null)}
              className="text-xs text-[var(--color-burgundy)] self-start"
            >
              Remove image
            </button>
          )}
        </div>
      </div>

      <div>
        <label className={L}>Body (Markdown)</label>
        <textarea
          rows={16}
          maxLength={50000}
          value={v.body_markdown}
          onChange={(e) => set("body_markdown", e.target.value)}
          className={"mt-1 font-mono text-sm " + F}
          placeholder={"# Heading\n\nWrite your post here. **bold**, *italic*, - lists"}
        />
      </div>

      <details className="border border-neutral-200 p-4">
        <summary className="cursor-pointer text-[11px] uppercase tracking-[0.22em] text-neutral-700">
          SEO (optional)
        </summary>
        <div className="mt-4 grid gap-4">
          <div>
            <label className={L}>SEO title (fallback: post title)</label>
            <input maxLength={200} value={v.seo_title} onChange={(e) => set("seo_title", e.target.value)} className={"mt-1 " + F} />
          </div>
          <div>
            <label className={L}>Meta description (fallback: excerpt)</label>
            <textarea maxLength={500} rows={2} value={v.meta_description} onChange={(e) => set("meta_description", e.target.value)} className={"mt-1 " + F} />
          </div>
          <div>
            <label className={L}>OG image URL (fallback: featured image)</label>
            <input maxLength={1000} value={v.og_image_url} onChange={(e) => set("og_image_url", e.target.value)} className={"mt-1 " + F} />
          </div>
          <div>
            <label className={L}>Canonical URL (optional)</label>
            <input maxLength={1000} value={v.canonical_url} onChange={(e) => set("canonical_url", e.target.value)} className={"mt-1 " + F} />
          </div>
        </div>
      </details>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={v.published}
          onChange={(e) => set("published", e.target.checked)}
          className="h-5 w-5"
        />
        <span className="text-sm">Published (visible on the public site)</span>
      </label>

      {error && <p className="text-sm text-[var(--color-burgundy)]">{error}</p>}

      <button
        type="submit"
        disabled={saving || uploading}
        className="bg-[var(--color-burgundy)] text-white px-6 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold disabled:opacity-60"
      >
        {saving ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

export const emptyPost: PostFormValues = {
  slug: "",
  title: "",
  excerpt: "",
  body_markdown: "",
  featured_image_path: null,
  seo_title: "",
  meta_description: "",
  og_image_url: "",
  canonical_url: "",
  published: false,
};