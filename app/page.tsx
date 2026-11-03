import type { Metadata } from "next"

import { HomePage } from "@/components/home/home-page"

const title = "PayaGo: split every bill, plan every trip"
const description =
  "Split bills in a group chat and track your own money today. Shared cards and end-to-end AI trips are coming next."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://payago.in",
  },
  openGraph: {
    title,
    description,
    url: "https://payago.in",
    siteName: "PayaGo",
    type: "website",
    images: [
      {
        url: "https://payago.in/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "PayaGo: a gold coin with rings of money in orbit around it",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://payago.in/og/home.jpg"],
  },
}

export default function Home() {
  return <HomePage />
}
