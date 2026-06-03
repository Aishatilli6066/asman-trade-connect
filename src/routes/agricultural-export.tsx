import { createFileRoute } from "@tanstack/react-router";
import agriHero from "@/assets/agri-hero.jpg";
import { Eyebrow, SectionHeader } from "@/components/site/primitives";
import { COMMODITIES } from "@/lib/site-data";
import { ExportInquiryForm } from "@/components/site/forms/ExportInquiryForm";

const commodityImages = import.meta.glob<{ default: string }>("/src/assets/c-*.jpg", { eager: true });
function commodityImg(img: string) {
  const entry = Object.entries(commodityImages).find(([k]) => k.endsWith(`${img}.jpg`));
  return entry?.[1].default ?? "";
}

export const Route = createFileRoute("/agricultural-export")({
  head: () => ({
    meta: [
      { title: "Nigerian Agricultural Export — Commodities & Coordination | ASMAN Prime Hub" },
      { name: "description", content: "Sesame, hibiscus, ginger, cashew, soybeans, shea butter, pepper and gum arabic — sourced, packaged and shipped from Nigeria to global buyers." },
      { property: "og:title", content: "Nigerian Agricultural Export | ASMAN Prime Hub" },
      { property: "og:description", content: "Premium Nigerian agricultural commodities for international markets." },
      { property: "og:url", content: "/agricultural-export" },
      { property: "og:image", content: agriHero },
    ],
    links: [{ rel: "canonical", href: "/agricultural-export" }],
  }),
  component: AgriPage,
});

function AgriPage() {
  return (
    <>
      <section className="relative bg-[var(--color-burgundy)] text-white min-h-[80svh] flex items-end overflow-hidden">
        <img src={agriHero} alt="Nigerian agricultural commodities" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-burgundy)] via-[var(--color-burgundy)]/70 to-transparent" />
        <div className="container-x relative z-10 pt-40 pb-20">
          <Eyebrow dark>Agricultural Export</Eyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-7xl leading-[1.02] max-w-4xl">
            Nigerian commodities for <span className="italic text-[var(--color-gold)] font-normal">global markets.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-white/75 text-lg leading-relaxed">
            Premium-grade Nigerian agricultural commodities — sourced, inspected, packaged and shipped to
            international buyers with end-to-end coordination from origin to destination.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x py-24 md:py-32">
          <SectionHeader eyebrow="Our Commodities" title={<>Export-ready, <span className="italic font-normal text-[var(--color-burgundy)]">origin-traceable.</span></>} />
          <div className="mt-16 grid gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 border border-[var(--color-line)] bg-[var(--color-line)]">
            {COMMODITIES.map((c) => (
              <article key={c.slug} className="bg-white group overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <img src={commodityImg(c.img)} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="font-display text-lg">{c.name}</div>
                  <p className="mt-2 text-xs text-[var(--color-ink)]/60 leading-relaxed">{c.desc}</p>
                  <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-[var(--color-burgundy)]">Available · Export-ready</div>
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
              { t: "Buyer Connections", d: "Active commercial corridors with international commodity buyers." },
              { t: "Freight Coordination", d: "Air and sea freight routing optimized for commodity type and volume." },
              { t: "Packaging Guidance", d: "Export-grade packaging matched to commodity and destination market." },
              { t: "Quality Control", d: "Pre-shipment inspection arrangements and sample verification." },
              { t: "Compliance Assistance", d: "Regulatory coordination for export and destination market entry." },
              { t: "Air & Sea Shipping", d: "FCL, LCL and air freight options coordinated end-to-end." },
            ].map((s) => (
              <div key={s.t} className="bg-white p-6">
                <div className="font-display text-lg">{s.t}</div>
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
              Tell us what you need and our export coordination team will respond within 24 hours.
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