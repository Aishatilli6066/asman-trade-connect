import { Resend } from "resend";

const FROM_ADDRESS = "ASMAN Prime Hub <noreply@asmanprimehub.com>";

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("sendEmail skipped: RESEND_API_KEY is not set");
    return { ok: false, error: "missing_credentials" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    replyTo: opts.replyTo,
  });

  if (error) {
    console.error("sendEmail failed", error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
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
