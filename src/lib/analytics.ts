/**
 * Analytics helpers. IDs come from environment variables only — never hardcoded.
 * Set VITE_META_PIXEL_ID and/or VITE_GA_MEASUREMENT_ID to activate tracking.
 */

export const META_PIXEL_ID = import.meta.env['VITE_META_PIXEL_ID'] as string | undefined;
export const GA_MEASUREMENT_ID = import.meta.env['VITE_GA_MEASUREMENT_ID'] as string | undefined;

type W = Window & {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

function w(): W | null {
  return typeof window === "undefined" ? null : (window as W);
}

/** Fired ONLY after a submission is confirmed accepted by the server. */
export function trackLead(source: string) {
  const win = w();
  if (!win) return;
  win.fbq?.("track", "Lead", { content_name: source });
  win.gtag?.("event", "generate_lead", { source });
}

export function trackContact(channel: "whatsapp" | "email" | "phone", source = "site") {
  const win = w();
  if (!win) return;
  win.fbq?.("track", "Contact", { content_name: `${channel}:${source}` });
  win.gtag?.("event", "contact", { channel, source });
}

export function trackQuoteClick(source: string) {
  const win = w();
  if (!win) return;
  win.fbq?.("trackCustom", "QuoteClick", { content_name: source });
  win.gtag?.("event", "quote_click", { source });
}
