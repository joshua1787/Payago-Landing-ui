"use client"

import { useRef, useEffect } from "react"
import { ArrowRight } from "lucide-react"

const destinations = [
    {
        name: "Neo Tokyo",
        tag: "Cyberpunk City",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop",
        description: "Experience the neon-soaked streets of the future metropolis."
    },
    {
        name: "Swiss Alps",
        tag: "Nature Retreat",
        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1000&auto=format&fit=crop",
        description: "Breathe in the pristine air of the high mountains."
    },
    {
        name: "Santorini",
        tag: "Coastal Paradise",
        image: "https://images.unsplash.com/photo-1613395877344-13d4c2ce5d4d?q=80&w=1000&auto=format&fit=crop",
        description: "Watch the world's most beautiful sunset over the Aegean."
    },
    {
        name: "Kyoto",
        tag: "Ancient Spirit",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop",
        description: "Walk through thousand-year-old temples and gardens."
    }
]

export function DestinationShowcase() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400
            scrollContainerRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section className="py-24 bg-[#0B1220] relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-secondary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-4 animate-fade-up">Destinations</h2>
                        <h2 className="text-3xl lg:text-5xl font-bold text-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
                            Explore the Unseen
                        </h2>
                    </div>

                    {/* Navigation Controls */}
                    <div className="hidden md:flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group"
                        >
                            <ArrowRight className="w-5 h-5 text-foreground rotate-180 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group"
                        >
                            <ArrowRight className="w-5 h-5 text-foreground group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {destinations.map((dest, index) => (
                        <div
                            key={index}
                            className="relative min-w-[300px] md:min-w-[400px] h-[500px] rounded-3xl overflow-hidden group snap-center cursor-pointer"
                        >
                            {/* Image Layer */}
                            <div className="absolute inset-0">
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#04060A] via-transparent to-transparent opacity-80" />
                            </div>

                            {/* Content Layer */}
                            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-white mb-4">
                                    {dest.tag}
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">{dest.name}</h3>
                                <p className="text-white/70 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {dest.description}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Call to Action Card */}
                    <div className="min-w-[300px] md:min-w-[400px] h-[500px] rounded-3xl bg-gradient-to-br from-accent/10 to-accent-secondary/10 border border-accent/20 flex flex-col items-center justify-center text-center p-8 snap-center hover:border-accent/40 transition-colors cursor-pointer group">
                        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <ArrowRight className="w-8 h-8 text-accent" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">View All Destinations</h3>
                        <p className="text-muted-foreground">Discover 500+ more locations available in our database.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
