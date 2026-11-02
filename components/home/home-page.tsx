import Link from "next/link"

import { HomeNav } from "@/components/home/home-nav"
import { Journey } from "@/components/home/journey"
import { PLAY_URL } from "@/lib/local-money"
import { SiteFooter } from "@/components/site/site-footer"

const APP_URL = "https://app.payago.in"

const TRUST: { title: string; body: string; link?: { href: string; text: string } }[] = [
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
    body: "That's in our privacy policy, along with what we do keep and why.",
    link: { href: "/privacy/", text: "Read the privacy policy" },
  },
]

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#031B1A]">
      <HomeNav appUrl={APP_URL} />
      <main className="pg-flush">
        <Journey />

        <section className="bg-[#031B1A] px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <h2 className="max-w-[40rem] font-display text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-white">
              It&apos;s your money. Here&apos;s how we treat it.
            </h2>
            <div className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2">
              {TRUST.map((point) => (
                <div key={point.title}>
                  <h3 className="font-display text-[20px] font-semibold tracking-[-0.015em] text-white">{point.title}</h3>
                  <p className="mt-2 max-w-[32rem] text-[16px] leading-[1.6] text-white/70">{point.body}</p>
                  {point.link && (
                    <Link href={point.link.href} className="mt-2 inline-block text-[16px] font-medium text-[#19E4CC] underline underline-offset-4">
                      {point.link.text}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(135deg,#031B1A_0%,#07302D_62%,#0B3F3A_100%)] px-6 py-24 text-center lg:py-36">
          <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.4rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
            Start with your next shared bill.
          </h2>
          <a href={APP_URL} className="mt-10 inline-block rounded-full bg-[#19E4CC] px-8 py-4 font-display text-[16px] font-semibold text-[#04201E] transition-colors hover:bg-[#5BF0DE] focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Open PayaGo
          </a>
          <a href={PLAY_URL} className="ml-3 mt-10 inline-block rounded-full border border-white/25 px-8 py-4 font-display text-[16px] font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Get it on Google Play
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
