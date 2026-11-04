"use client"

import { type FormEvent, useCallback, useEffect, useState } from "react"

// The site's setting is the bare host, and it may or may not carry the version.
const API_BASE = `${(process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "https://api.payago.in").replace(/\/+$/, "").replace(/\/api\/v1$/, "")}/api/v1`
const TOKEN_KEY = "payago_admin_moderation_token"

type Report = {
  id: number
  reported_at: string
  body: string
  message_removed: boolean
  group: string
  reporter: string
  author_id: string
  author: string
  author_email: string
  author_suspended: boolean
}

type Action = "dismiss" | "remove-message" | "suspend-author"

const CONFIRM: Record<Action, string> = {
  dismiss: "Keep this message, and close the report?",
  "remove-message": "Remove this message for everyone in the group?",
  "suspend-author": "Suspend this person? They'll be signed out and can't sign back in until you undo it.",
}

/** What was reported, in words: cards and attachments are stored as code. */
function readableBody(body: string) {
  const text = body.trim()
  if (text.startsWith("[payago-card]")) {
    try {
      const card = JSON.parse(text.slice("[payago-card]".length))
      return `Expense card: ${card.title ?? "Untitled"} ${card.amount ?? ""}`.trim()
    } catch {
      return "Expense card"
    }
  }
  if (text.startsWith("[attachment:photo]")) return "A photo (open the group to see it)"
  if (text.startsWith("[attachment:voice]")) return "A voice note (open the group to hear it)"
  return text
}

async function api<T>(path: string, token: string, method = "GET"): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  })
  if (response.status === 401) throw new Error("expired")
  if (response.status === 403) throw new Error("This account isn't approved for admin access.")
  if (!response.ok) throw new Error(`That didn't work (HTTP ${response.status}). Try again.`)
  return (await response.json()) as T
}

const field = "w-full rounded-xl border border-[#0F172A]/15 bg-white px-4 py-3 text-[15px] text-[#0F172A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"
const primary = "rounded-full bg-[#0F172A] px-5 py-2.5 font-display text-[14px] font-semibold text-white disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"

