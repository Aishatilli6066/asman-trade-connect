import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import aboutImg from "@/assets/about.jpg";
import warehouse from "@/assets/warehouse.jpg";
import { Eyebrow, GoldButton, SectionHeader } from "@/components/site/primitives";
import { openConsultation } from "@/components/site/consultation-store";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ASMAN Prime Hub — Nigerian Trade & Export Coordination" },
      { name: "description", content: "ASMAN Prime Hub coordinates global sourcing, freight, and Nigerian agricultural export for international businesses. Learn about our approach and capabilities." },
      { property: "og:title", content: "About ASMAN Prime Hub" },
      { property: "og:description", content: "Your Strategic Partner for Global Trade, Sourcing & Procurement" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero />
      <Intro />
      <Capabilities />
      <Closing />
    </>
  );
}

function PageHero() {
  return (
    <section className="relative bg-[var(--color-burgundy)] text-white pt-40 pb-24">
      <div className="container-x">
        <Eyebrow dark>About Us</Eyebrow>
        <h1 className="mt-6 font-display text-4xl md:text-7xl leading-[1.02] max-w-4xl">
          A premium African gateway to <span className="italic text-[var(--color-gold)] font-normal">global trade.</span>
        </h1>
        <p className="mt-8 text-white/70 max-w-2xl text-lg leading-relaxed">
          ASMAN Prime Hub is a Nigeria-based international trade and export coordination
          company. We help businesses source globally, coordinate procurement, manage
          freight, and access Nigerian agricultural export opportunities.
        </p>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-white">
      <div className="container-x py-24 md:py-32 grid lg:grid-cols-2 gap-14 items-center">
        <img src={aboutImg} alt="Professional reviewing trade documents" className="w-full h-[500px] object-cover" loading="lazy" />
        <div>
          <Eyebrow>Who We Are</Eyebrow>
          <h2 className="mt-5 font-display text-3xl md:text-5xl leading-[1.05]">
            Trade infrastructure with operational depth.
          </h2>
          <div className="mt-6 space-y-5 text-[var(--color-ink)]/75 leading-relaxed">
            <p>We are coordinators, not middlemen. Our work is defined by clear processes, verified relationships, and accountable communication across every stage of an international trade.</p>
            <p>Whether your business is sourcing finished goods from Asia, importing raw materials, or buying premium Nigerian commodities for global markets — ASMAN Prime Hub provides a single, professional point of coordination.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const caps = [
    { t: "Global Sourcing Expertise", d: "Active corridors and verified manufacturing partners across major hubs." },
    { t: "Procurement Coordination", d: "Negotiation, sampling and order management on your behalf." },
    { t: "Freight & Logistics", d: "Forwarder coordination across air and sea, with documentation handled." },
    { t: "Agricultural Export", d: "Nigerian commodity sourcing, packaging and export-ready coordination." },
    { t: "Compliance & Documentation", d: "Export documentation, CoO, phytosanitary, and shipping paperwork." },
    { t: "International Communication", d: "Professional, documented, and responsive — across time zones." },
  ];
  return (
    <section className="bg-[var(--color-bone)]">
      <div className="container-x py-24 md:py-32">
        <SectionHeader eyebrow="Capabilities" title={<>What we do, <span className="italic font-normal text-[var(--color-burgundy)]">in detail.</span></>} />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-line)] border border-[var(--color-line)]">
          {caps.map((c) => (
            <div key={c.t} className="bg-white p-8">
              <div className="font-display text-xl">{c.t}</div>
              <p className="mt-2 text-sm text-[var(--color-ink)]/65 leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="bg-[var(--color-burgundy)] text-white">
      <div className="container-x py-24 md:py-32 grid lg:grid-cols-[2fr_1fr] gap-10 items-center">
        <h2 className="font-display text-3xl md:text-5xl max-w-2xl">
          Let's build the <span className="italic text-[var(--color-gold)] font-normal">trade route</span> your business needs.
        </h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={openConsultation}><GoldButton>Book Consultation <ArrowRight size={14} /></GoldButton></button>
          <Link to="/services"><GoldButton variant="outline-light">View Services</GoldButton></Link>
        </div>
      </div>
    </section>
  );
}