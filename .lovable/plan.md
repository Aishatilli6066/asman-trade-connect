# ASMAN Prime Hub — Pre-Paid-Traffic Audit

Read-only audit. Every item below is evidenced from the current code.

## CRITICAL — fix before any ad spend

1. **Form submissions can fail silently.**
   `src/lib/forms.functions.ts:50-52` wraps the Gmail send in `try/catch` and only
   `console.error`s. `src/lib/gmail.server.ts:31-34,44-48` returns `{ok:false}` on missing
   credentials or a non-2xx Gmail response instead of throwing. The server fn always returns
   `{ok:true}`, so all three forms show "Request submitted" even when nothing was delivered.
   There is also **no database write** — email is the only copy of a lead.
   Fix: persist every submission to Cloud first, then attempt email; throw on send failure so the
   UI shows a real error with a WhatsApp fallback.

2. **Canonical URLs point to a domain that is not connected.**
   Nine routes canonicalise to `https://asmanprimehub.com/...` (`index.tsx:37`, `about.tsx:25`,
   `services.tsx:26`, `agricultural-export.tsx:30`, `why-choose-us.tsx:23`, `contact.tsx:24`,
   `terms.tsx:15`, `privacy-policy.tsx:15`, `quote.tsx`), and all OG/JSON-LD URLs match — but the
   project has no custom domain; the live site is `asman-trade-connect.lovable.app`.
   Meanwhile `public/sitemap.xml` and `insights.index.tsx:41` use the `.lovable.app` host.
   Result: self-conflicting signals, and ad landing pages canonicalising off-site.
   Fix: pick one live host, drive it from a single `SITE_URL` constant used by canonical, OG,
   JSON-LD and sitemap. If `asmanprimehub.com` is the target, connect it first.

3. **Broken robots meta values.** `terms.tsx` and `privacy-policy.tsx` emit
   `content: "n, nofollow"`; `auth.tsx`, `insights.$slug.tsx` (not-found) and the three admin
   routes emit `content: "n"`. `"n"` is not a valid directive — these pages are effectively
   indexable. Should be `noindex, nofollow`.

4. **Implied carrier partnerships.** `index.tsx` renders DHL, FedEx, UPS and Maersk logos under
   the heading **"Freight & Logistics Partners"**. Unless there are signed agreements, this is an
   unverifiable claim and a trademark/Meta ad-review risk.
   Fix: remove the logos, or relabel to "We coordinate shipments via major carriers" with no marks.

5. **No analytics or conversion tracking anywhere.** No `gtag`, `dataLayer`, `fbq` or Meta Pixel
   exists in the codebase. Two Meta campaigns cannot be optimised or measured.
   Fix: Meta Pixel + GA4 in `__root.tsx`, with events on `Lead` (each form success), `Contact`
   (WhatsApp click) and `ViewContent` (landing pages), plus a consent line in the privacy policy.

## HIGH

6. **No dedicated ad landing pages.** Only `/quote` exists. Both campaigns would land on generic
   pages. Build two focused, nav-light pages: `/import-sourcing` (Nigerian companies importing) and
   `/export-buyers` (international buyers of Nigerian commodities), each with one offer, one form,
   one WhatsApp CTA, and matching ad copy.

7. **Trade Inquiry form is 14 required fields** (`TradeInquiryForm.tsx`). Far too heavy for
   cold paid traffic. Use a 5-field first step (name, email, WhatsApp, country, need) and collect
   the rest after the lead is captured.

8. **"Registered & Trusted" / "Officially registered. Globally connected."**
   (`index.tsx:98,101`) overstates what is documented. CAC and NEPC are supported; SCUML is
   pending. State exactly that and never use "fully compliant".

9. **Overlap with Aisha Usman's personal site.** The founder block on the homepage has no
   statement separating the company from her personal authority brand. Add one explicit boundary
   line and a single outbound link so the two don't compete on brand queries.

10. **WhatsApp number is correct** — `+2347084443626` is the single source in
    `src/lib/site-data.ts:7-8` and every link derives from it (Header, Footer, Contact, float).
    No stale number remains. **No action required.** Add `tel:` alongside `wa.me` for desktop.

11. **Social links are unstable.** Instagram uses a share-tracking `?igsh=` param and Facebook
    uses a `share/1AgH4Mnzpx/` short link (`Footer.tsx:40,49`). Replace with canonical profile URLs
    and mirror them in `sameAs` on the Organization schema.

## MEDIUM

12. **Sitemap is hand-maintained and already drifting** — hardcoded `lastmod` dates and no
    `/insights` post automation. Generate it from the route tree + posts.
13. **Hero copy is generic.** "Global Trade & Sourcing Partner." does not name the audience or the
    outcome. Neither campaign's message matches it. Sharpen to a two-audience value proposition.
14. **Proof is thin.** No case studies, no anonymised outcomes, no process transparency beyond the
    5-step block. Add Challenge / Scope / Approach / Current Status entries only where real.
15. **Legal pages** don't yet name the exact form data collected, retention, or the pixel/analytics
    use — required before running Meta traffic in the EU/UK.
16. **Schema gaps.** No `Organization`-level `ProfessionalService`, no `contactPoint` with the
    WhatsApp number, no `FAQPage`. Add these once the domain question is settled.

## LOW

17. Hero image is 1920×1080 and eager — serve responsive sizes and preload only the LCP image.
18. Gold-on-white micro-copy (`text-[10px] tracking-[0.3em]` at `opacity/55-60`) fails WCAG AA in
    several places; switch to burgundy text on light backgrounds.
19. Add visible focus rings on gold buttons and `aria-live` on form submit results.
20. Grayscale carrier-logo hover has no keyboard equivalent (moot if item 4 removes it).

## Implementation order

1. Persist + hard-fail form submissions (item 1)
2. Decide the canonical host, unify SITE_URL across canonical/OG/JSON-LD/sitemap (2, 12)
3. Fix robots meta values (3)
4. Remove or relabel carrier logos; correct registration wording (4, 8)
5. Install Meta Pixel + GA4 with Lead/Contact events; update privacy copy (5, 15)
6. Build the two campaign landing pages with the short-form lead capture (6, 7)
7. Brand boundary line, stable social URLs, schema `sameAs`/`contactPoint` (9, 11, 16)
8. Hero and proof rewrite (13, 14)
9. Accessibility and performance pass (17-20)

Items 1-5 are the gate: do not spend on Meta until they are done.

## Owner input needed

- Is `asmanprimehub.com` being connected, or does the `.lovable.app` URL stay canonical?
- Are there any signed carrier or forwarder agreements behind the DHL/FedEx/UPS/Maersk logos?
- Meta Pixel ID and GA4 measurement ID.
- Any real engagements that may be described anonymously as proof.
