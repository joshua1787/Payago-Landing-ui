import type { Metadata } from "next"

import { LocalExample } from "@/components/site/local-example"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import { APP_URL, Closing, PageHero, Section, primaryLink, quietLink } from "@/components/site/page-parts"

const title = "How it works: PayaGo"
const description = "How a shared bill works in PayaGo, how to track your own money, and how whole trips will work when they open."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://payago.in/how-it-works" },
  openGraph: { title, description, url: "https://payago.in/how-it-works", type: "website", images: ["https://payago.in/og/home.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["https://payago.in/og/home.jpg"] },
}

type Step = { title: string; body: string; example: string }

const MONEY: Step[] = [
  { title: "Make a group", body: "Name it, and invite people with a link or a QR code. A flat, a friend group, a weekend away.", example: "Flat 3B, 4 people" },
  { title: "Type what you spent", body: "Send it like any other message. It becomes a card everyone can see, and you check the split.", example: "£84 dinner" },
  { title: "Settle up", body: "PayaGo works out the fewest payments. Pay the way you normally do, and mark who has paid.", example: "Sam owes you £48.00" },
  { title: "Close your day", body: "Paste a bank message, say what it was, and see what's left for today.", example: "£24 left for today" },
  { title: "Share a wallet, with a card each", body: "Coming next. Friends add money to one wallet and each pays with their own card, and every payment splits itself.", example: "Coming next" },
]

const TRIP: Step[] = [
  { title: "Say the trip", body: "Tell PayaGo where, your budget and who's going, by typing or out loud.", example: "7 days in Japan for 4 friends" },
  { title: "Choose a plan", body: "AI plans it three ways: basic, standard and premium. Change anything you like.", example: "Basic, Standard, Premium" },
  { title: "Book it all", body: "Flights, hotels, trains, airport transfers, cabs, car hire, eSIM and things to do, booked in one place.", example: "Everything in one trip" },
  { title: "Split as you go", body: "The cost divides across the group, the same way your bills do.", example: "Everyone's share, worked out" },
  { title: "Follow the guide", body: "A voice guide leads the group through the trip.", example: "Your next stop is 10 minutes away" },
]

function Steps({ steps, coming = false }: { steps: Step[]; coming?: boolean }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className={`rounded-[24px] p-6 sm:p-7 ${coming ? "border border-dashed border-[#0F172A]/15" : "bg-white border border-[#E6E8EF]"}`}>
          <p className="font-display text-[15px] font-semibold text-[#6D4AE8]">Step {index + 1}</p>
          <h3 className="mt-2 font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0F172A]">{step.title}</h3>
          <p className="mt-2.5 text-[16px] leading-[1.6] text-[#475569]">{step.body}</p>
          <p className="mt-4 rounded-2xl bg-[#F4F6FB] px-4 py-3 text-[14px] text-[#334155]"><LocalExample text={step.example} /></p>
        </li>
      ))}
    </ol>
  )
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen">
      <SiteNav />
      <PageHero title="Your trips. Your money.">
        <p>How each one works, step by step. You type what you&apos;d say, and PayaGo does the rest.</p>
      </PageHero>
      <Section title="End-to-end trips." status={{ live: false, text: "Coming" }} intro="This is how trips are meant to work. They aren't open yet.">
        <Steps steps={TRIP} coming />
      </Section>
      <Section title="Split &amp; Wallet." status={{ live: true, text: "Live today, cards coming next" }}>
        <Steps steps={MONEY} />
      </Section>
      <Closing title="Try it on your next bill.">
        <a href={APP_URL} className={primaryLink}>Open PayaGo</a>
        <a href="/early-access/" className={quietLink}>Join the trips waitlist</a>
      </Closing>
      <SiteFooter />
    </main>
  )
}
