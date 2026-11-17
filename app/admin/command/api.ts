// The site's setting is the bare host, and it may or may not carry the version.
export const API_BASE = `${(process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "https://api.payago.in").replace(/\/+$/, "").replace(/\/api\/v1$/, "")}/api/v1`
export const TOKEN_KEY = "payago_admin_command_token"

export async function api<T>(path: string, token: string, method = "GET", body?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  if (response.status === 401) throw new Error("expired")
  if (response.status === 403) throw new Error("This account isn't approved for admin access.")
  if (!response.ok) {
    let message = `That didn't work (HTTP ${response.status}). Try again.`
    try {
      const data = await response.json()
      const detail = data?.error?.message ?? data?.message
      if (typeof detail === "string" && detail) message = detail.charAt(0).toUpperCase() + detail.slice(1) + "."
    } catch {}
    throw new Error(message)
  }
  return (await response.json()) as T
}

export type Day = { day: string; sign_ups: number; active: number }
export type Cohort = { week: string; size: number; activated: number; returned: number }
export type StageTotal = { stage: string; count: number; amount_minor: number }
export type Kind = "investor" | "business"

export type Cash = {
  id: number
  as_of: string
  cash_minor: number
  monthly_burn_minor: number
  currency: string
  note: string
}

export type Deal = {
  id: number
  kind: Kind
  name: string
  contact: string
  stage: string
  amount_minor: number | null
  currency: string
  owner: string
  next_step: string
  next_step_on: string | null
  notes: string
  updated_at: string
}

export type Overview = {
  generated_at: string
  real_user_rule_excluded_domains: string[]
  users: {
    real: number
    all_accounts: number
    new_today: number
    new_7d: number
    new_30d: number
    new_prev_30d: number
    weekly_active: number
    monthly_active: number
    prev_weekly_active: number
    ever_active: number
    suspended: number
  }
  funnel: { signed_up: number; joined_group: number; sent_message: number; added_expense: number }
  daily: Day[]
  cohorts: Cohort[]
  groups: { total: number; active_30d: number; by_currency: { currency: string; groups: number; active_30d: number }[] }
  money: { expenses_30d: number; expenses_ever: number; by_currency_30d: { currency: string; expenses: number; total_minor: number }[] }
  waitlist: { total: number; new_30d: number }
  health: {
    database_bytes: number
    migration_version: number
    migration_dirty: boolean
    open_reports: number
    oldest_open_report_at: string | null
    server_time: string
  }
  cash: Cash[]
  pipeline: Record<Kind, StageTotal[]>
  stages: Record<Kind, string[]>
}

export const STAGE_NAMES: Record<string, string> = {
  target: "To approach",
  contacted: "Contacted",
  meeting: "Meeting",
  diligence: "Diligence",
  committed: "Committed",
  closed: "Money in",
  passed: "Passed",
  demo: "Demo",
  loi_signed: "Letter signed",
  pilot: "Pilot",
  paying: "Paying",
  lost: "Lost",
}

export function money(minor: number, currency: string, compact = false) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency.trim() || "GBP",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(minor / 100)
}

export const count = (n: number) => new Intl.NumberFormat("en-GB").format(n)

export const pct = (part: number, whole: number) => (whole > 0 ? Math.round((part / whole) * 100) : 0)
