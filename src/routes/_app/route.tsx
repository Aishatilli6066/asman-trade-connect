import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { PlatformProvider, usePlatform } from "@/components/platform/PlatformProvider";
import { AppShell } from "@/components/platform/AppShell";

export const Route = createFileRoute("/_app")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({ to: "/platform/sign-in" });
    }
    return { user: data.user };
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <PlatformProvider>
      <Inner />
    </PlatformProvider>
  );
}

function Inner() {
  const { ctx, loading } = usePlatform();

  if (loading || !ctx) {
    return (
      <div className="min-h-screen grid place-items-center bg-[var(--color-bone)]">
        <p className="text-sm text-neutral-600">Loading your workspace…</p>
      </div>
    );
  }

  return (
    <AppShell ctx={ctx}>
      <Outlet />
    </AppShell>
  );
}
