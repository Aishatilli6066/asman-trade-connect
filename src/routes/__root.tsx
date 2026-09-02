import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { ConsultationModal } from "@/components/site/ConsultationModal";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@/components/site/Analytics";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-burgundy)] px-6 py-24 text-white">
      <div className="max-w-lg text-center">
        <div className="font-display text-6xl md:text-8xl text-[var(--color-gold)]">404</div>
        <h1 className="mt-6 font-display text-3xl md:text-4xl leading-tight">
          This page could not be found.
        </h1>
        <p className="mt-4 text-white/70 leading-relaxed">
          The page may have moved. Use the links below to continue, or contact us directly and we
          will point you to the right place.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-[11px] uppercase tracking-[0.22em] font-semibold">
          <Link to="/" className="px-6 py-3.5 bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-white transition-colors">
            Home
          </Link>
          <Link to="/global-sourcing" className="px-6 py-3.5 border border-white/35 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors">
            Global Sourcing
          </Link>
          <Link to="/nigerian-commodity-sourcing" className="px-6 py-3.5 border border-white/35 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors">
            Commodity Sourcing
          </Link>
          <Link to="/contact" className="px-6 py-3.5 border border-white/35 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ASMAN Prime Hub | Global Sourcing and Nigerian Export Coordination" },
      { name: "description", content: "Professional global sourcing, supplier verification, procurement, import coordination and Nigerian agricultural commodity export support for businesses and international buyers." },
      { name: "author", content: "ASMAN Prime Hub" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { property: "og:title", content: "ASMAN Prime Hub | Global Sourcing and Nigerian Export Coordination" },
      { property: "og:description", content: "Professional global sourcing, supplier verification, procurement, import coordination and Nigerian agricultural commodity export support for businesses and international buyers." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ASMAN Prime Hub" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: "https://asmanprimehub.com/logo.png" },
      { property: "og:image:width", content: "1024" },
      { property: "og:image:height", content: "1024" },
      { property: "og:image:alt", content: "ASMAN Prime Hub logo" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ASMAN Prime Hub | Global Sourcing and Nigerian Export Coordination" },
      { name: "twitter:description", content: "Professional global sourcing, supplier verification, procurement, import coordination and Nigerian agricultural commodity export support for businesses and international buyers." },
      { name: "twitter:image", content: "https://asmanprimehub.com/logo.png" },
      { name: "twitter:image:alt", content: "ASMAN Prime Hub logo" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/logo.png" },
      { rel: "apple-touch-icon", href: "/logo.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://asmanprimehub.com/#organization",
          name: "ASMAN Prime Hub",
          alternateName: ["ASMAN PRIME HUB", "Asman Prime Hub"],
          url: "https://asmanprimehub.com",
          logo: {
            "@type": "ImageObject",
            url: "https://asmanprimehub.com/logo.png",
            width: 1024,
            height: 1024,
          },
          description:
            "Professional global sourcing, supplier verification, procurement, import coordination and Nigerian agricultural commodity export support for businesses and international buyers.",
          email: "contact@asmanprimehub.com",
          telephone: "+2347084443626",
          address: {
            "@type": "PostalAddress",
            addressCountry: "NG",
          },
          sameAs: [
            "https://asmanprimehub.com",
            "https://www.linkedin.com/company/asman-prime-hub/",
            "https://www.instagram.com/asmanprimehub/",
            "https://www.facebook.com/share/1AgH4Mnzpx/",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://asmanprimehub.com/#website",
          url: "https://asmanprimehub.com",
          name: "ASMAN Prime Hub",
          description: "Global Trade, Sourcing & Export Solutions",
          publisher: { "@id": "https://asmanprimehub.com/#organization" },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://asmanprimehub.com/?s={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // The application area (Trade Connect) uses its own chrome.
  const isAppArea =
    pathname.startsWith("/app") ||
    pathname.startsWith("/platform/") ||
    pathname.startsWith("/admin") ||
    pathname === "/auth" ||
    pathname === "/reset-password";

  if (isAppArea) {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster position="top-center" />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ConsultationModal />
      <Analytics />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

