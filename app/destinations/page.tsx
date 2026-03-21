import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MapPin, Users, Clock, Star } from "lucide-react"

export const metadata: Metadata = {
    title: "Group Travel Destinations — AI-Planned Trips to Top Cities",
    description: "Complete group travel guides for Barcelona, Tokyo, Lisbon, Paris, Amsterdam and more. PayaGo AI builds a fully booked itinerary for any of these destinations in 30 seconds.",
    openGraph: {
        title: "Group Travel Destinations — PayaGo AI Trip Planner",
        description: "AI-planned group trips to the world's best destinations. Flights, hotels, activities — built in 30 seconds.",
        url: "https://www.payago.in/destinations",
        type: "website",
    },
    alternates: { canonical: "https://www.payago.in/destinations" },
}

const destinations = [
    { slug: "barcelona", name: "Barcelona", country: "Spain", emoji: "🇪🇸", tagline: "Beach, Gaudí & nightlife", budget: "£285–520", bestFor: "Groups of 4–10", image: "/images/travel-santorini.png", rating: 9.4, tags: ["Beach", "Nightlife", "Culture", "Food"] },
    { slug: "tokyo", name: "Tokyo", country: "Japan", emoji: "🇯🇵", tagline: "Street food, temples & neon", budget: "£620–980", bestFor: "Groups of 2–6", image: "/images/travel-tokyo.png", rating: 9.6, tags: ["Food", "Culture", "Tech", "Temples"] },
    { slug: "lisbon", name: "Lisbon", country: "Portugal", emoji: "🇵🇹", tagline: "Best value in Western Europe", budget: "£290–650", bestFor: "Groups of 3–8", image: "/images/travel-friends.png", rating: 9.1, tags: ["Value", "Culture", "Food", "Scenic"] },
    { slug: "paris", name: "Paris", country: "France", emoji: "🇫🇷", tagline: "Romance, art & gastronomy", budget: "£380–900", bestFor: "Couples & small groups", image: "/images/travel-santorini.png", rating: 9.2, tags: ["Romance", "Art", "Food", "Culture"] },
    { slug: "amsterdam", name: "Amsterdam", country: "Netherlands", emoji: "🇳🇱", tagline: "Canals, bikes & world-class museums", budget: "£320–700", bestFor: "Groups of 3–8", image: "/images/travel-friends.png", rating: 8.8, tags: ["Culture", "Bikes", "Museums", "Canals"] },
]

const destinationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Group Travel Destinations",
    description: "AI-planned group trip guides for top travel destinations worldwide.",
    numberOfItems: destinations.length,
    itemListElement: destinations.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `Group Travel Guide: ${d.name}, ${d.country}`,
        url: `https://www.payago.in/destinations/${d.slug}`,
    })),
}

export default function DestinationsHub() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationSchema) }} />

            <header className="border-b border-slate-100 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/payago-logo-new.png" alt="PayaGo" className="h-10 w-auto object-contain -ml-2" />
                        
                    </Link>
                    <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors text-sm">← Home</Link>
                </div>
            </header>

            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/4 w-[500px] h-[400px] bg-[#C9A962]/6 rounded-full blur-[200px]" />
                    <div className="absolute top-1/2 right-1/4 w-[400px] h-[300px] bg-[#7C5CFF]/5 rounded-full blur-[200px]" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A962]/10 border border-[#C9A962]/20 mb-8">
                        <MapPin className="w-4 h-4 text-[#C9A962]" />
                        <span className="text-sm font-medium text-[#C9A962]">AI-planned group trips</span>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                        Group Travel<br />Destination Guides
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Complete guides for the world's best group travel destinations — with real pricing, insider tips, and AI-generated itineraries ready in 30 seconds.
                    </p>
                </div>
            </section>

            <section className="pb-24 border-t border-slate-100 pt-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {destinations.map((dest) => (
                            <Link key={dest.slug} href={`/destinations/${dest.slug}`} className="group block bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden hover:border-slate-200 hover:-translate-y-1 transition-all duration-300">
                                <div className="aspect-video bg-slate-100 overflow-hidden relative">
                                    <img src={dest.image} alt={`Group travel in ${dest.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                                        <Star className="w-3 h-3 text-[#C9A962]" />
                                        <span className="text-slate-900 text-xs font-bold">{dest.rating}</span>
                                    </div>
                                    <div className="absolute top-3 right-3 text-2xl">{dest.emoji}</div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#C9A962] transition-colors">{dest.name}</h2>
                                            <p className="text-slate-500 text-sm">{dest.country}</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-sm mb-4">{dest.tagline}</p>
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {dest.tags.map(t => (
                                            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-100">{t}</span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                        <div>
                                            <div className="text-slate-900 font-semibold text-sm">{dest.budget}</div>
                                            <div className="text-slate-400 text-xs">per person</div>
                                        </div>
                                        <div className="flex items-center gap-1 text-[#C9A962] text-sm font-medium group-hover:gap-2 transition-all">
                                            Plan this trip <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Don't see your destination?</h2>
                    <p className="text-slate-500 mb-8">PayaGo AI can plan group trips to any destination in the world — just describe it and the AI builds the full itinerary in 30 seconds.</p>
                    <Link href="/#early-access" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                        Get Early Access — Free <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            <footer className="py-8 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
                    © 2026 PayaGo Ltd. Registered in England & Wales.
                </div>
            </footer>
        </main>
    )
}
