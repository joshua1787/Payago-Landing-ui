"use client"

import { useEffect, useState } from "react"
import { Mic } from "lucide-react"

import { captureEvent } from "@/lib/analytics"
import { formatDemoMoney, readDemoExpense } from "@/lib/demo-expense"
import { readDemoTrip, type DemoTrip } from "@/lib/demo-trip"
import { PLAY_URL } from "@/lib/local-money"
import { useLocalMoney } from "@/lib/use-local-money"

const APP_URL = "https://app.payago.in"
const BOOKABLE = ["Flights", "Hotels", "Trains", "Airport transfers", "Cabs", "Car hire", "eSIM", "Things to do"]
const TRIP_CHIPS = ["7 days in Japan for 4 friends", "Weekend in Barcelona with 6 mates", "10 days in Bali for 2 people"]

const heading = "font-display font-semibold tracking-[-0.035em] text-[#0F172A]"
const big = `${heading} text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.03]`
const lead = "mt-5 max-w-[34rem] text-[18px] leading-[1.55] text-[#475569] sm:text-[20px]"
const field =
  "min-w-0 flex-1 rounded-full border border-[#0F172A]/12 bg-white px-5 py-3 text-[16px] text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B34C4]"
const send = "rounded-full bg-[#1b2150] px-5 py-3 font-display text-[14px] font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B34C4]"
const chip =
  "rounded-full border border-[#0F172A]/10 bg-white px-3 py-1.5 text-[13px] text-[#334155] transition-colors hover:border-[#5B34C4]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B34C4]"

function Status({ live, children }: { live: boolean; children: React.ReactNode }) {
  return (
    <p className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[13px] ${live ? "border-[#5B34C4]/40 text-[#5B34C4]" : "border-dashed border-[#0F172A]/20 text-[#475569]"}`}>
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${live ? "bg-[#5B34C4]" : "border border-[#0F172A]/25"}`} />
      {children}
    </p>
  )
}

