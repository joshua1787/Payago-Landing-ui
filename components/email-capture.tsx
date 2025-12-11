"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function EmailCapture() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSpark, setShowSpark] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardTransform, setCardTransform] = useState({ rotateX: 0, rotateY: 0 })

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
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

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#04060A]" />

      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(ellipse, rgba(0, 212, 255, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">Join the waitlist</h2>
          <p className="text-muted-foreground">Be the first to experience the future of travel.</p>
        </div>

        {/* Glassmorphism Card with 3D tilt */}
        <div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="relative p-[1px] rounded-2xl bg-gradient-to-r from-[#00D4FF]/40 via-[#7C5CFF]/40 to-[#4AD7A2]/40 transition-transform duration-200 ease-out"
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
                  className="w-full sm:w-auto bg-gradient-to-r from-[#00D4FF] to-[#7C5CFF] text-[#04060A] hover:opacity-90 h-14 px-8 text-base font-semibold shadow-xl shadow-[#00D4FF]/20 group rounded-xl transition-all disabled:opacity-50 hover:shadow-[#00D4FF]/35 hover:scale-[1.02]"
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
    </section>
  )
}
