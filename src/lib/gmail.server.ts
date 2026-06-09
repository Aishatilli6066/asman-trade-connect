const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

function encodeSubjectUtf8(subject: string) {
  // RFC 2047 encoded-word for non-ASCII safety
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const b64 = Buffer.from(subject, "utf-8").toString("base64");
  return `=?UTF-8?B?${b64}?=`;
}

function toBase64Url(input: string) {
  return Buffer.from(input, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function buildRaw(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const lines = [
    `To: ${opts.to}`,
    `Subject: ${encodeSubjectUtf8(opts.subject)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset="UTF-8"',
  ];
  if (opts.replyTo) lines.push(`Reply-To: ${opts.replyTo}`);
  lines.push("", opts.html);
  return toBase64Url(lines.join("\r\n"));
}

export async function sendGmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const gmailKey = process.env.GOOGLE_MAIL_API_KEY;
  if (!lovableKey || !gmailKey) {
    console.error("Gmail send skipped: missing LOVABLE_API_KEY or GOOGLE_MAIL_API_KEY");
    return { ok: false, status: 0, error: "missing_credentials" };
  }
  const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gmailKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw: buildRaw(opts) }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error("Gmail send failed", res.status, body);
    return { ok: false, status: res.status, error: body };
  }
  return { ok: true, status: 200 };
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