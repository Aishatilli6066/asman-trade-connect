import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Field, inputClass, PlatformButton, ErrorText } from "@/components/platform/ui";
import { AuthLayout } from "@/components/platform/AuthLayout";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Set a new password — ASMAN Trade Connect" },
      { name: "description", content: "Set a new password for your ASMAN Trade Connect account." },
      { property: "og:title", content: "Set a new password — ASMAN Trade Connect" },
      { property: "og:description", content: "Set a new password for your account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const isRecovery = window.location.hash.includes("type=recovery");
    supabase.auth.getSession().then(({ data }) => {
      setReady(Boolean(data.session) || isRecovery);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) throw err;
      setDone(true);
      setTimeout(() => navigate({ to: "/app/dashboard", replace: true }), 1200);
    } catch (err: any) {
      setError(err?.message || "Could not update the password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Set a new password" subtitle="Choose a password of at least 8 characters.">
      {done ? (
        <p className="text-sm text-neutral-600">Password updated. Taking you to your workspace…</p>
      ) : !ready ? (
        <p className="text-sm text-neutral-600">
          Open this page from the reset link in your email to continue.{" "}
          <Link to="/platform/forgot-password" className="text-[var(--color-burgundy)] underline">
            Request a new link
          </Link>
          .
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <Field label="New password" required>
            <input
              className={inputClass}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </Field>
          <ErrorText>{error}</ErrorText>
          <PlatformButton type="submit" disabled={loading} className="w-full">
            {loading ? "Updating…" : "Update password"}
          </PlatformButton>
        </form>
      )}
    </AuthLayout>
  );
}
