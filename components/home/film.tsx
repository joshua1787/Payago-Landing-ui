"use client"

import { useEffect, useRef, useState } from "react"

import { LIVE_FROM, ZOOM_FROM, ZOOM_TO, createPhoneGate } from "@/components/home/phone-gate"
import { useLocalMoney } from "@/lib/use-local-money"
import { between, clamp01 } from "@/lib/universe/chapters"

const APP_URL = "https://app.payago.in"
const PLAY_URL = "https://play.google.com/store/apps/details?id=com.payago.app"
// Built by scripts/build-film.py. Frames come in bundles, so a scroll needs a few requests rather than
// hundreds: wide for big screens, tall cut to fit a phone, and a lighter set of each for slow connections.
const BUNDLE = 16
type SetName = "wide" | "tall" | "lite" | "slow"
const SETS: Record<SetName, { frames: number; ahead: number; lighter?: SetName; needsMbps?: number }> = {
  wide: { frames: 516, ahead: 18, lighter: "lite", needsMbps: 12 },
  tall: { frames: 516, ahead: 10, lighter: "slow", needsMbps: 7 },
  lite: { frames: 258, ahead: 9 },
  slow: { frames: 258, ahead: 5 },
}
// How many bundles to time before deciding whether this connection can keep up.
const SPEED_SAMPLE = 6
const BEHIND = 2

const SCENES = [
  { id: "open", from: 0, to: LIVE_FROM - 0.004 },
  { id: "live", from: LIVE_FROM, to: ZOOM_FROM },
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

// The page opens in the film's golden sky, and the film drifts on through the clouds while the opening
// plays: scroll share, then film progress.
const FILM_START = 0.08
const FILM_AT_ZOOM_END = 0.0955
function filmAt(scroll: number) {
  if (scroll < ZOOM_TO) return FILM_START + (FILM_AT_ZOOM_END - FILM_START) * (scroll / ZOOM_TO)
  return FILM_AT_ZOOM_END + (1 - FILM_AT_ZOOM_END) * ((scroll - ZOOM_TO) / (1 - ZOOM_TO))
}

function isSlowConnection() {
  const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string; downlink?: number } }).connection
  if (!connection) return false
  return Boolean(connection.saveData) || /(^|-)[23]g$/.test(connection.effectiveType ?? "") || (connection.downlink !== undefined && connection.downlink > 0 && connection.downlink < 2)
}

function Coming() {
  return <p className="inline-block rounded-full border border-white/50 bg-[#0F172A]/35 px-3 py-1 text-[13px] font-medium text-white">Trips: coming</p>
}

