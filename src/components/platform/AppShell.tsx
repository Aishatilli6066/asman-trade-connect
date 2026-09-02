import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, X, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { modulesForRole, ROLE_LABELS, type PlatformContext } from "@/lib/platform";
import logo from "@/assets/logo.png";

export function AppShell({
  ctx,
  children,
}: {
  ctx: PlatformContext;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const modules = modulesForRole(ctx.role);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/platform/sign-in", replace: true });
  };

  const NavList = () => (
    <nav aria-label="Platform sections" className="flex flex-col gap-1">
      <Link
        to="/app/dashboard"
        className={cn(
          "px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]",
          pathname === "/app/dashboard"
            ? "bg-white/10 text-[var(--color-gold)]"
            : "text-white/80 hover:text-white hover:bg-white/5",
        )}
      >
        Dashboard
      </Link>
      {modules.map((m) => (
        <Link
          key={m.key}
          to={m.to}
          className={cn(
            "px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]",
            pathname === m.to
              ? "bg-white/10 text-[var(--color-gold)]"
              : "text-white/80 hover:text-white hover:bg-white/5",
          )}
        >
          {m.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[var(--color-bone)]">
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-[var(--color-burgundy)] px-4 h-16">
        <Link to="/app/dashboard" className="flex items-center gap-2">
          <span className="grid place-items-center h-8 w-8 bg-white p-1">
            <img src={logo} alt="ASMAN Trade Connect" className="h-full w-full object-contain" />
          </span>
          <span className="font-display text-white text-lg">Trade Connect</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-[var(--color-burgundy)] px-4 py-6">
          <NavList />
          <button
            onClick={signOut}
            className="mt-6 flex items-center gap-2 px-3 py-2.5 text-sm text-white/80 hover:text-white"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      )}

      <div className="lg:flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 lg:min-h-screen bg-[var(--color-burgundy)] px-4 py-6">
          <Link to="/app/dashboard" className="flex items-center gap-2 px-2">
            <span className="grid place-items-center h-9 w-9 bg-white p-1">
              <img src={logo} alt="ASMAN Trade Connect" className="h-full w-full object-contain" />
            </span>
            <span className="font-display text-white text-lg leading-tight">
              Trade <span className="text-[var(--color-gold)]">Connect</span>
            </span>
          </Link>
          <div className="mt-8">
            <NavList />
          </div>
          <div className="mt-auto pt-8 text-white/70">
            <p className="px-3 text-xs">{ctx.email}</p>
            <p className="px-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {ctx.role ? ROLE_LABELS[ctx.role] : "Role pending"}
            </p>
            <button
              onClick={signOut}
              className="mt-3 flex items-center gap-2 px-3 py-2 text-sm hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              <LogOut size={16} /> Sign out
            </button>
            <Link to="/" className="mt-1 block px-3 py-2 text-xs hover:text-white">
              ← Corporate site
            </Link>
          </div>
        </aside>

        <main className="flex-1 px-4 py-8 md:px-8 md:py-12">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
