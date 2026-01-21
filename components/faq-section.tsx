"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
    {
        question: "What is PayaGo?",
        answer: "PayaGo is a digital wallet platform that allows you to create shared wallets with friends, family, or colleagues. Each member gets a virtual card, and when anyone pays, the bill is automatically split according to your chosen ratio. No more chasing people for money or awkward money conversations.",
    },
    {
        question: "How does the auto-split work?",
        answer: "When any group member uses their PayaGo virtual card to make a payment, our system automatically splits the bill according to the ratio you've set. For example, if you have a 50/50 split with a friend and you pay £100 for dinner, you'll be charged £50 and they'll be charged £50 — instantly and automatically.",
    },
    {
        question: "Do I need to pre-load money onto the card?",
        answer: "No! PayaGo connects directly to your existing bank account. When you make a payment, only your share is withdrawn from your account. You don't need to top up or pre-load anything. It's seamless and instant.",
    },
    {
        question: "Is my money safe?",
        answer: "Absolutely. We partner with FCA-regulated institutions and use PCI-DSS Level 1 security — the same standard used by major banks. Your bank details are encrypted and tokenized. No one, not even group members, can access your account information.",
    },
    {
        question: "Can I change the split ratio after payment?",
        answer: "Yes! You can adjust split ratios at any time, even after a payment has been made. This is perfect for situations where you need to reimburse someone or adjust for a one-off expense. All changes are logged and visible to all group members.",
    },
    {
        question: "Where can I use my PayaGo card?",
        answer: "Anywhere that accepts Visa or Mastercard — which is essentially everywhere. Use it for restaurants, online shopping, travel bookings, utility bills, and more. The virtual card works with Apple Pay and Google Pay for contactless payments.",
    },
]

function FAQItem({ faq, index, isVisible }: { faq: typeof faqs[0]; index: number; isVisible: boolean }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            className={`transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-2xl transition-all duration-300"
            >
                <span className="text-left text-lg font-medium text-white pr-4">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-[#C9A962] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-6 py-4 text-white/60 leading-relaxed">
                    {faq.answer}
                </div>
            </div>
        </div>
    )
}

export function FAQSection() {
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
            <div className="absolute inset-0 bg-gradient-to-b from-[#04060A] to-[#0B1220]" />

            <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
                {/* Section header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <span className="text-sm font-medium text-white/60">Got Questions?</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Frequently asked
                    </h2>
                    <p className="text-white/40 text-lg">
                        Everything you need to know about PayaGo
                    </p>
                </div>

                {/* FAQ items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} index={index} isVisible={isVisible} />
                    ))}
                </div>

                {/* CTA */}
                <div className={`text-center mt-12 transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <p className="text-white/40 mb-4">Still have questions?</p>
                    <a
                        href="mailto:support@payago.in"
                        className="inline-flex items-center gap-2 text-[#C9A962] hover:text-[#E5C77D] transition-colors font-medium"
                    >
                        Contact our support team
                        <span>→</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
