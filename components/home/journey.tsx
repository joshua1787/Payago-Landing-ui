"use client"

import { useEffect, useRef, useState } from "react"
import { Mic } from "lucide-react"

import { captureEvent } from "@/lib/analytics"
import { formatDemoMoney, readDemoExpense } from "@/lib/demo-expense"
import { readDemoTrip, type DemoTrip } from "@/lib/demo-trip"
import { PLAY_URL, detectMoney } from "@/lib/local-money"
import { useLocalMoney } from "@/lib/use-local-money"
import { CHAPTERS, between, type ChapterName } from "@/lib/universe/chapters"
import type { MoneyUniverse } from "@/lib/universe/scene"

const APP_URL = "https://app.payago.in"

const RAIL: { chapter: ChapterName; label: string; live: boolean }[] = [
  { chapter: "type", label: "Bills", live: true },
  { chapter: "settle", label: "Settle up", live: true },
  { chapter: "own", label: "Your money", live: true },
  { chapter: "app", label: "The app", live: true },
  { chapter: "cards", label: "Cards", live: false },
  { chapter: "trips", label: "Trips", live: false },
]

let openingPlayed = false

const APP_SCREENS = ["The chat", "Settle up", "Spending"]
const TRIP_CHIPS = ["7 days in Japan for 4 friends", "Weekend in Barcelona with 6 mates", "10 days in Bali for 2 people"]

const pill = {
  live: "border-[#19E4CC]/50 text-[#19E4CC]",
  coming: "border-dashed border-white/40 text-white/80",
}

function Status({ live, children }: { live: boolean; children: React.ReactNode }) {
  return (
    <p className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[13px] ${live ? pill.live : pill.coming}`}>
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${live ? "bg-[#19E4CC]" : "border border-white/70"}`} />
      {children}
    </p>
  )
}

const headline = "font-display font-semibold tracking-[-0.035em] text-white"
const body = "mt-5 max-w-[30rem] text-[17px] leading-[1.55] text-white/78 sm:text-[19px]"

