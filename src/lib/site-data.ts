export const SITE = {
  name: "ASMAN Prime Hub",
  domain: "asmanprimehub.com",
  email: "contact@asmanprimehub.com",
  contactEmail: "contact@asmanprimehub.com",
  whatsapp: "+2347084443626",
  whatsappRaw: "2347084443626",
  tagline: "Global Sourcing. Seamless Trade. Delivered.",
};

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Agricultural Export", to: "/agricultural-export" },
  { label: "Why Us", to: "/why-choose-us" },
  { label: "Contact", to: "/contact" },
] as const;

export const REGIONS = ["Middle East", "Europe", "Asia", "North America", "Africa"];

export const SERVICES = [
  { title: "Product Sourcing", desc: "Identify and secure quality products from verified global suppliers across major manufacturing hubs." },
  { title: "Supplier Verification", desc: "Comprehensive due diligence on factories, credentials, and production capacity before any commitment." },
  { title: "Procurement Solutions", desc: "End-to-end procurement coordination, negotiation, and order management on behalf of your business." },
  { title: "Import & Export Operations", desc: "Documentation, compliance, customs liaison and operational coordination for cross-border trade." },
  { title: "Freight Forwarding", desc: "Routing, consolidation and forwarder coordination optimized for cost and transit time." },
  { title: "Air Shipping", desc: "Time-critical air freight coordination with vetted carriers and consolidators." },
  { title: "Sea Shipping", desc: "FCL and LCL ocean freight coordination across global shipping lines." },
  { title: "Agricultural Commodity Export", desc: "Nigerian agricultural commodity sourcing, packaging, and export coordination to global buyers." },
];

export const COMMODITIES = [
  { name: "Sesame Seeds", slug: "sesame", img: "c-sesame", desc: "Premium hulled and unhulled sesame seeds sourced from Nigerian growing regions." },
  { name: "Hibiscus Flower", slug: "hibiscus", img: "c-hibiscus", desc: "Dried hibiscus calyx in food and beverage grade, export-ready packaging." },
  { name: "Ginger", slug: "ginger", img: "c-ginger", desc: "Split, sliced and whole dried ginger from Kaduna and surrounding regions." },
  { name: "Soybeans", slug: "soybeans", img: "c-soy", desc: "Bulk soybeans meeting international quality and moisture specifications." },
  { name: "Cashew Nuts", slug: "cashew", img: "c-cashew", desc: "Raw cashew nuts (RCN) with consistent KOR and outturn for global processors." },
  { name: "Groundnuts", slug: "groundnuts", img: "c-groundnut", desc: "Sorted, cleaned groundnuts in export-grade jute bags." },
  { name: "Shea Butter", slug: "shea", img: "c-shea", desc: "Refined and unrefined shea butter for cosmetics and food applications." },
  { name: "Dried Pepper", slug: "pepper", img: "c-pepper", desc: "Dried red chili pepper, whole and ground, in export-ready volumes." },
  { name: "Arabic Gum", slug: "gum", img: "c-gum", desc: "Grade 1 and 2 gum arabic from northern Nigeria, ideal for food and pharma." },
];

export const SERVICE_INTERESTS = [
  "Global Product Sourcing",
  "Supplier Verification",
  "Agricultural Commodity Export",
  "Freight & Shipping Coordination",
  "Procurement Solutions",
  "Import & Export Operations",
  "General Consultation",
];

export const TRADE_INTERESTS = [
  "I want to source products globally",
  "I want to export Nigerian commodities",
  "I need freight coordination",
  "I need supplier verification",
  "I need procurement support",
  "Other",
];

export const BUDGET_RANGES = [
  "Under $5,000",
  "$5,000 – $20,000",
  "$20,000 – $50,000",
  "$50,000+",
  "Prefer not to say",
];

export const TIMELINES = [
  "Immediately",
  "Within 1 month",
  "Within 3 months",
  "Just exploring",
];

export const COMMODITY_OPTIONS = [
  ...COMMODITIES.map((c) => c.name),
  "Multiple Commodities",
  "Other",
];

export const SHIPPING_METHODS = ["Sea Freight", "Air Freight", "Not Sure Yet"];