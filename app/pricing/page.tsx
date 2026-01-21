import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, X, Sparkles } from "lucide-react"

export const metadata: Metadata = {
    title: "Pricing — PayaGo",
    description: "PayaGo pricing: Free for personal use. Simple, transparent pricing with no hidden fees.",
}

const plans = [
    {
        name: "Personal",
        price: "Free",
        period: "forever",
        description: "Perfect for individuals and small groups",
        features: [
            { text: "Unlimited groups", included: true },
            { text: "Virtual card per group", included: true },
            { text: "Real-time expense tracking", included: true },
            { text: "Apple Pay & Google Pay", included: true },
            { text: "Custom split ratios", included: true },
            { text: "Instant notifications", included: true },
            { text: "24/7 support", included: true },
            { text: "Export to CSV", included: true },
            { text: "Priority support", included: false },
            { text: "Business features", included: false },
        ],
        cta: "Get Started Free",
        popular: false,
        gradient: "from-white/10 to-white/5",
    },
    {
        name: "Premium",
        price: "£4.99",
        period: "/month",
        description: "For power users and larger groups",
        features: [
            { text: "Everything in Personal", included: true },
            { text: "Unlimited virtual cards", included: true },
            { text: "Priority support", included: true },
            { text: "Advanced analytics", included: true },
            { text: "Recurring payments", included: true },
            { text: "Multi-currency", included: true },
            { text: "Spending insights", included: true },
            { text: "Custom categories", included: true },
            { text: "API access", included: false },
            { text: "Dedicated account manager", included: false },
        ],
        cta: "Start Free Trial",
        popular: true,
        gradient: "from-[#C9A962]/20 to-[#C9A962]/5",
    },
    {
        name: "Business",
        price: "Custom",
        period: "",
        description: "For teams and organizations",
        features: [
            { text: "Everything in Premium", included: true },
            { text: "Unlimited team members", included: true },
            { text: "Dedicated account manager", included: true },
            { text: "API access", included: true },
            { text: "Custom integrations", included: true },
            { text: "Expense policies", included: true },
            { text: "Approval workflows", included: true },
            { text: "SSO authentication", included: true },
            { text: "SLA guarantee", included: true },
            { text: "On-premise option", included: true },
        ],
        cta: "Contact Sales",
        popular: false,
        gradient: "from-[#7C5CFF]/20 to-[#7C5CFF]/5",
    },
]

const faqs = [
    {
        q: "Is there really no catch with the free plan?",
        a: "No catch! The Personal plan is completely free and includes everything most users need. We make money from our Premium and Business plans, so we can offer a generous free tier."
    },
    {
        q: "Can I upgrade or downgrade anytime?",
        a: "Absolutely. You can change your plan at any time. If you upgrade, you'll be charged the prorated amount. If you downgrade, the change takes effect at the end of your billing period."
    },
    {
        q: "Are there any transaction fees?",
        a: "No transaction fees on any plan for standard domestic payments. International payments may incur a small FX fee at interbank rates."
    },
    {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards, as well as direct bank transfers for annual business plans."
    },
]

export default function PricingPage() {
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#C9A962]/10 rounded-full blur-[200px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                        <span className="text-sm font-medium text-white/60">Simple Pricing</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                        Free to start.
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent block">
                            Scale when ready.
                        </span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        No hidden fees. No surprises. Cancel anytime.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative rounded-3xl p-8 border ${plan.popular
                                        ? 'border-[#C9A962]/50 bg-gradient-to-b from-[#C9A962]/10 to-transparent'
                                        : 'border-white/10 bg-gradient-to-b from-white/5 to-transparent'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1E3A5F] text-sm font-semibold rounded-full flex items-center gap-1">
                                        <Sparkles className="w-4 h-4" />
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-white/40 text-sm mb-4">{plan.description}</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-bold text-white">{plan.price}</span>
                                        <span className="text-white/40">{plan.period}</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            {feature.included ? (
                                                <Check className="w-5 h-5 text-[#4AD7A2] flex-shrink-0" />
                                            ) : (
                                                <X className="w-5 h-5 text-white/20 flex-shrink-0" />
                                            )}
                                            <span className={feature.included ? 'text-white/70' : 'text-white/30'}>
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className={`w-full py-4 rounded-xl font-semibold transition-all ${plan.popular
                                            ? 'bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1E3A5F] hover:opacity-90'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">Pricing FAQ</h2>
                    <div className="space-y-8">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-white/5 pb-8">
                                <h3 className="text-lg font-semibold text-white mb-3">{faq.q}</h3>
                                <p className="text-white/50 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
                    <p className="text-white/60 text-lg mb-8">Start free and upgrade when you need more.</p>
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
