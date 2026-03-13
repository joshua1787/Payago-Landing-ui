"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Sparkles, ArrowRight, Users, Zap, ChevronDown, Globe, Check } from "lucide-react"

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

/* Cinematic background — pure CSS animated aurora system, no photo dependency */
function CinematicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* ── Base: deep space black ── */}
      <div className="absolute inset-0 bg-[#010308]" />

      {/* ── Layer 1: Primary aurora masses ── */}
      {/* Massive cyan aurora — upper left, slow drift */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[90%] h-[90%] animate-aurora-1"
        style={{ filter: "blur(130px)", background: "radial-gradient(ellipse at center, rgba(0,212,255,0.28) 0%, transparent 65%)" }}
      />
      {/* Deep violet aurora — right side */}
      <div
        className="absolute top-[0%] right-[-20%] w-[80%] h-[100%] animate-aurora-2"
        style={{ filter: "blur(150px)", background: "radial-gradient(ellipse at center, rgba(124,92,255,0.24) 0%, transparent 65%)" }}
      />
      {/* Gold whisper — bottom left */}
      <div
        className="absolute bottom-[-15%] left-[5%] w-[65%] h-[65%] animate-aurora-3"
        style={{ filter: "blur(120px)", background: "radial-gradient(ellipse at center, rgba(201,169,98,0.14) 0%, transparent 65%)" }}
      />
      {/* Emerald accent — bottom right */}
      <div
        className="absolute bottom-[-5%] right-[5%] w-[45%] h-[45%] animate-aurora-1"
        style={{ filter: "blur(100px)", animationDelay: "-9s", background: "radial-gradient(ellipse at center, rgba(74,215,162,0.10) 0%, transparent 65%)" }}
      />

      {/* ── Layer 2: Horizon glow — the "planet surface" illusion ── */}
      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[120%] h-[2px] opacity-[0.12]"
        style={{ background: "linear-gradient(90deg, transparent, #00d4ff 20%, #7c5cff 50%, #00d4ff 80%, transparent)", filter: "blur(8px)" }} />
      <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 w-[80%] h-[300px]"
        style={{ background: "radial-gradient(ellipse at top, rgba(0,212,255,0.06), transparent 70%)", filter: "blur(40px)" }} />

      {/* ── Layer 3: Fine coordinate grid ── */}
      <div className="absolute inset-0" style={{
        opacity: 0.022,
        backgroundImage: "linear-gradient(rgba(0,212,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.6) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* ── Layer 4: Floating nebula orbs ── */}
      <div className="absolute top-[18%] left-[58%] w-[550px] h-[550px] animate-float"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.06), transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute top-[52%] left-[12%] w-[480px] h-[480px] animate-float-delayed"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.07), transparent 70%)", filter: "blur(100px)" }} />
      <div className="absolute top-[28%] left-[30%] w-[700px] h-[350px] animate-pulse-glow"
        style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.035), transparent 70%)", filter: "blur(60px)" }} />

      {/* ── Layer 5: Firefly particles — deterministic positions ── */}
      {[...Array(55)].map((_, i) => (
        <div
          key={`ff-${i}`}
          className="absolute rounded-full mix-blend-screen animate-float"
          style={{
            top: `${(i * 17 + 13) % 100}%`,
            left: `${(i * 23 + 7) % 100}%`,
            width: `${(i % 3) + 1}px`,
            height: `${(i % 3) + 1}px`,
            background: i % 4 === 0 ? '#22d3ee' : i % 4 === 1 ? '#a78bfa' : i % 4 === 2 ? '#c9a962' : '#ffffff',
            opacity: 0.25 + (i % 6) * 0.1,
            animationDuration: `${12 + (i % 15)}s`,
            animationDelay: `${-(i % 13)}s`,
            boxShadow: `0 0 ${(i % 8) + 4}px ${i % 4 === 0 ? '#22d3ee' : i % 4 === 1 ? '#a78bfa' : '#c9a962'}`,
          }}
        />
      ))}

      {/* ── Layer 6: Shooting stars ── */}
      <div className="absolute inset-0 overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`ss-${i}`}
            className="absolute h-[1px] w-[130px] opacity-0 animate-[shooting-star_6s_ease-in-out_infinite]"
            style={{
              top: `${i * 18 + 8}%`,
              left: `${i * 22 + 5}%`,
              animationDelay: `${i * 2.2}s`,
              transform: "rotate(-38deg)",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)",
            }}
          />
        ))}
      </div>

      {/* ── Vignette + fade ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#010308_80%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#010308] to-transparent" />
    </div>
  )
}

/* PayaGo AI Trip Builder — unique screen nobody else has */
function PhoneMockup() {
  const options = [
    { label: "Budget", price: "£620", per: "/pp", color: "#4AD7A2", flight: "BA · 14h via Seoul", hotel: "Shinjuku Granbell ★★★★" },
    { label: "Balanced", price: "£780", per: "/pp", color: "#C9A962", flight: "ANA · 11h 45m direct", hotel: "Cerulean Tower ★★★★★", best: true },
    { label: "Premium", price: "£980", per: "/pp", color: "#7C5CFF", flight: "JAL Business · direct", hotel: "Park Hyatt Tokyo ★★★★★" },
  ]

  const members = [
    { initial: "Y", gradient: "from-cyan-400 to-blue-500", voted: true },
    { initial: "S", gradient: "from-purple-400 to-pink-500", voted: true },
    { initial: "M", gradient: "from-amber-400 to-orange-500", voted: true },
    { initial: "P", gradient: "from-emerald-400 to-teal-500", voted: false },
  ]

  return (
    <div className="relative w-full max-w-[420px] mx-auto perspective-1000 group/phone">
      {/* Ambient glow — colour shifts with AI pick accent */}
      <div className="absolute -inset-10 rounded-[4.5rem] bg-gradient-to-br from-[#C9A962]/20 via-[#7C5CFF]/10 to-[#00D4FF]/20 blur-[70px] animate-pulse-glow opacity-60" />

      {/* Side buttons */}
      <div className="absolute top-24 -left-[2px] w-1 h-8 bg-[#334155] rounded-l-md" />
      <div className="absolute top-36 -left-[2px] w-1 h-12 bg-[#334155] rounded-l-md" />
      <div className="absolute top-28 -right-[2px] w-1 h-16 bg-[#334155] rounded-r-md" />

      {/* Chassis */}
      <div className="relative bg-[#1e293b] rounded-[3.5rem] p-[4px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08),inset_0_0_20px_rgba(0,0,0,0.6)] ring-1 ring-white/[0.06]">
        <div className="relative bg-[#0f172a] rounded-[3.3rem] p-[6px] border-[2px] border-[#2d3f55]">
          {/* Glass reflection */}
          <div className="absolute inset-[6px] rounded-[3rem] bg-gradient-to-tr from-white/[0.04] via-transparent to-transparent pointer-events-none z-30 mix-blend-overlay" />

          <div className="relative bg-[#04060A] rounded-[3rem] overflow-hidden h-[800px] flex flex-col">

            {/* Status bar */}
            <div className="relative z-20 pt-5 px-8 pb-2 flex justify-between items-center">
              <span className="text-white/70 text-[13px] font-semibold">9:41</span>
              <div className="h-[28px] w-[110px] bg-black rounded-full" />
              <div className="flex gap-1.5 items-center opacity-60">
                <div className="w-4 h-4 rounded-full border-[1.5px] border-white/50" />
                <div className="w-[22px] h-[12px] rounded-[3px] border-[1.5px] border-white/50 relative">
                  <div className="absolute inset-[1.5px] bg-white/60 rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* ── AI header: destination photo + badge ── */}
            <div className="relative mx-5 rounded-[1.8rem] overflow-hidden h-[140px] flex-shrink-0">
              <img src="/images/travel-tokyo.png" alt="Tokyo" className="w-full h-full object-cover animate-ken-burns-slow opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04060A]/90 via-[#04060A]/30 to-transparent" />
              {/* AI badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-[#C9A962]" />
                <span className="text-[10px] font-bold text-white/80">AI Generated · 28s</span>
              </div>
              {/* Destination name */}
              <div className="absolute bottom-3 left-4">
                <div className="text-white font-bold text-lg leading-tight">Tokyo, Japan</div>
                <div className="text-white/50 text-[11px] flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  7 days · Apr 12–19 · 4 people
                </div>
              </div>
            </div>

            {/* ── 3 AI options ── */}
            <div className="px-5 pt-4 pb-2 flex-shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4AD7A2] animate-pulse" />
                <span className="text-[10px] font-mono text-[#4AD7A2]/80 tracking-wide">3 options ready</span>
              </div>
              <div className="space-y-2">
                {options.map((opt) => (
                  <div
                    key={opt.label}
                    className="relative rounded-2xl px-4 py-3 border flex items-center gap-3 overflow-hidden"
                    style={{
                      background: opt.best ? `${opt.color}0A` : "rgba(255,255,255,0.02)",
                      borderColor: opt.best ? `${opt.color}40` : "rgba(255,255,255,0.06)",
                      boxShadow: opt.best ? `0 0 20px ${opt.color}10` : "none",
                    }}
                  >
                    {/* Accent bar */}
                    <div className="w-[3px] h-8 rounded-full flex-shrink-0" style={{ background: opt.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-bold" style={{ color: opt.color }}>{opt.label}</span>
                        {opt.best && (
                          <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full" style={{ color: opt.color, background: opt.color + "20" }}>AI PICK</span>
                        )}
                      </div>
                      <div className="text-white/35 text-[9px] truncate">{opt.flight}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-white font-bold text-sm">{opt.price}</span>
                      <span className="text-white/30 text-[9px]">{opt.per}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Group voting strip ── */}
            <div className="px-5 pt-3 flex-shrink-0">
              <div className="bg-white/[0.025] border border-white/[0.06] rounded-2xl px-4 py-3">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-white/40 text-[10px] font-semibold uppercase tracking-wider">Group voting</span>
                  <span className="text-[#00D4FF] text-[10px] font-bold">3/4 voted</span>
                </div>
                <div className="flex items-center gap-2">
                  {members.map((m, i) => (
                    <div key={i} className="relative">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${m.gradient} flex items-center justify-center text-white text-xs font-bold border-2`}
                        style={{ borderColor: m.voted ? "#4AD7A2" : "rgba(255,255,255,0.1)" }}>
                        {m.initial}
                      </div>
                      {m.voted && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#4AD7A2] flex items-center justify-center">
                          <Check className="w-2 h-2 text-[#04060A]" />
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="flex-1 text-right">
                    <div className="text-white/20 text-[9px]">Priya reminded</div>
                    <div className="text-white/15 text-[8px]">2 min ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Floating live badge — unique PayaGo feel ── */}
            <div className="absolute -left-8 bottom-36 animate-float z-30">
              <div className="bg-[#0D1B2A]/95 backdrop-blur-2xl border border-[#00D4FF]/25 px-4 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_20px_rgba(0,212,255,0.08)] flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-[#7C5CFF]/20 border border-[#00D4FF]/30 flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#00D4FF]" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#4AD7A2] border border-[#0D1B2A] animate-ping" />
                </div>
                <div>
                  <div className="text-white text-[11px] font-bold leading-tight">Group is live</div>
                  <div className="text-white/40 text-[9px]">3 friends voted In</div>
                </div>
              </div>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white/15 rounded-full" />
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
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl animate-fade-up shadow-[0_0_30px_rgba(0,212,255,0.06)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[12px] text-white/40 font-medium tracking-wide uppercase">AI Travel Planning</span>
              <span className="w-[1px] h-3 bg-white/10" />
              <span className="text-[12px] bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent font-semibold tracking-wide">Launching April 2026</span>
            </div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-[5rem] font-bold tracking-[-0.04em] leading-[0.98] animate-fade-up"
              style={{ animationDelay: "0.12s", fontFamily: "var(--font-outfit)" }}
            >
              <span className="text-white">One sentence.</span>
              <br />
              <span
                className="bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-text"
                style={{ backgroundImage: "linear-gradient(90deg, #00d4ff, #7c5cff, #4ad7a2, #00d4ff)" }}
              >
                One booked trip.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[17px] text-white/45 max-w-[480px] leading-[1.75] animate-fade-up" style={{ animationDelay: "0.22s" }}>
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
