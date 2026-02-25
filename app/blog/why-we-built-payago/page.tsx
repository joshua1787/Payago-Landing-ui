import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function BlogPost() {
    return (
        <main className="min-h-screen overflow-x-hidden bg-[#0D2137] relative text-white selection:bg-[#E8742A]/20 selection:text-[#E8742A]">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
                <Link href="/blog" className="text-[#E8742A] hover:underline mb-8 inline-block">
                    &larr; Back to Blog
                </Link>

                <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-6">
                    <span>February 8, 2026</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>3 min read</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
                    Why We Built PayaGo
                </h1>

                <div className="space-y-6 text-white/80 leading-relaxed text-lg">
                    <p>
                        Every product starts with a frustration. For us, it was planning a week-long trip to Italy with five friends. What should have been exciting turned into weeks of scattered WhatsApp messages, conflicting Google Doc suggestions, and one person (me) doing 90% of the work while everyone else stayed silent until the day before departure.
                    </p>
                    <p>
                        The problem wasn&apos;t a lack of tools. Google Flights existed for flights. Booking.com for hotels. TripAdvisor for reviews. Notion for organizing. WhatsApp for group chat. The problem was that planning a real trip required jumping between 6+ different platforms, manually copying information, and somehow keeping a group of people aligned through it all.
                    </p>
                    <p>
                        We realized the travel industry had solved booking — but not planning. Every platform optimized for the transaction (click here to book) but ignored the 8 hours of research, coordination, and decision-making that happens before anyone clicks &apos;confirm purchase.&apos;
                    </p>
                    <p>
                        That&apos;s why we built PayaGo. One app that handles the entire journey: AI generates the itinerary in 30 seconds based on your preferences. Your whole group can edit it live (no more version control chaos). And when you&apos;re ready to book, hotels, flights, and activities are all in-app — one checkout, zero tab-switching.
                    </p>
                    <p>
                        We&apos;re launching in April 2026 for iOS and Android. Our mission is simple: make extraordinary travel accessible to everyone, not just people with the time to spend a weekend planning it or the money to hire a travel agent.
                    </p>
                    <p className="font-medium text-[#E8742A]">
                        Join our early access waitlist at payago.in. First 1,000 users get free lifetime access to premium features.
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    )
}
