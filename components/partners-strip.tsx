"use client"

import { useEffect, useRef, useState } from "react"

const partners = [
    {
        name: "Expedia",
        label: "Hotels & Flights",
        color: "#1B3A6B",
        accent: "#00A7CF",
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
        ),
        live: true,
    },
    {
        name: "Stripe",
        label: "Payments",
        color: "#635BFF",
        accent: "#7B73FF",
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
            </svg>
        ),
        live: true,
    },
    {
        name: "Kayak",
        label: "Flight Search",
        color: "#FF690F",
        accent: "#FF8C42",
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
        ),
        live: false,
    },
    {
        name: "Viator",
        label: "Experiences",
        color: "#3DAD6A",
        accent: "#4CC97A",
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
        ),
        live: false,
    },
]

const aiPartners = [
    { name: "Google Gemini", label: "AI Engine", color: "#4285F4" },
    { name: "Claude AI", label: "AI Assistant", color: "#D97757" },
]

export function PartnersStrip() {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true) },
            { threshold: 0.2 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={ref} className="relative py-14 bg-[#FAFAF8] border-b border-slate-100 overflow-hidden">
            {/* Subtle ambient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,212,255,0.04),transparent_60%)] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className={`text-center mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400 mb-1">Integration Partners</p>
                    <p className="text-slate-300 text-xs">Everything in one app — powered by the tools you already trust</p>
                </div>

                {/* Partner cards */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {partners.map((p, i) => (
                        <div
                            key={p.name}
                            className={`group relative flex items-center gap-3 px-5 py-3.5 rounded-2xl border-2 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl cursor-default ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                            style={{
                                borderColor: p.color + "30",
                                transitionDelay: `${i * 80}ms`,
                                boxShadow: `0 2px 16px ${p.color}10`,
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = p.color + "80"
                                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${p.color}25`
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = p.color + "30"
                                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 2px 16px ${p.color}10`
                            }}
                        >
                            {/* Icon */}
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                                style={{ background: p.color + "15", color: p.color }}
                            >
                                {p.icon}
                            </div>

                            {/* Text */}
                            <div>
                                <div className="text-slate-900 font-bold text-sm leading-none">{p.name}</div>
                                <div className="text-slate-400 text-[11px] mt-0.5">{p.label}</div>
                            </div>

                            {/* Status badge */}
                            {p.live ? (
                                <div className="ml-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: p.color + "15", color: p.color }}>
                                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: p.color }} />
                                    Ready
                                </div>
                            ) : (
                                <div className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-400 border border-slate-200">
                                    Q3 2026
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* AI divider */}
                <div className={`flex items-center gap-6 mt-10 justify-center transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-200" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">AI powered by</span>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-200" />
                </div>
                <div className={`flex items-center justify-center gap-6 mt-4 transition-all duration-700 delay-600 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                    {aiPartners.map((p) => (
                        <div key={p.name} className="flex items-center gap-2 group">
                            <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: p.color }} />
                            <span className="text-slate-500 text-xs font-semibold group-hover:text-slate-800 transition-colors">{p.name}</span>
                            <span className="text-slate-300 text-[10px]">{p.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
