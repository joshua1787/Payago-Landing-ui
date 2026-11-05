import Link from "next/link"

import { HomeNav } from "@/components/home/home-nav"
import { Film } from "@/components/home/film"
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
    <div className="min-h-screen bg-[#FAFAF8]">
      <HomeNav appUrl={APP_URL} />
      <main className="pg-flush">
        <Film />
        <div aria-hidden="true" className="h-[45vh] bg-gradient-to-b from-[#03050d] via-[#3a3f5c] to-[#FAFAF8]" />
      <Journey />

        <section className="bg-[#FAFAF8] px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <h2 className="max-w-[40rem] font-display text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0F172A]">
              It&apos;s your money. Here&apos;s how we treat it.
            </h2>
            <div className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2">
              {TRUST.map((point) => (
                <div key={point.title}>
                  <h3 className="font-display text-[20px] font-semibold tracking-[-0.015em] text-[#0F172A]">{point.title}</h3>
                  <p className="mt-2 max-w-[32rem] text-[16px] leading-[1.6] text-[#475569]">{point.body}</p>
                  {point.link && (
                    <Link href={point.link.href} className="mt-2 inline-block text-[16px] font-medium text-[#6D4AE8] underline underline-offset-4">
                      {point.link.text}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(135deg,#EEFAFE_0%,#F4F1FF_58%,#FAFAF8_100%)] px-6 py-24 text-center lg:py-36">
          <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.4rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[#0F172A]">
            Start with your next shared bill.
          </h2>
          <a href={APP_URL} className="mt-10 inline-block rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white transition-opacity hover:opacity-90 px-8 py-4 font-display text-[16px] font-semibold    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]">
            Open PayaGo
          </a>
          <a href={PLAY_URL} className="ml-3 mt-10 inline-block rounded-full border border-[#0F172A]/15 px-8 py-4 font-display text-[16px] font-semibold text-[#0F172A] transition-colors hover:bg-[#EEF1F7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]">
            Get it on Google Play
          </a>
          <p className="mx-auto mt-6 max-w-[34rem] text-[15px] leading-[1.55] text-[#475569]">
            Free to start. On iPhone, PayaGo runs in your browser, so there&apos;s nothing to install. Your friends sign up free, then you add them to the group by email.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
