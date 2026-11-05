"use client"

import { useEffect, useRef, useState } from "react"

import { LIVE_FROM, ZOOM_FROM, ZOOM_TO, createPhoneGate } from "@/components/home/phone-gate"
import { useLocalMoney } from "@/lib/use-local-money"
import { between, clamp01 } from "@/lib/universe/chapters"

const APP_URL = "https://app.payago.in"
const PLAY_URL = "https://play.google.com/store/apps/details?id=com.payago.app"
// Built by scripts/build-film.py. Real video, because phones and laptops have chips made to play it:
// wide for big screens, tall cut to fit a phone, and a lighter version of each for poor connections.
type FilmName = "wide" | "lite" | "tall" | "slow"
const LIGHTER: Partial<Record<FilmName, FilmName>> = { wide: "lite", tall: "slow" }
const STALL_LIMIT_MS = 1500
const FADE_MS = 380
// A scroll has to settle on a scene this long, so a fling past it or a bounce doesn't start a fade.
const SETTLE_MS = 120

// After the opening, the film runs from 0 to 1 along the scroll. "open" and "live" are shares of the whole page.
const SCENES = [
  { id: "open", from: 0, to: LIVE_FROM - 0.004 },
  { id: "live", from: LIVE_FROM, to: ZOOM_FROM },
  { id: "flight", from: 0, to: 0.24 },
  { id: "hotel", from: 0.27, to: 0.5 },
  { id: "split", from: 0.53, to: 0.73 },
  { id: "all", from: 0.78, to: 1 },
] as const

// Each scene plays through once and rests on its last frame until the scroll moves on: where it starts
// along the scroll, then where it starts and stops in the video, in seconds.
const STOPS = [
  { from: 0, start: 2.08, end: 7.6 },
  { from: 0.27, start: 7.6, end: 14.6 },
  { from: 0.53, start: 14.6, end: 17 },
  { from: 0.78, start: 17, end: 24.2 },
]

// The whole film as the page plays it: at rest in the sky, rolling into the flight, then each scene.
const PLAN = [{ start: 0, end: 0 }, { start: 0, end: STOPS[0].start }, ...STOPS.map(({ start, end }) => ({ start, end }))]

const headline = "font-display font-semibold tracking-[-0.035em] text-white [text-shadow:0_2px_30px_rgba(10,16,40,0.55)]"
const body = "mt-3 max-w-[27rem] text-[17px] leading-[1.5] text-white/95 [text-shadow:0_1px_18px_rgba(10,16,40,0.7)] sm:text-[19px]"

// Below zero during the opening, so the first scene waits for the camera to come through the "o".
const filmAt = (scroll: number) => (scroll - ZOOM_TO) / (1 - ZOOM_TO)

function isSlowConnection() {
  const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  if (!connection) return false
  return Boolean(connection.saveData) || /(^|-)[23]g$/.test(connection.effectiveType ?? "")
}

function Coming() {
  return <p className="inline-block rounded-full border border-white/50 bg-[#0F172A]/35 px-3 py-1 text-[13px] font-medium text-white">Trips: coming</p>
}

