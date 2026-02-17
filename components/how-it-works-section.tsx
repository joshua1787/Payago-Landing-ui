"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Pencil, Users, CreditCard, CloudSun, Check, Landmark, UtensilsCrossed, Palette, GripVertical, Hotel, Plane, CloudRain, TrendingDown, Sun, Bell } from "lucide-react"

const steps = [
    {
        number: "01",
        icon: Sparkles,
        title: "AI Builds It",
        subtitle: "From one sentence",
        description: "Type your dream trip. Gemini AI returns a complete day-by-day itinerary with timings, costs, and locations — in under 30 seconds.",
        color: "#22d3ee",
        gradient: "from-cyan-500 to-cyan-400",
        mockContent: (
            <div className="space-y-3 p-5">
                <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400/50" />
                    <span className="text-cyan-400/80 text-[11px] font-mono tracking-wide">Generating itinerary...</span>
                </div>
                {["Day 1: Tokyo Arrival", "Day 2: Asakusa & Shibuya", "Day 3: Hakone day trip"].map((d, i) => (
                    <div key={i} className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: `${i * 0.2}s` }}>
                        <div className="w-5 h-5 rounded-md bg-cyan-500/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-cyan-400" />
                        </div>
                        <span className="text-white/50 text-xs font-medium">{d}</span>
                    </div>
                ))}
                <div className="mt-4 pt-3 border-t border-white/[0.04]">
                    <div className="flex items-center gap-2 text-[10px] text-white/15 font-mono">
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-500/40 to-transparent rounded-full" />
                        <span>3 of 7 days generated</span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        number: "02",
        icon: Pencil,
        title: "Edit & Refine",
        subtitle: "Drag, swap, or ask AI",
        description: "Tap any activity to swap it, ask AI for alternatives, or drag to reorder. Your itinerary, your rules.",
        color: "#a78bfa",
        gradient: "from-violet-500 to-purple-400",
        mockContent: (
            <div className="space-y-2.5 p-5">
                {[
                    { name: "Senso-ji Temple", time: "9:00 AM", Icon: Landmark, iconColor: "#f59e0b" },
                    { name: "Tsukiji Market", time: "12:30 PM", Icon: UtensilsCrossed, iconColor: "#f43f5e", dragging: true },
                    { name: "teamLab", time: "3:00 PM", Icon: Palette, iconColor: "#8b5cf6" },
                ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 rounded-xl p-3 text-xs transition-all ${item.dragging ? 'bg-violet-500/15 border border-violet-500/25 scale-[1.02] translate-x-1 shadow-lg shadow-violet-500/10' : 'bg-white/[0.025] border border-white/[0.05]'}`}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.04]">
                            <item.Icon className="w-3.5 h-3.5" style={{ color: item.iconColor }} />
                        </div>
                        <div className="flex-1">
                            <div className="text-white/80 font-medium text-[12px]">{item.name}</div>
                            <div className="text-white/20 text-[10px] mt-0.5">{item.time}</div>
                        </div>
                        {item.dragging && <GripVertical className="w-3.5 h-3.5 text-violet-400/60" />}
                    </div>
                ))}
            </div>
        ),
    },
    {
        number: "03",
        icon: Users,
        title: "Share with Group",
        subtitle: "Everyone edits live",
        description: "Send a link. Friends join and see every change in real-time. Vote on activities, comment, and chat — all in one place.",
        color: "#60a5fa",
        gradient: "from-blue-500 to-blue-400",
        mockContent: (
            <div className="p-5 space-y-4">
                <div className="flex -space-x-2.5 mb-1">
                    {[
                        { gradient: "from-cyan-400 to-blue-500", glow: "shadow-cyan-500/20" },
                        { gradient: "from-purple-400 to-pink-500", glow: "shadow-purple-500/20" },
                        { gradient: "from-amber-400 to-orange-500", glow: "shadow-amber-500/20" },
                        { gradient: "from-emerald-400 to-teal-500", glow: "shadow-emerald-500/20" },
                    ].map((g, i) => (
                        <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${g.gradient} ring-[2px] ring-[#0a0f1a] shadow-lg ${g.glow}`} />
                    ))}
                </div>
                <div className="text-white/40 text-[11px] font-medium">4 members editing live</div>
                <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px]">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
                        <span className="text-emerald-400/60">Sarah voted on Senso-ji</span>
                        <Check className="w-3 h-3 text-emerald-400/40 ml-auto" />
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
                        <span className="text-blue-400/60">Mike added Shibuya Crossing</span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        number: "04",
        icon: CreditCard,
        title: "Book Everything",
        subtitle: "One checkout, zero extra apps",
        description: "Hotels via Booking.com. Flights via Kiwi. Activities via Viator. Stripe payments. Confirmations drop into your itinerary.",
        color: "#34d399",
        gradient: "from-emerald-500 to-emerald-400",
        mockContent: (
            <div className="p-5 space-y-2.5">
                {[
                    { name: "Aman Tokyo", type: "Hotel", price: "£350/night", Icon: Hotel, iconColor: "#34d399" },
                    { name: "LHR → NRT", type: "Flight", price: "£489", Icon: Plane, iconColor: "#60a5fa" },
                ].map((b, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/[0.025] border border-white/[0.05] rounded-xl p-3.5 text-xs">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/[0.06]">
                            <b.Icon className="w-4 h-4" style={{ color: b.iconColor }} />
                        </div>
                        <div className="flex-1">
                            <div className="text-white/80 font-semibold text-[12px]">{b.name}</div>
                            <div className="text-white/20 text-[10px] mt-0.5">{b.type}</div>
                        </div>
                        <span className="text-emerald-400 font-bold text-[12px]">{b.price}</span>
                    </div>
                ))}
                <div className="flex items-center justify-center gap-1.5 mt-2 text-emerald-400/30 text-[10px] font-mono">
                    <CreditCard className="w-3 h-3" />
                    Powered by Stripe
                </div>
            </div>
        ),
    },
    {
        number: "05",
        icon: CloudSun,
        title: "Smart Assist",
        subtitle: "Proactive during your trip",
        description: "Weather alerts. Price drop notifications. Morning briefings. Arrival tips. PayaGo stays useful the entire trip.",
        color: "#fbbf24",
        gradient: "from-amber-500 to-yellow-400",
        mockContent: (
            <div className="p-5 space-y-2.5">
                {[
                    { Icon: CloudRain, text: "Rain tomorrow — indoor alternatives ready", color: "text-blue-400/70", iconColor: "#60a5fa", bg: "bg-blue-500/10" },
                    { Icon: TrendingDown, text: "Hotel price dropped £45/night", color: "text-emerald-400/70", iconColor: "#34d399", bg: "bg-emerald-500/10" },
                    { Icon: Sun, text: "Day 3: Clear skies, 24°C", color: "text-amber-400/70", iconColor: "#fbbf24", bg: "bg-amber-500/10" },
                ].map((a, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/[0.025] border border-white/[0.05] rounded-xl p-3 text-xs">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${a.bg}`}>
                            <a.Icon className="w-3.5 h-3.5" style={{ color: a.iconColor }} />
                        </div>
                        <span className={`${a.color} text-[11px] font-medium`}>{a.text}</span>
                    </div>
                ))}
            </div>
        ),
    },
]

