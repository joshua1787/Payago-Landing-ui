"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Play, ChevronDown } from "lucide-react"
import { useEffect, useState, useRef, useCallback } from "react"

// Animated floating orb
function FloatingOrb({ color, size, delay, duration, x, y }: {
  color: string; size: number; delay: number; duration: number; x: string; y: string
}) {
  return (
    <div
      className="absolute rounded-full blur-3xl animate-pulse opacity-30"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: color,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  )
}

// Animated card component
function AnimatedCard({ isVisible }: { isVisible: boolean }) {
  return (
    <div className={`relative transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-20 opacity-0 rotate-6'}`}>
      {/* Main Card */}
      <div className="relative w-72 h-44 bg-gradient-to-br from-[#1E3A5F] via-[#2A4A6F] to-[#1E3A5F] rounded-2xl shadow-2xl shadow-[#C9A962]/20 border border-white/10 p-6 overflow-hidden">
        {/* Card shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

        {/* Card pattern */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full border border-white/5" />
        <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full border border-white/5" />

        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
            <img src="/payago-logo.jpg" alt="PayaGo" className="w-full h-full object-cover scale-[1.35]" />
          </div>
          <span className="text-white/90 text-lg font-bold">PayaGo</span>
        </div>

        {/* Card Number */}
        <div className="text-white/90 font-mono text-lg tracking-wider mb-4">
          •••• •••• •••• 4242
        </div>

        {/* Card Details */}
        <div className="flex justify-between items-end">
          <div>
            <div className="text-white/40 text-[10px] uppercase tracking-wider">Card Holder</div>
            <div className="text-white/90 text-sm">JOHN DOE</div>
          </div>
          <div className="text-right">
            <div className="text-white/40 text-[10px] uppercase tracking-wider">Expires</div>
            <div className="text-white/90 text-sm">12/28</div>
          </div>
        </div>

        {/* Chip */}
        <div className="absolute top-6 right-6 w-10 h-8 rounded-md bg-gradient-to-br from-[#C9A962] to-[#E5C77D] flex items-center justify-center">
          <div className="w-6 h-4 border border-[#1E3A5F]/30 rounded-sm grid grid-cols-3 gap-px">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#1E3A5F]/20 rounded-[1px]" />
            ))}
          </div>
        </div>
      </div>

      {/* Floating balance indicator */}
      <div className="absolute -right-6 -top-6 bg-[#0B1220]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-xl animate-bounce-slow">
        <div className="text-[10px] text-white/40 uppercase tracking-wider">Balance</div>
        <div className="text-white font-bold text-lg">£4,250</div>
        <div className="text-[#4AD7A2] text-xs flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-[#4AD7A2]" />
          Active
        </div>
      </div>
    </div>
  )
}

