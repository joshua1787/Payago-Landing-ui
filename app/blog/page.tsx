import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

const articles = [
    {
        title: "How AI is Changing Travel Planning in 2026",
        date: "February 15, 2026",
        readTime: "4 min",
        excerpt: "Travel planning has always been time-consuming. Between researching destinations on TripAdvisor, comparing hotel prices across multiple websites, coordinating with friends via WhatsApp...",
        slug: "ai-travel-planning-2026"
    },
    {
        title: "The Best European Cities for Group Travel",
        date: "February 12, 2026",
        readTime: "5 min",
        excerpt: "Planning a group trip to Europe? These five cities consistently rank as the best destinations for friend groups, families, and colleague getaways based on factors like walkability...",
        slug: "best-european-cities-group-travel"
    },
    {
        title: "Why We Built PayaGo",
        date: "February 8, 2026",
        readTime: "3 min",
        excerpt: "Every product starts with a frustration. For us, it was planning a week-long trip to Italy with five friends. What should have been exciting turned into weeks of scattered WhatsApp messages...",
        slug: "why-we-built-payago"
    }
]

export default function BlogIndex() {
    return (
        <main className="min-h-screen overflow-x-hidden bg-[#0D2137] relative text-white selection:bg-[#E8742A]/20 selection:text-[#E8742A]">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
                <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">
                    PayaGo <span className="text-[#E8742A]">Blog</span>
                </h1>

                <div className="grid gap-8">
                    {articles.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/blog/${article.slug}`}
                            className="group bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 hover:bg-white/[0.05] hover:border-[#E8742A]/30 transition-all duration-300"
                        >
                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-4">
                                <span>{article.date}</span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span>{article.readTime} read</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 group-hover:text-[#E8742A] transition-colors">{article.title}</h2>
                            <p className="text-white/60 leading-relaxed max-w-2xl">{article.excerpt}</p>

                            <div className="mt-6 font-medium text-[#E8742A] flex items-center gap-2 group-hover:gap-3 transition-all">
                                Read Article <span aria-hidden="true">&rarr;</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    )
}
