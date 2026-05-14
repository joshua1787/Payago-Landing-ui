import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { CookieBanner } from "@/components/cookie-banner"
import { PwaInstallBanner } from "@/components/pwa-install-banner"
import { AnalyticsLoader } from "@/components/analytics-loader"

const siteUrl = "https://www.payago.in"
const siteName = "PayaGo"
const defaultTitle = "PayaGo — Speak the trip. We'll do the rest."
const defaultDescription =
  "PayaGo's AI drafts group trip options quickly, then helps friends review itineraries, vote, compare costs, and move into provider-led booking handoff when ready."
const defaultOgImage = "/og/home.jpg"
const ogImage = `${siteUrl}${defaultOgImage}`
const appIcon = "/icon.svg"
const logoImage = `${siteUrl}${appIcon}`
const gaMeasurementId = "G-89EG0EBHV0"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: defaultTitle,
    template: "%s | PayaGo",
  },
  description: defaultDescription,
  keywords: [
    "AI travel planning",
    "group trip planner",
    "travel itinerary generator",
    "group travel coordination",
    "AI itinerary",
    "split-cost coordination",
    "early access travel app",
    "PayaGo",
  ],
  authors: [{ name: "PayaGo Ltd", url: siteUrl }],
  creator: "PayaGo Ltd",
  publisher: "PayaGo Ltd",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "PayaGo — AI Group Travel Planning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: appIcon, sizes: "any", type: "image/svg+xml" },
    ],
    shortcut: appIcon,
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    title: siteName,
    capable: true,
    statusBarStyle: "black-translucent",
  },
}

export const viewport: Viewport = {
  themeColor: "#0d1220",
  width: "device-width",
  initialScale: 1,
}

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  description: defaultDescription,
  inLanguage: "en-GB",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
}

const organizationSchema = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: logoImage,
  },
  description: defaultDescription,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${siteUrl}/contact`,
  },
}

const softwareApplicationSchema = {
  "@type": "SoftwareApplication",
  "@id": `${siteUrl}/#software`,
  name: siteName,
  url: siteUrl,
  description: defaultDescription,
  applicationCategory: "TravelApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
    availability: "https://schema.org/PreOrder",
    description:
      "Free early-access waitlist; final partner pricing and booking terms are reviewed before any provider-led booking.",
  },
  image: ogImage,
  inLanguage: "en-GB",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, websiteSchema, softwareApplicationSchema],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#FAFAF8] text-slate-900">
        <AnalyticsLoader measurementId={gaMeasurementId} />
        {children}
        <PwaInstallBanner />
        <CookieBanner />
      </body>
    </html>
  )
}