// Phone mockup with app interface
function PhoneMockup() {
  const [currentScreen, setCurrentScreen] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen(prev => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const screens = [
    { title: "Group Wallet", balance: "£2,150.00", members: 5 },
    { title: "Personal", balance: "£4,250.00", members: 1 },
    { title: "Trip Fund", balance: "£890.00", members: 3 },
  ]

  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="relative w-64 h-[520px] bg-[#0A0A0A] rounded-[3rem] border-4 border-[#2A2A2A] shadow-2xl shadow-black/50 p-2 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0A0A0A] rounded-full z-20" />

        {/* Screen */}
        <div className="relative w-full h-full bg-gradient-to-b from-[#04060A] to-[#0B1220] rounded-[2.5rem] overflow-hidden">
          {/* Status bar */}
          <div className="relative z-10 flex justify-between items-center px-8 pt-4 text-white/50 text-xs">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-white/50 rounded-sm">
                <div className="w-3/4 h-full bg-[#4AD7A2] rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="p-6 pt-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
                  <img src="/payago-logo.jpg" alt="PayaGo" className="w-full h-full object-cover scale-[1.35]" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">PayaGo</div>
                  <div className="text-white/40 text-sm">Travel. Pay. Live.</div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A962] to-[#E5C77D] flex items-center justify-center text-sm font-bold text-[#1E3A5F]">
                JD
              </div>
            </div>

            {/* Wallet card with animation */}
            <div className="relative mb-6">
              {screens.map((screen, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 bg-gradient-to-br from-[#1E3A5F] to-[#2A4A6F] rounded-2xl p-5 border border-white/10 transition-all duration-500 ${currentScreen === i
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-4 scale-95'
                    }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-white/50 text-xs">{screen.title}</div>
                      <div className="text-white text-2xl font-bold">{screen.balance}</div>
                    </div>
                    {screen.members > 1 && (
                      <div className="flex -space-x-2">
                        {[...Array(Math.min(screen.members, 3))].map((_, j) => (
                          <div key={j} className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C9A962] to-[#00D4FF] border-2 border-[#1E3A5F] flex items-center justify-center text-[8px] text-white font-bold">
                            {['A', 'B', 'C'][j]}
                          </div>
                        ))}
                        {screen.members > 3 && (
                          <div className="w-6 h-6 rounded-full bg-white/10 border-2 border-[#1E3A5F] flex items-center justify-center text-[8px] text-white">
                            +{screen.members - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Mini card */}
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2">
                    <div className="w-8 h-5 bg-gradient-to-r from-[#C9A962] to-[#E5C77D] rounded-md" />
                    <span className="text-white/70 font-mono text-xs">•••• 4242</span>
                    <span className="ml-auto text-[#4AD7A2] text-xs">Active</span>
                  </div>
                </div>
              ))}
              {/* Placeholder for height */}
              <div className="opacity-0 bg-gradient-to-br from-[#1E3A5F] to-[#2A4A6F] rounded-2xl p-5">
                <div className="mb-4">
                  <div className="text-xs">Title</div>
                  <div className="text-2xl font-bold">£0.00</div>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-8 h-5" />
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[
                { icon: "↑", label: "Send" },
                { icon: "↓", label: "Receive" },
                { icon: "↔", label: "Split" },
                { icon: "+", label: "Top Up" },
              ].map((action, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-lg">
                    {action.icon}
                  </div>
                  <span className="text-white/40 text-[10px]">{action.label}</span>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="text-white/40 text-xs mb-3">Today</div>
            <div className="space-y-3">
              {[
                { name: "Coffee Shop", amount: "-£4.50", time: "2m ago" },
                { name: "Alex sent you", amount: "+£25.00", time: "1h ago" },
              ].map((tx, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A962]/20 to-[#00D4FF]/20 flex items-center justify-center text-xs">
                    {tx.amount.startsWith('+') ? '↓' : '↑'}
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-sm">{tx.name}</div>
                    <div className="text-white/40 text-xs">{tx.time}</div>
                  </div>
                  <div className={`text-sm font-medium ${tx.amount.startsWith('+') ? 'text-[#4AD7A2]' : 'text-white'}`}>
                    {tx.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <div className="absolute -left-16 top-1/3 bg-[#0B1220]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl animate-fade-up" style={{ animationDelay: '1s' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#4AD7A2]/20 flex items-center justify-center">
            <span className="text-[#4AD7A2] text-sm">✓</span>
          </div>
          <div>
            <div className="text-white text-sm font-medium">Split Complete</div>
            <div className="text-white/40 text-xs">£24.50 each</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setShowCard(true)
  }, [])

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[#04060A]" />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(201, 169, 98, 0.15), transparent),
              radial-gradient(ellipse 60% 40% at 80% 60%, rgba(0, 212, 255, 0.1), transparent),
              radial-gradient(ellipse 50% 30% at 50% 80%, rgba(124, 92, 255, 0.1), transparent)
            `,
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* Floating orbs */}
      <FloatingOrb color="rgba(201, 169, 98, 0.3)" size={400} delay={0} duration={8} x="10%" y="20%" />
      <FloatingOrb color="rgba(0, 212, 255, 0.2)" size={300} delay={2} duration={10} x="70%" y="60%" />
      <FloatingOrb color="rgba(124, 92, 255, 0.2)" size={250} delay={4} duration={12} x="40%" y="70%" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#C9A962]/10 border border-[#C9A962]/20 mb-8 animate-fade-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A962] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A962]"></span>
              </span>
              <span className="text-sm font-medium text-[#C9A962]">Launching January 31, 2026</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="text-white">Split bills.</span>
              <br />
              <span className="text-white">Share wallets.</span>
              <br />
              <span className="bg-gradient-to-r from-[#C9A962] via-[#E5C77D] to-[#C9A962] bg-clip-text text-transparent">
                Live free.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-white/60 max-w-xl mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
              The only wallet that splits payments automatically.
              Create group wallets, get virtual cards, and never chase anyone for money again.
            </p>

            {/* CTA Form */}
            <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#C9A962]/50 focus:border-[#C9A962]/50 transition-all"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1E3A5F] hover:opacity-90 h-14 px-8 text-base font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#C9A962]/25"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#1E3A5F]/30 border-t-[#1E3A5F] rounded-full animate-spin" />
                      </span>
                    ) : (
                      <>
                        Get Early Access
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="flex items-center gap-3 bg-[#4AD7A2]/10 border border-[#4AD7A2]/30 rounded-xl px-6 py-4 max-w-md mx-auto lg:mx-0">
                  <div className="w-8 h-8 rounded-full bg-[#4AD7A2] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#4AD7A2] font-medium">You're on the list! We'll be in touch.</span>
                </div>
              )}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 mt-10 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <div className="w-5 h-5 rounded-full bg-[#4AD7A2]/20 flex items-center justify-center">
                  <span className="text-[#4AD7A2] text-xs">✓</span>
                </div>
                UK Regulated
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <div className="w-5 h-5 rounded-full bg-[#00D4FF]/20 flex items-center justify-center">
                  <span className="text-[#00D4FF] text-xs">✓</span>
                </div>
                Bank-Grade Security
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <div className="w-5 h-5 rounded-full bg-[#C9A962]/20 flex items-center justify-center">
                  <span className="text-[#C9A962] text-xs">✓</span>
                </div>
                Zero Fees
              </div>
            </div>
          </div>

          {/* Right: Phone mockup and card */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div
              className="relative"
              style={{
                transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <PhoneMockup />

              {/* Floating card */}
              <div className="absolute -right-20 bottom-20 hidden xl:block">
                <AnimatedCard isVisible={showCard} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/30" />
      </div>
    </section>
  )
}
