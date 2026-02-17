"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Users, CreditCard, Train, CloudSun, Vote, Brain, Backpack, PieChart, ArrowUpRight, Mic } from "lucide-react"

const heroFeatures = [
    {
        icon: Sparkles,
        title: "AI Itinerary Generation",
        description: "One sentence in, full itinerary out. Gemini AI crafts day-by-day plans with timings, costs, and local gems.",
        color: "#0ea5e9",
        accent: "from-cyan-400 to-blue-500",
        stat: "< 30s",
        statLabel: "generation time",
        image: "/images/travel-santorini.png",
    },
    {
        icon: Users,
        title: "Real-Time Collaboration",
        description: "Everyone sees every change instantly via WebSocket. Comment, edit, and decide — together.",
        color: "#8b5cf6",
        accent: "from-violet-400 to-purple-500",
        stat: "Live",
        statLabel: "sync across devices",
        image: "/images/travel-friends.png",
    },
    {
        icon: CreditCard,
        title: "In-App Booking",
        description: "Hotels via Booking.com. Flights via Kiwi. Activities via Viator. One checkout, commission-based — free for users.",
        color: "#10b981",
        accent: "from-emerald-400 to-teal-500",
        stat: "3-in-1",
        statLabel: "booking partners",
        image: "/images/travel-tokyo.png",
    },
    {
        icon: Mic,
        title: "Voice AI Guide",
        description: "Talk to PayaGo like a human. It plans, books, and guides you 24/7—completely hands-free.",
        color: "#f43f5e",
        accent: "from-rose-400 to-red-500",
        stat: "24/7",
        statLabel: "voice assistance",
        image: "/images/voice-ai-assistant.png",
    },
]

const gridFeatures = [
    { icon: Train, title: "EU Transport Search", description: "UK trains, EU rails, ferries, and buses across 30+ countries.", color: "#3b82f6" },
    { icon: CloudSun, title: "Weather Intelligence", description: "48-hour forecasts with proactive alerts and indoor alternatives.", color: "#f59e0b" },
    { icon: Vote, title: "Group Voting", description: "Yes/Maybe/No on every activity. Live tallies. Auto-accept majority.", color: "#ec4899" },
    { icon: Brain, title: "AI Optimisation", description: "Route optimisation, timing fixes, hidden gems — continuous improvement.", color: "#6366f1" },
    { icon: Backpack, title: "Smart Packing List", description: "AI-generated based on destination, weather, activities, and duration.", color: "#f97316" },
    { icon: PieChart, title: "Budget Tracker", description: "Real-time spend vs budget across all bookings for the whole group.", color: "#14b8a6" },
]

export function FeaturesSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) setIsVisible(true) },
            { threshold: 0.05 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} id="features" className="relative py-28 sm:py-36 overflow-hidden">
            {/* Light-to-dark gradient background for visual variety */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#0f172a]" />

            {/* Subtle geometric pattern on white area */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)', backgroundSize: '32px 32px' }} />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Header — dark text on light bg */}
                <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                        <span className="text-[13px] text-blue-600 font-semibold">Platform capabilities</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-[-0.03em] mb-5">
                        Everything you need.{" "}
                        <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">Nothing you don&apos;t.</span>
                    </h2>
                    <p className="text-[17px] text-slate-500 max-w-lg mx-auto leading-relaxed">
                        Ten features. Zero tab-switching. One app that does it all.
                    </p>
                </div>

                {/* Hero feature cards with photos - NOW 2x2 GRID */}
                <div className={`grid md:grid-cols-2 gap-4 mb-4 transition-all duration-700 delay-150 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                    {heroFeatures.map((feature, i) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={feature.title}
                                className="group relative rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl"
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                {/* Travel photo background */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                                    {/* Stat badge */}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-xl px-3.5 py-2 shadow-lg">
                                        <div className="text-slate-900 text-[15px] font-bold">{feature.stat}</div>
                                        <div className="text-slate-500 text-[9px] font-medium uppercase tracking-wider">{feature.statLabel}</div>
                                    </div>
                                </div>

                                {/* Card content */}
                                <div className="relative bg-slate-900 p-6 pb-7">
                                    <div className="flex items-start gap-3.5 mb-3">
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${feature.accent} shadow-lg flex-shrink-0`}
                                        >
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-bold text-white mb-1">{feature.title}</h3>
                                            <p className="text-[13px] text-white/40 leading-[1.7]">{feature.description}</p>
                                        </div>
                                    </div>

                                    {/* Bottom shimmer */}
                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Grid features — vibrant colored cards on dark bg */}
                <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-3 transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                    {gridFeatures.map((feature, i) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={feature.title}
                                className="group relative bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5 overflow-hidden transition-all duration-500 hover:bg-white/[0.07] hover:border-white/[0.1] hover:-translate-y-0.5"
                                style={{ transitionDelay: `${200 + i * 60}ms` }}
                            >
                                {/* Subtle colored glow */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" style={{ background: feature.color }} />

                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                                        style={{
                                            background: `${feature.color}15`,
                                            border: `1px solid ${feature.color}25`,
                                        }}
                                    >
                                        <Icon className="w-5 h-5" style={{ color: feature.color }} />
                                    </div>
                                    <div>
                                        <h3 className="text-[14px] font-bold text-white/85 mb-1.5 group-hover:text-white transition-colors duration-300">{feature.title}</h3>
                                        <p className="text-[12px] text-white/30 leading-[1.7] group-hover:text-white/45 transition-colors duration-300">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
