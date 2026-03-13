"use client"

import { useState, useEffect } from "react"
import { Mic, Sparkles, Plane, Hotel, MapPin, Clock, Users, Star, ArrowRight, ChevronRight, Check } from "lucide-react"

const DEMO_TRIPS = [
    {
        prompt: "7 days in Tokyo for 4 friends, £3,200 budget, love street food and temples",
        destination: "Tokyo, Japan",
        dates: "12–19 Apr 2026",
        travelers: 4,
        options: [
            {
                type: "Budget",
                color: "#4AD7A2",
                perPerson: "£620",
                total: "£2,480",
                flight: "London Heathrow → Tokyo Narita — British Airways, 1 stop, 14h 20m",
                hotel: "Shinjuku Granbell Hotel ★★★★ — 4.6/5 (2,847 reviews)",
                highlights: ["Senso-ji Temple at dawn", "Tsukiji Outer Market breakfast", "Shibuya Crossing & Harajuku", "Akihabara electronics district", "TeamLab Borderless digital art"],
            },
            {
                type: "Balanced",
                color: "#C9A962",
                perPerson: "£780",
                total: "£3,120",
                flight: "London Heathrow → Tokyo Haneda — ANA, direct, 11h 45m",
                hotel: "Cerulean Tower Tokyu Hotel ★★★★★ — 4.8/5 (1,203 reviews)",
                highlights: ["Private tea ceremony in Yanaka", "Tsukiji breakfast +築地 cooking class", "Day trip to Nikko Shrines", "Shinjuku izakaya bar crawl", "Teamlab Planets + Odaiba"],
                recommended: true,
            },
            {
                type: "Premium",
                color: "#7C5CFF",
                perPerson: "£980",
                total: "£3,920",
                flight: "London Heathrow → Tokyo Haneda — JAL Business Class, direct, 11h 45m",
                hotel: "Park Hyatt Tokyo ★★★★★ — 4.9/5 (876 reviews) — Lost in Translation views",
                highlights: ["Private sushi masterclass with chef", "Bullet train to Kyoto (day trip)", "Exclusive sumo morning practice visit", "Michelin-starred dinner in Ginza", "Private Tsukiji market tour"],
            },
        ]
    },
    {
        prompt: "Weekend Barcelona trip for 6 friends, around £400 each, beach and nightlife",
        destination: "Barcelona, Spain",
        dates: "3–5 May 2026",
        travelers: 6,
        options: [
            {
                type: "Budget",
                color: "#4AD7A2",
                perPerson: "£285",
                total: "£1,710",
                flight: "London Gatwick → Barcelona El Prat — EasyJet, direct, 2h 10m",
                hotel: "Generator Barcelona ★★★★ — 4.5/5 (4,201 reviews) — Gracia district",
                highlights: ["Barceloneta beach day", "Free walking tour Gothic Quarter", "La Boqueria market lunch", "Parc Güell (free early morning)", "Ramblas → El Born nightlife"],
            },
            {
                type: "Balanced",
                color: "#C9A962",
                perPerson: "£380",
                total: "£2,280",
                flight: "London Heathrow → Barcelona El Prat — British Airways, direct, 2h 05m",
                hotel: "Hotel Arts Barcelona ★★★★★ — 4.7/5 (2,109 reviews) — beachfront",
                highlights: ["Sagrada Família skip-the-line tickets", "Barceloneta beach + water sports", "Camp Nou stadium tour", "Seafood dinner in Barceloneta", "Nightclub entry at Opium Barcelona"],
                recommended: true,
            },
            {
                type: "Premium",
                color: "#7C5CFF",
                perPerson: "£520",
                total: "£3,120",
                flight: "London City → Barcelona — Vueling Business, direct, 2h 15m",
                hotel: "W Barcelona ★★★★★ — 4.8/5 (987 reviews) — sail-shaped tower, beachfront",
                highlights: ["Private Gaudí architecture tour", "Catamaran sunset cruise", "Michelin tapas tasting menu", "VIP entry + table at Pacha Barcelona", "Day trip to Sitges by private transfer"],
            },
        ]
    },
    {
        prompt: "10 days in Lisbon & Algarve for 2 people, £2,800 total, mix of city and beach",
        destination: "Lisbon + Algarve, Portugal",
        dates: "20–30 Jun 2026",
        travelers: 2,
        options: [
            {
                type: "Budget",
                color: "#4AD7A2",
                perPerson: "£890",
                total: "£1,780",
                flight: "London Stansted → Lisbon — Ryanair, direct, 2h 30m",
                hotel: "LX Boutique Hotel ★★★★ — 4.6/5 (1,876 reviews) — Alfama views",
                highlights: ["Alfama & Mouraria walking tour", "Sintra palaces day trip", "Cascais beach day", "Train to Algarve (Lagos)", "Ponta da Piedade cliffs boat tour"],
            },
            {
                type: "Balanced",
                color: "#C9A962",
                perPerson: "£1,150",
                total: "£2,300",
                flight: "London Heathrow → Lisbon — TAP Portugal, direct, 2h 25m",
                hotel: "Bairro Alto Hotel ★★★★★ — 4.8/5 (934 reviews) + Algarve resort",
                highlights: ["Private Fado dinner in Alfama", "Sintra + Cascais private driver day", "Scenic train to Algarve", "Benagil sea cave boat tour", "Rooftop sundowners in Tavira"],
                recommended: true,
            },
            {
                type: "Premium",
                color: "#7C5CFF",
                perPerson: "£1,650",
                total: "£3,300",
                flight: "London Heathrow → Lisbon — TAP Business Class, direct",
                hotel: "Bairro Alto Hotel + Vila Vita Parc Resort & Spa, Algarve",
                highlights: ["Private wine tasting at Setúbal estate", "Helicopter transfer Lisbon → Algarve", "Private yacht charter Benagil caves", "Michelin dinner at Ocean Restaurant", "Sunrise yoga & spa at Vila Vita"],
            },
        ]
    }
]

