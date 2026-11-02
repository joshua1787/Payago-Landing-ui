import type { Metadata } from "next"
import Link from "next/link"
import { OptimizedPicture } from "@/components/optimized-picture"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SiteNav } from "@/components/site/site-nav"
import { SiteFooter } from "@/components/site/site-footer"
import { TripsNotice } from "@/components/trips-notice"

export const metadata: Metadata = {
    title: "Lisbon Group Travel Guide 2026 — Itinerary, Costs & Tips",
    description: "Complete group travel guide for Lisbon: itinerary ideas, sample budget context, best neighbourhoods and insider tips. PayaGo AI plans the full trip quickly.",
    openGraph: {
        title: "Lisbon Group Travel Guide 2026 | PayaGo",
        description: "Group travel guide for Lisbon with sample budget context. AI-planned quickly.",
        url: "https://payago.in/destinations/lisbon",
        type: "article",
        images: [
            {
                url: "https://payago.in/og/destinations-lisbon.jpg",
                width: 1200,
                height: 630,
                alt: "PayaGo AI Group Travel Planning",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Lisbon group travel guide",
        description: "Great-value neighbourhoods, food, viewpoints, and shared planning tips.",
        images: ["https://payago.in/og/destinations-lisbon.jpg"],
    },
    alternates: { canonical: "https://payago.in/destinations/lisbon" },
}

export default function Page() {
    return (
        <main className="min-h-screen bg-white">
            <SiteNav />
            <TripsNotice />
            <div className="relative h-64 overflow-hidden">
                <OptimizedPicture src="/luxury-travel-destination-aerial-view-of-tropical-.webp" alt="Lisbon travel" imgClassName="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#04060A]" />
                <div className="absolute bottom-8 left-0 right-0 max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Lisbon Group Travel Guide</h1>
                </div>
            </div>
            <div className="max-w-4xl mx-auto px-6 py-16 text-center">
                <p className="text-slate-600 text-lg mb-8">
                    Full guide coming soon. PayaGo AI already knows Lisbon inside out — get early access and let the AI build your group itinerary quickly.
                </p>
                <Link href="/early-access/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                    Plan a Lisbon Trip <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="mt-12 pt-8 border-t border-slate-100">
                    <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">Other destinations</h3>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link key="barcelona" href="/destinations/barcelona" className="capitalize px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 hover:text-slate-900 hover:border-slate-200 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] text-sm">barcelona</Link>
                        <Link key="tokyo" href="/destinations/tokyo" className="capitalize px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 hover:text-slate-900 hover:border-slate-200 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] text-sm">tokyo</Link>
                        <Link key="paris" href="/destinations/paris" className="capitalize px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 hover:text-slate-900 hover:border-slate-200 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] text-sm">paris</Link>
                        <Link key="amsterdam" href="/destinations/amsterdam" className="capitalize px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 hover:text-slate-900 hover:border-slate-200 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] text-sm">amsterdam</Link>
                    </div>
                </div>
            </div>
            <SiteFooter />
        </main>
    )
}
