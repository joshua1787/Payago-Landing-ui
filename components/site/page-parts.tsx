import type { ReactNode } from "react"

export const APP_URL = "https://app.payago.in"

export const primaryLink =
  "inline-block rounded-full bg-[#19E4CC] px-7 py-3.5 font-display text-[15px] font-semibold text-[#04201E] transition-colors hover:bg-[#5BF0DE] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
export const quietLink =
  "inline-block rounded-full border border-white/25 px-7 py-3.5 font-display text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"

export function Status({ live, children }: { live: boolean; children: ReactNode }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[13px] ${
        live ? "border-[#19E4CC]/50 text-[#19E4CC]" : "border-dashed border-white/40 text-white/80"
      }`}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${live ? "bg-[#19E4CC]" : "border border-white/70"}`} />
      {children}
    </p>
  )
}

/** The orbit as a backdrop: the same rings as the home page, drawn once and still. */
function Rings() {
  return (
    <svg aria-hidden="true" viewBox="0 0 800 500" className="pointer-events-none absolute -right-24 top-1/2 hidden w-[58%] -translate-y-1/2 lg:block" fill="none">
      <g transform="rotate(-12 400 250)">
        <ellipse cx="400" cy="250" rx="170" ry="62" stroke="#19E4CC" strokeWidth="1.5" />
        <ellipse cx="400" cy="250" rx="270" ry="98" stroke="#19E4CC" strokeOpacity="0.5" strokeDasharray="6 9" />
        <ellipse cx="400" cy="250" rx="380" ry="138" stroke="#19E4CC" strokeOpacity="0.35" strokeDasharray="6 9" />
        <circle cx="232" cy="262" r="6" fill="#FFC65C" />
        <circle cx="560" cy="226" r="5" fill="#19E4CC" />
        <circle cx="470" cy="307" r="5" fill="#A29CFF" />
        <circle cx="330" cy="193" r="4" fill="#FF9E85" />
      </g>
      <defs>
        <radialGradient id="pg-coin" cx="0.36" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#FFF0B8" />
          <stop offset="0.52" stopColor="#FFC94F" />
          <stop offset="1" stopColor="#C77F12" />
        </radialGradient>
      </defs>
      <circle cx="400" cy="250" r="44" fill="url(#pg-coin)" />
    </svg>
  )
}

export function PageHero({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#031B1A_0%,#07302D_62%,#0B3F3A_100%)] px-6 py-20 lg:py-28">
      <Rings />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-[40rem]">
          <h1 className="font-display text-[clamp(2.6rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">{title}</h1>
          <div className="mt-6 text-[18px] leading-[1.6] text-white/78 sm:text-[20px]">{children}</div>
        </div>
      </div>
    </section>
  )
}

export function Section({ title, status, intro, children, tone = "ink" }: { title: string; status?: { live: boolean; text: string }; intro?: string; children: ReactNode; tone?: "ink" | "deep" }) {
  return (
    <section className={`${tone === "deep" ? "bg-[#04201E]" : "bg-[#031B1A]"} px-6 py-20 lg:py-28`}>
      <div className="mx-auto max-w-7xl">
        {status && <Status live={status.live}>{status.text}</Status>}
        <h2 className="mt-4 max-w-[42rem] font-display text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-white">{title}</h2>
        {intro && <p className="mt-5 max-w-[38rem] text-[17px] leading-[1.6] text-white/70">{intro}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}

export function Closing({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-[linear-gradient(135deg,#031B1A_0%,#07302D_62%,#0B3F3A_100%)] px-6 py-24 text-center">
      <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">{title}</h2>
      <div className="mt-9 flex flex-wrap justify-center gap-3">{children}</div>
    </section>
  )
}

export function ItemGrid({ items, coming = false }: { items: { title: string; body: string }[]; coming?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className={`rounded-[24px] p-6 ${coming ? "border border-dashed border-white/20" : "bg-[#0A2E2B]"}`}>
          <h3 className="font-display text-[19px] font-semibold tracking-[-0.015em] text-white">{item.title}</h3>
          <p className="mt-2.5 text-[15px] leading-[1.6] text-white/70">{item.body}</p>
        </div>
      ))}
    </div>
  )
}
