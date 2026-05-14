"use client"

import { useEffect, useRef, useState } from "react"
import { Quote } from "lucide-react"

const testimonials = [
    {
        title: "Clearer group planning",
        quote: "Early testers use PayaGo to turn loose trip ideas into structured itinerary drafts, shared decisions, and clearer payment plans.",
        gradient: "from-[#7C5CFF] to-[#00D4FF]",
        theme: "Itinerary drafts",
    },
    {
        title: "Shared decisions",
        quote: "Groups are testing lightweight voting flows so plans can move forward without long message threads or unclear preferences.",
        gradient: "from-[#C9A962] to-[#E5C77D]",
        theme: "Group votes",
    },
    {
        title: "Cost coordination",
        quote: "Early feedback is helping us shape how trip costs, payment timing, and group contributions should be explained before launch.",
        gradient: "from-[#4AD7A2] to-[#00D4FF]",
        theme: "Split-cost planning",
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(74,215,162,0.05),transparent_70%)] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className={`text-center mb-16 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#4AD7A2]/10 border border-[#4AD7A2]/20 mb-6">
                        <span className="text-[13px] text-[#4AD7A2] font-semibold">Early tester themes</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-[-0.03em] mb-4">
                        Built around{" "}
                        <span className="bg-gradient-to-r from-[#4AD7A2] to-[#00D4FF] bg-clip-text text-transparent">real planning friction.</span>
                    </h2>
                    <p className="text-white/35 text-lg max-w-md mx-auto">
                        Product themes from early testing of AI planning, shared votes, and split-cost coordination.
                    </p>
                </div>

                {/* Cards */}
                <div className={`grid md:grid-cols-3 gap-5 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-700 delay-150 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
                    {testimonials.map((t, i) => (
                        <div
                            key={t.title}
                            className="relative bg-white/[0.025] border border-white/[0.06] rounded-3xl p-7 flex flex-col gap-5 group hover:bg-white/[0.04] hover:border-white/[0.1] transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-500 hover:-translate-y-1"
                            style={{ transitionDelay: `${i * 80}ms` }}
                        >
                            {/* Quote icon */}
                            <Quote className="w-6 h-6 text-white/10 flex-shrink-0" />

                            <div>
                                <h3 className="text-white font-semibold text-lg tracking-[-0.01em]">{t.title}</h3>
                                <div className={`mt-3 h-1 w-12 rounded-full bg-gradient-to-r ${t.gradient}`} />
                            </div>

                            {/* Quote text */}
                            <p className="text-white/60 text-[14px] leading-[1.75] flex-1">
                                {t.quote}
                            </p>

                            {/* Theme tag */}
                            <div className="text-[10px] font-semibold text-white/20 uppercase tracking-wider border-t border-white/[0.05] pt-4">
                                {t.theme}
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
