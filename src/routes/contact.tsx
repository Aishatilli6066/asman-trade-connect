import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Linkedin, Instagram, Facebook } from "lucide-react";
import { Eyebrow } from "@/components/site/primitives";
import { TradeInquiryForm } from "@/components/site/forms/TradeInquiryForm";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ASMAN Prime Hub — Trade Inquiries & Consultations" },
      { name: "description", content: "Get in touch with ASMAN Prime Hub for global sourcing, freight coordination, and Nigerian agricultural export inquiries. We respond within 24 hours." },
      { property: "og:title", content: "Contact ASMAN Prime Hub" },
      { property: "og:description", content: "Trade inquiries and consultations." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="min-h-screen grid lg:grid-cols-2 pt-20">
      <div className="bg-[var(--color-burgundy)] text-white p-10 md:p-16 lg:p-20 flex flex-col justify-between gap-16">
        <div>
          <Eyebrow dark>Contact</Eyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-6xl leading-[1.02]">
            Let's discuss your <span className="italic text-[var(--color-gold)] font-normal">trade.</span>
          </h1>
          <p className="mt-6 max-w-md text-white/80 leading-relaxed">
            Send us a trade inquiry or consultation request and our coordination team will respond within
            24 hours with next steps.
          </p>

          <div className="mt-12 space-y-5">
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-white/90 hover:text-[var(--color-gold)] transition-colors">
              <Mail size={18} /> <span>{SITE.email}</span>
            </a>
            <a href={`https://wa.me/${SITE.whatsappRaw}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/90 hover:text-[var(--color-gold)] transition-colors">
              <MessageCircle size={18} /> <span>WhatsApp: {SITE.whatsapp}</span>
            </a>
          </div>

          <div className="mt-12 flex items-center gap-3">
            {[Linkedin, Instagram, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="grid place-items-center h-10 w-10 border border-white/30 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors" aria-label="Social">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="font-display text-xl leading-snug">
            "We treat every inquiry as the start of a long-term trade relationship."
          </div>
          <div className="mt-3 text-[11px] uppercase tracking-[0.25em] text-white/60">— ASMAN Prime Hub Coordination Team</div>
        </div>
      </div>

      <div className="bg-white p-10 md:p-16 lg:p-20">
        <Eyebrow>Trade Inquiry</Eyebrow>
        <h2 className="mt-5 font-display text-3xl md:text-4xl leading-tight">Send us the details.</h2>
        <p className="mt-3 text-sm text-[var(--color-ink)]/65">All fields with * are required.</p>
        <div className="mt-10">
          <TradeInquiryForm />
        </div>
      </div>
    </section>
  );
}