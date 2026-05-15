"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react"
import {
  ArrowDownToLine,
  BarChart3,
  Clock3,
  Crown,
  Database,
  Loader2,
  LockKeyhole,
  LogOut,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react"
import { PayagoWordmark } from "@/components/payago-wordmark"
import { WAITLIST_EMAIL_ERROR, WAITLIST_EMAIL_INPUT_PATTERN, isValidWaitlistEmail } from "@/lib/waitlist-email"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.trim()
const TOKEN_STORAGE_KEY = "payago_admin_waitlist_token"
const DEFAULT_LIMIT = 25
const MAX_SEARCH_LENGTH = 120

type LoginState = "idle" | "loading"
type LoadState = "idle" | "loading" | "ready" | "error"

type Breakdown = {
  value: string
  count: number
}

type WaitlistSignup = {
  id: string
  email: string
  source: string
  campaign: string
  page: string
  interest: string
  referrer: string
  metadata?: unknown
  created_at: string
  updated_at: string
}

type WaitlistListResult = {
  items: WaitlistSignup[]
  total: number
  limit: number
  offset: number
}

type WaitlistStats = {
  total: number
  last_24_hours: number
  last_7_days: number
  campaigns: Breakdown[]
  sources: Breakdown[]
}

type LoginResponse = {
  token?: string
  access_token?: string
}

class AdminAPIError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message)
    this.name = "AdminAPIError"
  }
}

function apiURL(path: string) {
  if (!API_BASE) return null

  try {
    return new URL(path, API_BASE.endsWith("/") ? API_BASE : `${API_BASE}/`).toString()
  } catch {
    return null
  }
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again."
}

function normalizeSearch(value: string) {
  return value.trim().slice(0, MAX_SEARCH_LENGTH)
}

async function parseJSON<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type")
  if (!contentType?.includes("application/json")) {
    throw new Error(`Expected JSON but received HTTP ${response.status}.`)
  }
  return response.json() as Promise<T>
}

async function fetchJSON<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  const endpoint = apiURL(path)
  if (!endpoint) {
    throw new Error("Admin API is not configured for this build.")
  }

  const response = await fetch(endpoint, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  })

  if (response.status === 401) {
    throw new AdminAPIError("Your session expired. Log in again.", response.status)
  }
  if (response.status === 403) {
    throw new AdminAPIError("This account is not approved for waitlist admin access.", response.status)
  }
  if (!response.ok) {
    throw new Error(`Admin API request failed with HTTP ${response.status}.`)
  }

  return parseJSON<T>(response)
}

function formatDateTime(value: string) {
  if (!value) return "—"
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed)
}

function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value)
}

function labelValue(value: string) {
  const trimmed = value.trim()
  return trimmed ? trimmed : "uncategorized"
}

function downloadBlob(blob: Blob, filename: string) {
  const objectURL = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = objectURL
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(objectURL)
}

