import { createFileRoute } from "@tanstack/react-router";
import { EmptyState, PageHeading } from "@/components/platform/ui";

export const Route = createFileRoute("/_app/app/documents")({
  head: () => ({
    meta: [{ title: "Documents — ASMAN Trade Connect" }, { name: "robots", content: "noindex" }],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  return (
    <div className="space-y-8">
      <PageHeading eyebrow="Compliance" title="Documents" intro="Trade and compliance documents" />
      <EmptyState
        title="No documents uploaded yet"
        description="Certificates, COAs, registration documents and transaction files are stored privately and shared only with approved counterparties through time-limited links."
        note="This module is part of Phase 1 and will accept records as the platform rolls out."
      />
    </div>
  );
}
