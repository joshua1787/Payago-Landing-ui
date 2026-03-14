"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Cookie } from "lucide-react"

export function CookieBanner() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem("payago-cookie-consent")
        if (!consent) setShow(true)
    }, [])

    const accept = () => {
        localStorage.setItem("payago-cookie-consent", "accepted")
        setShow(false)
        // Enable GA4 if it was deferred
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("consent", "update", {
                analytics_storage: "granted",
            })
        }
    }

    const decline = () => {
        localStorage.setItem("payago-cookie-consent", "declined")
        setShow(false)
    }

    if (!show) return null

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
            role="dialog"
            aria-label="Cookie consent"
            aria-live="polite"
        >
            <div className="max-w-4xl mx-auto bg-[#0B1018] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="w-10 h-10 rounded-xl bg-[#C9A962]/15 border border-[#C9A962]/20 flex items-center justify-center flex-shrink-0">
                    <Cookie className="w-5 h-5 text-[#C9A962]" />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm mb-1">We use cookies</p>
                    <p className="text-white/50 text-xs leading-relaxed">
                        We use essential cookies to make our site work, and optional analytics cookies (Google Analytics 4) to understand how visitors use it.{" "}
                        <Link href="/cookie-policy" className="text-[#C9A962] hover:underline">
                            Cookie Policy
                        </Link>
                        {" "}·{" "}
                        <Link href="/privacy" className="text-white/40 hover:text-white/60 transition-colors">
                            Privacy Policy
                        </Link>
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
                    <button
                        onClick={decline}
                        className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all text-sm font-medium"
                    >
                        Decline
                    </button>
                    <button
                        onClick={accept}
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                        Accept all
                    </button>
                    <button
                        onClick={decline}
                        className="hidden sm:flex w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 items-center justify-center transition-colors flex-shrink-0"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4 text-white/40" />
                    </button>
                </div>
            </div>
        </div>
    )
}
