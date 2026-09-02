import { createFileRoute } from "@tanstack/react-router";
import { EmptyState, PageHeading } from "@/components/platform/ui";

export const Route = createFileRoute("/_app/app/matches")({
  head: () => ({
    meta: [{ title: "Matches — ASMAN Trade Connect" }, { name: "robots", content: "noindex" }],
  }),
  component: MatchesPage,
});

function MatchesPage() {
  return (
    <div className="space-y-8">
      <PageHeading eyebrow="Intelligence" title="Matches" intro="Supplier and requirement matching" />
      <EmptyState
        title="No matches yet"
        description="Once a requirement is published, ASMAN Trade AI compares specification, capacity, pricing context and compliance signals and presents recommendations with their reasoning for human approval."
        note="This module is part of Phase 1 and will accept records as the platform rolls out."
      />
    </div>
  );
}
