import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartSyncInitializer } from "@/components/CartSyncInitializer";
import { RevisionsSystem } from "@/components/RevisionsSystem";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Inre & Yttre Skönhet - Holistisk Wellness, Meditation & Ayurveda",
  description: "Upptäck holistisk skönhet genom inre wellness och yttre vård. Meditation, yoga, tai chi och ayurvediska produkter för optimal hälsa och naturlig skönhet. Svensk kvalitet med naturliga ingredienser.",
  keywords: "inre skönhet, yttre skönhet, meditation, yoga, tai chi, ayurveda, holistisk wellness, anti-aging, naturlig hälsa, andningstekniker, ayurvediska örter, skönhet inifrån",
  openGraph: {
    title: "Inre & Yttre Skönhet - Din väg till holistisk wellness",
    description: "Meditation, yoga, tai chi och ayurvediska produkter för skönhet inifrån och ut. Komplett guide för holistisk hälsa och naturlig anti-aging.",
    type: "website",
    locale: "sv_SE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Inre & Yttre Skönhet",
    "url": "https://inre-och-yttre-skonhet.vercel.app/",
    "logo": "/images/logo.png"
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Inre & Yttre Skönhet",
    "url": "https://inre-och-yttre-skonhet.vercel.app/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://inre-och-yttre-skonhet.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="sv">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
      </head>
      <body className="min-h-screen bg-white font-sans">
        <AuthProvider>
          <LanguageProvider>
            <RevisionsSystem 
              showDashboard={true}
              showMiniStatus={true}
              autoInitialize={true}
              enableProtection={true}
            >
              <CartSyncInitializer />
              <Layout>{children}</Layout>
            </RevisionsSystem>
          </LanguageProvider>
        </AuthProvider>
        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={4000}
        />
      </body>
    </html>
  );
}
