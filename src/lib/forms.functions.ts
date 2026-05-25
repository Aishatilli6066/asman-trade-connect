import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const tradeSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  company_name: z.string().trim().min(1).max(160),
  country: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(200),
  whatsapp: z.string().trim().min(5).max(40),
  service_interest: z.string().trim().min(1).max(120),
  message: z.string().trim().min(30).max(2000),
});

const consultationSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  whatsapp: z.string().trim().min(5).max(40),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  country: z.string().trim().min(1).max(80),
  trade_interest: z.string().trim().min(1).max(200),
  budget_range: z.string().trim().max(80).optional().or(z.literal("")),
  timeline: z.string().trim().max(80).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

const exportSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  company_name: z.string().trim().min(1).max(160),
  country: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(200),
  whatsapp: z.string().trim().min(5).max(40),
  commodity: z.string().trim().min(1).max(120),
  quantity: z.string().trim().min(1).max(120),
  shipping_destination: z.string().trim().min(1).max(160),
  shipping_method: z.string().trim().max(80).optional().or(z.literal("")),
  requirements: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const submitTradeInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => tradeSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("trade_inquiries").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const submitConsultation = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => consultationSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("consultation_requests").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const submitExportInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => exportSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("export_inquiries").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });