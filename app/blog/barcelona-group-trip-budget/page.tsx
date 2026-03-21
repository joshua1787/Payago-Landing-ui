import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar } from "lucide-react"

export const metadata: Metadata = {
    title: "Barcelona Group Trip: What It Actually Costs in 2026",
    description: "Real Barcelona group trip costs in 2026: flights from London, hotel prices by neighbourhood, food budgets, and activities. With a sample 5-day budget for 6 people.",
    openGraph: {
        title: "Barcelona Group Trip: What It Actually Costs in 2026 | PayaGo Blog",
        description: "Real Barcelona group trip costs in 2026: flights from London, hotel prices by neighbourhood, food budgets, and activities. With a sample 5-day budget for 6 people.",
        url: "https://www.payago.in/blog/barcelona-group-trip-budget",
        type: "article",
    },
    alternates: { canonical: "https://www.payago.in/blog/barcelona-group-trip-budget" },
}

const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Barcelona Group Trip: What It Actually Costs in 2026",
    datePublished: "2026-03-12",
    author: { "@type": "Organization", name: "PayaGo" },
    publisher: { "@type": "Organization", name: "PayaGo", logo: { "@type": "ImageObject", url: "https://www.payago.in/payago_logo_transparent.png" } },
    url: "https://www.payago.in/blog/barcelona-group-trip-budget",
}

export default function BlogPost() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <header className="border-b border-slate-100 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/payago-logo-new.png" alt="PayaGo" className="h-10 w-auto object-contain -ml-2" />
                        
                    </Link>
                    <Link href="/blog" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                </div>
            </header>
            <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
                <div className="mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full text-[#C9A962] bg-[#C9A962]/10 border border-[#C9A962]/30">Destination Guides</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-8">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /><time dateTime="2026-03-12">2026-03-12</time></span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />6 min read</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-10 leading-tight text-slate-900">Barcelona Group Trip: What It Actually Costs in 2026</h1>
                <div className="rounded-2xl overflow-hidden mb-12 aspect-video bg-slate-100 border border-slate-100">
                    <img src="/images/travel-santorini.png" alt="Travel destination" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-8 text-white/75 leading-relaxed text-lg">
                    <p>Barcelona is frequently cited as Europe's best value group destination, but 'value' is relative. A 5-day trip for 6 people can cost £1,500 total or £3,000+ depending on your choices. Here's what things actually cost in 2026, with real numbers.</p>
                    <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Flights: what to pay, when to book</h2>
                    <p>From London, Barcelona is served by 4 airlines on 3 airports. The cheapest regular route is London Gatwick to Barcelona El Prat on EasyJet or Vueling (£35–90 each way in non-peak periods). For a group of 6, booking 8–12 weeks ahead typically gets you under £80 per person return. Flying on Tuesday or Wednesday is consistently 20–30% cheaper than Friday or Sunday. Avoid school holidays — prices triple.</p>
                    <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Hotel costs by neighbourhood</h2>
                    <p>Where you stay in Barcelona makes a dramatic difference to price and experience. Las Ramblas area (the tourist spine): £90–150/night but overrun with pickpockets and tourist traps. Eixample: the best balance of price and location — £70–120/night, central, near Gaudí buildings, excellent restaurants. Gracia: bohemian, local feel, slightly cheaper at £60–100/night but 15 minutes from the beach. Barceloneta: sea views and beach access at a premium — £120–200/night.</p>
                    <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Sample 5-day budget for 6 people</h2>
                    <div className="overflow-hidden rounded-xl border border-slate-100 my-6">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50">
                                    <th className="text-left px-4 py-3 text-slate-500 font-medium">Item</th>
                                    <th className="text-left px-4 py-3 text-slate-500 font-medium">Cost</th>
                                    <th className="text-left px-4 py-3 text-slate-500 font-medium">Notes</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600">
                                <tr key="0" className="border-b border-slate-100 last:border-0"><td className="px-4 py-3 text-slate-600 text-sm">Return flights (EasyJet, 8 weeks ahead)</td><td className="px-4 py-3 text-[#C9A962] font-semibold text-sm">£75 pp</td><td className="px-4 py-3 text-slate-500 text-xs">Total: £450</td></tr>
                        <tr key="1" className="border-b border-slate-100 last:border-0"><td className="px-4 py-3 text-slate-600 text-sm">Hotel 5 nights (Eixample, mid-range)</td><td className="px-4 py-3 text-[#C9A962] font-semibold text-sm">£90/room/night</td><td className="px-4 py-3 text-slate-500 text-xs">Total: £1,350 (3 twin rooms)</td></tr>
                        <tr key="2" className="border-b border-slate-100 last:border-0"><td className="px-4 py-3 text-slate-600 text-sm">Food & drink (5 days)</td><td className="px-4 py-3 text-[#C9A962] font-semibold text-sm">£50–80/day/person</td><td className="px-4 py-3 text-slate-500 text-xs">Total: £1,500–2,400</td></tr>
                        <tr key="3" className="border-b border-slate-100 last:border-0"><td className="px-4 py-3 text-slate-600 text-sm">Activities (Sagrada, Güell, museums)</td><td className="px-4 py-3 text-[#C9A962] font-semibold text-sm">£30–50 pp</td><td className="px-4 py-3 text-slate-500 text-xs">Total: £180–300</td></tr>
                        <tr key="4" className="border-b border-slate-100 last:border-0"><td className="px-4 py-3 text-slate-600 text-sm">Transport (T-10 cards + airport)</td><td className="px-4 py-3 text-[#C9A962] font-semibold text-sm">£20 pp</td><td className="px-4 py-3 text-slate-500 text-xs">Total: £120</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-12 p-6 rounded-2xl bg-[#C9A962]/8 border border-[#C9A962]/20">
                        <p className="text-slate-900 font-semibold mb-2">Let AI plan your group trip in 30 seconds — with live prices.</p>
                        <p className="text-slate-600 text-sm mb-4">PayaGo builds a complete itinerary with real hotel and flight prices. Free for travellers. Launching April 2026.</p>
                        <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm">
                            Get Early Access — Free
                        </Link>
                    </div>
                </div>
            </div>
            <footer className="py-8 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">© 2026 PayaGo Ltd.</div>
            </footer>
        </main>
    )
}
