"use client"

import Link from "next/link"
import { PayagoWordmark } from "@/components/payago-wordmark"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { useState } from "react"

const faqs = [
    {
        category: "Getting Started",
        color: "#C9A962",
        questions: [
            {
                q: "What is PayaGo?",
                a: "PayaGo is an AI-powered group travel planning app. You describe your trip in one sentence — destination, group size, budget, vibe — and PayaGo AI builds ready-to-review trip options: flights, hotel ideas, day-by-day schedule, and activities. Your group can review options, coordinate estimated costs, and continue through provider-led booking handoff where available. No spreadsheets, no scattered links, no endless group-chat planning."
            },
            {
                q: "When does PayaGo launch?",
                a: "PayaGo is opening early-access planning waves on web, with mobile experiences planned. Join the waitlist for early access — you'll be among the first to hear when access expands."
            },
            {
                q: "Is it really free?",
                a: "PayaGo is free to join during early access. PayaGo may earn a commission from supported travel providers when you continue through an eligible provider-led flow. Final prices, provider terms, and any applicable fees should be reviewed before you commit."
            },
            {
                q: "Do I need to download the app to view or vote on a trip?",
                a: "No. When someone shares a trip link via WhatsApp or email, friends can review the trip in their browser and respond where enabled — no app download needed for the landing preview. Payment collection is not handled in the landing preview."
            },
        ]
    },
    {
        category: "AI & Trip Planning",
        color: "#7C5CFF",
        questions: [
            {
                q: "How does the AI build a trip quickly?",
                a: "When you speak or type your trip description, PayaGo AI extracts your intent: destination, budget, group size, dates, and preferences. It then uses available travel context and provider information where supported to assemble three ready-to-review options: Budget, Balanced, and Premium, with day-by-day schedules your group can compare."
            },
            {
                q: "Can I edit the itinerary the AI creates?",
                a: "Absolutely. Tap any activity to swap it, ask the AI for alternatives in natural language ('swap the museum for something outdoors'), or reorder your schedule. Shared trip links help the group review updates, vote, and comment in one place."
            },
            {
                q: "How accurate is the AI? Can I trust the prices?",
                a: "PayaGo uses current partner and provider information where available, but travel prices and availability can change before booking. Final prices, provider terms, and availability are reviewed in the booking flow before anyone commits."
            },
            {
                q: "What if I want a destination the AI hasn't suggested?",
                a: "Just say it. The AI takes your exact destination from your spoken or typed request. If you said 'somewhere in Europe' and want to change to Dubrovnik, you can specify it when generating or editing. You can also ask the AI for destination suggestions based on your preferences."
            },
            {
                q: "What is Travel DNA?",
                a: "Travel DNA is PayaGo's planned personalisation system. As you rate trips and choices, it can learn patterns like hotel style, flight timing, budget range, activity types, and travel pace. Travel DNA is planned for the Explorer experience after launch."
            },
        ]
    },
    {
        category: "Group Features",
        color: "#00D4FF",
        questions: [
            {
                q: "How do I invite friends to vote on a trip?",
                a: "After reviewing your AI-generated trip options, tap 'Share with Friends'. You can send a link directly via WhatsApp, email, or text message — or copy the link manually. Friends receive a message with a summary of the trip and a link to view the full itinerary and cast their vote."
            },
            {
                q: "What if some friends can't make the dates?",
                a: "If friends vote 'Maybe' or 'Can't Make It' due to date conflicts, PayaGo helps the organiser compare responses and explore alternative dates. The group can then regenerate or adjust trip options around the dates that work best."
            },
            {
                q: "What if someone doesn't respond?",
                a: "PayaGo helps organisers see who has responded and send friendly reminders from the shared trip flow. You can choose to proceed with confirmed members, wait longer, or adjust the plan."
            },
            {
                q: "Can multiple people edit the itinerary at the same time?",
                a: "Yes. Once a trip is shared, group members can review the itinerary, respond, comment, and suggest changes from the shared trip view where enabled. The goal is to keep decisions visible instead of buried in chat threads."
            },
        ]
    },
    {
        category: "Booking & Payments",
        color: "#4AD7A2",
        questions: [
            {
                q: "How do payments work?",
                a: "When the group confirms a trip, PayaGo helps coordinate each member's estimated share so one person does not have to manage everything in a spreadsheet. Booking and payment details, where available, are completed through provider-led flows with final totals shown by the provider before anyone commits."
            },
            {
                q: "Is payment secure?",
                a: "Where checkout is available, payment details are handled by the relevant provider or partner flow. PayaGo can surface the checkout path, provider terms, and confirmation context for review before the group commits."
            },
            {
                q: "What payment methods are accepted?",
                a: "Available payment methods depend on the provider, partner, and country. Any options are shown by the provider during checkout before payment."
            },
            {
                q: "What happens if someone doesn't pay?",
                a: "PayaGo helps the organiser track review status and send reminders where supported. If someone is not ready, the organiser can adjust the group, wait, or choose a different provider-led path depending on availability."
            },
            {
                q: "What if I need to cancel?",
                a: "Cancellation and refund rules follow each booking provider's terms. PayaGo helps surface those terms before booking and can guide you to the right provider support path if plans change."
            },
        ]
    },
    {
        category: "During Your Trip",
        color: "#FF6B6B",
        questions: [
            {
                q: "What happens if my flight is delayed?",
                a: "Where travel data is available, PayaGo can help surface flight updates and suggest schedule adjustments for your group to review. It is designed to keep everyone aligned when travel plans change."
            },
            {
                q: "What if the weather changes?",
                a: "PayaGo can use weather context to suggest indoor alternatives or schedule changes for outdoor plans. Your group stays in control of whether to accept a change."
            },
            {
                q: "Does PayaGo work offline during the trip?",
                a: "PayaGo is designed to keep your itinerary and key trip details easy to access in the app. Connected features such as updates, recommendations, and group chat require an internet connection."
            },
            {
                q: "Can I share my location with my group during the trip?",
                a: "Location sharing is optional. You can enable it for the duration of the trip so your group can see each other on a map, or keep it off completely. This setting is per-trip and can be changed any time."
            },
        ]
    },
]

