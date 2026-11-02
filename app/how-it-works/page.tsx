import type { Metadata } from "next"

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

const BILL: Step[] = [
  { title: "Make a group", body: "Name it, and invite people with a link or a QR code. A flat, a friend group, a weekend away.", example: "Flat 3B, 4 people" },
  { title: "Type what you spent", body: "Send it like any other message. PayaGo reads it, and shows you the split to check.", example: "£84 dinner" },
  { title: "Everyone sees the card", body: "It lands in the chat, so nobody has to ask what was spent or who paid.", example: "Sam, Priya and Tom each owe you £21.00" },
  { title: "Settle up", body: "PayaGo works out the fewest payments. Pay the way you normally do, and mark who has paid.", example: "Sam owes you £48.00" },
]

const OWN: Step[] = [
  { title: "Add what you spend", body: "Type it into your own ledger, or paste a message from your bank.", example: "You spent £12.40 at Corner Shop" },
  { title: "Close your day", body: "PayaGo reads the payment and asks what it was. A tap, and it joins your spending. It only counts once you've said so.", example: "Groceries for tonight" },
  { title: "See where you stand", body: "Set a budget and add your bills. PayaGo shows what's left for today, and answers Can I buy this?", example: "£24 left for today" },
]

const TRIP: Step[] = [
  { title: "Say the trip", body: "Tell PayaGo where, your budget and who's going, by typing or out loud.", example: "7 days in Japan for 4 friends" },
  { title: "Choose a plan", body: "AI plans it three ways: basic, standard and premium. Change anything you like.", example: "Basic, Standard, Premium" },
  { title: "Book and split", body: "Book in the app, and the cost splits across the group as you go.", example: "Everyone's share, worked out" },
  { title: "Follow the guide", body: "A voice guide leads the group through the trip.", example: "Your next stop is 10 minutes away" },
]

function Steps({ steps, coming = false }: { steps: Step[]; coming?: boolean }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {steps.map((step, index) => (
        <li key={step.title} className={`rounded-[24px] p-6 sm:p-7 ${coming ? "border border-dashed border-white/20" : "bg-[#0A2E2B]"}`}>
          <p className="font-display text-[15px] font-semibold text-[#19E4CC]">Step {index + 1}</p>
          <h3 className="mt-2 font-display text-[22px] font-semibold tracking-[-0.02em] text-white">{step.title}</h3>
          <p className="mt-2.5 text-[16px] leading-[1.6] text-white/70">{step.body}</p>
          <p className="mt-4 rounded-2xl bg-[#04201E] px-4 py-3 text-[14px] text-white/85">{step.example}</p>
        </li>
      ))}
    </ol>
  )
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen">
      <SiteNav />
      <PageHero title="From a message to settled up.">
        <p>No forms, and no picking categories. You type what you&apos;d say, and PayaGo does the sums.</p>
      </PageHero>
      <Section title="A shared bill." status={{ live: true, text: "Live today" }}>
        <Steps steps={BILL} />
      </Section>
      <Section title="Your own money." status={{ live: true, text: "Live today" }} tone="deep">
        <Steps steps={OWN} />
      </Section>
      <Section title="A whole trip." status={{ live: false, text: "Coming after" }} intro="This is how trips are meant to work. They aren't open yet.">
        <Steps steps={TRIP} coming />
      </Section>
      <Closing title="Try it on your next bill.">
        <a href={APP_URL} className={primaryLink}>Open PayaGo</a>
        <a href="/early-access/" className={quietLink}>Join the trips waitlist</a>
      </Closing>
      <SiteFooter />
    </main>
  )
}
