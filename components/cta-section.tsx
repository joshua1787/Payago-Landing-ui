"use client"

import { useState, type FormEvent } from "react"
import { Check, Shield, Sparkles, ArrowRight, Zap, Lock, Users } from "lucide-react"

import { captureEvent } from "@/lib/analytics"
import { OptimizedPicture } from "@/components/optimized-picture"
import { WAITLIST_EMAIL_ERROR, WAITLIST_EMAIL_INPUT_PATTERN, isValidWaitlistEmail } from "@/lib/waitlist-email"

const WAITLIST_ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT?.trim()
const WAITLIST_FALLBACK_EMAIL = "support@payago.in"

type WaitlistStatus = "idle" | "loading" | "success" | "error" | "unconfigured"

async function isAcceptedResponse(response: Response) {
    if ([201, 202, 204].includes(response.status)) {
        return true
    }

    if (!response.headers.get("content-type")?.includes("application/json")) {
        return false
    }

    const payload = await response.json().catch(() => null)
    if (!payload || typeof payload !== "object") {
        return false
    }

    const result = payload as Record<string, unknown>
    return result.ok === true || result.accepted === true || result.success === true
}

function buildWaitlistMailto(email: string) {
    const subject = encodeURIComponent("PayaGo early access waitlist")
    const body = encodeURIComponent(`Please add me to the PayaGo early-access waitlist.\n\nEmail: ${email}`)

    return `mailto:${WAITLIST_FALLBACK_EMAIL}?subject=${subject}&body=${body}`
}

function getAbsoluteHttpEndpoint(endpoint: string | undefined) {
    if (!endpoint) return null

    try {
        const url = new URL(endpoint)
        return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null
    } catch {
        return null
    }
}

export function CTASection() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<WaitlistStatus>("idle")
    const [feedback, setFeedback] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const normalizedEmail = email.trim()

        if (!normalizedEmail) return

        if (!isValidWaitlistEmail(normalizedEmail)) {
            setStatus("error")
            setFeedback(WAITLIST_EMAIL_ERROR)
            captureEvent("waitlist_submit_fail", {
                location: "early_access",
                source: "landing_cta",
                reason: "invalid_email_format",
            })
            return
        }

        setStatus("loading")
        setFeedback("")

        captureEvent("waitlist_submit_attempt", {
            location: "early_access",
            source: "landing_cta",
            configured: Boolean(WAITLIST_ENDPOINT),
        })

        if (!WAITLIST_ENDPOINT) {
            captureEvent("waitlist_submit_unconfigured", {
                location: "early_access",
                source: "landing_cta",
                reason: "endpoint_unconfigured",
                channel: "mailto",
            })
            captureEvent("waitlist_submit_fail", {
                location: "early_access",
                source: "landing_cta",
                reason: "endpoint_unconfigured",
                channel: "mailto",
            })
            setStatus("unconfigured")
            setFeedback("Waitlist capture is not configured in this build. We opened an email draft instead; your email is not submitted until you send it.")
            window.location.href = buildWaitlistMailto(normalizedEmail)
            return
        }

        const waitlistEndpoint = getAbsoluteHttpEndpoint(WAITLIST_ENDPOINT)

        if (!waitlistEndpoint) {
            captureEvent("waitlist_submit_fail", {
                location: "early_access",
                source: "landing_cta",
                configured: true,
                reason: "endpoint_invalid_url",
            })
            setStatus("error")
            setFeedback(`Waitlist capture is misconfigured. Please email ${WAITLIST_FALLBACK_EMAIL}.`)
            return
        }

        try {
            const response = await fetch(waitlistEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: normalizedEmail,
                    source: "landing_cta",
                    submittedAt: new Date().toISOString(),
                }),
            })

            if (!response.ok) {
                throw new Error(response.status === 400 ? "invalid_email_format" : `waitlist_endpoint_${response.status}`)
            }

            if (!(await isAcceptedResponse(response))) {
                throw new Error(`waitlist_endpoint_unconfirmed_${response.status}`)
            }

            captureEvent("waitlist_submit_success", {
                location: "early_access",
                source: "landing_cta",
                status: response.status,
                configured: true,
            })
            setEmail("")
            setStatus("success")
            setFeedback("Your early-access request was accepted. We'll be in touch.")
        } catch (error) {
            const reason = error instanceof Error ? error.message : "unknown_error"
            captureEvent("waitlist_submit_fail", {
                location: "early_access",
                source: "landing_cta",
                configured: true,
                reason,
            })
            setStatus("error")
            setFeedback(reason === "invalid_email_format" ? WAITLIST_EMAIL_ERROR : `We couldn't submit your email. Please try again, or email ${WAITLIST_FALLBACK_EMAIL}.`)
        }
    }

    return (
        <section id="early-access" className="scroll-stable-section relative py-32 sm:py-44 overflow-hidden">
            {/* Vibrant dynamic gradient background — inspired by bold color palettes */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-violet-600 to-purple-700" />

            {/* Travel photo layer. Keep static so the CTA does not fight scroll. */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.18]">
                <OptimizedPicture
                    src="/images/travel-santorini.webp"
                    alt=""
                    className="block w-full h-full"
                    imgClassName="w-full h-full object-cover"
                    loading="lazy"
                    sizes="100vw"
                    style={{ transformOrigin: "60% 40%" }}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-violet-600/70 to-purple-700/80" />

            {/* Decorative shapes */}
            <div className="absolute top-20 -left-32 w-64 h-64 bg-white/[0.06] rounded-full" />
            <div className="absolute bottom-20 -right-32 w-80 h-80 bg-white/[0.04] rounded-full" />
            <div className="absolute top-1/3 right-[15%] w-3 h-3 rounded-full bg-yellow-300/60" />
            <div className="absolute bottom-1/3 left-[10%] w-2 h-2 rounded-full bg-cyan-300/50" />
            <div className="absolute top-[20%] left-[25%] w-2 h-2 rounded-full bg-pink-300/40" />

            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/15 border border-white/20 mb-10">
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
                    Be the first to experience AI-powered travel planning. Join the early-access waitlist — no credit card required.
                </p>


                {/* Email form */}
                {status === "success" ? (
                    <div role="status" aria-live="polite">
                        <div className="inline-flex items-center gap-3 bg-white text-emerald-600 rounded-2xl px-8 py-5 text-base font-semibold shadow-md">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                <Check className="w-3.5 h-3.5" />
                            </div>
                            {feedback}
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="relative group max-w-xl mx-auto">
                            <div className="relative flex flex-col sm:flex-row gap-3 bg-white rounded-2xl p-2.5 shadow-lg">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    pattern={WAITLIST_EMAIL_INPUT_PATTERN}
                                    title={WAITLIST_EMAIL_ERROR}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 bg-transparent px-5 py-3.5 text-slate-900 text-[15px] placeholder:text-slate-400 focus:outline-none"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    onClick={() => captureEvent("cta_click", { location: "early_access", label: "get_early_access" })}
                                    className="relative group/btn overflow-hidden bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-[background-color,opacity] duration-300 disabled:opacity-60"
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
                            {feedback && (
                                <p
                                    role="status"
                                    className={`mt-4 text-sm leading-relaxed ${status === "unconfigured" ? "text-yellow-100" : "text-red-100"}`}
                                >
                                    {feedback}
                                </p>
                            )}
                        </div>
                    </form>
                )}

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
                    {[
                        { icon: Shield, text: "Privacy-minded" },
                        { icon: Lock, text: "Secure account design" },
                        { icon: Sparkles, text: "AI-powered" },
                        { icon: Users, text: "Early-access waitlist" },
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
