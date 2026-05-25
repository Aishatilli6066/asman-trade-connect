# ASMAN Prime Hub — Premium Trade Website

A premium, editorial-corporate website for an international trade, sourcing, logistics and Nigerian agricultural export company. Burgundy / black / gold palette, Playfair Display + Plus Jakarta Sans, with three Cloud-backed forms.

## Brand & Design System

- **Colors (tokens in `src/styles.css`, oklch):** Deep Burgundy `#7B1C2A`, Rich Black `#0D0D0D`, Warm Gold `#E8D5A3`, White. Gold used sparingly (accents, buttons, dividers, hover).
- **Typography:** Playfair Display (headings, editorial), Plus Jakarta Sans (body) — loaded via Google Fonts in `__root.tsx`.
- **Aesthetic:** Sharp corners (no rounded), generous whitespace, strong grid, cinematic dark sections, restrained motion (fade/slide on scroll, subtle hover).
- **Imagery:** Generated premium visuals — cargo ports, containers, warehouses, agricultural commodities, freight ops. Saved to `src/assets/`.

## Pages (TanStack file routes)

Each route has its own `head()` with unique title, description, og:title/description.

```
src/routes/
  __root.tsx              -> shared Header, Footer, fonts, WhatsApp float, ConsultationModal provider
  index.tsx               -> Home (12 sections per brief)
  about.tsx               -> About Us
  services.tsx            -> Services (detailed sections)
  agricultural-export.tsx -> Commodity grid + Form 3
  why-choose-us.tsx       -> Trust + capabilities
  blog.tsx                -> Template with placeholder posts
  contact.tsx             -> Split burgundy/white + Form 1
  privacy-policy.tsx
  terms.tsx
```

## Shared Components

- `Header` — minimal nav, gold "Book Consultation" CTA
- `Footer` — black, quick links, commodity links, contact, socials, newsletter, WhatsApp shortcut
- `WhatsAppFloat` — fixed bottom-right, links to `+2347042322970`
- `ConsultationModal` — global modal triggered by any "Book Consultation" button (Form 2)
- `SectionHeading`, `MetricCard`, `ServiceCard`, `CommodityCard`, `ProcessStep`, `TestimonialCard`

## Forms (Lovable Cloud)

Enable Lovable Cloud. Three Supabase tables with RLS (public INSERT only):

- `trade_inquiries` — Form 1 (Contact page + homepage strip)
- `consultation_requests` — Form 2 (global modal)
- `export_inquiries` — Form 3 (Agricultural Export page)

Each form:
- Zod validation, react-hook-form
- Sharp inputs, gold focus border, gold submit button with black text
- Gold success state: "Thank you. We will respond within 24 hours."
- Insert via `createServerFn` using `supabaseAdmin`
- Email notification to `contact@asmanprimehub.com` via Resend connector (server fn) — added after Cloud enable; if Resend not connected, server fn logs row and skips email (user can connect Resend later).

## Homepage Sections

1. Hero — full-bleed cargo-port image, dark overlay, headline, two CTAs
2. Global Trade Coverage strip (5 regions)
3. Metrics bar (4 dark cards, gold numerals)
4. About preview + "Learn More"
5. How We Work (4-step timeline)
6. Services grid (8 cards, dark)
7. Agricultural Export highlight (10 commodity cards + support services)
8. Why Choose Us (6–8 icon blocks)
9. Operational Standards
10. Testimonials (3 dark editorial cards)
11. Consultation CTA (full-width burgundy)
12. Contact preview strip (WhatsApp, email, socials)

## Animation

`framer-motion` for fade/slide reveals on scroll, hover lifts on cards. No flashy startup motion.

## SEO & Tech

- Unique meta per route, semantic H1, canonical (leaf only), JSON-LD Organization at root
- Smooth scroll, optimized generated images (jpg), lazy loading
- Mobile-first responsive across all sections

## Technical Notes

- Stack: TanStack Start + Tailwind v4 (already configured)
- Tokens added to `src/styles.css` (`--burgundy`, `--gold`, `--ink`, plus semantic mappings)
- shadcn Button/Input/Textarea/Select/Dialog customized via variants — no rounded corners
- Server fns in `src/lib/forms.functions.ts` using `supabaseAdmin` (writes are public-safe via validated input + table constraints)
- Consultation modal mounted in `__root.tsx`, opened via Zustand or React context store

## Build Order

1. Enable Lovable Cloud + create 3 tables (migration)
2. Set design tokens + fonts + base styles
3. Generate hero + section imagery (premium tier for hero)
4. Build Header, Footer, WhatsAppFloat, ConsultationModal
5. Build Homepage sections
6. Build remaining 8 pages
7. Wire 3 forms to server fns
8. SEO meta per route, JSON-LD
9. Mobile pass + motion polish
