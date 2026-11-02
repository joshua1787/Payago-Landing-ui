import type { Metadata } from "next"

import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import { APP_URL, Closing, ItemGrid, PageHero, Section, primaryLink, quietLink } from "@/components/site/page-parts"

const title = "Features: PayaGo"
const description = "What you can use in PayaGo today, and what's coming next: splitting, settling up and your own spending now, then cards and whole trips."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://payago.in/features" },
  openGraph: { title, description, url: "https://payago.in/features", type: "website", images: ["https://payago.in/og/home.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["https://payago.in/og/home.jpg"] },
}

const GROUPS = [
  { title: "A group chat that keeps the accounts", body: "Send a message with an amount and it becomes a card everyone can see. AI reads the messages plain rules can't, like \"60 for Sam\"." },
  { title: "Split your way", body: "Equally, by shares, or in exact amounts. For flatmates, friends, or a weekend away." },
  { title: "Scan a receipt", body: "Take a photo of the bill instead of typing it out." },
  { title: "Settle up", body: "See who owes whom with the fewest payments. Pay the way you normally do, and mark who has paid." },
  { title: "Ask for me", body: "When someone is slow to pay, the reminder comes from PayaGo, not from you." },
  { title: "Invite with a link or QR code", body: "Bring people in by sharing a link, or let them scan a code from your phone." },
]

const OWN = [
  { title: "Close your day", body: "Paste a message from your bank and PayaGo reads the payment. Say what it was in a tap. It only counts once you've said so." },
  { title: "Your month", body: "A budget, what's left for today, and the bills coming up, with an optional note in the morning." },
  { title: "Can I buy this?", body: "A straight answer based on your budget and your bills. If it doesn't know enough yet, it says so." },
  { title: "Your year", body: "Your spending told as a story: what stood out, and where it went." },
  { title: "Activity", body: "Every expense from every group in one list you can search." },
  { title: "Hide your amounts", body: "One tap hides the figures when someone is looking over your shoulder." },
]

const COMING = [
  { title: "One wallet, a card each", body: "Friends add money to a shared wallet and each pays with their own PayaGo card. Tag who a payment was for, and it splits itself." },
  { title: "PayaGo Business", body: "Give each person on your team an allowance on their own card, and see every payment as it happens." },
  { title: "Bills and subscriptions", body: "Pay shared bills from the wallet, so nobody has to chase anyone at the end of the month." },
  { title: "AI trip plans", body: "Tell PayaGo the trip, your budget and who's going. Get basic, standard and premium plans to choose from." },
  { title: "Book and split in one place", body: "Edit the plan, book it in the app, and split the cost as you go." },
  { title: "A voice guide", body: "A guide that leads the group through the whole trip." },
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <SiteNav />
      <PageHero title="Everything, in one place.">
        <p>Your groups, your own money, and the trips you&apos;re saving for. Here&apos;s what&apos;s live today, and what we&apos;re building next.</p>
      </PageHero>
      <Section title="With your people." status={{ live: true, text: "Live today" }}>
        <ItemGrid items={GROUPS} />
      </Section>
      <Section title="With your own money." status={{ live: true, text: "Live today" }} tone="deep">
        <ItemGrid items={OWN} />
      </Section>
      <Section title="What we're building." status={{ live: false, text: "Coming next" }} intro="None of this is open yet. We'll say clearly when each part is.">
        <ItemGrid items={COMING} coming />
      </Section>
      <Closing title="Start with your next shared bill.">
        <a href={APP_URL} className={primaryLink}>Open PayaGo</a>
        <a href="/early-access/" className={quietLink}>Join the trips waitlist</a>
      </Closing>
      <SiteFooter />
    </main>
  )
}