/** Trips: say the trip, see three plans, and everything that can be booked. A preview: plans are examples. */
export function TripPlanner() {
  const money = useLocalMoney()
  const [draft, setDraft] = useState("")
  const [trip, setTrip] = useState<DemoTrip | null>(null)
  const [note, setNote] = useState("")
  const [listening, setListening] = useState(false)
  const [canSpeak, setCanSpeak] = useState(false)

  useEffect(() => {
    const speech =
      (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition
    setCanSpeak(Boolean(speech))
  }, [])
  // The example plans follow the visitor's currency.
  useEffect(() => setTrip(readDemoTrip(TRIP_CHIPS[0], money)), [money])

  const plan = (text: string) => {
    const sentence = text.trim()
    if (!sentence) return
    setDraft("")
    captureEvent("home_trip_demo_send")
    const found = readDemoTrip(sentence, money)
    if (!found) {
      setNote("Try naming a place: Japan, Bali, Paris, Goa, New York.")
      return
    }
    setNote("")
    setTrip(found)
  }

  const listen = () => {
    const Recognition =
      (window as unknown as { SpeechRecognition?: new () => SpeechLike }).SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechLike }).webkitSpeechRecognition
    if (!Recognition) return
    const recognition = new Recognition()
    recognition.lang = "en-GB"
    recognition.interimResults = false
    recognition.onresult = (event) => plan(event.results[0][0].transcript)
    recognition.onend = () => setListening(false)
    recognition.onerror = () => {
      setListening(false)
      setNote("Couldn't hear that. You can type it instead.")
    }
    setListening(true)
    recognition.start()
  }

  return (
    <section id="chapter-trips" className="bg-[#FFF8EE] px-6 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div>
          <Status live={false}>Trips: coming</Status>
          <h2 className={`${big} mt-5`}>Say where you want to go.</h2>
          <p className={lead}>Tell PayaGo the trip, your budget and who&apos;s coming, and AI plans it three ways: basic, standard and premium. Change anything until the whole group is happy.</p>
          <form
            className="mt-8 flex max-w-[34rem] gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              plan(draft)
            }}
          >
            <label htmlFor="trip-input" className="sr-only">
              Describe a trip
            </label>
            <input id="trip-input" autoComplete="off" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="10 days in Bali" className={field} />
            {canSpeak && (
              <button
                type="button"
                aria-label={listening ? "Listening" : "Say your trip"}
                onClick={listen}
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B34C4] ${listening ? "bg-[#FFC94F] text-[#0F172A]" : "border border-[#0F172A]/12 bg-white text-[#0F172A]"}`}
              >
                <Mic className="h-5 w-5" />
              </button>
            )}
            <button type="submit" className={send}>
              Go
            </button>
          </form>
          <div className="mt-3 flex max-w-[34rem] flex-wrap gap-2">
            {TRIP_CHIPS.map((text) => (
              <button key={text} type="button" onClick={() => plan(text)} className={chip}>
                {text}
              </button>
            ))}
          </div>
          {note && (
            <p aria-live="polite" className="mt-3 text-[14px] text-[#8A6D1F]">
              {note}
            </p>
          )}
        </div>

        <div>
          {trip && (
            <div data-testid="trip-plans" aria-live="polite">
              <p className="text-[15px] text-[#475569]">
                {trip.days} days in {trip.place} for {trip.people}, from {money.home.name}, per person
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                {trip.plans.map((option) => (
                  <div key={option.name} className="rounded-[18px] border border-[#0F172A]/8 bg-white p-3 shadow-[0_24px_50px_-34px_rgba(60,36,16,0.45)] sm:rounded-[22px] sm:p-5">
                    <p className="font-display text-[15px] font-semibold text-[#0F172A] sm:text-[17px]">{option.name}</p>
                    <p className="mt-1 hidden text-[13px] leading-[1.4] text-[#64748B] sm:block">{option.detail}</p>
                    <p className="mt-2 font-display text-[17px] font-semibold tabular-nums tracking-[-0.02em] text-[#1b2150] sm:mt-4 sm:text-[24px]">
                      {option.price}
                      <span className="ml-1 hidden text-[13px] font-normal text-[#64748B] sm:inline">each</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="mt-6 text-[15px] font-medium text-[#0F172A]">Book it all in one place, and the cost splits the same way your bills do.</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {BOOKABLE.map((item) => (
              <li key={item} className="rounded-full bg-white px-3.5 py-1.5 text-[14px] font-medium text-[#0F172A] shadow-[0_1px_0_rgba(15,23,42,0.06)]">
                {item}
              </li>
            ))}
          </ul>
          <div id="chapter-guide" className="mt-8 border-t border-[#0F172A]/10 pt-6">
            <p className="font-display text-[19px] font-semibold text-[#0F172A]">Then a voice leads the way.</p>
            <p className="mt-1 max-w-[30rem] text-[15px] leading-[1.5] text-[#475569]">A voice guide walks the whole group through the trip, from the airport to the last dinner.</p>
            <p className="mt-4 text-[13px] leading-[1.45] text-[#64748B]">
              A preview of what we&apos;re building. Plans and prices here are examples.{" "}
              <a href="/early-access/" className="font-semibold text-[#5B34C4] underline-offset-2 hover:underline">
                Join the trips waitlist
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Split & Wallet, the part that works today: type a bill, settle in the fewest payments, your own money. */
export function SplitToday() {
  const money = useLocalMoney()
  const [draft, setDraft] = useState("")
  const [note, setNote] = useState("Try one of these, or type your own.")

  const sendExpense = (text: string) => {
    const message = text.trim()
    if (!message) return
    setDraft("")
    captureEvent("home_expense_demo_send")
    const expense = readDemoExpense(message, money.symbol)
    if (!expense) {
      setNote(`"${message}" reads as chat, so it stays chat.`)
      return
    }
    const share = formatDemoMoney(expense.amount / 4, expense.symbol)
    setNote(`${expense.label}, ${formatDemoMoney(expense.amount, expense.symbol)}. Sam, Priya and Tom each owe you ${share}.`)
  }

  return (
    <section id="chapter-type" className="bg-[#FAFAF8] px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Status live>Split &amp; Wallet: live today</Status>
        <h2 className={`${big} mt-5 max-w-[48rem]`}>Type it the way you&apos;d say it.</h2>
        <p className={lead}>This part works today, on any trip or any flat. A group chat keeps the accounts: send a message with an amount and it becomes a card everyone can see.</p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.35)] lg:col-span-2 lg:p-8">
            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault()
                sendExpense(draft)
              }}
            >
              <label htmlFor="expense-input" className="sr-only">
                Type an expense
              </label>
              <input id="expense-input" autoComplete="off" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Type an expense" className={field} />
              <button type="submit" className={send}>
                Send
              </button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2">
              {money.expenseChips.map((text) => (
                <button key={text} type="button" onClick={() => sendExpense(text)} className={chip}>
                  {text}
                </button>
              ))}
            </div>
            <p aria-live="polite" data-testid="expense-note" className="mt-5 min-h-[3em] text-[16px] leading-[1.5] text-[#334155]">
              {note}
            </p>
          </div>

          <div id="chapter-settle" className="rounded-[28px] bg-[#1b2150] p-6 text-white lg:p-8">
            <p className="font-display text-[clamp(1.9rem,3vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">Six debts. Two payments.</p>
            <p className="mt-3 text-[15px] leading-[1.55] text-white/80">PayaGo untangles who owes whom into the fewest payments. If someone&apos;s slow, tap Ask for me and the reminder comes from PayaGo, not from you.</p>
          </div>

          <div id="chapter-own" className="rounded-[28px] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.35)] lg:col-span-3 lg:flex lg:items-end lg:justify-between lg:p-8">
            <div>
              <p className="font-display text-[clamp(1.9rem,3vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#0F172A]">Your own money, a few seconds a day.</p>
              <p className="mt-3 max-w-[36rem] text-[15px] leading-[1.55] text-[#475569]">Paste a bank message, say what it was, and close your day. Ask Can I buy this? and get a straight answer. If PayaGo doesn&apos;t know yet, it says so.</p>
            </div>
            <p className="mt-6 font-display text-[clamp(2.2rem,4vw,3.2rem)] font-semibold tabular-nums tracking-[-0.03em] text-[#5B34C4] lg:mt-0">
              {money.leftToday} <span className="text-[0.45em] font-medium text-[#334155]">left for today</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Real screens from the example group, and the cards that come next. */
export function RealApp() {
  const money = useLocalMoney()
  const suffix = money.symbol === "₹" ? "" : "-uk"
  const screens = [
    { file: "chat", label: "The chat" },
    { file: "settle", label: "Settle up" },
    { file: "spending", label: "Spending" },
  ]

  return (
    <>
      <section id="chapter-app" className="bg-[#FFF8EE] px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-[46rem]">
            <Status live>Live today</Status>
            <h2 className={`${big} mt-5`}>This is the real app.</h2>
            <p className={lead}>These are real screens from Flat 3B, the example group inside PayaGo. Look around it yourself, with no sign-up.</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={APP_URL} className="rounded-full bg-[#1b2150] px-7 py-3.5 font-display text-[15px] font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B34C4]">
                See an example group
              </a>
              <a href={PLAY_URL} className="font-display text-[15px] font-semibold text-[#0F172A] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B34C4]">
                Get it on Google Play
              </a>
            </div>
          </div>
          <ul className="mt-14 grid grid-cols-3 gap-3 sm:gap-6">
            {screens.map(({ file, label }) => (
              <li key={file}>
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are served as they are */}
                <img
                  src={`/app-screens/${file}${suffix}.webp`}
                  alt={`${label}, in the example group`}
                  width={780}
                  height={1688}
                  loading="lazy"
                  className="w-full rounded-[18px] border border-[#0F172A]/8 bg-white shadow-[0_40px_70px_-45px_rgba(15,23,42,0.55)] sm:rounded-[28px]"
                />
                <p className="mt-3 text-center text-[13px] text-[#475569] sm:text-[14px]">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="chapter-cards" className="bg-[#FAFAF8] px-6 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-[46rem]">
            <Status live={false}>Split &amp; Wallet: cards coming next</Status>
            <h2 className={`${big} mt-5`}>One wallet. A card each.</h2>
            <p className={lead}>Add money to a shared wallet, pay with your own PayaGo card, and every payment splits itself. PayaGo Business gives each person on your team an allowance you can see live.</p>
          </div>
          <a href="/contact/" className="mt-8 inline-block font-display text-[15px] font-semibold text-[#5B34C4] underline-offset-4 hover:underline lg:mt-0">
            Tell us you&apos;re interested
          </a>
        </div>
      </section>
    </>
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
