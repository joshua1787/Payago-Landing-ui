import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar } from "lucide-react"

export const metadata: Metadata = {
    title: "How to Split Travel Costs in a Group (Without the Drama)",
    description: "The fairest ways to split group travel costs in 2026 — from flights and hotels to activities and dinners. Why equal splits cause fights, and how PayaGo handles it automatically.",
    openGraph: {
        title: "How to Split Travel Costs in a Group (Without the Drama) | PayaGo Blog",
        description: "The fairest ways to split group travel costs — and why equal splits cause more arguments than you'd expect.",
        url: "https://www.payago.in/blog/how-to-split-travel-costs",
        type: "article",
    },
    alternates: { canonical: "https://www.payago.in/blog/how-to-split-travel-costs" },
}

const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Split Travel Costs in a Group (Without the Drama)",
    datePublished: "2026-03-05",
    author: { "@type": "Organization", name: "PayaGo" },
    publisher: { "@type": "Organization", name: "PayaGo", logo: { "@type": "ImageObject", url: "https://www.payago.in/payago_logo_transparent.png" } },
    url: "https://www.payago.in/blog/how-to-split-travel-costs",
}

export default function BlogPost() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <header className="border-b border-slate-100 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="overflow-hidden inline-flex" style={{display:"inline-flex",width:"144px",height:"32px"}}><img src="/payago-logo-new.png" alt="PayaGo" style={{width:"380px",maxWidth:"none",marginTop:"-103px",marginLeft:"-114px"}} /></span>
                        
                    </Link>
                    <Link href="/blog" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                </div>
            </header>
            <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
                <div className="mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full text-[#4AD7A2] bg-[#4AD7A2]/10 border border-[#4AD7A2]/30">Group Travel Tips</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-8">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /><time dateTime="2026-03-05">March 5, 2026</time></span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />6 min read</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-10 leading-tight text-slate-900">
                    How to Split Travel Costs in a Group (Without the Drama)
                </h1>
                <div className="rounded-2xl overflow-hidden mb-12 aspect-video bg-slate-100 border border-slate-100">
                    <img src="/images/travel-friends.png" alt="Group of friends travelling together" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-8 text-white/75 leading-relaxed text-lg">
                    <p>
                        Money is the number one cause of group travel conflict. Not the accommodation, not the flight times, not even the itinerary disagreements. It&apos;s the money. Specifically: who paid what, who owes what, and the slow build of resentment when one person consistently picks up tabs and never quite gets fully paid back.
                    </p>
                    <p>
                        Here&apos;s a guide to how group travel costs actually break down, which splitting methods work, and why the traditional &ldquo;one person pays then everyone Venmos them&rdquo; approach creates more problems than it solves.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The cost categories and where fights happen</h2>
                    <p>Group travel costs fall into three categories with very different splitting dynamics:</p>
                    <div className="grid md:grid-cols-3 gap-4 my-6">
                        {[
                            { cat: "Fixed shared costs", examples: "Flights, hotel, hired transfers, group tour bookings", issue: "Easy to split equally — but only if everyone agrees on the options before booking." },
                            { cat: "Variable shared costs", examples: "Group dinners, shared taxis, group activities", issue: "These feel equal but often aren't. The person who orders water pays the same as the person who had three cocktails." },
                            { cat: "Individual costs", examples: "Personal activities, solo meals, personal shopping", issue: "Should never be pooled. These are the hidden source of most conflicts — the person who didn't go to the museum shouldn't pay for it." },
                        ].map((item) => (
                            <div key={item.cat} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="text-slate-900 font-semibold text-sm mb-2">{item.cat}</div>
                                <div className="text-slate-500 text-xs mb-2">{item.examples}</div>
                                <div className="text-[#FF6B6B] text-xs leading-relaxed">{item.issue}</div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The 4 methods — ranked by fairness</h2>
                    <div className="space-y-4">
                        {[
                            { rank: "Best", method: "Everyone pays their own share directly", detail: "PayaGo's approach. Each person is charged exactly their share at booking — no fronting costs, no chasing. This eliminates the core dynamic that causes resentment.", color: "#4AD7A2" },
                            { rank: "Good", method: "Splitwise / Tricount app tracking", detail: "Works well for trips where costs are genuinely variable. Track everything, settle at the end. Main downside: someone still has to front the costs.", color: "#C9A962" },
                            { rank: "OK", method: "Rotating payments", detail: "Each person pays for one dinner, one activity etc. Works in practice if the amounts are similar, but breaks down with big-ticket items like boat charters.", color: "#7C5CFF" },
                            { rank: "Avoid", method: "One person pays everything, gets paid back", detail: "This is how most groups default — and it's the worst option. The payer takes on financial risk, the stress of chasing people, and often loses money when someone inevitably shorts them.", color: "#FF6B6B" },
                        ].map((item) => (
                            <div key={item.rank} className="flex gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
                                <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 h-fit" style={{ color: item.color, background: item.color + "20" }}>{item.rank}</span>
                                <div>
                                    <div className="text-slate-900 font-semibold text-sm mb-1">{item.method}</div>
                                    <div className="text-slate-500 text-sm leading-relaxed">{item.detail}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The conversation to have before the trip</h2>
                    <p>Most group travel money conflicts are preventable with one honest conversation before anyone books anything. The four questions to agree on:</p>
                    <div className="space-y-3 my-6">
                        {[
                            "What's the actual budget? (Be specific: £400 per person total, not 'medium budget')",
                            "Who's paying what upfront, and what&apos;s the repayment timeline? (Within 48 hours, not 'whenever')",
                            "Are we splitting everything equally or by what each person did/ordered?",
                            "What happens if someone needs to drop out after booking?",
                        ].map((q, i) => (
                            <div key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                                <span className="w-5 h-5 rounded-full bg-[#C9A962]/20 flex items-center justify-center flex-shrink-0 text-[#C9A962] text-xs font-bold mt-0.5">{i + 1}</span>
                                {q}
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">How PayaGo handles this automatically</h2>
                    <p>
                        PayaGo is built around the direct payment model — the approach that generates the least conflict. When your group confirms a trip, each person receives a payment request for exactly their share (for example, £780 each, not £3,120 from one person). Everyone pays directly in the app. Once all payments clear, everything books simultaneously.
                    </p>
                    <p>
                        Nobody fronts the money. Nobody chases anyone. Nobody loses £200 because someone claims they &ldquo;already transferred&rdquo; when they didn&apos;t.
                    </p>

                    <div className="mt-12 p-6 rounded-2xl bg-[#C9A962]/8 border border-[#C9A962]/20">
                        <p className="text-slate-900 font-semibold mb-2">Plan your next group trip — payments sorted automatically.</p>
                        <p className="text-slate-600 text-sm mb-4">AI builds the itinerary, your group votes, everyone pays their share. Launching April 2026.</p>
                        <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1a1a0e] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm">
                            Get Early Access — Free
                        </Link>
                    </div>
                </div>
            </div>
            <footer className="py-8 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">© 2026 PayaGo Ltd. Registered in England & Wales.</div>
            </footer>
        </main>
    )
}