function FAQItem({ question, answer, color }: { question: string; answer: string; color: string }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border-b border-slate-100">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 text-left group"
            >
                <span className="text-slate-900 font-medium pr-8 group-hover:text-slate-700 transition-colors">{question}</span>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-300 ${isOpen ? 'rotate-180' : ''}`} style={{ color }} />
            </button>
            <div className={`overflow-hidden transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-300 ${isOpen ? 'max-h-[500px] pb-6' : 'max-h-0'}`}>
                <p className="text-slate-500 leading-relaxed">{answer}</p>
            </div>
        </div>
    )
}

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((section) =>
        section.questions.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
            },
        }))
    ),
}

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <header className="border-b border-slate-100 sticky top-0 z-50 bg-white/95">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <PayagoWordmark />
                        
                    </Link>
                    <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C9A962]/8 rounded-full" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                        Frequently Asked
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent block">Questions</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Everything you need to know about how PayaGo plans, coordinates, and books your group trips.
                    </p>
                </div>
            </section>

            {/* Category nav */}
            <section className="border-b border-slate-100 py-4 sticky top-[65px] z-40 bg-white/95">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
                        {faqs.map((cat) => (
                            <a key={cat.category} href={`#${cat.category.toLowerCase().replace(/\s+&?\s*/g, '-')}`} className="flex-shrink-0 px-4 py-1.5 rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-200 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] text-sm font-medium">
                                {cat.category}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Categories */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-6">
                    {faqs.map((category, catIndex) => (
                        <div key={catIndex} id={category.category.toLowerCase().replace(/\s+&?\s*/g, '-')} className="mb-20 scroll-mt-32">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-2 h-6 rounded-full" style={{ background: category.color }} />
                                <h2 className="text-2xl font-bold text-slate-900">{category.category}</h2>
                            </div>
                            <div>
                                {category.questions.map((faq, index) => (
                                    <FAQItem key={index} question={faq.q} answer={faq.a} color={category.color} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-24 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Still have questions?</h2>
                    <p className="text-slate-500 mb-8">{"Our team is happy to help — usually within a few hours."}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-semibold transition-colors">
                            Contact Us
                        </Link>
                        <Link href="/#early-access" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                            Get Early Access
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="py-8 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
                    © 2026 PayaGo Ltd. Registered in England & Wales.
                </div>
            </footer>
        </main>
    )
}
