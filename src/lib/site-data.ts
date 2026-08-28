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
/** Shown before submission on every enquiry form. */
export const FEE_NOTICE =
  "Professional sourcing, advisory and coordination fees apply. Scope and fees are confirmed in writing before any execution work begins.";

/** Shown only after a submission has been accepted by the server. */
export const SUBMISSION_CONFIRMATION =
  "Thank you. Your requirement has been received and will be reviewed by ASMAN Prime Hub. Professional sourcing, advisory and coordination fees may apply before execution begins.";

export const CONSENT_LABEL =
  "I consent to ASMAN Prime Hub storing and using these details to respond to my enquiry, as described in the Privacy Policy.";

export const PATHWAYS = [
  {
    title: "I need products, machinery or raw materials sourced globally.",
    desc: "Supplier identification and verification, OEM/ODM and private-label coordination, landed-cost analysis and import coordination.",
    to: "/global-sourcing",
    cta: "Global Sourcing",
  },
  {
    title: "I need Nigerian agricultural commodities sourced and coordinated for export.",
    desc: "Origin sourcing, supply-capacity assessment, quality and inspection coordination, documentation and freight coordination.",
    to: "/nigerian-commodity-sourcing",
    cta: "Nigerian Commodity Sourcing",
  },
] as const;

export const ENGAGEMENT_PROCESS = [
  { t: "Requirement review", d: "We review your specification, quantity, destination and timeline and confirm what is workable." },
  { t: "Scope & professional fee confirmation", d: "Scope, responsibilities and professional fees are agreed in writing before work begins." },
  { t: "Research, sourcing or supply assessment", d: "Supplier identification and verification, or origin supply-capacity assessment against your requirement." },
  { t: "Commercial & execution planning", d: "Quotation comparison, Incoterm and payment structure, landed-cost view and an execution plan." },
  { t: "Coordination & progress reporting", d: "Inspection, packaging, documentation and freight coordination with written progress reporting." },
  { t: "Completion & documentation handover", d: "Shipment follow-through and handover of the transaction documentation set." },
];

export const GLOBAL_SOURCING_SCOPE = [
  "Products, machinery, equipment and raw-material sourcing",
  "Supplier identification and verification",
  "Procurement and buyer representation",
  "OEM, ODM and private-label coordination",
  "Samples and quotation comparison",
  "Negotiation support",
  "Production follow-up",
  "Quality-control and inspection coordination",
  "Landed-cost analysis",
  "Freight and import coordination",
];

export const COMMODITY_SCOPE = [
  "Origin and supplier sourcing",
  "Supply-capacity assessment",
  "Specification and quality confirmation",
  "Sample and laboratory-testing coordination",
  "Commercial-term negotiation",
  "Cleaning, grading and packaging coordination",
  "Inspection and export-documentation coordination",
  "Inland transportation, port and freight coordination",
  "Transaction monitoring and progress reporting",
];

export const PREFERRED_ORIGINS = [
  "China",
  "India",
  "Turkey",
  "United Arab Emirates",
  "European Union",
  "United States",
  "Other / No preference",
];

export const PACKAGING_OPTIONS = [
  "50kg jute bags",
  "50kg PP bags",
  "Bulk / loose",
  "Vacuum-packed cartons",
  "Buyer-specified packaging",
  "To be advised",
];

export const PAYMENT_TERMS = [
  "Telegraphic Transfer (TT)",
  "Letter of Credit (LC) at sight",
  "Documentary Collection (CAD/DP)",
  "Part payment / balance against documents",
  "To be discussed",
];

export const BRANDING_NEEDS = [
  "No branding required",
  "Private label / own brand",
  "OEM — custom product to our specification",
  "ODM — supplier design, our branding",
  "Not sure yet",
];

/** WhatsApp deep link with a page-specific prefilled message. */
export const waLink = (message: string) =>
  `https://wa.me/${SITE.whatsappRaw}?text=${encodeURIComponent(message)}`;

