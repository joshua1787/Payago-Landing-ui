import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen overflow-x-hidden bg-[#0D2137] relative text-white selection:bg-[#E8742A]/20 selection:text-[#E8742A]">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">

                <h1 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
                    Privacy Policy
                </h1>

                <div className="space-y-6 text-white/80 leading-relaxed text-lg">
                    <p>
                        Last updated: February 2026. Full privacy policy coming soon. For questions: <a href="mailto:support@payago.in" className="text-[#E8742A] hover:underline">support@payago.in</a>
                    </p>
                    <p className="text-white/40 italic mt-8 text-sm">
                        Note to self: Generate full policy at termly.io before Booking.com application
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    )
}
