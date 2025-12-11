import { HeroSection } from "@/components/hero-section"
import { ConceptStrip } from "@/components/concept-strip"
import { FeaturesStrip } from "@/components/features-strip"
import { HowItWorks } from "@/components/how-it-works"
import { AIDemoConsole } from "@/components/ai-demo-console"

import { EmailCapture } from "@/components/email-capture"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background relative selection:bg-accent/20 selection:text-accent">
      <HeroSection />
      <ConceptStrip />
      <AIDemoConsole />
      <FeaturesStrip />

      <HowItWorks />

      <EmailCapture />
      <Footer />
    </main>
  )
}
