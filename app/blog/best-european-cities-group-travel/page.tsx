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
                    <span>February 12, 2026</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>5 min read</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
                    The Best European Cities for Group Travel
                </h1>

                <div className="space-y-6 text-white/80 leading-relaxed text-lg">
                    <p>
                        Planning a group trip to Europe? These five cities consistently rank as the best destinations for friend groups, families, and colleague getaways based on factors like walkability, group activities, accommodation value, and ease of coordination.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Barcelona, Spain</h2>
                    <p>
                        The group travel champion. Walkable neighborhoods, incredible food scene, beach access, and enough activities (Gaudí architecture, markets, nightlife) to satisfy different interests. Average hotel cost: £80-120/night. Best months: April-June, September-October.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Lisbon, Portugal</h2>
                    <p>
                        Europe&apos;s best-value destination. Stunning viewpoints, affordable wine and seafood, beautiful tile-covered buildings, and easy day trips to Sintra and Cascais. Groups love the relaxed pace and Instagram-worthy streets. Average cost: £60-90/night. Peak season: May-September.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Prague, Czech Republic</h2>
                    <p>
                        Medieval architecture meets affordable beer. The compact Old Town is perfect for groups who want to explore on foot. Castle tours, river cruises, and world-class beer halls provide diverse activities. Average cost: £50-80/night. Best time: April-May, September-October (avoid July-August crowds).
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Amsterdam, Netherlands</h2>
                    <p>
                        Bike-friendly, canal-filled, and packed with museums. Groups can rent bikes, explore neighborhoods like Jordaan and De Pijp, visit Anne Frank House, or take day trips to windmills and tulip fields. Average cost: £100-150/night. Peak: April (tulip season) and summer.
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Budapest, Hungary</h2>
                    <p>
                        The underrated gem. Thermal baths, ruin bars, stunning Parliament building, and the Danube splitting Buda and Pest. One of Europe&apos;s most affordable capitals with excellent public transport. Average cost: £50-70/night. Best months: April-June, September.
                    </p>
                    <p className="mt-8">
                        All five cities are well-connected by budget airlines (Ryanair, EasyJet, Wizz Air) and have excellent public transport. PayaGo&apos;s AI can build complete itineraries for any of these destinations in seconds, including hotel recommendations, activity schedules, and group-friendly restaurants.
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    )
}
