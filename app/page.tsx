import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsBar } from "@/components/stats-bar"
import { MarqueeStrip } from "@/components/marquee-strip"
import { PartnersStrip } from "@/components/partners-strip"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TripDemoWidget } from "@/components/trip-demo-widget"
import { DestinationsShowcase } from "@/components/destinations-showcase"
import { BentoSection } from "@/components/bento-section"
import { FeaturesSection } from "@/components/features-section"
import { AppGallerySection } from "@/components/app-gallery-section"
import { CinematicReel } from "@/components/cinematic-reel"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "PayaGo — Speak the trip. We'll do the rest.",
  description:
    "PayaGo turns one natural-language trip idea into an AI itinerary draft, group decisions, split-cost visibility, and provider-led booking handoff where available.",
  alternates: {
    canonical: "https://www.payago.in",
  },
  openGraph: {
    title: "PayaGo — Speak the trip. We'll do the rest.",
    description:
      "AI group travel planning for itinerary drafts, shared decisions, cost visibility, and provider-led booking handoff where available.",
    url: "https://www.payago.in",
    siteName: "PayaGo",
    type: "website",
    images: [
      {
        url: "https://www.payago.in/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "PayaGo AI group travel planning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PayaGo — Speak the trip. We'll do the rest.",
    description:
      "AI group travel planning for itinerary drafts, shared decisions, cost visibility, and provider-led booking handoff where available.",
    images: ["https://www.payago.in/og/home.jpg"],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAFAF8] relative">
      <Navbar />
      <HeroSection />
      <PartnersStrip />
      <StatsBar />
      <MarqueeStrip />
      <HowItWorksSection />
      <TripDemoWidget />
      <DestinationsShowcase />
      <BentoSection />
      <FeaturesSection />
      <AppGallerySection />
      <CinematicReel />
      <CTASection />
      <Footer />
    </main>
  )
}
