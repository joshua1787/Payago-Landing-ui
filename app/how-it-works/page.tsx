import type { Metadata } from "next"
import Link from "next/link"
import { PayagoWordmark } from "@/components/payago-wordmark"
import { ArrowLeft, ArrowRight, Mic, Sparkles, Users, CreditCard, MapPin, Plane, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
    title: "How PayaGo Works — Voice to Coordinated Group Trip Plan",
    description: "From one sentence to a coordinated group trip plan. Voice input → AI builds itinerary options → group review → cost coordination → provider-led booking handoff where available.",
    openGraph: {
        title: "How PayaGo Works — Voice to Coordinated Group Trip Plan",
        description: "From one sentence to a coordinated group trip plan. Voice input, AI itinerary options, group review, and cost coordination.",
        url: "https://www.payago.in/how-it-works",
        type: "website",
        images: [
            {
                url: "https://www.payago.in/og/how-it-works.jpg",
                width: 1200,
                height: 630,
                alt: "PayaGo AI Group Travel Planning",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "How PayaGo works",
        description: "From one sentence to a structured plan your group can review.",
        images: ["https://www.payago.in/og/how-it-works.jpg"],
    },
    alternates: {
        canonical: "https://www.payago.in/how-it-works",
    },
}

const phases = [
    {
        number: "01",
        icon: Mic,
        title: "You Talk. AI Listens.",
        subtitle: "just minutes",
        color: "#C9A962",
        description: "Tap the microphone and describe your trip in plain English. No forms, no filters, no dropdowns — just talk like you're texting a friend.",
        examples: [
            "\"Weekend in Barcelona for 6 friends, around £400 each, beach and nightlife\"",
            "\"Paris anniversary trip for 2, romantic restaurants, premium hotels, 3 nights\"",
            "\"Cheap party weekend for 8 people, somewhere in Europe, under £200 each\"",
        ],
        visual: {
            type: "voice",
            items: [
                { label: "Destination", value: "Barcelona, Spain", icon: "📍" },
                { label: "Group size", value: "6 people", icon: "👥" },
                { label: "Budget", value: "~£400/person", icon: "💰" },
                { label: "Vibe", value: "Beach + Nightlife", icon: "🎉" },
            ],
            footer: "Prompt parsed by PayaGo AI"
        },
        features: ["Voice or text input", "No forms required", "Infers context from your prompt", "Confirms before searching"],
    },
    {
        number: "02",
        icon: Sparkles,
        title: "3 Complete Trip Options. Fast.",
        subtitle: "just minutes",
        color: "#00D4FF",
        description: "AI compares flights, stays, and activities from supported sources and drafts three complete trip options — Budget, Balanced, and Premium.",
        examples: [],
        visual: {
            type: "options",
            options: [
                { label: "Budget", price: "£340/person", badge: "", color: "#4AD7A2" },
                { label: "Balanced", price: "£390/person", badge: "Recommended", color: "#C9A962" },
                { label: "Premium", price: "£450/person", badge: "", color: "#7C5CFF" },
            ],
            footer: "Each option includes flights + hotel + full itinerary"
        },
        features: ["Day-by-day schedule included", "AI explains why each option works", "Swipe between options like Tinder", "Final prices reviewed before booking"],
    },
    {
        number: "03",
        icon: Users,
        title: "Group Votes. No Chasing.",
        subtitle: "minutes",
        color: "#7C5CFF",
        description: "Share a link via WhatsApp or email. Friends can review the full trip and respond where enabled — no app download needed to view. You can see responses in one place as the group reviews the plan.",
        examples: [],
        visual: {
            type: "voting",
            votes: [
                { name: "Sarah (you)", status: "confirmed", time: "Organiser" },
                { name: "Tom", status: "confirmed", time: "2m ago" },
                { name: "Emma", status: "confirmed", time: "5m ago" },
                { name: "Jake", status: "maybe", time: "Checking calendar" },
                { name: "Lisa", status: "confirmed", time: "12m ago" },
                { name: "Mark", status: "confirmed", time: "18m ago" },
            ],
            footer: "5 confirmed · 1 maybe · AI can suggest reminder nudges"
        },
        features: ["Shared review link for friends", "Suggested reminder nudges", "Flags date conflicts", "Suggests alternatives if needed"],
    },
    {
        number: "04",
        icon: CreditCard,
        title: "Everyone Sees Their Share.",
        subtitle: "A few steps",
        color: "#4AD7A2",
        description: "No one person has to coordinate the trip from a spreadsheet. Each friend can review their estimated share and any provider-led handoff before the group commits.",
        examples: [],
        visual: {
            type: "payments",
            total: "£2,340",
            perPerson: "£390",
            reviewed: [
                { name: "Sarah", reviewed: true },
                { name: "Tom", reviewed: true },
                { name: "Emma", reviewed: true },
                { name: "Jake", reviewed: true },
                { name: "Lisa", reviewed: true },
                { name: "Mark", reviewed: true },
            ],
            footer: "Provider-led options reviewed before commitment"
        },
        features: ["Everyone sees own estimated share", "Provider-led handoff where available", "Reminder nudges if someone has not reviewed", "Booking handoff once the group is ready"],
    },
    {
        number: "05",
        icon: MapPin,
        title: "We've Got You Before You Fly.",
        subtitle: "Pre-trip",
        color: "#FF6B6B",
        description: "As your trip approaches, PayaGo helps you stay organised — from passport reminders to packing lists to check-in prompts.",
        examples: [],
        visual: {
            type: "prettrip",
            reminders: [
                { icon: "📅", text: "2 weeks to go — passport and insurance check", time: "2 weeks before" },
                { icon: "☀️", text: "Weather looks great! 28°C, sunny. Pack sunscreen.", time: "1 week before" },
                { icon: "✈️", text: "Check your airline check-in window and travel documents", time: "Before departure" },
                { icon: "🎒", text: "Your personalised packing list is ready", time: "Day before" },
            ],
            footer: "Proactive, not reactive"
        },
        features: ["Passport expiry check", "AI packing list by destination", "Weather-aware suggestions", "Flight check-in reminders"],
    },
    {
        number: "06",
        icon: Plane,
        title: "Real Help When You're There.",
        subtitle: "During trip",
        color: "#E5C77D",
        description: "PayaGo helps your group react to changes. Flight delayed? Keep everyone informed. Weather changed? Review indoor alternatives. Something closed? Pick another nearby option.",
        examples: [],
        visual: {
            type: "tripAssist",
            alerts: [
                { icon: "⚠️", text: "Your flight is delayed 2h — group update ready to send", color: "#FF6B6B" },
                { icon: "🌧️", text: "Rain forecast at 2pm — indoor alternatives ready to review", color: "#00D4FF" },
                { icon: "💬", text: "Jake: Found a great bar near the hotel [Map pin]", color: "#7C5CFF" },
                { icon: "🍕", text: "You're near La Boqueria — save a nearby food stop for the group to review", color: "#4AD7A2" },
            ],
            footer: "Weather context · group updates · local alternatives"
        },
        features: ["Flight delay alerts", "Weather-based adaptation", "Built-in group chat", "Local suggestions to review"],
    },
]

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-white">
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
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#C9A962]/8 rounded-full" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#00D4FF]/8 rounded-full" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-8">
                        <span className="text-sm font-medium text-slate-500">Six phases · One seamless journey</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                        From one sentence
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent block">to shared plan</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        {"The old way takes hours of research and group chat chasing. PayaGo helps compress that into one coordinated flow."}
                    </p>

                    {/* Speed comparison */}
                    <div className="mt-12 inline-flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#FF6B6B]">Hours</div>
                            <div className="text-slate-400 text-sm mt-1">Manual planning</div>
                        </div>
                        <div className="text-slate-400 text-2xl">→</div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#4AD7A2]">Minutes</div>
                            <div className="text-slate-400 text-sm mt-1">With PayaGo</div>
                        </div>
                        <div className="text-center pl-4 border-l border-slate-100">
                            <div className="text-3xl font-bold text-[#C9A962]">One flow</div>
                            <div className="text-slate-400 text-sm mt-1">Less chaos</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Phases */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="space-y-32">
                        {phases.map((phase, index) => {
                            const Icon = phase.icon
                            const isEven = index % 2 === 0

                            return (
                                <div key={phase.number} className={`grid lg:grid-cols-2 gap-16 items-center ${isEven ? '' : 'lg:[&>*:first-child]:order-2'}`}>
                                    {/* Content */}
                                    <div>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-xl font-bold" style={{ background: `linear-gradient(135deg, ${phase.color}20, ${phase.color}05)`, color: phase.color, border: `1px solid ${phase.color}30` }}>
                                                {phase.number}
                                            </div>
                                            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                            <span className="text-sm font-medium px-3 py-1 rounded-full border" style={{ color: phase.color, borderColor: `${phase.color}30`, background: `${phase.color}10` }}>
                                                {phase.subtitle}
                                            </span>
                                        </div>

                                        <h2 className="text-4xl font-bold text-slate-900 mb-4">{phase.title}</h2>
                                        <p className="text-slate-600 text-lg leading-relaxed mb-8">{phase.description}</p>

                                        {phase.examples.length > 0 && (
                                            <div className="space-y-3 mb-8">
                                                {phase.examples.map((ex, i) => (
                                                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-sm italic leading-snug">{ex}</div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {phase.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: phase.color }} />
                                                    <span className="text-slate-600 text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Visual */}
                                    <div className="relative p-8 rounded-3xl border border-slate-100 overflow-hidden" style={{ background: `linear-gradient(135deg, ${phase.color}08, transparent)` }}>
                                        <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full" style={{ background: `${phase.color}15` }} />
                                        <div className="relative z-10">
                                            {/* Voice visual */}
                                            {phase.visual.type === "voice" && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${phase.color}20` }}>
                                                            <Icon className="w-5 h-5" style={{ color: phase.color }} />
                                                        </div>
                                                        <div className="text-slate-500 text-sm">AI understood…</div>
                                                    </div>
                                                    {phase.visual.items?.map((item, i) => (
                                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-lg">{item.icon}</span>
                                                                <span className="text-slate-500 text-sm">{item.label}</span>
                                                            </div>
                                                            <span className="text-slate-900 font-medium text-sm">{item.value}</span>
                                                        </div>
                                                    ))}
                                                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                                                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: phase.color }} />
                                                        <span className="text-sm" style={{ color: phase.color }}>{phase.visual.footer}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Options visual */}
                                            {phase.visual.type === "options" && (
                                                <div className="space-y-4">
                                                    {phase.visual.options?.map((opt, i) => (
                                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl border" style={{ borderColor: `${opt.color}30`, background: `${opt.color}08` }}>
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${opt.color}20` }}>
                                                                    <Sparkles className="w-4 h-4" style={{ color: opt.color }} />
                                                                </div>
                                                                <span className="text-slate-900 font-medium">{opt.label}</span>
                                                                {opt.badge && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${opt.color}20`, color: opt.color }}>{opt.badge}</span>}
                                                            </div>
                                                            <span className="font-bold" style={{ color: opt.color }}>{opt.price}</span>
                                                        </div>
                                                    ))}
                                                    <div className="text-slate-400 text-xs text-center pt-2">{phase.visual.footer}</div>
                                                </div>
                                            )}

                                            {/* Voting visual */}
                                            {phase.visual.type === "voting" && (
                                                <div className="space-y-3">
                                                    {phase.visual.votes?.map((vote, i) => (
                                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${vote.status === 'confirmed' ? 'bg-[#4AD7A2]/20 text-[#4AD7A2]' : 'bg-[#C9A962]/20 text-[#C9A962]'}`}>
                                                                    {vote.name[0]}
                                                                </div>
                                                                <span className="text-slate-600 text-sm">{vote.name}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-slate-400 text-xs">{vote.time}</span>
                                                                <span className={`text-xs px-2 py-0.5 rounded-full ${vote.status === 'confirmed' ? 'bg-[#4AD7A2]/15 text-[#4AD7A2]' : 'bg-[#C9A962]/15 text-[#C9A962]'}`}>
                                                                    {vote.status === 'confirmed' ? "✓ In" : "? Maybe"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="text-slate-400 text-xs text-center pt-2">{phase.visual.footer}</div>
                                                </div>
                                            )}

                                            {/* Payments visual */}
                                            {phase.visual.type === "payments" && (
                                                <div>
                                                    <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                                        <div>
                                                            <div className="text-slate-500 text-xs mb-1">Total trip cost</div>
                                                            <div className="text-3xl font-bold text-slate-900">{phase.visual.total}</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-slate-500 text-xs mb-1">Per person</div>
                                                            <div className="text-2xl font-bold" style={{ color: phase.color }}>{phase.visual.perPerson}</div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {phase.visual.reviewed?.map((p, i) => (
                                                            <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-50">
                                                                <span className="text-slate-600 text-sm">{p.name}</span>
                                                                <span className="text-[#4AD7A2] text-sm font-medium">✓ Share reviewed</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-4 text-center text-slate-400 text-xs">{phase.visual.footer}</div>
                                                </div>
                                            )}

                                            {/* Pre-trip visual */}
                                            {phase.visual.type === "prettrip" && (
                                                <div className="space-y-3">
                                                    {phase.visual.reminders?.map((r, i) => (
                                                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                                            <span className="text-2xl">{r.icon}</span>
                                                            <div>
                                                                <div className="text-slate-400 text-xs mb-1">{r.time}</div>
                                                                <div className="text-slate-600 text-sm">{r.text}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="text-slate-400 text-xs text-center pt-2">{phase.visual.footer}</div>
                                                </div>
                                            )}

                                            {/* Trip assist visual */}
                                            {phase.visual.type === "tripAssist" && (
                                                <div className="space-y-3">
                                                    {phase.visual.alerts?.map((a, i) => (
                                                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl border" style={{ borderColor: `${a.color}20`, background: `${a.color}05` }}>
                                                            <span className="text-xl">{a.icon}</span>
                                                            <span className="text-slate-600 text-sm leading-snug">{a.text}</span>
                                                        </div>
                                                    ))}
                                                    <div className="flex items-center gap-2 pt-2">
                                                        <span className="w-2 h-2 rounded-full bg-[#4AD7A2] animate-pulse" />
                                                        <span className="text-slate-400 text-xs">{phase.visual.footer}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                        Ready to plan your
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent"> next group trip?</span>
                    </h2>
                    <p className="text-slate-500 text-lg mb-10">Join the early-access waitlist. PayaGo is opening in limited planning waves.</p>
                    <Link href="/#early-access" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                        Get Early Access
                        <ArrowRight className="w-4 h-4" />
                    </Link>
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
