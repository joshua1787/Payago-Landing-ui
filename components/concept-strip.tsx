"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Cpu, Globe, Compass } from "lucide-react"

const concepts = [
  {
    icon: Cpu,
    title: "Intelligent",
    subtitle: "AI that adapts.",
    gradient: "from-[#00D4FF] to-[#00D4FF]/50",
    glow: "#00D4FF",
  },
  {
    icon: Globe,
    title: "Global",
    subtitle: "Connecting the world.",
    gradient: "from-[#7C5CFF] to-[#7C5CFF]/50",
    glow: "#7C5CFF",
  },
  {
    icon: Compass,
    title: "Exploratory",
    subtitle: "Beyond the ordinary.",
    gradient: "from-[#4AD7A2] to-[#4AD7A2]/50",
    glow: "#4AD7A2",
  },
]

function ConceptTile({ concept, index }: { concept: (typeof concepts)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const tileRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tileRef.current) return
    const rect = tileRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10
    setTransform({ x, y })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTransform({ x: 0, y: 0 })
  }

  const Icon = concept.icon

  return (
    <div
      ref={tileRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-default animate-fade-up"
      style={{
        animationDelay: `${0.7 + index * 0.1}s`,
        transform: `perspective(800px) rotateX(${transform.y}deg) rotateY(${-transform.x}deg)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 0.15 : 0,
          background: `radial-gradient(circle at center, ${concept.glow} 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      <div
        className={`relative glass rounded-2xl p-8 lg:p-10 transition-all duration-300 ${isHovered ? "border-white/20 scale-[1.02]" : "border-white/5"}`}
      >
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${concept.gradient} bg-opacity-10 flex items-center justify-center mb-6 transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}
          style={{
            boxShadow: isHovered ? `0 0 30px ${concept.glow}30` : "none",
          }}
        >
          <Icon className="w-7 h-7 transition-all duration-300" style={{ color: concept.glow }} />
        </div>

        {/* Text */}
        <h3 className="text-xl font-semibold mb-2 text-foreground">{concept.title}</h3>
        <p className="text-sm text-muted-foreground">{concept.subtitle}</p>
      </div>
    </div>
  )
}

export function ConceptStrip() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04060A] via-[#0B1220]/50 to-[#04060A]" />

      {/* Neural Network Connecting Lines (SVG) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <svg className="w-full h-full opacity-20">
          <defs>
            <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#7C5CFF" stopOpacity="1" />
              <stop offset="100%" stopColor="#4AD7A2" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 200,300 Q 600,100 1000,300"
            fill="none"
            stroke="url(#neural-gradient)"
            strokeWidth="2"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {concepts.map((concept, index) => (
            <ConceptTile key={concept.title} concept={concept} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
