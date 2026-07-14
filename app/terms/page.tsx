import type { Metadata } from "next"
import Link from "next/link"
import { PayagoWordmark } from "@/components/payago-wordmark"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
    title: "Terms of Service — PayaGo",
    description: "PayaGo terms of service. Your rights and obligations when using the PayaGo AI travel planning platform. Governed by English law.",
    alternates: {
        canonical: "https://payago.in/terms",
    },
    openGraph: {
        title: "Terms of Service — PayaGo",
        description: "PayaGo terms of service for the website and early-access product.",
        url: "https://payago.in/terms",
        siteName: "PayaGo",
        type: "article",
        images: ["https://payago.in/og/terms.jpg"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Terms of Service — PayaGo",
        description: "PayaGo terms of service for the website and early-access product.",
        images: ["https://payago.in/og/terms.jpg"],
    },
}

export default function TermsOfService() {
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
                    Terms of Service
                </h1>
                <p className="text-slate-500 text-sm mb-2">Last updated: March 2026</p>
                <p className="text-slate-500 text-sm mb-12">PayaGo Ltd · Registered in England & Wales</p>

                <div className="p-6 rounded-2xl bg-[#7C5CFF]/8 border border-[#7C5CFF]/20 mb-12">
                    <p className="text-slate-900 font-semibold mb-2">Please read these terms carefully</p>
                    <p className="text-slate-600 text-base leading-relaxed">
                        By joining our waitlist, accessing our website, or using the PayaGo app, you agree to these Terms of Service. If you do not agree, please do not use our services. These terms are governed by English law.
                    </p>
                </div>

                {/* Table of contents */}
                <nav className="mb-12 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Contents</p>
                    <ol className="space-y-2 text-sm text-slate-500">
                        {[
                            ["#about", "1. About PayaGo"],
                            ["#eligibility", "2. Eligibility"],
                            ["#service", "3. The Service"],
                            ["#waitlist", "4. Waitlist & Pre-Launch"],
                            ["#account", "5. Your Account"],
                            ["#ai-content", "6. AI-Generated Content"],
                            ["#bookings", "7. Bookings & Checkout"],
                            ["#conduct", "8. Acceptable Use"],
                            ["#ip", "9. Intellectual Property"],
                            ["#liability", "10. Limitation of Liability"],
                            ["#termination", "11. Termination"],
                            ["#changes", "12. Changes to These Terms"],
                            ["#governing-law", "13. Governing Law"],
                            ["#contact", "14. Contact"],
                        ].map(([href, label]) => (
                            <li key={href}>
                                <a href={href} className="hover:text-[#7C5CFF] transition-colors">{label}</a>
                            </li>
                        ))}
                    </ol>
                </nav>

                <div className="space-y-14 text-slate-600 leading-relaxed text-base">

                    <section id="about" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">1. About PayaGo</h2>
                        <p>PayaGo Ltd (&ldquo;PayaGo&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is a company registered in England and Wales. We operate the PayaGo website at payago.in and the PayaGo early-access product — an AI-powered group travel planning experience that generates itinerary suggestions, supports group coordination, provides split-cost visibility, and supports provider-led booking handoff where available.</p>
                    </section>

                    <section id="eligibility" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">2. Eligibility</h2>
                        <p className="mb-4">To use PayaGo, you must:</p>
                        <ul className="space-y-2">
                            {[
                                "Be at least 16 years old (or the minimum age in your jurisdiction for digital services)",
                                "Have the legal capacity to enter into a binding agreement",
                                "Not be prohibited from receiving our services under applicable law",
                                "Provide accurate information when creating an account or joining the waitlist",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFF]/60 flex-shrink-0 mt-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="service" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">3. The Service</h2>
                        <p className="mb-4">PayaGo provides an AI-powered platform that:</p>
                        <ul className="space-y-2 mb-6">
                            {[
                                "Generates itinerary suggestions from natural language descriptions using AI providers",
                                "Facilitates group voting and coordination for trip decisions",
                                "Provides split-cost visibility so group members can understand their individual share",
                                "Supports provider-led booking handoff for hotel, flight, and activity options where available",
                                "Provides pre-trip and in-trip travel assistance",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFF]/60 flex-shrink-0 mt-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p>PayaGo acts as a technology intermediary. We are not a travel agent, tour operator, airline, hotel, or financial institution. The actual travel services and checkout flows are provided by third-party travel providers, and those providers&apos; own terms and conditions apply to any booking you complete with them.</p>
                    </section>

                    <section id="waitlist" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">4. Waitlist & Pre-Launch</h2>
                        <p className="mb-4">PayaGo is currently in pre-launch. By joining the waitlist:</p>
                        <ul className="space-y-2 mb-6">
                            {[
                                "You provide your email address to receive early access invitations and product updates",
                                "You are not guaranteed early access or any specific launch timing",
                                "You can unsubscribe from waitlist communications at any time using the link in any email we send",
                                "Joining the waitlist does not create a contractual obligation on either party",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFF]/60 flex-shrink-0 mt-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p>The features, pricing, and launch dates described on our website are subject to change. References to &ldquo;early access phase&rdquo; and other dates are estimates and not contractual commitments.</p>
                    </section>

                    <section id="account" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">5. Your Account</h2>
                        <p className="mb-4">When the app launches, you will create an account. You are responsible for:</p>
                        <ul className="space-y-2 mb-4">
                            {[
                                "Keeping your login credentials secure and confidential",
                                "All activity that occurs under your account",
                                "Notifying us immediately if you suspect unauthorised access at support@payago.in",
                                "Ensuring the information in your account is accurate and up to date",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFF]/60 flex-shrink-0 mt-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p>You may not create accounts for others without their consent or create multiple accounts to circumvent any restrictions we impose.</p>
                    </section>

                    <section id="ai-content" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">6. AI-Generated Content</h2>
                        <p className="mb-4">PayaGo uses AI to generate travel itineraries and suggestions. You acknowledge that:</p>
                        <ul className="space-y-2 mb-6">
                            {[
                                "AI-generated itineraries are suggestions, not professional travel advice",
                                "Prices and availability shown in planning flows may change between itinerary generation and booking handoff — always verify final prices before confirming",
                                "Availability of hotels, flights, and activities cannot be guaranteed until booking is confirmed through the relevant partner or provider",
                                "AI recommendations may not reflect your personal circumstances — always exercise your own judgement before committing to a trip",
                                "PayaGo is not liable for decisions made based on AI-generated content",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFF]/60 flex-shrink-0 mt-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p>We continuously work to improve accuracy, but AI systems can make errors. We recommend reviewing any itinerary before sharing it with your group or continuing to provider-led checkout.</p>
                    </section>

                    <section id="bookings" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">7. Bookings & Checkout</h2>

                        <h3 className="text-slate-900 font-semibold mb-3 mt-6">7.1 How bookings work</h3>
                        <p className="mb-4">When your group is ready to confirm a trip, PayaGo helps show each member&apos;s estimated share and hands off booking steps to supported travel providers where available. Bookings are not confirmed until the relevant provider checkout or confirmation flow is completed. Confirmation details are provided by the relevant provider for completed bookings.</p>

                        <h3 className="text-slate-900 font-semibold mb-3 mt-6">7.2 Provider-led checkout</h3>
                        <p className="mb-4">When you continue to a supported provider-led checkout flow, the relevant payment processor or booking partner controls the final amount, payment method, and confirmation. Partner taxes, partner charges, platform charges, currency charges, and other costs, where applicable, should be reviewed before you confirm with that provider.</p>

                        <h3 className="text-slate-900 font-semibold mb-3 mt-6">7.3 Cancellations and refunds</h3>
                        <p className="mb-4">Cancellation and refund rights are governed by the terms of each booking partner (hotel, airline, activity provider). Typical policies vary by provider and fare type. Where supported, PayaGo can help route cancellation requests to the relevant partner, but refund eligibility, timing, and payment method handling are controlled by the booking partner or payment processor.</p>

                        <h3 className="text-slate-900 font-semibold mb-3 mt-6">7.4 Failed or partial checkout</h3>
                        <p>If a group member does not complete a provider-led checkout step within the relevant deadline, their spot may be released and the booking may not proceed. PayaGo is not liable for trip cancellations arising from group members failing to complete provider checkout.</p>
                    </section>

                    <section id="conduct" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">8. Acceptable Use</h2>
                        <p className="mb-4">You agree not to:</p>
                        <ul className="space-y-2">
                            {[
                                "Use PayaGo for any unlawful purpose or in violation of these terms",
                                "Submit false, misleading, or fraudulent trip or payment information",
                                "Attempt to reverse-engineer, scrape, or systematically extract data from our platform",
                                "Interfere with or disrupt the security or integrity of our systems",
                                "Use PayaGo to send unsolicited communications to other users",
                                "Impersonate any person or entity",
                                "Create accounts for others without their explicit consent",
                                "Resell or commercialise access to the PayaGo platform without our written permission",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]/60 flex-shrink-0 mt-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="ip" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">9. Intellectual Property</h2>
                        <p className="mb-4">PayaGo Ltd owns all intellectual property rights in the PayaGo platform, including software, design, brand, and content we create. Nothing in these terms grants you any rights to our intellectual property except the limited right to use the service as described.</p>
                        <p>You retain ownership of any content you provide (trip descriptions, preferences, feedback). By submitting content, you grant PayaGo a non-exclusive, royalty-free licence to use it to provide and improve the service.</p>
                    </section>

                    <section id="liability" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">10. Limitation of Liability</h2>
                        <p className="mb-4">To the maximum extent permitted by law:</p>
                        <ul className="space-y-2 mb-6">
                            {[
                                "PayaGo is provided 'as is' without warranty of any kind",
                                "We are not liable for the actions, services, or failures of third-party travel providers",
                                "We are not liable for indirect, incidental, or consequential losses arising from your use of the service",
                                "Our total liability to you for any claim shall not exceed the total amount you paid to PayaGo in the 12 months preceding the claim",
                                "We are not liable for losses caused by events outside our reasonable control (including technical failures of third-party APIs, airline cancellations, or natural events)",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0 mt-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p>Nothing in these terms excludes liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded by law.</p>
                    </section>

                    <section id="termination" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">11. Termination</h2>
                        <p className="mb-4">You may close your account at any time by contacting support@payago.in. We may suspend or terminate your account if you breach these terms, engage in fraudulent activity, or if we are required to do so by law. Where reasonably possible, we will give you notice before termination.</p>
                        <p>On account closure, we will delete your personal data in accordance with our Privacy Policy. Any active bookings at the time of termination remain subject to the relevant booking partner&apos;s terms.</p>
                    </section>

                    <section id="changes" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">12. Changes to These Terms</h2>
                        <p>We may update these terms as our product evolves. We will notify you of material changes by email at least 14 days before they take effect. Continued use of the service after that date constitutes acceptance of the updated terms. If you do not agree to the changes, you may close your account before they take effect.</p>
                    </section>

                    <section id="governing-law" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">13. Governing Law</h2>
                        <p>These terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these terms or your use of PayaGo shall be subject to the exclusive jurisdiction of the courts of England and Wales, except where applicable consumer protection law in your country of residence provides otherwise.</p>
                    </section>

                    <section id="contact" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-5">14. Contact</h2>
                        <p>For questions about these terms, contact us at <a href="mailto:support@payago.in" className="text-[#7C5CFF] hover:underline">support@payago.in</a>. For legal notices, please use our <Link href="/contact" className="text-[#7C5CFF] hover:underline">contact page</Link>.</p>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                    <Link href="/privacy" className="text-slate-500 hover:text-slate-900 transition-colors text-sm">
                        Privacy Policy →
                    </Link>
                    <Link href="/affiliate-disclosure" className="text-slate-500 hover:text-slate-900 transition-colors text-sm">
                        Affiliate Disclosure →
                    </Link>
                    <a href="mailto:support@payago.in" className="text-[#7C5CFF] hover:underline text-sm">
                        support@payago.in
                    </a>
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
