import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, MapPin, Briefcase, Clock, DollarSign, Heart, Zap, Globe, Users } from "lucide-react"

export const metadata: Metadata = {
    title: "Careers — PayaGo",
    description: "Join the PayaGo team. We're building the future of shared expenses and looking for talented people to join us.",
}

const benefits = [
    {
        icon: DollarSign,
        title: "Competitive Salary",
        description: "Above-market compensation with equity options for all employees.",
    },
    {
        icon: Globe,
        title: "Remote First",
        description: "Work from anywhere. We hire globally and trust you to manage your time.",
    },
    {
        icon: Heart,
        title: "Health & Wellbeing",
        description: "Comprehensive health insurance, mental health support, and wellness budget.",
    },
    {
        icon: Zap,
        title: "Learning Budget",
        description: "£2,000 annual budget for courses, conferences, and personal development.",
    },
    {
        icon: Clock,
        title: "Flexible Hours",
        description: "Work when you're most productive. No micromanagement, just results.",
    },
    {
        icon: Users,
        title: "Team Events",
        description: "Regular team meetups, offsites, and company-wide gatherings.",
    },
]

const openings = [
    {
        title: "Senior Backend Engineer",
        department: "Engineering",
        location: "Remote (UK/EU)",
        type: "Full-time",
        description: "Build and scale our payment infrastructure handling millions of transactions.",
    },
    {
        title: "Senior iOS Engineer",
        department: "Engineering",
        location: "Remote (UK/EU)",
        type: "Full-time",
        description: "Craft beautiful, performant iOS experiences for our growing user base.",
    },
    {
        title: "Senior Android Engineer",
        department: "Engineering",
        location: "Remote (UK/EU)",
        type: "Full-time",
        description: "Build the Android app that millions rely on for shared expenses.",
    },
    {
        title: "Product Designer",
        department: "Design",
        location: "Remote (UK/EU)",
        type: "Full-time",
        description: "Design intuitive, delightful experiences that make finance feel simple.",
    },
    {
        title: "Head of Marketing",
        department: "Marketing",
        location: "London, UK",
        type: "Full-time",
        description: "Lead our marketing efforts and help us reach millions of users.",
    },
    {
        title: "Customer Success Manager",
        department: "Operations",
        location: "Remote (UK)",
        type: "Full-time",
        description: "Ensure our users have an exceptional experience with PayaGo.",
    },
    {
        title: "Compliance Analyst",
        department: "Legal & Compliance",
        location: "London, UK",
        type: "Full-time",
        description: "Navigate regulatory requirements and keep our users safe.",
    },
    {
        title: "Data Analyst",
        department: "Analytics",
        location: "Remote (UK/EU)",
        type: "Full-time",
        description: "Turn data into insights that drive product and business decisions.",
    },
]

const values = [
    {
        title: "Move Fast",
        description: "We value speed and iteration. Ship early, learn quickly, and improve constantly.",
    },
    {
        title: "User Obsessed",
        description: "Every decision starts with the user. Their problems are our problems.",
    },
    {
        title: "Own It",
        description: "Take ownership of your work. Be accountable, be reliable, be excellent.",
    },
    {
        title: "Stay Humble",
        description: "We're all learning. Ego-free collaboration makes us stronger together.",
    },
]

export default function CareersPage() {
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
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#7C5CFF]/10 rounded-full blur-[200px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4AD7A2]/10 border border-[#4AD7A2]/20 mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4AD7A2] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4AD7A2]"></span>
                        </span>
                        <span className="text-sm font-medium text-[#4AD7A2]">We're hiring!</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8">
                        Build the future of
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent block mt-2">
                            shared finance
                        </span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                        Join a team of passionate builders solving real problems for millions of people.
                        We're remote-first, well-funded, and just getting started.
                    </p>
                </div>
            </section>

            {/* Culture Values */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">How we work</h2>
                        <p className="text-white/60 text-lg">Our principles for building something great</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="text-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A962]/20 to-[#C9A962]/5 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-[#C9A962]">{index + 1}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Benefits & Perks</h2>
                        <p className="text-white/60 text-lg">We take care of our team so they can take care of our users</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon
                            return (
                                <div
                                    key={index}
                                    className="p-8 rounded-2xl bg-white/[0.02] border border-white/5"
                                >
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#C9A962]/10 mb-6">
                                        <Icon className="w-6 h-6 text-[#C9A962]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                                    <p className="text-white/50 leading-relaxed">{benefit.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Open Positions</h2>
                        <p className="text-white/60 text-lg">Find your next role at PayaGo</p>
                    </div>

                    <div className="space-y-4">
                        {openings.map((job, index) => (
                            <div
                                key={index}
                                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#C9A962]/30 transition-all duration-300 cursor-pointer hover:-translate-x-1"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-white group-hover:text-[#C9A962] transition-colors">
                                                {job.title}
                                            </h3>
                                            <span className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-xs">
                                                {job.department}
                                            </span>
                                        </div>
                                        <p className="text-white/50 text-sm mb-3">{job.description}</p>
                                        <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="w-4 h-4" />
                                                {job.type}
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[#C9A962] transition-colors flex-shrink-0" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* No Fit CTA */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Don't see the right role?</h2>
                    <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                        We're always looking for talented people. Send us your CV and tell us why you'd be a great fit.
                    </p>
                    <a
                        href="mailto:careers@payago.in"
                        className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                    >
                        Send Your CV
                        <ArrowRight className="w-4 h-4" />
                    </a>
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
