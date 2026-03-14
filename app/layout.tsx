import type React from "react"
import type { Metadata } from "next"
import { Inter, Outfit, Michroma } from "next/font/google"
import "./globals.css"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CookieBanner } from "@/components/cookie-banner"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })
const michroma = Michroma({ weight: "400", subsets: ["latin"], variable: "--font-michroma" })

const siteUrl = "https://www.payago.in"
const siteName = "PayaGo"
const defaultTitle = "PayaGo — AI Group Travel Planning. One Sentence to a Fully Booked Trip."
const defaultDescription =
  "PayaGo's AI builds a complete group trip itinerary in 30 seconds — flights, hotels, activities. Your group votes, everyone pays their share, and it books automatically. Free for travellers."
const ogImage = `${siteUrl}/luxury-travel-destination-aerial-view-of-tropical-.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | PayaGo",
  },
  description: defaultDescription,
  keywords: [
    "AI travel planning",
    "group travel app",
    "travel itinerary generator",
    "group trip planner",
    "AI itinerary",
    "book hotels flights activities",
    "group vacation planner",
    "travel booking app",
    "split travel costs",
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
    site: "@payago_app",
    creator: "@payago_app",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/payago-logo.jpg", sizes: "32x32", type: "image/jpeg" },
    ],
    apple: "/payago-logo.jpg",
    shortcut: "/payago-logo.jpg",
  },
}

export const viewport = {
  themeColor: "#04060A",
  width: "device-width",
  initialScale: 1,
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: defaultDescription,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/payago-logo-transparent-v2.png`,
  description: defaultDescription,
  foundingDate: "2025",
  areaServed: "Worldwide",
  serviceType: "AI-Powered Group Travel Planning",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${siteUrl}/contact`,
  },
  sameAs: [
    "https://twitter.com/payago_app",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 — replace G-89EG0EBHV0 with your real Measurement ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-89EG0EBHV0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-89EG0EBHV0');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <SmoothScroll />
        {/* Film grain overlay */}
        <div className="film-grain" aria-hidden="true" />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
