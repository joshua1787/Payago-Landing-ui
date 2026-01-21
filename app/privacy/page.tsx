import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Shield, Mail, Building2, FileText } from "lucide-react"

export const metadata: Metadata = {
    title: "Privacy Policy — PayaGo",
    description: "Privacy Policy for PAYAGO LTD. Learn how we collect, use, and protect your data in compliance with UK GDPR.",
}

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-background relative selection:bg-accent/20 selection:text-accent">
            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#00D4FF]/5 blur-[150px] animate-pulse-glow" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#7C5CFF]/5 blur-[150px] animate-pulse-glow" style={{ animationDelay: '-3s' }} />
            </div>

            {/* Header */}
            <header className="relative z-10 border-b border-white/5">
                <div className="max-w-4xl mx-auto px-6 py-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Back to Home</span>
                    </Link>
                </div>
            </header>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 lg:py-24">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass mb-8 animate-border-glow">
                        <Shield className="w-8 h-8 text-[#00D4FF]" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        How PAYAGO LTD collects, uses, and protects your personal information.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        <span>Last updated: January 2026</span>
                    </div>
                </div>

                {/* Policy Content */}
                <div className="space-y-12">
                    {/* Section 1: Who We Are */}
                    <section className="glass rounded-2xl p-8 lg:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center flex-shrink-0">
                                <Building2 className="w-5 h-5 text-[#00D4FF]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">1. Who We Are</h2>
                                <div className="h-0.5 w-16 bg-gradient-to-r from-[#00D4FF] to-[#7C5CFF] rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed pl-14">
                            <p>
                                <strong className="text-foreground">PAYAGO LTD</strong> ("we", "us", or "our") is a company registered in England and Wales.
                                We are developing a digital wallet and travel payment platform currently in the <strong className="text-foreground">pre-production / testing stage</strong>.
                            </p>
                            <div className="glass rounded-xl p-4 mt-4">
                                <p className="text-sm">
                                    <strong className="text-foreground">Data Controller:</strong> PAYAGO LTD
                                </p>
                                <p className="text-sm mt-2">
                                    <strong className="text-foreground">ICO Registration Number:</strong> <span className="text-[#00D4FF]">[Your ICO Registration Number]</span>
                                </p>
                                <p className="text-sm text-muted-foreground/60 mt-2 italic">
                                    (Update this with your actual ICO registration number once obtained)
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: What Data We Collect */}
                    <section className="glass rounded-2xl p-8 lg:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#7C5CFF]/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-lg font-bold text-[#7C5CFF]">2</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">What Data We Collect</h2>
                                <div className="h-0.5 w-16 bg-gradient-to-r from-[#7C5CFF] to-[#4AD7A2] rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed pl-14">
                            <p>We may collect the following types of information:</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#00D4FF] mt-2 flex-shrink-0" />
                                    <span><strong className="text-foreground">Name</strong> — to identify you and personalise your experience</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#7C5CFF] mt-2 flex-shrink-0" />
                                    <span><strong className="text-foreground">Email address</strong> — for communication and updates</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#4AD7A2] mt-2 flex-shrink-0" />
                                    <span><strong className="text-foreground">Basic usage data</strong> — such as page views and interactions to improve our platform</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#00D4FF] mt-2 flex-shrink-0" />
                                    <span><strong className="text-foreground">Technical data</strong> — browser type, device information, and IP address for security purposes</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3: Why We Collect Data */}
                    <section className="glass rounded-2xl p-8 lg:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#4AD7A2]/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-lg font-bold text-[#4AD7A2]">3</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">Why We Collect Data</h2>
                                <div className="h-0.5 w-16 bg-gradient-to-r from-[#4AD7A2] to-[#00D4FF] rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed pl-14">
                            <p>We collect and process your data for the following purposes:</p>
                            <div className="grid gap-4 mt-4">
                                <div className="glass rounded-xl p-4 flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center">
                                        <span className="text-[#00D4FF] text-sm font-bold">1</span>
                                    </div>
                                    <span><strong className="text-foreground">Communication</strong> — to respond to your enquiries and send updates</span>
                                </div>
                                <div className="glass rounded-xl p-4 flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#7C5CFF]/10 flex items-center justify-center">
                                        <span className="text-[#7C5CFF] text-sm font-bold">2</span>
                                    </div>
                                    <span><strong className="text-foreground">Product improvement</strong> — to enhance our platform and user experience</span>
                                </div>
                                <div className="glass rounded-xl p-4 flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#4AD7A2]/10 flex items-center justify-center">
                                        <span className="text-[#4AD7A2] text-sm font-bold">3</span>
                                    </div>
                                    <span><strong className="text-foreground">Compliance</strong> — to meet legal and regulatory requirements</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Legal Basis */}
                    <section className="glass rounded-2xl p-8 lg:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-lg font-bold text-[#00D4FF]">4</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">Legal Basis</h2>
                                <div className="h-0.5 w-16 bg-gradient-to-r from-[#00D4FF] to-[#7C5CFF] rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed pl-14">
                            <p>
                                We process your personal data in accordance with the <strong className="text-foreground">UK General Data Protection Regulation (UK GDPR)</strong> and
                                the <strong className="text-foreground">Data Protection Act 2018</strong>.
                            </p>
                            <p>
                                Our lawful bases for processing include:
                            </p>
                            <ul className="space-y-2 mt-4">
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#00D4FF] mt-2 flex-shrink-0" />
                                    <span>Your consent (where applicable)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#7C5CFF] mt-2 flex-shrink-0" />
                                    <span>Legitimate interests in developing and improving our services</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#4AD7A2] mt-2 flex-shrink-0" />
                                    <span>Compliance with legal obligations</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 5: Your Rights */}
                    <section className="glass rounded-2xl p-8 lg:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#7C5CFF]/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-lg font-bold text-[#7C5CFF]">5</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">Your Rights</h2>
                                <div className="h-0.5 w-16 bg-gradient-to-r from-[#7C5CFF] to-[#4AD7A2] rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed pl-14">
                            <p>Under UK GDPR, you have the following rights:</p>
                            <div className="grid sm:grid-cols-2 gap-3 mt-4">
                                {[
                                    "Right of access",
                                    "Right to rectification",
                                    "Right to erasure",
                                    "Right to restrict processing",
                                    "Right to data portability",
                                    "Right to object",
                                ].map((right, index) => (
                                    <div key={index} className="glass rounded-lg p-3 flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#7C5CFF] flex items-center justify-center">
                                            <span className="text-xs font-bold text-background">✓</span>
                                        </div>
                                        <span className="text-sm">{right}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4">
                                To exercise any of these rights, please contact us at the email address below.
                            </p>
                        </div>
                    </section>

                    {/* Section 6: Contact Us */}
                    <section className="glass rounded-2xl p-8 lg:p-10 border border-[#00D4FF]/20">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center flex-shrink-0">
                                <Mail className="w-5 h-5 text-[#00D4FF]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">Contact Us</h2>
                                <div className="h-0.5 w-16 bg-gradient-to-r from-[#00D4FF] to-[#7C5CFF] rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed pl-14">
                            <p>
                                If you have any questions about this Privacy Policy or wish to exercise your data protection rights,
                                please contact us:
                            </p>
                            <div className="glass rounded-xl p-6 mt-4">
                                <p className="text-foreground font-semibold">PAYAGO LTD</p>
                                <a
                                    href="mailto:support@payago.in"
                                    className="inline-flex items-center gap-2 text-[#00D4FF] hover:text-[#7C5CFF] transition-colors mt-2"
                                >
                                    <Mail className="w-4 h-4" />
                                    support@payago.in
                                </a>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer Navigation */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Home</span>
                    </Link>
                    <Link
                        href="/terms"
                        className="inline-flex items-center gap-2 text-[#00D4FF] hover:text-[#7C5CFF] transition-colors"
                    >
                        <span>View Terms & Conditions</span>
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                </div>
            </div>

            {/* Simple Footer */}
            <footer className="relative z-10 py-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-xs text-muted-foreground/60">© 2026 PAYAGO LTD. All rights reserved.</p>
                </div>
            </footer>
        </main>
    )
}
