import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Scale, Building2, FileText, AlertCircle, Globe, Info } from "lucide-react"

export const metadata: Metadata = {
    title: "Terms & Conditions — PayaGo",
    description: "Terms and Conditions for PAYAGO LTD. Understand our service terms, disclaimers, and governing law.",
}

export default function TermsAndConditions() {
    return (
        <main className="min-h-screen bg-background relative selection:bg-accent/20 selection:text-accent">
            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[#7C5CFF]/5 blur-[150px] animate-pulse-glow" />
                <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#4AD7A2]/5 blur-[150px] animate-pulse-glow" style={{ animationDelay: '-3s' }} />
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
                        <Scale className="w-8 h-8 text-[#7C5CFF]" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
                        Terms & Conditions
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Please read these terms carefully before using our website and services.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        <span>Last updated: January 2026</span>
                    </div>
                </div>

                {/* Important Notice Banner */}
                <div className="glass rounded-2xl p-6 mb-12 border border-[#4AD7A2]/20">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#4AD7A2]/10 flex items-center justify-center flex-shrink-0">
                            <Info className="w-5 h-5 text-[#4AD7A2]" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-foreground mb-2">Important Notice</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                PAYAGO LTD is a software technology company. Our platform is currently in the
                                <strong className="text-[#4AD7A2]"> development and testing stage</strong>.
                                We are not a bank, electronic money institution (EMI), or FCA-regulated financial services provider.
                                We do not hold customer funds or provide financial advice.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Terms Content */}
                <div className="space-y-12">
                    {/* Section 1: About Us */}
                    <section className="glass rounded-2xl p-8 lg:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#7C5CFF]/10 flex items-center justify-center flex-shrink-0">
                                <Building2 className="w-5 h-5 text-[#7C5CFF]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">1. Who We Are</h2>
                                <div className="h-0.5 w-16 bg-gradient-to-r from-[#7C5CFF] to-[#00D4FF] rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed pl-14">
                            <p>
                                <strong className="text-foreground">PAYAGO LTD</strong> is a company registered in England and Wales.
                                We are developing a software platform focused on digital wallet and travel payment solutions.
                            </p>
                            <div className="glass rounded-xl p-4 mt-4">
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#7C5CFF]" />
                                    <span><strong className="text-foreground">Company Type:</strong> Software / Technology Platform</span>
                                </div>
                                <div className="flex items-center gap-3 mt-3">
                                    <span className="w-2 h-2 rounded-full bg-[#00D4FF]" />
                                    <span><strong className="text-foreground">Jurisdiction:</strong> United Kingdom</span>
                                </div>
                                <div className="flex items-center gap-3 mt-3">
                                    <span className="w-2 h-2 rounded-full bg-[#4AD7A2]" />
                                    <span><strong className="text-foreground">Stage:</strong> Pre-production / Development / Testing</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Nature of Service */}
                    <section className="glass rounded-2xl p-8 lg:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-lg font-bold text-[#00D4FF]">2</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">Nature of Our Service</h2>
                                <div className="h-0.5 w-16 bg-gradient-to-r from-[#00D4FF] to-[#4AD7A2] rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed pl-14">
                            <p>Payago is building a:</p>
                            <ul className="space-y-3 mt-4">
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#00D4FF] mt-2 flex-shrink-0" />
                                    <span><strong className="text-foreground">Digital wallet platform</strong> — designed for travellers and global payments</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#7C5CFF] mt-2 flex-shrink-0" />
                                    <span><strong className="text-foreground">AI-powered travel assistant</strong> — to help users manage travel finances</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#4AD7A2] mt-2 flex-shrink-0" />
                                    <span><strong className="text-foreground">Software technology solution</strong> — not a bank or payment institution</span>
                                </li>
                            </ul>
                            <div className="glass rounded-xl p-4 mt-6 border border-amber-500/20">
                                <p className="text-sm">
                                    <strong className="text-amber-400">Current Stage:</strong> Our service is currently in development and testing.
                                    Features shown on this website represent our vision and roadmap, not currently available services.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Use of Website */}
                    <section className="glass rounded-2xl p-8 lg:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#4AD7A2]/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-lg font-bold text-[#4AD7A2]">3</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">Use of This Website</h2>
                                <div className="h-0.5 w-16 bg-gradient-to-r from-[#4AD7A2] to-[#7C5CFF] rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed pl-14">
                            <p>This website is provided for <strong className="text-foreground">informational purposes only</strong>.</p>
                            <div className="grid gap-4 mt-4">
                                <div className="glass rounded-xl p-4 flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center">
                                        <span className="text-[#00D4FF] text-sm">✓</span>
                                    </div>
                                    <span>Learn about Payago and our vision</span>
                                </div>
                                <div className="glass rounded-xl p-4 flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#7C5CFF]/10 flex items-center justify-center">
                                        <span className="text-[#7C5CFF] text-sm">✓</span>
                                    </div>
                                    <span>Sign up for updates and early access</span>
                                </div>
                                <div className="glass rounded-xl p-4 flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#4AD7A2]/10 flex items-center justify-center">
                                        <span className="text-[#4AD7A2] text-sm">✓</span>
                                    </div>
                                    <span>Contact us with enquiries</span>
                                </div>
                            </div>
                            <p className="mt-4">
                                By using this website, you acknowledge that:
                            </p>
                            <ul className="space-y-2 mt-2">
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                                    <span>No contractual relationship is established through website use</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                                    <span>Content may change as our product develops</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                                    <span>Service availability is not guaranteed</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 4: Disclaimers */}
                    <section className="glass rounded-2xl p-8 lg:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#7C5CFF]/10 flex items-center justify-center flex-shrink-0">
                                <AlertCircle className="w-5 h-5 text-[#7C5CFF]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">4. Important Disclaimers</h2>
                                <div className="h-0.5 w-16 bg-gradient-to-r from-[#7C5CFF] to-[#00D4FF] rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed pl-14">
                            <div className="space-y-4">
                                <div className="glass rounded-xl p-4 border-l-4 border-[#7C5CFF]">
                                    <p className="font-semibold text-foreground mb-2">Not Financial Advice</p>
                                    <p className="text-sm">
                                        Nothing on this website constitutes financial, investment, or professional advice.
                                        Always consult qualified professionals for financial decisions.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-4 border-l-4 border-[#00D4FF]">
                                    <p className="font-semibold text-foreground mb-2">No Guarantees</p>
                                    <p className="text-sm">
                                        We make no guarantees regarding the availability, functionality, or future features of our platform.
                                        The service is provided "as is" during development.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-4 border-l-4 border-[#4AD7A2]">
                                    <p className="font-semibold text-foreground mb-2">Not a Financial Institution</p>
                                    <p className="text-sm">
                                        PAYAGO LTD is not a bank, EMI, or FCA-authorised firm. We do not currently hold customer funds,
                                        issue payment instruments, or provide regulated financial services.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Intellectual Property */}
                    <section className="glass rounded-2xl p-8 lg:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-lg font-bold text-[#00D4FF]">5</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">Intellectual Property</h2>
                                <div className="h-0.5 w-16 bg-gradient-to-r from-[#00D4FF] to-[#4AD7A2] rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed pl-14">
                            <p>
                                All content on this website, including but not limited to text, graphics, logos, images, and software,
                                is the property of <strong className="text-foreground">PAYAGO LTD</strong> and is protected by intellectual property laws.
                            </p>
                            <p>
                                You may not reproduce, distribute, or use any content from this website without our prior written consent.
                            </p>
                        </div>
                    </section>

                    {/* Section 6: Governing Law */}
                    <section className="glass rounded-2xl p-8 lg:p-10 border border-[#7C5CFF]/20">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#4AD7A2]/10 flex items-center justify-center flex-shrink-0">
                                <Globe className="w-5 h-5 text-[#4AD7A2]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">6. Governing Law</h2>
                                <div className="h-0.5 w-16 bg-gradient-to-r from-[#4AD7A2] to-[#7C5CFF] rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed pl-14">
                            <p>
                                These Terms and Conditions are governed by and construed in accordance with the laws of
                                <strong className="text-foreground"> England and Wales</strong>.
                            </p>
                            <p>
                                Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction
                                of the courts of England and Wales.
                            </p>
                            <div className="glass rounded-xl p-4 mt-4 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#7C5CFF] flex items-center justify-center">
                                    <span className="text-sm font-bold text-background">UK</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">Jurisdiction: United Kingdom</p>
                                    <p className="text-xs text-muted-foreground">England and Wales</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 7: Changes to Terms */}
                    <section className="glass rounded-2xl p-8 lg:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#7C5CFF]/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-lg font-bold text-[#7C5CFF]">7</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">Changes to These Terms</h2>
                                <div className="h-0.5 w-16 bg-gradient-to-r from-[#7C5CFF] to-[#00D4FF] rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed pl-14">
                            <p>
                                We reserve the right to update or modify these Terms and Conditions at any time without prior notice.
                                Changes will be effective immediately upon posting to this website.
                            </p>
                            <p>
                                We encourage you to review this page periodically. Your continued use of the website following
                                any changes constitutes acceptance of those changes.
                            </p>
                        </div>
                    </section>

                    {/* Section 8: Contact */}
                    <section className="glass rounded-2xl p-8 lg:p-10 border border-[#00D4FF]/20">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-lg font-bold text-[#00D4FF]">8</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">Contact Us</h2>
                                <div className="h-0.5 w-16 bg-gradient-to-r from-[#00D4FF] to-[#7C5CFF] rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-4 text-muted-foreground leading-relaxed pl-14">
                            <p>
                                If you have any questions about these Terms and Conditions, please contact us:
                            </p>
                            <div className="glass rounded-xl p-6 mt-4">
                                <p className="text-foreground font-semibold">PAYAGO LTD</p>
                                <a
                                    href="mailto:support@payago.in"
                                    className="inline-flex items-center gap-2 text-[#00D4FF] hover:text-[#7C5CFF] transition-colors mt-2"
                                >
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
                        href="/privacy"
                        className="inline-flex items-center gap-2 text-[#00D4FF] hover:text-[#7C5CFF] transition-colors"
                    >
                        <span>View Privacy Policy</span>
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
