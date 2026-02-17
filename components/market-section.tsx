"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, Globe, Users, Smartphone, ArrowUpRight } from "lucide-react"

const stats = [
    { value: "£62B", label: "UK outbound travel market annually", icon: Globe, color: "#3b82f6" },
    { value: "32%", label: "Group travel bookings growth YoY", icon: TrendingUp, color: "#10b981" },
    { value: "4.2", label: "Average people per group trip", icon: Users, color: "#8b5cf6" },
    { value: "68%", label: "Travellers abandon due to complexity", icon: Smartphone, color: "#f59e0b" },
]

const competitors = [
    { name: "Google Maps", does: "Saves places", misses: "No AI planning, no group, no booking", edge: "Full plan + group + booking" },
    { name: "TripAdvisor", does: "Reviews", misses: "Lists not plans, no group", edge: "Structured itinerary + collab" },
    { name: "Booking.com", does: "Hotel booking", misses: "No itinerary, no AI", edge: "Planning-first flow" },
    { name: "Wanderlog", does: "Manual planning", misses: "No AI, no real-time collab", edge: "AI-first, 30s plans" },
]

function CountUp({ target, suffix = "", prefix = "" }: { target: string; suffix?: string; prefix?: string }) {
    const [display, setDisplay] = useState(prefix + "0" + suffix)
    const ref = useRef<HTMLDivElement>(null)
    const hasAnimated = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true
                    // Parse the numeric part
                    const numericStr = target.replace(/[^0-9.]/g, '')
                    const numericVal = parseFloat(numericStr)
                    const nonNumericPrefix = target.match(/^[^0-9]*/)?.[0] || ""
                    const nonNumericSuffix = target.match(/[^0-9.]*$/)?.[0] || ""

                    let frame = 0
                    const totalFrames = 40
                    const interval = setInterval(() => {
                        frame++
                        const progress = frame / totalFrames
                        const eased = 1 - Math.pow(1 - progress, 3)
                        const current = numericVal * eased

                        if (numericStr.includes('.')) {
                            setDisplay(nonNumericPrefix + current.toFixed(1) + nonNumericSuffix)
                        } else {
                            setDisplay(nonNumericPrefix + Math.round(current).toString() + nonNumericSuffix)
                        }

                        if (frame >= totalFrames) {
                            setDisplay(target)
                            clearInterval(interval)
                        }
                    }, 30)
                }
            },
            { threshold: 0.5 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [target])

    return <div ref={ref} className="tabular-nums">{display}</div>
}

export function MarketSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) setIsVisible(true)
            },
            { threshold: 0.1 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} id="market" className="relative py-28 sm:py-36 overflow-hidden">
            <div className="absolute inset-0 bg-[#04060A]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-blue-600/5 to-transparent blur-[200px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
                        <span className="text-sm font-medium text-white/50">Market Opportunity</span>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
                        The gap is{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                            wide open
                        </span>
                    </h2>
                    <p className="text-lg text-white/35 max-w-xl mx-auto">
                        No product owns the end-to-end group travel workflow.
                    </p>
                </div>

                {/* Stats row */}
                <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20 transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {stats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <div key={stat.label} className="relative group bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 text-center hover:border-white/[0.12] transition-all duration-500">
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 100%, ${stat.color}08, transparent 70%)` }} />
                                <div className="relative z-10">
                                    <Icon className="w-5 h-5 mx-auto mb-3 opacity-40" style={{ color: stat.color }} />
                                    <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                        <CountUp target={stat.value} />
                                    </div>
                                    <p className="text-white/35 text-xs sm:text-sm leading-snug">{stat.label}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Competitor table */}
                <div className={`transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h3 className="text-2xl font-bold text-white mb-8 text-center">Why PayaGo wins</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider py-4 px-5 w-[160px]">Competitor</th>
                                    <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider py-4 px-5">What they do</th>
                                    <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider py-4 px-5">What they miss</th>
                                    <th className="text-left text-xs font-medium uppercase tracking-wider py-4 px-5 text-blue-400/80">PayaGo&apos;s Edge</th>
                                </tr>
                            </thead>
                            <tbody>
                                {competitors.map((c, i) => (
                                    <tr key={c.name} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4 px-5 text-white font-semibold text-sm">{c.name}</td>
                                        <td className="py-4 px-5 text-white/40 text-sm">{c.does}</td>
                                        <td className="py-4 px-5 text-white/30 text-sm">{c.misses}</td>
                                        <td className="py-4 px-5 text-blue-400 text-sm font-medium flex items-center gap-1">{c.edge} <ArrowUpRight className="w-3 h-3 opacity-50" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}
