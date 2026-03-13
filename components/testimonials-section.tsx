"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
    {
        quote: "We planned a 10-day Japan trip for 6 people in literally 20 minutes. Our previous WhatsApp thread had 847 messages just for the same trip. PayaGo is insane.",
        name: "Aisha M.",
        role: "Beta tester · London",
        avatar: "A",
        gradient: "from-[#7C5CFF] to-[#00D4FF]",
        trip: "10 days · Japan · 6 people",
        stars: 5,
    },
    {
        quote: "The voting feature alone is worth it. No more 'I don't mind, whatever you want' group chats. Everyone votes, the AI picks the winner. Done.",
        name: "James T.",
        role: "Beta tester · Manchester",
        avatar: "J",
        gradient: "from-[#C9A962] to-[#E5C77D]",
        trip: "7 days · Barcelona · 4 people",
        stars: 5,
    },
    {
        quote: "I was sceptical about AI planning but the itinerary it built for our Barcelona trip was better than anything I would have come up with. Found restaurants I'd never heard of.",
        name: "Priya R.",
        role: "Beta tester · Birmingham",
        avatar: "P",
        gradient: "from-[#4AD7A2] to-[#00D4FF]",
        trip: "5 days · Barcelona · 3 people",
        stars: 5,
    },
]

export function TestimonialsSection() {
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
        <section ref={ref} className="relative py-28 sm:py-36 overflow-hidden border-t border-white/[0.04]">
            <div className="absolute inset-0 bg-[#030609]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(74,215,162,0.05),transparent_70%)] blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#4AD7A2]/10 border border-[#4AD7A2]/20 mb-6">
                        <span className="text-[13px] text-[#4AD7A2] font-semibold">What beta testers say</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-[-0.03em] mb-4">
                        Real groups.{" "}
                        <span className="bg-gradient-to-r from-[#4AD7A2] to-[#00D4FF] bg-clip-text text-transparent">Real trips.</span>
                    </h2>
                    <p className="text-white/35 text-lg max-w-md mx-auto">
                        From our private beta — 200 groups, 40+ destinations, zero chaos.
                    </p>
                </div>

                {/* Cards */}
                <div className={`grid md:grid-cols-3 gap-5 transition-all duration-700 delay-150 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
                    {testimonials.map((t, i) => (
                        <div
                            key={t.name}
                            className="relative bg-white/[0.025] border border-white/[0.06] rounded-3xl p-7 flex flex-col gap-5 group hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 hover:-translate-y-1"
                            style={{ transitionDelay: `${i * 80}ms` }}
                        >
                            {/* Quote icon */}
                            <Quote className="w-6 h-6 text-white/10 flex-shrink-0" />

                            {/* Stars */}
                            <div className="flex gap-1">
                                {Array.from({ length: t.stars }).map((_, s) => (
                                    <Star key={s} className="w-3.5 h-3.5 text-[#C9A962] fill-[#C9A962]" />
                                ))}
                            </div>

                            {/* Quote text */}
                            <p className="text-white/60 text-[14px] leading-[1.75] flex-1">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            {/* Trip tag */}
                            <div className="text-[10px] font-semibold text-white/20 uppercase tracking-wider border-t border-white/[0.05] pt-4">
                                {t.trip}
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="text-white font-semibold text-sm">{t.name}</div>
                                    <div className="text-white/30 text-xs mt-0.5">{t.role}</div>
                                </div>
                            </div>

                            {/* Hover glow */}
                            <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style={{ background: `linear-gradient(135deg, rgba(74,215,162,0.06), transparent 60%)` }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
