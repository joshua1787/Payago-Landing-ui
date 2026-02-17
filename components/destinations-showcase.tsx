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
            {/* Vibrant Premium Background - 'Funky' Contrast */}
            <div className="absolute inset-0 bg-[#4f46e5]" />
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700" />

            {/* Abstract shapes for depth */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-[0.03] blur-3xl rounded-full translate-x-1/3 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400 opacity-[0.1] blur-3xl rounded-full -translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className={`flex flex-col lg:flex-row items-center lg:items-end justify-between mb-14 gap-6 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-4 backdrop-blur-md shadow-lg">
                            <MapPin className="w-3.5 h-3.5 text-cyan-300" />
                            <span className="text-[12px] text-white/90 font-bold uppercase tracking-wider">Popular destinations</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] drop-shadow-sm">
                            Where will <span className="text-cyan-300">AI</span> take you?
                        </h2>
                    </div>
                    <a href="#early-access" className="group flex items-center gap-2 text-white/90 font-semibold text-sm hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10">
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
                            {/* Card content */}
                            <img
                                src={dest.image}
                                alt={dest.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
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
