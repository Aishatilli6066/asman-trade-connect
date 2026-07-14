import { useState, useRef } from "react";
import { Loader2, Eye, EyeOff, Upload } from "lucide-react";

export interface PostFormValues {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  featured_image: string;
  status: "draft" | "published";
  seo_title: string;
  seo_description: string;
  og_image: string;
  canonical_url: string;
}

interface PostFormProps {
  initialValues?: Partial<PostFormValues>;
  onSubmit: (values: PostFormValues) => Promise<void>;
  submitLabel?: string;
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .slice(0, 80);
}

const defaults: PostFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  featured_image: "",
  status: "draft",
  seo_title: "",
  seo_description: "",
  og_image: "",
  canonical_url: "",
};

export function PostForm({ initialValues, onSubmit, submitLabel = "Save Post" }: PostFormProps) {
  const [values, setValues] = useState<PostFormValues>({ ...defaults, ...initialValues });
  const [slugManual, setSlugManual] = useState(!!initialValues?.slug);
  const [showSeo, setShowSeo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof PostFormValues>(key: K, val: PostFormValues[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    set("title", title);
    if (!slugManual) set("slug", generateSlug(title));
    if (!values.seo_title) set("seo_title", title);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2 MB. Use an external URL for larger images.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      set("featured_image", result);
      if (!values.og_image) set("og_image", result);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!values.title.trim()) return setError("Title is required.");
    if (!values.slug.trim()) return setError("Slug is required.");
    if (!values.excerpt.trim()) return setError("Excerpt is required.");
    setLoading(true);
    try {
      await onSubmit(values);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[var(--color-ink)] bg-white focus:outline-none focus:border-[var(--color-burgundy)] transition-colors";
  const labelCls = "block text-[11px] uppercase tracking-widest text-gray-500 font-medium mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className={labelCls}>Title *</label>
        <input className={inputCls} value={values.title} onChange={handleTitle} placeholder="Post title" />
      </div>

      {/* Slug */}
      <div>
        <label className={labelCls}>Slug *</label>
        <input
          className={inputCls + " font-mono text-xs"}
          value={values.slug}
          onChange={(e) => { setSlugManual(true); set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")); }}
          placeholder="url-friendly-slug"
        />
        <p className="text-[11px] text-gray-400 mt-1">Only lowercase letters, numbers, and hyphens.</p>
      </div>

      {/* Excerpt */}
      <div>
        <label className={labelCls}>Excerpt * <span className="normal-case text-gray-400 tracking-normal">({values.excerpt.length}/300)</span></label>
        <textarea
          className={inputCls + " resize-none"}
          rows={3}
          maxLength={300}
          value={values.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          placeholder="A short summary shown on the Insights listing page…"
        />
      </div>

      {/* Featured image */}
      <div>
        <label className={labelCls}>Featured Image</label>
        <div className="flex gap-2">
          <input
            className={inputCls}
            value={values.featured_image.startsWith("data:") ? "(uploaded file)" : values.featured_image}
            onChange={(e) => set("featured_image", e.target.value)}
            placeholder="https://… or upload a file →"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="shrink-0 flex items-center gap-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-[var(--color-burgundy)] transition-colors bg-white"
          >
            <Upload size={14} /> Upload
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        {values.featured_image && (
          <img
            src={values.featured_image}
            alt="preview"
            className="mt-3 h-40 w-full object-cover rounded-lg border border-gray-100"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
          />
        )}
      </div>

      {/* Body */}
      <div>
        <label className={labelCls}>Body Content (HTML supported)</label>
        <textarea
          className={inputCls + " resize-y font-mono text-xs leading-relaxed"}
          rows={16}
          value={values.body}
          onChange={(e) => set("body", e.target.value)}
          placeholder={"<p>Your content here…</p>\n<h2>Section heading</h2>\n<p>More content.</p>\n<ul>\n  <li>List item</li>\n</ul>"}
        />
        <p className="text-[11px] text-gray-400 mt-1">Use HTML tags: &lt;p&gt; &lt;h2&gt; &lt;strong&gt; &lt;em&gt; &lt;ul&gt; &lt;li&gt;</p>
      </div>

      {/* Status */}
      <div>
        <label className={labelCls}>Status</label>
        <div className="flex gap-3">
          {(["draft", "published"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => set("status", s)}
              className={`flex-1 py-3 text-sm font-medium rounded-lg border transition-colors ${
                values.status === s
                  ? s === "published"
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-[var(--color-burgundy)] border-[var(--color-burgundy)] text-white"
                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* SEO section */}
      <div className="border border-gray-100 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowSeo((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-[var(--color-ink)] bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          SEO Settings
          {showSeo ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
        {showSeo && (
          <div className="p-5 space-y-4 bg-white border-t border-gray-100">
            <div>
              <label className={labelCls}>SEO Title</label>
              <input className={inputCls} value={values.seo_title} onChange={(e) => set("seo_title", e.target.value)} placeholder="Page title for search engines" />
            </div>
            <div>
              <label className={labelCls}>Meta Description <span className="normal-case text-gray-400 tracking-normal">({values.seo_description.length}/160)</span></label>
              <textarea className={inputCls + " resize-none"} rows={2} maxLength={160} value={values.seo_description} onChange={(e) => set("seo_description", e.target.value)} placeholder="Brief description for search results…" />
            </div>
            <div>
              <label className={labelCls}>OG Image URL</label>
              <input className={inputCls} value={values.og_image} onChange={(e) => set("og_image", e.target.value)} placeholder="https://… (defaults to featured image)" />
            </div>
            <div>
              <label className={labelCls}>Canonical URL</label>
              <input className={inputCls} value={values.canonical_url} onChange={(e) => set("canonical_url", e.target.value)} placeholder="https://asmanprimehub.com/insights/slug" />
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--color-burgundy)] text-white text-sm font-semibold uppercase tracking-widest rounded-lg hover:bg-[var(--color-burgundy-deep)] transition-colors disabled:opacity-60"
      >
        {loading && <Loader2 size={15} className="animate-spin" />}
        {loading ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
