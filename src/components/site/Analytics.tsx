import { useEffect } from "react";
import { GA_MEASUREMENT_ID, META_PIXEL_ID } from "@/lib/analytics";

/**
 * Loads Meta Pixel / GA4 only when the corresponding environment variable is set.
 * No IDs are hardcoded; nothing loads when the vars are absent.
 */
export function Analytics() {
  useEffect(() => {
    if (META_PIXEL_ID && !(window as unknown as { fbq?: unknown }).fbq) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(s);
      const q: unknown[][] = [];
      const fbq = (...args: unknown[]) => {
        const f = fbq as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[][] };
        if (f.callMethod) f.callMethod(...args);
        else f.queue.push(args);
      };
      (fbq as unknown as { queue: unknown[][] }).queue = q;
      (window as unknown as { fbq: unknown }).fbq = fbq;
      fbq("init", META_PIXEL_ID);
      fbq("track", "PageView");
    }

    if (GA_MEASUREMENT_ID && !(window as unknown as { gtag?: unknown }).gtag) {
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(s);
      const dl = ((window as unknown as { dataLayer?: unknown[] }).dataLayer ??= []);
      const gtag = (...args: unknown[]) => { dl.push(args); };
      (window as unknown as { gtag: unknown }).gtag = gtag;
      gtag("js", new Date());
      gtag("config", GA_MEASUREMENT_ID);
    }
  }, []);

  return null;
}
