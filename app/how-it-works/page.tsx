import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Wallet, CreditCard, Users, ArrowRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
    title: "How It Works — PayaGo",
    description: "Learn how PayaGo makes bill splitting automatic. Connect, create groups, get virtual cards, and pay with auto-split.",
}

const steps = [
    {
        number: "01",
        title: "Connect Your Bank",
        subtitle: "Secure & instant setup",
        description: "Link your existing debit or credit card in seconds. We use bank-level encryption and never store your full card details. Your bank connection is secured through our regulated partners.",
        features: [
            "256-bit encryption",
            "PCI-DSS Level 1 compliant",
            "No passwords shared",
            "Disconnect anytime"
        ],
        icon: Wallet,
        color: "#C9A962",
    },
    {
        number: "02",
        title: "Create Groups & Wallets",
        subtitle: "Organize your expenses",
        description: "Set up shared wallets for any purpose — trips, households, couples, events. Invite members via link or email. Each group has its own wallet, settings, and transaction history.",
        features: [
            "Unlimited groups",
            "Custom split ratios",
            "Member permissions",
            "Private & secure"
        ],
        icon: Users,
        color: "#00D4FF",
    },
    {
        number: "03",
        title: "Get Your Virtual Card",
        subtitle: "Instant & free",
        description: "Each group member receives a virtual Visa card linked to the shared wallet. Add it to Apple Pay or Google Pay for contactless payments anywhere in the world.",
        features: [
            "Instant issuance",
            "Apple Pay & Google Pay",
            "Works worldwide",
            "Zero fees"
        ],
        icon: CreditCard,
        color: "#7C5CFF",
    },
    {
        number: "04",
        title: "Pay & Auto-Split",
        subtitle: "Never chase money again",
        description: "When any group member pays with their card, the bill is automatically split according to your chosen ratio. Each person is charged their share instantly. No IOUs, no awkward conversations.",
        features: [
            "Instant split",
            "Real-time notifications",
            "Adjustable ratios",
            "Complete transparency"
        ],
        icon: ArrowRight,
        color: "#4AD7A2",
    },
]

export default function HowItWorksPage() {
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
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A962]/10 rounded-full blur-[150px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[150px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                        <span className="text-sm font-medium text-white/60">Simple & Intuitive</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                        How PayaGo
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent ml-3">
                            works
                        </span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        From signup to splitting your first bill in under 2 minutes.
                        Here's everything you need to know.
                    </p>
                </div>
            </section>

            {/* Steps */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="space-y-24">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            const isEven = index % 2 === 0

                            return (
                                <div
                                    key={step.number}
                                    className={`grid lg:grid-cols-2 gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
                                >
                                    {/* Content */}
                                    <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                                        <div
                                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-2xl font-bold mb-6"
                                            style={{
                                                background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)`,
                                                color: step.color,
                                                border: `1px solid ${step.color}30`
                                            }}
                                        >
                                            {step.number}
                                        </div>

                                        <h2 className="text-4xl font-bold text-white mb-2">{step.title}</h2>
                                        <p className="text-lg text-white/40 mb-6">{step.subtitle}</p>
                                        <p className="text-white/60 text-lg leading-relaxed mb-8">{step.description}</p>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {step.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: step.color }} />
                                                    <span className="text-white/70">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Visual */}
                                    <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                                        <div
                                            className="relative p-12 rounded-3xl border border-white/5"
                                            style={{ background: `linear-gradient(135deg, ${step.color}05, transparent)` }}
                                        >
                                            <div className="flex items-center justify-center">
                                                <div
                                                    className="w-32 h-32 rounded-3xl flex items-center justify-center"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)`,
                                                        boxShadow: `0 0 100px ${step.color}20`
                                                    }}
                                                >
                                                    <Icon className="w-16 h-16" style={{ color: step.color }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
                    <p className="text-white/60 text-lg mb-8">Join the waitlist and be first in line when we launch.</p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1E3A5F] px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                    >
                        Get Early Access
                        <ArrowRight className="w-4 h-4" />
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
