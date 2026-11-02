import Link from "next/link"

import { Footer } from "@/components/footer"
import { HomeNav } from "@/components/home/home-nav"
import { OrbitField } from "@/components/home/orbit-field"
import { TypeDemo } from "@/components/home/type-demo"

const APP_URL = "https://app.payago.in"

const RING_LABELS = [
  { text: "Split and track", status: "Live today" },
  { text: "Wallet and cards", status: "Coming next" },
  { text: "Whole trips", status: "Coming after" },
]

const primaryButton =
  "inline-flex items-center justify-center rounded-full bg-[#19E4CC] px-7 py-3.5 font-display text-[15px] font-semibold text-[#04201E] transition-colors hover:bg-[#5BF0DE] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#04201E]"
const quietButton =
  "inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 font-display text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"

function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[linear-gradient(135deg,#031B1A_0%,#07302D_62%,#0B3F3A_100%)]">
            <OrbitField labels={RING_LABELS} />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-14 pt-[38vh] lg:justify-center lg:pb-16 lg:pt-28">
        <div className="max-w-[35rem]">
          <h1 className="font-display text-[clamp(2.75rem,6.4vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
            From daily bills to dream trips.
          </h1>
          <p className="mt-6 max-w-[30rem] text-[18px] leading-[1.55] text-white/78 sm:text-[20px]">
            Split with your people and see where your own money goes. Next, pay and travel from the same app.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={APP_URL} className={primaryButton}>
              Open PayaGo
            </a>
            <a href="#next" className={quietButton}>
              See what&apos;s coming
            </a>
          </div>
          <p className="mt-5 text-[14px] text-white/55">Free to start, in your browser.</p>

          {/* The rings are labelled in the picture on wide screens. */}
          <ul className="mt-8 grid gap-2 text-[14px] lg:hidden">
            {RING_LABELS.map((ring, index) => (
              <li key={ring.text} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-[#19E4CC]" : "border border-dashed border-white/50"}`}
                />
                <span className="text-white">{ring.text}</span>
                <span className={index === 0 ? "text-[#19E4CC]" : "text-white/55"}>{ring.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function TypeSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-[#F1F6F4] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_minmax(0,29rem)] lg:gap-24">
        <div className="max-w-[34rem]">
          <h2 className="font-display text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#06211E]">
            Type it the way you&apos;d say it.
          </h2>
          <p className="mt-6 text-[18px] leading-[1.6] text-[#36514D]">
            A group chat that keeps the accounts. Send a message with an amount, and it becomes a card everyone can see. No forms and no picking categories.
          </p>
          <p className="mt-4 text-[18px] leading-[1.6] text-[#36514D]">
            Try it here. Change the people, send your own, or try something that isn&apos;t an expense.
          </p>
          <p className="mt-8 text-[14px] leading-[1.6] text-[#6B8280]">
            This demo runs on your screen and saves nothing. The app uses AI to read the messages that plain rules can&apos;t.
          </p>
        </div>
        <TypeDemo />
      </div>
    </section>
  )
}

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] bg-[#04201E] p-5 text-white shadow-[0_30px_60px_-36px_rgba(3,27,26,0.75)]">{children}</div>
  )
}

function TodaySection() {
  return (
    <section id="features" className="scroll-mt-20 bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-[38rem] font-display text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#06211E]">
          What you can use today.
        </h2>

        <div className="mt-16 grid gap-y-20 lg:gap-y-28">
          <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-24">
            <div>
              <h3 className="font-display text-[26px] font-semibold tracking-[-0.02em] text-[#06211E] lg:text-[32px]">
                Nobody has to be the one who asks.
              </h3>
              <p className="mt-4 max-w-[30rem] text-[17px] leading-[1.6] text-[#36514D]">
                PayaGo works out who owes whom with the fewest payments. When someone is slow to pay, tap Ask for me and the reminder comes from PayaGo, not from you.
              </p>
            </div>
            <Screen>
              <p className="text-[14px] text-white/60">Settle up, Flat 3B</p>
              <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-[#0D3532] p-4">
                <div>
                  <p className="font-display text-[16px] font-semibold">Sam owes you</p>
                  <p className="mt-0.5 font-display text-[24px] font-semibold tabular-nums text-[#19E4CC]">£48.00</p>
                </div>
                <span className="rounded-full bg-white px-4 py-2 font-display text-[13px] font-semibold text-[#04201E]">Ask for me</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl bg-[#0D3532] p-4">
                <div>
                  <p className="font-display text-[16px] font-semibold">You owe Priya</p>
                  <p className="mt-0.5 font-display text-[24px] font-semibold tabular-nums">£21.50</p>
                </div>
                <span className="rounded-full border border-white/25 px-4 py-2 font-display text-[13px] font-semibold">Pay</span>
              </div>
            </Screen>
          </article>

          <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-24">
            <div className="lg:order-2">
              <h3 className="font-display text-[26px] font-semibold tracking-[-0.02em] text-[#06211E] lg:text-[32px]">
                Your own money, a few seconds a day.
              </h3>
              <p className="mt-4 max-w-[30rem] text-[17px] leading-[1.6] text-[#36514D]">
                Paste a message from your bank and PayaGo reads the payment. Close your day by saying what each one was. It only counts once you&apos;ve said so, and it remembers next time.
              </p>
            </div>
            <div className="lg:order-1">
              <Screen>
                <p className="text-[14px] text-white/60">Close your day, 1 payment to look at</p>
                <p className="mt-4 font-display text-[34px] font-semibold tabular-nums">£12.40</p>
                <p className="text-[14px] text-white/60">Corner Shop, today at 18:42</p>
                <p className="mt-4 rounded-2xl bg-[#0D3532] px-4 py-3 text-[15px]">Groceries for tonight</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[13px]">
                  <span className="rounded-full bg-white/10 px-3 py-1.5">Food</span>
                  <span className="rounded-full bg-[#19E4CC] px-3 py-1.5 font-semibold text-[#04201E]">Groceries</span>
                  <span className="rounded-full bg-white/10 px-3 py-1.5">Transport</span>
                  <span className="rounded-full bg-white/10 px-3 py-1.5">Family</span>
                </div>
                <p className="mt-4 rounded-full bg-[#19E4CC] py-3 text-center font-display text-[14px] font-semibold text-[#04201E]">Looks right</p>
              </Screen>
            </div>
          </article>

          <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-24">
            <div>
              <h3 className="font-display text-[26px] font-semibold tracking-[-0.02em] text-[#06211E] lg:text-[32px]">
                Ask before you buy.
              </h3>
              <p className="mt-4 max-w-[30rem] text-[17px] leading-[1.6] text-[#36514D]">
                Standing in a shop? Ask PayaGo. It looks at your budget and the bills still to come and gives you a straight answer. If it doesn&apos;t know enough yet, it says so instead of guessing.
              </p>
            </div>
            <Screen>
              <p className="font-display text-[22px] font-semibold">Can I buy this?</p>
              <p className="mt-4 rounded-2xl bg-[#0D3532] px-4 py-3 font-display text-[18px] tabular-nums">£120</p>
              <p className="mt-5 font-display text-[20px] font-semibold text-[#5FE08E]">Yes. Enjoy it.</p>
              <p className="mt-1 text-[15px] leading-[1.5] text-white/75">
                You&apos;d still have £640 left after your bills, of this month&apos;s budget.
              </p>
            </Screen>
          </article>
        </div>

        <p className="mt-20 max-w-[44rem] text-[17px] leading-[1.7] text-[#36514D]">
          Also in the app: your month and upcoming bills, every expense in one searchable list, your year told as a story, and a way to hide your amounts when someone is looking over your shoulder.
        </p>
      </div>
    </section>
  )
}

function NextSection() {
  const road = [
    {
      title: "One wallet, a card each",
      body: "Friends add money to a shared wallet and each pays with their own PayaGo card. Tag who a payment was for, and it splits itself.",
      status: "Coming next",
      link: { href: "/contact/", text: "Tell us you're interested" },
    },
    {
      title: "PayaGo Business",
      body: "Give each person on your team an allowance on their own card, and see every payment as it happens.",
      status: "Coming next",
      link: { href: "/contact/", text: "Talk to us about your team" },
    },
    {
      title: "Whole trips",
      body: "Tell PayaGo the trip, your budget and who's going. Get three plans, edit one, book it in the app and split it, with a voice guide for the journey.",
      status: "Coming after",
      link: { href: "/early-access/", text: "Join the trips waitlist" },
    },
  ]
  return (
    <section id="next" className="scroll-mt-20 bg-[#04201E] py-24 text-white lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.03em]">
            The rest of the orbit.
          </h2>
          <p className="mt-6 text-[18px] leading-[1.6] text-white/70">
            Everything below is what we&apos;re building, not something you can use yet. We&apos;ll say clearly when each one opens.
          </p>
        </div>

        <ol className="grid gap-6">
          {road.map((step) => (
            <li key={step.title} className="relative rounded-[24px] border border-dashed border-white/20 p-6 sm:p-8">
              <p className="text-[13px] text-white/55">{step.status}</p>
              <h3 className="mt-2 font-display text-[24px] font-semibold tracking-[-0.02em]">{step.title}</h3>
              <p className="mt-3 max-w-[34rem] text-[16px] leading-[1.6] text-white/72">{step.body}</p>
              <Link
                href={step.link.href}
                className="mt-5 inline-block font-display text-[15px] font-semibold text-[#19E4CC] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19E4CC]"
              >
                {step.link.text}
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div id="trips" className="mx-auto mt-24 max-w-7xl scroll-mt-20 px-6">
        <div className="rounded-[28px] bg-[#0A2E2B] p-6 sm:p-10">
          <h3 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-[-0.025em]">
            A preview of whole trips
          </h3>
          <p className="mt-3 max-w-[38rem] text-[16px] leading-[1.6] text-white/70">
            How planning is meant to feel. These plans and prices are an example, not real offers.
          </p>
          <p className="mt-7 rounded-2xl bg-[#04201E] px-5 py-4 text-[16px] text-white/90 sm:text-[18px]">
            7 days in Japan for 4 friends, £3,200 budget, love street food and temples
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { name: "Basic", detail: "One stop, a guesthouse in Shinjuku", price: "£620" },
              { name: "Standard", detail: "Direct flights, a hotel in Asakusa", price: "£780" },
              { name: "Premium", detail: "Premium cabin, a ryokan in Hakone", price: "£980" },
            ].map((plan) => (
              <div key={plan.name} className="rounded-2xl bg-[#04201E] p-5">
                <p className="font-display text-[17px] font-semibold">{plan.name}</p>
                <p className="mt-1 min-h-[2.75rem] text-[14px] leading-[1.45] text-white/60">{plan.detail}</p>
                <p className="mt-3 font-display text-[24px] font-semibold tabular-nums">
                  {plan.price}
                  <span className="ml-1 text-[13px] font-normal text-white/55">each</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustSection() {
  const points: { title: string; body: string; link?: { href: string; text: string } }[] = [
    {
      title: "AI reads. PayaGo counts.",
      body: "AI helps understand what you typed. Totals and who owes what are worked out by the app, and an amount read from a chat message has to be written in that message.",
    },
    {
      title: "Bank messages aren't kept.",
      body: "When you paste one in, PayaGo keeps the amount, place and date, then discards the message.",
    },
    {
      title: "You have the last word.",
      body: "A payment found in a bank message stays out of your spending until you've said what it was.",
    },
    {
      title: "We don't sell your data.",
      body: "That's in our privacy policy, along with what we do keep and why. PayaGo Ltd is registered in England and Wales.",
      link: { href: "/privacy/", text: "Read the privacy policy" },
    },
  ]
  return (
    <section className="bg-[#F1F6F4] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-[38rem] font-display text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#06211E]">
          It&apos;s your money. Here&apos;s how we treat it.
        </h2>
        <div className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2">
          {points.map((point) => (
            <div key={point.title}>
              <h3 className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[#06211E]">{point.title}</h3>
              <p className="mt-2 max-w-[32rem] text-[16px] leading-[1.6] text-[#36514D]">{point.body}</p>
              {point.link && (
                <Link href={point.link.href} className="mt-2 inline-block text-[16px] font-medium text-[#0B766F] underline underline-offset-4">
                  {point.link.text}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Closing() {
  return (
    <section className="bg-[linear-gradient(135deg,#031B1A_0%,#07302D_62%,#0B3F3A_100%)] py-24 text-center text-white lg:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          Start with your next shared bill.
        </h2>
        <div className="mt-9">
          <a href={APP_URL} className={primaryButton}>
            Open PayaGo
          </a>
        </div>
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <div className="pg-home min-h-screen overflow-x-hidden bg-[#04201E]">
      <HomeNav appUrl={APP_URL} />
      <main>
        <Hero />
        <TypeSection />
        <TodaySection />
        <NextSection />
        <TrustSection />
        <Closing />
      </main>
      <Footer />
    </div>
  )
}
