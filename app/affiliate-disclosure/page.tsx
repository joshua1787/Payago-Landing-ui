import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AffiliateDisclosure() {
    return (
        <main className="min-h-screen overflow-x-hidden bg-[#0D2137] relative text-white selection:bg-[#E8742A]/20 selection:text-[#E8742A]">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">

                <h1 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
                    Affiliate Disclosure
                </h1>

                <div className="space-y-6 text-white/80 leading-relaxed text-lg">
                    <p>
                        PayaGo participates in affiliate marketing programs with Booking.com, Viator, Kiwi.com, and other travel service providers.
                    </p>
                    <p>
                        When you book a hotel, flight, or activity through PayaGo, we may earn a commission from the booking provider. This commission does not affect the price you pay — you pay exactly the same price as you would booking directly on the provider&apos;s website.
                    </p>
                    <p>
                        We only recommend services and providers that we believe offer genuine value to travelers. Our AI itinerary generation and recommendations are designed to find the best options for your specific trip, not to maximize our commission.
                    </p>
                    <p>
                        All affiliate relationships are disclosed clearly in the app at the point of booking. For example, hotel search results show &apos;Powered by Booking.com&apos; and activity bookings show &apos;Fulfilled by Viator.&apos;
                    </p>
                    <p>
                        For questions about our affiliate relationships, contact us at <a href="mailto:support@payago.in" className="text-[#E8742A] hover:underline">support@payago.in</a>.
                    </p>
                    <p className="text-white/50 text-base mt-12">
                        Last updated: February 2026
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    )
}
