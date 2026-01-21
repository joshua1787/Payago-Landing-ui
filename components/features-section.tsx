"use client"

import { useEffect, useRef, useState } from "react"
import { Percent, Eye, Gauge, Shield, Smartphone, Globe } from "lucide-react"

const features = [
    {
        icon: Percent,
        title: "Choose Your Ratio",
        description: "Split 50/50, 70/30, or any way you want. Change it anytime, even after payment.",
        color: "#C9A962",
        gradient: "from-[#C9A962] to-[#E5C77D]",
    },
    {
        icon: Eye,
        title: "Track Everything",
        description: "See every transaction in real-time. Know who paid what, when, and how much.",
        color: "#00D4FF",
        gradient: "from-[#00D4FF] to-[#00A8CC]",
    },
    {
        icon: Gauge,
        title: "Set Your Limits",
        description: "Control your spending with transaction and monthly limits. Stay in budget.",
        color: "#7C5CFF",
        gradient: "from-[#7C5CFF] to-[#9B7EFF]",
    },
    {
        icon: Shield,
        title: "Bank-Grade Security",
        description: "PCI-DSS Level 1 compliant. Your data is encrypted and never shared.",
        color: "#4AD7A2",
        gradient: "from-[#4AD7A2] to-[#6EECC0]",
    },
    {
        icon: Smartphone,
        title: "Apple Pay & Google Pay",
        description: "Add your virtual card to your phone's wallet. Pay contactless everywhere.",
        color: "#FF6B6B",
        gradient: "from-[#FF6B6B] to-[#FF8E8E]",
    },
    {
        icon: Globe,
        title: "Works Worldwide",
        description: "Accepted anywhere Visa and Mastercard are. Perfect for travel.",
        color: "#C9A962",
        gradient: "from-[#C9A962] to-[#E5C77D]",
    },
]

function FeatureCard({ feature, index, isVisible }: { feature: typeof features[0]; index: number; isVisible: boolean }) {
    const Icon = feature.icon
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className={`relative transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
            style={{ transitionDelay: `${index * 100}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="group relative h-full bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-3xl p-8 transition-all duration-500 hover:border-white/10 overflow-hidden">
                {/* Gradient glow on hover */}
                <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{
                        background: `radial-gradient(circle at 30% 30%, ${feature.color}08, transparent 50%)`,
                    }}
                />

                {/* Animated gradient border on hover */}
                <div
                    className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        background: `linear-gradient(135deg, ${feature.color}20, transparent, ${feature.color}10)`,
                        padding: '1px',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                    }}
                />

                <div className="relative z-10">
                    {/* Icon */}
                    <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 transition-all duration-300 group-hover:scale-110 bg-gradient-to-br ${feature.gradient}`}
                    >
                        <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                        style={{ backgroundImage: isHovered ? `linear-gradient(to right, ${feature.color}, white)` : 'none' }}>
                        {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                        {feature.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export function FeaturesSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#04060A] via-[#0B1220] to-[#04060A]" />

            {/* Decorative elements */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C9A962]/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-[150px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section header */}
                <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <span className="text-sm font-medium text-white/60">Powerful Features</span>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                        Everything you need
                    </h2>
                    <p className="text-xl text-white/40 max-w-2xl mx-auto">
                        Built for real life. Designed for groups. Trusted by thousands.
                    </p>
                </div>

                {/* Features grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={feature.title} feature={feature} index={index} isVisible={isVisible} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className={`text-center mt-16 transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <p className="text-white/40 mb-4">Plus multi-currency support, instant notifications, and more.</p>
                    <a href="#" className="inline-flex items-center gap-2 text-[#C9A962] hover:text-[#E5C77D] transition-colors font-medium">
                        See all features
                        <span className="text-lg">→</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
