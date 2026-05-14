"use client"

import { Sparkles, ArrowRight, Users, Zap, ChevronDown, Globe, Check } from "lucide-react"
import { captureEvent } from "@/lib/analytics"
import { OptimizedPicture } from "./optimized-picture"

const TYPING_TEXTS = [
  "7 days in Japan for 2 people, £3,500 budget, love street food and temples",
  "Weekend city break in Barcelona with my partner, under £600",
  "10-day Greek island hopping trip for 6 friends in August",
  "3-night Paris trip for our anniversary, premium hotels only",
]

function TypingAnimation() {
  return (
    <span className="text-slate-700 font-light text-[15px]">
      {TYPING_TEXTS[0]}
      <span className="inline-block w-[2px] h-[18px] bg-gradient-to-b from-cyan-400 to-blue-500 ml-0.5 align-middle" />
    </span>
  )
}

/* Light airy background with soft color blobs */
function LightBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* ── Base: warm off-white ── */}
      <div className="absolute inset-0 bg-[#FAFAF8]" />

      {/* Paint-cheap atmosphere. Avoid giant blur filters on the scroll path. */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 55% 55% at 10% 0%, rgba(0,212,255,0.16), transparent 64%)",
            "radial-gradient(ellipse 44% 62% at 98% 18%, rgba(124,92,255,0.11), transparent 65%)",
            "radial-gradient(ellipse 42% 40% at 28% 92%, rgba(201,169,98,0.12), transparent 68%)",
            "radial-gradient(ellipse 34% 34% at 82% 86%, rgba(74,215,162,0.1), transparent 70%)",
          ].join(", "),
        }}
      />

      {/* ── Subtle dot grid ── */}
      <div className="absolute inset-0" style={{
        opacity: 0.05,
        backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* ── Bottom fade ── */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#EEF9FF] to-transparent" />
    </div>
  )
}

