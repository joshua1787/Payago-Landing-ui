"use client"

import { type FormEvent, type ReactNode, useCallback, useEffect, useState } from "react"

import { SignIn } from "../moderation/moderation-client"
import { type Deal, type Overview, API_BASE, TOKEN_KEY, api, count, money, pct } from "./api"
import { Cohorts, DailyChart, Funnel } from "./charts"
import { Pipeline } from "./pipeline"

type Tab = "today" | "users" | "pipeline" | "cash" | "health"
const TABS: { id: Tab; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "users", label: "Users" },
  { id: "pipeline", label: "Pipeline" },
  { id: "cash", label: "Cash" },
  { id: "health", label: "App health" },
]

// What the investor deck (Nov 2026) claims, kept here so the gap is never out of sight.
const DECK_CLAIMS = { users: 500, waitlist: 200 }

function change(now: number, before: number, period: string) {
  if (now === before) return `same as ${period}`
  return `${now > before ? "up" : "down"} from ${count(before)} ${period}`
}

function Tile({ label, value, note, tone = "neutral" }: { label: string; value: ReactNode; note?: string; tone?: "neutral" | "good" | "bad" }) {
  return (
    <div className="cc-tile">
      <p className="text-[14px] text-[#475569]">{label}</p>
      <p className="mt-1 font-display text-[34px] font-semibold leading-none tabular-nums text-[#0F172A]">{value}</p>
      {note && <p className={`mt-2 text-[13px] ${tone === "good" ? "text-[#0F7B53]" : tone === "bad" ? "text-[#B4231F]" : "text-[#64748B]"}`}>{note}</p>}
    </div>
  )
}

function Headline({ o }: { o: Overview }) {
  const u = o.users
  const weekly =
    u.weekly_active === 0
      ? "Nobody posted in a group this week."
      : `${count(u.weekly_active)} of them posted in a group this week, ${change(u.weekly_active, u.prev_weekly_active, "the week before")}.`
  return (
    <div className="max-w-4xl">
      <h1 className="cc-headline">
        {count(u.real)} real {u.real === 1 ? "person has" : "people have"} signed up. {weekly}
      </h1>
      <p className="mt-4 text-[16px] leading-relaxed text-[#475569]">
        {count(u.new_7d)} joined in the last 7 days and {count(u.new_30d)} in the last 30 ({change(u.new_30d, u.new_prev_30d, "the 30 days before")}).
        There are {count(u.all_accounts)} accounts in total; the other {count(u.all_accounts - u.real)} are test and team accounts.
      </p>
    </div>
  )
}

