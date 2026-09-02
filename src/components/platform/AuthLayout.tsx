import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen grid place-items-center bg-[var(--color-burgundy)] px-4 py-12 md:py-16">
      <div className="w-full max-w-md bg-white p-7 md:p-9 shadow-xl">
        <Link to="/platform" className="flex items-center gap-2">
          <span className="grid place-items-center h-9 w-9 bg-white border border-[var(--color-line)] p-1">
            <img src={logo} alt="ASMAN Trade Connect" className="h-full w-full object-contain" />
          </span>
          <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-burgundy)]">
            ASMAN Trade Connect
          </span>
        </Link>
        <h1 className="mt-6 font-display text-3xl text-[var(--color-ink)]">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{subtitle}</p>}
        <div className="mt-7">{children}</div>
        <Link
          to="/"
          className="mt-8 inline-block text-xs text-neutral-500 hover:text-[var(--color-burgundy)]"
        >
          ← Back to asmanprimehub.com
        </Link>
      </div>
    </main>
  );
}
