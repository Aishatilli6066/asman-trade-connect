import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, ShieldCheck, Network, Globe2, Truck, Plane, Ship, Sprout, FileCheck2 } from "lucide-react";
import warehouse from "@/assets/warehouse.jpg";
import air from "@/assets/air-freight.jpg";
import sea from "@/assets/sea-freight.jpg";
import { Eyebrow, GoldButton, SectionHeader } from "@/components/site/primitives";
import { openConsultation } from "@/components/site/consultation-store";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Sourcing, Freight & Export | ASMAN Prime Hub" },
      { name: "description", content: "Global sourcing, supplier verification, procurement, import/export, air and sea freight, and Nigerian agricultural export — coordinated end-to-end." },
      { property: "og:title", content: "Services | ASMAN Prime Hub" },
      { property: "og:description", content: "End-to-end international trade coordination services." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { i: Boxes, t: "Product Sourcing", d: "We identify, evaluate and secure products from verified suppliers across major manufacturing markets — matched precisely to your specifications, target costs and timeline.", points: ["Specification analysis", "Supplier shortlisting", "Sample coordination", "Cost optimization"] },
  { i: ShieldCheck, t: "Supplier Verification", d: "Comprehensive due diligence on factories and exporters before any commitment. Credentials, production capacity, sample quality, references and commercial standing.", points: ["Company verification", "Factory assessment", "Sample quality review", "Reference checks"] },
  { i: Network, t: "Procurement Solutions", d: "End-to-end procurement coordination — negotiation, order placement, production follow-up and quality control — managed on your behalf.", points: ["Price negotiation", "Order management", "Production monitoring", "Quality coordination"] },
  { i: Globe2, t: "Import & Export Operations", d: "Documentation, regulatory compliance and operational coordination for international shipments in and out of Nigeria and beyond.", points: ["Customs liaison", "Export documentation", "Compliance support", "Operational follow-up"] },
  { i: Truck, t: "Freight Forwarding", d: "Vetted forwarder coordination optimized for cost, transit time and reliability. Multi-modal routing across air, sea and inland transport.", points: ["Forwarder selection", "Multi-modal routing", "Cost optimization", "Transit tracking"] },
  { i: Plane, t: "Air Shipping", d: "Time-critical air freight with vetted carriers and consolidators. Fast, documented, and reliable for high-value or urgent shipments.", points: ["Express air freight", "Consolidation", "AWB coordination", "Door-to-door options"] },
  { i: Ship, t: "Sea Shipping", d: "FCL and LCL ocean freight coordination across major global shipping lines. Cost-efficient routing for high-volume cargo.", points: ["FCL & LCL", "Container booking", "Port coordination", "BL management"] },
  { i: Sprout, t: "Agricultural Commodity Export", d: "Premium Nigerian agricultural commodities sourced, inspected, packaged and shipped to international buyers — coordinated as one workflow.", points: ["Commodity sourcing", "Quality control", "Export packaging", "Buyer-side coordination"] },
];

function ServicesPage() {
  return (
    <>
      <section className="relative bg-[var(--color-ink)] text-white pt-40 pb-24">
        <div className="container-x">
          <Eyebrow dark>Services</Eyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-7xl leading-[1.02] max-w-4xl">
            International trade, <span className="italic text-[var(--color-gold)] font-normal">coordinated.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-white/70 text-lg leading-relaxed">
            From sourcing and supplier verification to freight forwarding and agricultural export —
            one accountable partner across the full trade lifecycle.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x py-20 md:py-28 space-y-px bg-[var(--color-line)] border-y border-[var(--color-line)]">
          {SERVICES.map((s, idx) => (
            <article key={s.t} className="bg-white p-8 md:p-14 grid lg:grid-cols-[1fr_2fr] gap-8 md:gap-14">
              <div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-burgundy)]">
                  {String(idx + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                </div>
                <s.i size={32} strokeWidth={1.3} className="mt-6 text-[var(--color-burgundy)]" />
                <h2 className="mt-5 font-display text-3xl md:text-4xl leading-tight">{s.t}</h2>
              </div>
              <div>
                <p className="text-[var(--color-ink)]/75 leading-relaxed text-base md:text-lg">{s.d}</p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-[var(--color-ink)]/80">
                      <span className="h-1.5 w-1.5 bg-[var(--color-gold)]" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[360px]">
          <img src={air} alt="Air freight" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[var(--color-ink)]/60" />
          <div className="relative p-10 md:p-14 text-white">
            <Eyebrow dark>Air Freight</Eyebrow>
            <h3 className="mt-4 font-display text-3xl md:text-4xl">Time-critical. Documented.</h3>
          </div>
        </div>
        <div className="relative min-h-[360px]">
          <img src={sea} alt="Sea freight" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[var(--color-ink)]/60" />
          <div className="relative p-10 md:p-14 text-white">
            <Eyebrow dark>Sea Freight</Eyebrow>
            <h3 className="mt-4 font-display text-3xl md:text-4xl">High-volume. Cost-efficient.</h3>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-burgundy)] text-white">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-[2fr_1fr] gap-10 items-center">
          <h2 className="font-display text-3xl md:text-5xl max-w-3xl">
            Talk to us about your <span className="italic text-[var(--color-gold)] font-normal">trade requirement.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <button onClick={openConsultation}><GoldButton>Book Consultation <ArrowRight size={14} /></GoldButton></button>
            <Link to="/contact"><GoldButton variant="outline-light">Contact Us</GoldButton></Link>
          </div>
        </div>
      </section>
    </>
  );
}