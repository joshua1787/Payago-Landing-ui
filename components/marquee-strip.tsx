// Dual-track counter-scrolling marquee
// Track 1 → : Destinations with coloured dots
// Track 2 ← : Product value phrases

const DESTINATIONS = [
    { name: "Barcelona, Spain", dot: "#C9A962" },
    { name: "Tokyo, Japan", dot: "#00D4FF" },
    { name: "Santorini, Greece", dot: "#7C5CFF" },
    { name: "Lisbon, Portugal", dot: "#4AD7A2" },
    { name: "Paris, France", dot: "#C9A962" },
    { name: "Bali, Indonesia", dot: "#00D4FF" },
    { name: "Amalfi, Italy", dot: "#4AD7A2" },
    { name: "Amsterdam, Netherlands", dot: "#7C5CFF" },
    { name: "Dubrovnik, Croatia", dot: "#C9A962" },
    { name: "Kyoto, Japan", dot: "#00D4FF" },
    { name: "Prague, Czech Republic", dot: "#4AD7A2" },
    { name: "Dubai, UAE", dot: "#7C5CFF" },
]

const PHRASES = [
    { text: "AI Planned in 30 Seconds", dot: "#00D4FF" },
    { text: "No WhatsApp Threads", dot: "#4AD7A2" },
    { text: "Group Voting Built-in", dot: "#7C5CFF" },
    { text: "Free for Travellers", dot: "#C9A962" },
    { text: "Voice Input", dot: "#00D4FF" },
    { text: "Split Payments", dot: "#4AD7A2" },
    { text: "Weather-Aware AI", dot: "#7C5CFF" },
    { text: "Books Automatically", dot: "#C9A962" },
    { text: "Real-time Collaboration", dot: "#00D4FF" },
    { text: "50+ Destinations", dot: "#4AD7A2" },
    { text: "Launching April 2026", dot: "#7C5CFF" },
    { text: "Zero Chaos", dot: "#C9A962" },
]

function Track({ items, reverse }: { items: { text?: string; name?: string; dot: string }[]; reverse?: boolean }) {
    const doubled = [...items, ...items]

    return (
        <div className="relative overflow-hidden py-3">
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, #FAFAF8, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, #FAFAF8, transparent)" }} />

            <div
                className={reverse ? "animate-marquee-reverse" : "animate-marquee"}
                style={{ display: "flex", gap: "0", width: "max-content" }}
            >
                {doubled.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-3 px-6 text-[13px] font-medium text-slate-400 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.dot }} />
                        {item.name ?? item.text}
                    </span>
                ))}
            </div>
        </div>
    )
}

export function MarqueeStrip() {
    return (
        <div className="relative border-y border-slate-100 bg-[#FAFAF8] overflow-hidden py-1">
            <Track items={DESTINATIONS.map(d => ({ name: d.name, dot: d.dot }))} />
            <Track items={PHRASES.map(p => ({ text: p.text, dot: p.dot }))} reverse />
        </div>
    )
}
