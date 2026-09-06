import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ClipboardCheck,
  FileCheck2,
  ShieldCheck,
  Truck,
} from "lucide-react";
import heroPort from "@/assets/hero-port.jpg";
import founderAisha from "@/assets/founder-aisha.jpg";
import badgeCac from "@/assets/badge-cac.jpg";
import badgeNepc from "@/assets/badge-nepc.jpg";
import sesameImage from "@/assets/c-sesame.jpg";
import hibiscusImage from "@/assets/c-hibiscus.jpg";
import gingerImage from "@/assets/c-ginger.jpg";
import cashewImage from "@/assets/c-cashew.jpg";
import { Eyebrow, GoldButton, SectionHeader } from "@/components/site/primitives";
import { openConsultation } from "@/components/site/consultation-store";
import { COMMODITY_NOTE, SITE } from "@/lib/site-data";

const HOME_TITLE = "Global Sourcing, Import Coordination & Export Consultancy | ASMAN Prime Hub";
const HOME_DESC =
  "ASMAN Prime Hub provides global sourcing, supplier verification, procurement coordination, import support, agro commodity sourcing, export documentation and international trade advisory for businesses across global markets.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESC },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESC },
      { property: "og:url", content: "https://asmanprimehub.com/" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ASMAN Prime Hub" },
      { property: "og:image", content: "https://asmanprimehub.com/logo.png" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESC },
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
          name: HOME_TITLE,
          description: HOME_DESC,
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
  component: HomePage,
});

const pathways = [
  {
    number: "01",
    title: "Global Product & Machinery Sourcing",
    description:
      "Structured sourcing and supplier assessment for products, machinery, equipment and raw materials across international markets.",
    to: "/global-sourcing" as const,
    link: "Explore global sourcing",
  },
  {
    number: "02",
    title: "Nigerian Commodity Sourcing",
    description:
      "Inquiry-led sourcing and export coordination for Nigerian agricultural commodities against buyer specifications.",
    to: "/nigerian-commodity-sourcing" as const,
    link: "Explore commodity sourcing",
  },
];

const capabilities = [
  {
    icon: ShieldCheck,
    title: "Sourcing & Supplier Assessment",
    description:
      "We identify suitable supply options and assess supplier credentials, capacity, quotations and product fit before commitment.",
  },
  {
    icon: FileCheck2,
    title: "Commercial & Documentation Control",
    description:
      "We clarify specifications, commercial terms, landed-cost considerations and the documentation required for the transaction.",
  },
  {
    icon: Truck,
    title: "Logistics & Transaction Coordination",
    description:
      "We coordinate forwarders, inspections, shipment milestones and communication from agreed scope through documented handover.",
  },
];

const process = [
  { number: "01", title: "Requirement review", description: "We define the product, specification, quantity, destination and timeline." },
  { number: "02", title: "Feasibility and assessment", description: "We assess supply options, risks, documentation and commercial viability." },
  { number: "03", title: "Agreed commercial scope", description: "Responsibilities, professional fees and execution terms are confirmed in writing." },
  { number: "04", title: "Verification, documentation and execution", description: "We coordinate the approved work and report progress against agreed milestones." },
];

const commodities = [
  { name: "Sesame", image: sesameImage, alt: "Sesame seeds available through inquiry-led Nigerian commodity sourcing" },
  { name: "Hibiscus", image: hibiscusImage, alt: "Dried hibiscus available through inquiry-led Nigerian commodity sourcing" },
  { name: "Ginger", image: gingerImage, alt: "Dried ginger available through inquiry-led Nigerian commodity sourcing" },
  { name: "Cashew", image: cashewImage, alt: "Raw cashew nuts available through inquiry-led Nigerian commodity sourcing" },
];

function HomePage() {
  return (
    <>
      <Hero />
      <Pathways />
      <Capabilities />
      <Process />
      <CommodityFeature />
      <TrustEvidence />
      <FounderPreview />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[620px] items-end overflow-hidden bg-[var(--color-burgundy)] sm:min-h-[650px] lg:min-h-[680px] lg:items-center">
      <img
        src={heroPort}
        alt="Container port supporting international sourcing, import and export coordination"
        className="absolute inset-0 h-full w-full object-cover object-center"
        width={1920}
        height={1080}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[var(--color-ink)]/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-burgundy)]/95 via-[var(--color-burgundy)]/70 to-[var(--color-ink)]/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-ink)]/55 to-transparent" />

      <div className="container-x relative z-10 pb-14 pt-32 sm:pb-16 lg:py-36">
        <div className="max-w-[820px]">
          <Eyebrow dark>Global sourcing · Procurement · Trade coordination</Eyebrow>
          <h1 className="mt-6 text-[40px] font-medium leading-[1.04] text-white sm:text-5xl md:text-6xl lg:text-[72px]">
            Global sourcing and trade execution, structured for business.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            ASMAN Prime Hub helps businesses source products, assess suppliers, coordinate procurement and manage import and export requirements with commercial discipline.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/request-a-quote"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--color-gold)] px-7 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Submit a Trade Inquiry <ArrowRight size={15} />
            </Link>
            <Link
              to="/services"
              className="inline-flex min-h-12 items-center justify-center border border-white/60 px-7 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              Explore Services
            </Link>
          </div>
          <div className="mt-7 flex items-center gap-3 text-xs text-white/80">
            <span className="h-px w-8 bg-[var(--color-gold)]" aria-hidden="true" />
            NEPC-registered exporter
          </div>
        </div>
      </div>
    </section>
  );
}

