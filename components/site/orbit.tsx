"use client"

import { useLocalMoney } from "@/lib/use-local-money"

const ORBIT_INNER = "M 230 250 a 170 62 0 1 0 340 0 a 170 62 0 1 0 -340 0"
const ORBIT_CARDS = "M 120 250 a 280 104 0 1 0 560 0 a 280 104 0 1 0 -560 0"

const BODIES = [
  { color: "#FFC65C", r: 7, begin: "0s" },
  { color: "#19E4CC", r: 6, begin: "-6s" },
  { color: "#A29CFF", r: 6, begin: "-12s" },
  { color: "#FF9E85", r: 5, begin: "-18s" },
]

const CARD_STARTS = ["0s", "-16s", "-32s"]

function Bodies() {
  return BODIES.map((body) => (
    <circle key={body.color} r={body.r} fill={body.color}>
      <animateMotion dur="24s" begin={body.begin} repeatCount="indefinite" path={ORBIT_INNER} />
    </circle>
  ))
}

/** The home page's orbit, drawn in SVG so these pages stay light: bodies pass behind and
 *  in front of the coin, and expense cards go round it. Reduced motion shows it still. */
export function Orbit() {
  const money = useLocalMoney()
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
      <text x="400" y="278" textAnchor="middle" fontSize="80" fontWeight="700" fill="#8A5206" className="font-display">{money.symbol}</text>
      <g transform="rotate(-12 400 250)">
        <g clipPath="url(#pg-orbit-front)">
          <path d={ORBIT_INNER} stroke="#19E4CC" strokeWidth="1.5" />
          <g className="pg-orbit-move">
            <Bodies />
          </g>
        </g>
        <g className="pg-orbit-move">
          {money.orbitCards.map((card, i) => (
            <g key={card.label}>
              <animateMotion dur="48s" begin={CARD_STARTS[i]} repeatCount="indefinite" path={ORBIT_CARDS} />
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
