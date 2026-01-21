"use client"

import { useEffect, useRef, useState } from "react"
import { CreditCard, Users, ArrowUpRight, ArrowDownLeft, Plus, MoreHorizontal } from "lucide-react"

export function WalletDemoSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [activeTab, setActiveTab] = useState<'split' | 'track'>('split')
    const [splitAmount, setSplitAmount] = useState(120)
    const [splitRatio, setSplitRatio] = useState(50)

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

    const yourShare = (splitAmount * splitRatio / 100).toFixed(2)
    const theirShare = (splitAmount * (100 - splitRatio) / 100).toFixed(2)

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#0B1220]" />

            {/* Gradient accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px]">
                <div className="absolute top-0 left-0 w-80 h-80 bg-[#C9A962]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00D4FF]/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Interactive Demo */}
                    <div className={`order-2 lg:order-1 transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                        <div className="relative bg-gradient-to-br from-[#0F1829] to-[#0A1220] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                            {/* Tab bar */}
                            <div className="flex border-b border-white/5">
                                <button
                                    onClick={() => setActiveTab('split')}
                                    className={`flex-1 py-4 text-sm font-medium transition-all ${activeTab === 'split'
                                            ? 'text-[#C9A962] border-b-2 border-[#C9A962]'
                                            : 'text-white/40 hover:text-white/60'
                                        }`}
                                >
                                    Split Payment
                                </button>
                                <button
                                    onClick={() => setActiveTab('track')}
                                    className={`flex-1 py-4 text-sm font-medium transition-all ${activeTab === 'track'
                                            ? 'text-[#C9A962] border-b-2 border-[#C9A962]'
                                            : 'text-white/40 hover:text-white/60'
                                        }`}
                                >
                                    Track Expenses
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {activeTab === 'split' ? (
                                    <div className="space-y-8">
                                        {/* Amount */}
                                        <div className="text-center">
                                            <div className="text-white/40 text-sm mb-2">Total Amount</div>
                                            <div className="text-5xl font-bold text-white">
                                                £{splitAmount.toFixed(2)}
                                            </div>
                                        </div>

                                        {/* Slider */}
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#C9A962]">You: £{yourShare}</span>
                                                <span className="text-[#00D4FF]">Them: £{theirShare}</span>
                                            </div>
                                            <div className="relative">
                                                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-[#C9A962] to-[#00D4FF] transition-all duration-300"
                                                        style={{ width: `${splitRatio}%` }}
                                                    />
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={splitRatio}
                                                    onChange={(e) => setSplitRatio(Number(e.target.value))}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <div
                                                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-[#C9A962] pointer-events-none transition-all duration-300"
                                                    style={{ left: `calc(${splitRatio}% - 12px)` }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-xs text-white/30">
                                                <span>0%</span>
                                                <span>{splitRatio}% / {100 - splitRatio}%</span>
                                                <span>100%</span>
                                            </div>
                                        </div>

                                        {/* Members */}
                                        <div className="flex items-center justify-center gap-8">
                                            <div className="text-center">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A962] to-[#E5C77D] flex items-center justify-center text-xl font-bold text-[#1E3A5F] mb-2">
                                                    You
                                                </div>
                                                <div className="text-white/40 text-xs">Pays {splitRatio}%</div>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="w-20 h-[2px] bg-gradient-to-r from-[#C9A962] to-[#00D4FF]" />
                                                <span className="text-white/30 text-xs">Auto-split</span>
                                            </div>
                                            <div className="text-center">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0088AA] flex items-center justify-center text-xl font-bold text-white mb-2">
                                                    AB
                                                </div>
                                                <div className="text-white/40 text-xs">Pays {100 - splitRatio}%</div>
                                            </div>
                                        </div>

                                        {/* Confirm button */}
                                        <button className="w-full py-4 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1E3A5F] font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-[#C9A962]/20">
                                            Confirm Split
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {/* Summary */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-white/5 rounded-2xl p-4">
                                                <div className="text-white/40 text-xs mb-1">Your Spending</div>
                                                <div className="text-2xl font-bold text-white">£342.50</div>
                                                <div className="text-[#4AD7A2] text-xs mt-1">↓ 12% vs last week</div>
                                            </div>
                                            <div className="bg-white/5 rounded-2xl p-4">
                                                <div className="text-white/40 text-xs mb-1">Group Total</div>
                                                <div className="text-2xl font-bold text-white">£685.00</div>
                                                <div className="text-white/40 text-xs mt-1">5 transactions</div>
                                            </div>
                                        </div>

                                        {/* Transactions */}
                                        <div className="space-y-3">
                                            {[
                                                { name: "Dinner @ Sushi Place", you: "£24.50", them: "£24.50", time: "Today" },
                                                { name: "Uber to Airport", you: "£18.00", them: "£12.00", time: "Yesterday" },
                                                { name: "Hotel Booking", you: "£150.00", them: "£150.00", time: "2 days ago" },
                                            ].map((tx, i) => (
                                                <div key={i} className="flex items-center gap-4 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A962]/20 to-[#00D4FF]/20 flex items-center justify-center">
                                                        <CreditCard className="w-5 h-5 text-[#C9A962]" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-white font-medium">{tx.name}</div>
                                                        <div className="text-white/40 text-xs">{tx.time}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-[#C9A962] text-sm">You: {tx.you}</div>
                                                        <div className="text-[#00D4FF] text-xs">Them: {tx.them}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Text content */}
                    <div className={`order-1 lg:order-2 transition-all duration-700 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A962]/10 border border-[#C9A962]/20 mb-6">
                            <span className="text-sm font-medium text-[#C9A962]">Interactive Demo</span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            See it in action
                        </h2>

                        <p className="text-xl text-white/60 mb-8 leading-relaxed">
                            Try our interactive demo. Drag the slider to adjust split ratios.
                            Switch tabs to see expense tracking. This is exactly what you'll get in the app.
                        </p>

                        <div className="space-y-4">
                            {[
                                { title: "Real-time splitting", desc: "Adjust ratios before or after payment" },
                                { title: "Complete transparency", desc: "Every transaction logged and visible" },
                                { title: "Instant settlements", desc: "Money moves immediately, no chasing" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#C9A962]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-[#C9A962]">✓</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">{item.title}</div>
                                        <div className="text-white/40 text-sm">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
