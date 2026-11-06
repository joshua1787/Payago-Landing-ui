"use client"

import { useLocalMoney } from "@/lib/use-local-money"

const APP_URL = "https://app.payago.in"

const SCREENS = [
  { file: "chat", title: "The chat keeps the accounts.", body: "Type a bill the way you'd say it, and it becomes a card the whole group can see." },
  { file: "settle", title: "Fewest payments, worked out.", body: "Who owes whom, untangled into as few payments as possible." },
  { file: "spending", title: "Your month, at a glance.", body: "Where the money went, in plain numbers, without a spreadsheet." },
]

/** The real app, large: the screens are the product, so they get the room. */
export function AppShowcase() {
  const money = useLocalMoney()
  const suffix = money.symbol === "₹" ? "" : "-uk"

  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,#FAFAF8_0%,#FFF3E2_55%,#FAFAF8_100%)] px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-[44rem] text-center">
          <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.0] tracking-[-0.04em] text-[#0F172A]">Your group, sorted.</h2>
          <p className="mx-auto mt-6 max-w-[34rem] text-[19px] leading-[1.55] text-[#475569] sm:text-[21px]">These are real screens from Flat 3B, the example group inside PayaGo. Open it and look around, with no sign-up.</p>
          <a href={APP_URL} className="mt-9 inline-block rounded-full bg-[#1b2150] px-8 py-4 font-display text-[16px] font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]">
            See an example group
          </a>
        </div>

        {/* On phones the screens sit side by side and swipe, so the page doesn't grow three phones long. */}
        <ul className="-mx-6 mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:items-start sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-24 lg:gap-14">
          {SCREENS.map(({ file, title, body }, i) => (
            <li key={file} className={`w-[72%] flex-none snap-center sm:w-auto ${i === 1 ? "sm:-mt-10" : "sm:mt-10"}`}>
              <div className="mx-auto w-full max-w-[18rem] rounded-[2.6rem] bg-[#1b2150] p-[0.55rem] shadow-[0_60px_90px_-50px_rgba(27,33,80,0.65),0_30px_50px_-40px_rgba(196,124,18,0.45)]">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are served as they are */}
                <img
                  src={`/app-screens/${file}${suffix}.webp`}
                  alt={`${title} A real screen from the example group.`}
                  width={780}
                  height={1688}
                  loading="lazy"
                  className="block w-full rounded-[2.1rem] bg-white"
                />
              </div>
              <h3 className="mx-auto mt-8 max-w-[18rem] font-display text-[21px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0F172A]">{title}</h3>
              <p className="mx-auto mt-2 max-w-[18rem] text-[16px] leading-[1.55] text-[#475569]">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
