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
                    <span className="text-[11px] font-mono text-slate-300 w-10 flex-shrink-0">{l.time}</span>
                    <div className="flex-1 h-[1px] opacity-30" style={{ background: l.color }} />
                    <span className="text-[12px] text-slate-600 font-medium">{l.text}</span>
                </div>
            ))}
            {visible < lines.length && (
                <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-slate-300 w-10 flex-shrink-0">
                        Day {visible + 1}
                    </span>
                    <div className="flex-1 h-5 rounded-md bg-slate-100 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-slate-200 to-transparent animate-pulse" />
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
                <div key={i} className={`flex items-center gap-3 py-2 px-3 rounded-2xl border transition-all duration-500 ${i < ticked ? "bg-slate-50 border-slate-200" : "bg-transparent border-transparent"}`}>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {p.name[0]}
                    </div>
                    <span className={`text-sm flex-1 transition-colors duration-300 ${i < ticked ? "text-slate-600" : "text-slate-300"}`}>
                        {p.name}
                    </span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-400 ${i < ticked ? "bg-emerald-50 border border-emerald-200 scale-100" : "bg-slate-100 border border-slate-200 scale-75 opacity-40"}`}>
                        {i < ticked && <Check className="w-2.5 h-2.5 text-emerald-500" />}
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
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9A962] to-[#E5C77D] flex items-center justify-center shadow-lg shadow-[#C9A962]/20">
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
            <div className="absolute inset-0 bg-[#F4F6FB]" />
            <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(124,92,255,0.10),transparent_70%)] blur-[100px] pointer-events-none" />

            <div className={`relative z-10 max-w-6xl mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                        <Zap className="w-3.5 h-3.5 text-violet-500" />
                        <span className="text-[13px] text-slate-500 font-medium">Why PayaGo</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-[-0.03em] mb-4">
                        Four problems.{" "}
                        <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
                            One app.
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-md mx-auto">
                        Everything a group trip needs — nothing it doesn&apos;t.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* ── Large: 30-second itinerary — HERO CARD ── */}
                    <div className="md:col-span-2 relative border-2 border-cyan-300 rounded-3xl overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-200/60 transition-all duration-500 min-h-[320px] flex flex-col" style={{ background: "linear-gradient(145deg, #ddf6ff 0%, #edfbff 35%, white 100%)" }}>
                        {/* Dominant header */}
                        <div className="px-7 pt-7 pb-5" style={{ background: "linear-gradient(135deg, #00D4FF28 0%, #00D4FF0A 100%)" }}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/40">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-cyan-700 text-xs font-black uppercase tracking-widest">Core Feature</div>
                                        <div className="text-slate-900 font-bold text-base">AI Itinerary Generation</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500 shadow-md shadow-cyan-500/30">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    <span className="text-white text-[10px] font-bold uppercase tracking-wider">Live</span>
                                </div>
                            </div>
                        </div>

                        <div className="px-7 pb-7 flex-1 flex flex-col">
                            <div className="flex-1">
                                <ItineraryPreview />
                            </div>

                            <div className="mt-6 flex items-end justify-between">
                                <div>
                                    <div className="text-5xl font-black text-slate-900 tracking-tight leading-none">30s</div>
                                    <div className="text-cyan-600 text-sm mt-1.5 font-semibold">from one sentence to a full 7-day plan</div>
                                </div>
                                <div className="text-cyan-100 text-7xl font-black select-none leading-none">AI</div>
                            </div>
                        </div>
                    </div>

                    {/* ── Tall: Group voting ── */}
                    <div className="md:row-span-2 relative border-2 border-violet-200 rounded-3xl overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-100/50 transition-all duration-500 flex flex-col" style={{ background: "linear-gradient(145deg, #ede9ff 0%, #f5f3ff 40%, white 100%)" }}>
                        {/* Colored header */}
                        <div className="px-7 pt-7 pb-5" style={{ background: "linear-gradient(135deg, #7C5CFF22 0%, #7C5CFF08 100%)" }}>
                            <div className="w-10 h-10 rounded-2xl bg-violet-500 flex items-center justify-center mb-4 shadow-md shadow-violet-500/30">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-xl font-bold text-slate-900 mb-1">Group voting</div>
                            <div className="text-violet-500 text-sm font-medium">Everyone votes. No chaos.</div>
                        </div>

                        <div className="px-7 flex-1">
                            <VotingPreview />
                        </div>

                        <div className="px-7 pb-7 mt-4">
                            <div className="p-4 bg-violet-500 rounded-2xl shadow-lg shadow-violet-500/25">
                                <div className="text-white text-sm font-semibold mb-2">Live progress</div>
                                <div className="w-full bg-violet-400/40 rounded-full h-2 overflow-hidden">
                                    <div className="h-full rounded-full bg-white transition-all duration-1000" style={{ width: "80%" }} />
                                </div>
                                <div className="text-violet-200 text-xs mt-1.5">4 of 5 confirmed</div>
                            </div>
                        </div>
                    </div>

                    {/* ── Bottom row left: Free forever ── */}
                    <div className="relative border-2 border-amber-200 rounded-3xl overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-500" style={{ background: "linear-gradient(145deg, #fef9ec 0%, #fffbf0 40%, white 100%)" }}>
                        {/* Colored header strip */}
                        <div className="px-7 pt-7 pb-5" style={{ background: "linear-gradient(135deg, #C9A96222 0%, #C9A96208 100%)" }}>
                            <div className="w-10 h-10 rounded-2xl bg-[#C9A962] flex items-center justify-center mb-4 shadow-md shadow-amber-400/30">
                                <CreditCard className="w-5 h-5 text-[#1a1a0e]" />
                            </div>
                            <div className="text-xl font-bold text-slate-900 mb-1">Free forever</div>
                            <div className="text-amber-700 text-sm font-medium">No subscription. No card required.</div>
                        </div>

                        <div className="px-7 pb-7">
                            <div className="space-y-2 mb-4">
                                {["AI trip planning", "Group coordination", "Split payments", "Smart assist"].map((feat) => (
                                    <div key={feat} className="flex items-center gap-2 text-sm">
                                        <div className="w-5 h-5 rounded-full bg-[#C9A962] flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-[#1a1a0e]" />
                                        </div>
                                        <span className="text-slate-600 font-medium">{feat}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="text-right text-6xl font-black select-none" style={{ color: "#C9A96230" }}>£0</div>
                        </div>
                    </div>

                    {/* ── Bottom row right: Voice input ── */}
                    <div className="relative border-2 border-rose-200 rounded-3xl overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-500" style={{ background: "linear-gradient(145deg, #fff1f2 0%, #fff5f5 40%, white 100%)" }}>
                        {/* Colored header strip */}
                        <div className="px-7 pt-7 pb-5" style={{ background: "linear-gradient(135deg, #f43f5e22 0%, #f43f5e08 100%)" }}>
                            <div className="w-10 h-10 rounded-2xl bg-rose-500 flex items-center justify-center mb-4 shadow-md shadow-rose-500/30">
                                <Mic className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-xl font-bold text-slate-900 mb-1">Just say it</div>
                            <div className="text-rose-500 text-sm font-medium">No forms. No dropdowns. Just talk.</div>
                        </div>

                        <div className="px-7 pb-7">
                            <VoiceRings />

                            <div className="mt-4 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3">
                                <p className="text-rose-400 text-xs italic leading-relaxed">
                                    &ldquo;7 days in Japan for 4 friends, £3,200 budget, love street food&rdquo;
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom strip — 3 headline stats */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {[
                        { value: "50+", label: "Destinations at launch", icon: Globe, color: "#00D4FF", bg: "#e0f9ff", border: "#bae6fd" },
                        { value: "2–20", label: "Group size supported", icon: Users, color: "#7C5CFF", bg: "#ede9ff", border: "#c4b5fd" },
                        { value: "Apr 2026", label: "Public launch date", icon: Zap, color: "#059669", bg: "#d1fae5", border: "#6ee7b7" },
                    ].map((s) => (
                        <div key={s.label} className="flex items-center gap-4 rounded-2xl px-5 py-4 border-2 transition-all duration-300 hover:shadow-md hover:scale-[1.02]" style={{ background: s.bg, borderColor: s.border }}>
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.color + "25" }}>
                                <s.icon className="w-5 h-5" style={{ color: s.color }} />
                            </div>
                            <div>
                                <div className="font-black text-lg leading-none" style={{ color: s.color }}>{s.value}</div>
                                <div className="text-slate-500 text-xs mt-1">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
