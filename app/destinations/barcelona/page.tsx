import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, MapPin, Star, Clock, Users, Plane, Hotel, Calendar, ArrowRight, Check } from "lucide-react"

export const metadata: Metadata = {
    title: "Barcelona Group Travel Guide 2026 — Itinerary, Costs & Tips",
    description: "Complete group travel guide for Barcelona: 5-day itinerary, real hotel prices (£85–130/night), best neighbourhoods, Gaudí tips, and group dining. AI plans the full trip in 30 seconds.",
    openGraph: {
        title: "Barcelona Group Travel Guide 2026 | PayaGo",
        description: "5-day Barcelona group itinerary with real prices. AI-planned in 30 seconds.",
        url: "https://www.payago.in/destinations/barcelona",
        type: "article",
    },
    alternates: { canonical: "https://www.payago.in/destinations/barcelona" },
}

const pageSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Barcelona, Spain",
    description: "Barcelona is Spain's second-largest city and one of Europe's top group travel destinations, combining beach, world-class architecture, food, and nightlife.",
    url: "https://www.payago.in/destinations/barcelona",
    touristType: ["Group travellers", "Friends", "Couples"],
    includesAttraction: [
        { "@type": "TouristAttraction", name: "Sagrada Família" },
        { "@type": "TouristAttraction", name: "Park Güell" },
        { "@type": "TouristAttraction", name: "Camp Nou" },
        { "@type": "TouristAttraction", name: "La Boqueria Market" },
        { "@type": "TouristAttraction", name: "Barceloneta Beach" },
    ],
}

const itinerary = [
    { day: "Day 1", title: "Arrival & Gothic Quarter", activities: ["Check in — Eixample district recommended for groups", "Gothic Quarter walking tour (free, 2 hours)", "La Boqueria market late lunch", "El Born neighbourhood for dinner & first drinks", "Cocktail bars on Carrer del Parlament"] },
    { day: "Day 2", title: "Gaudí Architecture", activities: ["Sagrada Família — book skip-the-line tickets in advance", "Park Güell — free area or ticketed terrace", "Lunch in Gràcia neighbourhood", "Palau de la Música Catalan (optional concert)", "Dinner in Barceloneta, walk along the beach"] },
    { day: "Day 3", title: "Beach & Waterfront", activities: ["Barceloneta beach morning (arrive early for sunbeds)", "Water sports: paddleboard or kayak hire", "Seafood lunch at La Mar Salada", "Afternoon: Montjuïc cable car + castle views", "Sunset at Bunkers del Carmel (best view in Barcelona)"] },
    { day: "Day 4", title: "Football & Nightlife", activities: ["Camp Nou stadium tour (optional)", "Afternoon free — shopping on Passeig de Gràcia", "Pre-drinks at hotel (Barcelona nightlife starts late)", "Dinner 9pm+ at a traditional tapas restaurant", "Clubs open after midnight: Opium, Shôko, Pacha"] },
    { day: "Day 5", title: "Day Trip & Departure", activities: ["Day trip to Sitges (40 min by train) or Montserrat monastery", "Lunch back in Barcelona", "Last-minute shopping in El Raval", "Airport transfer — T1 for most international flights"] },
]

const hotels = [
    { name: "Generator Barcelona", stars: 4, rating: "4.5/5", price: "£75–100/night", location: "Gràcia", notes: "Great for groups — social atmosphere, rooftop bar" },
    { name: "Hotel Arts Barcelona", stars: 5, rating: "4.7/5", price: "£220–380/night", location: "Barceloneta beachfront", notes: "5-star luxury, infinity pool, direct beach access" },
    { name: "Almanac Barcelona", stars: 5, rating: "4.6/5", price: "£180–290/night", location: "Eixample", notes: "Rooftop pool with Sagrada Família views" },
    { name: "Hotel 1898", stars: 4, rating: "4.4/5", price: "£120–180/night", location: "Las Ramblas", notes: "Rooftop pool, colonial building, central location" },
]

