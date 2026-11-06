"use client"

import { useEffect, useRef, useState } from "react"

import { LIVE_FROM, ZOOM_FROM, ZOOM_TO, createPhoneGate } from "@/components/home/phone-gate"
import { filmSize } from "@/components/home/scene-clip"
import { useLocalMoney } from "@/lib/use-local-money"
import { between, clamp01 } from "@/lib/universe/chapters"

const APP_URL = "https://app.payago.in"
const PLAY_URL = "https://play.google.com/store/apps/details?id=com.payago.app"

// "open" and "live" are shares of the whole track. The flight runs from 0 to 1 after the opening.
const SCENES = [
  { id: "open", from: 0, to: LIVE_FROM - 0.004 },
  { id: "live", from: LIVE_FROM, to: ZOOM_FROM },
  { id: "flight", from: 0.04, to: 1 },
] as const

const headline = "font-display font-semibold tracking-[-0.035em] text-white [text-shadow:0_2px_30px_rgba(10,16,40,0.55)]"
const body = "mt-3 max-w-[27rem] text-[17px] leading-[1.5] text-white/95 [text-shadow:0_1px_18px_rgba(10,16,40,0.7)] sm:text-[19px]"

// Below zero during the opening, so the flight waits for the camera to come through the "o".
const filmAt = (scroll: number) => (scroll - ZOOM_TO) / (1 - ZOOM_TO)

function Coming() {
  return <p className="inline-block rounded-full border border-white/50 bg-[#0F172A]/35 px-3 py-1 text-[13px] font-medium text-white">Trips: coming</p>
}

