import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Field, inputClass, PlatformButton, ErrorText } from "@/components/platform/ui";
import { AuthLayout } from "@/components/platform/AuthLayout";

export const Route = createFileRoute("/platform/sign-in")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in — ASMAN Trade Connect" },
      { name: "description", content: "Sign in to your ASMAN Trade Connect account." },
      { property: "og:title", content: "Sign in — ASMAN Trade Connect" },
      { property: "og:description", content: "Sign in to your ASMAN Trade Connect account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/app/dashboard", replace: true });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) throw err;
      navigate({ to: "/app/dashboard", replace: true });
    } catch (err: any) {
      const msg: string = err?.message || "Sign in failed.";
      setError(
        /confirm/i.test(msg)
          ? "Your email is not confirmed yet. Open the confirmation link we sent you, then sign in."
          : msg,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign in" subtitle="Access your ASMAN Trade Connect workspace.">
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
        <Field label="Password" required>
          <input
            className={inputClass}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </Field>
        <ErrorText>{error}</ErrorText>
        <PlatformButton type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in…" : "Sign in"}
        </PlatformButton>
      </form>
      <div className="mt-6 flex flex-wrap justify-between gap-3 text-sm">
        <Link
          to="/platform/forgot-password"
          className="text-[var(--color-burgundy)] hover:underline"
        >
          Forgot password?
        </Link>
        <Link to="/platform/sign-up" className="text-[var(--color-burgundy)] hover:underline">
          Create an account
        </Link>
      </div>
    </AuthLayout>
  );
}
