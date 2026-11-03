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

// The two things PayaGo is for, each with an equal share of the journey.
const PILLARS: { first: ChapterName; last: ChapterName; label: string; status: string }[] = [
  { first: "type", last: "cards", label: "Split & Wallet", status: "Live today, cards next" },
  { first: "trips", last: "guide", label: "End-to-end trips", status: "Coming after" },
]

let openingPlayed = false

const APP_SCREENS = ["The chat", "Settle up", "Spending"]
const TRIP_CHIPS = ["7 days in Japan for 4 friends", "Weekend in Barcelona with 6 mates", "10 days in Bali for 2 people"]

const pill = {
  live: "border-[#7C5CFF]/50 text-[#6D4AE8]",
  coming: "border-dashed border-[#0F172A]/15 text-[#475569]",
}

function Status({ live, children }: { live: boolean; children: React.ReactNode }) {
  return (
    <p className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[13px] ${live ? pill.live : pill.coming}`}>
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${live ? "bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white transition-opacity hover:opacity-90" : "border border-[#0F172A]/15"}`} />
      {children}
    </p>
  )
}

const headline = "font-display font-semibold tracking-[-0.035em] text-[#0F172A]"
const body = "mt-5 max-w-[30rem] text-[17px] leading-[1.55] text-[#475569] sm:text-[19px]"

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
        const leave = name === "guide" ? 0 : between(p, to - fade, to)
        const opacity = enter * (1 - leave)
        panel.style.opacity = String(opacity)
        panel.style.transform = `translate3d(0, ${(1 - enter) * 28 - leave * 28}px, 0)`
        panel.style.visibility = opacity < 0.01 ? "hidden" : "visible"
        panel.style.pointerEvents = opacity > 0.6 ? "auto" : "none"
      })
      PILLARS.forEach(({ first, last }) => {
        const dot = rail.current[first]
        if (!dot) return
        const on = p >= CHAPTERS[first][0] && p < CHAPTERS[last][1]
        dot.dataset.active = on ? "true" : "false"
        if (on) dot.setAttribute("aria-current", "step")
        else dot.removeAttribute("aria-current")
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
          scene.setTripStory({ place: first.place, people: first.people, from: detectMoney().home.name, plans: first.plans })
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
    universe.current?.setTripStory({ place: found.place, people: found.people, from: money.home.name, plans: found.plans })
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
    "absolute inset-x-0 bottom-0 h-[64%] bg-gradient-to-t from-[#FAFAF8] via-[#FAFAF8]/88 to-transparent lg:hidden"

  return (
    <div ref={track} className="relative h-[720vh]" data-testid="journey">
      {/* Anchors to scroll to: the page's scroll is the browser's own. */}
      {(Object.keys(CHAPTERS) as ChapterName[]).map((name) => (
        <div
          key={name}
          id={`chapter-${name}`}
          className="absolute"
          style={{ top: `${(name === "hero" ? 0 : CHAPTERS[name][0] + 0.035) * 86.1}%` }}
        />
      ))}

      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden bg-[#FAFAF8]">
        <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        {noScene && <div className="absolute inset-0 bg-[linear-gradient(135deg,#EEFAFE,#F4F1FF)]" />}
        <div className={scrim} />
        <div className="absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-[#FAFAF8]/85 via-[#FAFAF8]/45 to-transparent lg:block" />

        <div ref={setPanel("hero")} className={panelClass}>
          <div className="max-w-[35rem]">
            <h1 className={`${headline} text-[clamp(2.6rem,4.7vw,4.3rem)] leading-[1.05]`}>
              <span className="block">Split every bill.</span>
              <span className="pg-open-late block w-fit bg-gradient-to-r from-[#00B8E6] via-[#7C5CFF] to-[#2CBF8E] bg-clip-text text-transparent">Book every trip.</span>
            </h1>
            <p className={`${body} pg-open-later lg:max-w-[25rem]`}>One app for the money you share and the trips you take together, from today&apos;s dinner to the holiday you keep talking about.</p>
            <div className="pg-open-later mt-8 flex flex-wrap items-center gap-3">
              <a href={isAndroid ? PLAY_URL : APP_URL} className="rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white transition-opacity hover:opacity-90 px-7 py-3.5 font-display text-[15px] font-semibold    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]">
                {isAndroid ? "Get it on Google Play" : "Open PayaGo"}
              </a>
              <a href="#chapter-type" className="px-3 py-3.5 font-display text-[15px] font-semibold text-[#0F172A] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]">
                Scroll the journey
              </a>
            </div>
            <ul className="pg-open-later mt-6 flex flex-wrap gap-2">
              {PILLARS.map(({ first, label, status }) => (
                <li key={label}>
                  <a href={`#chapter-${first}`} className="inline-block rounded-full border border-[#0F172A]/10 bg-white/80 px-3 py-1.5 text-[13px] text-[#475569] hover:text-[#0F172A]">
                    <span className="font-semibold text-[#0F172A]">{label}:</span> {status.toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div ref={setPanel("type")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[31rem]">
            <Status live>Split &amp; Wallet: live today</Status>
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
                className="min-w-0 flex-1 rounded-full border border-[#0F172A]/15 bg-white border border-[#0F172A]/10 px-5 py-3 text-[16px] text-[#0F172A] backdrop-blur placeholder:text-[#64748B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"
              />
              <button type="submit" className="rounded-full bg-[#0F172A] text-white px-5 py-3 font-display text-[14px] font-semibold  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]">
                Send
              </button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2">
              {money.expenseChips.map((chip) => (
                <button key={chip} type="button" onClick={() => sendExpense(chip)} className="rounded-full bg-white border border-[#0F172A]/10 px-3 py-1.5 text-[13px] text-[#334155] transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]">
                  {chip}
                </button>
              ))}
            </div>
            <p aria-live="polite" data-testid="expense-note" className="mt-3 min-h-[2.8em] text-[14px] leading-[1.4] text-[#475569]">
              {expenseNote}
            </p>
          </div>
        </div>

        <div ref={setPanel("settle")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[31rem]">
            <Status live>Split &amp; Wallet: live today</Status>
            <h2 className={`${headline} mt-5 text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02]`}>Six debts. Two payments.</h2>
            <p className={body}>PayaGo untangles who owes whom into the fewest payments. If someone&apos;s slow, tap Ask for me and the reminder comes from PayaGo, not from you.</p>
          </div>
        </div>

        <div ref={setPanel("own")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[31rem]">
            <Status live>Split &amp; Wallet: live today</Status>
            <h2 className={`${headline} mt-5 text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02]`}>Your own money, a few seconds a day.</h2>
            <p className={body}>Paste a bank message, say what it was, and close your day. Ask Can I buy this? and get a straight answer. If PayaGo doesn&apos;t know yet, it says so.</p>
            <p className="mt-6 font-display text-[clamp(2rem,3.4vw,2.75rem)] font-semibold tabular-nums tracking-[-0.03em] text-[#6D4AE8]">
              {money.leftToday} <span className="text-[0.55em] font-medium text-[#334155]">left for today</span>
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
                  className="rounded-full border border-[#0F172A]/15 px-3 py-1.5 text-[13px] text-[#475569] data-[active=true]:border-[#7C5CFF] data-[active=true]:text-[#6D4AE8]"
                >
                  {name}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={APP_URL} className="rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white transition-opacity hover:opacity-90 px-7 py-3.5 font-display text-[15px] font-semibold    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]">
                See an example group
              </a>
              <a href={PLAY_URL} className="font-display text-[15px] font-semibold text-[#0F172A] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]">
                Get it on Google Play
              </a>
            </div>
          </div>
        </div>

        <div ref={setPanel("cards")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[31rem]">
            <Status live={false}>Split &amp; Wallet: cards coming next</Status>
            <h2 className={`${headline} mt-5 text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02]`}>One wallet. A card each.</h2>
            <p className={body}>Add money to a shared wallet, pay with your own PayaGo card, and every payment splits itself. PayaGo Business gives each person on your team an allowance you can see live.</p>
            <a href="/contact/" className="mt-5 inline-block font-display text-[15px] font-semibold text-[#6D4AE8] underline-offset-4 hover:underline">
              Tell us you&apos;re interested
            </a>
          </div>
        </div>

        <div ref={setPanel("trips")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[33rem]">
            <Status live={false}>Trips: coming after</Status>
            <h2 className={`${headline} mt-4 text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02]`}>Say where you want to go.</h2>
            <p className="mt-3 max-w-[31rem] text-[16px] leading-[1.5] text-[#475569] sm:text-[18px]">
              Tell PayaGo the trip, your budget and who&apos;s coming, and AI plans it three ways.
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
                className="min-w-0 flex-1 rounded-full border border-[#0F172A]/15 bg-white border border-[#0F172A]/10 px-5 py-3 text-[16px] text-[#0F172A] backdrop-blur placeholder:text-[#64748B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"
              />
              {canSpeak && (
                <button
                  type="button"
                  aria-label={listening ? "Listening" : "Say your trip"}
                  onClick={listen}
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF] ${listening ? "bg-[#FFC94F] text-[#0F172A]" : "bg-white border border-[#0F172A]/10 text-[#0F172A] hover:bg-white/20"}`}
                >
                  <Mic className="h-5 w-5" />
                </button>
              )}
              <button type="submit" className="rounded-full bg-[#0F172A] text-white px-5 py-3 font-display text-[14px] font-semibold  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]">
                Go
              </button>
            </form>
            <div className="mt-2.5 hidden flex-wrap gap-2 sm:flex">
              {TRIP_CHIPS.map((chip) => (
                <button key={chip} type="button" onClick={() => sendTrip(chip)} className="rounded-full bg-white border border-[#0F172A]/10 px-3 py-1.5 text-[13px] text-[#334155] transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]">
                  {chip}
                </button>
              ))}
            </div>
            {tripNote && <p aria-live="polite" className="mt-2 text-[14px] text-[#8A6D1F]">{tripNote}</p>}
            {trip && (
              <div data-testid="trip-plans" aria-live="polite" className="mt-3">
                <p className="text-[14px] text-[#475569]">
                  {trip.days} days in {trip.place} for {trip.people}, from {money.home.name}, per person
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {trip.plans.map((plan) => (
                    <div key={plan.name} className="rounded-2xl border border-[#0F172A]/15 bg-[#F4F6FB]/75 p-2.5 backdrop-blur sm:p-3">
                      <p className="font-display text-[14px] font-semibold text-[#0F172A]">{plan.name}</p>
                      <p className="mt-0.5 hidden text-[12px] leading-[1.3] text-[#64748B] sm:block">{plan.detail}</p>
                      <p className="mt-1 font-display text-[16px] font-semibold tabular-nums text-[#8A6D1F] sm:text-[18px]">
                        {plan.price}
                        <span className="ml-0.5 hidden text-[11px] font-normal text-[#64748B] sm:inline"> each</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <p className="mt-2 text-[13px] leading-[1.4] text-[#64748B]">
              A preview of what we&apos;re building. Plans and prices here are examples.{" "}
              <a href="/early-access/" className="font-semibold text-[#6D4AE8] underline-offset-2 hover:underline">
                Join the trips waitlist
              </a>
            </p>
          </div>
        </div>

        {/* The journey's map: solid is live, hollow is coming. */}
        <div ref={setPanel("plans")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[31rem]">
            <Status live={false}>Trips: coming after</Status>
            <h2 className={`${headline} mt-5 text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02]`}>Three ways to go. Pick one.</h2>
            <p className={body}>AI plans your trip as basic, standard and premium. Change anything until the whole group is happy.</p>
          </div>
        </div>

        <div ref={setPanel("book")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[31rem]">
            <Status live={false}>Trips: coming after</Status>
            <h2 className={`${headline} mt-5 text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02]`}>Book it all. Split it as you go.</h2>
            <p className={body}>Flights, stays and things to do, booked in one place. The cost splits across the group the same way your bills do.</p>
          </div>
        </div>

        <div ref={setPanel("guide")} className={panelClass} style={{ opacity: 0 }}>
          <div className="max-w-[31rem]">
            <Status live={false}>Trips: coming after</Status>
            <h2 className={`${headline} mt-5 text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02]`}>Then a voice leads the way.</h2>
            <p className={body}>A voice guide walks the whole group through the trip, from the airport to the last dinner.</p>
            <a href="/early-access/" className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] px-7 py-3.5 font-display text-[15px] font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]">
              Join the trips waitlist
            </a>
          </div>
        </div>

        <nav aria-label="Journey" className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
          {PILLARS.map(({ first, label, status }) => (
            <a
              key={label}
              ref={(element) => {
                rail.current[first] = element
              }}
              href={`#chapter-${first}`}
              data-active="false"
              className="group flex items-center gap-3 text-right text-[#64748B] transition-colors hover:text-[#0F172A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF] data-[active=true]:text-[#0F172A]"
            >
              <span>
                <span className="block font-display text-[15px] font-semibold">{label}</span>
                <span className="block text-[12px]">{status}</span>
              </span>
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#7C5CFF] transition-transform group-data-[active=true]:scale-150" />
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
