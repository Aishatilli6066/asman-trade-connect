import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Field, inputClass, PlatformButton, ErrorText } from "@/components/platform/ui";
import { AuthLayout } from "@/components/platform/AuthLayout";

export const Route = createFileRoute("/platform/forgot-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Reset your password — ASMAN Trade Connect" },
      { name: "description", content: "Request a password reset link for ASMAN Trade Connect." },
      { property: "og:title", content: "Reset your password — ASMAN Trade Connect" },
      { property: "og:description", content: "Request a password reset link." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (err) throw err;
      setSent(true);
    } catch (err: any) {
      setError(err?.message || "Could not send the reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="We will email you a link to set a new password."
    >
      {sent ? (
        <p className="text-sm text-neutral-600 leading-relaxed">
          If an account exists for <strong>{email}</strong>, a reset link is on its way. The link
          opens a page where you can set a new password.
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <Field label="Email" required>
            <input
              className={inputClass}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </Field>
          <ErrorText>{error}</ErrorText>
          <PlatformButton type="submit" disabled={loading} className="w-full">
            {loading ? "Sending…" : "Send reset link"}
          </PlatformButton>
        </form>
      )}
      <Link
        to="/platform/sign-in"
        className="mt-6 inline-block text-sm text-[var(--color-burgundy)] hover:underline"
      >
        ← Back to sign in
      </Link>
    </AuthLayout>
  );
}
