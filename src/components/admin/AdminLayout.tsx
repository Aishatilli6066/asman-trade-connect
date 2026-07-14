import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminLogout } from "@/lib/posts.server";
import { PenSquare, List, LogOut, Home } from "lucide-react";

export function AdminLayout({
  children,
  title = "Admin",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const navigate = useNavigate();
  const logoutFn = useServerFn(adminLogout);

  async function handleLogout() {
    await logoutFn();
    navigate({ to: "/admin/login" });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin top bar — sits below the main ASMAN header (h-20) */}
      <div className="sticky top-20 z-30 bg-[var(--color-ink)] border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-12">
          <div className="flex items-center gap-5">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)] font-semibold">
              Admin
            </span>
            <Link
              to="/admin/insights"
              className="flex items-center gap-1.5 text-[11px] text-white/60 hover:text-white transition-colors"
            >
              <List size={12} /> All Posts
            </Link>
            <Link
              to="/admin/insights/new"
              className="flex items-center gap-1.5 text-[11px] text-white/60 hover:text-white transition-colors"
            >
              <PenSquare size={12} /> New Post
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/insights"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-white/60 hover:text-white transition-colors"
            >
              <Home size={12} /> View Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-[11px] text-red-400 hover:text-red-300 transition-colors"
            >
              <LogOut size={12} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-display font-medium text-[var(--color-ink)] mb-6">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
