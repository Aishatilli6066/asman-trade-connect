import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Network, Globe2, MessagesSquare, Truck, FileCheck2, Sparkles, Settings2 } from "lucide-react";
import { Eyebrow, GoldButton, SectionHeader } from "@/components/site/primitives";
import { WHY_POINTS } from "@/lib/site-data";
import { openConsultation } from "@/components/site/consultation-store";

export const Route = createFileRoute("/why-choose-us")({
  head: () => ({
    meta: [
      { title: "Why Choose ASMAN Prime Hub | Global Sourcing & Trade Execution Partner" },
      { name: "description", content: "Structured trade process, supplier and buyer verification, landed cost assessment, documentation awareness, logistics coordination and global sourcing reach — why businesses choose ASMAN Prime Hub." },
      { property: "og:title", content: "Why Choose ASMAN Prime Hub | Global Sourcing & Trade Execution Partner" },
      { property: "og:description", content: "Structured trade process, supplier and buyer verification, landed cost assessment, documentation awareness, logistics coordination and global sourcing reach — why businesses choose ASMAN Prime Hub." },
      { property: "og:url", content: "https://asmanprimehub.com/why-choose-us" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ASMAN Prime Hub" },
      { property: "og:image", content: "https://asmanprimehub.com/logo.png" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Why Choose ASMAN Prime Hub | Global Sourcing & Trade Execution Partner" },
      { name: "twitter:description", content: "Structured trade process, supplier and buyer verification, landed cost assessment, documentation awareness, logistics coordination and global sourcing reach — why businesses choose ASMAN Prime Hub." },
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
  return (
    <>
      <section className="relative bg-[var(--color-burgundy)] text-white pt-40 pb-24">
        <div className="container-x">
          <Eyebrow dark>Why Choose Us</Eyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-7xl leading-[1.02] max-w-4xl">
            Trust, process and <span className="italic text-[var(--color-gold)] font-normal">commercial control.</span>
          </h1>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-px bg-[var(--color-line)] border border-[var(--color-line)]">
            {WHY_POINTS.map((it) => (
              <div key={it.t} className="bg-white p-10">
                <ShieldCheck size={28} strokeWidth={1.3} className="text-[var(--color-burgundy)]" />
                <h2 className="mt-5 font-display text-2xl">{it.t}</h2>
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
            <Link to="/request-a-quote"><GoldButton>Submit a Trade Inquiry <ArrowRight size={14} /></GoldButton></Link>
            <GoldButton variant="outline-light" onClick={openConsultation}>Book a Consultation</GoldButton>
          </div>
        </div>
      </section>
    </>
  );
}