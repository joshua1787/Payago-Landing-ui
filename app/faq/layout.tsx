import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
    title: "FAQ — AI Travel Planning, Group Trips & Payments",
    description: "Everything you need to know about PayaGo: how AI generates itineraries in 30 seconds, how group voting works, how payments are split, and what happens during your trip.",
    openGraph: {
        title: "PayaGo FAQ — AI Travel Planning, Group Trips & Payments",
        description: "Everything you need to know about PayaGo: how AI generates itineraries in 30 seconds, how group voting works, and how payments are split.",
        url: "https://www.payago.in/faq",
        type: "website",
    },
    alternates: {
        canonical: "https://www.payago.in/faq",
    },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
