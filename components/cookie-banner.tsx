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
            <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="w-10 h-10 rounded-xl bg-[#C9A962]/10 border border-[#C9A962]/20 flex items-center justify-center flex-shrink-0">
                    <Cookie className="w-5 h-5 text-[#C9A962]" />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-slate-900 font-semibold text-sm mb-1">We use cookies</p>
                    <p className="text-slate-500 text-xs leading-relaxed">
                        We use essential cookies to make our site work, and optional analytics cookies (Google Analytics 4) to understand how visitors use it.{" "}
                        <Link href="/cookie-policy" className="text-[#C9A962] hover:underline">
                            Cookie Policy
                        </Link>
                        {" "}·{" "}
                        <Link href="/privacy" className="text-slate-400 hover:text-slate-600 transition-colors">
                            Privacy Policy
                        </Link>
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
                    <button
                        onClick={decline}
                        className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 transition-all text-sm font-medium"
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
                        className="hidden sm:flex w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 items-center justify-center transition-colors flex-shrink-0"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4 text-slate-400" />
                    </button>
                </div>
            </div>
        </div>
    )
}
