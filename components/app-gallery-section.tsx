"use client"

import { useState } from "react"
import { Mic, Sparkles, Users, CreditCard, MapPin, Star, ChevronRight, Check, Plane, Hotel, Clock, Bell, Zap, Landmark, Utensils, Palette, Building2 } from "lucide-react"

const SCREENS = [
    {
        id: "voice",
        label: "Voice Input",
        icon: Mic,
        color: "#C9A962",
        description: "Speak your trip in one sentence",
        phone: (
            <div className="w-full h-full bg-[#07101E] rounded-[28px] overflow-hidden flex flex-col relative">
                <div className="h-6 bg-[#04090F] flex items-center justify-center">
                    <div className="w-16 h-1.5 bg-white/20 rounded-full" />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full bg-[#C9A962]/5 animate-ping" style={{ animationDuration: "3s" }} />
                        <div className="absolute w-36 h-36 rounded-full bg-[#C9A962]/8 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A962] to-[#E5C77D] flex items-center justify-center mb-5 shadow-lg shadow-[#C9A962]/20">
                            <Mic className="w-8 h-8 text-[#1a1a0e]" />
                        </div>
                        <div className="text-white font-semibold text-center text-sm mb-2">Listening...</div>
                        <div className="flex gap-0.5 mb-5">
                            {[3, 5, 8, 6, 4, 7, 5, 3, 6, 8, 4].map((h, i) => (
                                <div key={i} className="w-1 rounded-full bg-[#C9A962]" style={{ height: `${h * 3}px`, opacity: 0.6 + (i % 3) * 0.15 }} />
                            ))}
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 max-w-[180px]">
                            <p className="text-white/70 text-xs text-center leading-relaxed italic">
                                &ldquo;7 days in Tokyo for 4 friends, £3,200 budget&rdquo;
                            </p>
                        </div>
                    </div>
                </div>
                <div className="px-5 pb-6">
                    <div className="bg-[#C9A962]/20 border border-[#C9A962]/30 rounded-xl py-3 text-center">
                        <span className="text-[#C9A962] font-semibold text-sm">Tap to speak your trip</span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "itinerary",
        label: "AI Itinerary",
        icon: Sparkles,
        color: "#7C5CFF",
        description: "Day-by-day plan built in 30 seconds",
        phone: (
            <div className="w-full h-full bg-[#07101E] rounded-[28px] overflow-hidden flex flex-col relative">
                <div className="h-6 bg-[#04090F] flex items-center justify-center">
                    <div className="w-16 h-1.5 bg-white/20 rounded-full" />
                </div>
                {/* Header */}
                <div className="px-4 pt-3 pb-2 border-b border-white/5">
                    <div className="flex items-center justify-between mb-0.5">
                        <h3 className="text-white font-bold text-sm">Tokyo · Day 2</h3>
                        <span className="text-[#7C5CFF] text-[10px] font-semibold bg-[#7C5CFF]/15 px-2 py-0.5 rounded-full">7 days planned</span>
                    </div>
                    <p className="text-white/35 text-[10px]">Apr 13 · Balanced option · £780/person</p>
                </div>
                {/* Timeline */}
                <div className="flex-1 overflow-hidden px-4 pt-3">
                    <div className="relative space-y-2">
                        {/* vertical line */}
                        <div className="absolute left-[15px] top-3 bottom-3 w-[1px] bg-white/8" />
                        {[
                            { time: "9:00 AM", name: "Senso-ji Temple", Icon: Landmark, type: "Culture", color: "#7C5CFF", done: true },
                            { time: "12:30 PM", name: "Tsukiji Outer Market", Icon: Utensils, type: "Food", color: "#C9A962", done: true },
                            { time: "3:00 PM", name: "teamLab Borderless", Icon: Palette, type: "Experience", color: "#00D4FF", done: false },
                            { time: "7:30 PM", name: "Shibuya Sky Rooftop", Icon: Building2, type: "Views", color: "#4AD7A2", done: false },
                        ].map((item) => (
                            <div key={item.name} className="flex items-center gap-2.5 relative">
                                {/* dot */}
                                <div className="w-[9px] h-[9px] rounded-full border-2 flex-shrink-0 z-10"
                                    style={{ borderColor: item.color, background: item.done ? item.color : "#07101E" }} />
                                <div className={`flex-1 flex items-center gap-2 p-2.5 rounded-xl border ${item.done ? "bg-white/[0.025] border-white/5" : "bg-white/[0.04] border-white/8"}`}>
                                    <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center" style={{ color: item.color }}>
                                        <item.Icon className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-[11px] font-semibold truncate leading-tight">{item.name}</p>
                                        <p className="text-white/35 text-[9px] mt-0.5">{item.time}</p>
                                    </div>
                                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0"
                                        style={{ color: item.color, background: item.color + "18" }}>{item.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Price Drop Toast — pinned inside the phone */}
                <div className="mx-3 mb-3 mt-2 flex items-center gap-3 bg-[#1A1008] border border-[#C9A962]/40 rounded-2xl px-3 py-2.5 shadow-lg shadow-black/40"
                    style={{ boxShadow: "0 0 20px rgba(201,169,98,0.15)" }}>
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C9A962] to-[#E5C77D] flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-[#1a1a0e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[#C9A962] text-[10px] font-bold leading-tight">Price Drop Alert!</p>
                        <p className="text-white/60 text-[9px] leading-tight truncate">Cerulean Tower · Save £45/night</p>
                    </div>
                    <span className="text-[#4AD7A2] text-[9px] font-bold bg-[#4AD7A2]/15 px-1.5 py-0.5 rounded-full flex-shrink-0">Lock in</span>
                </div>
            </div>
        ),
    },
    {
        id: "voting",
        label: "Group Votes",
        icon: Users,
        color: "#00D4FF",
        description: "Everyone votes — no WhatsApp threads",
        phone: (
            <div className="w-full h-full bg-[#07101E] rounded-[28px] overflow-hidden flex flex-col">
                <div className="h-6 bg-[#04090F] flex items-center justify-center">
                    <div className="w-16 h-1.5 bg-white/20 rounded-full" />
                </div>
                <div className="flex-1 px-4 pt-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-white font-bold text-sm">Group is voting</h3>
                            <p className="text-white/40 text-xs">Tokyo trip · Balanced option</p>
                        </div>
                        <div className="text-right">
                            <div className="text-[#00D4FF] text-xs font-bold">3/4 voted</div>
                        </div>
                    </div>
                    <div className="space-y-2.5">
                        {[
                            { name: "You", vote: "in", avatar: "J" },
                            { name: "Sarah K.", vote: "in", avatar: "S" },
                            { name: "Marcus T.", vote: "in", avatar: "M" },
                            { name: "Priya R.", vote: "pending", avatar: "P" },
                        ].map((person) => (
                            <div key={person.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#00D4FF] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                    {person.avatar}
                                </div>
                                <span className="text-white/70 text-xs flex-1">{person.name}</span>
                                {person.vote === "in" ? (
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-[#4AD7A2] bg-[#4AD7A2]/15 flex items-center gap-1"><Check className="w-2.5 h-2.5" /> I&apos;m In</span>
                                ) : (
                                    <span className="text-xs text-white/30 flex items-center gap-1">
                                        <Bell className="w-3 h-3" /> Reminded
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-3 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/20">
                        <div className="text-[#00D4FF] text-xs font-semibold mb-1">Auto-reminder sent</div>
                        <p className="text-white/50 text-[10px]">Priya will be reminded again in 12 hours.</p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "payment",
        label: "Split Payment",
        icon: CreditCard,
        color: "#4AD7A2",
        description: "Everyone pays their share — no chasing",
        phone: (
            <div className="w-full h-full bg-[#07101E] rounded-[28px] overflow-hidden flex flex-col">
                <div className="h-6 bg-[#04090F] flex items-center justify-center">
                    <div className="w-16 h-1.5 bg-white/20 rounded-full" />
                </div>
                <div className="flex-1 px-4 pt-4">
                    <h3 className="text-white font-bold text-sm mb-1">Payment request sent</h3>
                    <p className="text-white/40 text-xs mb-4">Each person pays their own share</p>
                    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-white/60 text-xs">Your share</span>
                            <span className="text-white font-bold">£780</span>
                        </div>
                        <div className="space-y-1.5 text-xs text-white/40">
                            <div className="flex justify-between"><span>Flights (ANA direct)</span><span>£420</span></div>
                            <div className="flex justify-between"><span>Hotel (7 nights)</span><span>£280</span></div>
                            <div className="flex justify-between"><span>Activities (5 booked)</span><span>£80</span></div>
                        </div>
                    </div>
                    <div className="space-y-2 mb-4">
                        {[
                            { name: "You", paid: true, amount: "£780" },
                            { name: "Sarah", paid: true, amount: "£780" },
                            { name: "Marcus", paid: false, amount: "£780" },
                            { name: "Priya", paid: false, amount: "£780" },
                        ].map((p) => (
                            <div key={p.name} className="flex items-center justify-between text-xs">
                                <span className="text-white/60">{p.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-white/40">{p.amount}</span>
                                    {p.paid ? (
                                        <span className="text-[#4AD7A2] flex items-center gap-0.5"><Check className="w-3 h-3" /> Paid</span>
                                    ) : (
                                        <span className="text-white/30">Pending</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-[#4AD7A2]/10 border border-[#4AD7A2]/20 rounded-xl py-3 text-center">
                        <span className="text-[#4AD7A2] text-xs font-semibold">Auto-booking when all 4 pay</span>
                    </div>
                </div>
            </div>
        ),
    },
]

export function AppGallerySection() {
    const [active, setActive] = useState(0)
    const screen = SCREENS[active]

    return (
        <section className="relative py-24 overflow-hidden border-t border-slate-100 bg-[#F0EEFF]">
            <div className="absolute inset-0">
                <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-[#7C5CFF]/10 rounded-full blur-[200px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 mb-6">
                        <Zap className="w-4 h-4 text-[#00D4FF]" />
                        <span className="text-sm font-medium text-[#00D4FF]">The app — launching April 2026</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                        Built for how groups{" "}
                        <span className="bg-gradient-to-r from-[#00D4FF] to-[#7C5CFF] bg-clip-text text-transparent">
                            actually travel
                        </span>
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        From voice input to fully booked — every step designed to eliminate the friction of group travel.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left — phone mockup */}
                    <div className="flex justify-center">
                        <div className="relative">
                            {/* Phone frame */}
                            <div className="w-[240px] h-[480px] bg-[#0D1B2A] rounded-[32px] border-2 border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden relative">
                                <div className="absolute inset-0 rounded-[30px] overflow-hidden">
                                    {screen.phone}
                                </div>
                            </div>
                            {/* Glow */}
                            <div className="absolute -inset-8 rounded-full blur-[60px] opacity-20 -z-10" style={{ background: screen.color }} />
                        </div>
                    </div>

                    {/* Right — feature list */}
                    <div>
                        <div className="space-y-3 mb-8">
                            {SCREENS.map((s, i) => {
                                const Icon = s.icon
                                return (
                                    <button
                                        key={s.id}
                                        onClick={() => setActive(i)}
                                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${active === i ? "bg-white border-opacity-40 shadow-sm" : "bg-white border-violet-100 hover:bg-violet-50"}`}
                                        style={active === i ? { borderColor: s.color + "60" } : {}}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.color + "20" }}>
                                                <Icon className="w-5 h-5" style={{ color: s.color }} />
                                            </div>
                                            <div className="flex-1">
                                                <div className={`font-semibold text-sm ${active === i ? "text-slate-900" : "text-slate-600"}`}>{s.label}</div>
                                                <div className="text-slate-400 text-xs mt-0.5">{s.description}</div>
                                            </div>
                                            <ChevronRight className={`w-4 h-4 transition-transform ${active === i ? "rotate-90" : ""}`} style={{ color: active === i ? s.color : "rgba(100,116,139,0.4)" }} />
                                        </div>
                                    </button>
                                )
                            })}
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: "30s", label: "To build a trip" },
                                { value: "Free", label: "For travellers" },
                                { value: "Apr 26", label: "Launch date" },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-white border border-violet-100 rounded-xl p-3 text-center">
                                    <div className="text-slate-900 font-bold text-lg">{stat.value}</div>
                                    <div className="text-slate-400 text-xs mt-0.5">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