function SignIn({ onToken }: { onToken: (token: string) => void }) {
  const [email, setEmail] = useState("joshuacto@payago.in")
  const [code, setCode] = useState("")
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [problem, setProblem] = useState("")

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setProblem("")
    try {
      const response = await fetch(`${API_BASE}/auth/email-otp/${sent ? "verify" : "request"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sent ? { email: email.trim(), code: code.trim() } : { email: email.trim() }),
      })
      if (!response.ok) throw new Error(sent ? "That code is wrong or has expired." : "Couldn't send a code. Try again.")
      if (!sent) {
        setSent(true)
        return
      }
      const data = await response.json()
      const token = data.access_token ?? data.token
      if (!token) throw new Error("Couldn't sign in. Try again.")
      onToken(token)
    } catch (error) {
      setProblem(error instanceof Error ? error.message : "Something went wrong.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 max-w-md space-y-4">
      <div>
        <label htmlFor="admin-email" className="mb-1.5 block text-[14px] font-medium text-[#334155]">Admin email</label>
        <input id="admin-email" type="email" required autoComplete="email" disabled={sent} value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
      </div>
      {sent && (
        <div>
          <label htmlFor="admin-code" className="mb-1.5 block text-[14px] font-medium text-[#334155]">Code from your email</label>
          <input id="admin-code" inputMode="numeric" required autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value)} className={field} />
        </div>
      )}
      {problem && <p role="alert" className="text-[14px] text-[#B4231F]">{problem}</p>}
      <button type="submit" disabled={busy} className={primary}>{sent ? "Sign in" : "Email me a code"}</button>
    </form>
  )
}

export function ModerationClient() {
  const [token, setToken] = useState<string | null>(null)
  const [reports, setReports] = useState<Report[] | null>(null)
  const [blocks, setBlocks] = useState(0)
  const [problem, setProblem] = useState("")
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setToken(sessionStorage.getItem(TOKEN_KEY))
  }, [])

  const signOut = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setReports(null)
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

  const load = useCallback(
    async (current: string) => {
      setProblem("")
      try {
        const data = await api<{ reports: Report[]; blocks_total: number }>("/admin/moderation/reports", current)
        setReports(data.reports)
        setBlocks(data.blocks_total)
      } catch (error) {
        handle(error)
      }
    },
    [handle],
  )

  useEffect(() => {
    if (token) void load(token)
  }, [token, load])

  const act = async (report: Report, action: Action) => {
    if (!token || !window.confirm(CONFIRM[action])) return
    setBusy(true)
    setProblem("")
    try {
      await api(`/admin/moderation/reports/${report.id}/${action}`, token, "POST")
      await load(token)
    } catch (error) {
      handle(error)
    } finally {
      setBusy(false)
    }
  }

  const unsuspend = async (report: Report) => {
    if (!token || !window.confirm(`Let ${report.author} sign in again?`)) return
    setBusy(true)
    setProblem("")
    try {
      await api(`/admin/moderation/users/${report.author_id}/unsuspend`, token, "POST")
      await load(token)
    } catch (error) {
      handle(error)
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="pg-flush mx-auto min-h-screen max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-[32px] font-semibold text-[#0F172A]">Reports</h1>
        {token && <button type="button" onClick={signOut} className="text-[14px] text-[#475569] underline">Sign out</button>}
      </div>
      {!token && <SignIn onToken={(value) => { sessionStorage.setItem(TOKEN_KEY, value); setToken(value) }} />}
      {problem && token && <p role="alert" className="mt-4 text-[14px] text-[#B4231F]">{problem}</p>}
      {token && reports && (
        <>
          <p className="mt-2 text-[15px] text-[#475569]">
            {reports.length === 1 ? "1 report" : `${reports.length} reports`} to review. Please review each within 24 hours. People have made {blocks} {blocks === 1 ? "block" : "blocks"} in total.
          </p>
          {reports.length === 0 && <p className="mt-8 rounded-2xl border border-[#E6E8EF] bg-white p-6 text-[15px] text-[#475569]">Nothing to review.</p>}
          <ul className="mt-6 space-y-4">
            {reports.map((report) => (
              <li key={report.id} data-testid="report" className="rounded-2xl border border-[#E6E8EF] bg-white p-6">
                <p className="whitespace-pre-wrap break-words text-[16px] text-[#0F172A]">{readableBody(report.body)}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-[#475569]">
                  Written by <strong>{report.author}</strong> ({report.author_email}) in {report.group}. Reported by {report.reporter} on {new Date(report.reported_at).toLocaleString("en-GB")}.
                  {report.message_removed && " The message is already removed."}
                  {report.author_suspended && " This person is suspended."}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" disabled={busy} onClick={() => act(report, "dismiss")} className="rounded-full border border-[#0F172A]/15 px-4 py-2 text-[14px] font-medium text-[#0F172A] disabled:opacity-50">Keep it and close</button>
                  <button type="button" disabled={busy || report.message_removed} onClick={() => act(report, "remove-message")} className="rounded-full border border-[#B4231F]/40 px-4 py-2 text-[14px] font-medium text-[#B4231F] disabled:opacity-50">Remove message</button>
                  {report.author_suspended ? (
                    <button type="button" disabled={busy} onClick={() => unsuspend(report)} className="rounded-full border border-[#0F172A]/15 px-4 py-2 text-[14px] font-medium text-[#0F172A] disabled:opacity-50">Undo suspension</button>
                  ) : (
                    <button type="button" disabled={busy} onClick={() => act(report, "suspend-author")} className="rounded-full bg-[#B4231F] px-4 py-2 text-[14px] font-medium text-white disabled:opacity-50">Suspend person</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}
