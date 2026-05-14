"use client"

const testimonials = [
  {
    title: "Planning starts from a shared brief",
    quote:
      "Early testers want a single place to capture dates, budgets, preferences, and constraints before the itinerary draft is created.",
  },
  {
    title: "Group decisions need less back-and-forth",
    quote:
      "Testing has focused on simple votes and clear tradeoffs so friends can compare options without losing decisions in chat threads.",
  },
  {
    title: "Costs should be visible early",
    quote:
      "Feedback is shaping how PayaGo explains shared costs, contribution timing, and payment expectations before a trip is confirmed.",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-4">Early Testing Themes</h2>
          <p className="text-3xl lg:text-5xl font-serif font-medium text-foreground text-balance">
            What we are learning from group-trip planning
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border/50 p-8 hover:shadow-xl hover:shadow-accent/5 transition-[background-color,border-color,box-shadow,color,max-height,opacity,transform,width,left] duration-300"
            >
              <div className="w-10 h-1 rounded-full bg-accent mb-6" />

              {/* Quote */}
              <p className="text-lg font-semibold text-foreground mb-4 text-balance">{testimonial.title}</p>
              <p className="text-muted-foreground leading-relaxed text-balance">{testimonial.quote}</p>

              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Product research theme
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
