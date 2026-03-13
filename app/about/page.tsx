import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Mic, Brain, Users, Zap, Globe, Heart } from "lucide-react"

export const metadata: Metadata = {
    title: "About — PayaGo",
    description: "The story behind PayaGo — why we built an AI that turns one sentence into a fully booked group trip. Founded after 3 weeks of planning chaos for a Lisbon trip.",
    openGraph: {
        title: "About PayaGo — Why We Built an AI Group Travel Planner",
        description: "The story behind PayaGo — why we built an AI that turns one sentence into a fully booked group trip.",
        url: "https://www.payago.in/about",
        type: "website",
    },
    alternates: {
        canonical: "https://www.payago.in/about",
    },
}

const values = [
    {
        icon: Zap,
        title: "30 Seconds or Bust",
        description: "If it takes longer than 30 seconds for AI to build a complete trip, we've failed. Every engineering decision flows from this principle.",
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
        description: "You shouldn't have to scroll through 1,000 hotels. The AI should know what you want and present three perfect options. That's the bar we hold ourselves to.",
        color: "#7C5CFF",
    },
    {
        icon: Heart,
        title: "Trips Actually Happen",
        description: "Our north star isn't sign-ups or revenue — it's trips that actually get booked. Every feature exists to move a group from 'we should go' to 'we're going'.",
        color: "#4AD7A2",
    },
]

const timeline = [
    {
        year: "2024",
        title: "The Trip That Started It All",
        description: "Our founders tried to plan a group trip to Lisbon. Eight people, six WhatsApp threads, four spreadsheets, and three weeks of back-and-forth — for a 4-day trip. They spent more time planning than they spent there.",
        accent: "#C9A962",
    },
    {
        year: "2024",
        title: "The Research",
        description: "We spoke to hundreds of people about group travel. The frustration was universal and visceral. 95% of group trips discussed never happen. Not because people don't want to travel — because planning together is so painful people give up.",
        accent: "#00D4FF",
    },
    {
        year: "2025",
        title: "Building the AI",
        description: "We assembled a team of AI engineers, travel tech veterans, and UX obsessives. Voice recognition. Gemini AI generating complete itineraries. Real-time group collaboration. Travel booking integrations coming at launch.",
        accent: "#7C5CFF",
    },
    {
        year: "2026",
        title: "Launching April 2026",
        description: "After months of beta testing with thousands of groups, PayaGo launches on iOS and Android. The goal is simple: every group trip that's ever been discussed in a WhatsApp chat actually happens.",
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
        bio: "Leads technology vision, AI infrastructure, and system architecture. Built the parallel search engine that queries 1,350+ travel options simultaneously in under 10 seconds.",
        avatar: "JV",
        gradient: "from-[#00D4FF] to-[#7C5CFF]",
    },
    {
        name: "Kishore Dayanithi",
        role: "Co-Founder & CFO",
        bio: "Owns financial strategy and partner relationships. Designed the commission model that makes PayaGo genuinely free for travellers — forever.",
        avatar: "KD",
        gradient: "from-[#7C5CFF] to-[#4AD7A2]",
    },
    {
        name: "Aravinthan",
        role: "Co-Founder & COO",
        bio: "Runs day-to-day operations and drives execution across engineering, product, and growth. Makes sure the 30-second promise stays a promise.",
        avatar: "AR",
        gradient: "from-[#4AD7A2] to-[#00D4FF]",
    },
]