function DeckCheck({ o }: { o: Overview }) {
  const rows = [
    { claim: `${DECK_CLAIMS.users}+ users`, live: `${count(o.users.real)} real people, ${count(o.users.weekly_active)} active this week`, ok: o.users.real >= DECK_CLAIMS.users },
    { claim: `${DECK_CLAIMS.waitlist}+ on the waitlist`, live: `${count(o.waitlist.total)} on the waitlist`, ok: o.waitlist.total >= DECK_CLAIMS.waitlist },
  ]
  return (
    <div className="cc-panel">
      <h3 className="cc-h3">Deck check</h3>
      <p className="cc-quiet">What the investor deck says, next to the live numbers. Fix the deck before it goes out, or grow the numbers until it's true.</p>
      <ul className="mt-4 divide-y divide-[#0F172A]/8">
        {rows.map((r) => (
          <li key={r.claim} className="flex flex-wrap items-baseline justify-between gap-2 py-3 text-[14px]">
            <span className="text-[#334155]">Deck says {r.claim}</span>
            <span className={`flex items-center gap-1.5 font-medium ${r.ok ? "text-[#0F7B53]" : "text-[#B4231F]"}`}>
              <span aria-hidden>{r.ok ? "✓" : "✕"}</span>
              <span className="sr-only">{r.ok ? "Matches:" : "Doesn't match:"}</span>
              {r.live}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TodayTab({ o }: { o: Overview }) {
  const u = o.users
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile label="Active this week" value={count(u.weekly_active)} note={change(u.weekly_active, u.prev_weekly_active, "last week")} tone={u.weekly_active > u.prev_weekly_active ? "good" : u.weekly_active < u.prev_weekly_active ? "bad" : "neutral"} />
        <Tile label="Active this month" value={count(u.monthly_active)} note={`${pct(u.monthly_active, u.real)}% of real people`} />
        <Tile label="New this week" value={count(u.new_7d)} note={`${count(u.new_today)} today`} />
        <Tile label="Groups active this month" value={count(o.groups.active_30d)} note={`of ${count(o.groups.total)} groups with a real person`} />
      </div>
      <DailyChart days={o.daily} />
      <div className="grid gap-6 lg:grid-cols-2">
        <DeckCheck o={o} />
        <Funnel steps={[
          { label: "Signed up", value: o.funnel.signed_up },
          { label: "Joined a group", value: o.funnel.joined_group },
          { label: "Posted a message", value: o.funnel.sent_message },
          { label: "Added an expense", value: o.funnel.added_expense },
        ]} />
      </div>
    </div>
  )
}

function UsersTab({ o }: { o: Overview }) {
  return (
    <div className="space-y-6">
      <Cohorts cohorts={o.cohorts} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="cc-panel">
          <h3 className="cc-h3">Groups by currency</h3>
          <p className="cc-quiet">The currency a group was set up in is the best sign of where it is.</p>
          <table className="cc-table mt-4">
            <thead><tr><th>Currency</th><th>Groups</th><th>Active this month</th></tr></thead>
            <tbody>
              {o.groups.by_currency.length === 0 && <tr><td colSpan={3}>No groups with a real person yet.</td></tr>}
              {o.groups.by_currency.map((g) => (
                <tr key={g.currency}><td>{g.currency}</td><td className="tabular-nums">{g.groups}</td><td className="tabular-nums">{g.active_30d}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cc-panel">
          <h3 className="cc-h3">Money tracked in the last 30 days</h3>
          <p className="cc-quiet">{count(o.money.expenses_30d)} expenses in groups with a real person ({count(o.money.expenses_ever)} ever). This is money people logged, not money PayaGo earned.</p>
          <table className="cc-table mt-4">
            <thead><tr><th>Currency</th><th>Expenses</th><th>Total</th></tr></thead>
            <tbody>
              {o.money.by_currency_30d.length === 0 && <tr><td colSpan={3}>No expenses this month.</td></tr>}
              {o.money.by_currency_30d.map((m) => (
                <tr key={m.currency}><td>{m.currency}</td><td className="tabular-nums">{m.expenses}</td><td className="tabular-nums">{money(m.total_minor, m.currency)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile label="Waitlist" value={count(o.waitlist.total)} note={`${count(o.waitlist.new_30d)} in the last 30 days`} />
        <Tile label="Ever posted" value={count(o.users.ever_active)} note={`${pct(o.users.ever_active, o.users.real)}% of real people`} />
        <Tile label="Suspended" value={count(o.users.suspended)} />
        <Tile label="All accounts" value={count(o.users.all_accounts)} note="including test and team" />
      </div>
      <p className="text-[13px] text-[#64748B]">Real people are every account except these email domains: {o.real_user_rule_excluded_domains.join(", ")}.</p>
    </div>
  )
}

function CashTab({ o, token, onChanged, onError }: { o: Overview; token: string; onChanged: () => Promise<void>; onError: (e: unknown) => void }) {
  const latest = o.cash[0]
  const [form, setForm] = useState({ as_of: new Date().toISOString().slice(0, 10), cash: "", burn: "", note: "" })
  const [busy, setBusy] = useState(false)
  const months = latest && latest.monthly_burn_minor > 0 ? latest.cash_minor / latest.monthly_burn_minor : null
  const runsOut = months === null || !latest ? null : new Date(new Date(`${latest.as_of}T00:00:00`).getTime() + months * 30.44 * 86400000)

  const save = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    try {
      const pounds = (s: string) => Math.round(Number(s.replace(/[,£\s]/g, "")) * 100)
      const cash = pounds(form.cash)
      const burn = pounds(form.burn)
      if (!Number.isFinite(cash) || !Number.isFinite(burn) || burn < 0) throw new Error("Enter cash and monthly spend as numbers, like 42000.")
      await api("/admin/ops/cash", token, "POST", { as_of: form.as_of, cash_minor: cash, monthly_burn_minor: burn, currency: "GBP", note: form.note })
      setForm({ ...form, cash: "", burn: "", note: "" })
      await onChanged()
    } catch (error) {
      onError(error)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-6">
        {latest ? (
          <div className="cc-panel">
            <p className="text-[14px] text-[#475569]">On {new Date(`${latest.as_of}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
            <p className="cc-headline mt-2">
              {money(latest.cash_minor, latest.currency)} in the bank, spending {money(latest.monthly_burn_minor, latest.currency)} a month.
              {months !== null && runsOut && ` That lasts ${months.toFixed(1)} months, until ${runsOut.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}.`}
            </p>
            {months !== null && months < 6 && <p className="mt-3 text-[14px] font-medium text-[#B4231F]">Under 6 months left. A round takes 4 to 6 months to close, so fundraising needs to start now.</p>}
          </div>
        ) : (
          <div className="cc-panel">
            <h3 className="cc-h3">No cash figure yet</h3>
            <p className="cc-quiet">Add today's bank balance and what you spend in a typical month. The runway works itself out.</p>
          </div>
        )}
        {o.cash.length > 0 && (
          <div className="cc-panel">
            <h3 className="cc-h3">History</h3>
            <table className="cc-table mt-3">
              <thead><tr><th>Date</th><th>Cash</th><th>Monthly spend</th><th>Note</th></tr></thead>
              <tbody>
                {o.cash.map((c) => (
                  <tr key={c.id}><td>{c.as_of}</td><td className="tabular-nums">{money(c.cash_minor, c.currency)}</td><td className="tabular-nums">{money(c.monthly_burn_minor, c.currency)}</td><td>{c.note}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <form onSubmit={save} className="cc-panel h-fit space-y-3">
        <h3 className="cc-h3">Update cash</h3>
        <p className="cc-quiet">Do this once a month, from the bank statement. Pounds only.</p>
        <label className="cc-label">Date<input type="date" required value={form.as_of} onChange={(e) => setForm({ ...form, as_of: e.target.value })} className="cc-field" /></label>
        <label className="cc-label">Cash in the bank (£)<input required inputMode="decimal" placeholder="42000" value={form.cash} onChange={(e) => setForm({ ...form, cash: e.target.value })} className="cc-field" /></label>
        <label className="cc-label">Spent in a typical month (£)<input required inputMode="decimal" placeholder="3500" value={form.burn} onChange={(e) => setForm({ ...form, burn: e.target.value })} className="cc-field" /></label>
        <label className="cc-label">Note<input maxLength={1000} placeholder="After the October invoices" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="cc-field" /></label>
        <button type="submit" disabled={busy} className="cc-primary">Save cash figure</button>
      </form>
    </div>
  )
}

const LINKS = [
  { label: "Reports to review", href: "/admin/moderation/" },
  { label: "Waitlist", href: "/admin/waitlist/" },
  { label: "Google Play Console", href: "https://play.google.com/console/u/0/developers" },
  { label: "App Store Connect", href: "https://appstoreconnect.apple.com/apps" },
  { label: "Sentry errors", href: "https://sentry.io/" },
  { label: "Hetzner servers", href: "https://console.hetzner.cloud/" },
]

function HealthTab({ o, latency }: { o: Overview; latency: number | null }) {
  const h = o.health
  const reportAge = h.oldest_open_report_at ? (Date.now() - new Date(h.oldest_open_report_at).getTime()) / 3600000 : 0
  const status = [
    { label: "API", ok: latency !== null && latency < 1500, text: latency === null ? "Not measured" : `Answered in ${latency} ms` },
    { label: "Database", ok: !h.migration_dirty, text: `${(h.database_bytes / 1048576).toFixed(0)} MB · schema version ${h.migration_version}${h.migration_dirty ? " · last migration failed" : ""}` },
    { label: "Reports", ok: h.open_reports === 0 || reportAge < 24, text: h.open_reports === 0 ? "Nothing to review" : `${h.open_reports} open, oldest ${Math.round(reportAge)} hours (promise: within 24)` },
  ]
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="cc-panel">
        <h3 className="cc-h3">Production</h3>
        <ul className="mt-3 divide-y divide-[#0F172A]/8">
          {status.map((s) => (
            <li key={s.label} className="flex items-baseline justify-between gap-3 py-3 text-[14px]">
              <span className="flex items-center gap-2 font-medium text-[#0F172A]">
                <span aria-hidden className={s.ok ? "text-[#0F7B53]" : "text-[#B4231F]"}>{s.ok ? "●" : "▲"}</span>
                {s.label}
                <span className="sr-only">{s.ok ? "fine" : "needs attention"}</span>
              </span>
              <span className={`text-right ${s.ok ? "text-[#475569]" : "font-medium text-[#B4231F]"}`}>{s.text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] text-[#64748B]">Server clock {new Date(h.server_time).toLocaleString("en-GB")}. API at {API_BASE}.</p>
      </div>
      <div className="cc-panel">
        <h3 className="cc-h3">Everything else</h3>
        <ul className="mt-3 space-y-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="cc-link text-[15px]">{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function CommandClient() {
  const [token, setToken] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>("today")
  const [overview, setOverview] = useState<Overview | null>(null)
  const [deals, setDeals] = useState<Deal[]>([])
  const [latency, setLatency] = useState<number | null>(null)
  const [problem, setProblem] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setToken(sessionStorage.getItem(TOKEN_KEY))
    const fromHash = window.location.hash.slice(1) as Tab
    if (TABS.some((t) => t.id === fromHash)) setTab(fromHash)
  }, [])

  const signOut = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setOverview(null)
  }, [])

  const handle = useCallback(
    (error: unknown) => {
      if (error instanceof Error && error.message === "expired") {
        signOut()
        return
      }
      setProblem(error instanceof Error ? error.message : "Something went wrong.")
    },
    [signOut],
  )

  const load = useCallback(async () => {
    if (!token) return
    setLoading(true)
    try {
      const started = performance.now()
      const [o, d] = await Promise.all([
        api<Overview>("/admin/ops/overview", token),
        api<{ deals: Deal[] }>("/admin/ops/pipeline", token),
      ])
      setLatency(Math.round(performance.now() - started))
      setOverview(o)
      setDeals(d.deals)
      setProblem("")
    } catch (error) {
      handle(error)
    } finally {
      setLoading(false)
    }
  }, [token, handle])

  useEffect(() => {
    void load()
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") void load()
    }, 60000)
    return () => window.clearInterval(timer)
  }, [load])

  const choose = (next: Tab) => {
    setTab(next)
    history.replaceState(null, "", `#${next}`)
  }

  return (
    <main className="pg-flush min-h-screen bg-[#F4F6FB]">
      <header className="sticky top-0 z-40 border-b border-[#0F172A]/8 bg-[#F4F6FB]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3">
          <p className="font-display text-[18px] font-semibold text-[#0F172A]">PayaGo command centre</p>
          {token && (
            <div className="flex items-center gap-4 text-[13px] text-[#475569]">
              {overview && <span>Updated {new Date(overview.generated_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span>}
              <button type="button" onClick={() => void load()} disabled={loading} className="cc-link disabled:opacity-50">{loading ? "Refreshing" : "Refresh"}</button>
              <button type="button" onClick={signOut} className="cc-link">Sign out</button>
            </div>
          )}
        </div>
        {token && (
          <nav aria-label="Sections" className="mx-auto max-w-6xl overflow-x-auto px-6">
            <div role="tablist" className="flex gap-1">
              {TABS.map((t) => (
                <button key={t.id} role="tab" type="button" aria-selected={tab === t.id} onClick={() => choose(t.id)} className="cc-tab">{t.label}</button>
              ))}
            </div>
          </nav>
        )}
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {!token && (
          <div className="max-w-xl">
            <h1 className="cc-headline">Every number that matters, in one place, and every one of them real.</h1>
            <SignIn onToken={(value) => { sessionStorage.setItem(TOKEN_KEY, value); setToken(value) }} />
          </div>
        )}
        {token && problem && <p role="alert" className="mb-6 rounded-xl bg-[#B4231F]/8 px-4 py-3 text-[14px] text-[#B4231F]">{problem}</p>}
        {token && !overview && !problem && <p className="text-[15px] text-[#475569]">Loading the live numbers.</p>}
        {token && overview && (
          <div className="space-y-10">
            {(tab === "today" || tab === "users") && <Headline o={overview} />}
            {tab === "today" && <TodayTab o={overview} />}
            {tab === "users" && <UsersTab o={overview} />}
            {tab === "pipeline" && <Pipeline token={token} deals={deals} stages={overview.stages} onChanged={load} onError={handle} />}
            {tab === "cash" && <CashTab o={overview} token={token} onChanged={load} onError={handle} />}
            {tab === "health" && <HealthTab o={overview} latency={latency} />}
          </div>
        )}
      </div>
    </main>
  )
}
