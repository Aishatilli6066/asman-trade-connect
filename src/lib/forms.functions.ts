import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sendGmail, renderFieldsTable, escapeHtml } from "./gmail.server";

const NOTIFY_TO = "contact@asmanprimehub.com";
const BRAND = "ASMAN Prime Hub";

function confirmationHtml(name: string, formLabel: string) {
  return `
  <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6;max-width:600px;">
    <h2 style="color:#7a1f2b;margin:0 0 12px;">Thank you, ${escapeHtml(name)}.</h2>
    <p>We've received your <strong>${escapeHtml(formLabel)}</strong> and our coordination team will reach out within <strong>24 hours</strong> with next steps.</p>
    <p>If your inquiry is urgent, reply to this email or message us on WhatsApp.</p>
    <p style="margin-top:24px;">Warm regards,<br/><strong>${BRAND} Coordination Team</strong></p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;"/>
    <p style="font-size:12px;color:#666;">This is an automated confirmation. Please do not modify the subject line if replying.</p>
  </div>`;
}

function notifyHtml(title: string, data: Record<string, unknown>) {
  return `
  <div style="font-family:Arial,sans-serif;color:#111;max-width:680px;">
    <h2 style="color:#7a1f2b;margin:0 0 16px;">New ${escapeHtml(title)}</h2>
    ${renderFieldsTable(data)}
    <p style="margin-top:16px;font-size:12px;color:#666;">Submitted via asmanprimehub.com</p>
  </div>`;
}

async function dispatchEmails(args: {
  formLabel: string;
  submitterName: string;
  submitterEmail: string;
  data: Record<string, unknown>;
}) {
  try {
    await Promise.all([
      sendGmail({
        to: NOTIFY_TO,
        subject: `New ${args.formLabel} — ${args.submitterName}`,
        html: notifyHtml(args.formLabel, args.data),
        replyTo: args.submitterEmail,
      }),
      sendGmail({
        to: args.submitterEmail,
        subject: `We've received your ${args.formLabel} — ${BRAND}`,
        html: confirmationHtml(args.submitterName, args.formLabel),
        replyTo: NOTIFY_TO,
      }),
    ]);
  } catch (e) {
    console.error("dispatchEmails error", e);
  }
}

const tradeSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  country: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(200),
  whatsapp: z.string().trim().min(5).max(40),
  service_interest: z.string().trim().min(1).max(120),
  business_type: z.string().trim().min(1).max(80),
  product_required: z.string().trim().min(1).max(200),
  quantity: z.string().trim().min(1).max(120),
  budget_range: z.string().trim().min(1).max(80),
  timeline: z.string().trim().min(1).max(80),
  target_market: z.string().trim().min(1).max(160),
  shipping_method: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(2000),
  consent: z.literal(true),
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
    await dispatchEmails({
      formLabel: "Trade Inquiry",
      submitterName: data.full_name,
      submitterEmail: data.email,
      data,
    });
    return { ok: true };
  });

export const submitConsultation = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => consultationSchema.parse(input))
  .handler(async ({ data }) => {
    await dispatchEmails({
      formLabel: "Consultation Request",
      submitterName: data.full_name,
      submitterEmail: data.email,
      data,
    });
    return { ok: true };
  });

export const submitExportInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => exportSchema.parse(input))
  .handler(async ({ data }) => {
    await dispatchEmails({
      formLabel: "Export Inquiry",
      submitterName: data.full_name,
      submitterEmail: data.email,
      data,
    });
    return { ok: true };
  });