function Pathways() {
  return (
    <section className="border-b border-[var(--color-line)] bg-white">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_2fr] lg:gap-14">
          <div>
            <Eyebrow>Start here</Eyebrow>
            <h2 className="mt-4 text-3xl leading-tight text-[var(--color-ink)] md:text-4xl">Two clear sourcing pathways.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {pathways.map((pathway) => (
              <Link
                key={pathway.title}
                to={pathway.to}
                className="group border border-[var(--color-line)] bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-burgundy)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] md:p-8"
              >
                <div className="text-xs font-semibold tracking-[0.16em] text-[var(--color-burgundy)]">{pathway.number}</div>
                <h3 className="mt-5 text-2xl leading-snug text-[var(--color-ink)]">{pathway.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/70">{pathway.description}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-burgundy)]">
                  {pathway.link} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="bg-[var(--color-bone)]">
      <div className="container-x py-18 md:py-24">
        <SectionHeader
          eyebrow="Core capabilities"
          title={<>Commercial discipline across the <span className="font-normal italic text-[var(--color-burgundy)]">trade process.</span></>}
          subtitle="Focused coordination where supplier decisions, documentation and execution need clear control."
        />
        <div className="mt-10 grid gap-px border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, description }) => (
            <article key={title} className="bg-white p-7 md:p-8">
              <Icon size={25} strokeWidth={1.5} className="text-[var(--color-burgundy)]" aria-hidden="true" />
              <h3 className="mt-5 text-xl leading-snug text-[var(--color-ink)]">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/70">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="bg-white">
      <div className="container-x py-18 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow="How we work" title="Four defined stages from inquiry to execution." />
          <Link to="/services" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-burgundy)] hover:text-[var(--color-ink)]">
            View the detailed process <ArrowRight size={14} />
          </Link>
        </div>
        <ol className="mt-10 grid gap-0 border-y border-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step) => (
            <li key={step.title} className="border-b border-[var(--color-line)] py-7 pr-6 sm:border-r sm:px-6 sm:first:pl-0 lg:border-b-0 lg:last:border-r-0">
              <div className="font-display text-3xl text-[var(--color-gold)]">{step.number}</div>
              <h3 className="mt-4 text-lg leading-snug text-[var(--color-ink)]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/65">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CommodityFeature() {
  return (
    <section className="bg-[var(--color-burgundy)] text-white">
      <div className="container-x py-18 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.3fr] lg:items-end">
          <div>
            <Eyebrow dark>Commodity sourcing</Eyebrow>
            <h2 className="mt-5 text-3xl leading-tight text-white md:text-5xl">Nigerian origin, coordinated to buyer requirements.</h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
              We support inquiry-led sourcing, specification confirmation and export coordination for selected Nigerian agricultural commodities.
            </p>
            <Link to="/nigerian-commodity-sourcing" className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)] hover:text-white">
              View all commodities <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {commodities.map((commodity) => (
              <figure key={commodity.name} className="group relative aspect-[4/5] overflow-hidden bg-[var(--color-ink)]">
                <img src={commodity.image} alt={commodity.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/80 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 font-display text-lg text-white">{commodity.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <p className="mt-8 border-t border-white/15 pt-5 text-xs leading-relaxed text-white/65">{COMMODITY_NOTE}</p>
      </div>
    </section>
  );
}

function TrustEvidence() {
  return (
    <section className="border-b border-[var(--color-line)] bg-white">
      <div className="container-x grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-16">
        <div>
          <Eyebrow>Registration & trust</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-2xl leading-tight text-[var(--color-ink)] md:text-4xl">
            Registered Nigerian company and NEPC-registered exporter.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-ink)]/65">
            ASMAN Prime Hub Global Services Limited maintains corporate registration with the CAC and exporter registration with the NEPC. Registration does not imply government endorsement.
          </p>
        </div>
        <div className="flex items-center gap-5 sm:gap-8">
          <img src={badgeCac} alt="Corporate Affairs Commission registration logo" className="h-16 w-16 object-contain sm:h-20 sm:w-20" loading="lazy" />
          <span className="h-12 w-px bg-[var(--color-line)]" aria-hidden="true" />
          <img src={badgeNepc} alt="Nigerian Export Promotion Council registered exporter logo" className="h-16 w-28 object-contain sm:h-20 sm:w-36" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function FounderPreview() {
  return (
    <section className="bg-[var(--color-bone)]">
      <div className="container-x grid gap-9 py-18 md:grid-cols-[280px_1fr] md:items-center md:py-24 lg:gap-16">
        <img
          src={founderAisha}
          alt="Aisha Usman, Founder and Trade & Business Strategist at ASMAN Prime Hub"
          className="aspect-[4/5] w-full max-w-[280px] object-cover object-top shadow-md"
          loading="lazy"
        />
        <div className="max-w-2xl">
          <Eyebrow>Leadership</Eyebrow>
          <h2 className="mt-5 text-3xl leading-tight text-[var(--color-ink)] md:text-5xl">Aisha Usman</h2>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-burgundy)]">Founder · Trade &amp; Business Strategist</p>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-ink)]/72">
            Aisha leads the company’s work across sourcing, supplier assessment, trade documentation and commercial coordination, with an emphasis on disciplined requirements, clear decisions and accountable execution.
          </p>
          <Link to="/about" className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-burgundy)] hover:text-[var(--color-ink)]">
            Meet the Founder <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-[var(--color-ink)] text-white">
      <div className="container-x grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-center md:py-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
            <ClipboardCheck size={16} aria-hidden="true" /> Define your requirement
          </div>
          <h2 className="mt-5 text-3xl leading-tight text-white md:text-5xl">Bring structure to your next sourcing or trade requirement.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">Share the product, specification, quantity and destination. We will review the requirement and confirm the appropriate next step.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <Link to="/request-a-quote" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--color-gold)] px-7 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Submit a Trade Inquiry <ArrowRight size={14} />
          </Link>
          <GoldButton variant="outline-light" onClick={openConsultation}>Book a Consultation</GoldButton>
        </div>
      </div>
    </section>
  );
}