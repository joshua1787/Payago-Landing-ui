"use client"

import { useEffect, useRef, useState } from "react"

import { between, clamp01 } from "@/lib/universe/chapters"

const APP_URL = "https://app.payago.in"
const PLAY_URL = "https://play.google.com/store/apps/details?id=com.payago.app"
const FRAME_COUNT = Number(process.env.NEXT_PUBLIC_FILM_FRAMES ?? 1120)
// Phones get a lighter set of frames: 29 MB in all, against 55 MB.
const frameSrc = (i: number, small: boolean) => `/film/${small ? "m/" : ""}f${String(i + 1).padStart(4, "0")}.webp`
// Only frames near the viewer are downloaded, so nobody pays for the whole film to see the start of it.
const FETCH_AHEAD = 180

const SCENES = [
  { id: "open", from: 0, to: 0.022 },
  { id: "flight", from: 0.107, to: 0.181 },
  { id: "land", from: 0.208, to: 0.281 },
  { id: "cab", from: 0.308, to: 0.383 },
  { id: "hotel", from: 0.429, to: 0.563 },
  { id: "train", from: 0.589, to: 0.67 },
  { id: "places", from: 0.71, to: 0.777 },
  { id: "split", from: 0.847, to: 0.896 },
  { id: "all", from: 0.938, to: 1.0 },
] as const

const headline = "font-display font-semibold tracking-[-0.035em] text-white [text-shadow:0_2px_30px_rgba(10,16,40,0.55)]"
const body = "mt-3 max-w-[27rem] text-[17px] leading-[1.5] text-white/95 [text-shadow:0_1px_18px_rgba(10,16,40,0.7)] sm:text-[19px]"

// A tall screen only fits the middle of a wide film, so on phones the frame pans to keep the
// subject in view: film progress, then how far across the picture to look, in percent.
const PHONE_PAN: [number, number][] = [
  [0, 50],
  [0.05, 50],
  [0.11, 72],
  [0.2, 70],
  [0.29, 48],
  [0.42, 50],
  [0.86, 50],
  [0.885, 76],
  [0.895, 78],
  [0.905, 50],
  [0.96, 60],
  [1, 72],
]
function panAt(p: number) {
  let i = 0
  while (i < PHONE_PAN.length - 2 && p > PHONE_PAN[i + 1][0]) i++
  const [fromP, fromX] = PHONE_PAN[i]
  const [toP, toX] = PHONE_PAN[i + 1]
  return fromX + (toX - fromX) * between(p, fromP, toP)
}

// Where the drawn phone hands over to the film, as a share of the page: the film is in the clouds by then.
const INTRO_END = 0.067

function Coming() {
  return <p className="inline-block rounded-full border border-white/50 bg-[#0F172A]/35 px-3 py-1 text-[13px] font-medium text-white">Trips: coming</p>
}

