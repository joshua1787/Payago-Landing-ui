import type { Metadata } from "next"
import { Suspense } from "react"
import { EarlyAccessClient } from "./early-access-client"

export const metadata: Metadata = {
  title: "UK Early Access — PayaGo",
  description:
    "Scan-only early access for PayaGo's UK-first launch wave, with Europe rollout updates and QR campaign tracking.",
  alternates: {
    canonical: "https://www.payago.in/early-access",
  },
  openGraph: {
    title: "UK Early Access — PayaGo",
    description:
      "Scan-only early access for PayaGo's UK-first launch wave, with Europe rollout updates and QR campaign tracking.",
    url: "https://www.payago.in/early-access",
    siteName: "PayaGo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Early Access — PayaGo",
    description:
      "Scan-only early access for PayaGo's UK-first launch wave, with Europe rollout updates and QR campaign tracking.",
  },
  robots: { index: true, follow: true },
}

export default function EarlyAccessPage() {
  return (
    <Suspense fallback={null}>
      <EarlyAccessClient />
    </Suspense>
  )
}
