import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePlatform } from "@/components/platform/PlatformProvider";
import { Field, inputClass, PlatformButton, ErrorText, PageHeading } from "@/components/platform/ui";
import { ROLE_LABELS } from "@/lib/platform";

export const Route = createFileRoute("/_app/app/profile")({
  head: () => ({
    meta: [{ title: "Profile — ASMAN Trade Connect" }, { name: "robots", content: "noindex" }],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { ctx, refresh } = usePlatform();
  const [form, setForm] = useState({ full_name: "", phone: "", country: "" });
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!ctx) return;
    supabase
      .from("profiles")
      .select("full_name, phone, country")
      .eq("user_id", ctx.userId)
      .maybeSingle()
      .then(({ data }) =>
        setForm({
          full_name: data?.full_name || ctx.fullName,
          phone: data?.phone || "",
          country: data?.country || "",
        }),
      );
  }, [ctx]);

  if (!ctx) return null;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setStatus(null);
    const { error: err } = await supabase.from("profiles").upsert(
      {
        user_id: ctx.userId,
        full_name: form.full_name.trim(),
        phone: form.phone.trim() || null,
        country: form.country.trim() || null,
      },
      { onConflict: "user_id" },
    );
    setSaving(false);
    if (err) setError(err.message);
    else {
      setStatus("Profile saved.");
      refresh();
    }
  };

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Account"
        title="Profile"
        intro="Your personal details. Only you and authorised ASMAN reviewers can see this record."
      />
      <form
        onSubmit={save}
        className="max-w-xl space-y-5 border border-[var(--color-line)] bg-white p-6 md:p-8"
      >
        <Field label="Email">
          <input className={inputClass} value={ctx.email ?? ""} readOnly disabled />
        </Field>
        <Field label="Role">
          <input
            className={inputClass}
            value={ctx.role ? ROLE_LABELS[ctx.role] : "Not selected yet"}
            readOnly
            disabled
          />
        </Field>
        <Field label="Full name" required>
          <input
            className={inputClass}
            required
            maxLength={120}
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />
        </Field>
        <Field label="Phone">
          <input
            className={inputClass}
            maxLength={50}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Field>
        <Field label="Country">
          <input
            className={inputClass}
            maxLength={100}
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
        </Field>
        <ErrorText>{error}</ErrorText>
        {status && <p className="text-sm text-neutral-700">{status}</p>}
        <PlatformButton type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save profile"}
        </PlatformButton>
      </form>
    </div>
  );
}