/** Scrolling starts each scene of the film. It always plays at normal speed, and fades to a scene it skips to. */
export function Film() {
  const track = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const videoA = useRef<HTMLVideoElement>(null)
  const videoB = useRef<HTMLVideoElement>(null)
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
    const first = videoA.current
    const second = videoB.current
    if (!box || !stage || !first || !second) return
    setIsAndroid(/android/i.test(navigator.userAgent))

    const phone = window.innerWidth < 700 && window.innerHeight > window.innerWidth
    let film: FilmName = phone ? "tall" : "wide"
    if (isSlowConnection()) film = LIGHTER[film] ?? film
    const load = (player: HTMLVideoElement) => {
      const url = `/film/${film}.mp4`
      if (!player.src.endsWith(url)) player.src = url
    }
    first.poster = `/film/${phone ? "tall" : "wide"}.jpg`
    load(first)

    let showing = first
    let waiting = second
    let scene = 0
    let wanted = 0
    let wantedSince = 0
    // Finding: the hidden player is getting to its moment, while the one showing plays on.
    let phase: "idle" | "finding" | "fading" = "idle"
    let ticket = 0
    let prepared = -1
    // iPhones in Low Power Mode won't play video, so each scene's last frame is shown instead.
    let playable = true
    let waited = 0
    let lastCheck = performance.now()
    let disposed = false
    const timers = new Set<ReturnType<typeof setTimeout>>()

    const play = (player: HTMLVideoElement, end: number) => {
      player.play().catch(() => {
        if (disposed) return
        playable = false
        player.currentTime = end
      })
    }
    // The waiting player finds the moment out of sight, and fades in over the one showing, which keeps
    // playing until it's covered. A newer scene replaces one still being found, so handlers are single
    // properties and carry a ticket: a late answer for an old scene can't run.
    const fadeTo = (index: number, from: number) => {
      const mine = ++ticket
      phase = "finding"
      waiting.onloadedmetadata = null
      const { end } = PLAN[index]
      const incoming = waiting
      const show = () => {
        if (disposed || mine !== ticket) return
        incoming.onseeked = null
        phase = "fading"
        prepared = -1
        if (playable && incoming.currentTime < end - 0.04) play(incoming, end)
        incoming.style.zIndex = "1"
        showing.style.zIndex = "0"
        incoming.style.opacity = "1"
        const outgoing = showing
        showing = incoming
        waiting = outgoing
        const done = setTimeout(() => {
          timers.delete(done)
          outgoing.pause()
          if (outgoing !== showing) outgoing.style.opacity = "0"
          if (mine === ticket) phase = "idle"
        }, FADE_MS)
        timers.add(done)
      }
      const seek = () => {
        if (mine !== ticket) return
        incoming.onloadedmetadata = null
        incoming.onseeked = show
        incoming.currentTime = playable ? from : end
      }
      load(incoming)
      // Already waiting at this moment, so it can come straight in.
      if (prepared === index && incoming.src.endsWith(`/film/${film}.mp4`) && !incoming.seeking && incoming.readyState >= 2 && Math.abs(incoming.currentTime - from) < 0.05) {
        show()
        return
      }
      if (incoming.readyState >= 1) seek()
      else incoming.onloadedmetadata = seek
      // If the moment can't be found in time, the picture on screen simply stays.
      const giveUp = setTimeout(() => {
        timers.delete(giveUp)
        if (mine !== ticket || phase !== "finding") return
        incoming.onseeked = null
        incoming.onloadedmetadata = null
        phase = "idle"
      }, 10000)
      timers.add(giveUp)
    }
    // Once the film is rolling, the hidden player waits at the start of the next scene, so scrolling on
    // doesn't have to wait for it to load.
    const prepareNext = () => {
      const next = scene + 1
      if (scene < 1 || next >= PLAN.length || prepared === next || !playable) return
      prepared = next
      load(waiting)
      const seekAhead = () => {
        waiting.onloadedmetadata = null
        waiting.currentTime = PLAN[next].start
      }
      if (waiting.readyState >= 1) seekAhead()
      else waiting.onloadedmetadata = seekAhead
    }
    const follow = (index: number, now: number) => {
      if (index !== wanted) {
        wanted = index
        wantedSince = now
      }
      if (phase !== "fading" && wanted !== scene && now - wantedSince >= SETTLE_MS) {
        const next = PLAN[wanted]
        const at = showing.currentTime
        // Coming out of the opening, the film simply runs on into the flight with no fade.
        const runsOn = phase === "idle" && scene <= 1 && wanted > scene && at >= next.start - 0.6 && at <= next.start + 0.05
        scene = wanted
        if (!runsOn) fadeTo(scene, next.start)
      }
      if (phase === "idle") prepareNext()
      const { end } = PLAN[scene]
      if (!playable) return
      if (end - showing.currentTime <= 0.04) {
        if (!showing.paused) showing.pause()
      } else if (showing.paused && phase === "idle") {
        play(showing, end)
      }
    }
    // Many short waits are as bad as one long one, so waiting is added up. Past the limit, the film moves
    // to the lighter version from the same moment.
    const checkForStall = (now: number) => {
      const elapsed = now - lastCheck
      lastCheck = now
      const lighter = LIGHTER[film]
      if (!lighter || phase !== "idle" || showing.paused || showing.readyState >= 3 || document.hidden) return
      waited += elapsed
      if (waited < STALL_LIMIT_MS) return
      waited = 0
      film = lighter
      fadeTo(scene, showing.currentTime)
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
      const scroll = progressNow()
      const p = filmAt(scroll)
      const clock = performance.now()
      // The opening rests on the first frame until the camera is nearly through the "o".
      const rolling = scroll >= ZOOM_FROM + (ZOOM_TO - ZOOM_FROM) * 0.45
      const stopIndex = STOPS.filter(({ from }) => from <= p).length
      follow(stopIndex > 0 ? stopIndex + 1 : rolling ? 1 : 0, clock)
      checkForStall(clock)
      frame = requestAnimationFrame(paint)
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
    }
    paint()
    return () => {
      disposed = true
      timers.forEach(clearTimeout)
      first.pause()
      second.pause()
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
    <div ref={track} className="relative h-[900vh]" data-testid="film">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#E8C98F]">
        <link rel="preload" as="image" href="/film/wide.jpg" media="(min-width: 700px)" />
        <link rel="preload" as="image" href="/film/tall.jpg" media="(max-width: 699px)" />
        <div ref={stageRef} aria-hidden="true" className="absolute inset-0 isolate overflow-hidden">
          <video ref={videoA} muted playsInline preload="auto" disablePictureInPicture style={{ transition: `opacity ${FADE_MS}ms ease-in-out` }} className="absolute inset-0 h-full w-full object-cover" />
          <video ref={videoB} muted playsInline preload="auto" disablePictureInPicture style={{ opacity: 0, transition: `opacity ${FADE_MS}ms ease-in-out` }} className="absolute inset-0 h-full w-full object-cover" />
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
        <div ref={setPanel("hotel")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[30rem]">
            <Coming />
            <h2 className={`${headline} mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.03]`}>Walk straight into your hotel.</h2>
            <p className={body}>Pick basic, standard or premium. The rooms sit in the same plan as the flights.</p>
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
            <p className={body}>Whole trips, planned by AI and booked in one place, are coming. Splitting the bill works today.</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="/early-access/" className="rounded-full bg-white px-7 py-3.5 font-display text-[15px] font-semibold text-[#0F172A] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2">
                Join the trips waitlist
              </a>
              <a href={isAndroid ? PLAY_URL : APP_URL} className="rounded-full border border-white/70 bg-[#0F172A]/35 px-6 py-3.5 font-display text-[15px] font-semibold text-white hover:bg-[#0F172A]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Split a bill today
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