/** The film is a stack of still frames, so scrolling can move it forward and back with no lag. */
export function Film() {
  const track = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const veil = useRef<HTMLDivElement>(null)
  const intro = useRef<HTMLDivElement>(null)
  const phone = useRef<HTMLDivElement>(null)
  const flash = useRef<HTMLDivElement>(null)
  const sheen = useRef<HTMLDivElement>(null)
  const introShade = useRef<HTMLDivElement>(null)
  const panels = useRef<Partial<Record<string, HTMLDivElement | null>>>({})
  const [isAndroid, setIsAndroid] = useState(false)

  useEffect(() => {
    const box = track.current
    const element = canvas.current
    const ctx = element?.getContext("2d", { alpha: false, desynchronized: true })
    if (!box || !element || !ctx) return
    setIsAndroid(/android/i.test(navigator.userAgent))

    // Compressed frames stay in memory, and only those near the viewer are kept unpacked.
    // Unpacking happens off the main thread, so drawing a frame is nearly free.
    const small = window.innerWidth < 900 || navigator.maxTouchPoints > 0
    const blobs: (Blob | undefined)[] = new Array(FRAME_COUNT)
    const bitmaps = new Map<number, ImageBitmap>()
    const unpacking = new Set<number>()
    const WINDOW = 36
    let shown = 0
    let drawn = -1
    let disposed = false

    const unpack = (i: number) => {
      const blob = blobs[i]
      if (!blob || bitmaps.has(i) || unpacking.has(i)) return
      unpacking.add(i)
      void createImageBitmap(blob).then((bitmap) => {
        unpacking.delete(i)
        if (disposed || Math.abs(i - shown) > WINDOW) {
          bitmap.close()
          return
        }
        bitmaps.set(i, bitmap)
        if (i === Math.round(shown)) drawn = -1
      })
    }
    const tidy = () => {
      const centre = Math.round(shown)
      bitmaps.forEach((bitmap, i) => {
        if (Math.abs(i - centre) > WINDOW) {
          bitmap.close()
          bitmaps.delete(i)
        }
      })
      for (let d = 0; d <= WINDOW && unpacking.size < 4; d++) {
        if (centre + d < FRAME_COUNT) unpack(centre + d)
        if (centre - d >= 0) unpack(centre - d)
      }
    }

    // Download from where the viewer is, outward, a few at a time.
    let active = 0
    let idle = false
    const fetchNext = () => {
      while (active < 6 && !disposed) {
        const centre = Math.round(shown)
        let next = -1
        for (let d = 0; d < FETCH_AHEAD && next < 0; d++) {
          for (const i of [centre + d, centre - d]) {
            if (i >= 0 && i < FRAME_COUNT && !blobs[i] && !requested.has(i)) {
              next = i
              break
            }
          }
        }
        if (next < 0) {
          idle = true
          return
        }
        requested.add(next)
        active++
        const index = next
        void fetch(frameSrc(index, small))
          .then((response) => response.blob())
          .then((blob) => {
            blobs[index] = blob
          })
          .finally(() => {
            active--
            fetchNext()
          })
      }
    }
    const requested = new Set<number>()

    const progressNow = () => {
      const rect = box.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      return span <= 0 ? 0 : clamp01(-rect.top / span)
    }
    /** The nearest frame ready to draw, so a fast scroll never shows a blank. */
    const nearest = (i: number) => {
      for (let d = 0; d <= WINDOW; d++) {
        const ahead = bitmaps.get(i + d)
        if (ahead) return ahead
        const behind = bitmaps.get(i - d)
        if (behind) return behind
      }
      return null
    }
    // The opening phone is drawn by the browser, not taken from the film, so it's sharp on any
    // screen at any zoom. Sizes are set directly rather than scaled, so the text is redrawn each time.
    const paintIntro = (p: number) => {
      const layer = intro.current
      const body = phone.current
      if (!layer || !body) return
      const gone = between(p, INTRO_END, INTRO_END + 0.012)
      layer.style.opacity = String(1 - gone)
      layer.style.visibility = gone >= 1 ? "hidden" : "visible"
      if (gone >= 1) return
      const vw = window.innerWidth
      const vh = window.innerHeight
      const wide = vw >= 1024
      const startHeight = wide ? vh * 0.74 : vh * 0.5
      const fill = Math.max(vw / (startHeight * 0.45), vh / (startHeight * 0.92)) * 1.2
      const t = between(p, 0.021, INTRO_END - 0.002)
      const scale = Math.exp(Math.log(fill) * t * t)
      const move = Math.min(1, t * 2.2)
      const x = (wide ? 0.69 : 0.5) + ((wide ? -0.19 : 0) * move)
      const y = (wide ? 0.53 : 0.36) + ((wide ? -0.03 : 0.14) * move)
      body.style.fontSize = `${(startHeight * scale) / 100}px`
      body.style.left = `${x * 100}%`
      body.style.top = `${y * 100}%`
      body.style.transform = `translate(-50%, -50%) rotate(${(1 - move) * 2.4}deg)`
      if (sheen.current) sheen.current.style.transform = `translateX(${-60 + p * 2200}%) skewX(-18deg)`
      if (introShade.current) introShade.current.style.opacity = String(1 - between(p, 0.014, 0.024))
      if (flash.current) flash.current.style.opacity = String(between(p, INTRO_END - 0.011, INTRO_END))
    }
    const onResize = () => {
      lastP = -1
    }
    window.addEventListener("resize", onResize)
    let frame = 0
    let lastP = -1
    let panned = -1
    const tall = window.innerWidth < window.innerHeight
    const paint = () => {
      const p = progressNow()
      // The film catches up with the scroll over a few frames, so wheel steps read as one glide.
      shown += (p * (FRAME_COUNT - 1) - shown) * 0.2
      const index = Math.round(shown)
      if (tall && index !== panned) {
        panned = index
        element.style.objectPosition = `${panAt(shown / (FRAME_COUNT - 1)).toFixed(1)}% 50%`
      }
      if (index !== drawn) {
        tidy()
        if (idle) {
          idle = false
          fetchNext()
        }
        const bitmap = nearest(index)
        if (bitmap) {
          // Drawn at its own size. The browser's graphics chip does the scaling.
          if (element.width !== bitmap.width) {
            element.width = bitmap.width
            element.height = bitmap.height
          }
          ctx.drawImage(bitmap, 0, 0)
          if (bitmap === bitmaps.get(index)) drawn = index
        }
      }
      frame = requestAnimationFrame(paint)
      if (p === lastP) return
      lastP = p
      paintIntro(p)
      SCENES.forEach(({ id, from, to }) => {
        const panel = panels.current[id]
        if (!panel) return
        const fade = Math.min(0.03, (to - from) * 0.25)
        const enter = id === "open" ? 1 : between(p, from, from + fade)
        const leave = id === "all" ? 0 : between(p, to - fade, to)
        const opacity = enter * (1 - leave)
        panel.style.opacity = String(opacity)
        panel.style.transform = `translate3d(0, ${(1 - enter) * 26 - leave * 26}px, 0)`
        panel.style.visibility = opacity < 0.01 ? "hidden" : "visible"
        panel.style.pointerEvents = opacity > 0.6 ? "auto" : "none"
      })
      if (veil.current) veil.current.style.opacity = String(between(p, 0.99, 1))
    }
    fetchNext()
    paint()
    return () => {
      disposed = true
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(frame)
      bitmaps.forEach((bitmap) => bitmap.close())
    }
  }, [])

  const setPanel = (id: string) => (element: HTMLDivElement | null) => {
    panels.current[id] = element
  }
  const panelClass = "absolute inset-x-0 bottom-0 top-0 mx-auto flex max-w-7xl flex-col justify-end px-6 pb-12 will-change-transform lg:justify-center lg:pb-0"

  return (
    <div ref={track} className="relative h-[2900vh]" data-testid="film">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#E8C98F]">
        <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-[#0F172A]/10 to-transparent lg:bg-gradient-to-r lg:from-[#0F172A]/55 lg:via-[#0F172A]/10 lg:to-transparent" />
        <div ref={intro} aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_68%_50%,#111a44_0%,#080c20_42%,#03050d_100%)]">
          <div
            ref={phone}
            className="absolute"
            style={{ left: "69%", top: "53%", width: "48.6em", height: "100em", fontSize: "0.74vh", transform: "translate(-50%, -50%) rotate(2.4deg)", contain: "layout style" }}
          >
            {/* The screen's light in the air around the phone, and on the floor beneath it. */}
            <div className="absolute" style={{ inset: "-42em -62em", background: "radial-gradient(closest-side, rgba(70,110,255,.55), rgba(112,60,240,.26) 48%, transparent 100%)" }} />
            <div className="absolute" style={{ left: "-8em", right: "-8em", top: "104em", height: "16em", background: "radial-gradient(closest-side, rgba(124,70,245,.5), transparent)" }} />
            {[
              { top: "19em", height: "6em", side: "-0.42em" },
              { top: "29em", height: "11em", side: "-0.42em" },
              { top: "42em", height: "11em", side: "-0.42em" },
            ].map((button) => (
              <div key={button.top} className="absolute rounded-l-[0.4em] bg-gradient-to-b from-[#59627c] to-[#2a3047]" style={{ top: button.top, height: button.height, left: button.side, width: "0.5em" }} />
            ))}
            <div className="absolute rounded-r-[0.4em] bg-gradient-to-b from-[#59627c] to-[#2a3047]" style={{ top: "33em", height: "16em", right: "-0.42em", width: "0.5em" }} />
            <div
              className="absolute inset-0"
              style={{ borderRadius: "8.2em", background: "linear-gradient(135deg,#7f89a6 0%,#262c42 22%,#11152a 55%,#3c4560 82%,#8d97b3 100%)", boxShadow: "0 3em 9em rgba(0,0,0,.7)" }}
            />
            <div className="absolute" style={{ inset: "0.55em", borderRadius: "7.7em", background: "#02030a" }} />
            <div className="absolute overflow-hidden" style={{ inset: "1.75em", borderRadius: "6.6em", background: "linear-gradient(168deg,#21c4ff 0%,#2e7bff 34%,#4b55f7 62%,#7a2be8 100%)" }}>
              <div ref={sheen} className="absolute inset-y-[-10%] w-[34%] bg-gradient-to-r from-transparent via-white/15 to-transparent" style={{ transform: "translateX(-60%) skewX(-18deg)" }} />
              <div className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-white/10 to-transparent" />
            </div>
            <div className="absolute" style={{ top: "3.5em", left: "50%", width: "13.5em", height: "3.7em", marginLeft: "-6.75em", borderRadius: "2em", background: "#02030a" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-semibold text-white" style={{ fontSize: "9.6em", letterSpacing: "-0.03em", lineHeight: 1, textShadow: "0 0.02em 0.3em rgba(10,20,90,.3)" }}>
                PayaGo
              </span>
            </div>
          </div>
          <div ref={introShade} className="absolute inset-0 bg-gradient-to-t from-[#03050d]/85 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#03050d]/70 lg:via-transparent" />
          <div ref={flash} className="absolute inset-0 bg-white" style={{ opacity: 0 }} />
        </div>
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
              <a href={isAndroid ? PLAY_URL : APP_URL} className="rounded-full border border-white/60 px-6 py-3.5 font-display text-[15px] font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
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
        <div ref={setPanel("land")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[30rem]">
            <Coming />
            <h2 className={`${headline} mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.03]`}>Land where you meant to be.</h2>
            <p className={body}>Your eSIM is on before the wheels stop, and your cab is already waiting.</p>
          </div>
        </div>
        <div ref={setPanel("cab")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[30rem]">
            <Coming />
            <h2 className={`${headline} mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.03]`}>Your ride is in the plan.</h2>
            <p className={body}>Airport transfers, cabs and car hire, all booked with the trip.</p>
          </div>
        </div>
        <div ref={setPanel("hotel")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[30rem]">
            <Coming />
            <h2 className={`${headline} mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.03]`}>Walk straight into your hotel.</h2>
            <p className={body}>Pick basic, standard or premium. The rooms sit in the same plan as the flights.</p>
          </div>
        </div>
        <div ref={setPanel("train")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[30rem]">
            <Coming />
            <h2 className={`${headline} mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.03]`}>Then take the scenic way.</h2>
            <p className={body}>Trains are part of the plan too, and so is your share of them.</p>
          </div>
        </div>
        <div ref={setPanel("places")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[30rem]">
            <Coming />
            <h2 className={`${headline} mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.03]`}>Find the places worth going to.</h2>
            <p className={body}>Streets, food and events near you, added to the plan as you go.</p>
          </div>
        </div>
        <div ref={setPanel("split")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[30rem]">
            <p className="inline-block rounded-full border border-white/50 bg-[#0F172A]/35 px-3 py-1 text-[13px] font-medium text-white">Live today</p>
            <h2 className={`${headline} mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.03]`}>The bill splits itself.</h2>
            <p className={body}>This part works today. Everyone sees who paid and who owes, with the fewest payments to settle up.</p>
          </div>
        </div>
        <div ref={setPanel("all")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[32rem]">
            <Coming />
            <h2 className={`${headline} mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.03]`}>One trip. One app. One plan.</h2>
            <p className={body}>Everything you just flew through, planned by AI and booked in one place.</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="/early-access/" className="rounded-full bg-white px-7 py-3.5 font-display text-[15px] font-semibold text-[#0F172A] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2">
                Join the trips waitlist
              </a>
            </div>
          </div>
        </div>
        <div ref={veil} className="pointer-events-none absolute inset-0 bg-[#FFF3E2]" style={{ opacity: 0 }} />
      </div>
    </div>
  )
}
