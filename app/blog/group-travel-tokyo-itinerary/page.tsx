import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar } from "lucide-react"

export const metadata: Metadata = {
    title: "Tokyo Group Trip Itinerary: 7 Days, Real Costs & Insider Tips (2026)",
    description: "Complete 7-day Tokyo group itinerary for 2026: where to stay, what to eat, how much it costs per person, and the experiences you cannot miss.",
    openGraph: {
        title: "Tokyo Group Trip Itinerary: 7 Days, Real Costs & Insider Tips (2026) | PayaGo Blog",
        description: "Complete 7-day Tokyo group itinerary for 2026: where to stay, what to eat, how much it costs per person, and the experiences you cannot miss.",
        url: "https://www.payago.in/blog/group-travel-tokyo-itinerary",
        type: "article",
    },
    alternates: { canonical: "https://www.payago.in/blog/group-travel-tokyo-itinerary" },
}

const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Tokyo Group Trip Itinerary: 7 Days, Real Costs & Insider Tips (2026)",
    datePublished: "2026-03-08",
    author: { "@type": "Organization", name: "PayaGo" },
    publisher: { "@type": "Organization", name: "PayaGo", logo: { "@type": "ImageObject", url: "https://www.payago.in/payago-logo-transparent-v2.png" } },
    url: "https://www.payago.in/blog/group-travel-tokyo-itinerary",
}

export default function BlogPost() {
    return (
        <main className="min-h-screen bg-[#04060A]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <header className="border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl bg-[#04060A]/80">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/payago-logo-transparent-v2.png" alt="PayaGo" className="w-9 h-9 object-contain" />
                        <span className="text-white font-semibold text-lg">PayaGo</span>
                    </Link>
                    <Link href="/blog" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                </div>
            </header>
            <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
                <div className="mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full text-[#C9A962] bg-[#C9A962]/10 border border-[#C9A962]/30">Destination Guides</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/30 mb-8">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /><time dateTime="2026-03-08">2026-03-08</time></span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />6 min read</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-10 leading-tight text-white">Tokyo Group Trip Itinerary: 7 Days, Real Costs & Insider Tips (2026)</h1>
                <div className="rounded-2xl overflow-hidden mb-12 aspect-video bg-white/5 border border-white/5">
                    <img src="/images/travel-santorini.png" alt="Travel destination" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-8 text-white/75 leading-relaxed text-lg">
                    <p>Tokyo is arguably the most rewarding group travel destination in the world. Nothing else combines ancient temples, cutting-edge technology, the world's densest concentration of Michelin-starred restaurants, and a subway system so efficient that being late is genuinely unusual.</p>
                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Day 1–2: Land, Recover, Explore Shinjuku & Asakusa</h2>
                    <p>Your first two days set the tone. Land at Narita or Haneda (Haneda is closer — 30 minutes to central Tokyo vs 60 minutes). Take the Narita Express or Limousine Bus and load your Suica card at the airport — this IC card handles every train, subway, and many convenience store purchases for the entire trip. Stay in Shinjuku: it's on every major metro line and surrounded by food and nightlife at every price point. Day 2: Senso-ji Temple in Asakusa at 7am before tour groups arrive, then Tsukiji Outer Market for a breakfast of fresh tuna sashimi and tamago on rice.</p>
                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Day 3–4: Shibuya, Harajuku & TeamLab</h2>
                    <p>The cultural heart of modern Tokyo. Shibuya Crossing is best seen from the Starbucks or Shibuya Sky observation deck. Harajuku's Takeshita Street is 200 metres of extraordinary street fashion — fascinating even if you're not buying. TeamLab Borderless is the unmissable experience: immersive digital art rooms that are unlike anything else in the world. Book 3 weeks ahead — it sells out completely.</p>
                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Budget breakdown per person</h2>
                    <div className="overflow-hidden rounded-xl border border-white/5 my-6">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="text-left px-4 py-3 text-white/40 font-medium">Item</th>
                                    <th className="text-left px-4 py-3 text-white/40 font-medium">Cost</th>
                                    <th className="text-left px-4 py-3 text-white/40 font-medium">Notes</th>
                                </tr>
                            </thead>
                            <tbody className="text-white/60">
                                <tr key="0" className="border-b border-white/5 last:border-0"><td className="px-4 py-3 text-white/80 text-sm">Return flights (London–Tokyo)</td><td className="px-4 py-3 text-[#C9A962] font-semibold text-sm">£380–580</td><td className="px-4 py-3 text-white/40 text-xs">ANA or JAL direct 11h45m</td></tr>
                        <tr key="1" className="border-b border-white/5 last:border-0"><td className="px-4 py-3 text-white/80 text-sm">Hotel 7 nights (per person, shared twin)</td><td className="px-4 py-3 text-[#C9A962] font-semibold text-sm">£180–420</td><td className="px-4 py-3 text-white/40 text-xs">Shinjuku Granbell ★★★★ to Park Hyatt</td></tr>
                        <tr key="2" className="border-b border-white/5 last:border-0"><td className="px-4 py-3 text-white/80 text-sm">Food (7 days)</td><td className="px-4 py-3 text-[#C9A962] font-semibold text-sm">£120–350</td><td className="px-4 py-3 text-white/40 text-xs">Ramen & konbini to kaiseki dinners</td></tr>
                        <tr key="3" className="border-b border-white/5 last:border-0"><td className="px-4 py-3 text-white/80 text-sm">Transport (Suica)</td><td className="px-4 py-3 text-[#C9A962] font-semibold text-sm">£35</td><td className="px-4 py-3 text-white/40 text-xs">All trains and subways</td></tr>
                        <tr key="4" className="border-b border-white/5 last:border-0"><td className="px-4 py-3 text-white/80 text-sm">Activities & entrance fees</td><td className="px-4 py-3 text-[#C9A962] font-semibold text-sm">£80–200</td><td className="px-4 py-3 text-white/40 text-xs">TeamLab, shrines, castle, day trip</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-12 p-6 rounded-2xl bg-[#C9A962]/8 border border-[#C9A962]/20">
                        <p className="text-white font-semibold mb-2">Let AI plan your group trip in 30 seconds — with live prices.</p>
                        <p className="text-white/60 text-sm mb-4">PayaGo builds a complete itinerary with real hotel and flight prices. Free for travellers. Launching April 2026.</p>
                        <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm">
                            Get Early Access — Free
                        </Link>
                    </div>
                </div>
            </div>
            <footer className="py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center text-white/20 text-sm">© 2026 PayaGo Ltd.</div>
            </footer>
        </main>
    )
}
