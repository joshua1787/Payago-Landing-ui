import type { Metadata } from "next"
import Link from "next/link"
import { PayagoWordmark } from "@/components/payago-wordmark"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
    title: "Privacy Policy — PayaGo",
    description: "How PayaGo collects, uses, and protects your personal data, including UK GDPR and EU GDPR rights. Last updated March 2026.",
    alternates: {
        canonical: "https://payago.in/privacy",
    },
    openGraph: {
        title: "Privacy Policy — PayaGo",
        description: "How PayaGo collects, uses, and protects personal data during early access.",
        url: "https://payago.in/privacy",
        siteName: "PayaGo",
        type: "article",
        images: ["https://payago.in/og/privacy.jpg"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Privacy Policy — PayaGo",
        description: "How PayaGo collects, uses, and protects personal data during early access.",
        images: ["https://payago.in/og/privacy.jpg"],
    },
}

const sections = [
    {
        id: "who-we-are",
        title: "1. Who we are",
        content: [
            "PayaGo Ltd is a company registered in England and Wales (Company No. 16971574). Our registered address is available on request. We operate the PayaGo website at payago.in and the PayaGo early-access product.",
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
                    "Checkout information: processed by the relevant provider-led checkout or payment provider where available — we never store card details",
                    "Voice input: if you use voice trip creation, audio is processed during the transcription session and not stored after transcription",
                    "Usage data: features used, screens visited, error logs — to improve the product",
                    "Device information: device type, OS version, app version — for compatibility and support",
                ],
            },
            {
                heading: "2.3 Bank messages and payments you add",
                items: [
                    "A bank message you paste into PayaGo, or send through your private iPhone Shortcut link, is read once to find the payment. We do not keep the message text",
                    "From it we keep the amount, currency, merchant or payee name, date and time, and your available balance if the message shows one",
                    "We also keep what you decide about each payment, and the labels you give merchants so PayaGo can remember them. A payment only counts towards your spending once you confirm it",
                    "PayaGo does not connect to your bank and does not read your SMS messages or email",
                ],
            },
            {
                heading: "2.4 Your own money",
                items: [
                    "Your own spending entries, budget and the bills you add, used for features such as Your month, Can I buy this? and Your year",
                    "We use this to send the reminders and notes you have switched on",
                ],
            },
            {
                heading: "2.5 Family Map",
                items: [
                    "What you choose to write in your Family Map, such as where important things are. Please do not upload or enter passwords or account numbers. Documents are not stored",
                    "The name and email address of the one person you name. We email them to tell them you have named them",
                    "This information is encrypted on our servers. PayaGo holds the encryption key, so this is not end-to-end encryption",
                    "If the person you named asks for access, we email you and a waiting period you set, of 7 to 90 days, begins. You can cancel during that time. If you do not, they can read your map when the wait ends",
                ],
            },
            {
                heading: "2.6 Cookies and analytics",
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
            { purpose: "Support provider-led checkout or payment handoff", basis: "Contract performance" },
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
            "PayaGo uses AI providers to generate trip itineraries, process natural language input, and provide travel assistance. When you describe a trip, your input (destination, budget, preferences, group size) is sent to these AI providers to generate results.",
            "AI service providers used by PayaGo process requests under their applicable API terms and privacy policies. We configure providers to limit retention and training use where those controls are available.",
            "Voice inputs are transcribed to text during the transcription session and only the text transcript is sent to AI providers — audio is not retained or transmitted.",
            "PayaGo also uses AI for money features. If our rules are unsure about a message in a group chat, the message and your group's member names are sent to an AI provider to read it. If you import a history from another app or spreadsheet, the text of that file is sent to read it. For an unfamiliar merchant, only the merchant or payee name from a bank message is sent, never the message itself. To write short notes and insights about your spending, we send summary facts about it, such as categories and amounts, which our own servers work out first.",
            "Amounts owed, totals and budgets are worked out by PayaGo, not by AI. Your Family Map is never sent to AI providers.",
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
            "Travel providers (hotels, flights, activities) — to support booking handoff where you choose to continue with a provider. Only the information needed for that handoff is shared where applicable (names, dates, contact details).",
            "Payment or checkout providers — to support provider-led checkout where available. We share only what is required for the selected checkout flow; card details are handled entirely by the payment provider.",
            "AI providers — to generate itineraries, process natural language input and support money features, as described in Section 4.",
            "The person you name in your Family Map — they receive an email when you name them, and can read your map if they ask for access and you do not cancel during the waiting period.",
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
            { type: "Account data", period: "For the duration of your account. When you delete it, your details are removed, as explained on our delete your account page" },
            { type: "Expenses and messages in shared groups", period: "Kept after you delete your account so other members' balances stay correct, shown as “Deleted User”" },
            { type: "Payments from bank messages, your own spending and merchant labels", period: "For the duration of your account; removed when you delete your account" },
            { type: "Family Map", period: "Until you delete it or remove the person named, or delete your account" },
            { type: "Backups", period: "Copies of our database, including the data above, are kept for up to 30 days" },
            { type: "Trip data", period: "For the duration of your account; deleted on account closure unless you export it" },
            { type: "Payment records", period: "Where payment records exist, retained as required for accounting, tax, and legal obligations" },
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
            "We use practical safeguards appropriate for an early-stage product, including secure transport where our services are configured for it, access controls, and a bias toward collecting only the data needed to operate PayaGo.",
            "No system is 100% secure. In the event of a data breach that poses a risk to your rights and freedoms, we will notify the ICO within 72 hours and affected users as required by law.",
        ],
    },
    {
        id: "transfers",
        title: "9. International data transfers",
        content: [
            "Some of our service providers (including Google, OpenAI and OpenRouter) process data in the United States. Where data is transferred outside the UK/EEA, we ensure appropriate safeguards are in place — including standard contractual clauses approved by the UK ICO or the EU Commission.",
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
                    Privacy Policy
                </h1>
                <p className="text-slate-500 text-sm mb-2">Last updated: November 2026</p>
                <p className="text-slate-500 text-sm mb-12">PayaGo Ltd · Registered in England & Wales</p>

                <div className="p-6 rounded-2xl bg-[#C9A962]/8 border border-[#C9A962]/20 mb-12">
                    <p className="text-slate-900 font-semibold mb-2">The short version</p>
                    <p className="text-slate-600 text-base leading-relaxed">
                        We collect your email to send early access updates. When the app launches, we collect only what we need to provide the service. We use AI providers to generate itinerary suggestions. We do not use your waitlist email to train AI models. Trip prompts may be processed by our AI providers to generate itinerary suggestions, subject to our provider and privacy controls. We never sell your data. You can request deletion at any time by emailing privacy@payago.in.
                    </p>
                </div>

                {/* Table of contents */}
                <nav className="mb-12 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Contents</p>
                    <ol className="space-y-2">
                        {sections.map((s) => (
                            <li key={s.id}>
                                <a href={`#${s.id}`} className="text-slate-500 hover:text-[#C9A962] transition-colors text-sm">
                                    {s.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>

                <div className="space-y-14 text-slate-600 leading-relaxed">
                    {sections.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-slate-900 mb-5">{section.title}</h2>

                            {section.content && section.content.map((p, i) => (
                                <p key={i} className="mb-4 text-base leading-relaxed">{p}</p>
                            ))}

                            {section.subsections && section.subsections.map((sub, i) => (
                                <div key={i} className="mb-6">
                                    <h3 className="text-slate-900 font-semibold mb-3">{sub.heading}</h3>
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
                                <div className="overflow-hidden rounded-xl border border-slate-100">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-100 bg-slate-50">
                                                <th className="text-left px-4 py-3 text-slate-500 font-medium">
                                                    {section.id === "how-we-use" ? "Purpose" : "Data type"}
                                                </th>
                                                <th className="text-left px-4 py-3 text-slate-500 font-medium">
                                                    {section.id === "how-we-use" ? "Legal basis" : "Retention period"}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {section.rows.map((row, i) => (
                                                <tr key={i} className="border-b border-slate-100 last:border-0">
                                                    <td className="px-4 py-3 text-slate-600">
                                                        {section.id === "how-we-use" ? (row as { purpose: string; basis: string }).purpose : (row as { type: string; period: string }).type}
                                                    </td>
                                                    <td className="px-4 py-3 text-slate-500">
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
                                <p className="mt-4 text-sm text-slate-500 leading-relaxed">{section.footer}</p>
                            )}
                        </section>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                    <Link href="/terms" className="text-slate-500 hover:text-slate-900 transition-colors text-sm">
                        Terms of Service →
                    </Link>
                    <Link href="/affiliate-disclosure" className="text-slate-500 hover:text-slate-900 transition-colors text-sm">
                        Affiliate Disclosure →
                    </Link>
                    <a href="mailto:privacy@payago.in" className="text-[#C9A962] hover:underline text-sm">
                        privacy@payago.in
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
