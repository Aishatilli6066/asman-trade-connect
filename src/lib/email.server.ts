import nodemailer from "nodemailer";

const SMTP_HOST = "mail.privateemail.com";
const SMTP_PORT = 465;

function createTransport() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    throw new Error("sendEmail: SMTP_USER or SMTP_PASS is not set");
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: { user, pass },
  });
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  try {
    const transport = createTransport();
    await transport.sendMail({
      from: `"ASMAN Prime Hub" <${process.env.SMTP_USER}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });
    return { ok: true };
  } catch (err) {
    console.error("sendEmail failed", err);
    return { ok: false, error: String(err) };
  }
}

/**
 * WhatsApp fallback via CallMeBot (https://www.callmebot.com/blog/free-api-whatsapp-messages/).
 * One-time setup:
 *   1. Save +34 644 72 15 39 as a WhatsApp contact.
 *   2. Send "I allow callmebot to send me messages" to that contact.
 *   3. CallMeBot replies with your API key — store it as CALLMEBOT_API_KEY.
 *   4. Store the receiving phone number (digits only, no +) as WHATSAPP_NOTIFY_PHONE.
 */
export async function sendWhatsAppFallback(message: string) {
  const phone = process.env.WHATSAPP_NOTIFY_PHONE;
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!phone || !apiKey) {
    console.warn("WhatsApp fallback skipped: WHATSAPP_NOTIFY_PHONE or CALLMEBOT_API_KEY not set");
    return;
  }
  try {
    const url =
      `https://api.callmebot.com/whatsapp.php` +
      `?phone=${encodeURIComponent(phone)}` +
      `&text=${encodeURIComponent(message)}` +
      `&apikey=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error("WhatsApp fallback failed", res.status, await res.text());
    }
  } catch (err) {
    console.error("WhatsApp fallback error", err);
  }
}

export function escapeHtml(s: string) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderFieldsTable(fields: Record<string, unknown>) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;text-transform:capitalize;">${escapeHtml(
          k.replace(/_/g, " ")
        )}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(String(v))}</td></tr>`
    )
    .join("");
  return `<table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;color:#111;">${rows}</table>`;
}
