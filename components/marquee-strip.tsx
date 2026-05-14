// Static signal strip. Continuous marquee transforms were competing with scroll.

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
    { text: "AI Itinerary Drafts", dot: "#00D4FF" },
    { text: "Less WhatsApp Chaos", dot: "#4AD7A2" },
    { text: "Group Voting Built-in", dot: "#7C5CFF" },
    { text: "Early Access Waitlist", dot: "#C9A962" },
    { text: "Voice Input", dot: "#00D4FF" },
    { text: "Split-Cost Tracking", dot: "#4AD7A2" },
    { text: "Trip Status Updates", dot: "#7C5CFF" },
    { text: "Booking Handoff", dot: "#C9A962" },
    { text: "Shared Trip Board", dot: "#00D4FF" },
    { text: "Destination Guides", dot: "#4AD7A2" },
    { text: "Cost Coordination", dot: "#7C5CFF" },
    { text: "Clear Next Steps", dot: "#C9A962" },
]

function Track({ items }: { items: { text?: string; name?: string; dot: string }[] }) {
    return (
        <div className="relative py-3 px-4">
            <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-6 gap-y-3">
                {items.map((item) => (
                    <span key={item.name ?? item.text} className="inline-flex items-center gap-3 text-[13px] font-medium text-slate-400 whitespace-nowrap">
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
        <div className="relative border-y border-slate-100 bg-[#FAFAF8] py-1">
            <Track items={DESTINATIONS.map(d => ({ name: d.name, dot: d.dot }))} />
            <Track items={PHRASES.map(p => ({ text: p.text, dot: p.dot }))} />
        </div>
    )
}
