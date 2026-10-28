import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { ADSENSE_CLIENT, NOINDEX, siteConfig } from "@/lib/config";
import { DEFAULT_SHARE_IMAGES } from "@/lib/metadata";
import "./globals.css";

const barlow = Barlow({ variable: "--font-barlow", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
/* Titres : seule la graisse 800 sert (.font-display, maillots), une seule police de titre à charger. */
const barlowCondensed = Barlow_Condensed({ variable: "--font-barlow-condensed", subsets: ["latin"], weight: ["800"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: DEFAULT_SHARE_IMAGES,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  // Version provisoire (GitHub Pages) : rien d'indexé ; sinon, grande image autorisée dans Google Discover et les résultats.
  robots: NOINDEX ? { index: false, follow: false } : { "max-image-preview": "large" },
  // Validation du site dans AdSense.
  ...(ADSENSE_CLIENT && { other: { "google-adsense-account": ADSENSE_CLIENT } }),
};

export const viewport: Viewport = {
  themeColor: "#0f1113",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${barlow.variable} ${barlowCondensed.variable} antialiased`} suppressHydrationWarning>
      {ADSENSE_CLIENT && (
        <head>
          {/* Code AdSense : charge les annonces et le bandeau de consentement de Google (réglé dans AdSense). */}
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        </head>
      )}
      <body className="flex min-h-dvh flex-col">
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:rounded focus:bg-gold focus:p-2 focus:text-night">
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
