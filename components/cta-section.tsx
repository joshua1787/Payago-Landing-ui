"use client"

import { useState, useRef, useEffect } from "react"
import { Check, Shield, Sparkles, ArrowRight, Zap, Lock, Users } from "lucide-react"

const LAUNCH_DATE = new Date("2026-04-01T00:00:00Z")

function useCountdown() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        const tick = () => {
            const diff = LAUNCH_DATE.getTime() - Date.now()
            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                return
            }
            setTimeLeft({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                minutes: Math.floor((diff % 3600000) / 60000),
                seconds: Math.floor((diff % 60000) / 1000),
            })
        }
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])

    return timeLeft
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center gap-1">
            <div className="relative w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />
                <span className="relative text-2xl font-bold text-white tabular-nums">
                    {String(value).padStart(2, "0")}
                </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium">{label}</span>
        </div>
    )
}

export function CTASection() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const countdown = useCountdown()

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) setIsVisible(true) },
            { threshold: 0.15 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return
        setStatus("loading")
        setTimeout(() => setStatus("success"), 1500)
    }

    return (
        <section ref={sectionRef} id="early-access" className="relative py-32 sm:py-44 overflow-hidden">
            {/* Vibrant dynamic gradient background — inspired by bold color palettes */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-violet-600 to-purple-700" />

            {/* Travel photo with Ken Burns — slow cinematic drift */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.18]">
                <img src="/images/travel-santorini.png" alt="" className="w-full h-full object-cover animate-ken-burns-slow" style={{ transformOrigin: "60% 40%" }} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-violet-600/70 to-purple-700/80" />

            {/* Decorative shapes */}
            <div className="absolute top-20 -left-32 w-64 h-64 bg-white/[0.06] rounded-full blur-3xl" />
            <div className="absolute bottom-20 -right-32 w-80 h-80 bg-white/[0.04] rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-[15%] w-3 h-3 rounded-full bg-yellow-300/60 animate-bounce-slow" />
            <div className="absolute bottom-1/3 left-[10%] w-2 h-2 rounded-full bg-cyan-300/50 animate-bounce-slow" style={{ animationDelay: '1s' }} />
            <div className="absolute top-[20%] left-[25%] w-2 h-2 rounded-full bg-pink-300/40 animate-bounce-slow" style={{ animationDelay: '2s' }} />

            <div className={`relative z-10 max-w-3xl mx-auto px-6 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl mb-10">
                    <Zap className="w-3.5 h-3.5 text-yellow-300" />
                    <span className="text-[13px] text-white/90 font-medium">Limited early access — Join the early access waitlist</span>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-white tracking-[-0.03em] leading-tight mb-6">
                    Stop planning trips.
                    <br />
                    <span className="text-yellow-200">
                        Start living them.
                    </span>
                </h2>

                <p className="text-[17px] text-white/70 max-w-lg mx-auto mb-10 leading-relaxed">
                    Be the first to experience AI-powered travel planning. Free early access — no credit card required.
                </p>

                {/* Countdown */}
                <div className="flex items-center justify-center gap-3 mb-12">
                    <CountdownUnit value={countdown.days} label="Days" />
                    <span className="text-white/30 text-2xl font-light mb-5">:</span>
                    <CountdownUnit value={countdown.hours} label="Hours" />
                    <span className="text-white/30 text-2xl font-light mb-5">:</span>
                    <CountdownUnit value={countdown.minutes} label="Mins" />
                    <span className="text-white/30 text-2xl font-light mb-5">:</span>
                    <CountdownUnit value={countdown.seconds} label="Secs" />
                </div>

                {/* Email form */}
                {status === "success" ? (
                    <div className="animate-fade-up">
                        <div className="inline-flex items-center gap-3 bg-white text-emerald-600 rounded-2xl px-8 py-5 text-base font-semibold shadow-2xl">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                <Check className="w-3.5 h-3.5" />
                            </div>
                            You&apos;re on the list! We&apos;ll be in touch.
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
                        <div className="relative group max-w-xl mx-auto">
                            <div className="relative flex flex-col sm:flex-row gap-3 bg-white rounded-2xl p-2.5 shadow-2xl shadow-black/20">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 bg-transparent px-5 py-3.5 text-slate-900 text-[15px] placeholder:text-slate-400 focus:outline-none"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="relative group/btn overflow-hidden bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-all duration-300 disabled:opacity-60"
                                >
                                    {status === "loading" ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Get Early Access
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center justify-center gap-8 mt-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                    {[
                        { icon: Shield, text: "GDPR-first" },
                        { icon: Lock, text: "Bank-grade security" },
                        { icon: Sparkles, text: "AI-powered" },
                        { icon: Users, text: "Free for users" },
                    ].map((t) => (
                        <div key={t.text} className="flex items-center gap-2 text-white/60 text-[13px]">
                            <t.icon className="w-3.5 h-3.5" />
                            <span>{t.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