export function Journey() {
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const universe = useRef<MoneyUniverse | null>(null)
  const panels = useRef<Partial<Record<ChapterName, HTMLDivElement | null>>>({})
  const rail = useRef<Partial<Record<ChapterName, HTMLAnchorElement | null>>>({})
  const screenTabs = useRef<(HTMLLIElement | null)[]>([])
  const money = useLocalMoney()
  const [isAndroid, setIsAndroid] = useState(false)
  const [noScene, setNoScene] = useState(false)

  const [expenseDraft, setExpenseDraft] = useState("")
  const [expenseNote, setExpenseNote] = useState("Try one of these, or type your own.")
  const [tripDraft, setTripDraft] = useState("")
  const [trip, setTrip] = useState<DemoTrip | null>(null)
  const [tripNote, setTripNote] = useState("")
  const [listening, setListening] = useState(false)
  const [canSpeak, setCanSpeak] = useState(false)

  useEffect(() => {
    const element = canvas.current
    const box = track.current
    if (!element || !box) return
    let disposed = false
    let cleanup = () => {}

    const progressNow = () => {
      const rect = box.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      return span <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / span))
    }

    // Words move with the scroll directly, so they never wait for the scene.
    const paint = () => {
      const p = progressNow()
      universe.current?.setProgress(p)
      const along = (p - CHAPTERS.app[0]) / (CHAPTERS.app[1] - CHAPTERS.app[0])
      const shown = along < 0.36 ? 0 : along < 0.69 ? 1 : 2
      screenTabs.current.forEach((tab, i) => {
        if (tab) tab.dataset.active = i === shown ? "true" : "false"
      })
      ;(Object.keys(CHAPTERS) as ChapterName[]).forEach((name) => {
        const panel = panels.current[name]
        if (!panel) return
        const [from, to] = CHAPTERS[name]
        const span = to - from
        const fade = Math.min(0.03, span * 0.22)
        const enter = name === "hero" ? 1 : between(p, from, from + fade)
        const leave = name === "trips" ? 0 : between(p, to - fade, to)
        const opacity = enter * (1 - leave)
        panel.style.opacity = String(opacity)
        panel.style.transform = `translate3d(0, ${(1 - enter) * 28 - leave * 28}px, 0)`
        panel.style.visibility = opacity < 0.01 ? "hidden" : "visible"
        panel.style.pointerEvents = opacity > 0.6 ? "auto" : "none"
        const dot = rail.current[name]
        if (dot) {
          const on = p >= from && p < to
          dot.dataset.active = on ? "true" : "false"
          if (on) dot.setAttribute("aria-current", "step")
          else dot.removeAttribute("aria-current")
        }
      })
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

    const speech =
      (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition
    setCanSpeak(Boolean(speech))
    setIsAndroid(/android/i.test(navigator.userAgent))

    void (async () => {
      const probe = document.createElement("canvas")
      if (!probe.getContext("webgl2") && !probe.getContext("webgl")) {
        setNoScene(true)
        return
      }
      try {
        const [{ MoneyUniverse }, dots] = await Promise.all([
          import("@/lib/universe/scene"),
          fetch("/data/land-dots.bin").then((r) => r.arrayBuffer()),
          document.fonts?.ready,
        ])
        if (disposed) return
        const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const scene = new MoneyUniverse(element, {
          mobile: window.innerWidth < 800,
          still,
          landDots: new Float32Array(dots),
          money: detectMoney(),
        })
        universe.current = scene
        const first = readDemoTrip(TRIP_CHIPS[0], detectMoney())
        if (first) {
          scene.flyTo(first.lat, first.lng)
          setTrip(first)
        }
        paint()
        // On a fresh load, not when coming back from another page of the site.
        if (progressNow() < 0.004 && !openingPlayed) {
          openingPlayed = true
          scene.playIntro()
        }
        const resize = new ResizeObserver(() => scene.resize())
        resize.observe(element.parentElement ?? element)
        // Nothing runs while it's off the screen.
        const seen = new IntersectionObserver(([entry]) => {
          if (still) return
          if (entry.isIntersecting) scene.start()
          else scene.stop()
        })
        if (stage.current) seen.observe(stage.current)
        if (!still) scene.start()
        cleanup = () => {
          resize.disconnect()
          seen.disconnect()
          scene.dispose()
          universe.current = null
        }
      } catch {
        setNoScene(true)
      }
    })()

    return () => {
      disposed = true
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cleanup()
    }
  }, [])

  const sendExpense = (text: string) => {
    const message = text.trim()
    if (!message) return
    setExpenseDraft("")
    captureEvent("home_expense_demo_send")
    const expense = readDemoExpense(message, money.symbol)
    if (!expense) {
      setExpenseNote(`"${message}" reads as chat, so it stays chat.`)
      return
    }
    const share = formatDemoMoney(expense.amount / 4, expense.symbol)
    universe.current?.addExpense({
      label: expense.label,
      amount: formatDemoMoney(expense.amount, expense.symbol),
      detail: `${share} each`,
    })
    setExpenseNote(`${expense.label} joined the orbit. Sam, Priya and Tom each owe you ${share}.`)
  }

  const sendTrip = (text: string) => {
    const sentence = text.trim()
    if (!sentence) return
    setTripDraft("")
    captureEvent("home_trip_demo_send")
    const found = readDemoTrip(sentence, money)
    if (!found) {
      setTripNote("Try naming a place: Japan, Bali, Paris, Goa, New York.")
      return
    }
    setTripNote("")
    setTrip(found)
    universe.current?.flyTo(found.lat, found.lng)
  }

  const listen = () => {
    const Recognition =
      (window as unknown as { SpeechRecognition?: new () => SpeechLike }).SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechLike }).webkitSpeechRecognition
    if (!Recognition) return
    const recognition = new Recognition()
    recognition.lang = "en-GB"
    recognition.interimResults = false
    recognition.onresult = (event) => sendTrip(event.results[0][0].transcript)
    recognition.onend = () => setListening(false)
    recognition.onerror = () => {
      setListening(false)
      setTripNote("Couldn't hear that. You can type it instead.")
    }
    setListening(true)
    recognition.start()
  }

  const setPanel = (name: ChapterName) => (element: HTMLDivElement | null) => {
    panels.current[name] = element
  }
  const panelClass =
    "absolute inset-x-0 bottom-0 top-0 mx-auto flex max-w-7xl flex-col justify-end px-6 pb-9 will-change-transform lg:justify-center lg:pb-0"
  // On phones the scene sits above and the words below, over a soft fade.
  const scrim =
    "absolute inset-x-0 bottom-0 h-[64%] bg-gradient-to-t from-[#031B1A] via-[#031B1A]/88 to-transparent lg:hidden"

  return (
    <div ref={track} className="relative h-[640vh]" data-testid="journey">
      {/* Anchors to scroll to: the page's scroll is the browser's own. */}
      {(Object.keys(CHAPTERS) as ChapterName[]).map((name) => (
        <div
          key={name}
          id={`chapter-${name}`}
          className="absolute"
          style={{ top: `${(name === "hero" ? 0 : CHAPTERS[name][0] + 0.035) * 84.4}%` }}
        />
      ))}

      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden bg-[#031B1A]">
        <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        {noScene && <div className="absolute inset-0 bg-[linear-gradient(135deg,#031B1A,#0B3F3A)]" />}
        <div className={scrim} />
        <div className="absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-[#031B1A]/85 via-[#031B1A]/45 to-transparent lg:block" />

        <div ref={setPanel("hero")} className={panelClass}>
          <div className="max-w-[35rem]">
            <h1 className={`${headline} text-[clamp(2.9rem,5.6vw,5rem)] leading-[1]`}>
              From daily bills <span className="pg-open-late">to dream trips.</span>
            </h1>
            <p className={`${body} pg-open-later`}>The money you share, the money you spend, and the trips you save it for. One app.</p>
            <div className="pg-open-later mt-8 flex flex-wrap items-center gap-3">
              <a href={isAndroid ? PLAY_URL : APP_URL} className="rounded-full bg-[#19E4CC] px-7 py-3.5 font-display text-[15px] font-semibold text-[#04201E] transition-colors hover:bg-[#5BF0DE] focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                {isAndroid ? "Get it on Google Play" : "Open PayaGo"}
              </a>
              <a href="#chapter-type" className="px-3 py-3.5 font-display text-[15px] font-semibold text-white underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Scroll the journey
              </a>
            </div>
          </div>
        </div>

        <div ref={setPanel("type")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[31rem]">
            <Status live>Live today</Status>
            <h2 className={`${headline} mt-5 text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02]`}>Type it the way you&apos;d say it.</h2>
            <p className={body}>A group chat that keeps the accounts. Send a message with an amount and it becomes a card everyone can see.</p>
            <form
              className="mt-6 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault()
                sendExpense(expenseDraft)
              }}
            >
              <label htmlFor="expense-input" className="sr-only">
                Type an expense
              </label>
              <input
                id="expense-input"
                autoComplete="off"
                value={expenseDraft}
                onChange={(event) => setExpenseDraft(event.target.value)}
                placeholder="Type an expense"
                className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-[16px] text-white backdrop-blur placeholder:text-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19E4CC]"
              />
              <button type="submit" className="rounded-full bg-[#fff] px-5 py-3 font-display text-[14px] font-semibold text-[#04201E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19E4CC]">
                Send
              </button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2">
              {money.expenseChips.map((chip) => (
                <button key={chip} type="button" onClick={() => sendExpense(chip)} className="rounded-full bg-white/10 px-3 py-1.5 text-[13px] text-white/85 transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19E4CC]">
                  {chip}
                </button>
              ))}
            </div>
            <p aria-live="polite" data-testid="expense-note" className="mt-3 min-h-[2.8em] text-[14px] leading-[1.4] text-white/70">
              {expenseNote}
            </p>
          </div>
        </div>

        <div ref={setPanel("settle")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[31rem]">
            <Status live>Live today</Status>
            <h2 className={`${headline} mt-5 text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02]`}>Six debts. Two payments.</h2>
            <p className={body}>PayaGo untangles who owes whom into the fewest payments. If someone&apos;s slow, tap Ask for me and the reminder comes from PayaGo, not from you.</p>
          </div>
        </div>

        <div ref={setPanel("own")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[31rem]">
            <Status live>Live today</Status>
            <h2 className={`${headline} mt-5 text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02]`}>Your own money, a few seconds a day.</h2>
            <p className={body}>Paste a bank message, say what it was, and close your day. Ask Can I buy this? and get a straight answer. If PayaGo doesn&apos;t know yet, it says so.</p>
            <p className="mt-6 font-display text-[clamp(2rem,3.4vw,2.75rem)] font-semibold tabular-nums tracking-[-0.03em] text-[#19E4CC]">
              {money.leftToday} <span className="text-[0.55em] font-medium text-white/85">left for today</span>
            </p>
          </div>
        </div>

        <div ref={setPanel("app")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[31rem]">
            <Status live>Live today</Status>
            <h2 className={`${headline} mt-5 text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02]`}>This is the real app.</h2>
            <p className={body}>These are real screens from Flat 3B, the example group inside PayaGo. Look around it yourself, with no sign-up.</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {APP_SCREENS.map((name, i) => (
                <li
                  key={name}
                  ref={(el) => {
                    screenTabs.current[i] = el
                  }}
                  data-active={i === 0 ? "true" : "false"}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-[13px] text-white/70 data-[active=true]:border-[#19E4CC] data-[active=true]:text-[#19E4CC]"
                >
                  {name}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={APP_URL} className="rounded-full bg-[#19E4CC] px-7 py-3.5 font-display text-[15px] font-semibold text-[#04201E] transition-colors hover:bg-[#5BF0DE] focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                See an example group
              </a>
              <a href={PLAY_URL} className="font-display text-[15px] font-semibold text-white underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Get it on Google Play
              </a>
            </div>
          </div>
        </div>

        <div ref={setPanel("cards")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[31rem]">
            <Status live={false}>Coming next</Status>
            <h2 className={`${headline} mt-5 text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02]`}>One wallet. A card each.</h2>
            <p className={body}>Add money to a shared wallet, pay with your own PayaGo card, and every payment splits itself. PayaGo Business gives each person on your team an allowance you can see live.</p>
            <a href="/contact/" className="mt-5 inline-block font-display text-[15px] font-semibold text-[#19E4CC] underline-offset-4 hover:underline">
              Tell us you&apos;re interested
            </a>
          </div>
        </div>

        <div ref={setPanel("trips")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[33rem]">
            <Status live={false}>Coming after</Status>
            <h2 className={`${headline} mt-4 text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02]`}>Then say where you want to go.</h2>
            <p className="mt-3 max-w-[31rem] text-[16px] leading-[1.5] text-white/78 sm:text-[18px]">
              Tell PayaGo the trip, your budget and who&apos;s coming. AI plans it three ways. Book in the app, split as you go, and a voice guide leads the way.
            </p>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault()
                sendTrip(tripDraft)
              }}
            >
              <label htmlFor="trip-input" className="sr-only">
                Describe a trip
              </label>
              <input
                id="trip-input"
                autoComplete="off"
                value={tripDraft}
                onChange={(event) => setTripDraft(event.target.value)}
                placeholder="10 days in Bali"
                className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-[16px] text-white backdrop-blur placeholder:text-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19E4CC]"
              />
              {canSpeak && (
                <button
                  type="button"
                  aria-label={listening ? "Listening" : "Say your trip"}
                  onClick={listen}
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19E4CC] ${listening ? "bg-[#FFC94F] text-[#04201E]" : "bg-white/10 text-white hover:bg-white/20"}`}
                >
                  <Mic className="h-5 w-5" />
                </button>
              )}
              <button type="submit" className="rounded-full bg-[#fff] px-5 py-3 font-display text-[14px] font-semibold text-[#04201E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19E4CC]">
                Go
              </button>
            </form>
            <div className="mt-2.5 hidden flex-wrap gap-2 sm:flex">
              {TRIP_CHIPS.map((chip) => (
                <button key={chip} type="button" onClick={() => sendTrip(chip)} className="rounded-full bg-white/10 px-3 py-1.5 text-[13px] text-white/85 transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19E4CC]">
                  {chip}
                </button>
              ))}
            </div>
            {tripNote && <p aria-live="polite" className="mt-2 text-[14px] text-[#FFC94F]">{tripNote}</p>}
            {trip && (
              <div data-testid="trip-plans" aria-live="polite" className="mt-3">
                <p className="text-[14px] text-white/70">
                  {trip.days} days in {trip.place} for {trip.people}, from {money.home.name}, per person
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {trip.plans.map((plan) => (
                    <div key={plan.name} className="rounded-2xl border border-white/12 bg-[#04201E]/75 p-2.5 backdrop-blur sm:p-3">
                      <p className="font-display text-[14px] font-semibold text-white">{plan.name}</p>
                      <p className="mt-0.5 hidden text-[12px] leading-[1.3] text-white/55 sm:block">{plan.detail}</p>
                      <p className="mt-1 font-display text-[16px] font-semibold tabular-nums text-[#FFC94F] sm:text-[18px]">
                        {plan.price}
                        <span className="ml-0.5 hidden text-[11px] font-normal text-white/50 sm:inline"> each</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <p className="mt-2 text-[13px] leading-[1.4] text-white/55">
              A preview of what we&apos;re building. Plans and prices here are examples.{" "}
              <a href="/early-access/" className="font-semibold text-[#19E4CC] underline-offset-2 hover:underline">
                Join the trips waitlist
              </a>
            </p>
          </div>
        </div>

        {/* The journey's map: solid is live, hollow is coming. */}
        <nav aria-label="Journey" className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
          {RAIL.map(({ chapter, label, live }) => (
            <a
              key={chapter}
              ref={(element) => {
                rail.current[chapter] = element
              }}
              href={`#chapter-${chapter}`}
              data-active="false"
              className="group flex items-center gap-3 text-[13px] text-white/50 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19E4CC] data-[active=true]:text-white"
            >
              <span>{label}</span>
              <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full transition-transform group-data-[active=true]:scale-150 ${live ? "bg-[#19E4CC]" : "border border-white/70"}`} />
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}

type SpeechLike = {
  lang: string
  interimResults: boolean
  onresult: (event: { results: { 0: { 0: { transcript: string } } } }) => void
  onend: () => void
  onerror: () => void
  start: () => void
}
