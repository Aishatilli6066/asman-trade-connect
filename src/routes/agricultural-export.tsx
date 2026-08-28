import { createFileRoute } from "@tanstack/react-router";
import agriHero from "@/assets/agri-hero.jpg";
import { Eyebrow, SectionHeader } from "@/components/site/primitives";
import { COMMODITIES, COMMODITY_NOTE, ADDITIONAL_COMMODITIES } from "@/lib/site-data";
import { ExportInquiryForm } from "@/components/site/forms/ExportInquiryForm";

const commodityImages = import.meta.glob<{ default: string }>("/src/assets/c-*.jpg", { eager: true });
function commodityImg(img: string) {
  const entry = Object.entries(commodityImages).find(([k]) => k.endsWith(`${img}.jpg`));
  return entry?.[1].default ?? "";
}

export const Route = createFileRoute("/agricultural-export")({
  head: () => ({
    meta: [
      { title: "Agro Commodity Sourcing & Export Support | ASMAN Prime Hub" },
      { name: "description", content: "We support buyers, exporters and businesses sourcing agro commodities from Nigeria and other trade origins with product specification, supplier coordination, quality documentation, logistics planning and export execution support." },
      { property: "og:title", content: "Agro Commodity Sourcing & Export Support | ASMAN Prime Hub" },
      { property: "og:description", content: "We support buyers, exporters and businesses sourcing agro commodities from Nigeria and other trade origins with product specification, supplier coordination, quality documentation, logistics planning and export execution support." },
      { property: "og:url", content: "https://asmanprimehub.com/agricultural-export" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ASMAN Prime Hub" },
      { property: "og:image", content: "https://asmanprimehub.com/logo.png" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Agro Commodity Sourcing & Export Support | ASMAN Prime Hub" },
      { name: "twitter:description", content: "We support buyers, exporters and businesses sourcing agro commodities from Nigeria and other trade origins with product specification, supplier coordination, quality documentation, logistics planning and export execution support." },
      { name: "twitter:image", content: "https://asmanprimehub.com/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://asmanprimehub.com/agricultural-export" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://asmanprimehub.com/" },
            { "@type": "ListItem", position: 2, name: "Agro Commodity Sourcing & Export Support", item: "https://asmanprimehub.com/agricultural-export" },
          ],
        }),
      },
    ],
  }),
  component: AgriPage,
});

function AgriPage() {
  return (
    <>
      <section className="relative bg-[var(--color-burgundy)] text-white min-h-[80svh] flex items-end overflow-hidden">
        <img src={agriHero} alt="Nigerian agro commodities prepared for international export" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-burgundy)] via-[var(--color-burgundy)]/70 to-transparent" />
        <div className="container-x relative z-10 pt-40 pb-20">
          <Eyebrow dark>Agro Commodity Sourcing</Eyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-7xl leading-[1.02] max-w-4xl">
            Agro commodity sourcing and <span className="italic text-[var(--color-gold)] font-normal">export support.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-white/75 text-lg leading-relaxed">
            We support buyers, exporters and businesses sourcing agro commodities from Nigeria and
            other trade origins — product specification, supplier coordination, quality
            documentation, logistics planning and export execution support. Nigeria remains a
            strong sourcing origin within our wider global sourcing network.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x py-24 md:py-32">
          <SectionHeader eyebrow="Commodities We Coordinate" title={<>Sourced at origin, <span className="italic font-normal text-[var(--color-burgundy)]">confirmed per inquiry.</span></>} />
          <p className="mt-6 max-w-3xl text-sm md:text-base text-[var(--color-ink)]/65 leading-relaxed">{COMMODITY_NOTE}</p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-ink)]/70">
            {ADDITIONAL_COMMODITIES.map((c) => (
              <li key={c} className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-[var(--color-gold)]" />{c}</li>
            ))}
          </ul>
          <div className="mt-16 grid gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 border border-[var(--color-line)] bg-[var(--color-line)]">
            {COMMODITIES.map((c) => (
              <article key={c.slug} className="bg-white group overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <img src={commodityImg(c.img)} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg">{c.name}</h3>
                  <p className="mt-2 text-xs text-[var(--color-ink)]/60 leading-relaxed">{c.desc}</p>
                  <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-[var(--color-burgundy)]">Confirmed per inquiry</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bone)]">
        <div className="container-x py-24 md:py-32">
          <SectionHeader eyebrow="Export Support Services" title={<>Beyond the commodity — <span className="italic font-normal text-[var(--color-burgundy)]">complete coordination.</span></>} />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-line)] border border-[var(--color-line)]">
            {[
              { t: "Export Documentation", d: "CoO, phytosanitary, commercial invoices, packing lists, BL." },
              { t: "Supplier Sourcing", d: "Origin-verified commodity sourcing across Nigerian growing regions." },
              { t: "Buyer Representation", d: "Coordination with counterparties on your behalf, within an agreed written scope." },
              { t: "Freight Coordination", d: "Air and sea routing options matched to commodity type and volume." },
              { t: "Packaging Guidance", d: "Export-grade packaging matched to commodity and destination market." },
              { t: "Quality Control", d: "Pre-shipment inspection arrangements and sample verification." },
              { t: "Compliance Assistance", d: "Regulatory coordination for export and destination market entry." },
              { t: "Air & Sea Shipping", d: "FCL, LCL and air freight options coordinated end-to-end." },
            ].map((s) => (
              <div key={s.t} className="bg-white p-6">
                <h3 className="font-display text-lg">{s.t}</h3>
                <p className="mt-2 text-sm text-[var(--color-ink)]/65 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-burgundy)] text-white">
        <div className="container-x py-24 md:py-32 grid lg:grid-cols-[1fr_2fr] gap-14">
          <div>
            <Eyebrow dark>Export Inquiry</Eyebrow>
            <h2 className="mt-5 font-display text-3xl md:text-5xl leading-[1.05]">
              Inquire About Our Export Commodities
            </h2>
            <p className="mt-5 text-white/65 leading-relaxed">
              Share your commodity, specification, quantity and destination port. Our coordination
              team aims to respond within one business day.
            </p>
          </div>
          <div>
            <ExportInquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}