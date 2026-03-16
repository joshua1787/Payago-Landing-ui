import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar } from "lucide-react"

export const metadata: Metadata = {
    title: "Why We Built PayaGo — The Founding Story",
    description: "A week-long Italy trip with five friends turned into weeks of chaos. That frustration became a product. Here's the full story of why PayaGo exists.",
    openGraph: {
        title: "Why We Built PayaGo — The Founding Story | PayaGo Blog",
        description: "A week-long Italy trip with five friends turned into weeks of chaos. That frustration became a product.",
        url: "https://www.payago.in/blog/why-we-built-payago",
        type: "article",
    },
    alternates: {
        canonical: "https://www.payago.in/blog/why-we-built-payago",
    },
}

const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Why We Built PayaGo",
    description: "A week-long Italy trip with five friends turned into weeks of chaos. That frustration became a product.",
    datePublished: "2026-02-08",
    dateModified: "2026-02-08",
    author: { "@type": "Organization", name: "PayaGo" },
    publisher: {
        "@type": "Organization",
        name: "PayaGo",
        logo: { "@type": "ImageObject", url: "https://www.payago.in/payago_logo_transparent.png" },
    },
    url: "https://www.payago.in/blog/why-we-built-payago",
}

export default function BlogPost() {
    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            <header className="border-b border-slate-100 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/payago_logo_transparent.png" alt="PayaGo" className="h-9 w-auto object-contain" style={{ filter: 'brightness(0)' }} />
                        
                    </Link>
                    <Link href="/blog" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
                <div className="mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full text-[#4AD7A2] bg-[#4AD7A2]/10 border border-[#4AD7A2]/30">
                        Company
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-8">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime="2026-02-08">February 8, 2026</time>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        4 min read
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-10 leading-tight text-slate-900">
                    Why We Built PayaGo
                </h1>

                <div className="rounded-2xl overflow-hidden mb-12 aspect-video bg-slate-100 border border-slate-100">
                    <img
                        src="/luxury-travel-destination-aerial-view-of-tropical-.jpg"
                        alt="Group travel inspiration — what PayaGo makes possible"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="space-y-8 text-white/75 leading-relaxed text-lg">
                    <p>
                        Every product starts with a frustration. For us, it was planning a week-long trip to Lisbon with eight friends.
                    </p>

                    <p>
                        What should have been exciting turned into three weeks of chaos. Someone made a Google Doc. Someone else started a WhatsApp poll. A third person dropped a spreadsheet with hotels sorted by price. Nobody agreed on dates. Two people went quiet for a week. By the time we had a rough plan, half the original hotel options had sold out.
                    </p>

                    <p>
                        We went on the trip. It was brilliant. But the planning nearly killed it before it started.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The problem wasn&apos;t a lack of tools</h2>

                    <p>
                        Google Flights existed for flight comparisons. Hotel sites for accommodation. TripAdvisor for reviews. Notion for organizing everything. WhatsApp for the group chat. The tools existed — the problem was that planning a real trip required jumping between six or seven different platforms, manually copying information across them, and somehow keeping a group of eight people aligned through it all.
                    </p>

                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 my-8">
                        <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">What planning a group trip actually looks like</div>
                        <div className="space-y-3">
                            {[
                                { time: "Week 1", event: "Someone suggests dates. Three people can't make it. New dates proposed." },
                                { time: "Week 2", event: "Google Doc created. Hotels researched. Flights compared across 4 tabs." },
                                { time: "Week 3", event: "Two people go silent. Two people can't agree on the hotel budget." },
                                { time: "Week 4", event: "Compromise reached. Original hotel sold out. Back to square one." },
                                { time: "Week 5", event: "Final plan agreed. One person still hasn't confirmed flights." },
                                { time: "Week 6", event: "Everyone finally booked. Trip is in 3 days." },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 text-sm">
                                    <span className="text-[#C9A962] font-semibold flex-shrink-0 w-14">{item.time}</span>
                                    <span className="text-slate-600">{item.event}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The travel industry had solved booking. Not planning.</h2>

                    <p>
                        Every platform in the travel space had optimised for the transaction: click here to book a hotel, click here to buy a flight. None of them had solved the 15 hours of research, coordination, and decision-making that happens before anyone clicks &ldquo;confirm purchase.&rdquo;
                    </p>

                    <p>
                        That gap — between &ldquo;we should go somewhere&rdquo; and &ldquo;everything is booked&rdquo; — was completely unaddressed. It was assumed to be a human problem, a coordination problem, an inherently messy process.
                    </p>

                    <p>
                        We didn&apos;t think it had to be.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">What we built</h2>

                    <p>
                        PayaGo is one app that handles the entire journey from &ldquo;we should go somewhere&rdquo; to &ldquo;everything is booked.&rdquo;
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 my-8">
                        {[
                            { step: "01", title: "You talk", desc: "Tell the AI your destination, dates, budget, and preferences — by voice or text, in one sentence." },
                            { step: "02", title: "AI builds it", desc: "Three complete trip options — flights, hotels, activities — generated in 30 seconds with live pricing." },
                            { step: "03", title: "Group votes", desc: "Share a link. Everyone votes on their preferred option. No WhatsApp threads." },
                            { step: "04", title: "Everyone pays", desc: "Each person pays their exact share directly in the app. Nobody fronts the full amount." },
                        ].map((item) => (
                            <div key={item.step} className="p-5 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="text-[#C9A962] font-black text-2xl mb-2">{item.step}</div>
                                <div className="text-slate-900 font-semibold mb-1">{item.title}</div>
                                <div className="text-slate-500 text-sm leading-relaxed">{item.desc}</div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Who we&apos;re building for</h2>

                    <p>
                        Extraordinary travel shouldn&apos;t require a travel agent, a free weekend to plan, or one person willing to do all the work while everyone else benefits from it. It should be accessible to anyone who can say &ldquo;I want to go somewhere.&rdquo;
                    </p>

                    <p>
                        PayaGo is free for travellers. We earn a commission from travel booking partners when you book through the app — the same commission those platforms pay to any affiliate. You pay the same price you&apos;d pay booking directly. We make money when you travel well.
                    </p>

                    <p>
                        We&apos;re launching in April 2026. We&apos;re not building another app that lives in a folder you never open — we&apos;re building the one you open when you want to actually go somewhere.
                    </p>

                    <div className="mt-12 p-6 rounded-2xl bg-[#C9A962]/8 border border-[#C9A962]/20">
                        <p className="text-slate-900 font-semibold mb-2">Join the waitlist for early access</p>
                        <p className="text-slate-600 text-sm mb-4">Be among the first to use PayaGo when it launches in April 2026.</p>
                        <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm">
                            Get Early Access — Free
                        </Link>
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
