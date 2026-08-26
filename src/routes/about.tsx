import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import aboutImg from "@/assets/about.jpg";
import { Eyebrow, GoldButton, SectionHeader } from "@/components/site/primitives";
import { openConsultation } from "@/components/site/consultation-store";
import { SITE, HOW_WE_WORK, DISCLAIMER } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ASMAN Prime Hub | Global Trade & Sourcing Partner" },
      { name: "description", content: "Learn how ASMAN Prime Hub coordinates global sourcing, procurement, freight and export for international businesses. Your strategic partner for global trade." },
      { property: "og:title", content: "About ASMAN Prime Hub | Global Trade & Sourcing Partner" },
      { property: "og:description", content: "Learn how ASMAN Prime Hub coordinates global sourcing, procurement, freight and export for international businesses." },
      { property: "og:url", content: "https://asmanprimehub.com/about" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ASMAN Prime Hub" },
      { property: "og:image", content: "https://asmanprimehub.com/logo.png" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About ASMAN Prime Hub | Global Trade & Sourcing Partner" },
      { name: "twitter:description", content: "Learn how ASMAN Prime Hub coordinates global sourcing, procurement, freight and export for international businesses." },
      { name: "twitter:image", content: "https://asmanprimehub.com/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://asmanprimehub.com/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://asmanprimehub.com/" },
            { "@type": "ListItem", position: 2, name: "About", item: "https://asmanprimehub.com/about" },
          ],
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero />
      <Intro />
      <HowWeWork />
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
          A Nigerian gateway to <span className="italic text-[var(--color-gold)] font-normal">global trade.</span>
        </h1>
        <p className="mt-8 text-white/70 max-w-2xl text-lg leading-relaxed">
          {SITE.legalName}, trading as ASMAN Prime Hub, is a Nigeria-based international trade,
          sourcing, procurement, agricultural export and freight-coordination company working
          with businesses across global markets.
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
            <p>We are a coordination company. Our work is defined by documented process, structured supplier assessment and accountable communication at each stage of an international transaction.</p>
            <p>Whether your business is sourcing finished goods, importing raw materials, or buying Nigerian agricultural commodities, ASMAN Prime Hub provides a single professional point of coordination — not a marketplace listing and not a substitute for your own commercial decisions.</p>
            <p>The company is led by its founder, Aisha Usman, Trade &amp; Business Strategist, and operates through repeatable systems rather than individual relationships.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowWeWork() {
  return (
    <section className="bg-white border-t border-[var(--color-line)]">
      <div className="container-x py-24 md:py-32">
        <SectionHeader eyebrow="How We Work" title={<>A defined process, <span className="italic font-normal text-[var(--color-burgundy)]">stage by stage.</span></>} />
        <ol className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-5 bg-[var(--color-line)] border border-[var(--color-line)]">
          {HOW_WE_WORK.map((s, i) => (
            <li key={s.t} className="bg-white p-8">
              <div className="font-display text-4xl text-[var(--color-gold)]">0{i + 1}</div>
              <div className="mt-5 font-display text-lg leading-snug">{s.t}</div>
              <p className="mt-3 text-sm text-[var(--color-ink)]/65 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Capabilities() {
  const caps = [
    { t: "Global sourcing coordination", d: "Supplier identification and assessment across major manufacturing markets." },
    { t: "Procurement coordination", d: "Negotiation support, sampling and order follow-up on your behalf." },
    { t: "Freight & logistics", d: "Forwarder coordination across air and sea, with documentation handled." },
    { t: "Agricultural export", d: "Nigerian commodity sourcing, packaging guidance and export coordination." },
    { t: "Documentation support", d: "Export documentation, certificates of origin, phytosanitary and shipping paperwork." },
    { t: "International communication", d: "Professional, documented and responsive across time zones." },
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
        <div className="mt-14 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink)]/50">Company Information</div>
          <p className="mt-3 text-sm text-[var(--color-ink)]/65 leading-relaxed">
            {SITE.legalName} · Nigeria-based international trade and export coordination company ·{" "}
            <a className="hover:text-[var(--color-burgundy)]" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
          <p className="mt-3 text-xs text-[var(--color-ink)]/55 leading-relaxed">{DISCLAIMER}</p>
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
          <Link to="/request-a-quote"><GoldButton>Submit a Trade Inquiry <ArrowRight size={14} /></GoldButton></Link>
          <GoldButton variant="outline-light" onClick={openConsultation}>Book a Consultation</GoldButton>
        </div>
      </div>
    </section>
  );
}