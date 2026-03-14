import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
    title: "Privacy Policy — PayaGo",
    description: "How PayaGo collects, uses, and protects your personal data. GDPR and UK GDPR compliant. Last updated March 2026.",
    alternates: {
        canonical: "https://www.payago.in/privacy",
    },
}

const sections = [
    {
        id: "who-we-are",
        title: "1. Who we are",
        content: [
            "PayaGo Ltd is a company registered in England and Wales (Company No. TBC). Our registered address is available on request. We operate the PayaGo website at payago.in and the PayaGo mobile application (launching April 2026).",
            "PayaGo Ltd is the data controller for personal data collected through our website and app. If you have questions about how we handle your data, contact us at privacy@payago.in.",
        ],
    },
    {
        id: "data-we-collect",
        title: "2. What data we collect",
        subsections: [
            {
                heading: "2.1 Waitlist registration",
                items: [
                    "Email address — to send you early access invitations and product updates",
                    "Name (optional) — if you provide it during sign-up",
                    "Country/region (optional) — to prioritise launch rollout",
                ],
            },
            {
                heading: "2.2 When you use the app (post-launch)",
                items: [
                    "Account information: name, email address, profile photo (optional)",
                    "Trip data: destinations, dates, group size, budget preferences, itineraries you create",
                    "Payment information: processed securely by our payment provider — we never store card details",
                    "Voice input: if you use voice trip creation, audio is processed in real time and not stored after transcription",
                    "Usage data: features used, screens visited, error logs — to improve the product",
                    "Device information: device type, OS version, app version — for compatibility and support",
                ],
            },
            {
                heading: "2.3 Cookies and analytics",
                items: [
                    "We use essential cookies to make the website function",
                    "We use analytics cookies (Google Analytics 4) to understand how visitors use our site — you can opt out via our cookie banner",
                    "We do not use advertising or tracking cookies",
                ],
            },
        ],
    },
    {
        id: "how-we-use",
        title: "3. How we use your data",
        rows: [
            { purpose: "Send waitlist updates and early access invitations", basis: "Legitimate interest / Consent" },
            { purpose: "Provide the PayaGo travel planning service", basis: "Contract performance" },
            { purpose: "Process group payments through our payment provider", basis: "Contract performance" },
            { purpose: "Improve our AI models and product features", basis: "Legitimate interest" },
            { purpose: "Send product updates and feature announcements", basis: "Consent (you can unsubscribe any time)" },
            { purpose: "Comply with legal obligations (tax, fraud prevention)", basis: "Legal obligation" },
            { purpose: "Resolve disputes and enforce our terms", basis: "Legitimate interest" },
        ],
    },
    {
        id: "ai-processing",
        title: "4. AI processing",
        content: [
            "PayaGo uses Google Gemini AI and Anthropic Claude AI to generate trip itineraries, process natural language input, and provide travel assistance. When you describe a trip, your input (destination, budget, preferences, group size) is sent to these AI providers to generate results.",
            "Google Gemini processes your requests under Google's API terms of service and privacy policy. Anthropic Claude processes your requests under Anthropic's API terms and privacy policy. Neither provider uses your individual inputs to train their models under our enterprise API agreements.",
            "Voice inputs are transcribed to text in real time and only the text transcript is sent to AI providers — audio is not retained or transmitted.",
            "We recommend you do not include sensitive personal information (passport numbers, financial account details) in trip descriptions.",
        ],
    },
    {
        id: "sharing",
        title: "5. Who we share data with",
        content: [
            "We do not sell your personal data to third parties. We share data only where necessary to provide the service:",
        ],
        list: [
            "Travel booking partners (hotels, flights, activities) — to complete bookings you request. Only the information needed to make the booking is shared (names, dates, contact details).",
            "Payment processor — to process group payments securely. We share only what is required for payment processing; card details are handled entirely by the payment provider.",
            "Google (Gemini AI) and Anthropic (Claude AI) — to generate itineraries and process natural language input, as described in Section 4.",
            "Analytics providers (Google Analytics 4) — anonymised usage data to understand product performance.",
            "Cloud infrastructure providers — to host and operate our service, under data processing agreements.",
            "Legal authorities — where required by law, court order, or to protect safety.",
        ],
    },
    {
        id: "retention",
        title: "6. How long we keep your data",
        rows: [
            { type: "Waitlist email address", period: "Until you unsubscribe or request deletion" },
            { type: "Account data", period: "For the duration of your account, plus 3 years after closure" },
            { type: "Trip data", period: "For the duration of your account; deleted on account closure unless you export it" },
            { type: "Payment records", period: "7 years (UK legal requirement for financial records)" },
            { type: "Analytics data", period: "26 months (Google Analytics default)" },
            { type: "Support communications", period: "3 years from the last communication" },
        ],
    },
    {
        id: "your-rights",
        title: "7. Your rights",
        content: [
            "Under UK GDPR and EU GDPR, you have the following rights regarding your personal data:",
        ],
        list: [
            "Access — request a copy of the personal data we hold about you",
            "Rectification — ask us to correct inaccurate or incomplete data",
            "Erasure — ask us to delete your data ('right to be forgotten'), subject to legal retention requirements",
            "Restriction — ask us to limit processing of your data in certain circumstances",
            "Portability — receive your data in a structured, machine-readable format",
            "Object — object to processing based on legitimate interest",
            "Withdraw consent — where processing is based on consent, you can withdraw it at any time",
        ],
        footer: "To exercise any of these rights, email privacy@payago.in. We will respond within 30 days. You also have the right to lodge a complaint with the UK Information Commissioner's Office (ICO) at ico.org.uk.",
    },
    {
        id: "security",
        title: "8. Security",
        content: [
            "We apply industry-standard security measures including TLS encryption in transit, encryption at rest for sensitive data, access controls limiting who within PayaGo can access personal data, and regular security reviews.",
            "No system is 100% secure. In the event of a data breach that poses a risk to your rights and freedoms, we will notify the ICO within 72 hours and affected users as required by law.",
        ],
    },
    {
        id: "transfers",
        title: "9. International data transfers",
        content: [
            "Some of our service providers (Google, Anthropic) process data in the United States. Where data is transferred outside the UK/EEA, we ensure appropriate safeguards are in place — including standard contractual clauses approved by the UK ICO or the EU Commission.",
        ],
    },
    {
        id: "children",
        title: "10. Children",
        content: [
            "PayaGo is not intended for users under 16 years of age. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, contact privacy@payago.in and we will delete it promptly.",
        ],
    },
    {
        id: "changes",
        title: "11. Changes to this policy",
        content: [
            "We may update this policy as our product evolves. We will notify waitlist members and app users of material changes by email at least 14 days before they take effect. The 'last updated' date at the top of this page reflects the most recent version.",
        ],
    },
    {
        id: "contact",
        title: "12. Contact us",
        content: [
            "For any privacy questions, data requests, or concerns, contact our team at privacy@payago.in. For partnership-related data questions, contact partnerships@payago.in.",
        ],
    },
]

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-[#04060A]">
            <header className="border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl bg-[#04060A]/80">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/payago-logo.jpg" alt="PayaGo" className="w-9 h-9 object-cover rounded-xl" />
                        <span className="text-white font-semibold text-lg">PayaGo</span>
                    </Link>
                    <Link href="/" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white">
                    Privacy Policy
                </h1>
                <p className="text-white/40 text-sm mb-2">Last updated: March 2026</p>
                <p className="text-white/40 text-sm mb-12">PayaGo Ltd · Registered in England & Wales</p>

                <div className="p-6 rounded-2xl bg-[#C9A962]/8 border border-[#C9A962]/20 mb-12">
                    <p className="text-white font-semibold mb-2">The short version</p>
                    <p className="text-white/70 text-base leading-relaxed">
                        We collect your email to send you early access updates. When the app launches, we collect only what we need to provide the service. We use Gemini AI and Claude AI to generate itineraries — your inputs are processed in real time and not used to train AI models. We never sell your data. You can request deletion at any time by emailing privacy@payago.in.
                    </p>
                </div>

                {/* Table of contents */}
                <nav className="mb-12 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-4">Contents</p>
                    <ol className="space-y-2">
                        {sections.map((s) => (
                            <li key={s.id}>
                                <a href={`#${s.id}`} className="text-white/50 hover:text-[#C9A962] transition-colors text-sm">
                                    {s.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>

                <div className="space-y-14 text-white/70 leading-relaxed">
                    {sections.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-white mb-5">{section.title}</h2>

                            {section.content && section.content.map((p, i) => (
                                <p key={i} className="mb-4 text-base leading-relaxed">{p}</p>
                            ))}

                            {section.subsections && section.subsections.map((sub, i) => (
                                <div key={i} className="mb-6">
                                    <h3 className="text-white font-semibold mb-3">{sub.heading}</h3>
                                    <ul className="space-y-2">
                                        {sub.items.map((item, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A962]/60 flex-shrink-0 mt-2" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            {section.rows && (
                                <div className="overflow-hidden rounded-xl border border-white/5">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                                <th className="text-left px-4 py-3 text-white/40 font-medium">
                                                    {section.id === "how-we-use" ? "Purpose" : "Data type"}
                                                </th>
                                                <th className="text-left px-4 py-3 text-white/40 font-medium">
                                                    {section.id === "how-we-use" ? "Legal basis" : "Retention period"}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {section.rows.map((row, i) => (
                                                <tr key={i} className="border-b border-white/5 last:border-0">
                                                    <td className="px-4 py-3 text-white/70">
                                                        {section.id === "how-we-use" ? (row as { purpose: string; basis: string }).purpose : (row as { type: string; period: string }).type}
                                                    </td>
                                                    <td className="px-4 py-3 text-white/40">
                                                        {section.id === "how-we-use" ? (row as { purpose: string; basis: string }).basis : (row as { type: string; period: string }).period}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {section.list && (
                                <ul className="space-y-2 mt-4">
                                    {section.list.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A962]/60 flex-shrink-0 mt-2" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {section.footer && (
                                <p className="mt-4 text-sm text-white/50 leading-relaxed">{section.footer}</p>
                            )}
                        </section>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                    <Link href="/terms" className="text-white/40 hover:text-white transition-colors text-sm">
                        Terms of Service →
                    </Link>
                    <Link href="/affiliate-disclosure" className="text-white/40 hover:text-white transition-colors text-sm">
                        Affiliate Disclosure →
                    </Link>
                    <a href="mailto:privacy@payago.in" className="text-[#C9A962] hover:underline text-sm">
                        privacy@payago.in
                    </a>
                </div>
            </div>

            <footer className="py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center text-white/20 text-sm">
                    © 2026 PayaGo Ltd. Registered in England & Wales.
                </div>
            </footer>
        </main>
    )
}
