import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePlatform } from "@/components/platform/PlatformProvider";
import { EmptyState, PageHeading } from "@/components/platform/ui";

export const Route = createFileRoute("/_app/app/company")({
  head: () => ({
    meta: [{ title: "Company — ASMAN Trade Connect" }, { name: "robots", content: "noindex" }],
  }),
  component: CompanyPage,
});

type Company = {
  legal_name: string;
  trading_name: string | null;
  country: string;
  registration_number: string | null;
  website: string | null;
  business_type: string;
  primary_contact_name: string;
  primary_contact_email: string;
  primary_contact_phone: string | null;
  verification_status: string;
  created_at: string;
};

function CompanyPage() {
  const { ctx } = usePlatform();
  const [company, setCompany] = useState<Company | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ctx?.companyId) {
      setLoaded(true);
      return;
    }
    supabase
      .from("companies")
      .select(
        "legal_name, trading_name, country, registration_number, website, business_type, primary_contact_name, primary_contact_email, primary_contact_phone, verification_status, created_at",
      )
      .eq("id", ctx.companyId)
      .maybeSingle()
      .then(({ data }) => {
        setCompany(data as Company | null);
        setLoaded(true);
      });
  }, [ctx?.companyId]);

  if (!ctx || !loaded) return null;

  if (!company) {
    return (
      <div className="space-y-8">
        <PageHeading eyebrow="Organisation" title="Company" />
        <EmptyState
          title="No company registered yet"
          description="Add your company details to participate in requirements, quotations and deal rooms."
          action={
            <Link
              to="/app/onboarding"
              className="inline-flex items-center px-6 py-3 bg-[var(--color-burgundy)] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[var(--color-burgundy-deep)]"
            >
              Register company
            </Link>
          }
        />
      </div>
    );
  }

  const rows: [string, string][] = [
    ["Legal name", company.legal_name],
    ["Trading name", company.trading_name || "—"],
    ["Country", company.country],
    ["Registration number", company.registration_number || "—"],
    ["Website", company.website || "—"],
    ["Business type", company.business_type],
    ["Primary contact", company.primary_contact_name],
    ["Contact email", company.primary_contact_email],
    ["Contact phone", company.primary_contact_phone || "—"],
    ["Verification status", company.verification_status],
  ];

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Organisation"
        title={company.legal_name}
        intro="Company records are reviewed by an authorised ASMAN reviewer. Status shown below reflects the current review outcome only."
      />
      <dl className="border border-[var(--color-line)] bg-white divide-y divide-[var(--color-line)]">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 p-4 sm:grid-cols-3 sm:gap-4">
            <dt className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">{k}</dt>
            <dd className="sm:col-span-2 text-sm text-[var(--color-ink)] break-words">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
