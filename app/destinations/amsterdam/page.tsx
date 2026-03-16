import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
    title: "Amsterdam Group Travel Guide 2026 — Itinerary, Costs & Tips",
    description: "Complete group travel guide for Amsterdam: itinerary, real prices, best neighbourhoods and insider tips. PayaGo AI plans the full trip in 30 seconds.",
    openGraph: {
        title: "Amsterdam Group Travel Guide 2026 | PayaGo",
        description: "Group travel guide for Amsterdam with real prices. AI-planned in 30 seconds.",
        url: "https://www.payago.in/destinations/amsterdam",
        type: "article",
    },
    alternates: { canonical: "https://www.payago.in/destinations/amsterdam" },
}

export default function Page() {
    return (
        <main className="min-h-screen bg-white">
            <header className="border-b border-slate-100 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/payago_logo_transparent.png" alt="PayaGo" className="h-9 w-auto object-contain" />
                        
                    </Link>
                    <Link href="/destinations" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" /> Destinations
                    </Link>
                </div>
            </header>
            <div className="relative h-64 overflow-hidden">
                <img src="/luxury-travel-destination-aerial-view-of-tropical-.jpg" alt="Amsterdam travel" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#04060A]" />
                <div className="absolute bottom-8 left-0 right-0 max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Amsterdam Group Travel Guide</h1>
                </div>
            </div>
            <div className="max-w-4xl mx-auto px-6 py-16 text-center">
                <p className="text-slate-600 text-lg mb-8">
                    Full guide coming soon. PayaGo AI already knows Amsterdam inside out — get early access and let the AI build your group itinerary in 30 seconds.
                </p>
                <Link href="/#early-access" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                    Plan a Amsterdam Trip — Free <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="mt-12 pt-8 border-t border-slate-100">
                    <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">Other destinations</h3>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link key="barcelona" href="/destinations/barcelona" className="capitalize px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 hover:text-slate-900 hover:border-slate-200 transition-all text-sm">barcelona</Link>
                        <Link key="tokyo" href="/destinations/tokyo" className="capitalize px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 hover:text-slate-900 hover:border-slate-200 transition-all text-sm">tokyo</Link>
                        <Link key="lisbon" href="/destinations/lisbon" className="capitalize px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 hover:text-slate-900 hover:border-slate-200 transition-all text-sm">lisbon</Link>
                        <Link key="paris" href="/destinations/paris" className="capitalize px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 hover:text-slate-900 hover:border-slate-200 transition-all text-sm">paris</Link>
                    </div>
                </div>
            </div>
            <footer className="py-8 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
                    © 2026 PayaGo Ltd. Registered in England and Wales.
                </div>
            </footer>
        </main>
    )
}
