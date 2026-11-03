"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import { APP_URL, Closing, PageHero, Status, primaryLink, quietLink } from "@/components/site/page-parts"

const FAQS = [
  {
    category: "Getting started",
    questions: [
      { q: "What is PayaGo?", a: "One app for the money you share and the money you spend. Split bills in a group chat, settle up with the fewest payments, and keep track of your own spending. Cards and whole trips are coming next." },
      { q: "Is it free?", a: "Yes, PayaGo is free to start. We haven't set prices for cards, PayaGo Business or whole trips, and we'll publish them before any of those open." },
      { q: "What do I need to start?", a: "Just a browser. Open PayaGo, make a group, and invite people with a link or a QR code." },
      { q: "Which currencies does it work with?", a: "Pounds, dollars, euros, rupees and dirhams." },
    ],
  },
  {
    category: "Split",
    questions: [
      { q: "How do I add an expense?", a: "Type it into the group chat the way you'd say it, like \"£84 dinner\". PayaGo reads it and turns it into a card everyone can see. You can also scan a receipt." },
      { q: "Does it have to split equally?", a: "No. You can split equally, by shares, or in exact amounts." },
      { q: "How does settling up work?", a: "PayaGo works out who owes whom in the fewest payments. You pay each other the way you normally do, and mark who has paid." },
      { q: "What if someone doesn't pay?", a: "Tap Ask for me, and the reminder comes from PayaGo, not from you." },
    ],
  },
  {
    category: "Wallet",
    questions: [
      { q: "What is Close your day?", a: "A quick way to log your spending. Paste a message from your bank, PayaGo reads the payment, and you say what it was." },
      { q: "Do you connect to my bank?", a: "No. PayaGo only reads the messages you give it. A payment only counts towards your spending once you've said what it was." },
      { q: "Can I get a PayaGo card?", a: "Not yet. A shared wallet with a card each is what we're building next." },
      { q: "What does Can I buy this? do?", a: "It gives you a straight answer based on your budget and your bills. If it doesn't know enough yet, it says so." },
    ],
  },
  {
    category: "AI and your data",
    questions: [
      { q: "Does AI decide what I owe?", a: "No. AI helps read what you typed and writes the notes you see. Totals and who owes what are worked out by PayaGo itself." },
      { q: "Do you keep my bank messages?", a: "No. PayaGo reads the payment out of the message and doesn't keep the message." },
      { q: "Do you sell my data?", a: "No. Our privacy policy sets out what we keep and why." },
      { q: "Can I delete my account?", a: "Yes, in the app. It permanently removes your profile data from PayaGo." },
    ],
  },
  {
    category: "Trips",
    coming: true,
    questions: [
      { q: "What will trips do?", a: "You'll say the trip, choose from three AI plans, book in the app, split as you go, and follow a voice guide." },
      { q: "Can I book a trip in PayaGo?", a: "Not yet. Whole trips come after cards: AI plans, booking in the app, splitting as you go, and a voice guide." },
      { q: "When will trips open?", a: "We haven't set a date. Join the waitlist and we'll tell you when they do." },
    ],
  },
]

function slug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-")
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#0F172A]/15">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]">
        <span className="font-display text-[18px] font-medium tracking-[-0.01em] text-[#0F172A]">{q}</span>
        <ChevronDown aria-hidden="true" className={`h-5 w-5 flex-shrink-0 text-[#6D4AE8] transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="max-w-[40rem] pb-6 text-[16px] leading-[1.65] text-[#475569]">{a}</p>}
    </div>
  )
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.flatMap((section) =>
    section.questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  ),
}

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteNav />
      <PageHero title="Questions, answered.">
        <p>What PayaGo does today, what it does with your data, and what&apos;s coming.</p>
      </PageHero>
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[220px_1fr]">
          <nav aria-label="FAQ sections" className="hidden lg:block">
            <ul className="sticky top-28 space-y-3 text-[15px] text-[#475569]">
              {FAQS.map((section) => (
                <li key={section.category}>
                  <a href={`#${slug(section.category)}`} className="hover:text-[#0F172A]">{section.category}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="max-w-3xl space-y-14">
            {FAQS.map((section) => (
              <div key={section.category} id={slug(section.category)} className="scroll-mt-28">
                {section.coming && <Status live={false}>Coming</Status>}
                <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.025em] text-[#0F172A]">{section.category}</h2>
                <div className="mt-4">
                  {section.questions.map((item) => (
                    <FaqItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Closing title="Still have a question?">
        <Link href="/contact/" className={quietLink}>Contact Us</Link>
        <a href={APP_URL} className={primaryLink}>Open PayaGo</a>
      </Closing>
      <SiteFooter />
    </main>
  )
}
