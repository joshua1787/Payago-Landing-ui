"use client"

import { Sparkles, MessageCircle, CalendarCheck, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI Trip Planner",
    description: "Personalized itineraries crafted by intelligent algorithms",
  },
  {
    icon: MessageCircle,
    title: "Real-time Assistance",
    description: "24/7 AI concierge for instant travel support",
  },
  {
    icon: CalendarCheck,
    title: "Unified Bookings",
    description: "Flights, hotels, and experiences in one place",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Enterprise-grade security for peace of mind",
  },
]

export function FeaturesStrip() {
  return (
    <section id="features" className="relative py-24 lg:py-32 bg-[#04060A] overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-4">Features</h2>
          <h2 className="text-3xl lg:text-5xl font-semibold text-foreground text-balance mb-6">
            Everything you need for
            <span className="bg-gradient-to-r from-[#00D4FF] via-[#7C5CFF] to-[#4AD7A2] bg-clip-text text-transparent animate-gradient-text ml-2">
              seamless travel
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-accent/50 hover:to-accent-secondary/50 transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="relative h-full p-6 rounded-xl bg-[#0B1220]/90 backdrop-blur-xl border border-white/5 group-hover:bg-[#0B1220]/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
