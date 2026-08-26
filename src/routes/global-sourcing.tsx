import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Eyebrow, SectionHeader } from "@/components/site/primitives";
import { SourcingRequestForm } from "@/components/site/forms/SourcingRequestForm";
import { ENGAGEMENT_PROCESS, GLOBAL_SOURCING_SCOPE, waLink } from "@/lib/site-data";
import { breadcrumbLd, pageHead, serviceLd } from "@/lib/seo";
import { trackContact } from "@/lib/analytics";
import globe from "@/assets/globe.jpg";

const TITLE = "Global Sourcing & Import Coordination | ASMAN Prime Hub";
const DESC =
  "Supplier identification and verification, OEM/ODM and private-label coordination, quality-control coordination, landed-cost analysis and import coordination for businesses sourcing globally.";

export const Route = createFileRoute("/global-sourcing")({
  head: () => ({
    ...pageHead({ title: TITLE, description: DESC, path: "/global-sourcing" }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceLd({ name: "Global Sourcing and Import Coordination", description: DESC, path: "/global-sourcing" }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Global Sourcing", path: "/global-sourcing" },
          ]),
        ),
      },
    ],
  }),
  component: Page,
});

const WA_MESSAGE =
  "Hello ASMAN Prime Hub, I would like to discuss a global sourcing requirement (product/machinery/raw materials).";

function Page() {
  return (
    <>
      <section className="relative bg-[var(--color-burgundy)] text-white overflow-hidden">
        <img src={globe} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-burgundy)] via-[var(--color-burgundy)]/90 to-[var(--color-burgundy)]/60" />
        <div className="container-x relative z-10 pt-36 pb-20 md:pt-44 md:pb-28">
          <Eyebrow dark>Global Sourcing</Eyebrow>
          <h1 className="mt-6 font-display text-[34px] sm:text-5xl md:text-[64px] leading-[1.05] max-w-4xl">
            Products, machinery and raw materials,{" "}
            <span className="italic text-[var(--color-gold)] font-normal">sourced and coordinated.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/80 leading-relaxed md:text-lg">
            We identify and verify suppliers, compare quotations, coordinate production follow-up
            and inspection, and manage the freight and import side of the transaction — so your
            team works with one accountable coordination partner.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#sourcing-form"
              className="inline-flex items-center justify-center px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-white transition-colors"
            >
              Request a Sourcing Assessment
            </a>
            <a
              href={waLink(WA_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackContact("whatsapp", "global-sourcing")}
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
            title={<>What global sourcing <span className="italic text-[var(--color-burgundy)] font-normal">covers.</span></>}
          />
          <ul className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-3 bg-[var(--color-line)] border border-[var(--color-line)]">
            {GLOBAL_SOURCING_SCOPE.map((item, i) => (
              <li key={item} className="bg-white p-7">
                <div className="text-[11px] tracking-[0.25em] text-[var(--color-gold)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-3 font-display text-lg leading-snug text-[var(--color-ink)]">{item}</div>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[var(--color-ink)]/65">
            ASMAN Prime Hub coordinates these activities with verified third-party suppliers,
            inspection agents, freight forwarders and clearing agents. We do not own factories,
            laboratories, vessels or freight companies.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-bone)] border-y border-[var(--color-line)]">
        <div className="container-x py-20 md:py-28">
          <SectionHeader
            eyebrow="Engagement process"
            title={<>How an engagement <span className="italic text-[var(--color-burgundy)] font-normal">runs.</span></>}
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ENGAGEMENT_PROCESS.map((s, i) => (
              <li key={s.t} className="border border-[var(--color-line)] bg-white p-7">
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

      <section id="sourcing-form" className="bg-white scroll-mt-24">
        <div className="container-x py-20 md:py-28 max-w-4xl">
          <Eyebrow>Sourcing Assessment</Eyebrow>
          <h2 className="mt-5 font-display text-3xl md:text-5xl leading-tight">
            Request a sourcing assessment.
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--color-ink)]/70 leading-relaxed">
            Share your specification and we will confirm feasibility, scope and professional fees
            before any execution work begins.
          </p>
          <div className="mt-12">
            <SourcingRequestForm source="global-sourcing" />
          </div>
        </div>
      </section>
    </>
  );
}