/** Seven client-facing service blocks used on the homepage and /services. */
export const SERVICE_BLOCKS = [
  {
    title: "Global Product Sourcing",
    desc: "We support businesses sourcing products, machinery, equipment, raw materials, packaging materials, private-label products and commercial goods from international markets.",
    audience: "Importers, distributors, manufacturers and brands buying from Asia, the Middle East, Europe and North America.",
    next: "Send your product specification, target quantity and destination market.",
  },
  {
    title: "Supplier Verification",
    desc: "We assist clients with supplier background checks, business legitimacy review, production capacity checks, quotation review, communication support and risk reduction before payment.",
    audience: "Buyers who need independent assurance before releasing funds to a new supplier.",
    next: "Share the supplier details and quotation you want reviewed.",
  },
  {
    title: "Import Coordination",
    desc: "We support importers with product specification, supplier communication, landed cost analysis, freight coordination, documentation guidance and shipment follow-up.",
    audience: "Importers who want one coordinated point of contact from order to arrival.",
    next: "Provide your product, quantity, origin and destination port.",
  },
  {
    title: "Procurement Coordination",
    desc: "We coordinate structured purchasing for businesses that need reliable sourcing, quotation comparison, negotiation support and supply-chain execution.",
    audience: "Procurement teams, SMEs and companies buying repeatedly across borders.",
    next: "Share your procurement scope and preferred commercial terms.",
  },
  {
    title: "Nigerian Agro Commodity Sourcing",
    desc: "We support buyers and exporters sourcing Nigerian agro commodities such as hibiscus, sesame, ginger, shea products, cashew, charcoal and soybeans, based on buyer specification.",
    audience: "International buyers, processors and traders sourcing from Nigeria and West Africa.",
    next: "Send your commodity, specification, quantity and destination port.",
  },
  {
    title: "Export Documentation & Compliance Support",
    desc: "We support exporters with export-readiness guidance, documentation planning, COA, phytosanitary certificate, certificate of origin, NEPC-related requirements, logistics coordination and buyer communication.",
    audience: "Exporters and agribusinesses preparing shipments for international buyers.",
    next: "Tell us the commodity, destination market and shipment terms.",
  },
  {
    title: "Business Advisory",
    desc: "We provide strategic advisory for importers, exporters, agribusiness investors and companies entering international trade.",
    audience: "Businesses evaluating a new sourcing corridor, export market or trade model.",
    next: "Book a consultation to define the scope of the review.",
  },
] as const;

/** Additional agro commodities coordinated on a buyer-specification basis. */
export const ADDITIONAL_COMMODITIES = [
  "Charcoal",
  "Moringa",
  "Baobab",
  "Shea nuts",
  "Other agro commodities based on buyer requirement",
];

/** Reasons clients engage ASMAN Prime Hub — used on /why-choose-us. */
export const WHY_POINTS = [
  { t: "Structured trade process", d: "Every engagement follows a documented sequence from requirement review to shipment handover." },
  { t: "Supplier and buyer verification support", d: "Business legitimacy, capacity and communication checks before funds or goods move." },
  { t: "Product specification before pricing", d: "We define exactly what is being bought before any quotation is compared or accepted." },
  { t: "Landed cost and profitability assessment", d: "Product cost, freight, duties, clearing, logistics and exchange-rate impact assessed before commitment." },
  { t: "Documentation and compliance awareness", d: "COA, phytosanitary, certificate of origin, NEPC and destination-market requirements coordinated in advance." },
  { t: "Logistics coordination", d: "Forwarder selection, routing options and shipment follow-up against agreed milestones." },
  { t: "Global sourcing reach", d: "Supplier networks across Asia, the Middle East, Europe and North America." },
  { t: "Nigerian and African commodity access", d: "Direct origin sourcing for agro commodities across Nigerian and West African growing regions." },
  { t: "Professional communication and execution follow-up", d: "Written updates, named contacts and defined response windows through the transaction." },
];

/** SEO FAQ shown on the homepage and emitted as FAQPage structured data. */
export const FAQS = [
  {
    q: "What does ASMAN Prime Hub do?",
    a: "ASMAN Prime Hub provides global sourcing, supplier verification, procurement coordination, import support, agro commodity sourcing, export documentation guidance and international trade advisory for businesses.",
  },
  {
    q: "Is ASMAN Prime Hub only for Nigerian businesses?",
    a: "No. ASMAN Prime Hub is based in Nigeria but supports businesses across global markets. The company works with importers, exporters, buyers, suppliers and business owners involved in international trade.",
  },
  {
    q: "Can ASMAN Prime Hub help verify international suppliers?",
    a: "Yes. We support supplier verification by reviewing supplier details, communication, quotations, business information, product capacity and risk indicators before clients proceed with payments or procurement.",
  },
  {
    q: "Can ASMAN Prime Hub help with importing products?",
    a: "Yes. We support import coordination for machinery, equipment, raw materials, packaging materials, private-label products and commercial goods.",
  },
  {
    q: "Can ASMAN Prime Hub source Nigerian agro commodities?",
    a: "Yes. We support agro commodity sourcing from Nigeria based on buyer specification, quantity, quality requirements, documentation needs and shipment terms.",
  },
  {
    q: "Does ASMAN Prime Hub prepare landed cost analysis?",
    a: "Yes. We help clients estimate product cost, freight, documentation, clearing, logistics, exchange rate impact and expected profitability before committing funds.",
  },
  {
    q: "Can ASMAN Prime Hub support export documentation?",
    a: "Yes. We guide exporters and buyers on relevant documentation such as COA, phytosanitary certificate, certificate of origin, NEPC-related requirements and other transaction-specific documents.",
  },
  {
    q: "How can a client start?",
    a: "Send the product or commodity required, quantity, specification, destination country, target budget and expected timeline. ASMAN Prime Hub will review the request and advise on the next professional step.",
  },
];
