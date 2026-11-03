import type { Metadata } from "next"

import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import { APP_URL, Closing, ItemGrid, PageHero, Section, primaryLink, quietLink } from "@/components/site/page-parts"

const title = "Features: PayaGo"
const description = "Split & Wallet and end-to-end trips: what each one does in PayaGo, and what's live today."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://payago.in/features" },
  openGraph: { title, description, url: "https://payago.in/features", type: "website", images: ["https://payago.in/og/home.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["https://payago.in/og/home.jpg"] },
}

const MONEY = [
  { title: "A group chat that keeps the accounts", body: "Send a message with an amount and it becomes a card everyone can see. AI reads the messages plain rules can't, like \"60 for Sam\"." },
  { title: "Split your way", body: "Equally, by shares or in exact amounts, or scan the receipt instead of typing it out." },
  { title: "Settle up", body: "See who owes whom with the fewest payments. Pay the way you normally do, and mark who has paid." },
  { title: "Ask for me", body: "When someone is slow to pay, the reminder comes from PayaGo, not from you." },
  { title: "Close your day", body: "Paste a message from your bank and PayaGo reads the payment. Say what it was in a tap. It only counts once you've said so." },
  { title: "Can I buy this?", body: "A straight answer based on your budget and your bills. If it doesn't know enough yet, it says so." },
  { title: "One wallet, a card each", body: "Coming next. Friends add money to a shared wallet and each pays with their own PayaGo card, and every payment splits itself.", coming: true },
  { title: "PayaGo Business", body: "Coming next. Give each person on your team an allowance on their own card, and see every payment as it happens.", coming: true },
]

const TRIPS = [
  { title: "Say the trip", body: "Tell PayaGo where, your budget and who's going, by typing or out loud." },
  { title: "Three plans to choose from", body: "AI plans it three ways: basic, standard and premium." },
  { title: "Change anything", body: "Edit the plan together until it suits the whole group." },
  { title: "Book in one place", body: "Flights, stays and things to do, booked in the app instead of a dozen tabs." },
  { title: "Split as you go", body: "The cost divides across the group, the same way your everyday bills do." },
  { title: "Pay from the wallet", body: "Use your shared wallet and cards for the trip, once they're open." },
  { title: "A voice guide", body: "A guide that leads the group through the whole trip." },
  { title: "Keep the memories", body: "Everything about the trip, and what it cost, stays in one place afterwards." },
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <SiteNav />
      <PageHero title="Your money. Your trips.">
        <p>Two things, one app. Here&apos;s what each one does, and what&apos;s live today.</p>
      </PageHero>
      <Section title="Split &amp; Wallet." status={{ live: true, text: "Live today, cards coming next" }}>
        <ItemGrid items={MONEY} cols={2} />
      </Section>
      <Section title="End-to-end trips." status={{ live: false, text: "Coming after" }} tone="deep" intro="None of this is open yet. We'll say clearly when it is.">
        <ItemGrid items={TRIPS} coming cols={2} />
      </Section>
      <Closing title="Start with your next shared bill.">
        <a href={APP_URL} className={primaryLink}>Open PayaGo</a>
        <a href="/early-access/" className={quietLink}>Join the trips waitlist</a>
      </Closing>
      <SiteFooter />
    </main>
  )
}
