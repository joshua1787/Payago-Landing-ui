"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ArrowRight, Plane, Hotel, Utensils, Camera } from "lucide-react"

const destinations = ["Paris", "Tokyo", "Bali", "New York", "Santorini"]

const suggestedItinerary = [
  {
    day: 1,
    icon: Plane,
    title: "Arrival & Exploration",
    description: "Check into boutique hotel, evening walk along Seine",
  },
  { day: 2, icon: Camera, title: "Cultural Immersion", description: "Louvre Museum, Notre-Dame, Latin Quarter" },
  {
    day: 3,
    icon: Utensils,
    title: "Culinary Journey",
    description: "French cooking class, wine tasting in Montmartre",
  },
  { day: 4, icon: Hotel, title: "Day Trip", description: "Versailles Palace gardens, local bistro dinner" },
]

export function TripPlanner() {
  const [selectedDestination, setSelectedDestination] = useState("Paris")
  const [dates, setDates] = useState("Apr 15 - Apr 19")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  return (
    <section id="planner" className="py-24 lg:py-32 bg-[#04060A] relative overflow-hidden">
      {/* Background Holographic Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(0, 212, 255, .3) 25%, rgba(0, 212, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, .3) 75%, rgba(0, 212, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 212, 255, .3) 25%, rgba(0, 212, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, .3) 75%, rgba(0, 212, 255, .3) 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-4 animate-fade-up">Trip Planner</h2>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground text-balance animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Design Your <span className="text-accent">Odyssey</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left - Input Form (Holographic Panel) */}
          <div className="relative group animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent via-accent-secondary to-accent opacity-30 blur-md rounded-2xl group-hover:opacity-50 transition-opacity" />
            <div className="relative bg-[#0B1220]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <div className="space-y-6">
                {/* Destination */}
                <div>
                  <label className="block text-sm font-medium text-accent mb-3">Target Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/70" />
                    <select
                      value={selectedDestination}
                      onChange={(e) => setSelectedDestination(e.target.value)}
                      className="w-full bg-[#04060A]/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-foreground appearance-none focus:outline-none focus:border-accent focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all"
                    >
                      {destinations.map((dest) => (
                        <option key={dest} value={dest} className="bg-[#0B1220]">
                          {dest}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dates */}
                <div>
                  <label className="block text-sm font-medium text-accent mb-3">Temporal Window</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/70" />
                    <input
                      type="text"
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                      className="w-full bg-[#04060A]/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-foreground focus:outline-none focus:border-accent focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all"
                      placeholder="Select dates"
                    />
                  </div>
                </div>

                {/* Travelers */}
                <div>
                  <label className="block text-sm font-medium text-accent mb-3">Crew Size</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        className="flex-1 py-3 rounded-xl border border-white/10 bg-[#04060A]/30 text-sm font-medium hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_10px_rgba(0,212,255,0.2)] transition-all focus:outline-none"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  className="w-full bg-gradient-to-r from-accent to-accent-secondary text-[#04060A] font-bold h-14 text-base shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-[1.02] transition-all group border-0"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#04060A]/30 border-t-[#04060A] rounded-full animate-spin" />
                      Calculating Trajectory...
                    </span>
                  ) : (
                    <>
                      Initialize Navigation
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Right - Itinerary Preview (Manifest) */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {/* Scanner Line Animation */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/50 shadow-[0_0_15px_#00D4FF] animate-pulse z-20 pointer-events-none opacity-50" style={{ animationDuration: '3s' }} />

            <div className="bg-[#0B1220]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div>
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    {selectedDestination}
                    <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded border border-accent/20">CONFIRMED</span>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">ID: {isGenerating ? "GENERATING..." : "8X92-B7A1"}</p>
                </div>
              </div>

              <div className="space-y-4">
                {suggestedItinerary.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 rounded-xl bg-[#04060A]/50 border border-white/5 hover:border-accent/30 transition-colors group relative overflow-hidden"
                  >
                    {/* Hover reveal gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-all">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-mono text-accent-secondary border border-accent-secondary/30 px-1.5 rounded">DAY {item.day}</span>
                        <span className="text-sm font-bold text-foreground">{item.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between font-mono text-sm">
                  <span className="text-muted-foreground">TOTAL_ESTIMATE</span>
                  <span className="text-2xl font-bold text-accent">$2,400.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
