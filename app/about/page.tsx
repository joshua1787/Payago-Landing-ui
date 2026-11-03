import type { Metadata } from "next"
import Link from "next/link"

import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import { APP_URL, Closing, ItemGrid, PageHero, Section, primaryLink, quietLink } from "@/components/site/page-parts"

const title = "About: PayaGo"
const description = "Why we're building PayaGo: from a group trip that never got planned to one app for the money you share, the money you spend and the trips you save it for."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://payago.in/about" },
  openGraph: { title, description, url: "https://payago.in/about", type: "website", images: ["https://payago.in/og/about.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["https://payago.in/og/about.jpg"] },
}

const BELIEFS = [
  { title: "Type it, don't file it", body: "If adding an expense takes more than a message, people stop doing it. So it takes a message." },
  { title: "AI reads, the app counts", body: "AI helps understand what you meant. Totals and who owes what are worked out by the app." },
  { title: "Say what's real", body: "We tell you what's live and what isn't. If PayaGo doesn't know enough to answer, it says so." },
]

const STORY = [
  { when: "2024", title: "The trip that started it", body: "Our founders tried to plan a group trip to Lisbon. Multiple chats, scattered links, spreadsheets, and weeks of back-and-forth turned a simple idea into admin." },
  { when: "2024", title: "The research", body: "We spoke to travellers about group travel. The frustration was universal: people want to go, but planning together is so painful that plans often fade out." },
  { when: "2026", title: "Live with splitting and tracking", body: "PayaGo went live with group expenses, and now your own spending too." },
  { when: "Next", title: "Cards, then whole trips", body: "A shared wallet with a card each, then trips planned, booked and split in one place. That's the trip we set out to fix." },
]

const TEAM = [
  { name: "Joshua", role: "Co-Founder & CTO", bio: "Architected and built PayaGo end-to-end, solo — the AI agent, the ledger, payments, and the iOS, Android, and web apps that ship it. Turns an ambitious product vision into production code at startup speed, and doesn't stop at 'good enough.'", avatar: "J" },
  { name: "Dickson Patrick", role: "Founder & CEO", bio: "Leads company vision, product direction, and strategic partnerships. The one who had to plan that disastrous Lisbon trip and swore there had to be a better way.", avatar: "DP" },
  { name: "Kishore Dayanithi", role: "Co-Founder & CFO", bio: "Owns financial strategy and partner relationships, including the partner-supported model behind early access planning and provider-led handoff where supported.", avatar: "KD" },
  { name: "Aravinthan", role: "Co-Founder & COO", bio: "Runs day-to-day operations and drives execution across engineering, product, and growth. Keeps the team focused on fast, useful trip planning.", avatar: "AR" },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <SiteNav />
      <PageHero title="Money shouldn't be what gets in the way.">
        <p>Not between friends, not in a flat, and not between you and the trip you keep talking about. That&apos;s why we&apos;re building PayaGo.</p>
      </PageHero>
      <Section title="How we got here.">
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STORY.map((step) => (
            <li key={step.title} className="rounded-[24px] bg-white border border-[#E6E8EF] p-6">
              <p className="font-display text-[15px] font-semibold text-[#8A6D1F]">{step.when}</p>
              <h3 className="mt-2 font-display text-[19px] font-semibold tracking-[-0.015em] text-[#0F172A]">{step.title}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-[#475569]">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section title="What we believe." tone="deep">
        <ItemGrid items={BELIEFS} />
      </Section>
      <Section title="The founding team.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div key={member.name} className="rounded-[24px] bg-white border border-[#E6E8EF] p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[radial-gradient(circle_at_34%_30%,#FFF0B8,#FFC94F_52%,#C77F12)] font-display text-[17px] font-semibold text-[#5F3B05]">{member.avatar}</div>
              <h3 className="mt-5 font-display text-[19px] font-semibold tracking-[-0.015em] text-[#0F172A]">{member.name}</h3>
              <p className="mt-1 text-[14px] text-[#6D4AE8]">{member.role}</p>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#475569]">{member.bio}</p>
            </div>
          ))}
        </div>
      </Section>
      <Closing title="Come along for the ride.">
        <a href={APP_URL} className={primaryLink}>Open PayaGo</a>
        <Link href="/careers/" className={quietLink}>Join the Team</Link>
      </Closing>
      <SiteFooter />
    </main>
  )
}
