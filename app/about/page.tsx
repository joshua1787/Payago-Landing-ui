import type { Metadata } from "next"
import Link from "next/link"
import { PayagoWordmark } from "@/components/payago-wordmark"
import { ArrowLeft, ArrowRight, Mic, Brain, Users, Zap, Globe, Heart } from "lucide-react"

export const metadata: Metadata = {
    title: "About — PayaGo",
    description: "The story behind PayaGo — why we built an AI that turns one sentence into a coordinated group trip plan. Founded after 3 weeks of planning chaos for a Lisbon trip.",
    openGraph: {
        title: "About PayaGo — Why We Built an AI Group Travel Planner",
        description: "The story behind PayaGo — why we built an AI that turns one sentence into a coordinated group trip plan.",
        url: "https://www.payago.in/about",
        type: "website",
        images: [
            {
                url: "https://www.payago.in/og/about.jpg",
                width: 1200,
                height: 630,
                alt: "PayaGo AI Group Travel Planning",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About PayaGo",
        description: "Why we built an AI that turns one sentence into a coordinated group trip plan.",
        images: ["https://www.payago.in/og/about.jpg"],
    },
    alternates: {
        canonical: "https://www.payago.in/about",
    },
}

const values = [
    {
        icon: Zap,
        title: "Minutes, Not Weeks",
        description: "If AI cannot get a group from idea to useful draft plan quickly, the product has missed the point. Every engineering decision flows from that principle.",
        color: "#C9A962",
    },
    {
        icon: Users,
        title: "Groups First",
        description: "Solo travel is easy. Group travel is chaos. We obsess over the messy reality of coordinating real people with real schedules and real opinions.",
        color: "#00D4FF",
    },
    {
        icon: Brain,
        title: "AI Does the Work",
        description: "You shouldn't have to scroll through endless hotel tabs. The AI should understand the brief and present three strong options your group can actually discuss.",
        color: "#7C5CFF",
    },
    {
        icon: Heart,
        title: "Trips Reach A Clear Next Step",
        description: "Our north star isn't sign-ups or revenue — it's helping groups move from 'we should go' to a clear, shared next step.",
        color: "#4AD7A2",
    },
]

const timeline = [
    {
        year: "2024",
        title: "The Trip That Started It All",
        description: "Our founders tried to plan a group trip to Lisbon. Multiple chats, scattered links, spreadsheets, and weeks of back-and-forth turned a simple idea into admin. They spent more time planning than they should have.",
        accent: "#C9A962",
    },
    {
        year: "2024",
        title: "The Research",
        description: "We spoke to travellers about group travel. The frustration was universal and visceral: people want to go, but planning together is so painful that plans often fade out.",
        accent: "#00D4FF",
    },
    {
        year: "2025",
        title: "Building the AI",
        description: "We started building around the core workflow: voice or text trip input, AI-generated itinerary drafts, group collaboration, cost coordination, and provider-led booking handoff where supported.",
        accent: "#7C5CFF",
    },
    {
        year: "2026",
        title: "Launching early access phase",
        description: "PayaGo is moving through early access with web and mobile experiences. The goal is simple: help more group trips move from chat to a clear plan.",
        accent: "#4AD7A2",
    },
]

const team = [
    {
        name: "Dickson Patrick",
        role: "Founder & CEO",
        bio: "Leads company vision, product direction, and strategic partnerships. The one who had to plan that disastrous Lisbon trip and swore there had to be a better way.",
        avatar: "DP",
        gradient: "from-[#C9A962] to-[#E5C77D]",
    },
    {
        name: "Joshua",
        role: "Co-Founder & CTO",
        bio: "Leads technology vision, AI infrastructure, and system architecture for the planning engine that turns a rough group idea into structured trip options.",
        avatar: "JV",
        gradient: "from-[#00D4FF] to-[#7C5CFF]",
    },
    {
        name: "Kishore Dayanithi",
        role: "Co-Founder & CFO",
        bio: "Owns financial strategy and partner relationships, including the partner-supported model behind early access planning and provider-led handoff where supported.",
        avatar: "KD",
        gradient: "from-[#7C5CFF] to-[#4AD7A2]",
    },
    {
        name: "Aravinthan",
        role: "Co-Founder & COO",
        bio: "Runs day-to-day operations and drives execution across engineering, product, and growth. Keeps the team focused on fast, useful trip planning.",
        avatar: "AR",
        gradient: "from-[#4AD7A2] to-[#00D4FF]",
    },
]

export default function AboutPage() {
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
                    <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-[#C9A962]/8 rounded-full" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#7C5CFF]/8 rounded-full" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A962]/10 border border-[#C9A962]/20 mb-8">
                        <span className="w-2 h-2 bg-[#C9A962] rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-[#C9A962]">Launching early access phase</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight">
                        {"We're making"}
                        <span className="bg-gradient-to-r from-[#C9A962] via-[#E5C77D] to-[#C9A962] bg-clip-text text-transparent"> group trips</span>
                        <br />actually happen
                    </h1>
                    <p className="text-xl lg:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                        {"Too many group trips start in a chat and never become a clear plan. Not because people don't want to go — because planning together is broken."}
                    </p>
                </div>
            </section>

            {/* Stats Strip */}
            <section className="border-y border-slate-100 py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C9A962]/5 via-transparent to-[#00D4FF]/5" />
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-px bg-slate-100 rounded-2xl overflow-hidden">
                        {[
                            { value: "One", label: "shared plan instead of scattered chats", color: "#FF6B6B" },
                            { value: "Three", label: "AI-generated options for the group to compare", color: "#C9A962" },
                            { value: "Clear", label: "next steps from idea to booking handoff", color: "#4AD7A2" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-slate-50 p-12 text-center">
                                <div className="text-6xl lg:text-7xl font-bold mb-3" style={{ color: stat.color }}>{stat.value}</div>
                                <div className="text-slate-500 text-lg leading-snug">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Before / After */}
            <section className="py-32">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-start">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF6B6B]/10 border border-[#FF6B6B]/20 mb-8">
                                <span className="text-sm font-medium text-[#FF6B6B]">Before PayaGo</span>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Planning a trip used to mean…</h2>
                            <div className="space-y-4">
                                {[
                                    "Hours comparing flights across multiple websites",
                                    "More hours scrolling through hotel options and reviews",
                                    "Endless WhatsApp messages trying to agree on dates",
                                    "One person doing all the work while friends are passive",
                                    "Chasing people for decisions and estimated shares across multiple chats",
                                    "Someone always backs out last minute",
                                    "The trip gets indefinitely postponed",
                                ].map((pain, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#FF6B6B]/5 border border-[#FF6B6B]/10">
                                        <span className="text-[#FF6B6B] mt-0.5 text-lg leading-none">×</span>
                                        <span className="text-slate-600 leading-snug">{pain}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4AD7A2]/10 border border-[#4AD7A2]/20 mb-8">
                                <span className="text-sm font-medium text-[#4AD7A2]">With PayaGo</span>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">The same trip becomes a shared plan</h2>
                            <div className="space-y-4">
                                {[
                                    "Speak one sentence — AI builds a ready-to-review itinerary",
                                    "Get 3 complete options: Budget, Balanced, and Premium",
                                    "Send a link — friends review the plan and respond where enabled",
                                    "Everyone sees their share before committing",
                                    "Flights, hotel, and activities can move through provider-led booking handoff where available",
                                    "Planned pre-trip reminders, packing lists, and weather context",
                                    "Shared context when flights, weather, or schedules change",
                                ].map((win, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#4AD7A2]/5 border border-[#4AD7A2]/10">
                                        <span className="text-[#4AD7A2] mt-0.5 text-lg leading-none">✓</span>
                                        <span className="text-slate-600 leading-snug">{win}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-24 border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 mb-6">
                                <Globe className="w-4 h-4 text-[#7C5CFF]" />
                                <span className="text-sm font-medium text-[#7C5CFF]">Our Mission</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                                Every group trip discussed
                                <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent"> should actually happen</span>
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                {"We're creating a new category — Autonomous Travel Planning. The same way Uber eliminated the friction of getting a cab, PayaGo eliminates the friction of planning a trip together."}
                            </p>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                {"You shouldn't need to be a travel agent to take a group trip. One sentence. A structured plan. Clear next steps."}
                            </p>
                        </div>
                        <div className="relative p-10 rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden">
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#C9A962]/10 rounded-full" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-[#C9A962]/20 flex items-center justify-center">
                                        <Mic className="w-5 h-5 text-[#C9A962]" />
                                    </div>
                                    <span className="text-slate-500 text-sm">User says…</span>
                                </div>
                                <p className="text-slate-700 text-xl font-medium mb-8 leading-snug">
                                    "Weekend in Barcelona for 6 friends, around £400 each, beach and nightlife"
                                </p>
                                <div className="h-px bg-slate-100 mb-8" />
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#4AD7A2]/20 flex items-center justify-center">
                                        <Brain className="w-5 h-5 text-[#4AD7A2]" />
                                    </div>
                                    <span className="text-slate-500 text-sm">PayaGo AI returns…</span>
                                </div>
                                <div className="space-y-3">
                                    {["Flight option for 6 — Friday evening", "Group-friendly Barcelona stay idea", "Sagrada Família + beach time + rooftop plan"].map((item, i) => (
                                        <div key={i} className="text-slate-600 text-sm bg-slate-50 rounded-xl px-4 py-3">{item}</div>
                                    ))}
                                </div>
                                <div className="mt-6 flex items-center gap-2 text-[#4AD7A2] text-sm">
                                    <span className="w-2 h-2 bg-[#4AD7A2] rounded-full animate-pulse" />
                                    Trip option ready for review
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">What we believe</h2>
                        <p className="text-slate-500 text-lg">The principles that drive every product decision</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon
                            return (
                                <div key={index} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-500 hover:-translate-y-1">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${value.color}30, ${value.color}10)` }}>
                                        <Icon className="w-6 h-6" style={{ color: value.color }} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">{value.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Our journey</h2>
                        <p className="text-slate-500 text-lg">From a frustrating Lisbon trip to launching an AI</p>
                    </div>
                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A962] via-[#00D4FF] via-[#7C5CFF] to-[#4AD7A2]" />
                        <div className="space-y-14">
                            {timeline.map((item, index) => (
                                <div key={index} className="relative pl-24">
                                    <div className="absolute left-5 top-2 w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center" style={{ borderColor: item.accent }}>
                                        <div className="w-2 h-2 rounded-full" style={{ background: item.accent }} />
                                    </div>
                                    <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: item.accent }}>{item.year}</div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">The founding team</h2>
                        <p className="text-slate-500 text-lg">Building the future of group travel from London</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <div key={index} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-500 hover:-translate-y-1 text-center">
                                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-xl font-bold text-slate-900 mx-auto mb-6 transition-transform duration-300 group-hover:scale-105`}>
                                    {member.avatar}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h3>
                                <div className="text-[#C9A962] text-sm mb-4 font-medium">{member.role}</div>
                                <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24 border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-6 text-center">
                        {[
                            { value: "AI", label: "Itinerary drafting" },
                            { value: "Group", label: "Voting and collaboration" },
                            { value: "Split", label: "Cost coordination" },
                            { value: "Partner", label: "Booking handoff" },
                        ].map((stat, index) => (
                            <div key={index} className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent mb-2">{stat.value}</div>
                                <div className="text-slate-500 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                        Join us in making
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent"> every trip happen</span>
                    </h2>
	                    <p className="text-slate-500 text-lg mb-10">Join the early-access waitlist. No credit card required. Mobile experiences are planned.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/early-access/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                            Get Early Access
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/careers" className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                            Join the Team
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
