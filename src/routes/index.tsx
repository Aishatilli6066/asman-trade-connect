import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ShieldCheck, Truck, Plane, Ship, Globe2, Sprout, Boxes, FileCheck2, MessagesSquare, Network } from "lucide-react";
import heroPort from "@/assets/hero-port.jpg";
import agriHero from "@/assets/agri-hero.jpg";
import warehouse from "@/assets/warehouse.jpg";
import globe from "@/assets/globe.jpg";
import { Eyebrow, GoldButton, SectionHeader, FadeIn } from "@/components/site/primitives";
import { COMMODITIES, REGIONS, SERVICES, SITE } from "@/lib/site-data";
import { openConsultation } from "@/components/site/consultation-store";
import * as Assets from "@/assets/commodities-map";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ASMAN Prime Hub — Global Sourcing & Nigerian Export Coordination" },
      { name: "description", content: "Global sourcing, freight coordination, and Nigerian agricultural exports — ASMAN Prime Hub connects businesses to verified suppliers and trade infrastructure." },
      { property: "og:title", content: "ASMAN Prime Hub — Global Sourcing & Export" },
      { property: "og:description", content: "Premium African trade coordination — sourcing, procurement, freight and agricultural export." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <CoverageStrip />
      <Metrics />
      <AboutPreview />
      <Process />
      <Services />
      <AgriHighlight />
      <WhyUs />
      <Standards />
      <Testimonials />
      <ConsultationCTA />
      <ContactStrip />
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-[var(--color-ink)]">
      <img
        src={heroPort}
        alt="International cargo shipping port at golden hour"
        className="absolute inset-0 h-full w-full object-cover opacity-65"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-[var(--color-ink)]/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/80 to-transparent" />

      <div className="container-x relative z-10 pb-20 pt-32 md:pb-28">
        <FadeIn>
          <Eyebrow dark>Global Trade · Sourcing · Logistics</Eyebrow>
        </FadeIn>
        <FadeIn delay={120}>
          <h1 className="mt-7 font-display text-[44px] sm:text-6xl md:text-[78px] leading-[0.98] text-white max-w-4xl">
            Global Sourcing.
            <br />
            Seamless Trade.
            <br />
            <span className="text-[var(--color-gold)] italic font-normal">Delivered.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={240}>
          <p className="mt-8 text-white/75 max-w-xl text-base md:text-lg leading-relaxed">
            ASMAN Prime Hub helps businesses source products globally, manage procurement,
            coordinate shipping, and connect with international trade opportunities.
          </p>
        </FadeIn>
        <FadeIn delay={360}>
          <div className="mt-10 flex flex-wrap gap-3">
            <GoldButton onClick={openConsultation}>
              Book Consultation <ArrowRight size={14} />
            </GoldButton>
            <Link to="/services">
              <GoldButton variant="outline-light">Explore Services</GoldButton>
            </Link>
          </div>
        </FadeIn>
      </div>

      <div className="absolute bottom-6 right-6 z-10 hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
        <span className="h-px w-10 bg-white/30" />
        Lagos · Nigeria
      </div>
    </section>
  );
}

