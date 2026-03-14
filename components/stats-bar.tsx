"use client"

import { useEffect, useRef, useState } from "react"
import { Globe, Zap, Users, Mic } from "lucide-react"

const stats = [
    { icon: Zap, value: 30, suffix: "s", label: "Itinerary generation time", color: "#00D4FF" },
    { icon: Globe, value: 50, suffix: "+", label: "Destinations at launch", color: "#C9A962" },
    { icon: Users, value: 20, suffix: "+", label: "Group size supported", color: "#4AD7A2" },
    { icon: Mic, value: 3, suffix: " options", label: "Budget, Balanced, Premium", color: "#7C5CFF" },
]

function Counter({ target, suffix, decimal }: { target: number; suffix: string; decimal?: boolean }) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const started = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !started.current) {
                    started.current = true
                    const duration = 1800
                    const steps = 60
                    const increment = target / steps
                    let current = 0
                    const timer = setInterval(() => {
                        current += increment
                        if (current >= target) {
                            setCount(target)
                            clearInterval(timer)
                        } else {
                            setCount(decimal ? Math.round(current * 10) / 10 : Math.floor(current))
                        }
                    }, duration / steps)
                }
            },
            { threshold: 0.5 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [target, decimal])

    return (
        <span ref={ref}>
            {decimal ? count.toFixed(1) : count.toLocaleString()}{suffix}
        </span>
    )
}

export function StatsBar() {
    return (
        <section className="relative border-y border-white/[0.04] bg-[#030508] overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_50%,rgba(0,212,255,0.03),transparent)]" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/[0.05]">
                    {stats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <div key={stat.label} className="flex flex-col items-center text-center lg:px-10 gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ background: stat.color + "15", border: `1px solid ${stat.color}25` }}>
                                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                                </div>
                                <div className="text-3xl lg:text-4xl font-bold text-white tracking-tight"
                                    style={{ textShadow: `0 0 30px ${stat.color}30` }}>
                                    <Counter target={stat.value} suffix={stat.suffix} decimal={stat.decimal} />
                                </div>
                                <div className="text-white/30 text-sm font-medium">{stat.label}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
