import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { PartnersStrip } from "@/components/partners-strip"
import { StatsBar } from "@/components/stats-bar"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TripDemoWidget } from "@/components/trip-demo-widget"
import { DestinationsShowcase } from "@/components/destinations-showcase"
import { FeaturesSection } from "@/components/features-section"
import { AppGallerySection } from "@/components/app-gallery-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CinematicReel } from "@/components/cinematic-reel"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#010306] relative selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />
      <HeroSection />
      <PartnersStrip />
      <StatsBar />
      <HowItWorksSection />
      <TripDemoWidget />
      <DestinationsShowcase />
      <FeaturesSection />
      <AppGallerySection />
      <TestimonialsSection />
      <CinematicReel />
      <CTASection />
      <Footer />
    </main>
  )
}
