"use client"

import { useEffect, useRef, useState } from "react"
import { CreditCard, Users, Wallet, ArrowRight } from "lucide-react"

const steps = [
    {
        number: "01",
        title: "Connect",
        subtitle: "your bank in seconds",
        description: "Link your existing debit or credit card securely. No new accounts needed.",
        icon: Wallet,
        color: "#C9A962",
    },
    {
        number: "02",
        title: "Create",
        subtitle: "groups & wallets",
        description: "Set up shared wallets for trips, households, or any group expense.",
        icon: Users,
        color: "#00D4FF",
    },
    {
        number: "03",
        title: "Get",
        subtitle: "your virtual card",
        description: "Each member gets a virtual card linked to Apple Pay or Google Pay.",
        icon: CreditCard,
        color: "#7C5CFF",
    },
    {
        number: "04",
        title: "Pay",
        subtitle: "& auto-split instantly",
        description: "Pay with any group member's card. Bills split automatically.",
        icon: ArrowRight,
        color: "#4AD7A2",
    },
]

function StepCard({ step, index, isVisible }: { step: typeof steps[0]; index: number; isVisible: boolean }) {
    const Icon = step.icon

    return (
        <div
            className={`relative transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            {/* Connecting line */}
            {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-8 w-16 h-[2px] bg-gradient-to-r from-white/10 to-transparent" />
            )}

            <div className="group relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--glow)]/5"
                style={{ '--glow': step.color } as React.CSSProperties}>
                {/* Glow on hover */}
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: `radial-gradient(circle at center, ${step.color}10, transparent 70%)` }}
                />

                <div className="relative z-10">
                    {/* Step number */}
                    <div
                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-xl font-bold mb-6 transition-transform duration-300 group-hover:scale-110"
                        style={{
                            background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)`,
                            color: step.color,
                            border: `1px solid ${step.color}30`
                        }}
                    >
                        {step.number}
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-bold text-white mb-1">
                        {step.title}
                    </h3>
                    <p className="text-lg text-white/40 mb-4">{step.subtitle}</p>

                    {/* Description */}
                    <p className="text-white/60 leading-relaxed">{step.description}</p>

                    {/* Icon */}
                    <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-30 transition-opacity duration-300">
                        <Icon className="w-16 h-16" style={{ color: step.color }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export function HowItWorksSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.2 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#04060A]" />

            {/* Gradient accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#C9A962]/5 to-transparent blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section header */}
                <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <span className="text-sm font-medium text-white/60">Simple & Intuitive</span>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                        Four steps to
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent ml-3">
                            freedom
                        </span>
                    </h2>
                    <p className="text-xl text-white/40 max-w-2xl mx-auto">
                        From signup to splitting your first bill in under 2 minutes.
                    </p>
                </div>

                {/* Steps grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <StepCard key={step.number} step={step} index={index} isVisible={isVisible} />
                    ))}
                </div>
            </div>
        </section>
    )
}
