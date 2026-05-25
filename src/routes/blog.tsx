import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, SectionHeader } from "@/components/site/primitives";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Trade & Export Insights — ASMAN Prime Hub Blog" },
      { name: "description", content: "Insights on Nigerian exports, commodity markets, logistics, freight forwarding, sourcing and international trade opportunities." },
      { property: "og:title", content: "ASMAN Prime Hub — Blog" },
      { property: "og:description", content: "Trade, sourcing and export insights." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const POSTS = [
  { t: "The Rising Demand for Nigerian Sesame in Global Markets", c: "Commodities", d: "Why sesame seeds remain one of Nigeria's strongest export commodities." },
  { t: "Sea vs Air Freight: Choosing the Right Route", c: "Logistics", d: "Cost, transit time and reliability — how to choose the right freight mode." },
  { t: "Supplier Verification: A Buyer's First Line of Defense", c: "Sourcing", d: "Why due diligence on suppliers is non-negotiable." },
  { t: "Export Documentation 101 for Nigerian Commodities", c: "Export Guide", d: "Essential paperwork every commodity exporter must understand." },
  { t: "Hibiscus Flower: From Northern Nigeria to Global Beverages", c: "Commodities", d: "Inside the hibiscus export market." },
  { t: "Building a Reliable Trade Coordination Workflow", c: "Operations", d: "How to structure trade operations for repeatability." },
];

function BlogPage() {
  return (
    <>
      <section className="relative bg-[var(--color-ink)] text-white pt-40 pb-24">
        <div className="container-x">
          <Eyebrow dark>Insights</Eyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-7xl leading-[1.02] max-w-4xl">
            Trade, sourcing & export <span className="italic text-[var(--color-gold)] font-normal">insights.</span>
          </h1>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x py-24 md:py-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-line)] border border-[var(--color-line)]">
            {POSTS.map((p, i) => (
              <article key={i} className="bg-white p-8 group cursor-pointer">
                <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-burgundy)]">{p.c}</div>
                <h2 className="mt-5 font-display text-2xl leading-tight group-hover:text-[var(--color-burgundy)] transition-colors">{p.t}</h2>
                <p className="mt-4 text-sm text-[var(--color-ink)]/65 leading-relaxed">{p.d}</p>
                <div className="mt-8 h-px w-10 bg-[var(--color-gold)] group-hover:w-20 transition-all" />
                <div className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink)]/40">Coming Soon</div>
              </article>
            ))}
          </div>
          <p className="mt-12 text-center text-sm text-[var(--color-ink)]/60">
            Full articles publishing soon. Subscribe for trade insights as they go live.
          </p>
        </div>
      </section>
    </>
  );
}