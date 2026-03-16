import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Sparkles, Building2, Star } from "lucide-react"

export const metadata: Metadata = {
    title: "PayaGo Pricing — Free for Travellers, Always",
    description: "PayaGo is 100% free for travellers. We earn a commission from travel booking partners when you book — you pay the same prices as booking direct.",
    openGraph: {
        title: "PayaGo Pricing — Free for Travellers, Always",
        description: "PayaGo is free for travellers. We earn from partner commissions — you pay the same price as booking direct.",
        url: "https://www.payago.in/pricing",
        type: "website",
    },
    alternates: {
        canonical: "https://www.payago.in/pricing",
    },
}

const plans = [
    {
        name: "Traveller",
        price: "Free",
        period: "forever",
        tagline: "Everything you need to plan and book group trips",
        description: "Core AI planning, group coordination, and in-app booking — all free. We earn a commission from travel booking partners when you book, not from you.",
        features: [
            "AI itinerary generation (30 seconds)",
            "3 complete trip options per search",
            "Voice-first trip creation",
            "Group invite & voting system",
            "Group payments (each person pays their share)",
            "In-app booking (hotels, flights, activities)",
            "Pre-trip reminders & packing list",
            "Weather alerts & real-time adaptation",
            "Built-in group chat",
            "Post-trip summary",
        ],
        notIncluded: [
            "Travel DNA personalisation",
            "Unlimited saved trips",
        ],
        cta: "Get Early Access — Free",
        popular: false,
        gradient: "from-white/[0.03] to-transparent",
        borderColor: "border-slate-200",
        icon: Star,
    },
    {
        name: "Explorer",
        price: "Coming Soon",
        period: "",
        tagline: "For frequent travellers who want PayaGo to know them",
        description: "Everything in Traveller, plus Travel DNA personalisation that learns your preferences across trips and gets smarter with every journey.",
        features: [
            "Everything in Traveller",
            "Travel DNA (AI learns your preferences)",
            "Unlimited saved & past trips",
            "Priority booking access",
            "Early feature access",
            "Advanced budget analytics",
            "Multi-currency trip planning",
            "Priority support",
        ],
        notIncluded: [],
        cta: "Join Waitlist",
        popular: true,
        gradient: "from-[#C9A962]/10 to-transparent",
        borderColor: "border-[#C9A962]/40",
        icon: Sparkles,
    },
    {
        name: "Business",
        price: "Custom",
        period: "",
        tagline: "For travel agencies, companies, and teams",
        description: "White-label options, API access, and dedicated support for businesses that want to offer PayaGo-powered travel planning to their clients or employees.",
        features: [
            "Everything in Explorer",
            "API access",
            "White-label options",
            "Dedicated account manager",
            "Custom integrations",
            "SLA guarantee",
            "Team management dashboard",
            "Volume pricing on bookings",
        ],
        notIncluded: [],
        cta: "Contact Us",
        popular: false,
        gradient: "from-[#7C5CFF]/10 to-transparent",
        borderColor: "border-[#7C5CFF]/30",
        icon: Building2,
    },
]

const howWeEarn = [
    {
        partner: "Hotels",
        type: "Accommodation bookings",
        how: "We receive a commission from hotel booking providers when you book accommodation through PayaGo. The price you see is the same you'd find booking directly — we never mark it up.",
        color: "#C9A962",
    },
    {
        partner: "Flights",
        type: "Flight bookings",
        how: "Flight booking partners pay us a referral fee for flights booked through PayaGo. You get the best live fares — no surcharge, no service fee added by us.",
        color: "#00D4FF",
    },
    {
        partner: "Activities",
        type: "Tours & experiences",
        how: "Activity providers pay a commission on bookings. Same price as booking direct — we just make it happen automatically inside your itinerary.",
        color: "#7C5CFF",
    },
]

