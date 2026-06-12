import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "@/components/site/primitives";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — ASMAN Prime Hub" },
      { name: "description", content: "Terms governing the use of the ASMAN Prime Hub website and services." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Terms & Conditions — ASMAN Prime Hub" },
      { property: "og:description", content: "Terms governing the use of the ASMAN Prime Hub website and services." },
      { property: "og:url", content: "https://asmanprimehub.com/terms" },
      { property: "og:site_name", content: "ASMAN Prime Hub" },
    ],
    links: [{ rel: "canonical", href: "https://asmanprimehub.com/terms" }],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="bg-white">
      <div className="container-x pt-40 pb-24 max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-5 font-display text-4xl md:text-6xl">Terms & Conditions</h1>
        <div className="mt-10 text-[var(--color-ink)]/75 leading-relaxed space-y-6 text-base">
          <p>By accessing the ASMAN Prime Hub website ("Site"), you agree to be bound by these Terms & Conditions.</p>
          <h2 className="font-display text-2xl mt-10">Use of the Site</h2>
          <p>Content on this Site is provided for informational purposes about our trade, sourcing, freight and Nigerian agricultural export coordination services.</p>
          <h2 className="font-display text-2xl mt-10">Inquiries & Engagements</h2>
          <p>Submitting an inquiry does not constitute a binding commercial agreement. All engagements are subject to a separate written scope of work agreed between ASMAN Prime Hub and the client.</p>
          <h2 className="font-display text-2xl mt-10">Intellectual Property</h2>
          <p>All content, brand elements and layout of this Site are the property of ASMAN Prime Hub and may not be reproduced without permission.</p>
          <h2 className="font-display text-2xl mt-10">Limitation of Liability</h2>
          <p>The Site is provided on an "as is" basis. ASMAN Prime Hub makes no warranties as to availability or uninterrupted access.</p>
          <h2 className="font-display text-2xl mt-10">Governing Law</h2>
          <p>These Terms are governed by the laws of the Federal Republic of Nigeria.</p>
        </div>
      </div>
    </section>
  );
}