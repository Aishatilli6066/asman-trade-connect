import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Network, Globe2, MessagesSquare, Truck, FileCheck2, Sparkles, Settings2 } from "lucide-react";
import { Eyebrow, GoldButton, SectionHeader } from "@/components/site/primitives";
import { openConsultation } from "@/components/site/consultation-store";

export const Route = createFileRoute("/why-choose-us")({
  head: () => ({
    meta: [
      { title: "Why Choose ASMAN Prime Hub | Verified Trade & Sourcing Coordination" },
      { name: "description", content: "Verified suppliers, transparent communication, export readiness and freight expertise — the operational reasons global businesses choose ASMAN Prime Hub as their trade partner." },
      { property: "og:title", content: "Why Choose ASMAN Prime Hub | Verified Trade & Sourcing Coordination" },
      { property: "og:description", content: "Verified suppliers, transparent communication, export readiness and freight expertise — the operational reasons global businesses choose ASMAN Prime Hub." },
      { property: "og:url", content: "https://asmanprimehub.com/why-choose-us" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ASMAN Prime Hub" },
      { property: "og:image", content: "https://asmanprimehub.com/logo.png" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Why Choose ASMAN Prime Hub | Verified Trade & Sourcing Coordination" },
      { name: "twitter:description", content: "Verified suppliers, transparent communication, export readiness and freight expertise — the operational reasons global businesses choose ASMAN Prime Hub." },
      { name: "twitter:image", content: "https://asmanprimehub.com/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://asmanprimehub.com/why-choose-us" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://asmanprimehub.com/" },
            { "@type": "ListItem", position: 2, name: "Why Choose Us", item: "https://asmanprimehub.com/why-choose-us" },
          ],
        }),
      },
    ],
  }),
  component: WhyPage,
});

function WhyPage() {
  const items = [
    { i: ShieldCheck, t: "Structured supplier assessment", d: "Suppliers are reviewed for credentials, capacity and sample quality before any introduction is made." },
    { i: MessagesSquare, t: "Documented communication", d: "Written updates, recorded decisions, named coordination contacts and defined response windows." },
    { i: FileCheck2, t: "Export documentation support", d: "Documentation, packaging guidance, labelling and compliance coordinated with your counterparties." },
    { i: Globe2, t: "International working practice", d: "Transactions structured around standard Incoterms, documentation and payment methods." },
    { i: Truck, t: "Freight coordination", d: "Forwarder selection, routing options and transit follow-up against agreed milestones." },
    { i: Settings2, t: "Repeatable operations", d: "Documented workflows applied consistently across engagements." },
    { i: Network, t: "Single point of coordination", d: "One accountable contact across sourcing, procurement, freight and documentation." },
    { i: Sparkles, t: "Defined service standards", d: "Scope, responsibilities and reporting agreed in writing before work begins." },
  ];
  return (
    <>
      <section className="relative bg-[var(--color-burgundy)] text-white pt-40 pb-24">
        <div className="container-x">
          <Eyebrow dark>Why Choose Us</Eyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-7xl leading-[1.02] max-w-4xl">
            Operational reasons businesses <span className="italic text-[var(--color-gold)] font-normal">choose us.</span>
          </h1>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-px bg-[var(--color-line)] border border-[var(--color-line)]">
            {items.map((it) => (
              <div key={it.t} className="bg-white p-10">
                <it.i size={28} strokeWidth={1.3} className="text-[var(--color-burgundy)]" />
                <div className="mt-5 font-display text-2xl">{it.t}</div>
                <p className="mt-3 text-[var(--color-ink)]/70 leading-relaxed">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-burgundy)] text-white">
        <div className="container-x py-24 md:py-32 grid lg:grid-cols-[2fr_1fr] gap-10 items-center">
          <h2 className="font-display text-3xl md:text-5xl max-w-3xl">
            See how we'd coordinate <span className="italic text-[var(--color-gold)] font-normal">your trade.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/quote"><GoldButton>Submit a Trade Inquiry <ArrowRight size={14} /></GoldButton></Link>
            <GoldButton variant="outline-light" onClick={openConsultation}>Book a Consultation</GoldButton>
          </div>
        </div>
      </section>
    </>
  );
}