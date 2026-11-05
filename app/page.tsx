import type { Metadata } from "next"

import { HomePage } from "@/components/home/home-page"

const title = "PayaGo: plan every trip, split every bill"
const description =
  "End-to-end AI trips are coming to PayaGo: plan it, book flights and hotels, and split it with the group. Splitting bills and tracking your own money work today."

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
