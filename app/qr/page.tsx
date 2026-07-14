import type { Metadata } from "next"
import { QrRedirectClient } from "./qr-redirect-client"

export const metadata: Metadata = {
  title: "Golden Passport QR — PayaGo",
  description: "One universal PayaGo QR that opens the Golden Passport Club founding-member page.",
  alternates: {
    canonical: "https://payago.in/qr",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Golden Passport QR — PayaGo",
    description: "Scan one universal QR to open the PayaGo Golden Passport Club founding-member page.",
    url: "https://payago.in/qr",
    siteName: "PayaGo",
    type: "website",
    images: [
      {
        url: "https://payago.in/og/early-access.jpg",
        width: 1200,
        height: 630,
        alt: "PayaGo Golden Passport Club QR landing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Passport QR — PayaGo",
    description: "Scan one universal QR to open the PayaGo Golden Passport Club founding-member page.",
    images: ["https://payago.in/og/early-access.jpg"],
  },
}

export default function QrPage() {
  return <QrRedirectClient />
}
