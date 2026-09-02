import { createFileRoute } from "@tanstack/react-router";
import { EmptyState, PageHeading } from "@/components/platform/ui";

export const Route = createFileRoute("/_app/app/rfqs")({
  head: () => ({
    meta: [{ title: "RFQs — ASMAN Trade Connect" }, { name: "robots", content: "noindex" }],
  }),
  component: RfqsPage,
});

function RfqsPage() {
  return (
    <div className="space-y-8">
      <PageHeading eyebrow="Requirements" title="RFQs" intro="Structured buyer requirements" />
      <EmptyState
        title="No requirements yet"
        description="Requirements capture product, specification, quantity, destination, delivery date, Incoterm, payment terms and certification needs so suppliers respond on the same basis."
        note="This module is part of Phase 1 and will accept records as the platform rolls out."
      />
    </div>
  );
}
