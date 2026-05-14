import { MapPin, ArrowRight } from "lucide-react"

import { OptimizedPicture } from "@/components/optimized-picture"

const destinations = [
    {
        name: "Santorini",
        country: "Greece",
        image: "/images/travel-santorini.webp",
        tag: "Island escape",
        color: "from-amber-400 to-orange-500",
    },
    {
        name: "Tokyo",
        country: "Japan",
        image: "/images/travel-tokyo.webp",
        tag: "Food trail",
        color: "from-pink-400 to-rose-500",
    },
    {
        name: "Barcelona",
        country: "Spain",
        image: "/images/travel-friends.webp",
        tag: "Group weekender",
        color: "from-blue-400 to-violet-500",
    },
]

export function DestinationsShowcase() {
    return (
        <section className="scroll-stable-section relative py-24 sm:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-[#FAFAF8]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(201,169,98,0.12),transparent)]" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-14 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-4">
                            <MapPin className="w-3.5 h-3.5 text-[#C9A962]" />
                            <span className="text-[12px] text-[#C9A962] font-bold uppercase tracking-wider">Popular destinations</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-[-0.03em]">
                            Where will <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent">AI</span> take you?
                        </h2>
                    </div>
                    <a href="#early-access" className="group flex items-center gap-2 text-slate-600 font-semibold text-sm hover:text-slate-900 transition-colors bg-slate-50 hover:bg-slate-100 px-5 py-2.5 rounded-full border border-slate-200">
                        Start planning
                        <ArrowRight className="w-4 h-4 opacity-70 transition-opacity group-hover:opacity-100" />
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                    {destinations.map((dest) => (
                        <div
                            key={dest.name}
                            className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer"
                        >
                            {/* Card content */}
                            <div className="absolute inset-0 overflow-hidden rounded-3xl">
                                <OptimizedPicture
                                    src={dest.image}
                                    alt={dest.name}
                                    className="contents"
                                    imgClassName="w-full h-full object-cover"
                                    style={{ transformOrigin: "center center" }}
                                />
                            </div>
                            {/* Gradient overlay for text readability */}
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Tag */}
                            <div className="absolute top-5 left-5">
                                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/45 text-white text-[11px] font-bold uppercase tracking-wide border border-white/20 shadow-sm">
                                    <MapPin className="w-3 h-3 text-white/80" />
                                    {dest.tag}
                                </div>
                            </div>

                            {/* Location info */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <h3 className="text-2xl font-bold text-white mb-2">{dest.name}</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-white/90 text-sm font-medium">
                                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                                        {dest.country}
                                    </div>
                                    <div className="opacity-90 transition-opacity duration-200 group-hover:opacity-100">
                                        <div className="w-8 h-8 rounded-full bg-black/35 flex items-center justify-center border border-white/20">
                                            <ArrowRight className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
