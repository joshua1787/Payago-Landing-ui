import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Mic, Sparkles, Users, CreditCard, Brain, MapPin, CloudRain, ThumbsUp, Route, ShoppingBag, PiggyBank, Clock, Zap, Shield } from "lucide-react"

export const metadata: Metadata = {
    title: "PayaGo Features — AI Itinerary, Group Voting, Split Payments & More",
    description: "Every feature in PayaGo: voice AI trip creation, 30-second itineraries, group voting, split payments, Travel DNA personalisation, and real-time trip assistance.",
    openGraph: {
        title: "PayaGo Features — AI Itinerary, Group Voting, Split Payments",
        description: "Voice AI trip creation, 30-second itineraries, group voting, split payments, and real-time trip assistance.",
        url: "https://www.payago.in/features",
        type: "website",
    },
    alternates: {
        canonical: "https://www.payago.in/features",
    },
}

const categories = [
    {
        id: "ai-creation",
        badge: "Core Feature",
        badgeColor: "#C9A962",
        title: "AI Trip Creation",
        subtitle: "One sentence in. Complete trip out.",
        description: "The heart of PayaGo. Speak naturally, and Gemini AI builds a full, bookable trip in under 30 seconds — searching over a thousand options in parallel so you never have to.",
        color: "#C9A962",
        features: [
            {
                icon: Mic,
                title: "Voice-First Input",
                description: "Talk like you're texting a friend. No forms, no dropdowns, no decision fatigue. The AI extracts destination, dates, budget, group size, and vibe from a single natural sentence.",
                color: "#C9A962",
                stat: "5 seconds",
                statLabel: "vs 5+ hours of manual research",
            },
            {
                icon: Sparkles,
                title: "3 Complete Options",
                description: "You get Budget, Balanced, and Premium options — each with flights, hotel, and a full day-by-day schedule. AI explains why each one works for your group.",
                color: "#E5C77D",
                stat: "1,350+",
                statLabel: "options searched simultaneously",
            },
            {
                icon: Clock,
                title: "30-Second Itinerary",
                description: "Parallel API calls to flight, hotel, and activity providers run simultaneously. Gemini AI assembles the results into complete, hour-by-hour plans with timings, costs, and local tips.",
                color: "#FF9F43",
                stat: "< 30s",
                statLabel: "end-to-end generation time",
            },
            {
                icon: Brain,
                title: "Intelligent Filtering",
                description: "AI eliminates bad options automatically — flights with 3+ connections, hotels under 4 stars, activities with poor reviews — before you ever see them.",
                color: "#C9A962",
                stat: "4★+",
                statLabel: "minimum quality threshold enforced",
            },
        ],
    },
    {
        id: "group-coordination",
        badge: "Group Feature",
        badgeColor: "#7C5CFF",
        title: "Group Coordination",
        subtitle: "From 50 WhatsApp messages to 5 minutes.",
        description: "PayaGo replaces the group chat chaos with a structured, automated coordination engine. Share, vote, decide — without anyone having to chase anyone.",
        color: "#7C5CFF",
        features: [
            {
                icon: Users,
                title: "Shareable Trip Link",
                description: "Send one link via WhatsApp, email, or text. Friends see the full trip — flights, hotel, itinerary, costs — without downloading the app. They vote directly in the browser.",
                color: "#7C5CFF",
                stat: "0",
                statLabel: "app downloads needed to vote",
            },
            {
                icon: ThumbsUp,
                title: "Real-Time Voting",
                description: "I'm In / Maybe / Can't Make It. You see responses as they arrive. No more checking in 24 hours later to find half the group hasn't responded.",
                color: "#9B7FFF",
                stat: "Live",
                statLabel: "response dashboard",
            },
            {
                icon: Zap,
                title: "Auto-Reminders",
                description: "AI sends gentle, personalised reminders to anyone who hasn't voted after 12 hours. You don't have to be the annoying one in the group chat.",
                color: "#7C5CFF",
                stat: "0",
                statLabel: "manual follow-ups needed",
            },
            {
                icon: Route,
                title: "Conflict Resolution",
                description: "If dates don't work for everyone, AI finds alternatives that do, regenerates the trip options for new dates, and re-invites the group — automatically.",
                color: "#6B4FFF",
                stat: "Auto",
                statLabel: "date conflict detection",
            },
        ],
    },
    {
        id: "payments",
        badge: "No More Chasing",
        badgeColor: "#4AD7A2",
        title: "Group Payments",
        subtitle: "Everyone pays their share. Nobody fronts £2,000.",
        description: "The moment the group confirms, payment requests go out to every member for their exact share. Secured and PCI-compliant. No one person carries the financial risk of a group trip.",
        color: "#4AD7A2",
        features: [
            {
                icon: CreditCard,
                title: "Split-to-Each Payment",
                description: "Everyone pays their own share directly in the app — not Sarah's bank account. £390 each, not £2,340 from one person. Payments go straight to the booking.",
                color: "#4AD7A2",
                stat: "£0",
                statLabel: "one person needs to front",
            },
            {
                icon: Shield,
                title: "Secure Payments",
                description: "Every payment is processed through PCI-DSS Level 1 certified infrastructure, 3D Secure authenticated, and fraud-protected. The same standards used by the world's largest platforms.",
                color: "#34C38F",
                stat: "PCI-DSS",
                statLabel: "Level 1 — highest tier",
            },
            {
                icon: Zap,
                title: "Instant Booking",
                description: "The moment all payments clear — usually within 2 minutes — flights, hotel, and activities are booked simultaneously. Confirmations drop into everyone's inbox.",
                color: "#4AD7A2",
                stat: "30s",
                statLabel: "from all-paid to all-booked",
            },
            {
                icon: Brain,
                title: "Payment Reminders",
                description: "AI sends automated, friendly payment nudges to anyone who hasn't paid after 6 hours. A 24-hour deadline keeps the booking window secure. You never have to ask.",
                color: "#2ECC71",
                stat: "Auto",
                statLabel: "reminder system",
            },
        ],
    },
    {
        id: "smart-assist",
        badge: "Always On",
        badgeColor: "#00D4FF",
        title: "Smart Travel Assistance",
        subtitle: "Before, during, and after your trip.",
        description: "PayaGo doesn't disappear after booking. It monitors your trip in real time, adapts to changes, and helps your group travel without friction from pre-departure to post-trip.",
        color: "#00D4FF",
        features: [
            {
                icon: Brain,
                title: "Travel DNA",
                description: "After each trip, AI learns your preferences — hotel style, flight timing, activity types, budget sweet spot, group size. By your third trip, suggestions are 85%+ accurate to your tastes.",
                color: "#00D4FF",
                stat: "Gets smarter",
                statLabel: "with every trip you take",
            },
            {
                icon: CloudRain,
                title: "Real-Time Adaptation",
                description: "Flight delayed? Hotel notified, group informed. Rain forecast? Outdoor activities automatically swapped for indoor alternatives. Attraction closed? Rebooked before you notice.",
                color: "#22C1E0",
                stat: "24/7",
                statLabel: "monitoring flights & weather",
            },
            {
                icon: MapPin,
                title: "Pre-Trip Intelligence",
                description: "Passport expiry checks, AI-generated packing lists tailored to destination and weather, weather forecasts 7 days before, and flight check-in reminders — all proactive, all automatic.",
                color: "#00D4FF",
                stat: "Zero",
                statLabel: "pre-trip admin for you",
            },
            {
                icon: ShoppingBag,
                title: "During-Trip Features",
                description: "Built-in group chat, live location sharing (optional), nearby restaurant recommendations based on your Travel DNA, and morning briefings with the day's schedule and weather.",
                color: "#0ABFDC",
                stat: "Hands-free",
                statLabel: "travel assistance",
            },
        ],
    },
]

