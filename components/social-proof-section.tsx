"use client"

import { useEffect, useRef, useState } from "react"

const capabilityCards = [
    {
        title: "Plan from one prompt",
        body: "Describe the destination, group size, budget, and vibe. PayaGo turns it into structured trip options your group can compare.",
        avatar: "AI",
    },
    {
        title: "Decide together",
        body: "Share a trip link, collect votes, and keep everyone aligned without losing decisions inside a group chat.",
        avatar: "GV",
    },
    {
        title: "Coordinate the money",
        body: "Estimate each traveller's share and coordinate payment steps so one person is not carrying the whole booking burden.",
        avatar: "SP",
    },
]

const stats = [
    { value: "AI", label: "Trip generation" },
    { value: "Shared", label: "Group review" },
    { value: "3", label: "Trip option styles" },
    { value: "Beta", label: "Early access" },
]

export function SocialProofSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.2 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#04060A]" />

            {/* Decorative gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Stats */}
                <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="text-center"
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent mb-2">
                                {stat.value}
                            </div>
                            <div className="text-white/40 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Section header */}
                <div className={`text-center mb-16 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Built around the real group trip flow
                    </h2>
                    <p className="text-white/40 text-lg">
                        From first idea to shared decision to coordinated booking
                    </p>
                </div>

                {/* Capability cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {capabilityCards.map((card, i) => (
                        <div
                            key={i}
                            className={`relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-500 hover:transform hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            style={{ transitionDelay: `${(i + 3) * 100}ms` }}
                        >
                            <p className="text-white font-semibold mb-3 text-lg">{card.title}</p>
                            <p className="text-white/70 leading-relaxed mb-6 text-lg">{card.body}</p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A962] to-[#00D4FF] flex items-center justify-center text-white font-bold">
                                    {card.avatar}
                                </div>
                                <div>
                                    <div className="text-white font-medium">PayaGo workflow</div>
                                    <div className="text-white/40 text-sm">Early access feature set</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Early access CTA */}
                <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <a href="/early-access/" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white font-semibold">
                        Join Early Access
                    </a>
                    <span className="text-white/40 text-sm">Mobile app availability will be announced to waitlist members.</span>
                </div>
            </div>
        </section>
    )
}
