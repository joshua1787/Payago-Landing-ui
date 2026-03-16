import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
    title: "Affiliate Disclosure — PayaGo",
    description: "PayaGo earns a commission from travel booking partners when you book through our app. You always pay the same price as booking direct.",
    alternates: {
        canonical: "https://www.payago.in/affiliate-disclosure",
    },
}

export default function AffiliateDisclosure() {
    return (
        <main className="min-h-screen bg-white">
            <header className="border-b border-slate-100 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/payago-logo-transparent-v2.png" alt="PayaGo" className="w-9 h-9 object-contain" />
                        <span className="text-slate-900 font-semibold text-lg">PayaGo</span>
                    </Link>
                    <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-slate-900">
                    Affiliate Disclosure
                </h1>
                <p className="text-slate-500 text-sm mb-12">Last updated: March 2026</p>

                <div className="space-y-8 text-slate-600 leading-relaxed text-lg">

                    <div className="p-6 rounded-2xl bg-[#C9A962]/8 border border-[#C9A962]/20">
                        <p className="text-slate-900 font-semibold mb-2">The short version</p>
                        <p className="text-slate-600 text-base">
                            PayaGo earns a commission from travel booking partners when you complete a booking through our app. You always pay the same price you would pay booking directly — we never mark up prices or add service fees. This commission is how PayaGo remains free for travellers.
                        </p>
                    </div>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. What is affiliate marketing?</h2>
                        <p>
                            Affiliate marketing is a standard industry practice where a website or app earns a referral commission when a user completes a purchase through a partner link. PayaGo participates in affiliate programs with travel booking partners covering hotels, flights, and activities. A full list of active partners will be published here at launch.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Does this affect the price you pay?</h2>
                        <p>
                            No. The affiliate commission PayaGo receives is paid by the booking partner from their own margin — it is not added on top of the price you pay. You pay the same amount you would pay booking directly.
                        </p>
                        <p className="mt-4">
                            PayaGo does not charge travellers any service fees, booking fees, or platform fees. Our product is entirely free for travellers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Does commission affect recommendations?</h2>
                        <p>
                            Our AI itinerary generation and recommendations are optimised for quality and relevance to your specific trip — not to maximise commission. We apply quality filters (minimum 4-star hotels, activities rated 4.5+ stars, flights without excessive connections) regardless of commission rates.
                        </p>
                        <p className="mt-4">
                            All booking search results and recommendations will be labelled with the fulfilling partner at the point of display in the app.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. UK & EU legal compliance</h2>
                        <p>
                            PayaGo Ltd is registered in England & Wales. We comply with the UK ASA (Advertising Standards Authority) guidelines on affiliate disclosure, the EU Unfair Commercial Practices Directive, and the FTC guidelines where applicable.
                        </p>
                        <p className="mt-4">
                            This disclosure is provided in accordance with the UK&apos;s Consumer Protection from Unfair Trading Regulations 2008 and the CAP Code.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Contact</h2>
                        <p>
                            For questions about our affiliate relationships, commercial partnerships, or this disclosure, contact us at{" "}
                            <a href="mailto:partnerships@payago.in" className="text-[#C9A962] hover:underline">partnerships@payago.in</a>{" "}
                            or via our <Link href="/contact" className="text-[#C9A962] hover:underline">contact page</Link>.
                        </p>
                    </section>
                </div>
            </div>

            <footer className="py-8 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
                    © 2026 PayaGo Ltd. Company No. 16971574. Registered in England & Wales.
                </div>
            </footer>
        </main>
    )
}
