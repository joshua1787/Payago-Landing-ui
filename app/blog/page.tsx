import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
    title: "Travel Blog — Group Trip Tips, AI Travel Guides & Destination Inspiration",
    description: "Discover the best destinations for group travel, how AI is transforming trip planning, and expert guides to help your next group adventure go smoothly.",
    openGraph: {
        title: "PayaGo Travel Blog — Group Trip Tips & Destination Guides",
        description: "Discover the best destinations for group travel, how AI is transforming trip planning, and expert guides to help your next group adventure go smoothly.",
        url: "https://www.payago.in/blog",
        type: "website",
    },
    alternates: {
        canonical: "https://www.payago.in/blog",
    },
}

const articles = [
    {
        title: "How AI is Changing Group Travel Planning in 2026",
        date: "February 15, 2026",
        dateISO: "2026-02-15",
        readTime: "6 min",
        excerpt: "The average group trip takes 15+ hours to plan. AI travel tools are compressing that to 30 seconds — and delivering better results. Here's what's actually changed.",
        slug: "ai-travel-planning-2026",
        category: "AI & Technology",
        categoryColor: "#7C5CFF",
    },
    {
        title: "The 5 Best European Cities for Group Travel in 2026",
        date: "February 12, 2026",
        dateISO: "2026-02-12",
        readTime: "7 min",
        excerpt: "Barcelona, Lisbon, Prague, Amsterdam, Budapest — ranked by walkability, group activities, accommodation value, and how easy they are to coordinate. With real pricing.",
        slug: "best-european-cities-group-travel",
        category: "Destination Guides",
        categoryColor: "#C9A962",
    },
    {
        title: "Best Group Travel Planning Apps of 2026 — Compared",
        date: "March 10, 2026",
        dateISO: "2026-03-10",
        readTime: "7 min",
        excerpt: "Honest comparison of TripIt, Wanderlog, Google Trips, and PayaGo. What each does well, what it doesn't, and which one actually solves the group planning problem.",
        slug: "best-group-travel-apps-2026",
        category: "AI & Technology",
        categoryColor: "#7C5CFF",
    },
    {
        title: "How to Split Travel Costs in a Group (Without the Drama)",
        date: "March 5, 2026",
        dateISO: "2026-03-05",
        readTime: "6 min",
        excerpt: "Money is the #1 cause of group travel conflict. Here are the 4 methods for splitting costs ranked by fairness — and why the most common approach is the worst one.",
        slug: "how-to-split-travel-costs",
        category: "Group Travel Tips",
        categoryColor: "#4AD7A2",
    },
    {
        title: "Tokyo Group Trip Itinerary: 7 Days, Real Costs & Insider Tips",
        date: "March 8, 2026",
        dateISO: "2026-03-08",
        readTime: "6 min",
        excerpt: "Everything you need to plan a Tokyo group trip: day-by-day itinerary, budget breakdown (£620–980/person), transport guide, and must-book experiences.",
        slug: "group-travel-tokyo-itinerary",
        category: "Destination Guides",
        categoryColor: "#C9A962",
    },
    {
        title: "Barcelona Group Trip: What It Actually Costs in 2026",
        date: "March 12, 2026",
        dateISO: "2026-03-12",
        readTime: "6 min",
        excerpt: "Real Barcelona costs in 2026: flights, hotels by neighbourhood, food budgets, and activities. With a sample 5-day budget breakdown for a group of 6.",
        slug: "barcelona-group-trip-budget",
        category: "Destination Guides",
        categoryColor: "#C9A962",
    },
    {
        title: "Why We Built PayaGo",
        date: "February 8, 2026",
        dateISO: "2026-02-08",
        readTime: "4 min",
        excerpt: "A week-long Italy trip with five friends turned into weeks of chaos. That frustration became a product. Here's the full story.",
        slug: "why-we-built-payago",
        category: "Company",
        categoryColor: "#4AD7A2",
    },
]

const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "PayaGo Travel Blog",
    description: "Group travel tips, AI travel planning guides, and destination inspiration from the PayaGo team.",
    url: "https://www.payago.in/blog",
    publisher: {
        "@type": "Organization",
        name: "PayaGo",
        url: "https://www.payago.in",
    },
}

export default function BlogIndex() {
    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />

            <header className="border-b border-slate-100 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/payago_logo_transparent.png" alt="PayaGo" className="h-9 w-auto object-contain" />
                        
                    </Link>
                    <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C9A962]/8 rounded-full blur-[200px]" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A962]/10 border border-[#C9A962]/20 mb-8">
                        <span className="w-2 h-2 bg-[#C9A962] rounded-full" />
                        <span className="text-sm font-medium text-[#C9A962]">Travel insights from the PayaGo team</span>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                        The Travel Blog
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl">
                        Destination guides, AI travel tips, and everything you need to plan better group trips.
                    </p>
                </div>
            </section>

            {/* Articles */}
            <section className="py-8 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="space-y-6">
                        {articles.map((article) => (
                            <Link
                                key={article.slug}
                                href={`/blog/${article.slug}`}
                                className="group block bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:bg-slate-50 hover:border-slate-200 transition-all duration-300"
                            >
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <span
                                        className="text-xs font-semibold px-3 py-1 rounded-full"
                                        style={{ color: article.categoryColor, background: `${article.categoryColor}15`, border: `1px solid ${article.categoryColor}30` }}
                                    >
                                        {article.category}
                                    </span>
                                    <div className="flex items-center gap-3 text-sm text-slate-400">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <time dateTime={article.dateISO}>{article.date}</time>
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {article.readTime} read
                                        </span>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#C9A962] transition-colors leading-snug">
                                    {article.title}
                                </h2>
                                <p className="text-slate-500 leading-relaxed max-w-2xl">{article.excerpt}</p>
                                <div className="mt-6 font-medium text-[#C9A962] flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
                                    Read Article <ArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 border-t border-slate-100 mt-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to plan your next group trip?</h2>
                    <p className="text-slate-500 mb-8">AI builds the itinerary. Your group votes. It books automatically.</p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                    >
                        Get Early Access — Free
                        <ArrowRight className="w-4 h-4" />
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
