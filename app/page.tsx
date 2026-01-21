import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FeaturesSection } from "@/components/features-section"
import { WalletDemoSection } from "@/components/wallet-demo-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#04060A] relative selection:bg-[#C9A962]/20 selection:text-[#C9A962]">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <WalletDemoSection />
      <FeaturesSection />
      <SocialProofSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
