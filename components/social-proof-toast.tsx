"use client"

import { useEffect, useState } from "react"
import { MapPin } from "lucide-react"

const notifications = [
    { name: "Priya R.", city: "Birmingham", time: "2 min ago" },
    { name: "James T.", city: "Manchester", time: "4 min ago" },
    { name: "Aisha M.", city: "London", time: "7 min ago" },
    { name: "Oliver K.", city: "Edinburgh", time: "just now" },
    { name: "Sophie L.", city: "Bristol", time: "1 min ago" },
    { name: "Rahul S.", city: "Leeds", time: "3 min ago" },
    { name: "Emma W.", city: "Dublin", time: "5 min ago" },
    { name: "Lucas D.", city: "Glasgow", time: "just now" },
]

export function SocialProofToast() {
    const [index, setIndex] = useState(0)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        // Delay initial show by 5s
        const initial = setTimeout(() => setVisible(true), 5000)
        return () => clearTimeout(initial)
    }, [])

    useEffect(() => {
        if (!visible) return

        // Hide after 4s, then cycle to next after 8s
        const hideTimer = setTimeout(() => setVisible(false), 4000)
        const nextTimer = setTimeout(() => {
            setIndex((i) => (i + 1) % notifications.length)
            setVisible(true)
        }, 8000)

        return () => {
            clearTimeout(hideTimer)
            clearTimeout(nextTimer)
        }
    }, [visible, index])

    const n = notifications[index]

    return (
        <div
            className="fixed bottom-24 left-6 z-40 pointer-events-none"
            style={{
                transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
                opacity: visible ? 1 : 0,
                transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
        >
            <div className="flex items-center gap-3 bg-[#0d1220]/90 backdrop-blur-2xl border border-white/[0.08] px-4 py-3.5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.03)] max-w-[240px]">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400/30 to-violet-500/30 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-white/80 text-sm font-bold">{n.name[0]}</span>
                </div>
                <div className="min-w-0">
                    <p className="text-white/80 text-[12px] font-semibold leading-tight truncate">
                        {n.name} joined the waitlist
                    </p>
                    <p className="text-white/30 text-[10px] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                        {n.city} · {n.time}
                    </p>
                </div>
                {/* Live dot */}
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
            </div>
        </div>
    )
}
