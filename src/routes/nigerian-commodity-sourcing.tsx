import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Eyebrow, SectionHeader } from "@/components/site/primitives";
import { CommodityRequirementForm } from "@/components/site/forms/CommodityRequirementForm";
import { COMMODITIES, COMMODITY_NOTE, COMMODITY_SCOPE, ENGAGEMENT_PROCESS, waLink } from "@/lib/site-data";
import { breadcrumbLd, pageHead, serviceLd } from "@/lib/seo";
import { trackContact } from "@/lib/analytics";
import agriHero from "@/assets/agri-hero.jpg";

const TITLE = "Nigerian Commodity Sourcing & Export Coordination | ASMAN Prime Hub";
const DESC =
  "Nigerian agricultural commodity sourcing and export coordination for international buyers: origin sourcing, quality confirmation, inspection, documentation and freight coordination.";

export const Route = createFileRoute("/nigerian-commodity-sourcing")({
  head: () => ({
    ...pageHead({ title: TITLE, description: DESC, path: "/nigerian-commodity-sourcing" }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceLd({
            name: "Nigerian Agricultural Commodity Sourcing and Export Coordination",
            description: DESC,
            path: "/nigerian-commodity-sourcing",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Nigerian Commodity Sourcing", path: "/nigerian-commodity-sourcing" },
          ]),
        ),
      },
    ],
  }),
  component: Page,
});

const WA_MESSAGE =
  "Hello ASMAN Prime Hub, I am an international buyer interested in Nigerian agricultural commodities.";

function Page() {
  return (
    <>
      <section className="relative bg-[var(--color-burgundy)] text-white overflow-hidden">
        <img src={agriHero} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-burgundy)] via-[var(--color-burgundy)]/90 to-[var(--color-burgundy)]/60" />
        <div className="container-x relative z-10 pt-36 pb-20 md:pt-44 md:pb-28">
          <Eyebrow dark>Nigerian Commodity Sourcing</Eyebrow>
          <h1 className="mt-6 font-display text-[34px] sm:text-5xl md:text-[64px] leading-[1.05] max-w-4xl">
            Nigerian agricultural commodities,{" "}
            <span className="italic text-[var(--color-gold)] font-normal">sourced and export-coordinated.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/80 leading-relaxed md:text-lg">
            For international buyers, processors, distributors and commodity traders: origin
            sourcing, supply-capacity assessment, quality and inspection coordination, export
            documentation and freight coordination — with written progress reporting.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#commodity-form"
              className="inline-flex items-center justify-center px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-white transition-colors"
            >
              Submit a Commodity Requirement
            </a>
            <a
              href={waLink(WA_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackContact("whatsapp", "nigerian-commodity-sourcing")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] border border-white/40 text-white hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
            >
              <MessageCircle size={14} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x py-20 md:py-28">
          <SectionHeader
            eyebrow="Scope of work"
            title={<>What export coordination <span className="italic text-[var(--color-burgundy)] font-normal">covers.</span></>}
          />
          <ul className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-3 bg-[var(--color-line)] border border-[var(--color-line)]">
            {COMMODITY_SCOPE.map((item, i) => (
              <li key={item} className="bg-white p-7">
                <div className="text-[11px] tracking-[0.25em] text-[var(--color-gold)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-3 font-display text-lg leading-snug text-[var(--color-ink)]">{item}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--color-bone)] border-y border-[var(--color-line)]">
        <div className="container-x py-20 md:py-28">
          <SectionHeader
            eyebrow="Commodities"
            title={<>Commodities we <span className="italic text-[var(--color-burgundy)] font-normal">work with.</span></>}
            subtitle="Subject to availability. No fixed prices or guaranteed availability are published."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMMODITIES.map((c) => (
              <li key={c.slug} className="border border-[var(--color-line)] bg-white p-6">
                <div className="font-display text-xl">{c.name}</div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/70">{c.desc}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl border-l-2 border-[var(--color-gold)] pl-4 text-sm leading-relaxed text-[var(--color-ink)]/70">
            {COMMODITY_NOTE} Product availability, specifications, quantity, supply capacity and
            price are confirmed for every formal enquiry before any commitment is made.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x py-20 md:py-28">
          <SectionHeader
            eyebrow="Engagement process"
            title={<>How a buyer engagement <span className="italic text-[var(--color-burgundy)] font-normal">runs.</span></>}
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ENGAGEMENT_PROCESS.map((s, i) => (
              <li key={s.t} className="border border-[var(--color-line)] p-7">
                <div className="font-display text-3xl text-[var(--color-burgundy)]/25">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-3 font-display text-xl leading-snug">{s.t}</div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/70">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="commodity-form" className="bg-[var(--color-bone)] border-t border-[var(--color-line)] scroll-mt-24">
        <div className="container-x py-20 md:py-28 max-w-4xl">
          <Eyebrow>Commodity Requirement</Eyebrow>
          <h2 className="mt-5 font-display text-3xl md:text-5xl leading-tight">
            Submit a commodity requirement.
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--color-ink)]/70 leading-relaxed">
            Tell us the commodity, specification, quantity and destination. We confirm supply
            capacity, scope and professional fees before execution begins.
          </p>
          <div className="mt-12">
            <CommodityRequirementForm source="nigerian-commodity-sourcing" />
          </div>
        </div>
      </section>
    </>
  );
}
