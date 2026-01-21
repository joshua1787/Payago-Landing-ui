"use client"

import { useEffect, useRef, useState } from "react"

const testimonials = [
    {
        quote: "Finally, an app that actually makes group expenses painless. The auto-split feature is genius.",
        name: "Sarah K.",
        role: "London, UK",
        avatar: "S",
        rating: 5,
    },
    {
        quote: "Used it for our entire trip to Barcelona. No more awkward money conversations. Everyone just pays their share automatically.",
        name: "James M.",
        role: "Manchester, UK",
        avatar: "J",
        rating: 5,
    },
    {
        quote: "As a landlord splitting bills with tenants, this has been a game-changer. So simple and transparent.",
        name: "Priya R.",
        role: "Birmingham, UK",
        avatar: "P",
        rating: 5,
    },
]

const stats = [
    { value: "£2M+", label: "Transactions Split" },
    { value: "15K+", label: "Active Users" },
    { value: "4.9", label: "App Store Rating" },
    { value: "<2min", label: "Setup Time" },
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
                <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
                <div className={`text-center mb-16 transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Loved by groups everywhere
                    </h2>
                    <p className="text-white/40 text-lg">
                        Join thousands already splitting smarter
                    </p>
                </div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <div
                            key={i}
                            className={`relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 transition-all duration-500 hover:transform hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            style={{ transitionDelay: `${(i + 3) * 100}ms` }}
                        >
                            {/* Stars */}
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, j) => (
                                    <span key={j} className="text-[#C9A962] text-lg">★</span>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-white/70 leading-relaxed mb-6 text-lg">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A962] to-[#00D4FF] flex items-center justify-center text-white font-bold">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="text-white font-medium">{testimonial.name}</div>
                                    <div className="text-white/40 text-sm">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* App Store badges */}
                <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {/* Apple App Store */}
                    <a href="#" className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        <div>
                            <div className="text-white/40 text-xs">Download on the</div>
                            <div className="text-white font-semibold">App Store</div>
                        </div>
                    </a>

                    {/* Google Play */}
                    <a href="#" className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                            <path d="M3.609 1.814L13.792 12 3.609 22.186c-.181-.181-.286-.396-.286-.646V2.46c0-.25.105-.465.286-.646zm10.831 10.832l2.817-2.817 3.616 2.08c.553.318.88.83.88 1.091s-.327.773-.88 1.091l-3.616 2.08-2.817-2.817-3.617 3.617L3.62 21.99l10.82-10.82z" />
                        </svg>
                        <div>
                            <div className="text-white/40 text-xs">Get it on</div>
                            <div className="text-white font-semibold">Google Play</div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    )
}
