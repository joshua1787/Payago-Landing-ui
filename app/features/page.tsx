import type { Metadata } from "next"
import Link from "next/link"
import { PayagoWordmark } from "@/components/payago-wordmark"
import { ArrowLeft, ArrowRight, Mic, Sparkles, Users, CreditCard, Brain, MapPin, CloudRain, ThumbsUp, Route, ShoppingBag, PiggyBank, Clock, Zap, Shield } from "lucide-react"

export const metadata: Metadata = {
    title: "PayaGo Features — AI Itinerary, Group Voting, Cost Coordination & More",
    description: "Every feature in PayaGo: voice AI trip creation, itinerary options, group review, cost coordination, planned Travel DNA personalisation, and trip assistance.",
    openGraph: {
        title: "PayaGo Features — AI Itinerary, Group Voting, Cost Coordination",
        description: "Voice AI trip creation, itinerary options, group review, cost coordination, and trip assistance.",
        url: "https://payago.in/features",
        type: "website",
        images: [
            {
                url: "https://payago.in/og/features.jpg",
                width: 1200,
                height: 630,
                alt: "PayaGo AI Group Travel Planning",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Features built for group travel",
        description: "Voice AI trip creation, shared review, voting, cost visibility, and supported handoff.",
        images: ["https://payago.in/og/features.jpg"],
    },
    alternates: {
        canonical: "https://payago.in/features",
    },
}

const categories = [
    {
        id: "ai-creation",
        badge: "Core Feature",
        badgeColor: "#C9A962",
        title: "AI Trip Creation",
        subtitle: "One sentence in. Trip options out.",
        description: "The heart of PayaGo. Speak naturally, and PayaGo AI builds ready-to-review trip options in minutes using supported travel data and provider information where available.",
        color: "#C9A962",
        features: [
            {
                icon: Mic,
                title: "Voice-First Input",
                description: "Talk like you're texting a friend. No forms, no dropdowns, no decision fatigue. The AI extracts destination, dates, budget, group size, and vibe from a single natural sentence.",
                color: "#C9A962",
                stat: "Natural",
                statLabel: "no long forms required",
            },
            {
                icon: Sparkles,
                title: "3 Complete Options",
                description: "You get Budget, Balanced, and Premium options — each with flight ideas, hotel options, and a day-by-day schedule. AI explains why each one could work for your group.",
                color: "#E5C77D",
                stat: "3",
                statLabel: "trip options to compare",
            },
            {
                icon: Clock,
                title: "Fast Itinerary Drafts",
                description: "PayaGo AI assembles supported flight, hotel, and activity information into day-by-day plans with timing, budget, and local context for your group to review.",
                color: "#FF9F43",
                stat: "Minutes",
                statLabel: "from idea to draft plan",
            },
            {
                icon: Brain,
                title: "Intelligent Filtering",
                description: "AI uses quality signals to reduce poor-fit options — awkward flights, weak hotel matches, and low-quality activities — before presenting a shortlist.",
                color: "#C9A962",
                stat: "Curated",
                statLabel: "shortlist for the group",
            },
        ],
    },
    {
        id: "group-coordination",
        badge: "Group Feature",
        badgeColor: "#7C5CFF",
        title: "Group Coordination",
        subtitle: "From group-chat chaos to one shared plan.",
        description: "PayaGo replaces scattered planning with a structured coordination flow. Share, vote, decide, and keep the plan visible to everyone.",
        color: "#7C5CFF",
        features: [
            {
                icon: Users,
                title: "Shareable Trip Link",
                description: "Send one link via WhatsApp, email, or text. Friends can review the full trip — flights, hotel ideas, itinerary, and estimated costs — without downloading the app. They can respond in the browser where enabled.",
                color: "#7C5CFF",
                stat: "0",
                statLabel: "app downloads needed to review",
            },
            {
                icon: ThumbsUp,
                title: "Shared Trip Responses",
                description: "I'm In / Maybe / Can't Make It. You see responses in one place as they are submitted, so the organiser is not chasing stale group-chat replies.",
                color: "#9B7FFF",
                stat: "Shared",
                statLabel: "response dashboard",
            },
            {
                icon: Zap,
                title: "Reminder Nudges",
                description: "PayaGo helps organisers nudge anyone who has not responded yet, so decisions do not disappear inside a busy group chat.",
                color: "#7C5CFF",
                stat: "0",
                statLabel: "manual follow-ups needed",
            },
            {
                icon: Route,
                title: "Conflict Resolution",
                description: "If dates do not work for everyone, PayaGo helps compare responses and explore alternative dates before the group refreshes the plan.",
                color: "#6B4FFF",
                stat: "Assisted",
                statLabel: "date conflict handling",
            },
        ],
    },
    {
        id: "cost-coordination",
        badge: "Cost Coordination",
        badgeColor: "#4AD7A2",
        title: "Cost Coordination",
        subtitle: "Everyone sees their share before the group commits.",
        description: "When the group is ready, PayaGo helps coordinate each member's estimated share and keeps next steps clear. The organiser does not have to manage the whole trip through a spreadsheet.",
        color: "#4AD7A2",
        features: [
            {
                icon: CreditCard,
                title: "Member Share Visibility",
                description: "Everyone can see their own estimated share and review any provider-led handoff where available instead of relying on one friend's spreadsheet.",
                color: "#4AD7A2",
                stat: "Split",
                statLabel: "share visibility",
            },
            {
                icon: Shield,
                title: "Provider-led checkout",
                description: "Where checkout is available, details are handled by providers and partner flows. Available methods, terms, and confirmation steps are shown by the provider before the group commits.",
                color: "#34C38F",
                stat: "Clear",
                statLabel: "checkout terms shown upfront",
            },
            {
                icon: Zap,
                title: "Booking Handoff",
                description: "Once the group is ready, PayaGo can guide the organiser and travellers into a provider-led booking handoff where available. Confirmations follow the relevant provider process.",
                color: "#4AD7A2",
                stat: "Ready",
                statLabel: "for final review",
            },
            {
                icon: Brain,
                title: "Action Reminders",
                description: "PayaGo is designed to help organisers send friendly reminders and keep review steps visible without chasing through a group chat.",
                color: "#2ECC71",
                stat: "Clear",
                statLabel: "next-step status",
            },
        ],
    },
    {
        id: "smart-assist",
        badge: "Trip Assist",
        badgeColor: "#00D4FF",
        title: "Smart Travel Assistance",
        subtitle: "Before, during, and after your trip.",
        description: "PayaGo helps before and during the trip with reminders, weather context, suggested updates, and shared plans your group can review together.",
        color: "#00D4FF",
        features: [
            {
                icon: Brain,
                title: "Travel DNA",
                description: "Planned personalisation can learn from stated preferences, saved trips, hotel style, flight timing, activity types, budget sweet spot, and group size so future drafts feel more relevant.",
                color: "#00D4FF",
                stat: "Planned",
                statLabel: "personalisation layer",
            },
            {
                icon: CloudRain,
                title: "Trip Update Suggestions",
                description: "Flight delayed? Rain forecast? Attraction closed? PayaGo helps surface useful context and suggest plan changes for the group to review.",
                color: "#22C1E0",
                stat: "Context",
                statLabel: "for group review",
            },
            {
                icon: MapPin,
                title: "Pre-Trip Intelligence",
                description: "Passport reminders, AI-generated packing lists tailored to destination and weather, weather context, and flight check-in prompts help reduce pre-trip admin.",
                color: "#00D4FF",
                stat: "Less",
                statLabel: "pre-trip admin",
            },
            {
                icon: ShoppingBag,
                title: "During-Trip Features",
                description: "Built-in group chat, optional location sharing, nearby restaurant suggestions, and morning briefings with the day's schedule and weather are part of the planned trip-assist experience.",
                color: "#0ABFDC",
                stat: "Hands-free",
                statLabel: "travel assistance",
            },
        ],
    },
]

const addons = [
    { icon: PiggyBank, title: "Budget Tracker", description: "A shared budget view that helps the group compare planned costs before booking handoff.", color: "#C9A962" },
    { icon: Route, title: "Transport Search", description: "Planned support for trains, buses, and ferries alongside flight and stay ideas.", color: "#7C5CFF" },
    { icon: CloudRain, title: "Weather Intelligence", description: "Weather context with suggested alternatives for the group to review.", color: "#00D4FF" },
    { icon: ShoppingBag, title: "Smart Packing List", description: "AI-generated by destination, duration, activities, and weather forecast.", color: "#4AD7A2" },
    { icon: ThumbsUp, title: "Activity Responses", description: "Yes/Maybe/No on individual activities, with shared tallies so the group can make a clear decision.", color: "#FF6B6B" },
    { icon: Sparkles, title: "Post-Trip Summary", description: "Photos, budget breakdown, saved preferences, and AI suggestions for your next trip.", color: "#E5C77D" },
]

export default function FeaturesPage() {
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
                    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#C9A962]/8 rounded-full" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7C5CFF]/8 rounded-full" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-8">
                        <Sparkles className="w-4 h-4 text-[#C9A962]" />
                        <span className="text-sm font-medium text-slate-600">4 core systems · Built for early-access travellers</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                        Everything you need.
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent block">Nothing you don't.</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Ten feature areas for one workflow: plan, coordinate, compare costs, and move into supported booking handoff.
                    </p>
                </div>
            </section>

            {/* Feature Categories */}
            {categories.map((cat, catIdx) => (
                <section key={cat.id} className="py-24 border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-6">
                        {/* Category header */}
                        <div className="grid lg:grid-cols-3 gap-12 mb-20 items-end">
                            <div className="lg:col-span-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 text-sm font-medium" style={{ borderColor: `${cat.badgeColor}30`, color: cat.badgeColor, background: `${cat.badgeColor}10` }}>
                                    {cat.badge}
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">{cat.title}</h2>
                                <p className="text-xl font-medium mb-4" style={{ color: cat.color }}>{cat.subtitle}</p>
                                <p className="text-slate-500 text-lg leading-relaxed max-w-xl">{cat.description}</p>
                            </div>
                            <div className="hidden lg:flex items-center justify-end">
                                <div className="w-24 h-24 rounded-3xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${cat.color}20, ${cat.color}05)`, border: `1px solid ${cat.color}20` }}>
                                    <div className="text-4xl font-bold" style={{ color: `${cat.color}60` }}>0{catIdx + 1}</div>
                                </div>
                            </div>
                        </div>

                        {/* Feature grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {cat.features.map((feature, i) => {
                                const Icon = feature.icon
                                return (
                                    <div key={i} className="group relative p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-500 hover:-translate-y-2 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `${feature.color}15` }} />
                                        <div className="relative z-10">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${feature.color}25, ${feature.color}08)` }}>
                                                <Icon className="w-6 h-6" style={{ color: feature.color }} />
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-6">{feature.description}</p>
                                            <div className="pt-4 border-t border-slate-100">
                                                <div className="text-2xl font-bold" style={{ color: feature.color }}>{feature.stat}</div>
                                                <div className="text-slate-400 text-xs mt-1">{feature.statLabel}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            ))}

            {/* Add-ons */}
            <section className="py-24 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
                            <span className="text-sm font-medium text-slate-500">Plus six more</span>
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">More built-in features</h2>
                        <p className="text-slate-500 text-lg">Everything your group needs — included, no extras to buy</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {addons.map((addon, i) => {
                            const Icon = addon.icon
                            return (
                                <div key={i} className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-300 flex items-start gap-4">
                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${addon.color}25, ${addon.color}08)` }}>
                                        <Icon className="w-5 h-5" style={{ color: addon.color }} />
                                    </div>
                                    <div>
                                        <h3 className="text-slate-900 font-semibold mb-1">{addon.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{addon.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                        All of this.
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent"> Built for early access.</span>
                    </h2>
                    <p className="text-slate-500 text-lg mb-4">Join the early-access waitlist. PayaGo may have partner or affiliate arrangements with supported booking providers.</p>
                    <p className="text-slate-400 text-sm mb-10">Powered by PayaGo AI · Provider-led handoff where available</p>
                    <Link href="/early-access/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
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