function LoginPanel({
  onLogin,
  status,
  error,
}: {
  onLogin: (email: string, password: string) => Promise<void>
  status: LoginState
  error: string
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const disabled = status === "loading"

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await onLogin(email, password)
  }

  return (
    <main className="min-h-dvh overflow-hidden bg-[#07080c] text-[#fff4d2]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(246,190,74,0.22),transparent_32%),radial-gradient(circle_at_82%_22%,rgba(74,215,162,0.10),transparent_28%),linear-gradient(135deg,#07080c_0%,#11131b_52%,#3b2a0a_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,236,179,0.42)_1px,transparent_1px),linear-gradient(90deg,rgba(255,236,179,0.42)_1px,transparent_1px)] [background-size:56px_56px]" />

      <section className="relative mx-auto grid min-h-dvh w-full max-w-6xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.55fr)] lg:px-8">
        <div>
          <Link href="/" aria-label="PayaGo home" className="mb-10 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-[#f6be4a]/50">
            <PayagoWordmark className="text-[1.45rem] text-white [&>span:first-child]:text-white" />
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6be4a]/25 bg-[#f6be4a]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffd879]">
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            Internal waitlist CRM
          </div>
          <h1
            className="mt-6 max-w-3xl text-balance text-5xl font-black leading-[0.88] tracking-[-0.08em] text-white sm:text-7xl"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Golden Passport demand, visible to the team.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d9caa6]">
            Approved Payago users can review submitted emails, search by source or campaign, and export a CSV for stakeholder and marketing follow-up.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative rounded-[2rem] border border-[#f6be4a]/24 bg-[#101116]/86 p-3 shadow-[0_40px_90px_rgba(0,0,0,0.36)] backdrop-blur">
          <div className="absolute -right-4 -top-4 grid h-16 w-16 place-items-center rounded-2xl bg-[#f6be4a] text-[#151006] shadow-[0_20px_45px_rgba(246,190,74,0.22)]">
            <Crown className="h-8 w-8" aria-hidden="true" />
          </div>
          <div className="rounded-[1.55rem] border border-white/8 bg-[#171920] p-5 sm:p-6">
            <h2 className="text-2xl font-black tracking-[-0.04em] text-white">Admin login</h2>
            <p className="mt-2 text-sm leading-6 text-white/58">
              Use an approved internal PayaGo account to view submitted early-access emails.
            </p>

            <div className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-bold text-[#ffe7a9]">
                Email
                <input
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  pattern={WAITLIST_EMAIL_INPUT_PATTERN}
                  title={WAITLIST_EMAIL_ERROR}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={disabled}
                  className="min-h-13 rounded-2xl border border-white/10 bg-[#fff7df] px-4 py-3 text-base font-bold text-[#151006] outline-none placeholder:text-slate-400 focus:shadow-[0_0_0_3px_rgba(246,190,74,0.30)] disabled:opacity-70"
                  placeholder="joshuacto@payago.in"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-[#ffe7a9]">
                Password
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={disabled}
                  className="min-h-13 rounded-2xl border border-white/10 bg-[#fff7df] px-4 py-3 text-base font-bold text-[#151006] outline-none placeholder:text-slate-400 focus:shadow-[0_0_0_3px_rgba(246,190,74,0.30)] disabled:opacity-70"
                  placeholder="••••••••"
                />
              </label>
            </div>

            {error ? (
              <div className="mt-4 flex items-start gap-2 rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm font-bold leading-6 text-red-100" role="alert">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={disabled}
              className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#f6be4a] px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#151006] shadow-[0_18px_36px_rgba(246,190,74,0.20)] transition hover:bg-[#ffd879] disabled:cursor-progress disabled:opacity-70"
            >
              {disabled ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ShieldCheck className="h-4 w-4" aria-hidden="true" />}
              {disabled ? "Signing in" : "Open dashboard"}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

function StatCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string
  value: number
  detail: string
  icon: typeof UsersRound
}) {
  return (
    <div className="rounded-[1.5rem] border border-[#f6be4a]/18 bg-[#12141b] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d4aa54]">{label}</p>
          <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-white">{formatNumber(value)}</p>
        </div>
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#f6be4a]/14 text-[#f6be4a]">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-white/54">{detail}</p>
    </div>
  )
}

function BreakdownPill({ item }: { item: Breakdown }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3">
      <span className="min-w-0 truncate text-sm font-bold text-white/78">{labelValue(item.value)}</span>
      <span className="rounded-full bg-[#f6be4a]/14 px-3 py-1 text-xs font-black text-[#ffd879]">{formatNumber(item.count)}</span>
    </div>
  )
}

export function WaitlistAdminClient() {
  const [token, setToken] = useState("")
  const [loginStatus, setLoginStatus] = useState<LoginState>("idle")
  const [loginError, setLoginError] = useState("")
  const [loadState, setLoadState] = useState<LoadState>("idle")
  const [error, setError] = useState("")
  const [stats, setStats] = useState<WaitlistStats | null>(null)
  const [list, setList] = useState<WaitlistListResult>({
    items: [],
    total: 0,
    limit: DEFAULT_LIMIT,
    offset: 0,
  })
  const [searchDraft, setSearchDraft] = useState("")
  const [search, setSearch] = useState("")
  const [campaign, setCampaign] = useState("")
  const [offset, setOffset] = useState(0)
  const [isExporting, setIsExporting] = useState(false)

  const currentPage = Math.floor(offset / DEFAULT_LIMIT) + 1
  const pageCount = Math.max(1, Math.ceil(list.total / DEFAULT_LIMIT))
  const hasPrevious = offset > 0
  const hasNext = offset + list.limit < list.total

  const campaignOptions = useMemo(() => {
    const values = new Set<string>()
    for (const item of stats?.campaigns ?? []) {
      if (item.value && item.value !== "uncategorized") {
        values.add(item.value)
      }
    }
    for (const item of list.items) {
      if (item.campaign) {
        values.add(item.campaign)
      }
    }
    return Array.from(values).sort((a, b) => a.localeCompare(b))
  }, [list.items, stats?.campaigns])

  const loadDashboard = useCallback(async () => {
    if (!token) return

    setLoadState((state) => (state === "idle" ? "loading" : state))
    setError("")

    try {
      const params = new URLSearchParams({
        limit: String(DEFAULT_LIMIT),
        offset: String(offset),
      })
      if (search) params.set("search", search)
      if (campaign) params.set("campaign", campaign)

      const [nextStats, nextList] = await Promise.all([
        fetchJSON<WaitlistStats>("/api/v1/admin/waitlist/stats", token),
        fetchJSON<WaitlistListResult>(`/api/v1/admin/waitlist?${params.toString()}`, token),
      ])

      setStats(nextStats)
      setList(nextList)
      setLoadState("ready")
    } catch (nextError) {
      const message = getErrorMessage(nextError)
      setError(message)
      setLoadState("error")
      if (nextError instanceof AdminAPIError && (nextError.status === 401 || nextError.status === 403)) {
        sessionStorage.removeItem(TOKEN_STORAGE_KEY)
        setLoginError(message)
        setToken("")
      }
    }
  }, [campaign, offset, search, token])

  useEffect(() => {
    const storedToken = sessionStorage.getItem(TOKEN_STORAGE_KEY)
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    if (!token) return
    void loadDashboard()
  }, [loadDashboard, token])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const normalized = normalizeSearch(searchDraft)
      setSearch((previous) => {
        if (previous === normalized) return previous
        setOffset(0)
        return normalized
      })
    }, 350)

    return () => window.clearTimeout(timeout)
  }, [searchDraft])

  async function handleLogin(email: string, password: string) {
    setLoginError("")
    const normalizedEmail = email.trim().toLowerCase()

    if (!isValidWaitlistEmail(normalizedEmail)) {
      setLoginError(WAITLIST_EMAIL_ERROR)
      return
    }
    if (!password.trim()) {
      setLoginError("Enter your password.")
      return
    }

    const endpoint = apiURL("/api/v1/auth/login")
    if (!endpoint) {
      setLoginError("Admin API is not configured for this build.")
      return
    }

    setLoginStatus("loading")
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password }),
      })

      if (response.status === 401) {
        throw new Error("Invalid email or password.")
      }
      if (!response.ok) {
        throw new Error(`Login failed with HTTP ${response.status}.`)
      }

      const payload = await parseJSON<LoginResponse>(response)
      const nextToken = payload.access_token || payload.token
      if (!nextToken) {
        throw new Error("Login response did not include an access token.")
      }

      sessionStorage.setItem(TOKEN_STORAGE_KEY, nextToken)
      setToken(nextToken)
      setLoadState("loading")
    } catch (nextError) {
      setLoginError(getErrorMessage(nextError))
    } finally {
      setLoginStatus("idle")
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY)
    setToken("")
    setStats(null)
    setList({
      items: [],
      total: 0,
      limit: DEFAULT_LIMIT,
      offset: 0,
    })
    setError("")
    setLoadState("idle")
  }

  function applySearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSearch(normalizeSearch(searchDraft))
    setOffset(0)
  }

  async function exportCSV() {
    if (!token) return

    const endpoint = apiURL("/api/v1/admin/waitlist/export.csv")
    if (!endpoint) {
      setError("Admin API is not configured for this build.")
      return
    }

    setIsExporting(true)
    setError("")
    try {
      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.status === 401) {
        throw new AdminAPIError("Your session expired. Log in again.", response.status)
      }
      if (response.status === 403) {
        throw new AdminAPIError("This account is not approved for waitlist admin access.", response.status)
      }
      if (!response.ok) {
        throw new Error(`CSV export failed with HTTP ${response.status}.`)
      }

      const blob = await response.blob()
      const stamp = new Date().toISOString().slice(0, 10)
      downloadBlob(blob, `payago-waitlist-${stamp}.csv`)
    } catch (nextError) {
      const message = getErrorMessage(nextError)
      setError(message)
      if (nextError instanceof AdminAPIError && (nextError.status === 401 || nextError.status === 403)) {
        sessionStorage.removeItem(TOKEN_STORAGE_KEY)
        setLoginError(message)
        setToken("")
      }
    } finally {
      setIsExporting(false)
    }
  }

  if (!token) {
    return <LoginPanel onLogin={handleLogin} status={loginStatus} error={loginError} />
  }

  return (
    <main className="min-h-dvh bg-[#07080c] text-[#fff4d2]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_8%,rgba(246,190,74,0.18),transparent_28%),radial-gradient(circle_at_85%_0%,rgba(74,215,162,0.08),transparent_24%),linear-gradient(135deg,#07080c_0%,#11131b_58%,#251a06_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.075] [background-image:linear-gradient(rgba(255,236,179,0.42)_1px,transparent_1px),linear-gradient(90deg,rgba(255,236,179,0.42)_1px,transparent_1px)] [background-size:58px_58px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-[1.6rem] border border-[#f6be4a]/16 bg-[#101116]/78 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="PayaGo home" className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#f6be4a]/50">
              <PayagoWordmark className="text-[1.35rem] text-white [&>span:first-child]:text-white" />
            </Link>
            <div className="hidden h-8 w-px bg-[#f6be4a]/18 sm:block" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d4aa54]">Private CRM</p>
              <h1 className="text-2xl font-black tracking-[-0.05em] text-white">Waitlist dashboard</h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void loadDashboard()}
              disabled={loadState === "loading"}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-white transition hover:bg-white/[0.08] disabled:cursor-progress disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${loadState === "loading" ? "animate-spin" : ""}`} aria-hidden="true" />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => void exportCSV()}
              disabled={isExporting}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#f6be4a] px-4 py-2 text-sm font-black text-[#151006] transition hover:bg-[#ffd879] disabled:cursor-progress disabled:opacity-70"
            >
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />}
              Export CSV
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-red-300/18 bg-red-500/10 px-4 py-2 text-sm font-black text-red-100 transition hover:bg-red-500/16"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </button>
          </div>
        </header>

        {error ? (
          <div className="mt-5 flex items-start gap-3 rounded-[1.2rem] border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm font-bold leading-6 text-red-100" role="alert">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        ) : null}

        <section className="mt-5 grid gap-4 md:grid-cols-3">
          <StatCard label="Total signups" value={stats?.total ?? list.total} detail="All Golden Passport waitlist rows captured." icon={UsersRound} />
          <StatCard label="Last 24 hours" value={stats?.last_24_hours ?? 0} detail="Fresh demand from recent scans and visits." icon={Clock3} />
          <StatCard label="Last 7 days" value={stats?.last_7_days ?? 0} detail="Weekly acquisition pulse for marketing." icon={BarChart3} />
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="rounded-[1.6rem] border border-[#f6be4a]/16 bg-[#101116]/82 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
              <form onSubmit={applySearch} className="relative">
                <label className="sr-only" htmlFor="waitlist-search">Search waitlist</label>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d4aa54]" aria-hidden="true" />
                <input
                  id="waitlist-search"
                  type="search"
                  value={searchDraft}
                  onChange={(event) => setSearchDraft(event.target.value)}
                  placeholder="Search email, source, campaign, page..."
                  className="min-h-12 w-full rounded-2xl border border-white/10 bg-[#171920] py-3 pl-11 pr-4 text-sm font-bold text-white outline-none placeholder:text-white/34 focus:shadow-[0_0_0_3px_rgba(246,190,74,0.20)]"
                />
              </form>

              <label className="sr-only" htmlFor="campaign-filter">Campaign filter</label>
              <select
                id="campaign-filter"
                value={campaign}
                onChange={(event) => {
                  setCampaign(event.target.value)
                  setOffset(0)
                }}
                className="min-h-12 rounded-2xl border border-white/10 bg-[#171920] px-4 py-3 text-sm font-black text-white outline-none focus:shadow-[0_0_0_3px_rgba(246,190,74,0.20)]"
              >
                <option value="">All campaigns</option>
                {campaignOptions.map((option) => (
                  <option key={option} value={option}>
                    {labelValue(option)}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 overflow-hidden rounded-[1.2rem] border border-white/8">
              <div className="overflow-x-auto">
                <table className="min-w-[1120px] w-full border-collapse text-left text-sm">
                  <thead className="bg-[#f6be4a]/12 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#ffd879]">
                    <tr>
                      {["Email", "Source", "Campaign", "Page", "Interest", "Referrer", "Created", "Updated"].map((heading) => (
                        <th key={heading} scope="col" className="px-4 py-3">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8 bg-[#0d0f15]/72">
                    {loadState === "loading" && list.items.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-sm font-bold text-white/58">
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            Loading waitlist rows
                          </span>
                        </td>
                      </tr>
                    ) : list.items.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-sm font-bold text-white/58">
                          No waitlist signups match the current filters.
                        </td>
                      </tr>
                    ) : (
                      list.items.map((item) => (
                        <tr key={item.id} className="align-top transition hover:bg-white/[0.035]">
                          <td className="px-4 py-4 font-black text-white">{item.email}</td>
                          <td className="px-4 py-4 text-white/70">{labelValue(item.source)}</td>
                          <td className="px-4 py-4">
                            <span className="rounded-full bg-[#f6be4a]/12 px-3 py-1 text-xs font-black text-[#ffd879]">{labelValue(item.campaign)}</span>
                          </td>
                          <td className="px-4 py-4 text-white/70">{labelValue(item.page)}</td>
                          <td className="px-4 py-4 text-white/70">{labelValue(item.interest)}</td>
                          <td className="max-w-[260px] truncate px-4 py-4 text-white/58" title={item.referrer}>
                            {labelValue(item.referrer)}
                          </td>
                          <td className="px-4 py-4 text-white/70">{formatDateTime(item.created_at)}</td>
                          <td className="px-4 py-4 text-white/70">{formatDateTime(item.updated_at)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 text-sm font-bold text-white/58 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Showing {list.total === 0 ? 0 : formatNumber(offset + 1)}-{formatNumber(Math.min(offset + list.items.length, list.total))} of {formatNumber(list.total)}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOffset(Math.max(0, offset - DEFAULT_LIMIT))}
                  disabled={!hasPrevious || loadState === "loading"}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="rounded-xl bg-white/[0.04] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#ffd879]">
                  Page {formatNumber(currentPage)} / {formatNumber(pageCount)}
                </span>
                <button
                  type="button"
                  onClick={() => setOffset(offset + DEFAULT_LIMIT)}
                  disabled={!hasNext || loadState === "loading"}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <aside className="grid content-start gap-5">
            <div className="rounded-[1.6rem] border border-[#f6be4a]/16 bg-[#101116]/82 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d4aa54]">Campaigns</p>
                  <h2 className="mt-1 text-xl font-black tracking-[-0.04em] text-white">Top sources of demand</h2>
                </div>
                <Sparkles className="h-5 w-5 text-[#f6be4a]" aria-hidden="true" />
              </div>
              <div className="grid gap-2">
                {(stats?.campaigns ?? []).length > 0 ? (
                  stats?.campaigns.map((item) => <BreakdownPill key={item.value} item={item} />)
                ) : (
                  <p className="rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm font-bold text-white/52">No campaign data yet.</p>
                )}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-[#f6be4a]/16 bg-[#101116]/82 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d4aa54]">Sources</p>
                  <h2 className="mt-1 text-xl font-black tracking-[-0.04em] text-white">Submission channels</h2>
                </div>
                <Database className="h-5 w-5 text-[#f6be4a]" aria-hidden="true" />
              </div>
              <div className="grid gap-2">
                {(stats?.sources ?? []).length > 0 ? (
                  stats?.sources.map((item) => <BreakdownPill key={item.value} item={item} />)
                ) : (
                  <p className="rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm font-bold text-white/52">No source data yet.</p>
                )}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}
