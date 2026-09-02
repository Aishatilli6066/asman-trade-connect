import { createFileRoute } from "@tanstack/react-router";
import { EmptyState, PageHeading } from "@/components/platform/ui";

export const Route = createFileRoute("/_app/app/products")({
  head: () => ({
    meta: [{ title: "Products — ASMAN Trade Connect" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <div className="space-y-8">
      <PageHeading eyebrow="Catalogue" title="Products" intro="Product listings and capacity" />
      <EmptyState
        title="No products listed yet"
        description="List products with specification, grade, packaging, monthly capacity, Incoterms and supporting certifications. Listings are reviewed before they appear to buyers."
        note="This module is part of Phase 1 and will accept records as the platform rolls out."
      />
    </div>
  );
}
