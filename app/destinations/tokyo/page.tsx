import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, MapPin, Star, Users, Calendar, ArrowRight, Check } from "lucide-react"

export const metadata: Metadata = {
    title: "Tokyo Group Travel Guide 2026 — 7-Day Itinerary, Costs & Tips",
    description: "Complete group travel guide for Tokyo: 7-day itinerary, real costs (£620–980 per person), best neighbourhoods, transport tips, and where to eat. AI plans the full trip in 30 seconds.",
    openGraph: {
        title: "Tokyo Group Travel Guide 2026 | PayaGo",
        description: "7-day Tokyo group itinerary with real costs. Street food, temples, neon — AI-planned in 30 seconds.",
        url: "https://www.payago.in/destinations/tokyo",
        type: "article",
    },
    alternates: { canonical: "https://www.payago.in/destinations/tokyo" },
}

const pageSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Tokyo, Japan",
    description: "Tokyo is the world's largest city and one of the most extraordinary group travel destinations, combining ancient temples, futuristic technology, and an unrivalled food scene.",
    url: "https://www.payago.in/destinations/tokyo",
    touristType: ["Group travellers", "Food lovers", "Culture seekers"],
    includesAttraction: [
        { "@type": "TouristAttraction", name: "Senso-ji Temple" },
        { "@type": "TouristAttraction", name: "Shibuya Crossing" },
        { "@type": "TouristAttraction", name: "Tsukiji Outer Market" },
        { "@type": "TouristAttraction", name: "TeamLab Borderless" },
        { "@type": "TouristAttraction", name: "Shinjuku Golden Gai" },
    ],
}

const itinerary = [
    { day: "Day 1", title: "Arrival & Shinjuku", activities: ["Land at Narita or Haneda — take Narita Express or Airport Limousine", "Check in — Shinjuku or Shibuya are best for groups", "Evening: Shinjuku neon lights & izakayas", "Golden Gai for drinks in tiny atmospheric bars", "Omoide Yokocho (Memory Lane) for yakitori"] },
    { day: "Day 2", title: "Asakusa & Temples", activities: ["Senso-ji Temple at 7am (before crowds)", "Nakamise shopping street for souvenirs", "Tsukiji Outer Market breakfast (tuna sashimi)", "TeamLab Borderless digital art museum (book ahead)", "Sumida River cruise at sunset", "Akihabara evening: electronics & anime"] },
    { day: "Day 3", title: "Shibuya & Harajuku", activities: ["Meiji Shrine morning walk through forest", "Harajuku: Takeshita Street & Omotesando", "Shibuya Crossing (best from Starbucks or Shibuya Sky)", "Lunch: conveyor belt sushi (kaiten-zushi)", "Daikanyama & Nakameguro canal walk", "Shibuya nightlife: clubs & rooftop bars"] },
    { day: "Day 4", title: "Tsukiji & Ginza", activities: ["Morning cooking class in Tsukiji area", "Ginza luxury shopping & people watching", "Toyosu fish market (pre-booked tuna auction)", "Odaiba: Rainbow Bridge & teamLab Planets", "Onsen experience at Odaiba public baths", "Ramen for dinner in Shinjuku"] },
    { day: "Day 5", title: "Day Trip: Nikko or Kamakura", activities: ["Nikko: UNESCO shrines & waterfalls (2hr by train)", "OR Kamakura: Giant Buddha & temples (1hr by train)", "Packed bento lunch on the train", "Return by late afternoon", "Farewell group dinner: kaiseki or wagyu beef"] },
    { day: "Day 6", title: "Hidden Tokyo", activities: ["Yanaka neighbourhood: old Tokyo atmosphere", "Koenji for vintage clothing & indie cafes", "Shimokitazawa: bars, live music, antique shops", "Depachika (department store basement food halls)", "Shinjuku Omoide Yokocho final drinks"] },
    { day: "Day 7", title: "Departure", activities: ["Morning: last ramen or sushi breakfast", "Duty-free shopping at Narita or Haneda", "Take Narita Express — allow 90 minutes to airport", "Flight home with overstuffed suitcases"] },
]

