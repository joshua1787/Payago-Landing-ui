"use client"

import { Search, Wand2, CreditCard } from "lucide-react"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discover",
    description:
      "Tell us about your dream destination, preferences, and travel style. Our AI analyzes thousands of options to find your perfect match.",
  },
  {
    icon: Wand2,
    step: "02",
    title: "Plan",
    description:
      "Receive a personalized itinerary with accommodations, activities, and hidden gems. Refine it with natural conversation.",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Book",
    description:
      "Secure your entire trip with one seamless checkout. Flights, hotels, and experiences all confirmed instantly.",
  },
]

export function HowItWorks() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0B1220] overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-4 animate-fade-up">How It Works</h2>
          <h3 className="text-3xl lg:text-5xl font-bold text-foreground text-balance animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Three steps to your perfect trip
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 relative">
          {/* Animated connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent w-1/2 animate-shimmer" />
          </div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group animate-fade-up"
              style={{ animationDelay: `${0.2 + (index * 0.15)}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#04060A] to-[#141C2E] border border-white/10 flex items-center justify-center shadow-2xl shadow-black/50 group-hover:scale-110 group-hover:border-accent/30 transition-all duration-500 z-10 relative">
                    <step.icon className="w-10 h-10 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                  </div>

                  {/* Step number badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-accent to-accent-secondary flex items-center justify-center text-xs font-bold text-black border-2 border-[#0B1220] z-20">
                    {step.step}
                  </div>

                  {/* Icon Glow effect */}
                  <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto text-base">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
