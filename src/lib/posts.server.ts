"use server";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getCookie, setCookie, deleteCookie } from "@tanstack/start-server-core";
import { createHmac } from "crypto";
import { dbQuery } from "./db.server";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  featured_image: string;
  status: "draft" | "published";
  published_at: string | null;
  seo_title: string;
  seo_description: string;
  og_image: string;
  canonical_url: string;
  created_at: string;
  updated_at: string;
}

// ── Auth helpers ────────────────────────────────────────────────

function makeToken(): string {
  const secret = process.env.SESSION_SECRET ?? "fallback-secret";
  return createHmac("sha256", secret).update("asman:admin:v1").digest("hex");
}

export function isAdmin(): boolean {
  try {
    const cookie = getCookie("asman_admin_session");
    return !!cookie && cookie === makeToken();
  } catch {
    return false;
  }
}

// ── Public server functions ─────────────────────────────────────

export const getPublishedPosts = createServerFn({ method: "GET" }).handler(
  async () =>
    dbQuery<Post>(
      `SELECT * FROM insights_posts WHERE status = 'published' ORDER BY published_at DESC`
    )
);

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ slug: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const rows = await dbQuery<Post>(
      `SELECT * FROM insights_posts WHERE slug = $1 AND status = 'published'`,
      [data.slug]
    );
    return rows[0] ?? null;
  });

// ── Admin auth server functions ─────────────────────────────────

export const checkAdminSession = createServerFn({ method: "GET" }).handler(
  async () => isAdmin()
);

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ password: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const pwd = process.env.ADMIN_PASSWORD;
    if (!pwd) throw new Error("ADMIN_PASSWORD is not configured.");
    if (data.password !== pwd) throw new Error("Incorrect password.");
    setCookie("asman_admin_session", makeToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });
    return { ok: true };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  setCookie("asman_admin_session", "", { maxAge: 0, path: "/" });
  return { ok: true };
});

// ── Admin CRUD server functions ─────────────────────────────────

export const adminGetPosts = createServerFn({ method: "GET" }).handler(async () => {
  if (!isAdmin()) throw new Error("Unauthorised");
  return dbQuery<Post>(`SELECT * FROM insights_posts ORDER BY created_at DESC`);
});

export const adminGetPost = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ id: z.string() }).parse(d))
  .handler(async ({ data }) => {
    if (!isAdmin()) throw new Error("Unauthorised");
    const rows = await dbQuery<Post>(
      `SELECT * FROM insights_posts WHERE id = $1`,
      [data.id]
    );
    return rows[0] ?? null;
  });

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens"),
  excerpt: z.string().min(1, "Excerpt is required"),
  body: z.string().default(""),
  featured_image: z.string().default(""),
  status: z.enum(["draft", "published"]),
  seo_title: z.string().default(""),
  seo_description: z.string().default(""),
  og_image: z.string().default(""),
  canonical_url: z.string().default(""),
});

export const adminCreatePost = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => postSchema.parse(d))
  .handler(async ({ data }) => {
    if (!isAdmin()) throw new Error("Unauthorised");
    const publishedAt = data.status === "published" ? new Date().toISOString() : null;
    const rows = await dbQuery<Post>(
      `INSERT INTO insights_posts
         (slug,title,excerpt,body,featured_image,status,published_at,
          seo_title,seo_description,og_image,canonical_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [
        data.slug, data.title, data.excerpt, data.body, data.featured_image,
        data.status, publishedAt, data.seo_title, data.seo_description,
        data.og_image, data.canonical_url,
      ]
    );
    return rows[0];
  });

export const adminUpdatePost = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => postSchema.extend({ id: z.string() }).parse(d))
  .handler(async ({ data }) => {
    if (!isAdmin()) throw new Error("Unauthorised");
    const rows = await dbQuery<Post>(
      `UPDATE insights_posts SET
         slug=$2, title=$3, excerpt=$4, body=$5, featured_image=$6, status=$7,
         published_at = COALESCE(
           published_at,
           CASE WHEN $7='published' THEN NOW() ELSE NULL END
         ),
         seo_title=$8, seo_description=$9, og_image=$10, canonical_url=$11,
         updated_at=NOW()
       WHERE id=$1 RETURNING *`,
      [
        data.id, data.slug, data.title, data.excerpt, data.body,
        data.featured_image, data.status, data.seo_title, data.seo_description,
        data.og_image, data.canonical_url,
      ]
    );
    return rows[0];
  });

export const adminDeletePost = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ id: z.string() }).parse(d))
  .handler(async ({ data }) => {
    if (!isAdmin()) throw new Error("Unauthorised");
    await dbQuery(`DELETE FROM insights_posts WHERE id = $1`, [data.id]);
    return { ok: true };
  });
