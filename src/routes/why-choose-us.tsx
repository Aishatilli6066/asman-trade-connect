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
    { i: ShieldCheck, t: "Verified Suppliers", d: "Every supplier is vetted for credentials, capacity, sample quality and commercial standing before any introduction." },
    { i: MessagesSquare, t: "Transparent Communication", d: "Clear updates, documented decisions, named coordination contacts, and defined response windows." },
    { i: FileCheck2, t: "Export Readiness", d: "Documentation, packaging, labelling and compliance coordinated correctly the first time." },
    { i: Globe2, t: "Global Coordination", d: "Active corridors across Asia, Europe, Middle East, North America and Africa." },
    { i: Truck, t: "Freight Expertise", d: "Forwarder coordination, routing decisions and transit follow-up handled by experienced operators." },
    { i: Settings2, t: "Reliable Operations", d: "Documented workflows, repeatable processes and accountable delivery." },
    { i: Network, t: "Trade Management Systems", d: "Single point of accountability across sourcing, procurement, freight and documentation." },
    { i: Sparkles, t: "Premium Service Standards", d: "Editorial-grade communication, structured reporting and a quality bar built into every engagement." },
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
            <button onClick={openConsultation}><GoldButton>Book Consultation <ArrowRight size={14} /></GoldButton></button>
            <Link to="/services"><GoldButton variant="outline-light">View Services</GoldButton></Link>
          </div>
        </div>
      </section>
    </>
  );
}