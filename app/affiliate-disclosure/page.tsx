import type { Metadata } from "next"
import Link from "next/link"
import { PayagoWordmark } from "@/components/payago-wordmark"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
    title: "Affiliate Disclosure — PayaGo",
    description: "PayaGo may participate in partner or affiliate arrangements with travel booking providers.",
    alternates: {
        canonical: "https://payago.in/affiliate-disclosure",
    },
    openGraph: {
        title: "Affiliate Disclosure — PayaGo",
        description: "How PayaGo discloses partner and affiliate arrangements during early access.",
        url: "https://payago.in/affiliate-disclosure",
        siteName: "PayaGo",
        type: "article",
        images: ["https://payago.in/og/affiliate-disclosure.jpg"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Affiliate Disclosure — PayaGo",
        description: "How PayaGo discloses partner and affiliate arrangements during early access.",
        images: ["https://payago.in/og/affiliate-disclosure.jpg"],
    },
}

export default function AffiliateDisclosure() {
    return (
        <main className="min-h-screen bg-white">
            <header className="border-b border-slate-100 sticky top-0 z-50 bg-white/95">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <PayagoWordmark />
                        
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
                            PayaGo may participate in partner or affiliate arrangements with travel booking providers. If you choose to continue to a provider-led booking flow, provider prices, fees, taxes, and terms should be reviewed before checkout. These arrangements may help support the early-access programme.
                        </p>
                    </div>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. What is affiliate marketing?</h2>
                        <p>
                            Affiliate marketing is a standard industry practice where a website or app may receive compensation when a user continues to a partner link or flow. PayaGo may participate in partner or affiliate arrangements with travel providers covering hotels, flights, and activities. Any active partner relationships will be disclosed as the product launches.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Does this affect the price you pay?</h2>
                        <p>
                            Partner prices and fees are set and displayed by the booking partner before you confirm with that provider. Any compensation PayaGo may receive would come from a partner arrangement, not from a hidden fee we add at checkout.
                        </p>
                        <p className="mt-4">
                            Joining PayaGo during early access is free. If paid plans or traveller fees are introduced later, they will be disclosed clearly before you pay.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Does partner compensation affect recommendations?</h2>
                        <p>
                            Our AI itinerary generation and recommendations are optimised for quality and relevance to your specific trip — not to maximise partner compensation. We apply quality filters such as clear location, transparent partner terms, sensible routing, and provider quality signals where available.
                        </p>
                        <p className="mt-4">
                            Where booking options are shown, fulfilling partner information should be labelled at the point of display.
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
