import { createFileRoute } from "@tanstack/react-router";
import { EmptyState, PageHeading } from "@/components/platform/ui";

export const Route = createFileRoute("/_app/app/notifications")({
  head: () => ({
    meta: [{ title: "Notifications — ASMAN Trade Connect" }, { name: "robots", content: "noindex" }],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  return (
    <div className="space-y-8">
      <PageHeading eyebrow="Activity" title="Notifications" intro="Platform activity and updates" />
      <EmptyState
        title="No notifications yet"
        description="Verification decisions, requirement responses, quotation updates and deal-room activity will appear here."
        note="This module is part of Phase 1 and will accept records as the platform rolls out."
      />
    </div>
  );
}
