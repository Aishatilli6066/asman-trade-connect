import coverBuyers from "@/assets/insight-buyers-nigerian-agri.jpg.asset.json";

export type StaticPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body_markdown: string;
  featured_image_url: string | null;
  seo_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
  published_at: string;
};

export const STATIC_POSTS: StaticPost[] = [
  {
    id: "static-buyers-nigerian-agri",
    slug: "what-buyers-are-looking-for-in-nigerian-agricultural-exports",
    title: "What Buyers Are Looking for in Nigerian Agricultural Exports",
    excerpt:
      "Global buyers of sesame, hibiscus, ginger, cashew, soybeans and gum arabic aren't just sourcing product — they're sourcing reliable partners. Here's what they evaluate before placing an order.",
    seo_title:
      "What Global Buyers Look For in Nigerian Agricultural Exports | ASMAN Prime Hub",
    meta_description:
      "Quality, capacity, documentation, communication, logistics. What international buyers of Nigerian sesame, hibiscus, ginger, cashew and gum arabic evaluate before ordering.",
    og_image_url: coverBuyers.url,
    canonical_url:
      "https://asman-trade-connect.lovable.app/insights/what-buyers-are-looking-for-in-nigerian-agricultural-exports",
    featured_image_url: coverBuyers.url,
    published_at: "2026-07-18T00:00:00Z",
    body_markdown: `Nigeria is one of Africa's leading producers of agricultural commodities, supplying products such as sesame seeds, hibiscus flowers, ginger, cashew, soybeans, gum arabic, and other raw materials to international markets.

However, global buyers are not simply looking for suppliers — they are looking for reliable business partners capable of delivering consistent quality and dependable service.

Before placing an order, buyers typically evaluate several key factors.

## Product Quality

Quality remains the first priority. Buyers expect products that meet agreed specifications, including moisture content, cleanliness, grading, packaging, and compliance with destination market requirements. Consistency from one shipment to the next is just as important as the first delivery.

## Supply Capacity

International buyers prefer suppliers who can meet agreed quantities within the required timeframe. Consistent production and dependable supply chains help build long-term business relationships.

## Documentation and Compliance

Proper export documentation demonstrates professionalism and helps prevent delays during customs clearance. Buyers often expect documents such as Certificates of Origin, Phytosanitary Certificates where applicable, commercial invoices, packing lists, and other shipment documents required by the destination country.

## Communication

Timely communication, regular shipment updates, and transparency throughout the transaction build confidence. Buyers value suppliers who respond quickly and provide accurate information.

## Logistics Coordination

Reliable logistics planning reduces delays and protects product quality during transportation. Efficient coordination between suppliers, freight forwarders, and buyers contributes to successful deliveries.

## Long-Term Partnerships

Most international buyers are not searching for one successful shipment — they are searching for dependable partners who can support their business over time.

At **ASMAN Prime Hub**, we help businesses bridge the gap between suppliers and international buyers through professional sourcing, supplier verification, procurement coordination, and trade support designed to reduce risk and improve business outcomes.`,
  },
];

export function getStaticPostBySlug(slug: string): StaticPost | undefined {
  return STATIC_POSTS.find((p) => p.slug === slug);
}