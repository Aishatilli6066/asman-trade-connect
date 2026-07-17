import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { claimAdmin } from "@/lib/posts.functions";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin sign in — ASMAN Prime Hub" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const claim = useServerFn(claimAdmin);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    // If already signed in, go to admin
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin/insights" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/auth" },
        });
        if (error) throw error;
      }
      const { error: signErr } = await supabase.auth.signInWithPassword({ email, password });
      if (signErr) throw signErr;

      // Auto-grant admin if this is the owner email
      try {
        await claim();
      } catch {}

      navigate({ to: "/admin/insights" });
    } catch (err: any) {
      setError(err?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center bg-[var(--color-burgundy)] px-4 py-16">
      <div className="w-full max-w-md bg-white p-8 shadow-xl">
        <Link to="/" className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-burgundy)]">
          ← Back to site
        </Link>
        <h1 className="mt-4 font-display text-3xl text-[var(--color-ink)]">Admin sign in</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Only the owner can manage posts.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-neutral-600">Email</label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-neutral-300 px-3 py-3 text-base focus:outline-none focus:border-[var(--color-burgundy)]"
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-neutral-600">Password</label>
            <input
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-neutral-300 px-3 py-3 text-base focus:outline-none focus:border-[var(--color-burgundy)]"
            />
          </div>
          {error && <p className="text-sm text-[var(--color-burgundy)]">{error}</p>}
          {info && <p className="text-sm text-neutral-700">{info}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-burgundy)] text-white py-3 text-[12px] uppercase tracking-[0.22em] font-semibold disabled:opacity-60"
          >
            {loading ? "Please wait…" : mode === "signup" ? "Create account & sign in" : "Sign in"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 text-xs text-neutral-600 hover:text-[var(--color-burgundy)]"
        >
          {mode === "signin" ? "First time? Create the admin account →" : "Already have an account? Sign in →"}
        </button>
      </div>
    </main>
  );
}