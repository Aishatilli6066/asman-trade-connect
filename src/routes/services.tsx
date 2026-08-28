import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, Network, Globe2, Truck, Sprout, ShieldCheck, FileCheck2 } from "lucide-react";
import air from "@/assets/air-freight.jpg";
import sea from "@/assets/sea-freight.jpg";
import { Eyebrow, GoldButton } from "@/components/site/primitives";
import { openConsultation } from "@/components/site/consultation-store";
import { SERVICE_BLOCKS } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Global Sourcing, Supplier Verification & Procurement Services | ASMAN Prime Hub" },
      { name: "description", content: "Global product sourcing, supplier verification, import coordination, procurement coordination, agro commodity sourcing, export documentation support and international trade advisory for businesses worldwide." },
      { property: "og:title", content: "Global Sourcing, Supplier Verification & Procurement Services | ASMAN Prime Hub" },
      { property: "og:description", content: "Global product sourcing, supplier verification, import coordination, procurement coordination, agro commodity sourcing, export documentation support and international trade advisory for businesses worldwide." },
      { property: "og:url", content: "https://asmanprimehub.com/services" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ASMAN Prime Hub" },
      { property: "og:image", content: "https://asmanprimehub.com/logo.png" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Global Sourcing, Supplier Verification & Procurement Services | ASMAN Prime Hub" },
      { name: "twitter:description", content: "Global product sourcing, supplier verification, import coordination, procurement coordination, agro commodity sourcing, export documentation support and international trade advisory for businesses worldwide." },
      { name: "twitter:image", content: "https://asmanprimehub.com/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://asmanprimehub.com/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://asmanprimehub.com/" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://asmanprimehub.com/services" },
          ],
        }),
      },
    ],
  }),
  component: ServicesPage,
});

const ICONS = [Boxes, ShieldCheck, Truck, Network, Sprout, FileCheck2, Globe2];

function ServicesPage() {
  return (
    <>
      <section className="relative bg-[var(--color-burgundy)] text-white pt-40 pb-24">
        <div className="container-x">
          <Eyebrow dark>Services</Eyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-7xl leading-[1.02] max-w-4xl">
            Global sourcing and trade services, <span className="italic text-[var(--color-gold)] font-normal">coordinated.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-white/70 text-lg leading-relaxed">
            Seven defined service areas across global product sourcing, supplier verification,
            import coordination, procurement coordination, Nigerian agro commodity sourcing,
            export documentation support and business advisory — each scoped in writing before
            work begins.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x py-20 md:py-28 space-y-px bg-[var(--color-line)] border-y border-[var(--color-line)]">
          {SERVICE_BLOCKS.map((s, idx) => {
            const Icon = ICONS[idx] ?? Boxes;
            return (
              <article key={s.title} className="bg-white p-8 md:p-14 grid lg:grid-cols-[1fr_2fr] gap-8 md:gap-14">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-burgundy)]">
                    {String(idx + 1).padStart(2, "0")} / {String(SERVICE_BLOCKS.length).padStart(2, "0")}
                  </div>
                  <Icon size={32} strokeWidth={1.3} className="mt-6 text-[var(--color-burgundy)]" />
                  <h2 className="mt-5 font-display text-3xl md:text-4xl leading-tight">{s.title}</h2>
                </div>
                <dl className="space-y-6">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink)]/50">What you receive</dt>
                    <dd className="mt-2 text-[var(--color-ink)]/75 leading-relaxed text-base md:text-lg">{s.desc}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink)]/50">Who it is for</dt>
                    <dd className="mt-2 text-[var(--color-ink)]/70 leading-relaxed">{s.audience}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink)]/50">Next step</dt>
                    <dd className="mt-2 flex flex-wrap items-center gap-3 text-[var(--color-ink)]/70">
                      <span>{s.next}</span>
                      <Link to="/request-a-quote" className="text-[var(--color-burgundy)] underline underline-offset-4 hover:text-[var(--color-ink)]">
                        Submit a Trade Inquiry
                      </Link>
                    </dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[360px]">
          <img src={air} alt="Air freight coordination for time-critical international cargo" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[var(--color-burgundy)]/60" />
          <div className="relative p-10 md:p-14 text-white">
            <Eyebrow dark>Air Freight</Eyebrow>
            <h3 className="mt-4 font-display text-3xl md:text-4xl">Time-critical cargo, documented.</h3>
          </div>
        </div>
        <div className="relative min-h-[360px]">
          <img src={sea} alt="Sea freight coordination for containerised international shipments" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[var(--color-burgundy)]/60" />
          <div className="relative p-10 md:p-14 text-white">
            <Eyebrow dark>Sea Freight</Eyebrow>
            <h3 className="mt-4 font-display text-3xl md:text-4xl">High-volume routing, coordinated.</h3>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bone)] border-y border-[var(--color-line)]">
        <div className="container-x py-14 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--color-ink)]/70">
          <span className="uppercase tracking-[0.25em] text-[11px] text-[var(--color-ink)]/50">Related</span>
          <Link to="/global-sourcing" className="hover:text-[var(--color-burgundy)] underline underline-offset-4">Global sourcing</Link>
          <Link to="/nigerian-commodity-sourcing" className="hover:text-[var(--color-burgundy)] underline underline-offset-4">Nigerian commodity sourcing</Link>
          <Link to="/agricultural-export" className="hover:text-[var(--color-burgundy)] underline underline-offset-4">Agro commodity export support</Link>
          <Link to="/why-choose-us" className="hover:text-[var(--color-burgundy)] underline underline-offset-4">Why choose us</Link>
          <Link to="/about" className="hover:text-[var(--color-burgundy)] underline underline-offset-4">About</Link>
          <Link to="/contact" className="hover:text-[var(--color-burgundy)] underline underline-offset-4">Contact</Link>
        </div>
      </section>

      <section className="bg-[var(--color-burgundy)] text-white">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-[2fr_1fr] gap-10 items-center">
          <h2 className="font-display text-3xl md:text-5xl max-w-3xl">
            Talk to us about your <span className="italic text-[var(--color-gold)] font-normal">trade requirement.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/request-a-quote"><GoldButton>Submit a Trade Inquiry <ArrowRight size={14} /></GoldButton></Link>
            <GoldButton variant="outline-light" onClick={openConsultation}>Book a Consultation</GoldButton>
          </div>
        </div>
      </section>
    </>
  );
}