/** The film is a stack of still frames, so scrolling can move it forward and back with no lag. */
export function Film() {
  const track = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const veil = useRef<HTMLDivElement>(null)
  const intro = useRef<HTMLDivElement>(null)
  const gateCanvas = useRef<HTMLCanvasElement>(null)
  const gate = useRef<ReturnType<typeof createPhoneGate>>(null)
  const introShade = useRef<HTMLDivElement>(null)
  const panels = useRef<Partial<Record<string, HTMLDivElement | null>>>({})
  const [isAndroid, setIsAndroid] = useState(false)
  const money = useLocalMoney()

  useEffect(() => {
    const box = track.current
    const element = canvas.current
    const ctx = element?.getContext("2d", { alpha: false, desynchronized: true })
    if (!box || !element || !ctx) return
    setIsAndroid(/android/i.test(navigator.userAgent))

    // Compressed frames stay in memory, and only those near the viewer are kept unpacked.
    // Unpacking happens off the main thread, so drawing a frame is nearly free.
    const phone = window.innerWidth < 700 && window.innerHeight > window.innerWidth
    let setName: SetName = phone ? "tall" : "wide"
    if (isSlowConnection()) setName = SETS[setName].lighter ?? setName
    const frameCount = () => SETS[setName].frames
    const frameAt = (p: number) => ((p - FILM_START) / (1 - FILM_START)) * (frameCount() - 1)
    let blobs: (Blob | undefined)[] = []
    const bitmaps = new Map<number, ImageBitmap>()
    const unpacking = new Set<number>()
    const WINDOW = 16
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
        drawn = -1
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
        if (centre + d < frameCount()) unpack(centre + d)
        if (centre - d >= 0) unpack(centre - d)
      }
    }

    // Download from where the viewer is, ahead first, a few bundles at a time.
    const requested = new Set<number>()
    const timed: PerformanceResourceTiming[] = []
    let speedChecked = false
    // Times the bundles themselves, leaving out the wait for the first byte. Most browsers report it;
    // a bundle from the cache is near instant, so a repeat visit keeps the sharp set.
    const checkSpeed = (url: string) => {
      const { lighter, needsMbps } = SETS[setName]
      if (speedChecked || !lighter || !needsMbps) return
      const entry = performance.getEntriesByName(new URL(url, location.href).href).pop() as PerformanceResourceTiming | undefined
      if (entry) timed.push(entry)
      if (timed.length < SPEED_SAMPLE) return
      speedChecked = true
      const bytes = timed.reduce((sum, { encodedBodySize }) => sum + encodedBodySize, 0)
      const seconds = (Math.max(...timed.map((t) => t.responseEnd)) - Math.min(...timed.map((t) => t.responseStart))) / 1000
      if (bytes === 0 || seconds <= 0 || (bytes * 8) / seconds / 1e6 >= needsMbps) return
      // Too slow for this set. The picture on screen stays until the lighter set's frames arrive.
      const share = SETS[lighter].frames / frameCount()
      setName = lighter
      shown *= share
      blobs = []
      requested.clear()
      failures.clear()
      bitmaps.forEach((bitmap) => bitmap.close())
      bitmaps.clear()
      drawn = -1
    }
    const failures = new Map<number, number>()
    let active = 0
    const fetchNext = () => {
      while (active < 3 && !disposed) {
        const { frames, ahead } = SETS[setName]
        const bundleCount = Math.ceil(frames / BUNDLE)
        const here = Math.floor(shown / BUNDLE)
        let next = -1
        for (let d = 0; d <= ahead && next < 0; d++) {
          if (here + d < bundleCount && !requested.has(here + d)) next = here + d
        }
        for (let d = 1; d <= BEHIND && next < 0; d++) {
          if (here - d >= 0 && !requested.has(here - d)) next = here - d
        }
        if (next < 0) return
        requested.add(next)
        active++
        const bundle = next
        const fromSet = setName
        const url = `/film/${fromSet}/b${String(bundle).padStart(3, "0")}.bin`
        void fetch(url)
          .then((response) => {
            if (!response.ok) throw new Error(String(response.status))
            return response.arrayBuffer()
          })
          .then((data) => {
            if (fromSet !== setName) return
            const view = new DataView(data)
            const count = view.getUint32(0, true)
            let offset = 4 + count * 4
            for (let i = 0; i < count; i++) {
              const length = view.getUint32(4 + i * 4, true)
              blobs[bundle * BUNDLE + i] = new Blob([data.slice(offset, offset + length)], { type: "image/webp" })
              offset += length
            }
            drawn = -1
            checkSpeed(url)
          })
          .catch(() => {
            const tries = (failures.get(bundle) ?? 0) + 1
            failures.set(bundle, tries)
            if (tries < 3 && fromSet === setName) requested.delete(bundle)
          })
          .finally(() => {
            active--
            fetchNext()
          })
      }
    }

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
      const scroll = progressNow()
      const p = filmAt(scroll)
      // The film catches up with the scroll over a few frames, so wheel steps read as one glide.
      shown += (frameAt(p) - shown) * 0.3
      const base = Math.floor(shown)
      const key = Math.round(shown * 8)
      if (key !== drawn) {
        tidy()
        fetchNext()
        const bitmap = nearest(base)
        if (bitmap) {
          // Drawn at its own size. The browser's graphics chip does the scaling.
          if (element.width !== bitmap.width) {
            element.width = bitmap.width
            element.height = bitmap.height
          }
          ctx.globalAlpha = 1
          ctx.drawImage(bitmap, 0, 0)
          // Half a step between two frames is drawn as a blend, so a slow scroll stays fluid.
          const blendInto = bitmaps.get(base + 1)
          const blend = shown - base
          if (blendInto && bitmap === bitmaps.get(base) && blend > 0.06) {
            ctx.globalAlpha = blend
            ctx.drawImage(blendInto, 0, 0)
          }
          if (bitmap === bitmaps.get(base)) drawn = key
        }
      }
      frame = requestAnimationFrame(paint)
      const layer = intro.current
      const inOpening = scroll < ZOOM_TO
      if (opening && layer && inOpening) {
        const now = performance.now()
        opening.draw(scroll, now)
        layer.style.background = "none"
        // The sky breathes slowly behind the phone, and settles as the camera flies in.
        const breath = still ? 0.04 : 0.04 + Math.sin(now / 5200) * 0.012
        element.style.transform = `scale(${1 + breath * (1 - between(scroll, ZOOM_FROM, ZOOM_TO))})`
      }
      if (scroll === lastScroll) return
      lastScroll = scroll
      if (layer) layer.style.visibility = inOpening ? "visible" : "hidden"
      if (!inOpening) element.style.transform = "none"
      if (introShade.current) introShade.current.style.opacity = String(1 - between(scroll, ZOOM_FROM - 0.012, ZOOM_FROM + 0.004))
      SCENES.forEach(({ id, from, to }) => {
        const panel = panels.current[id]
        if (!panel) return
        const at = id === "open" || id === "live" ? scroll : p
        const fade = Math.min(0.03, (to - from) * 0.25)
        const enter = id === "open" ? 1 : between(at, from, from + fade)
        const leave = id === "all" ? 0 : between(at, to - fade, to)
        const opacity = enter * (1 - leave)
        panel.style.opacity = String(opacity)
        panel.style.transform = `translate3d(0, ${(1 - enter) * 26 - leave * 26}px, 0)`
        panel.style.visibility = opacity < 0.01 ? "hidden" : "visible"
        panel.style.pointerEvents = opacity > 0.6 ? "auto" : "none"
      })
      if (veil.current) veil.current.style.opacity = String(between(p, 0.99, 1))
    }
    shown = frameAt(filmAt(progressNow()))
    fetchNext()
    paint()
    return () => {
      disposed = true
      opening?.dispose()
      gate.current = null
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(frame)
      bitmaps.forEach((bitmap) => bitmap.close())
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
    <div ref={track} className="relative h-[1600vh]" data-testid="film">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#E8C98F]">
        <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
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
