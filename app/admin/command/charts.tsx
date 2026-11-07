"use client"

import { useState } from "react"

import { type Cohort, type Day, count, pct } from "./api"

const SIGNUPS = "#2a78d6"
const ACTIVE = "#eb6834"

const shortDay = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" })

/** Sign-ups as bars and people who posted as a line, both counted in people, one axis. */
export function DailyChart({ days }: { days: Day[] }) {
  const [hover, setHover] = useState<number | null>(null)
  const [asTable, setAsTable] = useState(false)
  const width = 720
  const height = 220
  const pad = { top: 12, right: 8, bottom: 24, left: 28 }
  const plotW = width - pad.left - pad.right
  const plotH = height - pad.top - pad.bottom
  const max = Math.max(4, ...days.map((d) => Math.max(d.sign_ups, d.active)))
  const step = max <= 8 ? 2 : max <= 20 ? 5 : max <= 50 ? 10 : 25
  const top = Math.ceil(max / step) * step
  const ticks = Array.from({ length: top / step + 1 }, (_, i) => i * step)
  const slot = plotW / Math.max(1, days.length)
  const bar = Math.max(2, slot - 2)
  const x = (i: number) => pad.left + i * slot
  const y = (v: number) => pad.top + plotH - (v / top) * plotH
  const line = days.map((d, i) => `${i === 0 ? "M" : "L"}${(x(i) + slot / 2).toFixed(1)},${y(d.active).toFixed(1)}`).join(" ")
  const shown = hover === null ? null : days[hover]

  return (
    <figure className="cc-panel">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <figcaption>
          <h3 className="cc-h3">The last 60 days</h3>
          <p className="cc-quiet">Real people only. Days are in UTC.</p>
        </figcaption>
        <div className="flex items-center gap-4 text-[13px] text-[#475569]">
          <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-2.5 rounded-[3px]" style={{ background: SIGNUPS }} />Signed up</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-0.5 w-4 rounded" style={{ background: ACTIVE }} />Posted in a group</span>
          <button type="button" className="cc-link" onClick={() => setAsTable((v) => !v)}>{asTable ? "Show chart" : "Show as table"}</button>
        </div>
      </div>
      {asTable ? (
        <div className="mt-4 max-h-[260px] overflow-auto">
          <table className="cc-table">
            <thead><tr><th>Day</th><th>Signed up</th><th>Posted</th></tr></thead>
            <tbody>
              {[...days].reverse().map((d) => (
                <tr key={d.day}><td>{shortDay(d.day)}</td><td>{d.sign_ups}</td><td>{d.active}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="relative mt-4">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Daily sign-ups and active people over the last 60 days" onMouseLeave={() => setHover(null)}>
            {ticks.map((t) => (
              <g key={t}>
                <line x1={pad.left} x2={width - pad.right} y1={y(t)} y2={y(t)} stroke="#0F172A" strokeOpacity={t === 0 ? 0.25 : 0.07} />
                <text x={pad.left - 6} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#64748B">{t}</text>
              </g>
            ))}
            {days.map((d, i) => {
              const h = (d.sign_ups / top) * plotH
              return (
                <g key={d.day}>
                  {d.sign_ups > 0 && (
                    <path
                      d={`M${x(i) + 1},${pad.top + plotH} v${-Math.max(0, h - 2)} q0,-2 2,-2 h${bar - 4} q2,0 2,2 v${Math.max(0, h - 2)} z`}
                      fill={SIGNUPS}
                      opacity={hover === null || hover === i ? 1 : 0.45}
                    />
                  )}
                  {(i % 10 === 0 || i === days.length - 1) && (
                    <text x={x(i) + slot / 2} y={height - 6} textAnchor="middle" fontSize="11" fill="#64748B">{shortDay(d.day)}</text>
                  )}
                </g>
              )
            })}
            <path d={line} fill="none" stroke={ACTIVE} strokeWidth="2" strokeLinejoin="round" />
            {shown && hover !== null && (
              <>
                <line x1={x(hover) + slot / 2} x2={x(hover) + slot / 2} y1={pad.top} y2={pad.top + plotH} stroke="#0F172A" strokeOpacity="0.2" />
                <circle cx={x(hover) + slot / 2} cy={y(shown.active)} r="4" fill={ACTIVE} stroke="#fff" strokeWidth="2" />
              </>
            )}
            {days.map((d, i) => (
              <rect key={d.day} x={x(i)} y={pad.top} width={slot} height={plotH} fill="transparent" onMouseEnter={() => setHover(i)} />
            ))}
          </svg>
          {shown && hover !== null && (
            <div
              className="pointer-events-none absolute top-0 rounded-lg bg-[#0F172A] px-3 py-2 text-[13px] text-white shadow-lg"
              style={{ left: `${Math.min(80, Math.max(0, ((x(hover) + slot / 2) / width) * 100 - 8))}%` }}
            >
              <p className="font-semibold">{shortDay(shown.day)}</p>
              <p>{shown.sign_ups} signed up</p>
              <p>{shown.active} posted</p>
            </div>
          )}
        </div>
      )}
    </figure>
  )
}

/** Each step as a share of everyone who signed up. */
export function Funnel({ steps }: { steps: { label: string; value: number }[] }) {
  const base = steps[0]?.value ?? 0
  return (
    <div className="cc-panel">
      <h3 className="cc-h3">From sign-up to first expense</h3>
      <p className="cc-quiet">How far real people get. Each bar is a share of everyone who signed up.</p>
      <ol className="mt-5 space-y-3">
        {steps.map((s, i) => {
          const share = pct(s.value, base)
          const drop = i > 0 ? steps[i - 1].value - s.value : 0
          return (
            <li key={s.label}>
              <div className="flex items-baseline justify-between gap-3 text-[14px]">
                <span className="text-[#0F172A]">{s.label}</span>
                <span className="tabular-nums text-[#475569]"><strong className="font-semibold text-[#0F172A]">{count(s.value)}</strong> · {share}%</span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-[#2a78d6]/12" title={`${count(s.value)} people, ${share}%`}>
                <div className="h-2 rounded-full bg-[#2a78d6]" style={{ width: `${Math.max(share, s.value > 0 ? 1 : 0)}%` }} />
              </div>
              {drop > 0 && <p className="mt-1 text-[12px] text-[#64748B]">{count(drop)} stopped before this step</p>}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/** People grouped by the week they joined: did they post, and did they come back a week later? */
export function Cohorts({ cohorts }: { cohorts: Cohort[] }) {
  const cell = (part: number, whole: number) => {
    const share = pct(part, whole)
    return (
      <td>
        <span className="cc-heat" style={{ background: `rgba(42,120,214,${whole ? 0.08 + (share / 100) * 0.4 : 0})`, color: "#0F172A" }}>
          {whole ? `${share}%` : "–"}
        </span>
        <span className="ml-2 text-[12px] text-[#64748B]">{part}</span>
      </td>
    )
  }
  return (
    <div className="cc-panel">
      <h3 className="cc-h3">Do people stay?</h3>
      <p className="cc-quiet">Real people, grouped by the week they signed up. Came back means they posted again a week or more after joining.</p>
      <div className="mt-4 overflow-x-auto">
        <table className="cc-table">
          <thead><tr><th>Week starting</th><th>Joined</th><th>Posted</th><th>Came back</th></tr></thead>
          <tbody>
            {cohorts.length === 0 && <tr><td colSpan={4}>No sign-ups in the last 8 weeks.</td></tr>}
            {[...cohorts].reverse().map((c) => (
              <tr key={c.week}>
                <td>{shortDay(c.week)}</td>
                <td className="tabular-nums">{c.size}</td>
                {cell(c.activated, c.size)}
                {cell(c.returned, c.size)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
