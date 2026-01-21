"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.3 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return
        setIsSubmitting(true)
        await new Promise((resolve) => setTimeout(resolve, 1200))
        setIsSubmitting(false)
        setIsSubmitted(true)
    }

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#04060A]" />

            {/* Gradient orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#C9A962]/20 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00D4FF]/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
                <div className={`text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A962]/10 border border-[#C9A962]/20 mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A962] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A962]"></span>
                        </span>
                        <span className="text-sm font-medium text-[#C9A962]">Limited Early Access</span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Ready to stop chasing
                        <br />
                        <span className="bg-gradient-to-r from-[#C9A962] via-[#E5C77D] to-[#C9A962] bg-clip-text text-transparent">
                            money?
                        </span>
                    </h2>

                    {/* Subheadline */}
                    <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
                        Join thousands already splitting bills smarter.
                        Get early access and be first in line when we launch January 31, 2026.
                    </p>

                    {/* Form */}
                    <div className={`max-w-lg mx-auto transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#C9A962]/50 focus:border-[#C9A962]/50 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1E3A5F] hover:opacity-90 px-8 py-4 font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#C9A962]/25 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <span className="w-5 h-5 border-2 border-[#1E3A5F]/30 border-t-[#1E3A5F] rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Get Early Access
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="flex items-center justify-center gap-3 bg-[#4AD7A2]/10 border border-[#4AD7A2]/30 rounded-xl px-6 py-5">
                                <div className="w-10 h-10 rounded-full bg-[#4AD7A2] flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left">
                                    <div className="text-[#4AD7A2] font-semibold">You're on the list!</div>
                                    <div className="text-[#4AD7A2]/60 text-sm">We'll email you when we launch.</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Trust line */}
                    <p className={`mt-6 text-white/30 text-sm transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        No spam, ever. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </section>
    )
}
