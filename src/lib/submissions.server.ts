import { sendGmail, renderFieldsTable, escapeHtml } from "./gmail.server";

const NOTIFY_TO = "contact@asmanprimehub.com";
const BRAND = "ASMAN Prime Hub";

/** Best-effort in-memory throttle (per server instance). */
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimit(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) return false;
  hits.push(now);
  recent.set(key, hits);
  return true;
}

function confirmationHtml(name: string, formLabel: string) {
  return `
  <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6;max-width:600px;">
    <h2 style="color:#7B1C2A;margin:0 0 12px;">Thank you, ${escapeHtml(name)}.</h2>
    <p>Your <strong>${escapeHtml(formLabel)}</strong> has been received and will be reviewed by ${BRAND}.</p>
    <p>Professional sourcing, advisory and coordination fees may apply before execution begins. A coordinator will respond within one business day with next steps and scope.</p>
    <p style="margin-top:24px;">Regards,<br/><strong>ASMAN Prime Hub Global Services Limited</strong><br/>
    contact@asmanprimehub.com &middot; +234 708 444 3626</p>
  </div>`;
}

function notifyHtml(title: string, data: Record<string, unknown>) {
  return `
  <div style="font-family:Arial,sans-serif;color:#111;max-width:680px;">
    <h2 style="color:#7B1C2A;margin:0 0 16px;">New ${escapeHtml(title)}</h2>
    ${renderFieldsTable(data)}
    <p style="margin-top:16px;font-size:12px;color:#666;">Submitted via asmanprimehub.com</p>
  </div>`;
}

type Submission = Record<string, unknown> & {
  full_name: string;
  email: string;
  website?: string;
  source_page?: string;
};

/**
 * Sends the enquiry. Throws when the owner notification cannot be delivered, so
 * the UI never shows success for a submission that was not actually accepted.
 */
export async function handleSubmission(formLabel: string, input: Submission) {
  // Honeypot: silently accept, never notify.
  if (input.website) return { ok: true as const };

  if (!rateLimit(input.email.toLowerCase())) {
    throw new Error("Too many submissions from this address. Please email contact@asmanprimehub.com.");
  }

  const { website: _hp, consent: _c, ...rest } = input as Record<string, unknown>;
  const payload = { ...rest, submitted_at: new Date().toISOString() };

  const notify = await sendGmail({
    to: NOTIFY_TO,
    subject: `New ${formLabel} — ${input.full_name}${input.source_page ? ` (${input.source_page})` : ""}`,
    html: notifyHtml(formLabel, payload),
    replyTo: input.email,
  });

  if (!notify.ok) {
    console.error("Submission notification failed", formLabel, notify.status, notify.error);
    throw new Error("We could not deliver your enquiry. Please email contact@asmanprimehub.com or message us on WhatsApp.");
  }

  // Acknowledgement to the submitter is non-blocking.
  try {
    await sendGmail({
      to: input.email,
      subject: `We've received your ${formLabel} — ${BRAND}`,
      html: confirmationHtml(input.full_name, formLabel),
      replyTo: NOTIFY_TO,
    });
  } catch (e) {
    console.error("Submitter acknowledgement failed", e);
  }

  return { ok: true as const };
}
