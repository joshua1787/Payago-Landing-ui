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
