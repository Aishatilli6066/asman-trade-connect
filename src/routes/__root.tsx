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

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
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
      { title: "ASMAN Prime Hub | Global Trade, Sourcing & Export Solutions" },
      { name: "description", content: "ASMAN Prime Hub helps businesses worldwide with sourcing, procurement, supplier verification, import/export coordination and logistics solutions." },
      { name: "author", content: "ASMAN Prime Hub" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { property: "og:title", content: "ASMAN Prime Hub | Global Trade, Sourcing & Export Solutions" },
      { property: "og:description", content: "ASMAN Prime Hub helps businesses worldwide with sourcing, procurement, supplier verification, import/export coordination and logistics solutions." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ASMAN Prime Hub" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: "https://asmanprimehub.com/logo.png" },
      { property: "og:image:width", content: "1024" },
      { property: "og:image:height", content: "1024" },
      { property: "og:image:alt", content: "ASMAN Prime Hub logo" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ASMAN Prime Hub | Global Trade, Sourcing & Export Solutions" },
      { name: "twitter:description", content: "ASMAN Prime Hub helps businesses worldwide with sourcing, procurement, supplier verification, import/export coordination and logistics solutions." },
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
            "ASMAN Prime Hub helps businesses worldwide with sourcing, procurement, supplier verification, import/export coordination and logistics solutions.",
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

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ConsultationModal />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