function CoverageStrip() {
  return (
    <section className="relative bg-[var(--color-burgundy)] text-white">
      <div className="container-x py-10 md:py-14 grid gap-8 md:grid-cols-[auto_1fr] items-center">
        <div className="font-display text-xl md:text-2xl max-w-md leading-snug">
          Connecting Nigerian Trade <span className="text-[var(--color-gold)] italic">to Global Markets</span>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-4 md:justify-end text-[12px] uppercase tracking-[0.25em] text-white/80">
          {REGIONS.map((r) => (
            <div key={r} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-[var(--color-gold)]" />
              {r}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  const items = [
    { kv: "Verified", v: "Supplier Network", k: "Vetted partners across major hubs" },
    { kv: "International", v: "Trade Support", k: "End-to-end coordination" },
    { kv: "Export", v: "Coordination", k: "Documentation & compliance" },
    { kv: "Freight", v: "Operations", k: "Air & sea routing" },
  ];
  return (
    <section className="bg-[var(--color-ink)] text-white">
      <div className="container-x py-20 md:py-28 grid gap-px md:grid-cols-4 border-y border-white/10">
        {items.map((m) => (
          <div key={m.v} className="p-8 md:p-10 bg-[var(--color-ink)] md:border-r last:md:border-r-0 border-white/10">
            <div className="font-display text-3xl md:text-5xl text-[var(--color-gold)] leading-none">
              {m.kv}
            </div>
            <div className="mt-2 font-display text-xl md:text-2xl text-white">{m.v}</div>
            <p className="mt-4 text-sm text-white/55">{m.k}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="bg-white">
      <div className="container-x py-24 md:py-32 grid gap-14 lg:grid-cols-2 items-center">
        <div className="relative">
          <img src={warehouse} alt="Modern warehouse" className="w-full h-[420px] md:h-[560px] object-cover" loading="lazy" />
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-[var(--color-burgundy)] text-white px-8 py-6 max-w-xs">
            <div className="font-display text-2xl leading-tight">Premium African gateway to global trade.</div>
          </div>
        </div>
        <div>
          <Eyebrow>About ASMAN Prime Hub</Eyebrow>
          <h2 className="mt-5 font-display text-3xl md:text-5xl leading-[1.05]">
            Nigeria's premium gateway to global trade and export coordination.
          </h2>
          <p className="mt-6 text-[var(--color-ink)]/70 text-base md:text-lg leading-relaxed">
            We coordinate the full trade lifecycle — from supplier verification and procurement to
            freight management and Nigerian agricultural export. Our clients gain a single,
            accountable partner across continents.
          </p>
          <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {[
              "Supplier verification",
              "Procurement coordination",
              "Import / export operations",
              "Freight management",
              "Agricultural export expertise",
              "Compliance & documentation",
            ].map((i) => (
              <li key={i} className="flex items-start gap-2 text-[var(--color-ink)]/80">
                <Check size={16} className="mt-0.5 text-[var(--color-burgundy)] shrink-0" /> {i}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link to="/about">
              <GoldButton variant="burgundy">Learn More <ArrowRight size={14} /></GoldButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { t: "Consultation", d: "We start by understanding your sourcing or export brief, market, volumes and timeline." },
    { t: "Supplier Verification", d: "Due diligence on factories, credentials, capacity and commercial reliability." },
    { t: "Procurement & Coordination", d: "Negotiation, sampling, quality control and order coordination on your behalf." },
    { t: "Shipping & Delivery Support", d: "Freight routing, documentation, customs liaison and delivery follow-through." },
  ];
  return (
    <section className="bg-[var(--color-bone)]">
      <div className="container-x py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader eyebrow="How We Work" title={<>Four steps. <span className="italic font-normal text-[var(--color-burgundy)]">One accountable partner.</span></>} />
        </div>
        <div className="mt-16 grid gap-px md:grid-cols-4 border border-[var(--color-line)] bg-[var(--color-line)]">
          {steps.map((s, i) => (
            <div key={s.t} className="bg-white p-8 md:p-10 group hover:bg-[var(--color-ink)] hover:text-white transition-colors duration-500">
              <div className="font-display text-5xl text-[var(--color-gold)]">0{i + 1}</div>
              <div className="mt-6 font-display text-xl">{s.t}</div>
              <p className="mt-3 text-sm text-[var(--color-ink)]/70 group-hover:text-white/60">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const icons = [Boxes, ShieldCheck, Network, Globe2, Truck, Plane, Ship, Sprout];
  return (
    <section className="bg-[var(--color-ink)] text-white">
      <div className="container-x py-24 md:py-32">
        <SectionHeader eyebrow="Services" dark title={<>Trade infrastructure, <span className="italic text-[var(--color-gold)] font-normal">end-to-end.</span></>} subtitle="From sourcing to shipping, every step coordinated through one trusted partner." />
        <div className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-4 border border-white/10 bg-white/10">
          {SERVICES.map((s, i) => {
            const Icon = icons[i] ?? Boxes;
            return (
              <div key={s.title} className="bg-[var(--color-ink)] p-8 group hover:bg-[var(--color-ink-soft)] transition-colors">
                <Icon size={26} strokeWidth={1.4} className="text-[var(--color-gold)]" />
                <div className="mt-6 font-display text-xl">{s.title}</div>
                <p className="mt-3 text-sm text-white/55 leading-relaxed">{s.desc}</p>
                <div className="mt-6 h-px w-8 bg-[var(--color-gold)]/60 group-hover:w-16 transition-all" />
              </div>
            );
          })}
        </div>
        <div className="mt-12 flex justify-center">
          <Link to="/services">
            <GoldButton variant="outline-gold">View All Services <ArrowRight size={14} /></GoldButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

const commodityImages = import.meta.glob<{ default: string }>("/src/assets/c-*.jpg", { eager: true });
function commodityImg(img: string) {
  const entry = Object.entries(commodityImages).find(([k]) => k.endsWith(`${img}.jpg`));
  return entry?.[1].default ?? "";
}

function AgriHighlight() {
  return (
    <section className="relative bg-[var(--color-burgundy-deep)] text-white overflow-hidden">
      <img src={agriHero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-burgundy-deep)]/80 via-[var(--color-burgundy-deep)]/95 to-[var(--color-ink)]" />
      <div className="container-x relative z-10 py-24 md:py-32">
        <SectionHeader
          eyebrow="Agricultural Export"
          dark
          title={<>Nigerian agricultural commodities <span className="italic text-[var(--color-gold)] font-normal">for global markets.</span></>}
          subtitle="Premium-grade commodities, export-ready packaging, and end-to-end coordination for international buyers."
        />
        <div className="mt-16 grid gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border border-white/10 bg-white/10">
          {COMMODITIES.map((c) => (
            <div key={c.slug} className="bg-[var(--color-ink)] group overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <img src={commodityImg(c.img)} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="font-display text-lg">{c.name}</div>
                <p className="mt-1 text-xs text-white/55 leading-relaxed line-clamp-2">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/agricultural-export"><GoldButton>Explore Commodities <ArrowRight size={14} /></GoldButton></Link>
          <button onClick={openConsultation}>
            <GoldButton variant="outline-gold">Discuss Export Opportunities</GoldButton>
          </button>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { i: ShieldCheck, t: "Verified Supplier Network", d: "Every partner vetted for capacity, credentials, and reliability." },
    { i: Network, t: "End-to-End Trade Management", d: "One coordinated workflow from inquiry to delivery." },
    { i: MessagesSquare, t: "Transparent Communication", d: "Clear updates, documented decisions, no surprises." },
    { i: Globe2, t: "Global Market Connectivity", d: "Active corridors across Asia, Europe, Middle East and the Americas." },
    { i: FileCheck2, t: "Export Compliance Support", d: "Documentation and regulatory coordination handled correctly." },
    { i: Truck, t: "Reliable Logistics Coordination", d: "Vetted forwarders, transparent routing and proactive follow-up." },
  ];
  return (
    <section className="bg-white">
      <div className="container-x py-24 md:py-32">
        <SectionHeader eyebrow="Why Choose Us" title={<>Operational depth your trade <span className="italic font-normal text-[var(--color-burgundy)]">can rely on.</span></>} />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-line)] border border-[var(--color-line)]">
          {items.map((it) => (
            <div key={it.t} className="bg-white p-8 md:p-10">
              <it.i size={24} strokeWidth={1.4} className="text-[var(--color-burgundy)]" />
              <div className="mt-5 font-display text-xl">{it.t}</div>
              <p className="mt-3 text-sm text-[var(--color-ink)]/65 leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Standards() {
  const cols = [
    { t: "Supplier verification processes", d: "Multi-point checks across credentials, capacity, sample quality, and commercial standing." },
    { t: "Quality control coordination", d: "Pre-shipment inspection arrangements and sample-based verification workflows." },
    { t: "Export readiness support", d: "Packaging guidance, labelling, and shipment preparation aligned to buyer specifications." },
    { t: "Documentation guidance", d: "Coordination of CoOs, phytosanitary, commercial invoices, packing lists and shipping docs." },
    { t: "Communication standards", d: "Defined response windows, documented updates, and named coordination contacts." },
  ];
  return (
    <section className="bg-[var(--color-bone)]">
      <div className="container-x py-24 md:py-32 grid lg:grid-cols-[1fr_2fr] gap-14">
        <SectionHeader eyebrow="Operational Standards" title={<>The credibility of how <span className="italic font-normal text-[var(--color-burgundy)]">we operate.</span></>} subtitle="Built into every workflow — so your trade moves forward without friction." />
        <div className="grid sm:grid-cols-2 gap-px bg-[var(--color-line)] border border-[var(--color-line)]">
          {cols.map((c) => (
            <div key={c.t} className="bg-white p-7">
              <div className="font-display text-lg">{c.t}</div>
              <p className="mt-2 text-sm text-[var(--color-ink)]/65 leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const tts = [
    { q: "Their supplier verification work saved us from a costly mistake. The coordination was professional and the communication was consistently clear.", n: "Procurement Director", c: "European Importer" },
    { q: "Freight coordination was handled end-to-end. Our shipments arrived on schedule with all documentation in order — every time.", n: "Operations Lead", c: "Middle East Trading Co." },
    { q: "We received export-ready commodities with the quality and packaging that matched our brief. A reliable partner for Nigerian sourcing.", n: "Sourcing Manager", c: "Asia-Pacific Buyer" },
  ];
  return (
    <section className="bg-[var(--color-ink)] text-white">
      <div className="container-x py-24 md:py-32">
        <SectionHeader eyebrow="In Their Words" dark title={<>Trusted by businesses <span className="italic text-[var(--color-gold)] font-normal">across continents.</span></>} />
        <div className="mt-16 grid md:grid-cols-3 gap-px border border-white/10 bg-white/10">
          {tts.map((t, i) => (
            <figure key={i} className="bg-[var(--color-ink)] p-10">
              <div className="font-display text-3xl text-[var(--color-gold)] leading-none">"</div>
              <blockquote className="mt-4 font-display text-lg leading-snug text-white/90">
                {t.q}
              </blockquote>
              <div className="mt-8 h-px w-10 bg-[var(--color-gold)]" />
              <figcaption className="mt-4 text-sm">
                <div className="text-white">{t.n}</div>
                <div className="text-white/45 text-[12px] uppercase tracking-[0.2em] mt-1">{t.c}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConsultationCTA() {
  return (
    <section className="relative bg-[var(--color-burgundy)] text-white overflow-hidden">
      <img src={globe} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-screen" loading="lazy" />
      <div className="container-x relative z-10 py-24 md:py-32 grid lg:grid-cols-[2fr_1fr] gap-10 items-end">
        <h2 className="font-display text-4xl md:text-6xl leading-[1.02] max-w-3xl">
          Ready to move your trade <span className="italic text-[var(--color-gold)] font-normal">forward?</span>
        </h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={openConsultation}><GoldButton>Request Consultation</GoldButton></button>
          <Link to="/agricultural-export"><GoldButton variant="outline-light">Discuss Export</GoldButton></Link>
        </div>
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section className="bg-white border-t border-[var(--color-line)]">
      <div className="container-x py-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <div className="font-display text-xl md:text-2xl">We respond to trade inquiries within 24 hours.</div>
          <div className="mt-2 text-sm text-[var(--color-ink)]/60">
            <a className="hover:text-[var(--color-burgundy)]" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span className="mx-3">·</span>
            <a className="hover:text-[var(--color-burgundy)]" href={`https://wa.me/${SITE.whatsappRaw}`}>{SITE.whatsapp}</a>
          </div>
        </div>
        <Link to="/contact"><GoldButton variant="burgundy">Open Contact <ArrowRight size={14} /></GoldButton></Link>
      </div>
    </section>
  );
}
