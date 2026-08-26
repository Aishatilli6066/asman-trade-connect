import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL — permanently moved to /terms-and-conditions. */
export const Route = createFileRoute("/terms")({
  beforeLoad: () => {
    throw redirect({ to: "/terms-and-conditions", statusCode: 301 });
  },
});
