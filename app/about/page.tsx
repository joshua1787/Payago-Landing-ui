import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Target, Heart, Shield, Users, Globe, Zap } from "lucide-react"

export const metadata: Metadata = {
    title: "About — PayaGo",
    description: "Learn about PayaGo's mission to make shared expenses effortless. Our story, values, and the team behind the product.",
}

const values = [
    {
        icon: Heart,
        title: "User First",
        description: "Every decision we make starts with one question: does this make our users' lives easier? If not, we don't do it.",
        color: "#FF6B6B",
    },
    {
        icon: Shield,
        title: "Trust & Security",
        description: "Your money and data are sacred. We use bank-grade security and will never compromise on protecting what matters.",
        color: "#4AD7A2",
    },
    {
        icon: Zap,
        title: "Simplicity",
        description: "Complexity is easy. Simplicity is hard. We work tirelessly to hide complexity and deliver elegant experiences.",
        color: "#C9A962",
    },
    {
        icon: Users,
        title: "Community",
        description: "We build for groups, not individuals. When people come together, magic happens — we just remove the friction.",
        color: "#00D4FF",
    },
]

const timeline = [
    {
        year: "2024",
        title: "The Problem",
        description: "Our founders were on a trip together and spent more time settling expenses than enjoying the destination. There had to be a better way.",
    },
    {
        year: "2024",
        title: "Research",
        description: "We interviewed hundreds of people about shared expenses. The frustration was universal. Existing solutions were clunky and still required manual work.",
    },
    {
        year: "2025",
        title: "Building",
        description: "We assembled a team of fintech veterans, designers, and engineers to build something truly different. Auto-splitting was born.",
    },
    {
        year: "2026",
        title: "Launch",
        description: "After rigorous testing with thousands of beta users, PayaGo is ready for the world. Our upcoming launch marks a new era for shared expenses.",
    },
]

const team = [
    {
        name: "Dickson Patrick",
        role: "Founder & CEO",
        bio: "Leads company vision, business strategy, and product direction. Drives partnerships, growth initiatives, and strategic decision-making.",
        avatar: "DP",
    },
    {
        name: "Joshua",
        role: "Co-Founder & CTO",
        bio: "Leads technology vision, system architecture, and engineering. Ensures security, performance, and production readiness.",
        avatar: "JV",
    },
    {
        name: "Kishore Dayanithi",
        role: "Co-Founder & CFO",
        bio: "Owns financial strategy, budgeting, and compliance. Oversees regulatory alignment and financial governance.",
        avatar: "KD",
    },
    {
        name: "Aravinthan",
        role: "Co-Founder & COO",
        bio: "Manages day-to-day operations and execution excellence. Drives operational efficiency and cross-functional coordination.",
        avatar: "AR",
    },
]

export default function AboutPage() {
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
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#C9A962]/10 rounded-full blur-[200px]" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#00D4FF]/10 rounded-full blur-[200px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8">
                        Making shared expenses
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent block mt-2">
                            effortless
                        </span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                        We believe money should bring people together, not drive them apart.
                        PayaGo removes the friction from shared finances so you can focus on what matters.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A962]/10 border border-[#C9A962]/20 mb-6">
                                <Target className="w-4 h-4 text-[#C9A962]" />
                                <span className="text-sm font-medium text-[#C9A962]">Our Mission</span>
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                To eliminate the stress of shared expenses worldwide
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed mb-6">
                                Every year, billions of pounds are owed between friends, families, and colleagues.
                                These debts create tension, awkwardness, and broken relationships.
                            </p>
                            <p className="text-white/60 text-lg leading-relaxed">
                                We're on a mission to make shared expenses invisible. When splitting happens automatically,
                                people can focus on experiences, not spreadsheets.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#C9A962]/20 to-[#00D4FF]/10 p-12 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-8xl font-bold bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent mb-4">
                                        £0
                                    </div>
                                    <div className="text-white/60 text-xl">owed between friends</div>
                                    <div className="text-white/40 text-sm mt-2">That's our goal</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
                        <p className="text-white/60 text-lg">The principles that guide everything we do</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon
                            return (
                                <div
                                    key={index}
                                    className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300"
                                >
                                    <div
                                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                                        style={{
                                            background: `linear-gradient(135deg, ${value.color}30, ${value.color}10)`,
                                        }}
                                    >
                                        <Icon className="w-7 h-7" style={{ color: value.color }} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                                    <p className="text-white/50 leading-relaxed">{value.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
                        <p className="text-white/60 text-lg">From frustration to solution</p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A962] via-[#00D4FF] to-[#7C5CFF]" />

                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <div key={index} className="relative pl-24">
                                    {/* Dot */}
                                    <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-[#04060A] border-2 border-[#C9A962]" />

                                    <div className="text-[#C9A962] text-sm font-medium mb-2">{item.year}</div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-white/60 leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Founding Team</h2>
                        <p className="text-white/60 text-lg">The people building the future of shared expenses</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="text-center p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300"
                            >
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A962] to-[#00D4FF] flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                                    {member.avatar}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                                <div className="text-[#C9A962] text-sm mb-4">{member.role}</div>
                                <p className="text-white/50 text-sm leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: "£2M+", label: "Already split in beta" },
                            { value: "15K+", label: "Beta testers" },
                            { value: "45", label: "Countries supported" },
                            { value: "4.9★", label: "Average rating" },
                        ].map((stat, index) => (
                            <div key={index}>
                                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-white/40">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Join us on our mission</h2>
                    <p className="text-white/60 text-lg mb-8">Be part of the movement to make shared expenses effortless.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1E3A5F] px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                        >
                            Get Early Access
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/careers"
                            className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                        >
                            View Careers
                        </Link>
                    </div>
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