export default function TokyoPage() {
    return (
        <main className="min-h-screen bg-[#04060A]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

            <header className="border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl bg-[#04060A]/80">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/payago-logo.jpg" alt="PayaGo" className="w-9 h-9 object-cover rounded-xl" />
                        <span className="text-white font-semibold text-lg">PayaGo</span>
                    </Link>
                    <Link href="/destinations" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" /> Destinations
                    </Link>
                </div>
            </header>

            <div className="relative h-72 overflow-hidden">
                <img src="/images/travel-tokyo.png" alt="Tokyo skyline at night" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#04060A]" />
                <div className="absolute bottom-8 left-0 right-0 max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-2 mb-2"><span className="text-3xl">🇯🇵</span><span className="text-white/60 text-sm">Japan</span></div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Tokyo Group Travel Guide</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[
                        { label: "Best time", value: "Mar–May, Oct–Nov" },
                        { label: "Ideal group", value: "2–6 people" },
                        { label: "Budget/person", value: "£620–980" },
                        { label: "Travel score", value: "9.6 / 10" },
                    ].map((s) => (
                        <div key={s.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                            <div className="text-white font-bold text-lg">{s.value}</div>
                            <div className="text-white/30 text-xs mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4 text-white/70 leading-relaxed text-lg mb-12">
                    <p>Tokyo is the most extraordinary city on earth for group travel. Nowhere else combines a 1,400-year-old Buddhist temple with a world-leading contemporary art museum within a 15-minute metro ride. The food scene is unmatched — Tokyo has more Michelin stars than any other city, but the best meals are often under £10 at a standing ramen bar.</p>
                    <p>For groups, the main consideration is size. Groups of 4–6 are ideal — many traditional restaurants only seat up to 6, and the metro can feel intense with larger groups. Book key experiences (TeamLab, tuna auction at Toyosu) at least 2–3 weeks ahead.</p>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6">7-Day Group Itinerary</h2>
                <div className="space-y-4 mb-12">
                    {itinerary.map((day) => (
                        <div key={day.day} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-[#7C5CFF] font-black text-sm">{day.day}</span>
                                <h3 className="text-white font-bold">{day.title}</h3>
                            </div>
                            <ul className="space-y-2">
                                {day.activities.map((a, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-white/60 text-sm">
                                        <ArrowRight className="w-4 h-4 text-[#7C5CFF]/50 flex-shrink-0 mt-0.5" />{a}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-white mb-6">Essential Tokyo Tips for Groups</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                    {[
                        { tip: "IC Card for transport", detail: "Load a Suica or Pasmo card at the airport. Tap in/out of every train and subway — no ticket queues." },
                        { tip: "Book TeamLab 3 weeks ahead", detail: "TeamLab Borderless sells out completely. Book online the moment your dates are confirmed." },
                        { tip: "Google Translate camera mode", detail: "Point your phone camera at any Japanese menu — instant translation. Essential for group ordering." },
                        { tip: "Cherry blossom timing", detail: "March–April is beautiful but the most crowded and expensive week of the year. Book 6 months ahead if you want this period." },
                        { tip: "Cash is still king", detail: "Many traditional restaurants are cash only. Use 7-Eleven or Japan Post ATMs — they reliably accept foreign cards." },
                        { tip: "Shinjuku for groups", detail: "Stay in Shinjuku: central, on every metro line, near Haneda express, and surrounded by food and nightlife." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <Check className="w-4 h-4 text-[#7C5CFF] flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="text-white font-semibold text-sm mb-1">{item.tip}</div>
                                <div className="text-white/50 text-xs leading-relaxed">{item.detail}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 rounded-2xl bg-[#C9A962]/8 border border-[#C9A962]/20">
                    <p className="text-white font-semibold mb-2">Plan your Tokyo group trip in 30 seconds</p>
                    <p className="text-white/60 text-sm mb-4">PayaGo AI builds a complete itinerary with live flight prices, hotels, and activities — free for travellers.</p>
                    <Link href="/#early-access" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm">
                        Get Early Access — Free <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                    <h3 className="text-white/40 text-sm font-semibold uppercase tracking-wider mb-4">More destinations</h3>
                    <div className="flex flex-wrap gap-3">
                        {["barcelona", "lisbon", "paris", "amsterdam"].map((slug) => (
                            <Link key={slug} href={`/destinations/${slug}`} className="capitalize px-4 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-white/60 hover:text-white hover:border-white/10 transition-all text-sm">{slug}</Link>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center text-white/20 text-sm">© 2026 PayaGo Ltd. Registered in England & Wales.</div>
            </footer>
        </main>
    )
}
