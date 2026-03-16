import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
    title: "Cookie Policy — PayaGo",
    description: "How PayaGo uses cookies and similar technologies on payago.in. GDPR and UK GDPR compliant.",
    alternates: {
        canonical: "https://www.payago.in/cookie-policy",
    },
}

const cookieTypes = [
    {
        name: "Essential cookies",
        required: true,
        color: "#4AD7A2",
        description: "These cookies are necessary for the website to function. They cannot be switched off.",
        examples: [
            { name: "payago-cookie-consent", purpose: "Stores your cookie preference (accept/decline)", duration: "1 year", provider: "PayaGo" },
            { name: "Session cookies", purpose: "Maintain your session state while navigating the site", duration: "Session", provider: "PayaGo" },
        ],
    },
    {
        name: "Analytics cookies",
        required: false,
        color: "#7C5CFF",
        description: "These cookies help us understand how visitors interact with our website. All data is anonymised.",
        examples: [
            { name: "_ga", purpose: "Google Analytics — distinguishes users", duration: "2 years", provider: "Google" },
            { name: "_ga_*", purpose: "Google Analytics 4 — stores session state", duration: "2 years", provider: "Google" },
        ],
    },
]

export default function CookiePolicy() {
    return (
        <main className="min-h-screen bg-white">
            <header className="border-b border-slate-100 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/payago_logo_transparent.png" alt="PayaGo" className="h-9 w-auto object-contain" style={{ filter: 'brightness(0)' }} />
                        
                    </Link>
                    <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-slate-900">
                    Cookie Policy
                </h1>
                <p className="text-slate-500 text-sm mb-2">Last updated: March 2026</p>
                <p className="text-slate-500 text-sm mb-12">PayaGo Ltd · Company No. 16971574 · Registered in England & Wales</p>

                <div className="space-y-10 text-slate-600 leading-relaxed text-base">

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">What are cookies?</h2>
                        <p>
                            Cookies are small text files stored on your device when you visit a website. They help websites remember information about your visit, such as your preferences or whether you have accepted our cookie policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">What cookies we use</h2>
                        <p className="mb-6">PayaGo uses only two categories of cookies — essential and analytics. We do not use advertising, social media, or tracking cookies.</p>

                        {cookieTypes.map((type) => (
                            <div key={type.name} className="mb-8">
                                <div className="flex items-center gap-3 mb-3">
                                    <h3 className="text-lg font-semibold text-slate-900">{type.name}</h3>
                                    <span
                                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                                        style={{ color: type.color, background: type.color + "15", border: `1px solid ${type.color}30` }}
                                    >
                                        {type.required ? "Always active" : "Optional"}
                                    </span>
                                </div>
                                <p className="text-sm mb-4">{type.description}</p>
                                <div className="overflow-hidden rounded-xl border border-slate-100">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-b border-slate-100 bg-slate-50">
                                                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Cookie</th>
                                                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Purpose</th>
                                                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Duration</th>
                                                <th className="text-left px-4 py-2.5 text-slate-400 font-medium">Provider</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {type.examples.map((cookie, i) => (
                                                <tr key={i} className="border-b border-slate-100 last:border-0">
                                                    <td className="px-4 py-2.5 text-slate-600 font-mono">{cookie.name}</td>
                                                    <td className="px-4 py-2.5 text-slate-500">{cookie.purpose}</td>
                                                    <td className="px-4 py-2.5 text-slate-500">{cookie.duration}</td>
                                                    <td className="px-4 py-2.5 text-slate-500">{cookie.provider}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Your choices</h2>
                        <p className="mb-4">When you first visit payago.in, a cookie banner will appear asking for your consent to analytics cookies. You can:</p>
                        <ul className="space-y-2">
                            {[
                                "Accept all — enables both essential and analytics cookies",
                                "Decline — only essential cookies will be used (the site still works fully)",
                                "Change your mind — clear your browser's local storage to reset your preference and see the banner again",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A962]/60 flex-shrink-0 mt-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-sm">
                            You can also control cookies through your browser settings. See your browser&apos;s help documentation for instructions on how to manage cookies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Third-party cookies</h2>
                        <p className="mb-4">
                            Google Analytics 4 sets cookies on our behalf. Google&apos;s use of these cookies is governed by Google&apos;s Privacy Policy. You can opt out of Google Analytics across all websites using the{" "}
                            <a
                                href="https://tools.google.com/dlpage/gaoptout"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#C9A962] hover:underline"
                            >
                                Google Analytics opt-out browser add-on
                            </a>.
                        </p>
                        <p>
                            We have enabled IP anonymisation in Google Analytics, meaning your full IP address is never stored.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to this policy</h2>
                        <p>
                            We may update this Cookie Policy when we add new features or services that use cookies. We will update the &ldquo;last updated&rdquo; date above and, if the changes are material, notify you via the cookie banner on your next visit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact</h2>
                        <p>
                            For questions about our use of cookies, contact{" "}
                            <a href="mailto:privacy@payago.in" className="text-[#C9A962] hover:underline">privacy@payago.in</a>.
                        </p>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                    <Link href="/privacy" className="text-slate-500 hover:text-slate-900 transition-colors text-sm">Privacy Policy →</Link>
                    <Link href="/terms" className="text-slate-500 hover:text-slate-900 transition-colors text-sm">Terms of Service →</Link>
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
