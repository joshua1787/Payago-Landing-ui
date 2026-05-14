import { ArrowRight, CreditCard, LifeBuoy, Map, Mic, Sparkles, Users, Wallet } from "lucide-react"

const capabilities = [
    {
        title: "Voice + Text Trip Builder",
        eyebrow: "AI intake",
        description: "Speak or type the trip once. PayaGo captures destination, dates, budget, group size, and travel style before drafting plan options.",
        icon: Mic,
        color: "#7C5CFF",
        metric: "prompt to plan",
        proof: ["Voice input", "Natural prompts"],
    },
    {
        title: "AI Itinerary Workspace",
        eyebrow: "Trip planning",
        description: "Turn the draft into a shared itinerary with day-by-day schedules, timeline views, map context, and editable trip events.",
        icon: Map,
        color: "#00A7CF",
        metric: "timeline + map",
        proof: ["Trip itinerary", "Editable events"],
    },
    {
        title: "Group Voting + Chat",
        eyebrow: "Collaboration",
        description: "Create the group, invite friends, collect votes, and keep decisions visible alongside the trip instead of buried in chat threads.",
        icon: Users,
        color: "#EC4899",
        metric: "shared votes",
        proof: ["Invite flows", "Voting results"],
    },
    {
        title: "Split-Cost Coordination",
        eyebrow: "Cost coordination",
        description: "Show member shares, review methods, coordination states, booking summaries, tickets, and vouchers in one coordinated flow.",
        icon: CreditCard,
        color: "#10B981",
        metric: "member shares",
        proof: ["Split details", "Booking summary"],
    },
    {
        title: "Wallet + Saved Trips",
        eyebrow: "Trip tools",
        description: "Keep payment methods, rewards context, saved ideas, wishlists, and trip essentials close to the plan the group is building.",
        icon: Wallet,
        color: "#C9A962",
        metric: "saved context",
        proof: ["Wallet", "Wishlist"],
    },
    {
        title: "Guides, Support + Alerts",
        eyebrow: "Travel assist",
        description: "Destination guides, help flows, notifications, profile preferences, and trip management screens support the journey after planning.",
        icon: LifeBuoy,
        color: "#F97316",
        metric: "in-trip help",
        proof: ["Help center", "Notifications"],
    },
]

const journeySteps = [
    { step: "01", label: "Ask", detail: "Voice or text prompt" },
    { step: "02", label: "Plan", detail: "AI itinerary draft" },
    { step: "03", label: "Agree", detail: "Group vote + chat" },
    { step: "04", label: "Review", detail: "Split-cost review" },
    { step: "05", label: "Travel", detail: "Guides + support" },
]

const productSystems = [
    "AI voice service",
    "AI itinerary service",
    "Trip itinerary screens",
    "Group chat",
    "Invite flows",
    "Voting results",
    "Review methods",
    "Split-cost details",
    "Tickets and vouchers",
    "Wallet",
    "Wishlist",
    "Help and support",
]

export function PartnersStrip() {
    return (
        <section className="relative py-20 bg-[#FAFAF8] border-y border-slate-100 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/2 top-0 h-72 w-[680px] -translate-x-1/2 rounded-full bg-cyan-200/20" />
                <div className="absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-[#C9A962]/15" />
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
                        backgroundSize: "54px 54px",
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-end mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-5">
                            <Sparkles className="w-3 h-3 text-[#C9A962]" />
                            PayaGo Trip OS
                        </div>
                        <h2 className="text-3xl md:text-5xl font-light tracking-[-0.04em] text-slate-950 leading-[0.95]">
                            The product stack inside PayaGo.
                        </h2>
                    </div>
                    <div className="lg:max-w-2xl">
                        <p className="text-slate-500 text-base md:text-lg leading-8">
                            PayaGo brings the full group trip into one flow: AI trip creation, itinerary management, group decisions, split-cost coordination, wallet context, saved trips, and support from one shared workspace.
                        </p>
                    </div>
                </div>

                <div className="mb-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
                    <div className="grid gap-2 md:grid-cols-5">
                        {journeySteps.map((item, index) => (
                            <div key={item.step} className="relative rounded-[1.4rem] border border-slate-100 bg-slate-50/80 px-4 py-4">
                                {index < journeySteps.length - 1 && (
                                    <ArrowRight className="absolute right-3 top-4 hidden h-4 w-4 text-slate-300 md:block" />
                                )}
                                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-500">{item.step}</p>
                                <p className="mt-2 text-sm font-bold text-slate-950">{item.label}</p>
                                <p className="mt-1 text-xs leading-5 text-slate-500">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {capabilities.map((capability) => {
                        const Icon = capability.icon

                        return (
                            <div
                                key={capability.title}
                                className="group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.04)] transition-[border-color,background-color] duration-200 hover:border-slate-200 hover:bg-slate-50/60"
                            >
                                <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full opacity-15 transition-opacity duration-500 group-hover:opacity-25" style={{ background: capability.color }} />
                                <div className="relative flex h-full flex-col">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: `${capability.color}18`, color: capability.color }}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                            {capability.metric}
                                        </div>
                                    </div>

                                    <div className="mt-7">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: capability.color }}>
                                            {capability.eyebrow}
                                        </p>
                                        <h3 className="mt-2 text-xl font-bold tracking-[-0.03em] text-slate-950">
                                            {capability.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-7 text-slate-500">
                                            {capability.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-6 flex flex-wrap gap-2">
                                        {capability.proof.map((item) => (
                                            <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-5 md:p-6">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">What powers the flow</p>
                            <p className="mt-1 text-sm text-slate-400">Each layer connects to a PayaGo app or wallet capability already represented in the product experience.</p>
                        </div>
                        <div className="flex flex-wrap gap-2 md:justify-end">
                            {productSystems.map((system) => (
                                <span key={system} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-slate-200">
                                    {system}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
