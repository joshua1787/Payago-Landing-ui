"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Sparkles, ArrowRight, MapPin, Users, Zap, ChevronDown, Plane, Hotel, Star, Landmark, UtensilsCrossed, Palette, TrendingDown, Clock, Globe } from "lucide-react"

const TYPING_TEXTS = [
  "7 days in Japan for 2 people, £3,500 budget, love street food and temples",
  "Weekend city break in Barcelona with my partner, under £600",
  "10-day Greek island hopping trip for 6 friends in August",
  "3-night Paris trip for our anniversary, luxury hotels only",
]

function TypingAnimation() {
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = TYPING_TEXTS[textIndex]
    if (!isDeleting && charIndex < currentText.length) {
      const timeout = setTimeout(() => setCharIndex(c => c + 1), 28 + Math.random() * 18)
      return () => clearTimeout(timeout)
    }
    if (!isDeleting && charIndex === currentText.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 2400)
      return () => clearTimeout(timeout)
    }
    if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => setCharIndex(c => c - 1), 10)
      return () => clearTimeout(timeout)
    }
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTextIndex((t) => (t + 1) % TYPING_TEXTS.length)
    }
  }, [charIndex, isDeleting, textIndex])

  return (
    <span className="text-white/80 font-light text-[15px]">
      {TYPING_TEXTS[textIndex].slice(0, charIndex)}
      <span className="inline-block w-[2px] h-[18px] bg-gradient-to-b from-cyan-400 to-blue-500 ml-0.5 align-middle animate-pulse" />
    </span>
  )
}

/* Cinematic background with orbital particles and layered auroras */
function CinematicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#020408]" />

      {/* Deep space gradient layers - BRIGHTER & MORE VIBRANT */}
      <div className="absolute inset-0">
        <div className="absolute top-[-50%] left-[-20%] w-[140%] h-[140%] opacity-[0.25]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(56,189,248,0.5),transparent_70%)] animate-aurora-1 mix-blend-screen" />
        </div>
        <div className="absolute bottom-[-30%] right-[-10%] w-[120%] h-[120%] opacity-[0.2]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(139,92,246,0.5),transparent_70%)] animate-aurora-2 mix-blend-screen" />
        </div>
      </div>

      {/* Active Particle System - "Fireflies" */}
      {[...Array(40)].map((_, i) => (
        <div
          key={`firefly-${i}`}
          className="absolute rounded-full mix-blend-screen animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            background: i % 3 === 0 ? '#22d3ee' : i % 5 === 0 ? '#a78bfa' : '#ffffff',
            opacity: Math.random() * 0.7 + 0.3,
            animationDuration: `${10 + Math.random() * 20}s`,
            animationDelay: `${Math.random() * -10}s`,
            boxShadow: `0 0 ${Math.random() * 10 + 5}px ${i % 3 === 0 ? '#22d3ee' : '#a78bfa'}`,
          }}
        />
      ))}

      {/* Shooting Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute h-[1px] w-[100px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-[shooting-star_5s_ease-in-out_infinite]"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 80}%`,
              animationDelay: `${Math.random() * 10}s`,
              transform: 'rotate(-45deg)'
            }}
          />
        ))}
      </div>

      {/* Nebula mesh — brighter centers */}
      <div className="absolute top-[20%] left-[60%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(34,211,238,0.08),transparent_70%)] blur-[100px] animate-float" />
      <div className="absolute top-[60%] left-[20%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(168,85,247,0.08),transparent_70%)] blur-[120px] animate-float-delayed" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
      }} />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#020408_90%)]" />

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent" />
    </div>
  )
}

