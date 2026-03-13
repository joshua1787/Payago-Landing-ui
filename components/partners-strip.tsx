export function PartnersStrip() {
    const live = [
        { name: "Google Gemini", label: "AI Engine", color: "#4285F4" },
        { name: "Claude AI", label: "AI Assistant", color: "#D97757" },
    ]

    const planned = [
        { name: "Hotel APIs", label: "Hotels" },
        { name: "Flight APIs", label: "Flights" },
        { name: "Activity APIs", label: "Activities" },
        { name: "Payments", label: "Checkout" },
    ]

    return (
        <section className="relative border-b border-white/[0.04] bg-[#030508]">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                    {/* Live integrations */}
                    <span className="text-white/20 text-xs font-semibold uppercase tracking-[0.18em] whitespace-nowrap flex-shrink-0">
                        Built with
                    </span>
                    <div className="w-px h-5 bg-white/[0.06] hidden sm:block flex-shrink-0" />
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-3">
                        {live.map((p) => (
                            <div key={p.name} className="flex items-center gap-2 group">
                                <div className="w-2 h-2 rounded-full flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                                    style={{ background: p.color }} />
                                <span className="text-white/40 group-hover:text-white/70 text-sm font-semibold tracking-tight transition-colors duration-300">
                                    {p.name}
                                </span>
                                <span className="text-white/10 text-[10px] font-medium hidden sm:block">{p.label}</span>
                            </div>
                        ))}

                        {/* Divider */}
                        <div className="w-px h-4 bg-white/[0.06] hidden sm:block" />

                        {/* Planned integrations */}
                        <span className="text-white/12 text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap hidden sm:block">
                            Integrating
                        </span>
                        {planned.map((p) => (
                            <div key={p.name} className="flex items-center gap-2 group">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/15 flex-shrink-0" />
                                <span className="text-white/15 text-sm font-medium tracking-tight">
                                    {p.name}
                                </span>
                                <span className="text-[9px] text-white/10 border border-white/8 px-1.5 py-0.5 rounded-full hidden sm:block">
                                    soon
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