/** The opening: a phone in the film's sky, a camera that flies through its "o", and the flight beyond. */
export function Film() {
  const track = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const intro = useRef<HTMLDivElement>(null)
  const gateCanvas = useRef<HTMLCanvasElement>(null)
  const gate = useRef<ReturnType<typeof createPhoneGate>>(null)
  const introShade = useRef<HTMLDivElement>(null)
  const panels = useRef<Partial<Record<string, HTMLDivElement | null>>>({})
  const [isAndroid, setIsAndroid] = useState(false)
  const money = useLocalMoney()

  useEffect(() => {
    const box = track.current
    const stage = stageRef.current
    const video = videoRef.current
    if (!box || !stage || !video) return
    setIsAndroid(/android/i.test(navigator.userAgent))

    const { shape, size } = filmSize()
    video.poster = `/film/flight-${shape}.jpg`
    video.src = `/film/flight-${size}.mp4`

    // iPhones in Low Power Mode won't play video, so the flight's last frame is shown instead.
    let playable = true
    let disposed = false
    const roll = (rolling: boolean) => {
      if (!rolling) {
        if (!video.paused) video.pause()
        if (video.currentTime > 0.05) video.currentTime = 0
        return
      }
      if (!playable || !video.paused || video.ended) return
      video.play().catch(() => {
        if (disposed) return
        playable = false
        if (video.duration) video.currentTime = video.duration - 0.05
      })
    }

    const progressNow = () => {
      const rect = box.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      return span <= 0 ? 0 : clamp01(-rect.top / span)
    }
    const heading = box.querySelector("h1")
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const opening = gateCanvas.current && heading ? createPhoneGate(gateCanvas.current, heading, still) : null
    gate.current = opening
    const onResize = () => {
      lastScroll = -1
      opening?.resize()
    }
    window.addEventListener("resize", onResize)
    let frame = 0
    let lastScroll = -1
    const paint = () => {
      frame = requestAnimationFrame(paint)
      const scroll = progressNow()
      const p = filmAt(scroll)
      // The flight starts as the camera comes out of the "o", so the plane never shows inside the letter.
      roll(scroll >= ZOOM_TO - (ZOOM_TO - ZOOM_FROM) * 0.06)
      const layer = intro.current
      const inOpening = scroll < ZOOM_TO
      if (opening && layer && inOpening) {
        const now = performance.now()
        opening.draw(scroll, now)
        layer.style.background = "none"
        // The sky breathes slowly behind the phone, and settles as the camera flies in.
        const breath = still ? 0.04 : 0.04 + Math.sin(now / 5200) * 0.012
        stage.style.transform = `scale(${1 + breath * (1 - between(scroll, ZOOM_FROM, ZOOM_TO))})`
      }
      if (scroll === lastScroll) return
      lastScroll = scroll
      if (layer) layer.style.visibility = inOpening ? "visible" : "hidden"
      if (!inOpening) stage.style.transform = "none"
      if (introShade.current) introShade.current.style.opacity = String(1 - between(scroll, ZOOM_FROM - 0.012, ZOOM_FROM + 0.004))
      SCENES.forEach(({ id, from, to }) => {
        const panel = panels.current[id]
        if (!panel) return
        const at = id === "flight" ? p : scroll
        const fade = Math.min(0.03, (to - from) * 0.25)
        const enter = id === "open" ? 1 : between(at, from, from + fade)
        const leave = id === "flight" ? 0 : between(at, to - fade, to)
        const opacity = enter * (1 - leave)
        panel.style.opacity = String(opacity)
        panel.style.transform = `translate3d(0, ${(1 - enter) * 26 - leave * 26}px, 0)`
        panel.style.visibility = opacity < 0.01 ? "hidden" : "visible"
        panel.style.pointerEvents = opacity > 0.6 ? "auto" : "none"
      })
    }
    paint()
    return () => {
      disposed = true
      video.pause()
      opening?.dispose()
      gate.current = null
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const [first] = money.orbitCards
    gate.current?.setExample({ message: money.expenseChips[0], label: first.label, amount: first.amount, share: first.detail })
  }, [money])

  const setPanel = (id: string) => (element: HTMLDivElement | null) => {
    panels.current[id] = element
  }
  const panelClass = "absolute inset-x-0 bottom-0 top-0 mx-auto flex max-w-7xl flex-col justify-end px-6 pb-12 will-change-transform lg:justify-center lg:pb-0"

  return (
    <div ref={track} className="relative h-[500vh]" data-testid="film">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#E8C98F]">
        <link rel="preload" as="image" href="/film/flight-wide.jpg" media="(min-width: 700px)" />
        <link rel="preload" as="image" href="/film/flight-tall.jpg" media="(max-width: 699px)" />
        <div ref={stageRef} aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <video ref={videoRef} muted playsInline preload="auto" disablePictureInPicture className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-[#0F172A]/10 to-transparent lg:bg-gradient-to-r lg:from-[#0F172A]/55 lg:via-[#0F172A]/10 lg:to-transparent" />
        <div ref={intro} aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#E8C98F]">
          <canvas ref={gateCanvas} className="absolute inset-0 h-full w-full" />
          <div ref={introShade} className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/45 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0F172A]/45 lg:via-transparent" />
        </div>
        <div ref={setPanel("open")} className={panelClass}>
          <div className="max-w-[38rem]">
            <h1 className={`${headline} text-[clamp(2.9rem,6vw,5.4rem)] leading-[1.02] [@media(max-height:700px)_and_(max-width:1023px)]:text-[2.4rem]`}>
              <span className="block">Plan every trip.</span>
              <span className="block">Split every bill.</span>
            </h1>
            <p className={`${body} [@media(max-height:700px)_and_(max-width:1023px)]:text-[15px]`}>Say where you want to go. AI plans the whole trip, you book it all in one app, and the cost splits across the group. Trips are coming. Splitting works today.</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="/early-access/" className="rounded-full bg-white px-7 py-3.5 font-display text-[15px] font-semibold text-[#0F172A] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2">
                Join the trips waitlist
              </a>
              <a href={isAndroid ? PLAY_URL : APP_URL} className="rounded-full border border-white/70 bg-[#0F172A]/35 px-6 py-3.5 font-display text-[15px] font-semibold text-white hover:bg-[#0F172A]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Split a bill today
              </a>
            </div>
            <p className="mt-4 text-[14px] leading-[1.45] text-white/90 [text-shadow:0_1px_18px_rgba(10,16,40,0.7)]">Free to start, in India and the UK. Works in your browser or on Android.</p>
          </div>
        </div>
        <div ref={setPanel("live")} className={panelClass} style={{ opacity: 0 }} data-testid="film-live">
          <div className="max-w-[30rem]">
            <p className="inline-block rounded-full border border-white/50 bg-[#0F172A]/35 px-3 py-1 text-[13px] font-medium text-white">Live today</p>
            <h2 className={`${headline} mt-3 text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.04]`}>Send a bill. Everyone sees their share.</h2>
            <p className="mt-3 max-w-[27rem] text-[15px] leading-[1.45] text-white/95 [text-shadow:0_1px_18px_rgba(10,16,40,0.7)]">Your friends sign up free, then you add them to the group by email.</p>
            <a href={APP_URL} className="mt-3 inline-block font-display text-[15px] font-semibold text-white underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              See an example group
            </a>
          </div>
        </div>
        <div ref={setPanel("flight")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[30rem]">
            <Coming />
            <h2 className={`${headline} mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.03]`}>Every trip starts with the flight.</h2>
            <p className={body}>Tell PayaGo where you&apos;re going. AI plans it, and books the flights, trains, cabs and eSIM for the whole group together.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
