"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Star, ArrowRight } from "lucide-react"

const destinations = [
    {
        name: "Santorini",
        country: "Greece",
        image: "/images/travel-santorini.png",
        tag: "Most Popular",
        color: "from-amber-400 to-orange-500",
    },
    {
        name: "Tokyo",
        country: "Japan",
        image: "/images/travel-tokyo.png",
        tag: "Trending",
        color: "from-pink-400 to-rose-500",
    },
    {
        name: "Barcelona",
        country: "Spain",
        image: "/images/travel-friends.png",
        tag: "Group Favourite",
        color: "from-blue-400 to-violet-500",
    },
]

export function DestinationsShowcase() {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) setIsVisible(true) },
            { threshold: 0.1 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
            {/* Dark cinematic background */}
            <div className="absolute inset-0 bg-[#04060A]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(201,169,98,0.07),transparent)]" />
            <div className="absolute bottom-0 left-0 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.05),transparent_70%)] blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.05),transparent_70%)] blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className={`flex flex-col lg:flex-row items-center lg:items-end justify-between mb-14 gap-6 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A962]/10 border border-[#C9A962]/20 mb-4 backdrop-blur-md">
                            <MapPin className="w-3.5 h-3.5 text-[#C9A962]" />
                            <span className="text-[12px] text-[#C9A962] font-bold uppercase tracking-wider">Popular destinations</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em]">
                            Where will <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent">AI</span> take you?
                        </h2>
                    </div>
                    <a href="#early-access" className="group flex items-center gap-2 text-white/70 font-semibold text-sm hover:text-white transition-colors bg-white/[0.04] hover:bg-white/[0.08] px-5 py-2.5 rounded-full border border-white/10">
                        Start planning
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>

                <div className={`grid md:grid-cols-3 gap-5 transition-all duration-700 delay-150 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                    {destinations.map((dest, i) => (
                        <div
                            key={dest.name}
                            className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer"
                            style={{ transitionDelay: `${i * 120}ms` }}
                        >
                            {/* Card content — continuous Ken Burns cinematic motion */}
                            <div className="absolute inset-0 overflow-hidden rounded-3xl">
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className={`w-full h-full object-cover ${i === 0 ? "animate-ken-burns" : i === 1 ? "animate-ken-burns-alt" : "animate-ken-burns-pan"}`}
                                    style={{ transformOrigin: "center center" }}
                                />
                            </div>
                            {/* Gradient overlay for text readability */}
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Tag */}
                            <div className="absolute top-5 left-5">
                                <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wide border border-white/20 shadow-lg`}>
                                    <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                                    {dest.tag}
                                </div>
                            </div>

                            {/* Location info */}
                            <div className="absolute bottom-6 left-6 right-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-2xl font-bold text-white mb-2">{dest.name}</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-white/90 text-sm font-medium">
                                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                                        {dest.country}
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-2 group-hover:translate-x-0 delay-100">
                                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
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
