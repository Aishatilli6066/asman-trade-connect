# ASMAN Prime Hub — Audit & Update Plan

Audit only; no files changed. Findings below are based on the current codebase (routes in `src/routes/`, shared copy in `src/lib/site-data.ts`, forms in `src/components/site/forms/`).

## Current state (verified)

- Pages: Home, About, Services, Agricultural Export, Why Us, Insights (list + posts), Quote, Contact, Privacy, Terms, Auth + admin.
- WhatsApp is already correct everywhere (`+2347084443626`, single source in `site-data.ts`) — the old number is gone.
- CAC and NEPC are shown as badges; no SCUML claim exists anywhere. No testimonials section exists.
- No Academy or programme offer exists anywhere on the site.
- Three forms exist (Trade Inquiry, Consultation modal, Export Inquiry); submissions go to `contact@asmanprimehub.com`.

## 1. Urgent fixes

1. **Missing revenue offers.** Neither the Export Academy nor the 12-week Implementation Programme exists on the site. This is the biggest gap.
2. **Positioning drift.** Home/About read as a trading/logistics operator. Reframe as a *trade consultancy and execution-coordination company*.
3. **"Registered & Trusted" eyebrow** (`index.tsx:98`) plus badge sub-labels imply broader accreditation than CAC + NEPC. Retitle to "Registered Business" and state exactly: CAC registered, NEPC registered exporter, SCUML application in progress — never "fully compliant".
4. **Founder/brand overlap.** Add one explicit line separating ASMAN Prime Hub (company services) from AishaUsman.com (personal brand/mentorship), with a single outbound link, so the two don't cannibalise.
5. **Lead qualification.** Trade Inquiry is 14 required fields — too heavy as the only entry point. Add a short qualifying route for early-stage enquirers (see §5).
6. **Claim sweep.** Audit every card, stat, caption and Insights post for volumes, client/supplier counts, "seamless", "guaranteed", "always in stock". Replace with process language ("coordinated", "subject to confirmation").

## 2. Structural / copy updates

- **Home:** new hierarchy (§4), Academy + Programme band, credentials strip corrected, remove operator-style implications.
- **About:** consultancy story, founder credibility without unverifiable numbers, explicit AishaUsman.com boundary, registration status block.
- **Services:** restate as nine advisory/coordination services — sourcing, supplier verification, OEM/ODM & private label, landed-cost & freight coordination, end-to-end importation support, Nigerian agri sourcing/export coordination, documentation & compliance guidance, buyer outreach & representation, business planning. Each: what you get / who it's for / next step.
- **Agricultural Export:** keep commodity grid; strengthen the availability disclaimer above the grid, not only below.
- **Why Us:** convert to process-and-accountability proof points; drop anything numeric that isn't documented.
- **Insights:** keep; add internal links to Academy and Services from post footers.
- **Legal:** Privacy — name the form data collected, storage, retention, contact for deletion. Terms — non-binding enquiry, no guarantee of supply/price/timeline, education products are non-refundable after access is issued (or state the actual refund rule).

## 3. Suggested page architecture

```text
/                        Home
/about                   About + founder + brand boundary
/services                Services overview (9 services, anchored)
/agricultural-export     Commodities + export coordination
/export-academy          NEW — 2-week WhatsApp training, ₦15,000 / US$15
/implementation-programme NEW — 12-week, application + assessment
/why-choose-us           Process & accountability
/insights                Articles
/quote                   Full trade inquiry
/start                   NEW — short qualifier that routes to the right path
/contact                 Contact + WhatsApp
/privacy-policy, /terms
```

Nav: Home · About · Services · Agricultural Export · Academy · Insights · Contact, plus gold "Trade Inquiry" CTA. Programme lives under Academy page and Services, not in top nav.

## 4. Exact homepage message hierarchy

1. **Eyebrow:** Nigerian International Trade Consultancy
2. **H1:** Sourcing, Importation and Export — Coordinated End to End
3. **Sub:** We advise and coordinate on behalf of companies, importers, exporters and commodity buyers: supplier verification, OEM/ODM, landed cost, freight, documentation and Nigerian agricultural export.
4. **CTAs:** *Submit a Trade Inquiry* (primary, gold) · *Join the Export Academy* (secondary outline)
5. **Credentials strip:** CAC Registered · NEPC Registered Exporter · SCUML application in progress
6. **Who we work with** — 4 audience tiles
7. **Services** — 9 cards
8. **How we work** — 5-step process
9. **Agricultural export** — commodity band + availability note
10. **Learn & implement** — two cards: Export Academy (₦15,000 / US$15, next cohort) and 12-Week Implementation Programme (application only)
11. **Founder** — Aisha Usman, with AishaUsman.com boundary line
12. **Insights** — 3 latest
13. **Final CTA** — Trade Inquiry + WhatsApp

## 5. Inquiry forms & workflows

**A. Quick Qualifier (`/start`, 6 fields):** name, email, WhatsApp, country, "What do you need?" (Import sourcing / Agricultural export / Freight & landed cost / Academy / Programme / Other), stage (exploring, ready to buy, already trading). Routes to the right full form or offer page.

**B. Trade Inquiry (existing, keep 14 fields but re-tier):** required — name, company, email, WhatsApp, country, service, product, quantity, destination; optional/progressive — incoterm, payment method, timeline, budget, specifications. Keeps the non-binding note.

**C. Export Academy registration:** name, WhatsApp (required — delivery channel), email, country, currency-aware fee shown (₦15,000 / US$15), experience level, consent. Success copy states: WhatsApp group link sent after payment confirmation, daily 2 PM WAT Q&A, Saturday 9 AM–12 PM revision.

**D. Implementation Programme application:** business name, role, WhatsApp, email, sector/product, current trade activity, capital readiness band, target market, timeline, what they want to achieve. Success copy: reviewed and shortlisted applicants invited to an assessment call — no instant purchase.

All four: store in Cloud, notify `contact@asmanprimehub.com`, surface real submit failures instead of a silent success.

## 6. Technical / SEO / accessibility

- Unique title, description, OG/Twitter and canonical for the three new routes; add them to the sitemap.
- JSON-LD: `Organization` + `ProfessionalService` (Nigeria, WhatsApp contact point) sitewide; `Course` on the Academy page; `FAQPage` for an Academy FAQ.
- Add an Academy FAQ block (fee, duration, platform, times, certificate, refunds) — strong long-tail search fit.
- Make every phone/WhatsApp string come from `SITE` (already true) and add `tel:` alongside `wa.me` where a call is plausible.
- Mobile: verify the new Academy/Programme bands don't overflow at 360px; keep tap targets ≥44px; check gold-on-white contrast for small text (currently borderline in places) and swap to burgundy text on light backgrounds.
- Accessibility: labelled form controls, visible focus rings on gold buttons, `aria-live` on submit results, alt text on badge and commodity images.
- Performance: lazy-load below-fold imagery; confirm hero image is the only eager one.

## Needs owner input before writing copy

- Next Academy cohort start date and payment method/link.
- Programme fee (or "disclosed at assessment") and intake dates.
- Whether refunds are offered for the Academy.
- Any client work that may be described anonymously as Challenge / Scope / Approach / Current Status.
