"use client"

const capabilities = [
  "AI itinerary drafts",
  "Group voting",
  "Shared budgets",
  "Split-cost planning",
  "Payment reminders",
  "Trip notes",
]

export function PartnersBar() {
  return (
    <section className="py-16 bg-card border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8">Product capabilities being shaped for launch</p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="rounded-full border border-border/60 bg-background px-5 py-3 text-sm font-semibold text-muted-foreground/70 hover:text-muted-foreground transition-colors"
            >
              {capability}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
