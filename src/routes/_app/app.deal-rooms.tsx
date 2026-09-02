import { createFileRoute } from "@tanstack/react-router";
import { EmptyState, PageHeading } from "@/components/platform/ui";

export const Route = createFileRoute("/_app/app/deal-rooms")({
  head: () => ({
    meta: [{ title: "Deal Rooms — ASMAN Trade Connect" }, { name: "robots", content: "noindex" }],
  }),
  component: DealRoomsPage,
});

function DealRoomsPage() {
  return (
    <div className="space-y-8">
      <PageHeading eyebrow="Execution" title="Deal Rooms" intro="Controlled counterparty workspaces" />
      <EmptyState
        title="No deal rooms yet"
        description="A deal room opens once a buyer, supplier and, where relevant, a logistics provider are approved for a transaction, keeping communication and status changes on the record."
        note="This module is part of Phase 1 and will accept records as the platform rolls out."
      />
    </div>
  );
}
