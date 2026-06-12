import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ShieldCheck, Truck, Plane, Ship, Globe2, Sprout, Boxes, FileCheck2, MessagesSquare, Network } from "lucide-react";
import heroPort from "@/assets/hero-port.jpg";
import agriHero from "@/assets/agri-hero.jpg";
import logisticsShip from "@/assets/logistics-ship.jpg";
import founderAisha from "@/assets/founder-aisha.jpg";
import warehouseBags from "@/assets/warehouse-bags.jpg";
import badgeCac from "@/assets/badge-cac.jpg";
import badgeNepc from "@/assets/badge-nepc.jpg";
import shipMaerskSvg from "@/assets/ship-maersk.png";
import shipFedexSvg from "@/assets/ship-fedex.png";
import shipUpsSvg from "@/assets/ship-ups.png";
import shipDhlSvg from "@/assets/ship-dhl.png";
import globe from "@/assets/globe.jpg";
import { Eyebrow, GoldButton, SectionHeader, FadeIn } from "@/components/site/primitives";
import { COMMODITIES, REGIONS, SERVICES, SITE } from "@/lib/site-data";
import { openConsultation } from "@/components/site/consultation-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ASMAN Prime Hub | Global Trade, Sourcing & Export Solutions" },
      { name: "description", content: "ASMAN Prime Hub helps businesses worldwide with sourcing, procurement, supplier verification, import/export coordination and logistics solutions." },
      { property: "og:title", content: "ASMAN Prime Hub | Global Trade, Sourcing & Export Solutions" },
      { property: "og:description", content: "ASMAN Prime Hub helps businesses worldwide with sourcing, procurement, supplier verification, import/export coordination and logistics solutions." },
      { property: "og:url", content: "https://asmanprimehub.com/" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ASMAN Prime Hub" },
      { property: "og:image", content: "https://asmanprimehub.com/logo.png" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ASMAN Prime Hub | Global Trade, Sourcing & Export Solutions" },
      { name: "twitter:description", content: "ASMAN Prime Hub helps businesses worldwide with sourcing, procurement, supplier verification, import/export coordination and logistics solutions." },
      { name: "twitter:image", content: "https://asmanprimehub.com/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://asmanprimehub.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://asmanprimehub.com/#webpage",
          url: "https://asmanprimehub.com/",
          name: "ASMAN Prime Hub | Global Trade, Sourcing & Export Solutions",
          description: "ASMAN Prime Hub helps businesses worldwide with sourcing, procurement, supplier verification, import/export coordination and logistics solutions.",
          isPartOf: { "@id": "https://asmanprimehub.com/#website" },
          about: { "@id": "https://asmanprimehub.com/#organization" },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://asmanprimehub.com/" },
            ],
          },
        }),
      },
    ],
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
      <Founder />
      <TrustBadges />
      <Process />
      <Services />
      <AgriHighlight />
      <WhyUs />
      <Standards />
      <ConsultationCTA />
      <ContactStrip />
    </>
  );
}