const addons = [
    { icon: PiggyBank, title: "Budget Tracker", description: "Real-time spend vs. budget across all bookings for the whole group.", color: "#C9A962" },
    { icon: Route, title: "EU Transport Search", description: "Trains, buses, and ferries across 30+ European countries — in one search.", color: "#7C5CFF" },
    { icon: CloudRain, title: "Weather Intelligence", description: "48-hour forecasts with proactive alternative suggestions before you even ask.", color: "#00D4FF" },
    { icon: ShoppingBag, title: "Smart Packing List", description: "AI-generated by destination, duration, activities, and weather forecast.", color: "#4AD7A2" },
    { icon: ThumbsUp, title: "Activity Voting", description: "Yes/Maybe/No on individual activities. Live tallies. Auto-accept on majority.", color: "#FF6B6B" },
    { icon: Sparkles, title: "Post-Trip Summary", description: "Photos, ratings, budget breakdown, and AI suggestions for your next trip.", color: "#E5C77D" },
]

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-[#04060A]">
            <header className="border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl bg-[#04060A]/80">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/payago-logo.jpg" alt="PayaGo" className="w-9 h-9 object-cover rounded-xl" />
                        <span className="text-white font-semibold text-lg">PayaGo</span>
                    </Link>
                    <Link href="/" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#C9A962]/8 rounded-full blur-[200px]" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7C5CFF]/8 rounded-full blur-[180px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                        <Sparkles className="w-4 h-4 text-[#C9A962]" />
                        <span className="text-sm font-medium text-white/60">4 core systems · Everything included · Free for travellers</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        Everything you need.
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent block">Nothing you don't.</span>
                    </h1>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                        Ten features. Zero tab-switching. One app that plans, coordinates, books, and guides your entire group trip.
                    </p>
                </div>
            </section>

            {/* Feature Categories */}
            {categories.map((cat, catIdx) => (
                <section key={cat.id} className="py-24 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        {/* Category header */}
                        <div className="grid lg:grid-cols-3 gap-12 mb-20 items-end">
                            <div className="lg:col-span-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 text-sm font-medium" style={{ borderColor: `${cat.badgeColor}30`, color: cat.badgeColor, background: `${cat.badgeColor}10` }}>
                                    {cat.badge}
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">{cat.title}</h2>
                                <p className="text-xl font-medium mb-4" style={{ color: cat.color }}>{cat.subtitle}</p>
                                <p className="text-white/50 text-lg leading-relaxed max-w-xl">{cat.description}</p>
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
                                    <div key={i} className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `${feature.color}15` }} />
                                        <div className="relative z-10">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${feature.color}25, ${feature.color}08)` }}>
                                                <Icon className="w-6 h-6" style={{ color: feature.color }} />
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                                            <p className="text-white/50 text-sm leading-relaxed mb-6">{feature.description}</p>
                                            <div className="pt-4 border-t border-white/5">
                                                <div className="text-2xl font-bold" style={{ color: feature.color }}>{feature.stat}</div>
                                                <div className="text-white/30 text-xs mt-1">{feature.statLabel}</div>
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
            <section className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                            <span className="text-sm font-medium text-white/50">Plus six more</span>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-4">More built-in features</h2>
                        <p className="text-white/40 text-lg">Everything your group needs — included, no extras to buy</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {addons.map((addon, i) => {
                            const Icon = addon.icon
                            return (
                                <div key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 flex items-start gap-4">
                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${addon.color}25, ${addon.color}08)` }}>
                                        <Icon className="w-5 h-5" style={{ color: addon.color }} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">{addon.title}</h3>
                                        <p className="text-white/40 text-sm leading-relaxed">{addon.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        All of this.
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent"> Free for travellers.</span>
                    </h2>
                    <p className="text-white/50 text-lg mb-4">We earn from booking partner commissions — not from you. Every feature is free, always.</p>
                    <p className="text-white/30 text-sm mb-10">Powered by Gemini AI · Claude AI</p>
                    <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                        Get Early Access
                        <ArrowRight className="w-4 h-4" />
                    </Link>
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
