import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
    title: "FAQ — AI Travel Planning, Group Trips & Payments",
    description: "Everything you need to know about PayaGo: how AI generates itineraries quickly, how group voting works, how payments are split, and what happens during your trip.",
    openGraph: {
        title: "PayaGo FAQ — AI Travel Planning, Group Trips & Payments",
        description: "Everything you need to know about PayaGo: how AI generates itineraries quickly, how group voting works, and how payments are split.",
        url: "https://payago.in/faq",
        type: "website",
        images: [
            {
                url: "https://payago.in/og/faq.jpg",
                width: 1200,
                height: 630,
                alt: "PayaGo AI Group Travel Planning",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "PayaGo FAQ",
        description: "Answers for AI planning, group coordination, early access, and provider-led next steps.",
        images: ["https://payago.in/og/faq.jpg"],
    },
    alternates: {
        canonical: "https://payago.in/faq",
    },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
