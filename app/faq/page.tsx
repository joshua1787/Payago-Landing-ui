"use client"

import Link from "next/link"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { useState } from "react"

const faqs = [
    {
        category: "Getting Started",
        color: "#C9A962",
        questions: [
            {
                q: "What is PayaGo?",
                a: "PayaGo is an AI-powered group travel planning app. You describe your trip in one sentence — destination, group size, budget, vibe — and Gemini AI builds a complete itinerary in 30 seconds: flights, hotel, day-by-day schedule, and activities. Your group then votes, everyone pays their share, and everything books automatically. No spreadsheets, no chasing people for money, no 15 hours of research."
            },
            {
                q: "When does PayaGo launch?",
                a: "PayaGo launches in April 2026 on iOS and Android. Join the waitlist for free early access — you'll be among the first to use it when it goes live."
            },
            {
                q: "Is it really free?",
                a: "Yes — completely free for travellers. PayaGo earns a commission from travel booking partners when you complete a booking. You pay the same prices you'd find booking directly — we never mark up fares or add service fees. The AI planning, group coordination, and payment tools are all included at no cost to you."
            },
            {
                q: "Do I need to download the app to view or vote on a trip?",
                a: "No. When someone shares a trip link via WhatsApp or email, your friends can view the full itinerary and vote (I'm In / Maybe / Can't Make It) directly in their browser — no app download needed. They'll need the app to participate in group payments and access trip documents."
            },
        ]
    },
    {
        category: "AI & Trip Planning",
        color: "#7C5CFF",
        questions: [
            {
                q: "How does the AI build a trip in 30 seconds?",
                a: "When you speak or type your trip description, Gemini AI extracts your intent (destination, budget, group size, preferences) in seconds. Then PayaGo makes parallel API calls to flight, hotel, and activity providers — all simultaneously. Gemini assembles the results into three complete, bookable options (Budget, Balanced, Premium) with full day-by-day schedules. The whole process takes under 30 seconds."
            },
            {
                q: "Can I edit the itinerary the AI creates?",
                a: "Absolutely. Tap any activity to swap it, ask the AI for alternatives in natural language ('swap the museum for something outdoors'), or drag and reorder your schedule. The AI also lets your whole group edit in real-time via WebSocket — any change is visible to everyone instantly."
            },
            {
                q: "How accurate is the AI? Can I trust the prices?",
                a: "Prices come directly from booking partner APIs in real time — they're live prices, not estimates. Flight and hotel availability is checked before the trip options are shown to you. The AI applies quality filters (minimum 4-star hotels, flights without excessive connections, activities rated 4.5+ stars) before presenting options."
            },
            {
                q: "What if I want a destination the AI hasn't suggested?",
                a: "Just say it. The AI takes your exact destination from your spoken or typed request. If you said 'somewhere in Europe' and want to change to Dubrovnik, you can specify it when generating or editing. You can also ask the AI for destination suggestions based on your preferences."
            },
            {
                q: "What is Travel DNA?",
                a: "Travel DNA is PayaGo's personalisation system. After each trip you take and rate, AI learns your preferences — hotel style, flight timing, budget range, activity types, pace of travel. By your third trip, suggestions are 85%+ matched to your tastes. By trip ten, PayaGo can suggest trips you'll love with over 99% confidence. Travel DNA is an Explorer plan feature, coming after launch."
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
                a: "If friends vote 'Maybe' or 'Can't Make It' due to date conflicts, PayaGo automatically detects this and suggests alternative dates that work for everyone. It then regenerates trip options for the new dates and re-invites the group — you don't have to do anything manually."
            },
            {
                q: "What if someone doesn't respond?",
                a: "After 12 hours with no response, PayaGo automatically sends a gentle, personalised reminder to whoever hasn't voted. After 24 hours, you're notified and can choose to proceed with confirmed members, wait longer, or send another nudge. You're never stuck waiting indefinitely."
            },
            {
                q: "Can multiple people edit the itinerary at the same time?",
                a: "Yes. Once a trip is shared, all group members can edit the itinerary simultaneously via real-time WebSocket sync. Every change — a swapped activity, a schedule reorder, a comment — is visible to everyone instantly. Up to 4+ people can edit live at the same time."
            },
        ]
    },
    {
        category: "Booking & Payments",
        color: "#4AD7A2",
        questions: [
            {
                q: "How do payments work?",
                a: "When the group confirms a trip, PayaGo sends a payment request to every member for their exact share of the total (e.g. £390 each, not £2,340 from one person). Each person pays directly via card, Apple Pay, or Google Pay. Once all payments clear, PayaGo simultaneously books the flights, hotel, and activities. Confirmations are sent to everyone's email."
            },
            {
                q: "Is payment secure?",
                a: "Yes. Payments use PCI-DSS Level 1 certified infrastructure (the highest level), 3D Secure authentication, and advanced fraud detection. Your card details are never stored by PayaGo — all payment data is handled by our secure payment processor."
            },
            {
                q: "What payment methods are accepted?",
                a: "Credit and debit cards (Visa, Mastercard, Amex), Apple Pay, and Google Pay. More options may be available depending on your country at launch."
            },
            {
                q: "What happens if someone doesn't pay?",
                a: "PayaGo sends automated payment reminders after 6 hours and again at the 24-hour mark. If someone doesn't pay within 24 hours, their spot may be released and the organiser is notified. You can choose to proceed with the confirmed and paid group, or hold the booking until everyone pays."
            },
            {
                q: "What if I need to cancel?",
                a: "Cancellation policies follow each booking provider's terms. Typically: 100% refund if cancelled more than 14 days before departure, 50% refund for 7–14 days before, non-refundable within 7 days (unless the provider allows more flexibility). PayaGo handles the refund request on your behalf and processes refunds to the original payment method within 5–10 business days."
            },
        ]
    },
    {
        category: "During Your Trip",
        color: "#FF6B6B",
        questions: [
            {
                q: "What happens if my flight is delayed?",
                a: "PayaGo monitors your flight status every 10 minutes. If a delay is detected, it automatically notifies your hotel of the late arrival, informs your group, and adjusts your day-one schedule if needed — removing activities that are now too late. You get a notification with the updated schedule and options."
            },
            {
                q: "What if the weather changes?",
                a: "PayaGo checks weather forecasts hourly against your itinerary. If rain is forecast during an outdoor activity, you're proactively notified with indoor alternatives at a similar price and rating. You can accept the swap or choose your own alternative — with one tap."
            },
            {
                q: "Does PayaGo work offline during the trip?",
                a: "All tickets, hotel confirmations, activity vouchers, and your full day-by-day schedule are saved offline in the app. You can access them without signal. Real-time features (weather alerts, live recommendations, group chat) require an internet connection."
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
        <div className="border-b border-white/5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 text-left group"
            >
                <span className="text-white font-medium pr-8 group-hover:text-white/90 transition-colors">{question}</span>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} style={{ color }} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] pb-6' : 'max-h-0'}`}>
                <p className="text-white/50 leading-relaxed">{answer}</p>
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
        <main className="min-h-screen bg-[#04060A]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <header className="border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl bg-[#04060A]/80">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/payago-logo-transparent-v2.png" alt="PayaGo" className="w-9 h-9 object-contain" />
                        <span className="text-white font-semibold text-lg">PayaGo</span>
                    </Link>
                    <Link href="/" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C9A962]/8 rounded-full blur-[200px]" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        Frequently Asked
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent block">Questions</span>
                    </h1>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto">
                        Everything you need to know about how PayaGo plans, coordinates, and books your group trips.
                    </p>
                </div>
            </section>

            {/* Category nav */}
            <section className="border-b border-white/5 py-4 sticky top-[65px] z-40 backdrop-blur-xl bg-[#04060A]/90">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
                        {faqs.map((cat) => (
                            <a key={cat.category} href={`#${cat.category.toLowerCase().replace(/\s+&?\s*/g, '-')}`} className="flex-shrink-0 px-4 py-1.5 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all text-sm font-medium">
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
                                <h2 className="text-2xl font-bold text-white">{category.category}</h2>
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
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Still have questions?</h2>
                    <p className="text-white/50 mb-8">{"Our team is happy to help — usually within a few hours."}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white px-8 py-4 rounded-xl font-semibold transition-colors">
                            Contact Us
                        </Link>
                        <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                            Get Early Access
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center text-white/20 text-sm">
                    © 2026 PayaGo Ltd. Registered in England & Wales.
                </div>
            </footer>
        </main>
    )
}
