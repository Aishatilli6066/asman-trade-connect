export const SITE = {
  name: "ASMAN Prime Hub",
  legalName: "ASMAN Prime Hub Global Services Limited",
  domain: "asmanprimehub.com",
  email: "contact@asmanprimehub.com",
  contactEmail: "contact@asmanprimehub.com",
  whatsapp: "+2347084443626",
  whatsappRaw: "2347084443626",
  tagline: "Global Sourcing. Coordinated Trade. Delivered.",
};

export const COMMODITY_NOTE =
  "Product availability, specifications, pricing, minimum order quantities and shipment schedules are confirmed against each formal inquiry.";

export const INQUIRY_NOTE =
  "Submitting this form does not constitute acceptance of an order or a binding quotation. Commercial terms are confirmed only through an official quotation, proforma invoice or sales contract.";

export const DISCLAIMER =
  "Pricing, supplier availability, freight rates, exchange rates, regulations and shipment timelines are subject to change. Final obligations arise only from signed commercial documents issued by ASMAN Prime Hub Global Services Limited.";

export const INCOTERMS = ["EXW", "FOB", "CFR", "CIF", "To be advised"];

export const PAYMENT_METHODS = [
  "Telegraphic Transfer (TT)",
  "Letter of Credit (LC)",
  "Documentary Collection",
  "Escrow",
  "To be discussed",
];

export const SERVICE_CATEGORIES = [
  {
    title: "Global Product Sourcing & Supplier Verification",
    receive:
      "A shortlist of assessed suppliers matched to your specification, with company checks, capacity review, sample coordination and quotation comparison.",
    audience: "Importers, distributors and brands sourcing from Asia, the Middle East or Europe.",
    next: "Submit a trade inquiry with your specification and target quantity.",
  },
  {
    title: "Procurement & Buyer Representation",
    receive:
      "Order coordination on your behalf — negotiation support, production follow-up, inspection scheduling and documentation review.",
    audience: "Buyers who need representation at origin without opening a local office.",
    next: "Share your procurement scope and preferred Incoterm.",
  },
  {
    title: "Nigerian Agricultural Export Coordination",
    receive:
      "Origin sourcing, specification confirmation, packaging guidance, quality-control coordination and export documentation support.",
    audience: "International buyers of Nigerian agricultural commodities.",
    next: "Send your commodity, specification, quantity and destination port.",
  },
  {
    title: "Freight & Logistics Coordination",
    receive:
      "Forwarder selection, routing options across air and sea, booking coordination and shipment follow-up against agreed milestones.",
    audience: "Shippers who want one coordinated point of contact across carriers and forwarders.",
    next: "Provide cargo details, origin and destination for routing options.",
  },
  {
    title: "Trade Advisory & Market Intelligence",
    receive:
      "Structured briefings on landed cost, documentation requirements, Incoterm selection and market entry considerations for your corridor.",
    audience: "Businesses evaluating a new sourcing or export corridor.",
    next: "Book a consultation to define the scope of the review.",
  },
  {
    title: "OEM / ODM & Custom Manufacturing Support",
    receive:
      "Factory identification for custom or private-label production, sample and tooling coordination, and specification control through production.",
    audience: "Brands developing own-label or customised products.",
    next: "Submit a trade inquiry with your product brief and target specification.",
  },
];

export const HOW_WE_WORK = [
  { t: "Inquiry & requirement review", d: "We review your specification, quantity, destination and timeline, and confirm what is workable." },
  { t: "Feasibility & supplier assessment", d: "Structured supplier and product assessment against your requirement, with samples where relevant." },
  { t: "Commercial proposal & agreed scope", d: "A written proposal setting out scope, responsibilities, Incoterm and indicative commercial terms." },
  { t: "Verification, documentation & quality coordination", d: "Specification confirmation, inspection arrangements and coordination of trade documentation." },
  { t: "Logistics, shipment & transaction follow-through", d: "Freight coordination, shipment tracking against milestones and documented handover." },
];

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Global Sourcing", to: "/global-sourcing" },
  { label: "Commodity Sourcing", to: "/nigerian-commodity-sourcing" },
  { label: "Trade Advisory", to: "/why-choose-us" },
  { label: "Insights", to: "/insights" },
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
  { name: "Gum Arabic", slug: "gum", img: "c-gum", desc: "Grade 1 and Grade 2 Gum Arabic from northern Nigeria, for food and pharmaceutical use." },
];

export const SERVICE_INTERESTS = [
  "Global Product Sourcing & Supplier Verification",
  "Procurement & Buyer Representation",
  "Nigerian Agricultural Export Coordination",
  "Freight & Logistics Coordination",
  "Trade Advisory & Market Intelligence",
  "OEM / ODM & Custom Manufacturing Support",
  "Other",
];

export const BUSINESS_TYPES = [
  "Importer",
  "Exporter",
  "Distributor",
  "Manufacturer",
  "Ecommerce Seller",
  "Startup",
  "Individual Buyer",
  "Other",
];

export const BUDGET_RANGES_USD = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,001 – $10,000",
  "$10,001 – $50,000",
  "$50,001 – $100,000",
  "Above $100,000",
];

export const DELIVERY_TIMELINES = [
  "ASAP",
  "Within 2 Weeks",
  "Within 1 Month",
  "Within 3 Months",
  "Flexible",
];

export const SHIPPING_METHODS_FULL = [
  "Air Freight",
  "Sea Freight",
  "Express Courier",
  "Not Sure",
];

export const TRADE_INTERESTS = [
  "Global Sourcing & Procurement",
  "Nigerian Agricultural Export",
  "Freight & Logistics Coordination",
  "Supplier Verification & Due Diligence",
  "Procurement Support",
  "Import / Export Documentation",
  "Other / Multiple Services",
];

export const BUDGET_RANGES = [
  "Under $5,000",
  "$5,000 – $20,000",
  "$20,001 – $50,000",
  "$50,001 – $100,000",
  "Above $100,000",
  "To Be Discussed",
];

export const TIMELINES = [
  "Immediately (Urgent)",
  "Within 1 Month",
  "Within 3 Months",
  "Within 6 Months",
  "Flexible / No Fixed Timeline",
];

export const COMMODITY_OPTIONS = [
  ...COMMODITIES.map((c) => c.name),
  "Multiple Commodities",
  "Other",
];

export const SHIPPING_METHODS = ["Sea Freight", "Air Freight", "Not Sure Yet"];