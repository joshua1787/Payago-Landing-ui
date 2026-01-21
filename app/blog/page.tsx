import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock, User } from "lucide-react"

export const metadata: Metadata = {
    title: "Blog — PayaGo",
    description: "Insights, tips, and stories about shared expenses, group finance, and the future of payments.",
}

const featuredPost = {
    title: "The Hidden Cost of Shared Expenses: Why We Built PayaGo",
    excerpt: "Every year, billions of pounds sit in limbo between friends, families, and colleagues. These aren't just numbers — they're sources of tension, awkwardness, and in some cases, broken relationships. Here's why we decided to change that.",
    author: "Joshua Veeraiah",
    role: "Founder & CEO",
    date: "January 15, 2026",
    readTime: "8 min read",
    category: "Company",
    slug: "hidden-cost-shared-expenses",
    image: "/payago-logo.jpg",
}

const posts = [
    {
        title: "5 Tips for Managing Group Travel Expenses",
        excerpt: "Planning a trip with friends? Here's how to avoid the awkward money conversations and keep everyone happy.",
        author: "Sarah Chen",
        date: "January 10, 2026",
        readTime: "5 min read",
        category: "Tips",
        slug: "group-travel-expenses-tips",
    },
    {
        title: "How Auto-Split Technology Works",
        excerpt: "A deep dive into the technology behind instant bill splitting and how we process millions of transactions seamlessly.",
        author: "Technical Team",
        date: "January 5, 2026",
        readTime: "6 min read",
        category: "Technology",
        slug: "auto-split-technology",
    },
    {
        title: "The Psychology of Money Between Friends",
        excerpt: "Why do money conversations feel so awkward? We explore the psychology and how to navigate financial relationships.",
        author: "Marcus Williams",
        date: "December 28, 2025",
        readTime: "7 min read",
        category: "Insights",
        slug: "psychology-money-friends",
    },
    {
        title: "Introducing Premium: Advanced Features for Power Users",
        excerpt: "We're launching PayaGo Premium with multi-currency support, advanced analytics, and priority support.",
        author: "Product Team",
        date: "December 20, 2025",
        readTime: "4 min read",
        category: "Product",
        slug: "introducing-premium",
    },
    {
        title: "Security at PayaGo: How We Protect Your Money",
        excerpt: "Bank-grade encryption, PCI compliance, and more. Here's everything we do to keep your finances safe.",
        author: "Elena Rodriguez",
        date: "December 15, 2025",
        readTime: "6 min read",
        category: "Security",
        slug: "security-at-payago",
    },
    {
        title: "From Spreadsheets to Seamless: A Better Way to Split Bills",
        excerpt: "The evolution of bill splitting and why manual tracking is finally becoming obsolete.",
        author: "Sarah Chen",
        date: "December 10, 2025",
        readTime: "5 min read",
        category: "Insights",
        slug: "spreadsheets-to-seamless",
    },
]

const categories = ["All", "Company", "Tips", "Technology", "Insights", "Product", "Security"]

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-[#04060A]">
            {/* Header */}
            <header className="border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/payago-logo.jpg" alt="PayaGo" className="w-10 h-10 object-cover rounded-xl" />
                        <span className="text-white font-semibold">PayaGo</span>
                    </Link>
                    <Link href="/" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C9A962]/10 rounded-full blur-[200px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                        PayaGo
                        <span className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] bg-clip-text text-transparent ml-3">
                            Blog
                        </span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Insights, tips, and stories about shared expenses and the future of group finance.
                    </p>
                </div>
            </section>

            {/* Categories */}
            <section className="border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${index === 0
                                        ? 'bg-[#C9A962] text-[#1E3A5F]'
                                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-[#C9A962]/10 to-transparent border border-[#C9A962]/20">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A962]/20 text-[#C9A962] text-sm font-medium mb-6">
                                Featured
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                                {featuredPost.title}
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed mb-6">
                                {featuredPost.excerpt}
                            </p>

                            <div className="flex items-center gap-6 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A962] to-[#00D4FF] flex items-center justify-center text-sm font-bold text-white">
                                        JV
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">{featuredPost.author}</div>
                                        <div className="text-white/40 text-sm">{featuredPost.role}</div>
                                    </div>
                                </div>
                                <div className="text-white/40 text-sm flex items-center gap-4">
                                    <span>{featuredPost.date}</span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {featuredPost.readTime}
                                    </span>
                                </div>
                            </div>

                            <Link
                                href={`/blog/${featuredPost.slug}`}
                                className="inline-flex items-center gap-2 text-[#C9A962] font-medium hover:gap-3 transition-all"
                            >
                                Read Article
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="relative aspect-video lg:aspect-square rounded-2xl bg-gradient-to-br from-[#1E3A5F] to-[#0B1220] border border-white/10 flex items-center justify-center overflow-hidden">
                            <img src="/payago-logo.jpg" alt="Featured" className="w-32 h-32 object-cover rounded-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-white mb-8">Recent Articles</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <article
                                key={index}
                                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-xs font-medium">
                                        {post.category}
                                    </span>
                                    <span className="text-white/30 text-xs flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {post.readTime}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#C9A962] transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-white/50 text-sm leading-relaxed mb-6">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-white/30" />
                                        <span className="text-white/40 text-sm">{post.author}</span>
                                    </div>
                                    <span className="text-white/30 text-sm">{post.date}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Subscribe to our newsletter</h2>
                    <p className="text-white/60 mb-8">Get the latest articles and product updates delivered to your inbox.</p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#C9A962]/50"
                        />
                        <button className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1E3A5F] px-6 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center text-white/30 text-sm">
                    © 2026 PAYAGO LTD. All rights reserved.
                </div>
            </footer>
        </main>
    )
}
