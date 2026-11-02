import type { Metadata } from "next"
import "@fontsource-variable/sora"
import "@fontsource-variable/hanken-grotesk"

import { HomePage } from "@/components/home/home-page"

const title = "PayaGo: from daily bills to dream trips"
const description =
  "Split with your people and see where your own money goes. Type an expense like a message, and PayaGo does the sums. Cards and whole trips are coming next."

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
