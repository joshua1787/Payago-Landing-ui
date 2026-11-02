import Link from "next/link"

import { HomeNav } from "@/components/home/home-nav"
import { Journey } from "@/components/home/journey"

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

const FOOTER: { name: string; href: string }[] = [
  { name: "About", href: "/about/" },
  { name: "Blog", href: "/blog/" },
  { name: "Contact", href: "/contact/" },
  { name: "Careers", href: "/careers/" },
  { name: "Privacy", href: "/privacy/" },
  { name: "Terms", href: "/terms/" },
  { name: "Cookies", href: "/cookie-policy/" },
]

export function HomePage() {
  return (
    <div className="pg-home min-h-screen bg-[#031B1A]">
      <HomeNav appUrl={APP_URL} />
      <main>
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
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#031B1A] px-6 py-10 text-[14px] text-white/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p>© 2026 PayaGo Ltd. Registered in England and Wales, company number 16971574.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19E4CC]">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  )
}
