import type { Metadata } from "next"

import { ContactClient } from "./contact-client"

const title = "Contact PayaGo — Support, Partnerships & Press"
const description =
    "Contact PayaGo for customer support, partnership enquiries, press requests, careers, and questions about AI group travel planning."
const url = "https://www.payago.in/contact"
const image = "https://www.payago.in/og/contact.jpg"

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
                alt: "Contact PayaGo",
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

export default function ContactPage() {
    return <ContactClient />
}