/* PayaGo AI Trip Builder — phone mockup (kept dark as it's a device screen) */
function PhoneMockup() {
  const options = [
    { label: "Budget", price: "£620", per: "/pp", color: "#4AD7A2", flight: "Flight option · 1 stop", hotel: "Shinjuku city stay" },
    { label: "Balanced", price: "£780", per: "/pp", color: "#C9A962", flight: "Direct flight option", hotel: "Shibuya skyline stay", best: true },
    { label: "Premium", price: "£980", per: "/pp", color: "#7C5CFF", flight: "Premium cabin option", hotel: "Tokyo premium stay" },
  ]

  const members = [
    { initial: "Y", gradient: "from-cyan-400 to-blue-500", voted: true },
    { initial: "S", gradient: "from-purple-400 to-pink-500", voted: true },
    { initial: "M", gradient: "from-amber-400 to-orange-500", voted: true },
    { initial: "P", gradient: "from-emerald-400 to-teal-500", voted: false },
  ]

  return (
    <div className="relative w-full max-w-[360px] mx-auto group/phone">
      {/* Ambient glow */}
      <div className="absolute -inset-6 rounded-[4rem] bg-gradient-to-br from-[#C9A962]/10 via-[#7C5CFF]/5 to-[#00D4FF]/10 opacity-40" />

      {/* Side buttons */}
      <div className="absolute top-24 -left-[2px] w-1 h-8 bg-[#334155] rounded-l-md" />
      <div className="absolute top-36 -left-[2px] w-1 h-12 bg-[#334155] rounded-l-md" />
      <div className="absolute top-28 -right-[2px] w-1 h-16 bg-[#334155] rounded-r-md" />

      {/* Chassis */}
      <div className="relative bg-[#1e293b] rounded-[3.5rem] p-[4px] shadow-md shadow-slate-900/15 ring-1 ring-white/[0.06]">
        <div className="relative bg-[#0f172a] rounded-[3.3rem] p-[6px] border-[2px] border-[#2d3f55]">
          {/* Glass reflection */}
          <div className="absolute inset-[6px] rounded-[3rem] bg-gradient-to-tr from-white/[0.04] via-transparent to-transparent pointer-events-none z-30 mix-blend-overlay" />

          <div className="relative bg-[#04060A] rounded-[3rem] overflow-hidden h-[680px] flex flex-col">

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
              <OptimizedPicture
                src="/images/travel-tokyo.webp"
                alt="Tokyo"
                className="block w-full h-full"
                imgClassName="w-full h-full object-cover opacity-90"
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 768px) 360px, 80vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04060A]/90 via-[#04060A]/30 to-transparent" />
              {/* AI badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 border border-white/10 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-[#C9A962]" />
                <span className="text-[10px] font-bold text-white/80">AI draft ready</span>
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
                <div className="w-1.5 h-1.5 rounded-full bg-[#4AD7A2]" />
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
                      boxShadow: "none",
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

            {/* ── Floating group review badge ── */}
            <div className="absolute -left-8 bottom-36 z-30">
              <div className="bg-[#0D1B2A] border border-[#00D4FF]/25 px-4 py-3 rounded-2xl shadow-sm flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-[#7C5CFF]/20 border border-[#00D4FF]/30 flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#00D4FF]" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#4AD7A2] border border-[#0D1B2A]" />
                </div>
                <div>
                  <div className="text-white text-[11px] font-bold leading-tight">Group review</div>
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
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <LightBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 lg:gap-12 items-center">

          {/* Left — Copy */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-100 border border-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[12px] text-slate-500 font-medium tracking-wide uppercase">AI Travel Planning</span>
              <span className="w-[1px] h-3 bg-slate-300" />
              <span className="text-[12px] bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent font-semibold tracking-wide">Early Access Open</span>
            </div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-[5rem] font-bold tracking-[-0.04em] leading-[0.98]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              <span className="text-slate-900">Speak the trip.</span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #00d4ff, #7c5cff, #4ad7a2)" }}
              >
                We&apos;ll do the rest.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[17px] text-slate-500 max-w-[480px] leading-[1.75]">
              Describe your dream trip in plain English. PayaGo AI drafts itinerary options, your group can review and vote, and booking next steps stay clear when supported.
            </p>

            {/* Waitlist CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              {[
                { eyebrow: "Early access", label: "Join Waitlist", ariaLabel: "Join the PayaGo early-access waitlist", analyticsId: "primary" },
                { eyebrow: "Product updates", label: "Get Updates", ariaLabel: "Get PayaGo product updates", analyticsId: "secondary" },
              ].map((cta) => (
                <a
                  key={cta.label}
                  href="/early-access/"
                  className="group/store inline-flex items-center gap-3 rounded-2xl bg-slate-950 px-5 py-3 text-white shadow-sm transition-colors duration-200 hover:bg-slate-800"
                  aria-label={cta.ariaLabel}
                  onClick={() => captureEvent("hero_cta_click", { cta: cta.analyticsId })}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg font-black">
                    {cta.analyticsId === "primary" ? "W" : "U"}
                  </span>
                  <span className="text-left leading-none">
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-white/50">{cta.eyebrow}</span>
                    <span className="mt-1 block text-sm font-bold">{cta.label}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-60 group-hover/store:opacity-100" />
                </a>
              ))}
            </div>
            <p className="text-center text-xs text-slate-400 lg:text-left">
              Free to plan. No card required for the AI demo.
            </p>

            {/* AI Input — Premium */}
            <div>
              <div className="relative group max-w-xl">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl opacity-60" />

                <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-5 min-h-[80px]">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase tracking-[0.25em] mb-3">
                      <Sparkles className="w-3 h-3 text-cyan-500" />
                      Describe your trip
                    </div>
                    <div className="text-[16px] leading-relaxed text-slate-700 font-light">
                      <TypingAnimation />
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                      <Zap className="w-3 h-3" /> PayaGo AI · draft preview
                    </div>
                    <a
                      href="/early-access/"
                      className="relative group/btn overflow-hidden bg-slate-900 text-white px-7 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors duration-200 hover:bg-slate-800"
                      onClick={() => captureEvent("hero_waitlist_input_cta_click")}
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        Join Waitlist <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Value props */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
              {[
                { icon: Sparkles, text: "AI itinerary drafts", color: "text-cyan-500" },
                { icon: Users, text: "Shared group review", color: "text-violet-500" },
                { icon: Globe, text: "Supported booking handoff", color: "text-emerald-500" },
              ].map((p) => (
                <div key={p.text} className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <p.icon className={`w-4 h-4 ${p.color}`} />
                  <span>{p.text}</span>
                </div>
              ))}
            </div>

            {/* Product capability row */}
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 justify-center lg:justify-start">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 whitespace-nowrap">Inside PayaGo</span>
                {[
                  { name: "AI trip builder", color: "#00A7CF", bg: "#00A7CF12" },
                  { name: "Voice input", color: "#7C5CFF", bg: "#7C5CFF12" },
                  { name: "Group voting", color: "#EC4899", bg: "#EC489912" },
                  { name: "Split-cost preview", color: "#10B981", bg: "#10B98112" },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors duration-200"
                    style={{ borderColor: p.color + "30", background: p.bg, color: p.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — 3D Phone */}
          <div className="hidden lg:block">
            <div>
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-slate-400" />
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
      </div>
    </section>
  )
}
