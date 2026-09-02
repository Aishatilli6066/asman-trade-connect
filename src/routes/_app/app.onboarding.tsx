import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePlatform } from "@/components/platform/PlatformProvider";
import { Field, inputClass, PlatformButton, ErrorText, PageHeading } from "@/components/platform/ui";
import { BUSINESS_TYPES, PUBLIC_ROLES, type PlatformRole } from "@/lib/platform";

export const Route = createFileRoute("/_app/app/onboarding")({
  head: () => ({ meta: [{ title: "Onboarding — ASMAN Trade Connect" }, { name: "robots", content: "noindex" }] }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const { ctx, refresh } = usePlatform();
  const navigate = useNavigate();
  const [step, setStep] = useState<"role" | "company">(ctx?.role ? "company" : "role");
  const [role, setRole] = useState<PlatformRole | null>(ctx?.role ?? null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [company, setCompany] = useState({
    legal_name: "",
    trading_name: "",
    country: "",
    registration_number: "",
    website: "",
    business_type: "",
    primary_contact_name: ctx?.fullName ?? "",
    primary_contact_email: ctx?.email ?? "",
    primary_contact_phone: "",
  });

  const saveRole = async () => {
    if (!role || !ctx) return;
    setSaving(true);
    setError(null);
    try {
      const { error: pErr } = await supabase
        .from("profiles")
        .upsert({ user_id: ctx.userId, full_name: ctx.fullName }, { onConflict: "user_id" });
      if (pErr) throw pErr;

      const { error: rErr } = await supabase
        .from("platform_roles")
        .upsert({ user_id: ctx.userId, role }, { onConflict: "user_id,role" });
      if (rErr) throw rErr;

      const { error: oErr } = await supabase.from("onboarding_progress").upsert(
        {
          user_id: ctx.userId,
          role_selected: true,
          profile_completed: true,
          current_step: "company",
        },
        { onConflict: "user_id" },
      );
      if (oErr) throw oErr;

      await refresh();
      setStep("company");
    } catch (e: any) {
      setError(e?.message || "Could not save your role.");
    } finally {
      setSaving(false);
    }
  };

  const saveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ctx) return;
    setSaving(true);
    setError(null);
    try {
      const { data, error: cErr } = await supabase
        .from("companies")
        .insert({
          legal_name: company.legal_name.trim(),
          trading_name: company.trading_name.trim() || null,
          country: company.country.trim(),
          registration_number: company.registration_number.trim() || null,
          website: company.website.trim() || null,
          business_type: company.business_type,
          primary_contact_name: company.primary_contact_name.trim(),
          primary_contact_email: company.primary_contact_email.trim(),
          primary_contact_phone: company.primary_contact_phone.trim() || null,
          created_by: ctx.userId,
          verification_status: "unverified",
        })
        .select("id")
        .single();
      if (cErr) throw cErr;

      const { error: mErr } = await supabase
        .from("company_memberships")
        .insert({ company_id: data.id, user_id: ctx.userId, membership_role: "owner" });
      if (mErr) throw mErr;

      const { error: oErr } = await supabase.from("onboarding_progress").upsert(
        {
          user_id: ctx.userId,
          role_selected: true,
          profile_completed: true,
          company_completed: true,
          current_step: "complete",
        },
        { onConflict: "user_id" },
      );
      if (oErr) throw oErr;

      await refresh();
      navigate({ to: "/app/dashboard", replace: true });
    } catch (e: any) {
      setError(e?.message || "Could not save your company.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow={step === "role" ? "Step 1 of 2" : "Step 2 of 2"}
        title={step === "role" ? "How will you use Trade Connect?" : "Company details"}
        intro={
          step === "role"
            ? "Select the role that matches your business. Analyst and administrator access is granted internally by ASMAN and is not selectable here."
            : "Provide your company's registered details. Records are reviewed by an authorised ASMAN reviewer before any verified status is assigned."
        }
      />

      {step === "role" ? (
        <div className="space-y-4">
          <fieldset className="grid gap-4 md:grid-cols-3">
            <legend className="sr-only">Select your role</legend>
            {PUBLIC_ROLES.map((r) => (
              <label
                key={r.value}
                className={`cursor-pointer border p-6 bg-white transition-colors focus-within:ring-2 focus-within:ring-[var(--color-burgundy)] ${
                  role === r.value
                    ? "border-[var(--color-burgundy)] shadow-sm"
                    : "border-[var(--color-line)] hover:border-[var(--color-burgundy)]/50"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  className="sr-only"
                  value={r.value}
                  checked={role === r.value}
                  onChange={() => setRole(r.value)}
                />
                <span className="font-display text-lg text-[var(--color-ink)]">{r.label}</span>
                <span className="mt-2 block text-sm text-neutral-600 leading-relaxed">
                  {r.description}
                </span>
              </label>
            ))}
          </fieldset>
          <ErrorText>{error}</ErrorText>
          <PlatformButton onClick={saveRole} disabled={!role || saving}>
            {saving ? "Saving…" : "Continue"}
          </PlatformButton>
        </div>
      ) : (
        <form onSubmit={saveCompany} className="max-w-2xl space-y-5 bg-white border border-[var(--color-line)] p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Legal company name" required>
              <input
                className={inputClass}
                required
                maxLength={200}
                value={company.legal_name}
                onChange={(e) => setCompany({ ...company, legal_name: e.target.value })}
              />
            </Field>
            <Field label="Trading name">
              <input
                className={inputClass}
                maxLength={200}
                value={company.trading_name}
                onChange={(e) => setCompany({ ...company, trading_name: e.target.value })}
              />
            </Field>
            <Field label="Country of registration" required>
              <input
                className={inputClass}
                required
                maxLength={100}
                value={company.country}
                onChange={(e) => setCompany({ ...company, country: e.target.value })}
              />
            </Field>
            <Field label="Company registration number">
              <input
                className={inputClass}
                maxLength={100}
                value={company.registration_number}
                onChange={(e) => setCompany({ ...company, registration_number: e.target.value })}
              />
            </Field>
            <Field label="Website">
              <input
                className={inputClass}
                type="url"
                placeholder="https://"
                maxLength={300}
                value={company.website}
                onChange={(e) => setCompany({ ...company, website: e.target.value })}
              />
            </Field>
            <Field label="Business type" required>
              <select
                className={inputClass}
                required
                value={company.business_type}
                onChange={(e) => setCompany({ ...company, business_type: e.target.value })}
              >
                <option value="">Select…</option>
                {BUSINESS_TYPES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Primary contact name" required>
              <input
                className={inputClass}
                required
                maxLength={120}
                value={company.primary_contact_name}
                onChange={(e) => setCompany({ ...company, primary_contact_name: e.target.value })}
              />
            </Field>
            <Field label="Primary contact email" required>
              <input
                className={inputClass}
                type="email"
                required
                maxLength={320}
                value={company.primary_contact_email}
                onChange={(e) => setCompany({ ...company, primary_contact_email: e.target.value })}
              />
            </Field>
            <Field label="Primary contact phone">
              <input
                className={inputClass}
                maxLength={50}
                value={company.primary_contact_phone}
                onChange={(e) => setCompany({ ...company, primary_contact_phone: e.target.value })}
              />
            </Field>
          </div>
          <p className="text-xs text-neutral-500">
            Your company record starts as unverified. Verified status is assigned only after review
            by an authorised ASMAN reviewer.
          </p>
          <ErrorText>{error}</ErrorText>
          <PlatformButton type="submit" disabled={saving}>
            {saving ? "Saving…" : "Complete onboarding"}
          </PlatformButton>
        </form>
      )}
    </div>
  );
}
