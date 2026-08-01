import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, ShieldCheck, Globe2, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/site/primitives";
import { TradeInquiryForm } from "@/components/site/forms/TradeInquiryForm";
import { SITE } from "@/lib/site-data";

const CANONICAL = "https://asmanprimehub.com/quote";
const TITLE = "Submit a Trade Inquiry | ASMAN Prime Hub";
const DESC =
  "Submit a trade inquiry for global sourcing, procurement, freight coordination or Nigerian agricultural export. Reviewed by a coordinator within one business day.";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ASMAN Prime Hub" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: QuotePage,
});

const BULLETS = [
  { icon: Clock, title: "Reviewed within one business day", copy: "A coordinator reviews every inquiry and replies with next steps." },
  { icon: ShieldCheck, title: "Structured supplier assessment", copy: "Suppliers are assessed against your specification before any introduction." },
  { icon: Globe2, title: "Multi-corridor coordination", copy: "Sourcing, agricultural export and freight coordination across air and sea." },
];

const INCLUDED = [
  "Feasibility review of your specification and quantity",
  "Supplier or commodity options where available",
  "Indicative freight and documentation considerations",
  "Recommended Incoterm and payment structure to discuss",
];

function QuotePage() {
  return (
    <section className="min-h-screen bg-[var(--color-burgundy)] grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] pt-20">
      <div className="bg-[var(--color-burgundy)] text-white p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-between gap-12">
        <div>
          <Eyebrow dark>Trade Inquiry</Eyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02]">
            Submit a <span className="italic text-[var(--color-gold)] font-normal">trade inquiry.</span>
          </h1>
          <p className="mt-6 max-w-md text-white/80 leading-relaxed">
            Tell us what you need to source, ship or export. We review the requirement and come
            back with feasibility, options and the next steps.
          </p>

          <div className="mt-10 grid gap-5">
            {BULLETS.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="flex gap-4">
                <div className="shrink-0 grid place-items-center h-10 w-10 border border-[var(--color-gold)]/60 text-[var(--color-gold)]">
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-lg">{title}</div>
                  <div className="text-sm text-white/70 leading-relaxed">{copy}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="text-[11px] uppercase tracking-[0.25em] text-white/60">What your response covers</div>
          <ul className="mt-4 space-y-2.5">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                <Check size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-sm text-white/70">
            Prefer to talk first?{" "}
            <Link to="/contact" className="text-[var(--color-gold)] hover:underline inline-flex items-center gap-1">
              Contact us <ArrowRight size={12} />
            </Link>
            <span className="mx-2 text-white/30">·</span>
            <a href={`mailto:${SITE.email}`} className="text-[var(--color-gold)] hover:underline">
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 sm:p-12 md:p-16 lg:p-20">
        <Eyebrow>Trade Inquiry Form</Eyebrow>
        <h2 className="mt-5 font-display text-3xl md:text-4xl leading-tight">Send us the details.</h2>
        <p className="mt-3 text-sm text-[var(--color-ink)]/65">
          All fields marked <span className="text-[var(--color-burgundy)]">*</span> are required. We aim to reply within one business day.
        </p>
        <div className="mt-10">
          <TradeInquiryForm />
        </div>
      </div>
    </section>
  );
}