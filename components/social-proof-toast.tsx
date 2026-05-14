"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

export function SocialProofToast() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const initial = setTimeout(() => setVisible(true), 5000)
        return () => clearTimeout(initial)
    }, [])

    return (
        <div
            className="fixed bottom-24 left-6 z-40 pointer-events-none"
            style={{
                transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
                opacity: visible ? 1 : 0,
                transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease",
            }}
        >
            <div className="flex items-center gap-3 bg-[#0d1220] border border-white/[0.08] px-4 py-3.5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.03)] max-w-[240px]">
                {/* Product marker */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400/30 to-violet-500/30 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white/80" />
                </div>
                <div className="min-w-0">
                    <p className="text-white/80 text-[12px] font-semibold leading-tight truncate">
                        Product preview
                    </p>
                    <p className="text-white/30 text-[10px] flex items-center gap-1 mt-0.5">
                        Group voting and split-cost planning are in early access.
                    </p>
                </div>
                {/* Preview dot */}
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
            </div>
        </div>
    )
}