function TrustBadges() {
  const regs = [
    { img: badgeNepc, alt: "Nigerian Export Promotion Council (NEPC) logo", label: "Nigerian Export Promotion Council", sub: "Registered Exporter" },
    { img: badgeCac, alt: "Corporate Affairs Commission (CAC) logo", label: "Corporate Affairs Commission", sub: "ASMAN Prime Hub Global Services Ltd." },
  ];
  const lines = [
    { name: "DHL", img: shipDhlSvg },
    { name: "FedEx", img: shipFedexSvg },
    { name: "UPS", img: shipUpsSvg },
    { name: "Maersk", img: shipMaerskSvg },
  ];
  return (
    <section className="bg-white border-y border-[var(--color-line)]">
      <div className="container-x py-16 md:py-20">
        <div className="text-center">
          <Eyebrow>Registered & Trusted</Eyebrow>
          <h3 className="mt-4 font-display text-2xl md:text-4xl leading-tight max-w-2xl mx-auto">
            Officially registered. <span className="italic text-[var(--color-burgundy)] font-normal">Globally connected.</span>
          </h3>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
          {regs.map((r) => (
            <div key={r.label} className="flex items-center gap-5 border border-[var(--color-line)] p-5 bg-white">
              <div className="shrink-0 grid place-items-center h-20 w-20 bg-white">
                <img src={r.img} alt={r.alt} className="max-h-16 max-w-16 object-contain" loading="lazy" />
              </div>
              <div>
                <div className="font-display text-base text-[var(--color-ink)] leading-tight">{r.label}</div>
                <div className="mt-1 text-xs text-[var(--color-ink)]/60">{r.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-10 border-t border-[var(--color-line)]">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink)]/55 text-center">
            Freight & Logistics Partners
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center max-w-3xl mx-auto">
            {lines.map((l) => (
              <div key={l.name} className="flex items-center justify-center h-16 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition">
                <img src={l.img} alt={`${l.name} logo`} className="max-h-12 max-w-[140px] object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-[var(--color-burgundy)]">
      <img
        src={heroPort}
        alt="International cargo shipping port at golden hour"
        className="absolute inset-0 h-full w-full object-cover opacity-40 md:opacity-55"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-[var(--color-burgundy)]/50 md:bg-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-burgundy)] via-[var(--color-burgundy)]/85 to-[var(--color-burgundy)]/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-burgundy)]/90 to-transparent" />

      <div className="container-x relative z-10 pb-20 pt-32 md:pb-28">
        <FadeIn>
          <Eyebrow dark>Global Trade · Sourcing · Logistics</Eyebrow>
        </FadeIn>
        <FadeIn delay={120}>
          <h1 className="mt-7 font-display text-[40px] sm:text-6xl md:text-[78px] leading-[1.02] text-white max-w-4xl">
            Global Trade <span className="text-[var(--color-gold)] italic font-normal">& Sourcing</span> Partner.
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
        <FadeIn delay={480}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.28em] text-white/70">
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-[var(--color-gold)]" /> NEPC Registered</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-[var(--color-gold)]" /> ASMAN Prime Hub Global Services Ltd.</span>
          </div>
        </FadeIn>
      </div>

      <div className="absolute bottom-6 right-6 z-10 hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
        <span className="h-px w-10 bg-white/30" />
        Kano · Nigeria
      </div>
    </section>
  );
}

function CoverageStrip() {
  return (
    <section className="relative bg-[var(--color-bone)] text-[var(--color-ink)] border-y border-[var(--color-line)]">
      <div className="container-x py-10 md:py-14 grid gap-8 md:grid-cols-[auto_1fr] items-center">
        <div className="font-display text-xl md:text-2xl max-w-md leading-snug">
          Connecting Nigerian Trade <span className="text-[var(--color-burgundy)] italic">to Global Markets</span>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-4 md:justify-end text-[12px] uppercase tracking-[0.25em] text-[var(--color-ink)]/70">
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
    { kv: "4+", v: "Years", k: "In international trade & sourcing" },
    { kv: "68+", v: "Clients", k: "Served across global markets" },
    { kv: "200+", v: "Suppliers", k: "Verified manufacturers & partners" },
    { kv: "10+", v: "Countries", k: "Asia, Africa, Middle East & Europe" },
  ];
  return (
    <section className="bg-[var(--color-burgundy)] text-white">
      <div className="container-x py-20 md:py-28 grid gap-px md:grid-cols-4 border-y border-white/10">
        {items.map((m) => (
          <div key={m.v} className="p-8 md:p-10 bg-[var(--color-burgundy)] md:border-r last:md:border-r-0 border-white/10">
            <div className="font-display text-5xl md:text-7xl text-[var(--color-gold)] leading-none">
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
          <img src={logisticsShip} alt="Global trade logistics — cargo ship, aircraft and port" className="w-full h-[420px] md:h-[560px] object-cover" loading="lazy" />
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-[var(--color-burgundy)] text-white px-8 py-6 max-w-xs">
            <div className="font-display text-2xl leading-tight">Premium African gateway to global trade.</div>
          </div>
        </div>
        <div>
          <Eyebrow>About ASMAN Prime Hub</Eyebrow>
          <h2 className="mt-5 font-display text-3xl md:text-5xl leading-[1.05]">
            Your Strategic Partner for Global Trade, Sourcing & Procurement
          </h2>
          <p className="mt-6 text-[var(--color-ink)]/70 text-base md:text-lg leading-relaxed">
            We coordinate the full trade lifecycle—from supplier verification and procurement to
            freight management, sourcing, and international trade operations. Our clients gain a
            single accountable partner for sourcing, logistics coordination, export support, and
            global market access across multiple regions.
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
            <div key={s.t} className="bg-white p-8 md:p-10 group hover:bg-[var(--color-burgundy)] hover:text-white transition-colors duration-500">
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
    <section className="bg-white text-[var(--color-ink)]">
      <div className="container-x py-24 md:py-32">
        <SectionHeader eyebrow="Services" title={<>Trade infrastructure, <span className="italic text-[var(--color-burgundy)] font-normal">end-to-end.</span></>} subtitle="From sourcing to shipping, every step coordinated through one trusted partner." />
        <div className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-4 border border-[var(--color-line)] bg-[var(--color-line)]">
          {SERVICES.map((s, i) => {
            const Icon = icons[i] ?? Boxes;
            return (
              <div key={s.title} className="bg-white p-8 group hover:bg-[var(--color-bone)] transition-colors">
                <Icon size={26} strokeWidth={1.4} className="text-[var(--color-burgundy)]" />
                <div className="mt-6 font-display text-xl">{s.title}</div>
                <p className="mt-3 text-sm text-[var(--color-ink)]/65 leading-relaxed">{s.desc}</p>
                <div className="mt-6 h-px w-8 bg-[var(--color-gold)] group-hover:w-16 transition-all" />
              </div>
            );
          })}
        </div>
        <div className="mt-12 flex justify-center">
          <Link to="/services">
            <GoldButton variant="burgundy">View All Services <ArrowRight size={14} /></GoldButton>
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
      <img src={warehouseBags} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-burgundy-deep)]/80 via-[var(--color-burgundy-deep)]/95 to-[var(--color-burgundy)]" />
      <div className="container-x relative z-10 py-24 md:py-32">
        <SectionHeader
          eyebrow="Agricultural Export"
          dark
          title={<>Nigerian agricultural commodities <span className="italic text-[var(--color-gold)] font-normal">for global markets.</span></>}
          subtitle="Premium-grade commodities, export-ready packaging, and end-to-end coordination for international buyers."
        />
        <div className="mt-16 grid gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border border-white/10 bg-white/10">
          {COMMODITIES.map((c) => (
            <div key={c.slug} className="bg-[var(--color-burgundy)] group overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <img src={commodityImg(c.img)} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="font-display text-xl">{c.name}</div>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{c.desc}</p>
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

function ConsultationCTA() {
  return (
    <section className="relative bg-white text-[var(--color-ink)] overflow-hidden border-y border-[var(--color-line)]">
      <img src={globe} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.06]" loading="lazy" />
      <div className="container-x relative z-10 py-24 md:py-32 grid lg:grid-cols-[2fr_1fr] gap-10 items-end">
        <h2 className="font-display text-4xl md:text-6xl leading-[1.02] max-w-3xl">
          Ready to move your trade <span className="italic text-[var(--color-burgundy)] font-normal">forward?</span>
        </h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={openConsultation}><GoldButton variant="burgundy">Request Consultation</GoldButton></button>
          <Link to="/agricultural-export"><GoldButton>Discuss Export</GoldButton></Link>
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="bg-[var(--color-bone)]">
      <div className="container-x py-24 md:py-32 grid gap-14 lg:grid-cols-[auto_1fr] items-center">
        <div className="relative mx-auto lg:mx-0">
          <div className="absolute -inset-3 border border-[var(--color-gold)] hidden md:block" />
          <img
            src={founderAisha}
            alt="Aisha Usman, Founder & CEO of ASMAN Prime Hub"
            className="relative w-[280px] h-[340px] md:w-[360px] md:h-[440px] object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <Eyebrow>Meet the Founder</Eyebrow>
          <h2 className="mt-5 font-display text-3xl md:text-5xl leading-[1.05]">
            Aisha Usman <span className="italic font-normal text-[var(--color-burgundy)]">— Founder & CEO.</span>
          </h2>
          <div className="mt-4 text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink)]/60">
            International Trade Consultant · Sourcing Specialist · Export Strategist
          </div>
          <p className="mt-7 text-[var(--color-ink)]/75 text-base md:text-lg leading-relaxed max-w-2xl">
            Aisha Usman is the Founder of ASMAN Prime Hub, an international trade consultancy
            headquartered in Kano, Nigeria. With 4+ years of experience, she has served 68+ clients
            across global markets — connecting Nigerian agro-commodity exporters with verified
            buyers in China, UAE, Egypt, India, Turkey, and Europe, while sourcing quality
            products from Asia for Nigerian importers.
          </p>
          <p className="mt-4 text-[var(--color-ink)]/70 leading-relaxed max-w-2xl">
            She specializes in export structuring, supplier verification, trade documentation,
            and landed cost analysis — bridging the gap between African producers and global
            markets with precision and integrity.
          </p>
          <div className="mt-8 h-px w-16 bg-[var(--color-gold)]" />
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
