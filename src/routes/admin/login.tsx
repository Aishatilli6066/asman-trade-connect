import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { adminLogin } from "@/lib/posts.server";
import { Loader2 } from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const loginFn = useServerFn(adminLogin);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginFn({ data: { password } });
      navigate({ to: "/admin/insights" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-linen)] flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 bg-white shadow-sm mb-4">
            <img src={logo} alt="ASMAN Prime Hub" className="h-10 w-10 object-contain" />
          </div>
          <h1 className="font-display text-2xl font-medium text-[var(--color-ink)]">
            Admin Access
          </h1>
          <p className="text-sm text-[var(--color-ink)]/50 mt-1">ASMAN Prime Hub · Insights</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-sm border border-[var(--color-sand)]">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-5 rounded">
              {error}
            </div>
          )}
          <label className="block text-[11px] uppercase tracking-widest text-gray-500 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-burgundy)] transition-colors mb-5"
            placeholder="Enter admin password"
            autoFocus
            autoComplete="current-password"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--color-burgundy)] text-white text-[11px] font-semibold uppercase tracking-widest hover:bg-[var(--color-burgundy-deep)] transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          <a href="/" className="hover:text-[var(--color-burgundy)] transition-colors">
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  );
}
