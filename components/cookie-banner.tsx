"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, Cookie } from "lucide-react"

import { notifyAnalyticsConsent } from "@/lib/analytics"

type CookieConsent = "accepted" | "declined"

function normalizePathname(pathname: string | null) {
    if (!pathname || pathname === "/") return pathname
    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
}

function isScanFlowPath(pathname: string | null) {
    const normalized = normalizePathname(pathname)
    return normalized === "/qr" || normalized === "/early-access"
}

export function CookieBanner() {
    const pathname = usePathname()
    const isScanFlow = isScanFlowPath(pathname)
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (isScanFlow) {
            setShow(false)
            return
        }

        const consent = localStorage.getItem("payago-cookie-consent")
        if (consent === "accepted") {
            notifyAnalyticsConsent("granted")
            return
        }

        if (consent === "declined") {
            notifyAnalyticsConsent("denied")
            return
        }

        setShow(true)
    }, [isScanFlow])

    const saveConsent = (consent: CookieConsent) => {
        localStorage.setItem("payago-cookie-consent", consent)
        setShow(false)
        notifyAnalyticsConsent(consent === "accepted" ? "granted" : "denied")
    }

    const accept = () => saveConsent("accepted")

    const decline = () => {
        saveConsent("declined")
    }

    if (isScanFlow || !show) return null

    return (
        <div
            className="fixed bottom-3 left-3 right-3 z-[9999] pointer-events-none sm:bottom-4"
            role="dialog"
            aria-label="Cookie consent"
            aria-live="polite"
            style={{ contain: "layout paint" }}
        >
            <div className="pointer-events-auto max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
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
                        className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 transition-colors text-sm font-medium"
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
