import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Linkedin, Instagram, Facebook } from "lucide-react";
import { NAV, SITE, COMMODITIES } from "@/lib/site-data";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-[var(--color-burgundy)] text-white/70">
      <div className="container-x py-20 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center h-12 w-12 bg-white p-1.5">
              <img src={logo} alt="ASMAN Prime Hub" className="h-full w-full object-contain" />
            </span>
            <div className="font-display text-2xl text-white">
              ASMAN <span className="text-[var(--color-gold)]">Prime Hub</span>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed max-w-sm">
            ASMAN Prime Hub connects businesses to verified sourcing, logistics coordination, and
            agricultural export opportunities from Nigeria to global markets.
          </p>
          <div className="mt-7 flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/asman-prime-hub/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid place-items-center h-10 w-10 border border-white/15 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://www.instagram.com/asmanprimehub?igsh=MWZtb3pzdGg4ZW5weg=="
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid place-items-center h-10 w-10 border border-white/15 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
            >
              <Instagram size={15} />
            </a>
            <a
              href="https://www.facebook.com/share/1AgH4Mnzpx/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid place-items-center h-10 w-10 border border-white/15 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
            >
              <Facebook size={15} />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="eyebrow text-[var(--color-gold)]">Navigate</div>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-[var(--color-gold)] transition-colors">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="eyebrow text-[var(--color-gold)]">Commodities</div>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {COMMODITIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/agricultural-export"
                  className="hover:text-[var(--color-gold)] transition-colors"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="eyebrow text-[var(--color-gold)]">Get In Touch</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-[var(--color-gold)]">
                <Mail size={14} /> {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${SITE.whatsappRaw}`}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-2 hover:text-[var(--color-gold)]"
              >
                <MessageCircle size={14} /> {SITE.whatsapp}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-white/40">
          <div>© {new Date().getFullYear()} ASMAN Prime Hub. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-[var(--color-gold)]">Privacy</Link>
            <Link to="/terms" className="hover:text-[var(--color-gold)]">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}