/* Hyper-Realistic Titanium Phone */
function PhoneMockup() {
  const items = [
    { time: "9:00 AM", title: "Senso-ji Temple", Icon: Landmark, gradient: "from-amber-500/10 to-orange-600/10", border: "border-amber-500/20", iconColor: "#fbbf24", glow: "shadow-amber-500/10" },
    { time: "12:30 PM", title: "Tsukiji Outer Market", Icon: UtensilsCrossed, gradient: "from-rose-500/10 to-pink-600/10", border: "border-rose-500/20", iconColor: "#fb7185", glow: "shadow-rose-500/10" },
    { time: "3:00 PM", title: "teamLab Borderless", Icon: Palette, gradient: "from-violet-500/10 to-indigo-600/10", border: "border-violet-500/20", iconColor: "#a78bfa", glow: "shadow-violet-500/10" },
  ]

  return (
    <div className="relative w-full max-w-[420px] mx-auto perspective-1000 group/phone">
      {/* Holographic glow rings - Enhanced */}
      <div className="absolute -inset-10 rounded-[4.5rem] bg-gradient-to-br from-cyan-500/20 via-blue-500/5 to-purple-600/20 blur-[60px] animate-pulse-glow opacity-50" />

      {/* Physical Buttons (Side) */}
      <div className="absolute top-24 -left-[2px] w-1 h-8 bg-[#334155] rounded-l-md shadow-lg" />
      <div className="absolute top-36 -left-[2px] w-1 h-12 bg-[#334155] rounded-l-md shadow-lg" />
      <div className="absolute top-28 -right-[2px] w-1 h-16 bg-[#334155] rounded-r-md shadow-lg" />

      {/* Phone chassis - Titanium Frame */}
      <div className="relative bg-[#1e293b] rounded-[3.5rem] p-[4px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1),inset_0_0_20px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transform transition-transform duration-500 group-hover/phone:rotate-y-[-5deg] group-hover/phone:rotate-x-[5deg]">
        {/* Inner Frame with Antenna Bands */}
        <div className="relative bg-[#0f172a] rounded-[3.3rem] p-[6px] border-[2px] border-[#334155]">

          {/* Screen Glass Reflection */}
          <div className="absolute inset-[6px] rounded-[3rem] bg-gradient-to-tr from-white/[0.05] via-transparent to-transparent pointer-events-none z-30 mix-blend-overlay" />

          {/* Screen Content - "Boxes inside boxes" Depth */}
          <div className="relative bg-[#020408] rounded-[3rem] overflow-hidden shadow-inner h-[800px] flex flex-col">

            {/* Sub-pixel grain texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.svg')] pointer-events-none z-0" />

            {/* Dynamic Island / Notch Area */}
            <div className="relative z-20 pt-5 px-8 pb-2 flex justify-between items-center bg-gradient-to-b from-[#020408] to-transparent">
              <span className="text-white/80 text-[13px] font-semibold tracking-wide">9:41</span>
              <div className="h-[28px] w-[110px] bg-black rounded-full flex items-center justify-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b] shadow-inner" />
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="w-4 h-4 rounded-full border-[1.5px] border-white/40" />
                <div className="w-[22px] h-[12px] rounded-[3px] border-[1.5px] border-white/40 relative">
                  <div className="absolute inset-[1.5px] bg-white/60 rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* Dynamic Header - Floating Box 1 */}
            <div className="relative z-10 px-6 pt-4 pb-6">
              <div className="relative bg-[#0f172a]/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/[0.05]">
                {/* Inner inset depth */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-white font-bold text-xl tracking-tight leading-tight">Tokyo Adventure</div>
                    <div className="text-cyan-200/60 text-xs font-medium flex items-center gap-1.5 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      7 days · Apr 1–7
                    </div>
                  </div>
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#0f172a] bg-gradient-to-br ${i === 0 ? 'from-cyan-400 to-blue-500' : i === 1 ? 'from-purple-400 to-pink-500' : 'from-amber-400 to-orange-500'} shadow-lg`} />
                    ))}
                  </div>
                </div>
                {/* Progress with inner shadow */}
                <div className="h-2 w-full bg-[#020408] rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] overflow-hidden">
                  <div className="h-full w-[60%] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                </div>
              </div>
            </div>

            {/* Itinerary - Stacked Boxes ("Boxes in boxes") */}
            <div className="relative z-10 flex-1 px-5 space-y-4">
              <div className="text-white/30 text-xs font-bold uppercase tracking-widest px-2">Today's Plan</div>

              {items.map((item, i) => (
                <div
                  key={i}
                  className={`group relative flex items-center gap-4 bg-[#0f172a]/60 backdrop-blur-md rounded-[1.5rem] p-4 border border-white/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#1e293b]/80 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-white/[0.08]`}
                >
                  {/* Icon Box - Deep Inset */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-[#020408] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] border border-white/[0.05]`}>
                    <item.Icon className="w-5 h-5" style={{ color: item.iconColor }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-[14px] tracking-tight">{item.title}</div>
                    <div className="text-white/40 text-[11px] font-medium mt-0.5">{item.time}</div>
                  </div>

                  {/* Status Light */}
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                </div>
              ))}
            </div>

            {/* Floating 3D Alert - Breaks the "Box" */}
            <div className="absolute -right-6 bottom-32 animate-float-delayed z-30 perspective-500">
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 max-w-[200px] transform rotate-y-[-10deg] hover:rotate-y-[0deg] transition-transform duration-500">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Price Drop!</div>
                  <div className="text-white/60 text-xs">Save £45/night</div>
                </div>
              </div>
            </div>

            {/* Bottom Home Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  const handleMouse = useCallback((e: MouseEvent) => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      })
    })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse)
    return () => {
      window.removeEventListener("mousemove", handleMouse)
      cancelAnimationFrame(rafRef.current)
    }
  }, [handleMouse])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <CinematicBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 lg:gap-12 items-center">

          {/* Left — Copy */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl animate-fade-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[13px] text-white/50 font-medium">AI Travel Planning</span>
              <span className="w-[3px] h-[3px] rounded-full bg-white/15" />
              <span className="text-[13px] bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-semibold">Launching 2026</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold tracking-[-0.03em] leading-[1.05] animate-fade-up" style={{ animationDelay: "0.12s" }}>
              <span className="text-white drop-shadow-sm">One sentence.</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-text drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                One booked trip.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[17px] text-white/40 max-w-lg leading-[1.7] animate-fade-up" style={{ animationDelay: "0.22s" }}>
              Describe your dream trip in plain English. PayaGo AI builds the full itinerary, your group edits live, and everything books in-app.
            </p>

            {/* AI Input — Premium */}
            <div className="animate-fade-up" style={{ animationDelay: "0.32s" }}>
              <div className="relative group max-w-xl">
                {/* Multi-layered glow */}
                <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500/25 via-blue-500/25 to-purple-500/25 rounded-2xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-1000 blur-md" />
                <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />

                <div className="relative bg-[#0b101a]/80 border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
                  <div className="p-5 min-h-[80px]">
                    <div className="flex items-center gap-2 text-white/30 text-[10px] font-mono uppercase tracking-[0.25em] mb-3">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      Describe your trip
                    </div>
                    <div className="text-[16px] leading-relaxed text-white/90 font-light">
                      <TypingAnimation />
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-white/[0.02]">
                    <div className="flex items-center gap-2 text-[11px] text-white/20 font-mono">
                      <Zap className="w-3 h-3" /> Gemini AI · ~8s
                    </div>
                    <button className="relative group/btn overflow-hidden bg-white text-black px-7 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                      <span className="relative z-10 flex items-center gap-1.5">
                        Generate <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 via-white to-cyan-200 opacity-0 group-hover/btn:opacity-50 transition-opacity duration-300 mix-blend-overlay" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Value props */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "0.45s" }}>
              {[
                { icon: Sparkles, text: "AI itinerary in 30s", color: "text-cyan-400/50" },
                { icon: Users, text: "Real-time group editing", color: "text-violet-400/50" },
                { icon: Globe, text: "Book everything in-app", color: "text-emerald-400/50" },
              ].map((p) => (
                <div key={p.text} className="flex items-center gap-2.5 text-white/25 text-sm">
                  <p.icon className={`w-4 h-4 ${p.color}`} />
                  <span>{p.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 3D Phone */}
          <div className="hidden lg:block animate-fade-up" style={{ animationDelay: "0.55s" }}>
            <div
              className="transition-transform duration-[1200ms] ease-out will-change-transform"
              style={{ transform: `perspective(1400px) rotateY(${mousePos.x * -0.25}deg) rotateX(${mousePos.y * 0.15}deg)` }}
            >
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 opacity-20 hover:opacity-40 transition-opacity">
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-white/40" />
          <ChevronDown className="w-4 h-4 text-white animate-bounce" />
        </div>
      </div>
    </section>
  )
}
