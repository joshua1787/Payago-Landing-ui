"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Users, CreditCard, Mic, Check, Zap, Globe } from "lucide-react"

// Animated itinerary lines that build up and reset
function ItineraryPreview() {
    const [count, setCount] = useState(0)
    const lines = [
        { time: "Day 1", text: "Tokyo arrival · Shinjuku", color: "#00D4FF" },
        { time: "Day 2", text: "Senso-ji · Tsukiji Market", color: "#C9A962" },
        { time: "Day 3", text: "teamLab · Shibuya Sky", color: "#7C5CFF" },
        { time: "Day 4", text: "Hakone day trip · Onsen", color: "#4AD7A2" },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((c) => (c + 1) % (lines.length + 3))
        }, 700)
        return () => clearInterval(interval)
    }, [])

    const visible = count > lines.length ? 0 : count

    return (
        <div className="space-y-2.5">
            {lines.slice(0, visible).map((l, i) => (
                <div key={i} className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-white/20 w-10 flex-shrink-0">{l.time}</span>
                    <div className="flex-1 h-[1px] opacity-20" style={{ background: l.color }} />
                    <span className="text-[12px] text-white/50 font-medium">{l.text}</span>
                </div>
            ))}
            {visible < lines.length && (
                <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-white/20 w-10 flex-shrink-0">
                        Day {visible + 1}
                    </span>
                    <div className="flex-1 h-5 rounded-md bg-white/[0.04] overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-white/10 to-transparent animate-pulse" />
                    </div>
                </div>
            )}
        </div>
    )
}

