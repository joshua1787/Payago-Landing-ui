"use client"

import Link from "next/link"
import { PayagoWordmark } from "@/components/payago-wordmark"
import { ArrowLeft, Mail, MapPin, MessageCircle, Clock, Send } from "lucide-react"
import { useState, type FormEvent } from "react"

import { captureEvent } from "@/lib/analytics"

const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim()
const CONTACT_FALLBACK_EMAIL = "support@payago.in"

type ContactStatus = "idle" | "loading" | "success" | "error" | "unconfigured"

type ContactFormData = {
    name: string
    email: string
    department: string
    subject: string
    message: string
}

const contactMethods = [
    {
        icon: Mail,
        title: "Support",
        description: "Email the launch support inbox",
        value: "support@payago.in",
        link: "mailto:support@payago.in",
        color: "#C9A962",
    },
    {
        icon: Mail,
        title: "Partnerships",
        description: "API integrations & business enquiries",
        value: "partnerships@payago.in",
        link: "mailto:partnerships@payago.in",
        color: "#4AD7A2",
    },
    {
        icon: MessageCircle,
        title: "Product questions",
        description: "Early-access feedback and product help",
        value: "Email the product team",
        link: "mailto:support@payago.in?subject=PayaGo%20product%20question",
        color: "#00D4FF",
    },
    {
        icon: MapPin,
        title: "Registered base",
        description: "Launch team location",
        value: "London, United Kingdom",
        link: "mailto:support@payago.in?subject=PayaGo%20London%20enquiry",
        color: "#4AD7A2",
    },
]

const departments = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Customer Support" },
    { value: "sales", label: "Sales & Partnerships" },
    { value: "press", label: "Press & Media" },
    { value: "careers", label: "Careers" },
]

function getDepartmentLabel(value: string) {
    return departments.find((dept) => dept.value === value)?.label ?? value
}

