import type { ReactNode } from "react"

import { Orbit } from "@/components/site/orbit"

export const APP_URL = "https://app.payago.in"

export const primaryLink =
  "inline-block rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white transition-opacity hover:opacity-90 px-7 py-3.5 font-display text-[15px] font-semibold    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"
export const quietLink =
  "inline-block rounded-full border border-[#0F172A]/15 px-7 py-3.5 font-display text-[15px] font-semibold text-[#0F172A] transition-colors hover:bg-[#EEF1F7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"

export function Status({ live, children }: { live: boolean; children: ReactNode }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[13px] ${
        live ? "border-[#7C5CFF]/50 text-[#6D4AE8]" : "border-dashed border-[#0F172A]/15 text-[#475569]"
      }`}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${live ? "bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white transition-opacity hover:opacity-90" : "border border-[#0F172A]/15"}`} />
      {children}
    </p>
  )
}

export function PageHero({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#EEFAFE_0%,#F4F1FF_58%,#FAFAF8_100%)] px-6 py-16 lg:flex lg:min-h-[520px] lg:items-center lg:py-20">
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-[40rem] lg:max-w-[44%]">
          <h1 className="font-display text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[#0F172A]">{title}</h1>
          <div className="mt-6 text-[18px] leading-[1.6] text-[#475569] sm:text-[20px]">{children}</div>
        </div>
      </div>
      <Orbit />
    </section>
  )
}

export function Section({ title, status, intro, children, tone = "ink" }: { title: string; status?: { live: boolean; text: string }; intro?: string; children: ReactNode; tone?: "ink" | "deep" }) {
  return (
    <section className={`${tone === "deep" ? "bg-[#F4F6FB]" : "bg-[#FAFAF8]"} px-6 py-20 lg:py-28`}>
      <div className="mx-auto max-w-7xl">
        {status && <Status live={status.live}>{status.text}</Status>}
        <h2 className="mt-4 max-w-[42rem] font-display text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0F172A]">{title}</h2>
        {intro && <p className="mt-5 max-w-[38rem] text-[17px] leading-[1.6] text-[#475569]">{intro}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}

export function Closing({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-[linear-gradient(135deg,#EEFAFE_0%,#F4F1FF_58%,#FAFAF8_100%)] px-6 py-24 text-center">
      <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0F172A]">{title}</h2>
      <div className="mt-9 flex flex-wrap justify-center gap-3">{children}</div>
    </section>
  )
}

export function ItemGrid({ items, coming = false, cols = 3 }: { items: { title: string; body: string; coming?: boolean }[]; coming?: boolean; cols?: 2 | 3 }) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
      {items.map((item) => (
        <div key={item.title} className={`rounded-[24px] p-6 ${coming || item.coming ? "border border-dashed border-[#0F172A]/15" : "bg-white border border-[#E6E8EF]"}`}>
          <h3 className="font-display text-[19px] font-semibold tracking-[-0.015em] text-[#0F172A]">{item.title}</h3>
          <p className="mt-2.5 text-[15px] leading-[1.6] text-[#475569]">{item.body}</p>
        </div>
      ))}
    </div>
  )
}
