import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminListPosts, adminDeletePost } from "@/lib/posts.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/insights")({
  head: () => ({ meta: [{ title: "Manage Insights" }, { name: "robots", content: "noindex" }] }),
  component: AdminInsightsList,
});

type Row = {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  published_at: string | null;
  updated_at: string;
  featured_image_path: string | null;
};

function AdminInsightsList() {
  const router = useRouter();
  const list = useServerFn(adminListPosts);
  const del = useServerFn(adminDeletePost);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await list();
      setRows(data as Row[]);
    } catch (e: any) {
      setErr(e?.message || "Failed to load");
    }
  };
  useEffect(() => { load(); }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.navigate({ to: "/auth", replace: true });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await del({ data: { id } });
    load();
  };

  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-24">
      <div className="container-x max-w-5xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-burgundy)]">Admin</p>
            <h1 className="mt-1 font-display text-3xl text-[var(--color-ink)]">Manage Insights</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/insights/new"
              className="bg-[var(--color-burgundy)] text-white px-5 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold"
            >
              + New post
            </Link>
            <button
              onClick={signOut}
              className="border border-neutral-300 px-4 py-3 text-[11px] uppercase tracking-[0.22em]"
            >
              Sign out
            </button>
          </div>
        </div>

        {err && <p className="mt-6 text-sm text-[var(--color-burgundy)]">{err}</p>}
        {!rows && !err && <p className="mt-6 text-sm text-neutral-600">Loading…</p>}

        {rows && rows.length === 0 && (
          <p className="mt-8 text-sm text-neutral-600">No posts yet. Create your first one.</p>
        )}

        {rows && rows.length > 0 && (
          <ul className="mt-8 divide-y bg-white shadow-sm">
            {rows.map((r) => (
              <li key={r.id} className="p-4 md:p-5 flex flex-wrap gap-4 items-center justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={
                        "text-[10px] uppercase tracking-[0.2em] px-2 py-1 " +
                        (r.published
                          ? "bg-[var(--color-gold)] text-[var(--color-ink)]"
                          : "bg-neutral-200 text-neutral-700")
                      }
                    >
                      {r.published ? "Published" : "Draft"}
                    </span>
                    <span className="text-xs text-neutral-500">/insights/{r.slug}</span>
                  </div>
                  <p className="mt-1 font-display text-lg text-[var(--color-ink)] truncate">{r.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  {r.published && (
                    <Link
                      to="/insights/$slug"
                      params={{ slug: r.slug }}
                      className="text-xs uppercase tracking-[0.2em] px-3 py-2 border border-neutral-300"
                    >
                      View
                    </Link>
                  )}
                  <Link
                    to="/admin/insights/$id/edit"
                    params={{ id: r.id }}
                    className="text-xs uppercase tracking-[0.2em] px-3 py-2 border border-neutral-300"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => remove(r.id)}
                    className="text-xs uppercase tracking-[0.2em] px-3 py-2 bg-[var(--color-burgundy)] text-white"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}