function buildContactMailto(data: ContactFormData) {
    const subject = encodeURIComponent(data.subject || "PayaGo contact form message")
    const body = encodeURIComponent(
        [
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Department: ${getDepartmentLabel(data.department)}`,
            "",
            data.message,
        ].join("\n")
    )

    return `mailto:${CONTACT_FALLBACK_EMAIL}?subject=${subject}&body=${body}`
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

export function ContactClient() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        department: "general",
        subject: "",
        message: "",
    })
    const [status, setStatus] = useState<ContactStatus>("idle")
    const [feedback, setFeedback] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus("loading")
        setFeedback("")

        captureEvent("contact_submit_attempt", {
            location: "contact_page",
            department: formData.department,
            configured: Boolean(CONTACT_ENDPOINT),
        })

        if (!CONTACT_ENDPOINT) {
            captureEvent("contact_submit_unconfigured", {
                location: "contact_page",
                department: formData.department,
                reason: "endpoint_unconfigured",
                channel: "mailto",
            })
            captureEvent("contact_submit_fail", {
                location: "contact_page",
                department: formData.department,
                reason: "endpoint_unconfigured",
                channel: "mailto",
            })
            setStatus("unconfigured")
            setFeedback("Contact capture is not configured in this build. We opened an email draft instead; your message is not sent until you send it.")
            window.location.href = buildContactMailto(formData)
            return
        }

        const contactEndpoint = getAbsoluteHttpEndpoint(CONTACT_ENDPOINT)

        if (!contactEndpoint) {
            captureEvent("contact_submit_fail", {
                location: "contact_page",
                department: formData.department,
                configured: true,
                reason: "endpoint_invalid_url",
            })
            setStatus("error")
            setFeedback(`Contact capture is misconfigured. Please email ${CONTACT_FALLBACK_EMAIL}.`)
            return
        }

        try {
            const response = await fetch(contactEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    source: "contact_page",
                    submittedAt: new Date().toISOString(),
                }),
            })

            if (!response.ok) {
                throw new Error(`contact_endpoint_${response.status}`)
            }

            if (!(await isAcceptedResponse(response))) {
                throw new Error(`contact_endpoint_unconfirmed_${response.status}`)
            }

            captureEvent("contact_submit_success", {
                location: "contact_page",
                department: formData.department,
                status: response.status,
                configured: true,
            })
            setStatus("success")
            setFeedback("Your message was accepted by the configured contact endpoint. We'll reply as soon as possible.")
        } catch (error) {
            captureEvent("contact_submit_fail", {
                location: "contact_page",
                department: formData.department,
                configured: true,
                reason: error instanceof Error ? error.message : "unknown_error",
            })
            setStatus("error")
            setFeedback(`We couldn't submit your message. Please try again, or email ${CONTACT_FALLBACK_EMAIL}.`)
        }
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <PayagoWordmark />
                        
                    </Link>
                    <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C9A962]/10 rounded-full" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6">
                        Get in
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent ml-3">
                            touch
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Have a question? Send us a message or use the direct inboxes below.
                    </p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactMethods.map((method, index) => {
                            const Icon = method.icon
                            return (
                                <a
                                    key={index}
                                    href={method.link}
                                    onClick={() =>
                                        captureEvent("contact_method_click", {
                                            location: "contact_page",
                                            method: method.title.toLowerCase().replace(/\s+/g, "_"),
                                            href_type: method.link.startsWith("mailto:") ? "mailto" : "link",
                                        })
                                    }
                                    className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-300 hover:-translate-y-1"
                                >
                                    <div
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                                        style={{
                                            background: `linear-gradient(135deg, ${method.color}30, ${method.color}10)`,
                                        }}
                                    >
                                        <Icon className="w-6 h-6" style={{ color: method.color }} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">{method.title}</h3>
                                    <p className="text-slate-500 text-sm mb-3">{method.description}</p>
                                    <p className="text-slate-600 font-medium group-hover:text-[#C9A962] transition-colors">
                                        {method.value}
                                    </p>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="p-8 lg:p-12 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-slate-100">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-slate-900 mb-3">Send us a message</h2>
                            <p className="text-slate-500">Messages require a configured endpoint, otherwise this opens an email draft.</p>
                        </div>

                        {status !== "success" ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-slate-600 text-sm mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C9A962]/50 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left]"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-600 text-sm mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C9A962]/50 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left]"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-slate-600 text-sm mb-2">Department</label>
                                        <select
                                            value={formData.department}
                                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C9A962]/50 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] appearance-none cursor-pointer"
                                        >
                                            {departments.map((dept) => (
                                                <option key={dept.value} value={dept.value} className="bg-white text-slate-900">
                                                    {dept.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-slate-600 text-sm mb-2">Subject</label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            required
                                            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C9A962]/50 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left]"
                                            placeholder="How can we help?"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-slate-600 text-sm mb-2">Message</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        rows={6}
                                        className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C9A962]/50 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1E3A5F] py-4 rounded-xl font-semibold hover:opacity-90 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {status === "loading" ? (
                                        <span className="w-5 h-5 border-2 border-[#1E3A5F]/30 border-t-[#1E3A5F] rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <p className="text-sm text-slate-500">
                                    {CONTACT_ENDPOINT
                                        ? "Messages are sent through the configured contact endpoint."
                                        : "No contact endpoint is configured for this static build. Submitting opens your email app, and this site will not capture the message."}
                                </p>

                                {feedback && (
                                    <p
                                        role="status"
                                        className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${
                                            status === "unconfigured"
                                                ? "border-amber-200 bg-amber-50 text-amber-800"
                                                : "border-red-200 bg-red-50 text-red-700"
                                        }`}
                                    >
                                        {feedback}
                                    </p>
                                )}
                            </form>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 rounded-full bg-[#4AD7A2]/20 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-[#4AD7A2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">Message sent!</h3>
                                <p className="text-slate-600 mb-8">{feedback}</p>
                                <button
                                    onClick={() => {
                                        setStatus("idle")
                                        setFeedback("")
                                    }}
                                    className="text-[#C9A962] font-medium hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* FAQ Teaser */}
            <section className="py-24 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <Clock className="w-12 h-12 text-[#C9A962] mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Need an answer now?</h2>
                    <p className="text-slate-600 mb-8">Check our FAQ for instant answers to common questions.</p>
                    <Link
                        href="/faq"
                        className="inline-flex items-center gap-2 bg-white/10 text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                    >
                        View FAQ
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
                    © 2026 PAYAGO LTD. All rights reserved.
                </div>
            </footer>
        </main>
    )
}