export function HowItWorksSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [activeStep, setActiveStep] = useState(0)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) setIsVisible(true) },
            { threshold: 0.1 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!isVisible) return
        const interval = setInterval(() => {
            setActiveStep((s) => (s + 1) % steps.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [isVisible])

    const active = steps[activeStep]

    return (
        <section ref={sectionRef} id="how-it-works" className="relative py-32 sm:py-40 overflow-hidden">
            <div className="absolute inset-0 bg-[#010306]" />

            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.04),transparent_70%)] blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.03),transparent_70%)] blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.025] border border-white/[0.05] backdrop-blur-xl mb-6">
                        <span className="text-[13px] text-white/35 font-medium">Five steps, one app</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] mb-5">
                        From idea to{" "}
                        <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">boarding pass</span>
                    </h2>
                    <p className="text-[17px] text-white/20 max-w-md mx-auto leading-relaxed">
                        The entire journey in one seamless flow.
                    </p>
                </div>

                {/* Interactive Step View */}
                <div className={`grid lg:grid-cols-[1fr_400px] gap-10 items-start transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>

                    {/* Left: Step list */}
                    <div className="space-y-1.5">
                        {steps.map((step, i) => {
                            const Icon = step.icon
                            const isActive = i === activeStep
                            return (
                                <button
                                    key={step.number}
                                    onClick={() => setActiveStep(i)}
                                    className={`w-full text-left group relative flex items-start gap-4 rounded-2xl p-5 transition-all duration-500 ${isActive
                                        ? 'bg-white/[0.03] border border-white/[0.07] shadow-lg shadow-black/10'
                                        : 'border border-transparent hover:bg-white/[0.015]'
                                        }`}
                                >
                                    <div
                                        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100'}`}
                                        style={{
                                            background: isActive ? `${step.color}12` : 'rgba(255,255,255,0.02)',
                                            border: `1px solid ${isActive ? step.color + '25' : 'rgba(255,255,255,0.04)'}`,
                                            boxShadow: isActive ? `0 0 20px ${step.color}08` : 'none',
                                        }}
                                    >
                                        <Icon className="w-[18px] h-[18px]" style={{ color: isActive ? step.color : 'rgba(255,255,255,0.15)' }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-0.5">
                                            <span className={`text-[15px] font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/30'}`}>
                                                {step.title}
                                            </span>
                                            <span className={`text-[10px] font-mono transition-colors duration-300 ${isActive ? 'text-white/20' : 'text-white/8'}`}>
                                                {step.number}
                                            </span>
                                        </div>
                                        <p className={`text-[13px] leading-relaxed transition-all duration-500 overflow-hidden ${isActive ? 'text-white/35 max-h-24 opacity-100 mt-1.5' : 'max-h-0 opacity-0'}`}>
                                            {step.description}
                                        </p>
                                    </div>
                                    {/* Progress */}
                                    {isActive && (
                                        <div className="absolute bottom-0 left-5 right-5 h-[2px] overflow-hidden rounded-full bg-white/[0.03]">
                                            <div className="h-full rounded-full animate-step-progress opacity-60" style={{ background: `linear-gradient(90deg, ${step.color}, ${step.color}80)` }} />
                                        </div>
                                    )}
                                </button>
                            )
                        })}
                    </div>

                    {/* Right: Mock preview */}
                    <div className="hidden lg:block sticky top-28">
                        <div className="relative">
                            {/* Multi-layer glow */}
                            <div className="absolute -inset-6 rounded-3xl blur-[60px] opacity-15 transition-colors duration-700" style={{ background: active.color }} />
                            <div className="absolute -inset-3 rounded-3xl blur-[30px] opacity-10 transition-colors duration-700" style={{ background: active.color }} />

                            <div className="relative bg-gradient-to-b from-white/[0.04] to-white/[0.01] rounded-2xl p-[1px] shadow-2xl shadow-black/30">
                                <div className="bg-[#080c14] rounded-2xl overflow-hidden min-h-[300px]">
                                    {/* Window chrome */}
                                    <div className="flex items-center gap-2 px-5 pt-5 pb-3">
                                        <div className="w-[6px] h-[6px] rounded-full bg-white/[0.06]" />
                                        <div className="w-[6px] h-[6px] rounded-full bg-white/[0.06]" />
                                        <div className="w-[6px] h-[6px] rounded-full bg-white/[0.06]" />
                                        <span className="ml-3 text-white/10 text-[10px] font-mono tracking-wider">{active.subtitle}</span>
                                    </div>
                                    <div className="transition-all duration-500">
                                        {active.mockContent}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
