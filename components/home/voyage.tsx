"use client"

import { useEffect, useRef, useState } from "react"

import { captureEvent } from "@/lib/analytics"
import { between, clamp01 } from "@/lib/universe/chapters"
import type { Voyage as VoyageScene } from "@/lib/universe/voyage"

const APP_URL = "https://app.payago.in"
const PLAY_URL = "https://play.google.com/store/apps/details?id=com.payago.app"

const SCENES = [
  { id: "open", from: 0, to: 0.07 },
  { id: "flight", from: 0.09, to: 0.22 },
  { id: "beach", from: 0.27, to: 0.37 },
  { id: "hotel", from: 0.43, to: 0.58 },
  { id: "jump", from: 0.63, to: 0.82 },
  { id: "all", from: 0.9, to: 1 },
] as const

const headline = "font-display font-semibold tracking-[-0.035em] text-white [text-shadow:0_2px_30px_rgba(10,16,40,0.55)]"
const body = "mt-3 max-w-[27rem] text-[17px] leading-[1.5] text-white/95 [text-shadow:0_1px_18px_rgba(10,16,40,0.7)] sm:text-[19px]"

function Coming() {
  return <p className="inline-block rounded-full border border-white/50 bg-[#0F172A]/35 px-3 py-1 text-[13px] font-medium text-white backdrop-blur">Trips: coming</p>
}

export function Voyage() {
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const veil = useRef<HTMLDivElement>(null)
  const panels = useRef<Partial<Record<string, HTMLDivElement | null>>>({})
  const [noScene, setNoScene] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)

  useEffect(() => {
    const box = track.current
    const element = canvas.current
    if (!box || !element) return
    setIsAndroid(/android/i.test(navigator.userAgent))
    let scene: VoyageScene | null = null
    let disposed = false
    let cleanup = () => {}

    const progressNow = () => {
      const rect = box.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      return span <= 0 ? 0 : clamp01(-rect.top / span)
    }
    const paint = () => {
      const p = progressNow()
      scene?.setProgress(p)
      SCENES.forEach(({ id, from, to }) => {
        const panel = panels.current[id]
        if (!panel) return
        const fade = Math.min(0.02, (to - from) * 0.25)
        const enter = id === "open" ? 1 : between(p, from, from + fade)
        const leave = id === "all" ? 0 : between(p, to - fade, to)
        const opacity = enter * (1 - leave)
        panel.style.opacity = String(opacity)
        panel.style.transform = `translate3d(0, ${(1 - enter) * 26 - leave * 26}px, 0)`
        panel.style.visibility = opacity < 0.01 ? "hidden" : "visible"
        panel.style.pointerEvents = opacity > 0.6 ? "auto" : "none"
      })
      // The sky brightens into the next part of the page.
      if (veil.current) veil.current.style.opacity = String(between(p, 0.985, 1))
    }
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        paint()
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    paint()

    const boot = async () => {
      const probe = document.createElement("canvas")
      if (!probe.getContext("webgl2") && !probe.getContext("webgl")) {
        setNoScene(true)
        return
      }
      try {
        const { Voyage: Scene } = await import("@/lib/universe/voyage")
        if (disposed) return
        const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        scene = new Scene(element, { mobile: window.innerWidth < 900 || navigator.maxTouchPoints > 0, still })
        const running = scene
        paint()
        if (progressNow() < 0.004) running.playOpening()
        captureEvent("home_voyage_shown")
        const resize = new ResizeObserver(() => running.resize())
        resize.observe(element.parentElement ?? element)
        const seen = new IntersectionObserver(([entry]) => {
          if (still) return
          if (entry.isIntersecting) running.start()
          else running.stop()
        })
        if (stage.current) seen.observe(stage.current)
        if (!still) running.start()
        cleanup = () => {
          resize.disconnect()
          seen.disconnect()
          running.dispose()
          scene = null
        }
      } catch {
        setNoScene(true)
      }
    }
    // Built only when it's about to be seen: a link further down the page shouldn't pay for it.
    const nearby = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        nearby.disconnect()
        void boot()
      },
      { rootMargin: "100% 0px" },
    )
    nearby.observe(box)

    return () => {
      disposed = true
      nearby.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cleanup()
    }
  }, [])

  const setPanel = (id: string) => (element: HTMLDivElement | null) => {
    panels.current[id] = element
  }
  const panelClass = "absolute inset-x-0 bottom-0 top-0 mx-auto flex max-w-7xl flex-col justify-end px-6 pb-12 will-change-transform lg:justify-center lg:pb-0"

  return (
    <div ref={track} className="relative h-[1100vh]" data-testid="voyage">
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden bg-[#1F6FE0]">
        <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        {noScene && <div className="absolute inset-0 bg-[linear-gradient(170deg,#1F6FE0,#BFEAFF_55%,#FFD79B)]" />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/55 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0F172A]/45 lg:via-[#0F172A]/8 lg:to-transparent" />

        <div ref={setPanel("open")} className={panelClass}>
          <div className="max-w-[38rem]">
            <h1 className={`${headline} text-[clamp(2.9rem,6vw,5.4rem)] leading-[1.02]`}>
              <span className="block">Plan every trip.</span>
              <span className="block">Split every bill.</span>
            </h1>
            <p className={body}>Say where you want to go. AI plans the whole trip, you book it all in one app, and the cost splits across the group. Trips are coming. Splitting works today.</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="/early-access/" className="rounded-full bg-white px-7 py-3.5 font-display text-[15px] font-semibold text-[#0F172A] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2">
                Join the trips waitlist
              </a>
              <a href={isAndroid ? PLAY_URL : APP_URL} className="rounded-full border border-white/60 px-6 py-3.5 font-display text-[15px] font-semibold text-white backdrop-blur hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Split a bill today
              </a>
            </div>
          </div>
        </div>

        <div ref={setPanel("flight")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[30rem]">
            <Coming />
            <h2 className={`${headline} mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.03]`}>Every trip starts with the flight.</h2>
            <p className={body}>Tell PayaGo where you&apos;re going. AI finds the route and books the whole group together.</p>
          </div>
        </div>
        <div ref={setPanel("beach")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[30rem]">
            <Coming />
            <h2 className={`${headline} mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.03]`}>Land where you meant to be.</h2>
            <p className={body}>Airport transfers, cabs, car hire and an eSIM, sorted before you pack.</p>
          </div>
        </div>
        <div ref={setPanel("hotel")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[30rem]">
            <Coming />
            <h2 className={`${headline} mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.03]`}>Walk straight into your hotel.</h2>
            <p className={body}>Pick basic, standard or premium. The rooms are in the same plan as the flights.</p>
          </div>
        </div>
        <div ref={setPanel("jump")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[30rem]">
            <Coming />
            <h2 className={`${headline} mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.03]`}>Then do something you&apos;ll talk about for years.</h2>
            <p className={body}>Bungee jumps, tours and tables for six, booked inside the plan.</p>
          </div>
        </div>
        <div ref={setPanel("all")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[32rem]">
            <Coming />
            <h2 className={`${headline} mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.03]`}>One trip. One app. One plan.</h2>
            <p className={body}>Everything above, and the bill splits itself across the group.</p>
          </div>
        </div>
        <div ref={veil} className="pointer-events-none absolute inset-0 bg-[#FFF3E2]" style={{ opacity: 0 }} />
      </div>
    </div>
  )
}
