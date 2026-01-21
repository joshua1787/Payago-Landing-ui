"use client"

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { useState } from "react"

const faqs = [
    {
        category: "Getting Started",
        questions: [
            {
                q: "What is PayaGo?",
                a: "PayaGo is a digital wallet platform that allows you to create shared wallets with friends, family, or colleagues. Each member gets a virtual card, and when anyone pays, the bill is automatically split according to your chosen ratio. No more chasing people for money or awkward money conversations."
            },
            {
                q: "How do I sign up?",
                a: "Simply download the PayaGo app from the App Store or Google Play, enter your email and phone number, and verify your identity. The whole process takes less than 2 minutes."
            },
            {
                q: "Is PayaGo available in my country?",
                a: "PayaGo is currently available in the United Kingdom, Austria, Belgium, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden, Norway, and Iceland."
            },
        ]
    },
    {
        category: "Payments & Cards",
        questions: [
            {
                q: "How does the auto-split work?",
                a: "When any group member uses their PayaGo virtual card to make a payment, our system automatically splits the bill according to the ratio you've set. For example, if you have a 50/50 split with a friend and you pay £100 for dinner, you'll be charged £50 and they'll be charged £50 — instantly and automatically."
            },
            {
                q: "Do I need to pre-load money onto the card?",
                a: "No! PayaGo connects directly to your existing bank account. When you make a payment, only your share is withdrawn from your account. You don't need to top up or pre-load anything."
            },
            {
                q: "Where can I use my PayaGo card?",
                a: "Anywhere that accepts Visa or Mastercard — which is essentially everywhere. Use it for restaurants, online shopping, travel bookings, utility bills, and more. The virtual card works with Apple Pay and Google Pay for contactless payments."
            },
            {
                q: "Can I use PayaGo for online purchases?",
                a: "Yes! Your virtual card works for both in-store and online purchases. Simply enter the card details at checkout just like any other card."
            },
        ]
    },
    {
        category: "Groups & Splitting",
        questions: [
            {
                q: "How do I create a group?",
                a: "Open the app, tap 'Create Group', give it a name (like 'Europe Trip' or 'Flat Expenses'), and invite members via link, email, or phone number. Each member will get their own virtual card for the group."
            },
            {
                q: "Can I change the split ratio after payment?",
                a: "Yes! You can adjust split ratios at any time, even after a payment has been made. This is perfect for situations where you need to reimburse someone or adjust for a one-off expense."
            },
            {
                q: "What if someone doesn't have the app?",
                a: "All group members need to have PayaGo installed and linked to a bank account. When you invite someone, they'll receive a link to download the app and join your group."
            },
            {
                q: "Can I be in multiple groups?",
                a: "Absolutely! You can create and join as many groups as you need. Each group has its own wallet, virtual card, and transaction history."
            },
        ]
    },
    {
        category: "Security & Privacy",
        questions: [
            {
                q: "Is my money safe?",
                a: "Absolutely. We partner with FCA-regulated institutions and use PCI-DSS Level 1 security — the same standard used by major banks. Your bank details are encrypted and tokenized."
            },
            {
                q: "Do my friends have access to my bank account?",
                a: "No — that's super private stuff that we keep under locks. No one can see the balance on your account - not even us. Purchases from your bank account can only be made within the ratio splits and limits you set."
            },
            {
                q: "What happens if I lose my phone?",
                a: "You can instantly freeze your virtual cards from any device by logging into your account. Contact our support team and we'll help you secure your account."
            },
        ]
    },
    {
        category: "Account & Billing",
        questions: [
            {
                q: "Is PayaGo really free?",
                a: "Yes! The Personal plan is completely free and includes everything most users need. We offer Premium and Business plans with additional features for power users and organizations."
            },
            {
                q: "Are there any transaction fees?",
                a: "No transaction fees on any plan for standard domestic payments. International payments may incur a small FX fee at interbank rates — no markup."
            },
            {
                q: "How do I close my account?",
                a: "You can close your account at any time from the app settings. Make sure all pending transactions are settled and your balance is zero before closing."
            },
        ]
    },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border-b border-white/5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 text-left"
            >
                <span className="text-white font-medium pr-8">{question}</span>
                <ChevronDown className={`w-5 h-5 text-[#C9A962] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                <p className="text-white/50 leading-relaxed">{answer}</p>
            </div>
        </div>
    )
}

export default function FAQPage() {
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C9A962]/10 rounded-full blur-[200px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                        Frequently Asked
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent block">
                            Questions
                        </span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Everything you need to know about PayaGo.
                    </p>
                </div>
            </section>

            {/* FAQ Categories */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-6">
                    {faqs.map((category, catIndex) => (
                        <div key={catIndex} className="mb-16">
                            <h2 className="text-2xl font-bold text-white mb-8">{category.category}</h2>
                            <div>
                                {category.questions.map((faq, index) => (
                                    <FAQItem key={index} question={faq.q} answer={faq.a} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Still have questions?</h2>
                    <p className="text-white/60 mb-8">Our support team is here to help.</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
                    >
                        Contact Support
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
