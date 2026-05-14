"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
    {
        question: "What is PayaGo?",
        answer: "PayaGo is an AI group travel planner. You describe the trip, PayaGo turns it into itinerary options, your group votes, and the app helps coordinate booking and each traveller's share.",
    },
    {
        question: "How does the AI planning work?",
        answer: "PayaGo reads your destination, dates, budget, group size, and travel style from a natural-language prompt. It then assembles trip options with flights, stays, activities, and a day-by-day plan that the group can review and edit.",
    },
    {
        question: "Can friends vote without downloading the app?",
        answer: "The product is designed around shareable trip links, so friends can review options and vote from a browser. App-only features can be kept for deeper collaboration, cost coordination, and trip documents.",
    },
    {
        question: "Does PayaGo complete bookings for me?",
        answer: "PayaGo helps move a group from plan to booking, but final prices, availability, payment, and confirmation are handled through supported providers. Travellers should review the final provider details before confirming.",
    },
    {
        question: "How does split-cost coordination work?",
        answer: "PayaGo is designed to estimate each traveller's share and keep contribution next steps clear, so one organiser does not have to manage the whole trip manually. Exact payment methods and provider availability can vary by launch market.",
    },
    {
        question: "Is PayaGo available now?",
        answer: "PayaGo is presented as early access. Join the waitlist to be notified when the app is available and when booking handoff features are opened in your region.",
    },
]

function FAQItem({ faq, index, isVisible }: { faq: typeof faqs[0]; index: number; isVisible: boolean }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            className={`transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-2xl transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-300"
            >
                <span className="text-left text-lg font-medium text-white pr-4">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-[#C9A962] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <div
                className={`overflow-hidden transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
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
                <div className={`text-center mb-16 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
                <div className={`text-center mt-12 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
