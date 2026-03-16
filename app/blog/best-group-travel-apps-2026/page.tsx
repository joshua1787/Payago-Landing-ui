import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, Check, X } from "lucide-react"

export const metadata: Metadata = {
    title: "Best Group Travel Planning Apps of 2026 — Compared",
    description: "Honest comparison of the top group travel apps in 2026: TripIt, Google Trips, Wanderlog, TravelMapper, and PayaGo. What each does well, what it doesn't, and which to use.",
    openGraph: {
        title: "Best Group Travel Planning Apps of 2026 — Compared | PayaGo Blog",
        description: "Honest comparison of the top group travel apps in 2026. What each does well and what it doesn't.",
        url: "https://www.payago.in/blog/best-group-travel-apps-2026",
        type: "article",
    },
    alternates: { canonical: "https://www.payago.in/blog/best-group-travel-apps-2026" },
}

const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Group Travel Planning Apps of 2026 — Compared",
    datePublished: "2026-03-10",
    author: { "@type": "Organization", name: "PayaGo" },
    publisher: { "@type": "Organization", name: "PayaGo", logo: { "@type": "ImageObject", url: "https://www.payago.in/payago-logo-transparent-v2.png" } },
    url: "https://www.payago.in/blog/best-group-travel-apps-2026",
}

const apps = [
    {
        name: "PayaGo",
        tagline: "AI-powered group trip planner",
        category: "AI planning + coordination + booking",
        color: "#C9A962",
        pros: ["AI builds complete itinerary in 30 seconds", "Group voting built-in", "Split payments (each person pays their share)", "Live flight/hotel/activity prices", "Real-time collaborative editing"],
        cons: ["Launching April 2026 (not live yet)", "Requires app download for payments"],
        bestFor: "Groups who want one app for everything",
        price: "Free for travellers",
        verdict: "The only app that combines AI planning, group coordination, and payments in one place. Nothing else comes close for group trips.",
    },
    {
        name: "TripIt",
        tagline: "Trip organiser & itinerary builder",
        category: "Itinerary organiser",
        color: "#7C5CFF",
        pros: ["Excellent at parsing confirmation emails", "Clean timeline view", "Offline access to plans"],
        cons: ["Manual entry required", "No AI generation", "No group coordination", "No booking capability"],
        bestFor: "Organising a trip you've already booked",
        price: "Free / £36/year Pro",
        verdict: "Good for personal organisation after booking, but doesn't solve the planning problem at all.",
    },
    {
        name: "Wanderlog",
        tagline: "Collaborative trip planner & map",
        category: "Collaborative planning",
        color: "#00D4FF",
        pros: ["Beautiful map-based interface", "Real-time collaboration", "Import Google Maps lists", "Good for route planning"],
        cons: ["No AI itinerary generation", "No booking", "No group payments", "Manual research still required"],
        bestFor: "Road trips and self-drive holidays with a set route",
        price: "Free / £8/month Pro",
        verdict: "Great for mapping out a route, but doesn't reduce the research and coordination work.",
    },
    {
        name: "Google Trips / Maps",
        tagline: "Search + saved places",
        category: "Research tool",
        color: "#4AD7A2",
        pros: ["Everyone already has it", "Real-time reviews and hours", "Offline maps", "Reserve with Google integration"],
        cons: ["Not designed for group trips", "No coordination features", "No shared itinerary", "You still have to manually book everything"],
        bestFor: "On-the-ground navigation and finding places",
        price: "Free",
        verdict: "Essential during the trip for navigation. Not a planning app.",
    },
]

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
                    <span className="text-xs font-semibold px-3 py-1 rounded-full text-[#7C5CFF] bg-[#7C5CFF]/10 border border-[#7C5CFF]/30">AI & Technology</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/30 mb-8">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /><time dateTime="2026-03-10">March 10, 2026</time></span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />7 min read</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-10 leading-tight text-white">
                    Best Group Travel Planning Apps of 2026 — Compared
                </h1>
                <div className="space-y-6 text-white/75 leading-relaxed text-lg mb-12">
                    <p>
                        The travel app market is crowded, but if you look closely, most apps solve only a slice of the group travel problem. TripIt organises your trip after you&apos;ve booked it. Wanderlog helps you map a route you&apos;ve already decided on. Google Maps helps you navigate once you&apos;re there.
                    </p>
                    <p>
                        None of them solve the actual hard problem: going from &ldquo;we should go somewhere&rdquo; to &ldquo;everything is booked and everyone has paid.&rdquo; Here&apos;s an honest comparison of what&apos;s available in 2026.
                    </p>
                </div>

                <div className="space-y-8">
                    {apps.map((app) => (
                        <div key={app.name} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-white">{app.name}</h2>
                                    <p className="text-white/40 text-sm">{app.tagline}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-semibold" style={{ color: app.color }}>{app.price}</div>
                                    <div className="text-white/30 text-xs mt-0.5">{app.category}</div>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <div className="text-xs font-semibold text-[#4AD7A2] uppercase tracking-wider mb-2">What it does well</div>
                                    <ul className="space-y-1.5">
                                        {app.pros.map((p, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                                                <Check className="w-3.5 h-3.5 text-[#4AD7A2] flex-shrink-0 mt-0.5" />{p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-[#FF6B6B] uppercase tracking-wider mb-2">Limitations</div>
                                    <ul className="space-y-1.5">
                                        {app.cons.map((c, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                                                <X className="w-3.5 h-3.5 text-[#FF6B6B] flex-shrink-0 mt-0.5" />{c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03]">
                                <span className="text-xs font-semibold flex-shrink-0" style={{ color: app.color }}>Verdict:</span>
                                <span className="text-white/60 text-xs leading-relaxed">{app.verdict}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 rounded-2xl bg-[#C9A962]/8 border border-[#C9A962]/20">
                    <p className="text-white font-semibold mb-2">Try PayaGo when it launches in April 2026.</p>
                    <p className="text-white/60 text-sm mb-4">AI plans the trip, your group votes, everyone pays their share. Free for travellers.</p>
                    <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm">
                        Get Early Access — Free
                    </Link>
                </div>
            </div>
            <footer className="py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center text-white/20 text-sm">© 2026 PayaGo Ltd.</div>
            </footer>
        </main>
    )
}