const faqs = [
    {
        q: "Is PayaGo really free? What's the catch?",
        a: "No catch. PayaGo earns a commission from travel booking partners when you complete a booking through the app. The prices you pay are identical to booking directly — we never mark up fares or add service fees. It's the same model as comparison sites, except we also build the itinerary and coordinate your whole group.",
    },
    {
        q: "Does PayaGo add any fees on top of bookings?",
        a: "No. Zero booking fees, zero service charges, zero markup. The prices shown are live prices direct from booking providers. We earn from the partner, not from you.",
    },
    {
        q: "Are there any payment processing fees?",
        a: "Payment processing costs are included in the total shown. You'll never see a surprise fee at checkout.",
    },
    {
        q: "When will the Explorer plan launch and what will it cost?",
        a: "We haven't set a price yet. Explorer will launch after our April 2026 iOS/Android release. Join the waitlist to be notified first — early access users will get preferential pricing.",
    },
    {
        q: "Can I get a refund if I need to cancel a trip?",
        a: "Refunds follow each booking provider's cancellation policy. Typically: 100% refund more than 14 days before departure, 50% for 7–14 days, and non-refundable within 7 days (unless the provider offers more flexibility). We handle the refund request on your behalf.",
    },
]

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-white">
            <header className="border-b border-slate-100 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex items-center gap-2"><div className="relative w-7 h-7 flex-shrink-0"><div className="absolute inset-0 rounded-full bg-[#0f1b2d] ring-2 ring-[#00D4FF]" /><svg viewBox="0 0 32 32" className="absolute inset-0 w-full h-full" fill="none"><polygon points="16,8 20,16 16,13 12,16" fill="#00D4FF" opacity="0.9"/><polygon points="16,24 12,16 16,19 20,16" fill="#ffffff" opacity="0.5"/></svg></div><span className="text-[#0f1b2d] font-black text-lg tracking-[0.1em] uppercase" style={{ fontFamily: 'var(--font-michroma), sans-serif' }}>PayaGo</span></div>
                        
                    </Link>
                    <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#C9A962]/8 rounded-full blur-[200px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4AD7A2]/10 border border-[#4AD7A2]/20 mb-8">
                        <span className="w-2 h-2 bg-[#4AD7A2] rounded-full" />
                        <span className="text-sm font-medium text-[#4AD7A2]">Free for travellers — always</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                        You pay nothing.
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent block">Partners pay us.</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        {"PayaGo earns a commission from travel booking partners when you book. You get the same prices you'd find anywhere else — plus an AI that builds the entire trip for you."}
                    </p>
                </div>
            </section>

            {/* How we earn */}
            <section className="py-16 border-t border-slate-100">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">How the model works</h2>
                        <p className="text-slate-500">Same prices. Better experience. We earn from partners, not you.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {howWeEarn.map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="text-lg font-bold mb-1" style={{ color: item.color }}>{item.partner}</div>
                                <div className="text-slate-400 text-xs mb-4 uppercase tracking-wider">{item.type}</div>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.how}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plans */}
            <section className="py-24 border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple plans</h2>
                        <p className="text-slate-500 text-lg">Start free. Everything you need is in the free tier.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {plans.map((plan, index) => {
                            const Icon = plan.icon
                            return (
                                <div key={index} className={`relative rounded-3xl p-8 border bg-gradient-to-b ${plan.gradient} ${plan.borderColor} flex flex-col`}>
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] text-sm font-semibold rounded-full flex items-center gap-1">
                                            <Sparkles className="w-3.5 h-3.5" />
                                            Coming Soon
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: plan.popular ? '#C9A962/20' : plan.name === 'Business' ? '#7C5CFF20' : 'rgba(255,255,255,0.05)' }}>
                                                <Icon className="w-5 h-5" style={{ color: plan.popular ? '#C9A962' : plan.name === 'Business' ? '#7C5CFF' : 'rgba(255,255,255,0.4)' }} />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                                        </div>
                                        <p className="text-slate-500 text-sm mb-4 leading-snug">{plan.tagline}</p>
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                                            {plan.period && <span className="text-slate-400">{plan.period}</span>}
                                        </div>
                                        <p className="text-slate-400 text-xs leading-relaxed">{plan.description}</p>
                                    </div>

                                    <div className="space-y-3 flex-1 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <Check className="w-4 h-4 text-[#4AD7A2] flex-shrink-0 mt-0.5" />
                                                <span className="text-slate-600 text-sm leading-snug">{feature}</span>
                                            </div>
                                        ))}
                                        {plan.notIncluded.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3 opacity-40">
                                                <div className="w-4 h-4 flex-shrink-0 mt-0.5 flex items-center justify-center">
                                                    <div className="w-3 h-px bg-white/40" />
                                                </div>
                                                <span className="text-slate-500 text-sm leading-snug">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link
                                        href="/"
                                        className={`w-full py-4 rounded-xl font-semibold transition-all text-center ${plan.popular
                                            ? 'bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] hover:opacity-90'
                                            : plan.name === 'Business'
                                            ? 'bg-[#7C5CFF]/20 border border-[#7C5CFF]/30 text-[#7C5CFF] hover:bg-[#7C5CFF]/30'
                                            : 'bg-white/10 text-slate-900 hover:bg-white/15'
                                        }`}
                                    >
                                        {plan.cta}
                                    </Link>
                                </div>
                            )
                        })}
                    </div>

                    <p className="text-center text-slate-400 text-sm mt-8">
                        No credit card required for Traveller plan · No hidden fees · No transaction surcharges
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 border-t border-slate-100">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">Pricing FAQ</h2>
                    <div className="space-y-0 divide-y divide-white/5">
                        {faqs.map((faq, index) => (
                            <div key={index} className="py-8">
                                <h3 className="text-lg font-semibold text-slate-900 mb-3">{faq.q}</h3>
                                <p className="text-slate-500 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">
                        Start planning your next group trip.
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent"> For free.</span>
                    </h2>
                    <p className="text-slate-500 text-lg mb-10">No credit card. No commitment. Just better group travel.</p>
                    <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                        Get Early Access
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            <footer className="py-8 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
                    © 2026 PayaGo Ltd. Registered in England & Wales.
                </div>
            </footer>
        </main>
    )
}
