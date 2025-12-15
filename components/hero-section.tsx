"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useState, useRef, useCallback } from "react"

// Floating particle component with depth simulation
function Particle({
  delay,
  duration,
  size,
  left,
  top,
  depth,
}: { delay: number; duration: number; size: number; left: string; top: string; depth: number }) {
  return (
    <div
      className="absolute rounded-full animate-particle"
      style={{
        width: size,
        height: size,
        left,
        top,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        background: `radial-gradient(circle, rgba(0, 212, 255, ${0.4 * depth}) 0%, transparent 70%)`,
        filter: `blur(${size / 4}px)`,
        opacity: depth,
      }}
    />
  )
}

// Keywords that cycle with gradient animation
const KEYWORDS = ["travel", "discovery", "exploration", "adventure"]

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSpark, setShowSpark] = useState(false)
  const [currentKeyword, setCurrentKeyword] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardTransform, setCardTransform] = useState({ rotateX: 0, rotateY: 0 })

  // Cycle keywords every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % KEYWORDS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Parallax mouse tracking for hero
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // 3D tilt effect for CTA card
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    setCardTransform({ rotateX, rotateY })
  }, [])

  const handleCardMouseLeave = useCallback(() => {
    setCardTransform({ rotateX: 0, rotateY: 0 })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setShowSpark(true)
    setEmail("")
    setTimeout(() => setShowSpark(false), 600)
  }

  // Generate particles with depth
  const [particles, setParticles] = useState<
    Array<{
      id: number
      delay: number
      duration: number
      size: number
      left: string
      top: string
      depth: number
    }>
  >([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        delay: Math.random() * 10,
        duration: 12 + Math.random() * 10,
        size: 3 + Math.random() * 8,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        depth: 0.3 + Math.random() * 0.7,
      })),
    )
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-[#04060A]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#04060A] via-[#0B1220] to-[#04060A]" />

      {/* Animated gradient orbs with parallax */}
      <div
        className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 60%)",
          transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] rounded-full animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, rgba(124, 92, 255, 0.12) 0%, transparent 60%)",
          transform: `translate(${-mousePosition.x * 1.2}px, ${-mousePosition.y * 1.2}px)`,
          animationDelay: "-3s",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-20"
        style={{
          background:
            "conic-gradient(from 180deg, rgba(0, 212, 255, 0.2), rgba(124, 92, 255, 0.2), rgba(74, 215, 162, 0.2), rgba(0, 212, 255, 0.2))",
          filter: "blur(120px)",
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {/* Crystalline Tech Plate */}
          <div className="group relative inline-flex items-center gap-5 p-3 pr-8 bg-[#04060A]/60 backdrop-blur-xl border border-white/10 mb-16 animate-fade-up hover:border-white/20 transition-all duration-500 rounded-2xl hover:shadow-[0_0_50px_-10px_rgba(0,212,255,0.1)] overflow-hidden" style={{ animationDelay: "0.1s" }}>

            {/* Scaning light effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />

            {/* Logo box - Sharp squircle */}
            <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-b from-white/10 to-transparent rounded-xl border border-white/10 group-hover:border-[#00D4FF]/50 transition-colors duration-500">
              <img
                src="/payago-symbol.png"
                alt="Payago"
                className="w-8 h-8 object-contain drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-start gap-0.5 text-left">
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold tracking-wide text-white font-sans leading-none">
                  PAYAGO
                </span>
                {/* Status Dot */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#4AD7A2]/10 border border-[#4AD7A2]/20">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4AD7A2] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#4AD7A2]"></span>
                  </span>
                  <span className="text-[10px] font-bold text-[#4AD7A2] uppercase tracking-wider leading-none">
                    Beta
                  </span>
                </div>
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-[#00D4FF] transition-colors duration-300">
                Intelligence Node v1.0
              </span>
            </div>

            {/* Tech Accents */}
            <div className="absolute top-0 right-0 p-1">
              <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
            </div>
            <div className="absolute bottom-0 left-0 p-1">
              <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
            </div>
          </div>

          {/* Headline with cycling gradient keyword */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[1.02] mb-8 text-balance animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="text-foreground">The future of AI-powered</span>
            <br />
            <span
              key={currentKeyword}
              className="bg-gradient-to-r from-[#00D4FF] via-[#7C5CFF] to-[#4AD7A2] bg-clip-text text-transparent animate-gradient-text inline-block"
            >
              {KEYWORDS[currentKeyword]}
            </span>
            <span className="text-foreground"> is arriving soon.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed text-pretty animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            We're building something intelligent, global, and extraordinary.
          </p>

          {/* Glassmorphism CTA Card with 3D tilt */}
          <div className="animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative max-w-lg mx-auto p-[1px] rounded-2xl bg-gradient-to-r from-[#00D4FF]/50 via-[#7C5CFF]/50 to-[#4AD7A2]/50 animate-border-glow transition-transform duration-200 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${cardTransform.rotateX}deg) rotateY(${cardTransform.rotateY}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div className="glass-strong rounded-2xl p-6 sm:p-8">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full sm:flex-1 bg-[#0B1220]/80 border border-white/10 rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/50 focus:border-[#00D4FF]/50 backdrop-blur-sm transition-all text-base"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-[#00D4FF] to-[#7C5CFF] text-[#04060A] hover:opacity-90 h-14 px-8 text-base font-semibold shadow-xl shadow-[#00D4FF]/25 group rounded-xl transition-all disabled:opacity-50 hover:shadow-[#00D4FF]/40 hover:scale-[1.02]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-[#04060A]/30 border-t-[#04060A] rounded-full animate-spin" />
                          Joining...
                        </span>
                      ) : (
                        <>
                          Get Early Access
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="flex items-center justify-center gap-3 py-2 relative">
                    {showSpark && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 animate-spark">
                          <Sparkles className="w-8 h-8 text-[#4AD7A2]" />
                        </div>
                      </div>
                    )}
                    <div className="w-6 h-6 rounded-full bg-[#4AD7A2]/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#4AD7A2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#4AD7A2] font-medium text-lg">You're on the list!</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Micro-Mission Block */}
          <div className="mt-20 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <p className="text-xs font-mono text-muted-foreground tracking-[0.2em] uppercase mb-3">Our Mission</p>
            <p className="text-xl md:text-2xl font-medium text-foreground/90">
              Designed for explorers. Powered by intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#04060A] to-transparent pointer-events-none" />
    </section>
  )
}