export default function BarcelonaPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

            <header className="border-b border-slate-100 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/payago-logo-transparent-v2.png" alt="PayaGo" className="w-9 h-9 object-contain" />
                        <span className="text-slate-900 font-semibold text-lg">PayaGo</span>
                    </Link>
                    <Link href="/destinations" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" /> Destinations
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <div className="relative h-72 overflow-hidden">
                <img src="/images/travel-santorini.png" alt="Barcelona skyline" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#04060A]" />
                <div className="absolute bottom-8 left-0 right-0 max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">🇪🇸</span>
                        <span className="text-slate-600 text-sm">Spain</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Barcelona Group Travel Guide</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Quick stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[
                        { label: "Best time", value: "Apr–Jun, Sep–Oct", icon: Calendar },
                        { label: "Ideal group", value: "4–12 people", icon: Users },
                        { label: "Budget/person", value: "£285–520", icon: null },
                        { label: "Travel score", value: "9.4 / 10", icon: Star },
                    ].map((s) => (
                        <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                            <div className="text-slate-900 font-bold text-lg">{s.value}</div>
                            <div className="text-slate-400 text-xs mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Intro */}
                <div className="space-y-4 text-slate-600 leading-relaxed text-lg mb-12">
                    <p>Barcelona is Europe's best all-rounder for group travel. Within a 20-minute walk you can go from a Gothic medieval cathedral to a modernist Gaudí masterpiece to a beach. The food is exceptional at every price point. The nightlife goes until 6am. And it's genuinely walkable — no taxis needed for most of the city.</p>
                    <p>For groups, the key advantages are variety (everyone can find something they love), beach access (natural focal point for the day), and a food scene that accommodates any budget without feeling like you're compromising.</p>
                </div>

                {/* 5-day itinerary */}
                <h2 className="text-2xl font-bold text-slate-900 mb-6">5-Day Group Itinerary</h2>
                <div className="space-y-4 mb-12">
                    {itinerary.map((day) => (
                        <div key={day.day} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-[#C9A962] font-black text-sm">{day.day}</span>
                                <h3 className="text-slate-900 font-bold">{day.title}</h3>
                            </div>
                            <ul className="space-y-2">
                                {day.activities.map((a, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-slate-600 text-sm">
                                        <ArrowRight className="w-4 h-4 text-[#C9A962]/50 flex-shrink-0 mt-0.5" />
                                        {a}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Hotels */}
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Where to Stay</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                    {hotels.map((h) => (
                        <div key={h.name} className="bg-slate-50 border border-slate-100 rounded-xl p-5">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <div className="text-slate-900 font-semibold">{h.name}</div>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        {Array.from({ length: h.stars }).map((_, i) => <Star key={i} className="w-3 h-3 text-[#C9A962]" fill="#C9A962" />)}
                                        <span className="text-slate-500 text-xs ml-1">{h.rating}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[#C9A962] font-semibold text-sm">{h.price}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-2">
                                <MapPin className="w-3 h-3" />{h.location}
                            </div>
                            <p className="text-slate-500 text-xs">{h.notes}</p>
                        </div>
                    ))}
                </div>

                {/* Key tips */}
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Group Travel Tips</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                    {[
                        { tip: "Book Sagrada Família well in advance", detail: "Tickets sell out weeks ahead, especially in summer. Morning entry is best before tour groups arrive." },
                        { tip: "Stay in Eixample, not Las Ramblas", detail: "The Ramblas area is overrun with tourists and pickpockets. Eixample has better restaurants and is just as central." },
                        { tip: "Nightlife starts very late", detail: "Dinner at 9pm, pre-drinks until midnight, clubs from 1–2am. Don't arrive at a club before midnight — you'll be alone." },
                        { tip: "Bunkers del Carmel for sunset", detail: "Hidden hilltop ruins with the best 360° city view. Free, 20 min walk from Gràcia. Go 1 hour before sunset." },
                        { tip: "Avoid July–August peak", detail: "Crowds are brutal and prices surge 30-50%. April–June or September–October gives the same weather at lower cost." },
                        { tip: "T-10 metro pass for groups", detail: "Buy a 10-trip card each to save 40% on metro fares vs. single tickets. Transfers are included within 75 minutes." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <Check className="w-4 h-4 text-[#4AD7A2] flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="text-slate-900 font-semibold text-sm mb-1">{item.tip}</div>
                                <div className="text-slate-500 text-xs leading-relaxed">{item.detail}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="p-6 rounded-2xl bg-[#C9A962]/8 border border-[#C9A962]/20">
                    <p className="text-slate-900 font-semibold mb-2">Plan your Barcelona group trip in 30 seconds</p>
                    <p className="text-slate-600 text-sm mb-4">PayaGo AI builds a complete itinerary with live flight prices, hotels, and activities — free for travellers.</p>
                    <Link href="/#early-access" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm">
                        Get Early Access — Free <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Related */}
                <div className="mt-12 pt-8 border-t border-slate-100">
                    <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">More destinations</h3>
                    <div className="flex flex-wrap gap-3">
                        {["tokyo", "lisbon", "paris", "amsterdam"].map((slug) => (
                            <Link key={slug} href={`/destinations/${slug}`} className="capitalize px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 hover:text-slate-900 hover:border-slate-200 transition-all text-sm">
                                {slug}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="py-8 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
                    © 2026 PayaGo Ltd. Registered in England & Wales.
                </div>
            </footer>
        </main>
    )
}
