import type { Metadata } from "next"
import Link from "next/link"

import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import { APP_URL, Closing, PageHero, Section, Status, primaryLink, quietLink } from "@/components/site/page-parts"

const title = "Pricing: PayaGo"
const description = "PayaGo is free to start. Prices for cards, PayaGo Business and whole trips aren't set yet, and we'll publish them before any of it opens."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://payago.in/pricing" },
  openGraph: { title, description, url: "https://payago.in/pricing", type: "website", images: ["https://payago.in/og/home.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["https://payago.in/og/home.jpg"] },
}

const LATER = [
  { title: "Cards and shared wallets", body: "We'll publish any fees before cards open." },
  { title: "PayaGo Business", body: "A plan for teams. We'll share the price when it opens." },
  { title: "Whole trips", body: "Partners may pay us when you book through PayaGo. Final prices and terms will be shown by each provider before you commit." },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <SiteNav />
      <PageHero title="Free to start.">
        <p>No card and no plan to choose. Open PayaGo in your browser and add your first bill.</p>
      </PageHero>
      <Section title="What's free today." status={{ live: true, text: "Live today" }}>
        <div className="rounded-[28px] bg-white border border-[#E6E8EF] p-7 sm:p-10">
          <p className="font-display text-[clamp(3rem,7vw,5rem)] font-semibold leading-none tracking-[-0.04em] text-[#6D4AE8]">£0</p>
          <ul className="mt-7 grid gap-3 text-[16px] text-[#334155] sm:grid-cols-2">
            {["Groups and shared expenses", "Settling up and Ask for me", "Your own spending and Close your day", "Budget, bills and Can I buy this?", "Your year, activity and PDF statements", "AI that reads your messages"].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white transition-opacity hover:opacity-90" />
                {item}
              </li>
            ))}
          </ul>
          <a href={APP_URL} className={`${primaryLink} mt-8`}>Open PayaGo</a>
        </div>
      </Section>
      <Section title="What we haven't priced yet." status={{ live: false, text: "Coming" }} tone="deep" intro="These aren't open, so there's nothing to pay for yet.">
        <div className="grid gap-4 md:grid-cols-3">
          {LATER.map((item) => (
            <div key={item.title} className="rounded-[24px] border border-dashed border-[#0F172A]/15 p-6">
              <Status live={false}>Not priced yet</Status>
              <h3 className="mt-4 font-display text-[19px] font-semibold tracking-[-0.015em] text-[#0F172A]">{item.title}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-[#475569]">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[15px] text-[#64748B]">
          How partner payments work is set out in our{" "}
          <Link href="/affiliate-disclosure/" className="text-[#6D4AE8] underline underline-offset-2">affiliate disclosure</Link>.
        </p>
      </Section>
      <Closing title="Start with your next shared bill.">
        <a href={APP_URL} className={primaryLink}>Open PayaGo</a>
        <Link href="/contact/" className={quietLink}>Contact Us</Link>
      </Closing>
      <SiteFooter />
    </main>
  )
}
