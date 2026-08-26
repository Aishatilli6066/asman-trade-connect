import { z } from "zod";

const name = z.string().trim().min(2, "Required").max(120);
const company = z.string().trim().min(2, "Required").max(160);
const email = z.string().trim().email("Enter a valid business email").max(200);
const phone = z.string().trim().min(6, "Required").max(40);
const short = (max = 160) => z.string().trim().min(1, "Required").max(max);
const optional = (max = 2000) => z.string().trim().max(max).optional().or(z.literal(""));

/** Anti-spam: hidden field that must stay empty, plus the originating page. */
export const metaFields = {
  website: z.string().max(0, "Rejected").optional().or(z.literal("")),
  source_page: z.string().trim().max(120).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Consent is required" }),
};

export const sourcingSchema = z.object({
  full_name: name,
  company_name: company,
  email,
  whatsapp: phone,
  product: short(200),
  specifications: z.string().trim().min(10, "Please describe the specification").max(2000),
  quantity: short(120),
  preferred_origin: optional(120),
  branding_needs: optional(120),
  delivery_location: short(160),
  target_budget: optional(120),
  required_delivery_date: optional(120),
  ...metaFields,
});

export const commoditySchema = z.object({
  full_name: name,
  company_name: company,
  country: short(80),
  email,
  whatsapp: phone,
  commodity: short(120),
  specifications: z.string().trim().min(5, "Please state the quality standard").max(2000),
  quantity: short(120),
  packaging: optional(120),
  destination_port: short(160),
  incoterm: optional(60),
  payment_terms: optional(120),
  shipment_timeline: optional(120),
  ...metaFields,
});

export const tradeSchema = z.object({
  full_name: name,
  company_name: company,
  country: short(80),
  email,
  whatsapp: phone,
  service_interest: short(160),
  product_required: short(200),
  specifications: z.string().trim().min(5, "Required").max(2000),
  quantity: short(120),
  destination: short(160),
  incoterm: short(60),
  payment_method: short(120),
  timeline: short(120),
  budget_range: optional(120),
  message: optional(2000),
  ...metaFields,
});

export const consultationSchema = z.object({
  full_name: name,
  email,
  whatsapp: phone,
  company: optional(160),
  country: short(80),
  trade_interest: short(200),
  budget_range: optional(120),
  timeline: optional(120),
  notes: optional(2000),
  ...metaFields,
});

export const exportSchema = z.object({
  full_name: name,
  company_name: company,
  country: short(80),
  email,
  whatsapp: phone,
  commodity: short(120),
  quantity: short(120),
  shipping_destination: short(160),
  shipping_method: optional(120),
  requirements: optional(2000),
  ...metaFields,
});

export type SourcingValues = z.infer<typeof sourcingSchema>;
export type CommodityValues = z.infer<typeof commoditySchema>;
export type TradeValues = z.infer<typeof tradeSchema>;
export type ConsultationValues = z.infer<typeof consultationSchema>;
export type ExportValues = z.infer<typeof exportSchema>;
