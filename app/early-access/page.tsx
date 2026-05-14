import type { Metadata } from "next"
import { EarlyAccessClient } from "./early-access-client"

export const metadata: Metadata = {
  title: "Golden Passport Club — PayaGo",
  description:
    "Join the PayaGo Golden Passport Club as one of the first 1,000 founding lifetime members worldwide.",
  alternates: {
    canonical: "https://www.payago.in/early-access",
  },
  openGraph: {
    title: "Golden Passport Club — PayaGo",
    description:
      "Join the PayaGo Golden Passport Club as one of the first 1,000 founding lifetime members worldwide.",
    url: "https://www.payago.in/early-access",
    siteName: "PayaGo",
    type: "website",
    images: [
      {
        url: "https://www.payago.in/og/early-access.jpg",
        width: 1200,
        height: 630,
        alt: "PayaGo Golden Passport Club founding membership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Passport Club — PayaGo",
    description:
      "Join the PayaGo Golden Passport Club as one of the first 1,000 founding lifetime members worldwide.",
    images: ["https://www.payago.in/og/early-access.jpg"],
  },
  robots: { index: true, follow: true },
}

export default function EarlyAccessPage() {
  return <EarlyAccessClient />
}
