import { SITE } from "@/lib/site-data";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${SITE.whatsappRaw}?text=Hello%20ASMAN%20Prime%20Hub%2C%20I%27d%20like%20to%20discuss%20a%20trade%20inquiry.`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-30 grid place-items-center h-14 w-14 bg-[var(--color-gold)] text-[var(--color-ink)] shadow-[0_10px_40px_-10px_rgba(232,213,163,0.6)] hover:bg-white transition-colors"
    >
      <MessageCircle size={22} strokeWidth={1.8} />
    </a>
  );
}