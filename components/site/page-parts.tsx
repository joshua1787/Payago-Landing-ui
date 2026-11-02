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

const ORBIT_INNER = "M 230 250 a 170 62 0 1 0 340 0 a 170 62 0 1 0 -340 0"
const ORBIT_CARDS = "M 120 250 a 280 104 0 1 0 560 0 a 280 104 0 1 0 -560 0"

const BODIES = [
  { color: "#FFC65C", r: 7, begin: "0s" },
  { color: "#19E4CC", r: 6, begin: "-6s" },
  { color: "#A29CFF", r: 6, begin: "-12s" },
  { color: "#FF9E85", r: 5, begin: "-18s" },
]

const ORBIT_EXPENSES = [
  { label: "Dinner", amount: "£84.00", detail: "£21.00 each", begin: "0s" },
  { label: "The flat", amount: "£420.00", detail: "£105.00 each", begin: "-16s" },
  { label: "Taxi", amount: "£18.50", detail: "£4.63 each", begin: "-32s" },
]

function Bodies() {
  return BODIES.map((body) => (
    <circle key={body.color} r={body.r} fill={body.color}>
      <animateMotion dur="24s" begin={body.begin} repeatCount="indefinite" path={ORBIT_INNER} />
    </circle>
  ))
}

/** The home page's orbit, drawn in SVG so these pages stay light: bodies pass behind and
 *  in front of the coin, and expense cards go round it. Reduced motion shows it still. */
function Orbit() {
  return (
    <svg
      aria-hidden="true"
      viewBox="40 60 720 380"
      fill="none"
      className="pointer-events-none mx-auto mt-10 block w-full max-w-[560px] lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-[min(50vw,720px)] lg:max-w-none lg:-translate-y-1/2"
    >
      <defs>
        <radialGradient id="pg-coin" cx="0.36" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#FFF0B8" />
          <stop offset="0.52" stopColor="#FFC94F" />
          <stop offset="1" stopColor="#C77F12" />
        </radialGradient>
        <clipPath id="pg-orbit-front">
          <rect x="0" y="250" width="800" height="250" />
        </clipPath>
      </defs>
      <g transform="rotate(-12 400 250)">
        <path d={ORBIT_CARDS} stroke="#19E4CC" strokeOpacity="0.4" strokeDasharray="6 9" />
        <path d={ORBIT_INNER} stroke="#19E4CC" strokeWidth="1.5" />
        <g className="pg-orbit-move">
          <Bodies />
        </g>
      </g>
      <circle cx="400" cy="250" r="72" fill="url(#pg-coin)" />
      <circle cx="400" cy="250" r="58" stroke="#B9770F" strokeOpacity="0.45" strokeWidth="2" />
      <text x="400" y="278" textAnchor="middle" fontSize="80" fontWeight="700" fill="#8A5206" className="font-display">£</text>
      <g transform="rotate(-12 400 250)">
        <g clipPath="url(#pg-orbit-front)">
          <path d={ORBIT_INNER} stroke="#19E4CC" strokeWidth="1.5" />
          <g className="pg-orbit-move">
            <Bodies />
          </g>
        </g>
        <g className="pg-orbit-move">
          {ORBIT_EXPENSES.map((card) => (
            <g key={card.label}>
              <animateMotion dur="48s" begin={card.begin} repeatCount="indefinite" path={ORBIT_CARDS} />
              <g transform="rotate(12)">
                <rect x="-66" y="-29" width="132" height="58" rx="12" fill="#04201E" stroke="#19E4CC" strokeOpacity="0.55" />
                <text x="-54" y="-5" fontSize="13" fontWeight="600" fill="#FFFFFF" className="font-display">{card.label}</text>
                <text x="54" y="-5" fontSize="13" fontWeight="600" fill="#FFFFFF" textAnchor="end" className="font-display">{card.amount}</text>
                <text x="-54" y="16" fontSize="12" fill="#19E4CC">{card.detail}</text>
              </g>
            </g>
          ))}
        </g>
      </g>
    </svg>
  )
}

export function PageHero({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#031B1A_0%,#07302D_62%,#0B3F3A_100%)] px-6 py-16 lg:flex lg:min-h-[520px] lg:items-center lg:py-20">
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-[40rem] lg:max-w-[44%]">
          <h1 className="font-display text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">{title}</h1>
          <div className="mt-6 text-[18px] leading-[1.6] text-white/78 sm:text-[20px]">{children}</div>
        </div>
      </div>
      <Orbit />
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
