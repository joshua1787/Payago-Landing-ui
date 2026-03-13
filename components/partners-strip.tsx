export function PartnersStrip() {
    const partners = [
        { name: "Booking.com", label: "Hotels", color: "#003580" },
        { name: "Kiwi.com", label: "Flights", color: "#E5440A" },
        { name: "Viator", label: "Activities", color: "#00AA6C" },
        { name: "Stripe", label: "Payments", color: "#6772E5" },
        { name: "Google Gemini", label: "AI Engine", color: "#4285F4" },
    ]

    return (
        <section className="relative border-b border-white/[0.04] bg-[#030508]">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                    <span className="text-white/20 text-xs font-semibold uppercase tracking-[0.18em] whitespace-nowrap flex-shrink-0">
                        Powered by
                    </span>
                    <div className="w-px h-5 bg-white/[0.06] hidden sm:block flex-shrink-0" />
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-3">
                        {partners.map((p) => (
                            <div key={p.name} className="flex items-center gap-2 group">
                                {/* Coloured dot as brand indicator */}
                                <div className="w-2 h-2 rounded-full flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                                    style={{ background: p.color }} />
                                <span className="text-white/30 group-hover:text-white/60 text-sm font-semibold tracking-tight transition-colors duration-300">
                                    {p.name}
                                </span>
                                <span className="text-white/10 text-[10px] font-medium hidden sm:block">
                                    {p.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
