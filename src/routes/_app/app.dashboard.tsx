import { createFileRoute, Link } from "@tanstack/react-router";
import { usePlatform } from "@/components/platform/PlatformProvider";
import { PageHeading } from "@/components/platform/ui";
import { modulesForRole, ROLE_LABELS } from "@/lib/platform";

export const Route = createFileRoute("/_app/app/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — ASMAN Trade Connect" }, { name: "robots", content: "noindex" }],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { ctx } = usePlatform();
  if (!ctx) return null;
  const modules = modulesForRole(ctx.role).filter((m) => m.key !== "profile");

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow={ctx.role ? ROLE_LABELS[ctx.role] : "Role pending"}
        title={`Welcome, ${ctx.fullName}`}
        intro={
          ctx.companyName
            ? `${ctx.companyName} — company record under review. No verified status has been assigned yet.`
            : "Complete onboarding to add your company record and unlock the full workspace."
        }
      />

      {!ctx.onboardingComplete && (
        <div className="border-l-2 border-[var(--color-gold)] bg-white p-6">
          <h2 className="font-display text-lg text-[var(--color-ink)]">Finish onboarding</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Select your role and register your company to start using RFQs, products and deal rooms.
          </p>
          <Link
            to="/app/onboarding"
            className="mt-4 inline-flex items-center px-5 py-3 bg-[var(--color-burgundy)] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[var(--color-burgundy-deep)]"
          >
            Continue onboarding
          </Link>
        </div>
      )}

      <section>
        <h2 className="font-display text-2xl text-[var(--color-ink)]">Your modules</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <Link
              key={m.key}
              to={m.to}
              className="border border-[var(--color-line)] bg-white p-6 transition-colors hover:border-[var(--color-burgundy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-burgundy)]"
            >
              <h3 className="font-display text-lg text-[var(--color-ink)]">{m.label}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-neutral-500">
                No records yet
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