const STEPS = [
    { label: "Understanding your trip...", duration: 600 },
    { label: "Searching live flights...", duration: 700 },
    { label: "Filtering hotels (4★+)...", duration: 600 },
    { label: "Finding best activities...", duration: 500 },
    { label: "Building 3 itinerary options...", duration: 700 },
]

export function TripDemoWidget() {
    const [selectedTrip, setSelectedTrip] = useState(0)
    const [phase, setPhase] = useState<"idle" | "generating" | "done">("idle")
    const [stepIndex, setStepIndex] = useState(0)
    const [stepProgress, setStepProgress] = useState(0)
    const [selectedOption, setSelectedOption] = useState(1) // default to Balanced

    const totalDuration = STEPS.reduce((a, s) => a + s.duration, 0)

    const handleGenerate = () => {
        setPhase("generating")
        setStepIndex(0)
        setStepProgress(0)

        let elapsed = 0
        let currentStep = 0

        const tick = setInterval(() => {
            elapsed += 40
            const stepStart = STEPS.slice(0, currentStep).reduce((a, s) => a + s.duration, 0)
            const stepEnd = stepStart + STEPS[currentStep].duration
            const progress = Math.min(100, ((elapsed - stepStart) / STEPS[currentStep].duration) * 100)
            setStepProgress(progress)

            if (elapsed >= stepEnd && currentStep < STEPS.length - 1) {
                currentStep++
                setStepIndex(currentStep)
            }

            if (elapsed >= totalDuration) {
                clearInterval(tick)
                setPhase("done")
            }
        }, 40)
    }

    const handleReset = () => {
        setPhase("idle")
        setStepIndex(0)
        setStepProgress(0)
        setSelectedOption(1)
    }

    const trip = DEMO_TRIPS[selectedTrip]
    const overallProgress = Math.min(100, (STEPS.slice(0, stepIndex).reduce((a, s) => a + s.duration, 0) + (STEPS[stepIndex]?.duration || 0) * stepProgress / 100) / totalDuration * 100)

    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#7C5CFF]/5 rounded-full blur-[200px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 mb-6">
                        <Sparkles className="w-4 h-4 text-[#7C5CFF]" />
                        <span className="text-sm font-medium text-[#7C5CFF]">Try the AI — live demo</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        See it build a trip in{" "}
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent">
                            30 seconds
                        </span>
                    </h2>
                    <p className="text-white/50 text-lg">Select a trip, hit Generate, watch the AI work.</p>
                </div>

                {/* Trip selector */}
                <div className="grid sm:grid-cols-3 gap-3 mb-6">
                    {DEMO_TRIPS.map((t, i) => (
                        <button
                            key={i}
                            onClick={() => { setSelectedTrip(i); handleReset() }}
                            className={`text-left p-4 rounded-xl border transition-all duration-200 ${selectedTrip === i ? "bg-[#7C5CFF]/10 border-[#7C5CFF]/40" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}
                        >
                            <div className="flex items-start gap-2">
                                <MapPin className={`w-4 h-4 flex-shrink-0 mt-0.5 ${selectedTrip === i ? "text-[#7C5CFF]" : "text-white/30"}`} />
                                <div>
                                    <div className={`font-semibold text-sm ${selectedTrip === i ? "text-white" : "text-white/60"}`}>{t.destination}</div>
                                    <div className="text-white/30 text-xs mt-0.5 leading-relaxed line-clamp-2">{t.prompt}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Input box */}
                <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[#7C5CFF]/20 flex items-center justify-center flex-shrink-0">
                            <Mic className="w-4 h-4 text-[#7C5CFF]" />
                        </div>
                        <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">Your trip request</span>
                    </div>
                    <p className="text-white/80 leading-relaxed text-sm pl-11">{trip.prompt}</p>
                    <div className="flex items-center gap-4 mt-4 pl-11">
                        <span className="flex items-center gap-1.5 text-xs text-white/30">
                            <Users className="w-3.5 h-3.5" />
                            {trip.travelers} travellers
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-white/30">
                            <Clock className="w-3.5 h-3.5" />
                            {trip.dates}
                        </span>
                    </div>
                </div>

                {/* Generate button / loading / results */}
                {phase === "idle" && (
                    <button
                        onClick={handleGenerate}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#9B7DFF] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        <Sparkles className="w-5 h-5" />
                        Generate 3 Trip Options — AI Demo
                        <ArrowRight className="w-4 h-4" />
                    </button>
                )}

                {phase === "generating" && (
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
                        {/* Overall progress bar */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#7C5CFF] rounded-full animate-pulse" />
                                    <span className="text-white font-semibold text-sm">AI generating your trips...</span>
                                </div>
                                <span className="text-[#7C5CFF] font-mono text-sm">{Math.round(overallProgress)}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#7C5CFF] to-[#C9A962] rounded-full transition-all duration-75"
                                    style={{ width: `${overallProgress}%` }}
                                />
                            </div>
                        </div>

                        {/* Steps */}
                        <div className="space-y-2.5">
                            {STEPS.map((step, i) => (
                                <div key={i} className={`flex items-center gap-3 text-sm transition-all duration-300 ${i < stepIndex ? "opacity-100" : i === stepIndex ? "opacity-100" : "opacity-20"}`}>
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${i < stepIndex ? "bg-[#4AD7A2]/20" : i === stepIndex ? "bg-[#7C5CFF]/20 animate-pulse" : "bg-white/5"}`}>
                                        {i < stepIndex ? (
                                            <Check className="w-3 h-3 text-[#4AD7A2]" />
                                        ) : i === stepIndex ? (
                                            <div className="w-2 h-2 bg-[#7C5CFF] rounded-full" />
                                        ) : (
                                            <div className="w-2 h-2 bg-white/20 rounded-full" />
                                        )}
                                    </div>
                                    <span className={i < stepIndex ? "text-white/60 line-through" : i === stepIndex ? "text-white" : "text-white/30"}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {phase === "done" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[#4AD7A2] rounded-full" />
                                <span className="text-white font-semibold">3 trip options ready — {trip.destination}</span>
                            </div>
                            <button onClick={handleReset} className="text-white/30 hover:text-white text-xs transition-colors">
                                ↺ Reset
                            </button>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-4">
                            {trip.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedOption(i)}
                                    className={`text-left p-5 rounded-2xl border transition-all duration-200 relative ${selectedOption === i ? "border-opacity-60 bg-white/[0.04]" : "border-white/5 bg-white/[0.02] hover:bg-white/[0.03]"}`}
                                    style={selectedOption === i ? { borderColor: opt.color + "60" } : {}}
                                >
                                    {opt.recommended && (
                                        <div className="absolute -top-2.5 left-4 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: opt.color, color: "#1a1a0e" }}>
                                            AI PICK
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ color: opt.color, background: opt.color + "20" }}>
                                            {opt.type}
                                        </span>
                                        <div className="text-right">
                                            <div className="text-white font-bold">{opt.perPerson}</div>
                                            <div className="text-white/30 text-xs">per person</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-3">
                                        <div className="flex items-start gap-2">
                                            <Plane className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-white/30" />
                                            <span className="text-white/50 text-xs leading-relaxed">{opt.flight}</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Hotel className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-white/30" />
                                            <span className="text-white/50 text-xs leading-relaxed">{opt.hotel}</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-white/5 pt-3">
                                        <div className="text-white/30 text-[10px] font-semibold uppercase tracking-wider mb-2">Highlights</div>
                                        <ul className="space-y-1">
                                            {opt.highlights.slice(0, 3).map((h, j) => (
                                                <li key={j} className="flex items-start gap-1.5 text-xs text-white/50">
                                                    <span style={{ color: opt.color }} className="flex-shrink-0">→</span>
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {selectedOption === i && (
                                        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-xs text-white/40">Total: {opt.total}</span>
                                            <span className="text-xs font-semibold flex items-center gap-1" style={{ color: opt.color }}>
                                                Selected <Check className="w-3 h-3" />
                                            </span>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="mt-4 p-5 rounded-2xl bg-[#C9A962]/8 border border-[#C9A962]/20 flex items-center justify-between gap-4 flex-wrap">
                            <div>
                                <div className="text-white font-semibold text-sm mb-0.5">
                                    Like what you see? The real app builds this from your voice in 30 seconds.
                                </div>
                                <div className="text-white/40 text-xs">Launching April 2026 — free for travellers.</div>
                            </div>
                            <a
                                href="#early-access"
                                className="flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm flex-shrink-0"
                            >
                                Join Waitlist — Free
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