// Avatars with tick animations cycling through
function VotingPreview() {
    const [ticked, setTicked] = useState(0)
    const people = [
        { name: "Yuki", gradient: "from-cyan-400 to-blue-500" },
        { name: "Sam", gradient: "from-purple-400 to-pink-500" },
        { name: "Maya", gradient: "from-amber-400 to-orange-500" },
        { name: "Priya", gradient: "from-emerald-400 to-teal-500" },
        { name: "Tom", gradient: "from-rose-400 to-red-500" },
    ]

    useEffect(() => {
        if (ticked >= people.length) {
            const reset = setTimeout(() => setTicked(0), 2000)
            return () => clearTimeout(reset)
        }
        const t = setTimeout(() => setTicked((n) => n + 1), 600)
        return () => clearTimeout(t)
    }, [ticked])

    return (
        <div className="space-y-2.5">
            {people.map((p, i) => (
                <div key={i} className={`flex items-center gap-3 py-2 px-3 rounded-2xl border transition-all duration-500 ${i < ticked ? "bg-white/[0.04] border-white/[0.07]" : "bg-transparent border-transparent"}`}>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {p.name[0]}
                    </div>
                    <span className={`text-sm flex-1 transition-colors duration-300 ${i < ticked ? "text-white/60" : "text-white/20"}`}>
                        {p.name}
                    </span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-400 ${i < ticked ? "bg-emerald-400/20 border border-emerald-400/40 scale-100" : "bg-white/5 border border-white/10 scale-75 opacity-40"}`}>
                        {i < ticked && <Check className="w-2.5 h-2.5 text-emerald-400" />}
                    </div>
                </div>
            ))}
        </div>
    )
}

// Pulsing rings for voice card
function VoiceRings() {
    return (
        <div className="relative flex items-center justify-center h-28">
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className="absolute rounded-full border border-[#C9A962]/20 animate-ping"
                    style={{
                        width: `${(i + 1) * 56}px`,
                        height: `${(i + 1) * 56}px`,
                        animationDuration: `${2 + i * 0.8}s`,
                        animationDelay: `${i * 0.4}s`,
                    }}
                />
            ))}
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9A962] to-[#E5C77D] flex items-center justify-center shadow-lg shadow-[#C9A962]/30">
                <Mic className="w-7 h-7 text-[#1a1a0e]" />
            </div>
        </div>
    )
}

export function BentoSection() {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) setIsVisible(true) },
            { threshold: 0.1 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={ref} className="relative py-28 overflow-hidden">
            <div className="absolute inset-0 bg-[#010306]" />
            {/* Ambient background */}
            <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(124,92,255,0.05),transparent_70%)] blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(0,212,255,0.04),transparent_70%)] blur-[100px] pointer-events-none" />

            <div className={`relative z-10 max-w-6xl mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.025] border border-white/[0.05] mb-6">
                        <Zap className="w-3.5 h-3.5 text-violet-400" />
                        <span className="text-[13px] text-white/35 font-medium">Why PayaGo</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-[-0.03em] mb-4">
                        Four problems.{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                            One app.
                        </span>
                    </h2>
                    <p className="text-white/30 text-lg max-w-md mx-auto">
                        Everything a group trip needs — nothing it doesn&apos;t.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* ── Large: 30-second itinerary ── */}
                    <div className="md:col-span-2 relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-3xl p-8 overflow-hidden group hover:border-cyan-500/20 transition-all duration-700 min-h-[320px] flex flex-col">
                        {/* Corner glow */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/[0.06] rounded-full blur-[100px] pointer-events-none" />
                        {/* Grid texture */}
                        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                        <div className="relative z-10 flex-1 flex flex-col">
                            {/* Header */}
                            <div className="flex items-center gap-2.5 mb-7">
                                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                    <span className="text-cyan-400/70 text-[11px] font-mono tracking-wider uppercase">AI generating itinerary</span>
                                </div>
                            </div>

                            {/* Animated lines */}
                            <div className="flex-1">
                                <ItineraryPreview />
                            </div>

                            {/* Bottom */}
                            <div className="mt-6 flex items-end justify-between">
                                <div>
                                    <div className="text-4xl font-black text-white tracking-tight">30 seconds</div>
                                    <div className="text-white/25 text-sm mt-0.5">from one sentence to a full 7-day plan</div>
                                </div>
                                <div className="text-white/[0.06] text-7xl font-black select-none leading-none">AI</div>
                            </div>
                        </div>
                    </div>

                    {/* ── Tall: Group voting ── (row-span-2) */}
                    <div className="md:row-span-2 relative bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.06] rounded-3xl p-7 overflow-hidden group hover:border-violet-500/20 transition-all duration-700 flex flex-col gap-6">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-violet-500/[0.06] blur-[80px] pointer-events-none" />

                        <div className="relative z-10">
                            <div className="w-10 h-10 rounded-2xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center mb-4">
                                <Users className="w-5 h-5 text-violet-400" />
                            </div>
                            <div className="text-xl font-bold text-white mb-1">Group voting</div>
                            <div className="text-white/30 text-sm">Everyone votes. No chaos.</div>
                        </div>

                        <div className="relative z-10 flex-1">
                            <VotingPreview />
                        </div>

                        {/* Bottom stat */}
                        <div className="relative z-10 mt-auto p-4 bg-violet-500/[0.08] border border-violet-500/20 rounded-2xl">
                            <div className="text-violet-300 text-sm font-semibold mb-2">Live progress</div>
                            <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-violet-300 transition-all duration-1000" style={{ width: "80%" }} />
                            </div>
                            <div className="text-white/25 text-xs mt-1.5">4 of 5 confirmed</div>
                        </div>
                    </div>

                    {/* ── Bottom row left: Free forever ── */}
                    <div className="relative bg-gradient-to-br from-[#C9A962]/[0.07] via-white/[0.02] to-white/[0.01] border border-[#C9A962]/[0.12] rounded-3xl p-7 overflow-hidden group hover:border-[#C9A962]/25 transition-all duration-700">
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#C9A962]/[0.08] rounded-full blur-[60px] pointer-events-none" />

                        <div className="relative z-10">
                            <div className="w-10 h-10 rounded-2xl bg-[#C9A962]/15 border border-[#C9A962]/20 flex items-center justify-center mb-5">
                                <CreditCard className="w-5 h-5 text-[#C9A962]" />
                            </div>
                            <div className="text-xl font-bold text-white mb-1">Free forever</div>
                            <div className="text-white/30 text-sm mb-5">No subscription. No card required.</div>

                            <div className="space-y-2">
                                {["AI trip planning", "Group coordination", "Split payments", "Smart assist"].map((feat) => (
                                    <div key={feat} className="flex items-center gap-2 text-sm">
                                        <Check className="w-3.5 h-3.5 text-[#C9A962] flex-shrink-0" />
                                        <span className="text-white/45">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="absolute bottom-5 right-6 text-[#C9A962]/[0.12] text-6xl font-black select-none">£0</div>
                    </div>

                    {/* ── Bottom row right: Voice input ── */}
                    <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-3xl p-7 overflow-hidden group hover:border-emerald-500/20 transition-all duration-700">
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C9A962]/[0.03] rounded-full blur-[60px]" />
                        </div>

                        <div className="relative z-10">
                            <div className="w-10 h-10 rounded-2xl bg-[#C9A962]/15 border border-[#C9A962]/20 flex items-center justify-center mb-5">
                                <Mic className="w-5 h-5 text-[#C9A962]" />
                            </div>
                            <div className="text-xl font-bold text-white mb-1">Just say it</div>
                            <div className="text-white/30 text-sm mb-5">No forms. No dropdowns. Just talk.</div>
                        </div>

                        <VoiceRings />

                        <div className="relative z-10 mt-4 bg-white/[0.03] border border-white/[0.05] rounded-2xl px-4 py-3">
                            <p className="text-white/40 text-xs italic leading-relaxed">
                                &ldquo;7 days in Japan for 4 friends, £3,200 budget, love street food&rdquo;
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom strip — 3 headline stats */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {[
                        { value: "50+", label: "Destinations at launch", icon: Globe, color: "#00D4FF" },
                        { value: "2–20", label: "Group size supported", icon: Users, color: "#7C5CFF" },
                        { value: "Apr 2026", label: "Public launch date", icon: Zap, color: "#4AD7A2" },
                    ].map((s) => (
                        <div key={s.label} className="flex items-center gap-4 bg-white/[0.025] border border-white/[0.05] rounded-2xl px-5 py-4 group hover:bg-white/[0.04] transition-all duration-300">
                            <s.icon className="w-5 h-5 flex-shrink-0" style={{ color: s.color }} />
                            <div>
                                <div className="text-white font-bold text-lg leading-none">{s.value}</div>
                                <div className="text-white/25 text-xs mt-1">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
