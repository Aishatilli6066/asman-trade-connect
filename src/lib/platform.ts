/**
 * ASMAN Trade Connect — shared platform constants and client-side data helpers.
 * All reads/writes go through the browser Supabase client and are enforced by RLS.
 */
import { supabase } from "@/integrations/supabase/client";

export type PlatformRole =
  | "buyer_importer"
  | "supplier_exporter"
  | "logistics_provider"
  | "asman_analyst"
  | "administrator";

/** Roles a member of the public may select for themselves during onboarding. */
export const PUBLIC_ROLES = [
  {
    value: "buyer_importer" as const,
    label: "Buyer / Importer",
    description:
      "Post structured requirements, compare verified supplier responses and coordinate imports.",
  },
  {
    value: "supplier_exporter" as const,
    label: "Supplier / Exporter",
    description:
      "List products, capacity and specifications, and respond to qualified buyer requirements.",
  },
  {
    value: "logistics_provider" as const,
    label: "Logistics Provider",
    description:
      "Submit route-based freight quotations and coordinate shipment execution with both sides.",
  },
];

export const ROLE_LABELS: Record<PlatformRole, string> = {
  buyer_importer: "Buyer / Importer",
  supplier_exporter: "Supplier / Exporter",
  logistics_provider: "Logistics Provider",
  asman_analyst: "ASMAN Analyst",
  administrator: "Administrator",
};

export const BUSINESS_TYPES = [
  "Importer",
  "Exporter",
  "Manufacturer",
  "Distributor / Wholesaler",
  "Agribusiness / Aggregator",
  "Trading company",
  "Procurement / Sourcing team",
  "Logistics / Freight provider",
  "Other",
];

export type ModuleKey =
  | "profile"
  | "company"
  | "rfqs"
  | "products"
  | "matches"
  | "logistics"
  | "documents"
  | "deal-rooms"
  | "notifications";

export type ModuleDef = {
  key: ModuleKey;
  label: string;
  to: string;
  roles: PlatformRole[] | "all";
};

export const MODULES: ModuleDef[] = [
  { key: "profile", label: "Profile", to: "/app/profile", roles: "all" },
  { key: "company", label: "Company", to: "/app/company", roles: "all" },
  {
    key: "rfqs",
    label: "RFQs",
    to: "/app/rfqs",
    roles: ["buyer_importer", "supplier_exporter", "asman_analyst", "administrator"],
  },
  {
    key: "products",
    label: "Products",
    to: "/app/products",
    roles: ["supplier_exporter", "asman_analyst", "administrator"],
  },
  {
    key: "matches",
    label: "Matches",
    to: "/app/matches",
    roles: ["buyer_importer", "supplier_exporter", "asman_analyst", "administrator"],
  },
  { key: "logistics", label: "Logistics", to: "/app/logistics", roles: "all" },
  { key: "documents", label: "Documents", to: "/app/documents", roles: "all" },
  { key: "deal-rooms", label: "Deal Rooms", to: "/app/deal-rooms", roles: "all" },
  { key: "notifications", label: "Notifications", to: "/app/notifications", roles: "all" },
];

export function modulesForRole(role: PlatformRole | null): ModuleDef[] {
  if (!role) return MODULES.filter((m) => m.roles === "all");
  return MODULES.filter((m) => m.roles === "all" || m.roles.includes(role));
}

export type PlatformContext = {
  userId: string;
  email: string | null;
  fullName: string;
  role: PlatformRole | null;
  companyId: string | null;
  companyName: string | null;
  onboardingComplete: boolean;
};

/** Loads the signed-in user's platform context. Every query is RLS-scoped. */
export async function loadPlatformContext(): Promise<PlatformContext | null> {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return null;

  const [profileRes, rolesRes, membershipRes, onboardingRes] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("user_id", user.id).maybeSingle(),
    supabase.from("platform_roles").select("role").eq("user_id", user.id),
    supabase
      .from("company_memberships")
      .select("company_id, companies(legal_name)")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle(),
    supabase
      .from("onboarding_progress")
      .select("role_selected, company_completed")
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);

  const roles = (rolesRes.data ?? []).map((r) => r.role as PlatformRole);
  const role =
    roles.find((r) => r === "administrator") ??
    roles.find((r) => r === "asman_analyst") ??
    roles[0] ??
    null;

  const membership = membershipRes.data as
    | { company_id: string; companies: { legal_name: string } | null }
    | null;

  return {
    userId: user.id,
    email: user.email ?? null,
    fullName: profileRes.data?.full_name || user.email?.split("@")[0] || "Member",
    role,
    companyId: membership?.company_id ?? null,
    companyName: membership?.companies?.legal_name ?? null,
    onboardingComplete: Boolean(
      onboardingRes.data?.role_selected && onboardingRes.data?.company_completed,
    ),
  };
}
