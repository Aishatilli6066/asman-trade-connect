import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/platform/")({
  head: () =>
    pageHead({
      title: "ASMAN Trade Connect — Verified Buyer, Exporter & Logistics Network",
      description:
        "ASMAN Trade Connect is the application area of ASMAN Prime Hub: register as a buyer, supplier/exporter or logistics provider, post structured requirements and coordinate trade with documented process control.",
      path: "/platform",
    }),
  component: PlatformLanding,
});

const AUDIENCES = [
  {
    role: "Buyers & Importers",
    body: "Post structured requirements with specification, quantity, destination, Incoterm and documentation needs, then review supplier responses side by side.",
    cta: "Register as Buyer",
  },
  {
    role: "Suppliers & Exporters",
    body: "Build a company profile with products, capacity, specifications and certifications, and respond to qualified requirements from serious buyers.",
    cta: "Register as Supplier / Exporter",
  },
  {
    role: "Logistics Providers",
    body: "Submit route-based freight quotations and coordinate shipment execution alongside the buyer and supplier in a controlled workspace.",
    cta: "Register as Logistics Provider",
  },
];

const PILLARS = [
  {
    title: "Structured requirements",
    body: "Every requirement is captured in a consistent format so pricing conversations start from specification, not guesswork.",
  },
  {
    title: "Human-reviewed verification",
    body: "Company records, documents and certifications are reviewed by an authorised ASMAN reviewer. Nothing is marked verified automatically.",
  },
  {
    title: "Decision-support intelligence",
    body: "Comparisons and matching suggestions are presented with their reasoning and review date, and always remain subject to human approval.",
  },
  {
    title: "Controlled collaboration",
    body: "Approved participants work in a permissioned deal room from requirement to shipment, with an audit trail on material status changes.",
  },
];

export default function PlatformLanding() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-[var(--color-burgundy)] text-white">
        <div className="container-x py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
            ASMAN Trade Connect
          </p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.08] max-w-4xl">
            A verified buyer, exporter and logistics network for structured international trade
          </h1>
          <p className="mt-6 max-w-2xl text-white/85 leading-relaxed">
            ASMAN Trade Connect is the application area of ASMAN Prime Hub. Register your company,
            publish structured requirements or product capability, and coordinate sourcing,
            procurement, documentation and freight in one controlled workspace.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/platform/sign-up"
              className="inline-flex items-center px-7 py-3.5 bg-[var(--color-gold)] text-[var(--color-ink)] text-[12px] font-semibold uppercase tracking-[0.2em] hover:bg-[var(--color-gold-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Create an account
            </Link>
            <Link
              to="/platform/sign-in"
              className="inline-flex items-center px-7 py-3.5 border border-white/40 text-[12px] font-semibold uppercase tracking-[0.2em] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Sign in
            </Link>
          </div>
          <p className="mt-6 text-xs text-white/60 max-w-xl">
            Verification status is assigned only after review by an authorised ASMAN reviewer.
            Creating an account does not imply verified status.
          </p>
        </div>
      </section>

      {/* Audiences */}
      <section className="container-x py-16 md:py-24">
        <h2 className="font-display text-3xl md:text-4xl text-[var(--color-ink)]">
          Choose how you participate
        </h2>
        <p className="mt-3 max-w-2xl text-neutral-600">
          You select your role during onboarding. Analyst and administrator access is granted
          internally and cannot be self-selected.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {AUDIENCES.map((a) => (
            <article
              key={a.role}
              className="flex flex-col border border-[var(--color-line)] bg-[var(--color-bone)] p-7"
            >
              <h3 className="font-display text-xl text-[var(--color-ink)]">{a.role}</h3>
              <p className="mt-3 flex-1 text-sm text-neutral-600 leading-relaxed">{a.body}</p>
              <Link
                to="/platform/sign-up"
                className="mt-6 inline-flex items-center justify-center px-5 py-3 bg-[var(--color-burgundy)] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[var(--color-burgundy-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-burgundy)]"
              >
                {a.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-[var(--color-bone)] py-16 md:py-24">
        <div className="container-x">
          <h2 className="font-display text-3xl md:text-4xl text-[var(--color-ink)]">
            How the network is governed
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {PILLARS.map((p) => (
              <article key={p.title} className="border-l-2 border-[var(--color-gold)] bg-white p-7">
                <h3 className="font-display text-lg text-[var(--color-ink)]">{p.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-[var(--color-line)] p-8 md:p-10">
          <div>
            <h2 className="font-display text-2xl text-[var(--color-ink)]">
              Ready to register your company?
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Onboarding takes a few minutes: choose your role, then add your company details.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/platform/sign-up"
              className="inline-flex items-center px-6 py-3 bg-[var(--color-burgundy)] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[var(--color-burgundy-deep)]"
            >
              Get started
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-[var(--color-burgundy)] text-[var(--color-burgundy)] text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[var(--color-burgundy)] hover:text-white"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
