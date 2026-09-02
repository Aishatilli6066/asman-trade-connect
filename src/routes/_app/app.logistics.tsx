import { createFileRoute } from "@tanstack/react-router";
import { EmptyState, PageHeading } from "@/components/platform/ui";

export const Route = createFileRoute("/_app/app/logistics")({
  head: () => ({
    meta: [{ title: "Logistics — ASMAN Trade Connect" }, { name: "robots", content: "noindex" }],
  }),
  component: LogisticsPage,
});

function LogisticsPage() {
  return (
    <div className="space-y-8">
      <PageHeading eyebrow="Freight" title="Logistics" intro="Route-based freight quotations" />
      <EmptyState
        title="No freight quotations yet"
        description="Logistics providers submit route-based quotations against approved shipments, covering mode, transit time, charges and validity."
        note="This module is part of Phase 1 and will accept records as the platform rolls out."
      />
    </div>
  );
}
