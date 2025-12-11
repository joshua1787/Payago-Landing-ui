"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Travel Blogger",
    image: "/professional-woman-smiling-portrait.png",
    quote:
      "Payogo transformed how I plan my trips. The AI understood exactly what I was looking for and created an itinerary that exceeded my expectations.",
    rating: 5,
  },
  {
    name: "James Chen",
    role: "Business Executive",
    image: "/professional-asian-man-smiling.png",
    quote:
      "As someone who travels frequently for work, the seamless booking experience saves me hours every week. The assistant handles everything flawlessly.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Adventure Seeker",
    image: "/young-latina-woman-portrait-smiling-outdoors.jpg",
    quote:
      "The hidden gems recommendations were incredible. I discovered places I would never have found on my own. Truly a game-changer for adventurous travelers.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-4">Testimonials</h2>
          <p className="text-3xl lg:text-5xl font-serif font-medium text-foreground text-balance">
            Loved by travelers worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border/50 p-8 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-8 text-balance">"{testimonial.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-border/50"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
