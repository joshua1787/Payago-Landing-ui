import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { DestinationsShowcase } from "@/components/destinations-showcase"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#010306] relative selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <DestinationsShowcase />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  )
}
