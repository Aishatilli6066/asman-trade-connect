import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

function serverPublicClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

async function assertAdmin(ctx: { supabase: Awaited<ReturnType<typeof requireSupabaseAuth>>; userId: string } | any) {
  const { data, error } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

// ---------------- PUBLIC READS ----------------

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverPublicClient();
  const { data, error } = await supabase
    .from("insights_posts")
    .select("id, slug, title, excerpt, featured_image_path, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getPublishedPost = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1) }).parse(d))
  .handler(async ({ data }) => {
    const supabase = serverPublicClient();
    const { data: post, error } = await supabase
      .from("insights_posts")
      .select("id, slug, title, excerpt, body_markdown, featured_image_path, seo_title, meta_description, og_image_url, canonical_url, published_at")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return post;
  });

// ---------------- ADMIN ----------------

export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("claim_admin_if_owner");
    if (error) throw new Error(error.message);
    return { granted: !!data };
  });

export const adminListPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("insights_posts")
      .select("id, slug, title, published, published_at, updated_at, featured_image_path")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminGetPost = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: post, error } = await context.supabase
      .from("insights_posts")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!post) throw new Error("Not found");
    return post;
  });

const PostInput = z.object({
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers and hyphens only"),
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500).default(""),
  body_markdown: z.string().max(50000).default(""),
  featured_image_path: z.string().max(500).nullable().optional(),
  seo_title: z.string().max(200).nullable().optional(),
  meta_description: z.string().max(500).nullable().optional(),
  og_image_url: z.string().url().max(1000).nullable().optional(),
  canonical_url: z.string().url().max(1000).nullable().optional(),
  published: z.boolean().default(false),
});

export const adminCreatePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => PostInput.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const row = {
      ...data,
      author_id: context.userId,
      published_at: data.published ? new Date().toISOString() : null,
    };
    const { data: created, error } = await context.supabase
      .from("insights_posts")
      .insert(row)
      .select("id, slug")
      .single();
    if (error) throw new Error(error.message);
    return created;
  });

export const adminUpdatePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ id: z.string().uuid() }).and(PostInput).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { id, ...rest } = data;

    // Preserve published_at if it was already set; set it now if newly publishing.
    const { data: current } = await context.supabase
      .from("insights_posts")
      .select("published, published_at")
      .eq("id", id)
      .single();

    let published_at = current?.published_at ?? null;
    if (rest.published && !current?.published) published_at = new Date().toISOString();
    if (!rest.published) published_at = null;

    const { error } = await context.supabase
      .from("insights_posts")
      .update({ ...rest, published_at })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { id };
  });

export const adminDeletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("insights_posts")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Upload featured image (base64) — admin only. Returns storage path.
export const adminUploadImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { filename: string; contentType: string; base64: string }) =>
    z.object({
      filename: z.string().min(1).max(200),
      contentType: z.string().regex(/^image\/(png|jpe?g|webp|gif)$/i),
      base64: z.string().min(1).max(15_000_000), // ~10MB base64
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const bytes = Uint8Array.from(atob(data.base64), (c) => c.charCodeAt(0));
    const ext = (data.filename.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
    const key = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext || "bin"}`;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage
      .from("post-images")
      .upload(key, bytes, { contentType: data.contentType, upsert: false });
    if (error) throw new Error(error.message);
    return { path: key };
  });