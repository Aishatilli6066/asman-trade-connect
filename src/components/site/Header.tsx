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
        <Link to="/" className="group flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <span className="grid place-items-center h-10 w-10 shrink-0 bg-white p-1 shadow-sm">
            <img src={logo} alt="ASMAN Prime Hub" className="h-full w-full object-contain" />
          </span>
          <span className="font-display text-[20px] md:text-[22px] font-medium tracking-tight text-white whitespace-nowrap">
            ASMAN <span className="text-[var(--color-gold)]">Prime Hub</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-4 2xl:gap-7">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[10px] 2xl:text-[11px] uppercase tracking-[0.14em] 2xl:tracking-[0.18em] whitespace-nowrap text-white/75 hover:text-[var(--color-gold)] transition-colors"
              activeProps={{ className: "text-[var(--color-gold)]" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:block shrink-0">
          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${SITE.whatsappRaw}`}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              className="hidden 2xl:flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70 hover:text-[var(--color-gold)] transition-colors"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
            <button
              onClick={openConsultation}
              className="hidden 2xl:inline text-[10px] uppercase tracking-[0.16em] whitespace-nowrap text-white/70 hover:text-[var(--color-gold)] transition-colors"
            >
              Consultation
            </button>
            <Link
              to="/quote"
              className="px-4 py-3 text-[10px] xl:text-[11px] uppercase tracking-[0.18em] font-semibold whitespace-nowrap bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-white transition-colors"
            >
              Trade Inquiry
            </Link>
          </div>
        </div>

        <button
          className="xl:hidden text-white p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden bg-[var(--color-burgundy)] border-t border-white/10">
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
            <Link
              to="/quote"
              onClick={() => setOpen(false)}
              className="mt-4 px-5 py-3.5 text-center text-[11px] uppercase tracking-[0.22em] font-semibold bg-[var(--color-gold)] text-[var(--color-ink)]"
            >
              Submit a Trade Inquiry
            </Link>
            <button
              onClick={() => { setOpen(false); openConsultation(); }}
              className="mt-2 px-5 py-3.5 text-[11px] uppercase tracking-[0.22em] font-semibold border border-white/25 text-white"
            >
              Book a Consultation
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