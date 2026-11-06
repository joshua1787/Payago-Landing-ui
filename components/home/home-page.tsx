import Link from "next/link"

import { HomeNav } from "@/components/home/home-nav"
import { Film } from "@/components/home/film"
import { SceneClip } from "@/components/home/scene-clip"
import { RealApp, SplitToday, TripPlanner } from "@/components/home/sections"
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

const clipHeadline = "font-display text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.035em] text-white [text-shadow:0_2px_30px_rgba(10,16,40,0.55)]"
const clipBody = "mt-3 max-w-[27rem] text-[17px] leading-[1.5] text-white/95 [text-shadow:0_1px_18px_rgba(10,16,40,0.7)] sm:text-[19px]"

function Pill({ children }: { children: React.ReactNode }) {
  return <p className="inline-block rounded-full border border-white/50 bg-[#0F172A]/35 px-3 py-1 text-[13px] font-medium text-white">{children}</p>
}

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <HomeNav appUrl={APP_URL} />
      <main className="pg-flush">
        <Film />
        <SceneClip name="hotel">
          <div className="max-w-[30rem]">
            <Pill>Trips: coming</Pill>
            <h2 className={`${clipHeadline} mt-4`}>Walk straight into your hotel.</h2>
            <p className={clipBody}>Pick basic, standard or premium. The rooms sit in the same plan as the flights.</p>
          </div>
        </SceneClip>
        <TripPlanner />
        <SceneClip name="table">
          <div className="max-w-[30rem]">
            <Pill>Live today</Pill>
            <h2 className={`${clipHeadline} mt-4`}>The bill splits itself.</h2>
            <p className={clipBody}>This part works today. Everyone sees who paid and who owes, with the fewest payments to settle up.</p>
          </div>
        </SceneClip>
        <SplitToday />
        <RealApp />
        <SceneClip name="earth">
          <div className="max-w-[32rem]">
            <Pill>Trips: coming</Pill>
            <h2 className={`${clipHeadline} mt-4`}>One trip. One app. One plan.</h2>
            <p className={clipBody}>Whole trips, planned by AI and booked in one place, are coming. Splitting the bill works today.</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="/early-access/" className="rounded-full bg-white px-7 py-3.5 font-display text-[15px] font-semibold text-[#0F172A] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Join the trips waitlist
              </a>
              <a href={APP_URL} className="rounded-full border border-white/70 bg-[#0F172A]/35 px-6 py-3.5 font-display text-[15px] font-semibold text-white hover:bg-[#0F172A]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Split a bill today
              </a>
            </div>
          </div>
        </SceneClip>

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
