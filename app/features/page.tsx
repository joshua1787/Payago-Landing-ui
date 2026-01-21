import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Percent, Eye, Gauge, Shield, Smartphone, Globe, Users, CreditCard, Zap, Bell, BarChart3, Lock } from "lucide-react"

export const metadata: Metadata = {
    title: "Features — PayaGo",
    description: "Explore all PayaGo features: auto-split payments, virtual cards, expense tracking, spending limits, and more.",
}

const featureCategories = [
    {
        title: "Split Payments",
        description: "The core of PayaGo",
        features: [
            {
                icon: Percent,
                title: "Custom Split Ratios",
                description: "Split 50/50, 70/30, or any ratio you want. Each member chooses their share, changeable anytime.",
                color: "#C9A962",
            },
            {
                icon: Zap,
                title: "Instant Splitting",
                description: "The moment someone pays, everyone is charged their share. No delays, no manual transfers.",
                color: "#00D4FF",
            },
            {
                icon: Users,
                title: "Unlimited Groups",
                description: "Create as many shared wallets as you need — for trips, households, events, or anything else.",
                color: "#7C5CFF",
            },
        ]
    },
    {
        title: "Virtual Cards",
        description: "Pay anywhere, instantly",
        features: [
            {
                icon: CreditCard,
                title: "Instant Virtual Cards",
                description: "Get a virtual Visa card the moment you join a group. No waiting, no paperwork.",
                color: "#4AD7A2",
            },
            {
                icon: Smartphone,
                title: "Apple Pay & Google Pay",
                description: "Add your card to your phone's wallet for contactless payments everywhere.",
                color: "#FF6B6B",
            },
            {
                icon: Globe,
                title: "Works Worldwide",
                description: "Pay anywhere Visa is accepted — over 80 million merchants globally.",
                color: "#C9A962",
            },
        ]
    },
    {
        title: "Tracking & Control",
        description: "Complete visibility",
        features: [
            {
                icon: Eye,
                title: "Real-Time Tracking",
                description: "See every transaction as it happens. Know who paid what, when, and where.",
                color: "#00D4FF",
            },
            {
                icon: BarChart3,
                title: "Expense Categories",
                description: "Automatic categorization of spending. Understand where your money goes.",
                color: "#7C5CFF",
            },
            {
                icon: Gauge,
                title: "Spending Limits",
                description: "Set transaction limits and monthly caps. Stay in control of your budget.",
                color: "#4AD7A2",
            },
        ]
    },
    {
        title: "Security",
        description: "Bank-grade protection",
        features: [
            {
                icon: Shield,
                title: "PCI-DSS Level 1",
                description: "The highest level of payment security certification. Your data is encrypted end-to-end.",
                color: "#C9A962",
            },
            {
                icon: Lock,
                title: "Privacy First",
                description: "No one sees your bank balance or card details. Not even other group members.",
                color: "#FF6B6B",
            },
            {
                icon: Bell,
                title: "Instant Alerts",
                description: "Get notified of every transaction and any suspicious activity immediately.",
                color: "#00D4FF",
            },
        ]
    },
]

export default function FeaturesPage() {
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
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A962]/10 rounded-full blur-[200px]" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00D4FF]/10 rounded-full blur-[200px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                        <span className="text-sm font-medium text-white/60">Powerful Features</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                        Everything you
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent ml-3">
                            need
                        </span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Built for real life. Designed for groups. Trusted by thousands.
                    </p>
                </div>
            </section>

            {/* Feature Categories */}
            {featureCategories.map((category, catIndex) => (
                <section key={catIndex} className="py-24 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">{category.title}</h2>
                            <p className="text-white/40 text-lg">{category.description}</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {category.features.map((feature, index) => {
                                const Icon = feature.icon
                                return (
                                    <div
                                        key={index}
                                        className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-2"
                                    >
                                        <div
                                            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-110"
                                            style={{
                                                background: `linear-gradient(135deg, ${feature.color}30, ${feature.color}10)`,
                                            }}
                                        >
                                            <Icon className="w-7 h-7" style={{ color: feature.color }} />
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                        <p className="text-white/50 leading-relaxed">{feature.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            ))}

            {/* Coming Soon */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 mb-6">
                        <span className="text-sm font-medium text-[#7C5CFF]">Coming Soon</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">And we're just getting started</h2>
                    <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
                        Multi-currency support, recurring payments, business accounts, and more.
                        Join the waitlist to be first to know.
                    </p>
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
