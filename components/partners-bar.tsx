"use client"

const partners = [
  { name: "TravelCo", logo: "TravelCo" },
  { name: "Wanderlust", logo: "Wanderlust" },
  { name: "Globe Airways", logo: "Globe Airways" },
  { name: "StayLux", logo: "StayLux" },
  { name: "Adventure Inc", logo: "Adventure Inc" },
  { name: "Explore", logo: "Explore" },
]

export function PartnersBar() {
  return (
    <section className="py-16 bg-card border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8">Trusted by industry leaders</p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              {partner.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
