"use client"

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Mail, MapPin, Phone, MessageCircle, Clock, Send } from "lucide-react"
import { useState } from "react"

const contactMethods = [
    {
        icon: Mail,
        title: "Email",
        description: "Send us an email anytime",
        value: "support@payago.in",
        link: "mailto:support@payago.in",
        color: "#C9A962",
    },
    {
        icon: MessageCircle,
        title: "Live Chat",
        description: "Available 9am-6pm GMT",
        value: "Start a conversation",
        link: "#",
        color: "#00D4FF",
    },
    {
        icon: Phone,
        title: "Phone",
        description: "Mon-Fri, 9am-6pm GMT",
        value: "+44 7721 873786",
        link: "tel:+447721873786",
        color: "#7C5CFF",
    },
    {
        icon: MapPin,
        title: "Office",
        description: "Visit us in person",
        value: "London, United Kingdom",
        link: "#",
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

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "general",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsSubmitted(true)
    }

    return (
        <main className="min-h-screen bg-[#04060A]">
            {/* Header */}
            <header className="border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/payago-logo.jpg" alt="PayaGo" className="w-10 h-10 object-cover rounded-xl" />
                        <span className="text-white font-semibold">PayaGo</span>
                    </Link>
                    <Link href="/" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C9A962]/10 rounded-full blur-[200px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                        Get in
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent ml-3">
                            touch
                        </span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
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
                                    className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                                        style={{
                                            background: `linear-gradient(135deg, ${method.color}30, ${method.color}10)`,
                                        }}
                                    >
                                        <Icon className="w-6 h-6" style={{ color: method.color }} />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-1">{method.title}</h3>
                                    <p className="text-white/40 text-sm mb-3">{method.description}</p>
                                    <p className="text-white/70 font-medium group-hover:text-[#C9A962] transition-colors">
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
                    <div className="p-8 lg:p-12 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-white mb-3">Send us a message</h2>
                            <p className="text-white/50">We typically respond within 24 hours</p>
                        </div>

                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white/60 text-sm mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A962]/50 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white/60 text-sm mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A962]/50 transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white/60 text-sm mb-2">Department</label>
                                        <select
                                            value={formData.department}
                                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#C9A962]/50 transition-all appearance-none cursor-pointer"
                                        >
                                            {departments.map((dept) => (
                                                <option key={dept.value} value={dept.value} className="bg-[#0B1220] text-white">
                                                    {dept.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-white/60 text-sm mb-2">Subject</label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A962]/50 transition-all"
                                            placeholder="How can we help?"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white/60 text-sm mb-2">Message</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        rows={6}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A962]/50 transition-all resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1E3A5F] py-4 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <span className="w-5 h-5 border-2 border-[#1E3A5F]/30 border-t-[#1E3A5F] rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 rounded-full bg-[#4AD7A2]/20 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-[#4AD7A2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Message sent!</h3>
                                <p className="text-white/60 mb-8">We'll get back to you within 24 hours.</p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
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
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <Clock className="w-12 h-12 text-[#C9A962] mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">Need an answer now?</h2>
                    <p className="text-white/60 mb-8">Check our FAQ for instant answers to common questions.</p>
                    <Link
                        href="/faq"
                        className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                    >
                        View FAQ
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center text-white/30 text-sm">
                    © 2026 PAYAGO LTD. All rights reserved.
                </div>
            </footer>
        </main>
    )
}
