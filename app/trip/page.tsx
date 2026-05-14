import type { Metadata } from "next"

import { ItineraryBoard } from "@/components/itinerary-board"
import { Navbar } from "@/components/navbar"

const title = "Trip Demo — PayaGo AI Group Travel Planner"
const description =
    "Explore a sample PayaGo trip board with AI itinerary planning, group coordination, activities, and shared travel details in one place."
const url = "https://www.payago.in/trip"
const image = "https://www.payago.in/og/trip.jpg"

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: url,
    },
    openGraph: {
        title,
        description,
        url,
        type: "website",
        images: [
            {
                url: image,
                width: 1200,
                height: 630,
                alt: "PayaGo trip planning demo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
    },
}

export default function TripPage() {
    return (
        <>
            <Navbar />
            <ItineraryBoard />
        </>
    )
}