export default function AboutPage() {
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
                    <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-[#C9A962]/8 rounded-full blur-[180px]" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#7C5CFF]/8 rounded-full blur-[150px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A962]/10 border border-[#C9A962]/20 mb-8">
                        <span className="w-2 h-2 bg-[#C9A962] rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-[#C9A962]">Launching April 2026</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                        {"We're making"}
                        <span className="bg-gradient-to-r from-[#C9A962] via-[#E5C77D] to-[#C9A962] bg-clip-text text-transparent"> group trips</span>
                        <br />actually happen
                    </h1>
                    <p className="text-xl lg:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed">
                        {"95% of group trips discussed in a WhatsApp chat never happen. Not because people don't want to go — because planning together is broken."}
                    </p>
                </div>
            </section>

            {/* Stats Strip */}
            <section className="border-y border-white/5 py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C9A962]/5 via-transparent to-[#00D4FF]/5" />
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
                        {[
                            { value: "95%", label: "of group trips discussed never get booked", color: "#FF6B6B" },
                            { value: "15hrs", label: "average time spent planning a group trip manually", color: "#C9A962" },
                            { value: "30s", label: "for PayaGo AI to create a complete trip itinerary", color: "#4AD7A2" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/[0.02] p-12 text-center">
                                <div className="text-6xl lg:text-7xl font-bold mb-3" style={{ color: stat.color }}>{stat.value}</div>
                                <div className="text-white/40 text-lg leading-snug">{stat.label}</div>
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
                            <h2 className="text-3xl font-bold text-white mb-6">Planning a trip used to mean…</h2>
                            <div className="space-y-4">
                                {[
                                    "3 hours comparing flights across 5 websites",
                                    "4 hours scrolling through hotel reviews",
                                    "50+ WhatsApp messages trying to agree on dates",
                                    "One person doing all the work while friends are passive",
                                    "Chasing people for money for weeks after booking",
                                    "Someone always backs out last minute",
                                    "The trip gets indefinitely postponed",
                                ].map((pain, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#FF6B6B]/5 border border-[#FF6B6B]/10">
                                        <span className="text-[#FF6B6B] mt-0.5 text-lg leading-none">×</span>
                                        <span className="text-white/60 leading-snug">{pain}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4AD7A2]/10 border border-[#4AD7A2]/20 mb-8">
                                <span className="text-sm font-medium text-[#4AD7A2]">With PayaGo</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-6">The same trip now takes 5 minutes</h2>
                            <div className="space-y-4">
                                {[
                                    "Speak one sentence — AI builds the full itinerary in 30s",
                                    "Get 3 complete options: Budget, Balanced, and Premium",
                                    "Send a link — friends vote directly in the app",
                                    "Everyone pays their own share securely, instantly",
                                    "Flights, hotel, and activities booked automatically",
                                    "Pre-trip reminders, packing lists, and weather alerts",
                                    "Real-time help if flights delay or weather changes",
                                ].map((win, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#4AD7A2]/5 border border-[#4AD7A2]/10">
                                        <span className="text-[#4AD7A2] mt-0.5 text-lg leading-none">✓</span>
                                        <span className="text-white/70 leading-snug">{win}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 mb-6">
                                <Globe className="w-4 h-4 text-[#7C5CFF]" />
                                <span className="text-sm font-medium text-[#7C5CFF]">Our Mission</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                Every group trip discussed
                                <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent"> should actually happen</span>
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed mb-6">
                                {"We're creating a new category — Autonomous Travel Planning. The same way Uber eliminated the friction of getting a cab, PayaGo eliminates the friction of planning a trip together."}
                            </p>
                            <p className="text-white/60 text-lg leading-relaxed">
                                {"You shouldn't need to be a travel agent to take a group trip. One sentence. 30 seconds. Done."}
                            </p>
                        </div>
                        <div className="relative p-10 rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden">
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#C9A962]/10 rounded-full blur-[100px]" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-[#C9A962]/20 flex items-center justify-center">
                                        <Mic className="w-5 h-5 text-[#C9A962]" />
                                    </div>
                                    <span className="text-white/40 text-sm">User says…</span>
                                </div>
                                <p className="text-white text-xl font-medium mb-8 leading-snug">
                                    "Weekend in Barcelona for 6 friends, around £400 each, beach and nightlife"
                                </p>
                                <div className="h-px bg-white/5 mb-8" />
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#4AD7A2]/20 flex items-center justify-center">
                                        <Brain className="w-5 h-5 text-[#4AD7A2]" />
                                    </div>
                                    <span className="text-white/40 text-sm">PayaGo AI returns…</span>
                                </div>
                                <div className="space-y-3">
                                    {["✈️  Flights for 6 — EasyJet, Fri 7pm", "🏨  Hotel Barcelona Universal, 4.5★", "🎯  Sagrada Família + Beach Club + Rooftop"].map((item, i) => (
                                        <div key={i} className="text-white/70 text-sm bg-white/[0.03] rounded-xl px-4 py-3">{item}</div>
                                    ))}
                                </div>
                                <div className="mt-6 flex items-center gap-2 text-[#4AD7A2] text-sm">
                                    <span className="w-2 h-2 bg-[#4AD7A2] rounded-full animate-pulse" />
                                    Complete trip built in 28 seconds
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">What we believe</h2>
                        <p className="text-white/40 text-lg">The principles that drive every product decision</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon
                            return (
                                <div key={index} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${value.color}30, ${value.color}10)` }}>
                                        <Icon className="w-6 h-6" style={{ color: value.color }} />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                                    <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Our journey</h2>
                        <p className="text-white/40 text-lg">From a frustrating Lisbon trip to launching an AI</p>
                    </div>
                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A962] via-[#00D4FF] via-[#7C5CFF] to-[#4AD7A2]" />
                        <div className="space-y-14">
                            {timeline.map((item, index) => (
                                <div key={index} className="relative pl-24">
                                    <div className="absolute left-5 top-2 w-6 h-6 rounded-full bg-[#04060A] border-2 flex items-center justify-center" style={{ borderColor: item.accent }}>
                                        <div className="w-2 h-2 rounded-full" style={{ background: item.accent }} />
                                    </div>
                                    <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: item.accent }}>{item.year}</div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-white/50 leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">The founding team</h2>
                        <p className="text-white/40 text-lg">Building the future of group travel from London</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <div key={index} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1 text-center">
                                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-xl font-bold text-white mx-auto mb-6 transition-transform duration-300 group-hover:scale-105`}>
                                    {member.avatar}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                                <div className="text-[#C9A962] text-sm mb-4 font-medium">{member.role}</div>
                                <p className="text-white/40 text-sm leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-6 text-center">
                        {[
                            { value: "15K+", label: "Waitlist signups" },
                            { value: "2K+", label: "Beta trips planned" },
                            { value: "45", label: "Countries on waitlist" },
                            { value: "4.9★", label: "Beta tester rating" },
                        ].map((stat, index) => (
                            <div key={index} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent mb-2">{stat.value}</div>
                                <div className="text-white/40 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        Join us in making
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent"> every trip happen</span>
                    </h2>
                    <p className="text-white/50 text-lg mb-10">Free early access. No credit card required. April 2026 launch.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                            Get Early Access
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/careers" className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                            Join the Team
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
