import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { NAV, SITE } from "@/lib/site-data";
import { openConsultation } from "./consultation-store";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-[var(--color-burgundy)]/95 backdrop-blur-sm border-b border-white/5"
          : "bg-transparent",
      )}
    >
      <div className="container-x flex items-center justify-between h-20">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid place-items-center h-10 w-10 bg-white p-1 shadow-sm">
            <img src={logo} alt="ASMAN Prime Hub" className="h-full w-full object-contain" />
          </span>
          <span className="font-display text-[20px] md:text-[22px] font-medium tracking-tight text-white">
            ASMAN <span className="text-[var(--color-gold)]">Prime Hub</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[12px] uppercase tracking-[0.2em] text-white/75 hover:text-[var(--color-gold)] transition-colors"
              activeProps={{ className: "text-[var(--color-gold)]" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <div className="flex items-center gap-5">
            <a
              href={`https://wa.me/${SITE.whatsappRaw}`}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-[var(--color-gold)] transition-colors"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
            <button
            onClick={openConsultation}
            className="px-5 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-white transition-colors"
            >
              Book Consultation
            </button>
          </div>
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[var(--color-burgundy)] border-t border-white/10">
          <div className="container-x py-6 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-[0.2em] text-white/85 border-b border-white/5"
              >
                {n.label}
              </Link>
            ))}
            <button
              onClick={() => { setOpen(false); openConsultation(); }}
              className="mt-4 px-5 py-3.5 text-[11px] uppercase tracking-[0.22em] font-semibold bg-[var(--color-gold)] text-[var(--color-ink)]"
            >
              Book Consultation
            </button>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 py-2 text-xs text-white/60"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}