import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL — permanently moved to /request-a-quote. */
export const Route = createFileRoute("/quote")({
  beforeLoad: () => {
    throw redirect({ to: "/request-a-quote", statusCode: 301 });
  },
});
