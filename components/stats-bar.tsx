import { Globe, Zap, Users, Mic } from "lucide-react"

const stats = [
    { icon: Zap, value: "AI drafts", label: "Review-ready itinerary options", color: "#00D4FF" },
    { icon: Globe, value: "Trip guides", label: "Destination ideas and plan structure", color: "#C9A962" },
    { icon: Users, value: "Group votes", label: "Shared decisions without thread chaos", color: "#4AD7A2" },
    { icon: Mic, value: "Voice input", label: "Describe a trip without long forms", color: "#7C5CFF" },
]

export function StatsBar() {
    return (
        <section className="relative border-y border-slate-100 bg-[#FAFAF8] overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300 mb-10">Built around the PayaGo app workflow</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-slate-100">
                    {stats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <div key={stat.label} className="flex flex-col items-center text-center lg:px-10 gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ background: stat.color + "12", border: `1px solid ${stat.color}25` }}>
                                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                                </div>
                                <div className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
