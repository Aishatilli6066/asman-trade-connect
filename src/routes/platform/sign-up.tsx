import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Field, inputClass, PlatformButton, ErrorText } from "@/components/platform/ui";
import { AuthLayout } from "@/components/platform/AuthLayout";

export const Route = createFileRoute("/platform/sign-up")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Create your ASMAN Trade Connect account" },
      {
        name: "description",
        content:
          "Register as a buyer, supplier/exporter or logistics provider on ASMAN Trade Connect.",
      },
      { property: "og:title", content: "Create your ASMAN Trade Connect account" },
      {
        property: "og:description",
        content: "Register as a buyer, supplier/exporter or logistics provider.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/platform/sign-in`,
          data: { full_name: fullName },
        },
      });
      if (err) throw err;
      if (!data.session) {
        setConfirmSent(true);
        return;
      }
      navigate({ to: "/app/onboarding" });
    } catch (err: any) {
      setError(err?.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (confirmSent) {
    return (
      <AuthLayout title="Confirm your email" subtitle="One more step before you can sign in.">
        <p className="text-sm text-neutral-600 leading-relaxed">
          We sent a confirmation link to <strong>{email}</strong>. Open it to activate your
          account, then return here to sign in and complete onboarding.
        </p>
        <Link
          to="/platform/sign-in"
          className="mt-6 inline-flex items-center text-[12px] uppercase tracking-[0.2em] text-[var(--color-burgundy)] hover:underline"
        >
          Go to sign in →
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register for ASMAN Trade Connect. You choose your role in the next step."
    >
      <form onSubmit={submit} className="space-y-5" noValidate={false}>
        <Field label="Full name" required>
          <input
            className={inputClass}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            autoComplete="name"
            maxLength={120}
          />
        </Field>
        <Field label="Work email" required>
          <input
            className={inputClass}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </Field>
        <Field label="Password" hint="Minimum 8 characters." required>
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
          {loading ? "Creating account…" : "Create account"}
        </PlatformButton>
      </form>
      <p className="mt-6 text-sm text-neutral-600">
        Already registered?{" "}
        <Link to="/platform/sign-in" className="text-[var(--color-burgundy)] hover:underline">
          Sign in
        </Link>
      </p>
      <p className="mt-4 text-xs text-neutral-500">
        Analyst and administrator access is granted internally by ASMAN and cannot be selected
        during registration.
      </p>
    </AuthLayout>
  );
}
