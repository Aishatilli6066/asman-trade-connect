/**
 * Image Optimization Utilities for ASMAN Trade Connect
 * 
 * Provides best practices and utilities for image handling, responsive loading,
 * and performance optimization across the application.
 */

/**
 * Image dimension specifications for responsive design
 */
export const IMAGE_SPECS = {
  founder: {
    mobile: { width: 280, height: 340, aspect: 0.82 },
    tablet: { width: 320, height: 390, aspect: 0.82 },
    desktop: { width: 360, height: 440, aspect: 0.82 },
    description: "Founder portrait with consistent 0.82 aspect ratio for all breakpoints",
  },
  hero: {
    mobile: { width: 375, height: 667, aspect: 0.56 },
    tablet: { width: 768, height: 1024, aspect: 0.75 },
    desktop: { width: 1920, height: 1080, aspect: 1.78 },
    description: "Full-height hero section with responsive aspect ratios",
  },
  commodityCard: {
    all: { width: 300, height: 300, aspect: 1 },
    description: "Square commodity product images with consistent aspect ratio",
  },
  logoBadge: {
    mobile: { width: 100, height: 80, aspect: 1.25 },
    desktop: { width: 140, height: 112, aspect: 1.25 },
    description: "Registration badges and partner logos with proper scaling",
  },
  partnerLogo: {
    width: 140,
    height: 48,
    maxWidth: "140px",
    maxHeight: "12rem",
    description: "Freight partner logos with max constraints",
  },
} as const;

/**
 * Image loading optimization settings
 */
export const IMAGE_LOADING_CONFIG = {
  /**
   * Images above the fold should load eagerly
   */
  EAGER_IMAGES: [
    "hero-port",
    "logo",
    "founder-aisha",
  ],

  /**
   * Images below the fold should use lazy loading
   */
  LAZY_IMAGES: [
    "logistics-ship",
    "warehouse-bags",
    "badge-cac",
    "badge-nepc",
    "c-",
    "ship-",
    "globe",
    "agri-hero",
    "warehouse",
  ],

  /**
   * Default loading strategy
   */
  DEFAULT: "lazy" as const,
} as const;

/**
 * Generates appropriate loading attribute for images
 */
export function getLoadingStrategy(imageName: string): "eager" | "lazy" {
  const isEager = IMAGE_LOADING_CONFIG.EAGER_IMAGES.some((name) =>
    imageName.includes(name)
  );

  if (isEager) return "eager";

  const isLazy = IMAGE_LOADING_CONFIG.LAZY_IMAGES.some((name) =>
    imageName.includes(name)
  );

  return isLazy ? "lazy" : IMAGE_LOADING_CONFIG.DEFAULT;
}

/**
 * Image path resolver for consistent asset references
 */
export const imagePaths = {
  founder: "founder-aisha.jpg",
  badgeCac: "badge-cac.jpg",
  badgeNepc: "badge-nepc.jpg",
  shipDhl: "ship-dhl.svg",
  shipFedex: "ship-fedex.svg",
  shipUps: "ship-ups.svg",
  shipMaersk: "ship-maersk.svg",
  heroPort: "hero-port.jpg",
  logisticsShip: "logistics-ship.jpg",
  warehouseBags: "warehouse-bags.jpg",
  agriHero: "agri-hero.jpg",
  globe: "globe.jpg",
} as const;

/**
 * Best practices documentation
 */
export const IMAGE_BEST_PRACTICES = {
  altText: "Always use semantic alt text describing image content for accessibility and SEO",
  
  cssClasses: {
    portrait: "object-cover object-center",
    landscape: "object-cover object-center",
    thumbnail: "object-contain",
  },

  responsivePattern: {
    mobile: "w-[280px] h-[340px]",
    tablet: "md:w-[320px] md:h-[390px]",
    desktop: "lg:w-[360px] lg:h-[440px]",
  },

  lazyLoadingEnabled: true,

  formats: {
    photography: "JPEG (quality 80-85%)",
    graphics: "PNG or SVG",
    logos: "SVG (preferred)",
    icons: "SVG or PNG",
  },

  performance: {
    maxImageSize: "250 KB for most images",
    preferredFormats: ["SVG", "WebP", "JPEG"],
    avoidFormats: ["BMP", "TIFF"],
  },
} as const;

export type ImageSpec = (typeof IMAGE_SPECS)[keyof typeof IMAGE_SPECS];
export type ImagePath = (typeof imagePaths)[keyof typeof imagePaths];
