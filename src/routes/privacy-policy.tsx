import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "@/components/site/primitives";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ASMAN Prime Hub" },
      { name: "description", content: "How ASMAN Prime Hub collects, uses and protects your information." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Privacy Policy — ASMAN Prime Hub" },
      { property: "og:description", content: "How ASMAN Prime Hub collects, uses and protects your information." },
      { property: "og:url", content: "https://asmanprimehub.com/privacy-policy" },
      { property: "og:site_name", content: "ASMAN Prime Hub" },
    ],
    links: [{ rel: "canonical", href: "https://asmanprimehub.com/privacy-policy" }],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="bg-white">
      <div className="container-x pt-40 pb-24 max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-5 font-display text-4xl md:text-6xl">Privacy Policy</h1>
        <div className="mt-10 prose-text text-[var(--color-ink)]/75 leading-relaxed space-y-6 text-base">
          <p>ASMAN Prime Hub ("we", "us", "our") respects your privacy. This policy describes how we collect, use, and safeguard the information you share when interacting with our website and services.</p>
          <h2 className="font-display text-2xl mt-10">Information We Collect</h2>
          <p>We collect information you voluntarily provide through our inquiry forms — including name, company, country, email, WhatsApp number, and the details of your trade or export inquiry.</p>
          <h2 className="font-display text-2xl mt-10">How We Use Your Information</h2>
          <p>Submitted information is used solely to respond to your inquiry, coordinate trade and export discussions, and provide quotations. We do not sell or share your information with third parties for marketing purposes.</p>
          <h2 className="font-display text-2xl mt-10">Data Security</h2>
          <p>Inquiry data is stored on secure infrastructure with industry-standard access controls. Communication takes place via standard email and messaging channels.</p>
          <h2 className="font-display text-2xl mt-10">Your Rights</h2>
          <p>You may contact us at any time to request a copy of, or deletion of, the information you have submitted.</p>
          <h2 className="font-display text-2xl mt-10">Contact</h2>
          <p>For privacy-related inquiries, email us at <a className="text-[var(--color-burgundy)] underline" href="mailto:contact@asmanprimehub.com">contact@asmanprimehub.com</a>.</p>
        </div>
      </div>
    </section>
  );
}