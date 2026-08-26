import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Mail, MessageCircle } from "lucide-react";
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

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

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
              to="/request-a-quote"
              className="px-4 py-3 text-[10px] xl:text-[11px] uppercase tracking-[0.18em] font-semibold whitespace-nowrap bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-white transition-colors"
            >
              Trade Inquiry
            </Link>
          </div>
        </div>

        <button
          className="xl:hidden text-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="xl:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-[var(--color-burgundy)] border-t border-white/10 overflow-y-auto overscroll-contain"
        >
          <div className="container-x min-h-full flex flex-col py-8">
            <nav className="flex flex-col">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="py-4 text-sm uppercase tracking-[0.2em] text-white/85 border-b border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                  activeProps={{ className: "text-[var(--color-gold)]" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-10 flex flex-col gap-3">
              <Link
                to="/request-a-quote"
                onClick={() => setOpen(false)}
                className="px-5 py-4 text-center text-[11px] uppercase tracking-[0.22em] font-semibold bg-[var(--color-gold)] text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Submit a Trade Inquiry
              </Link>
              <button
                onClick={() => { setOpen(false); openConsultation(); }}
                className="px-5 py-4 text-[11px] uppercase tracking-[0.22em] font-semibold border border-white/30 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                Book a Consultation
              </button>
              <div className="mt-4 grid grid-cols-1 gap-3 border-t border-white/10 pt-6 text-sm">
                <a
                  href={`https://wa.me/${SITE.whatsappRaw}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-white/75 hover:text-[var(--color-gold)]"
                >
                  <MessageCircle size={16} /> {SITE.whatsapp}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-white/75 hover:text-[var(--color-gold)] break-all"
                >
                  <Mail size={16} /> {SITE.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}