"use client"

import { type FormEvent, useState } from "react"

import { type Deal, type Kind, STAGE_NAMES, api, money } from "./api"

type Draft = {
  id?: number
  kind: Kind
  name: string
  contact: string
  stage: string
  amount: string
  currency: string
  owner: string
  next_step: string
  next_step_on: string
  notes: string
}

const blank = (kind: Kind, stage: string): Draft => ({
  kind, name: "", contact: "", stage, amount: "", currency: "GBP", owner: "", next_step: "", next_step_on: "", notes: "",
})

const fromDeal = (d: Deal): Draft => ({
  id: d.id,
  kind: d.kind,
  name: d.name,
  contact: d.contact,
  stage: d.stage,
  amount: d.amount_minor === null ? "" : String(d.amount_minor / 100),
  currency: d.currency,
  owner: d.owner,
  next_step: d.next_step,
  next_step_on: d.next_step_on ?? "",
  notes: d.notes,
})

const today = () => new Date().toISOString().slice(0, 10)

export function Pipeline({
  token,
  deals,
  stages,
  onChanged,
  onError,
}: {
  token: string
  deals: Deal[]
  stages: Record<Kind, string[]>
  onChanged: () => Promise<void>
  onError: (error: unknown) => void
}) {
  const [kind, setKind] = useState<Kind>("investor")
  const [draft, setDraft] = useState<Draft | null>(null)
  const [busy, setBusy] = useState(false)
  const columns = stages[kind] ?? []
  const mine = deals.filter((d) => d.kind === kind)
  const open = mine.filter((d) => columns.indexOf(d.stage) < columns.length - 2)
  const committed = mine.filter((d) => d.stage === "committed" || d.stage === "closed")
  const sum = (list: Deal[]) => list.reduce((s, d) => s + (d.currency === "GBP" ? d.amount_minor ?? 0 : 0), 0)
  const overdue = mine.filter((d) => d.next_step_on && d.next_step_on < today() && columns.indexOf(d.stage) < columns.length - 2)

  const save = async (event: FormEvent) => {
    event.preventDefault()
    if (!draft) return
    setBusy(true)
    try {
      const amount = draft.amount.trim() === "" ? null : Math.round(Number(draft.amount.replace(/[,£$€₹\s]/g, "")) * 100)
      if (amount !== null && (!Number.isFinite(amount) || amount < 0)) throw new Error("Amount must be a number, like 150000.")
      const body = {
        kind: draft.kind, name: draft.name, contact: draft.contact, stage: draft.stage, amount_minor: amount,
        currency: draft.currency, owner: draft.owner, next_step: draft.next_step, next_step_on: draft.next_step_on || null, notes: draft.notes,
      }
      if (draft.id) await api(`/admin/ops/pipeline/${draft.id}`, token, "PUT", body)
      else await api("/admin/ops/pipeline", token, "POST", body)
      setDraft(null)
      await onChanged()
    } catch (error) {
      onError(error)
    } finally {
      setBusy(false)
    }
  }

  const move = async (deal: Deal, stage: string) => {
    setBusy(true)
    try {
      await api(`/admin/ops/pipeline/${deal.id}`, token, "PUT", { ...deal, stage })
      await onChanged()
    } catch (error) {
      onError(error)
    } finally {
      setBusy(false)
    }
  }

  const remove = async () => {
    if (!draft?.id || !window.confirm(`Delete ${draft.name} from the pipeline?`)) return
    setBusy(true)
    try {
      await api(`/admin/ops/pipeline/${draft.id}`, token, "DELETE")
      setDraft(null)
      await onChanged()
    } catch (error) {
      onError(error)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section aria-labelledby="pipeline-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="pipeline-heading" className="cc-h2">{kind === "investor" ? "Who we're raising from" : "Businesses we're signing"}</h2>
          <p className="cc-quiet mt-1">
            {mine.length === 0
              ? "Nothing here yet. Add the first one."
              : kind === "investor"
                ? `${open.length} in play · ${money(sum(committed), "GBP")} committed${overdue.length ? ` · ${overdue.length} follow-up${overdue.length === 1 ? "" : "s"} overdue` : ""}`
                : `${open.length} in play · ${mine.filter((d) => ["loi_signed", "pilot", "paying"].includes(d.stage)).length} letters signed or better${overdue.length ? ` · ${overdue.length} follow-up${overdue.length === 1 ? "" : "s"} overdue` : ""}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div role="tablist" aria-label="Pipeline" className="cc-seg">
            {(["investor", "business"] as Kind[]).map((k) => (
              <button key={k} role="tab" type="button" aria-selected={kind === k} onClick={() => setKind(k)} className="cc-seg-btn">
                {k === "investor" ? "Investors" : "Businesses"}
              </button>
            ))}
          </div>
          <button type="button" className="cc-primary" onClick={() => setDraft(blank(kind, columns[0]))}>
            Add {kind === "investor" ? "investor" : "business"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid auto-cols-[minmax(140px,1fr)] grid-flow-col gap-3 overflow-x-auto pb-3">
        {columns.map((stage, index) => {
          const cards = mine.filter((d) => d.stage === stage)
          const ended = index >= columns.length - 2
          return (
            <div key={stage} className={`rounded-2xl p-3 ${ended ? "bg-[#0F172A]/[0.03]" : "bg-[#E9EDF7]"}`}>
              <div className="flex items-baseline justify-between px-1">
                <h3 className="text-[14px] font-semibold text-[#0F172A]">{STAGE_NAMES[stage] ?? stage}</h3>
                <span className="text-[12px] tabular-nums text-[#64748B]">{cards.length}</span>
              </div>
              <ul className="mt-3 space-y-2">
                {cards.map((d) => {
                  const late = d.next_step_on && d.next_step_on < today() && !ended
                  return (
                    <li key={d.id} className="rounded-xl bg-white p-3 shadow-[0_1px_0_rgba(15,23,42,0.06)]">
                      <button type="button" className="block w-full text-left" onClick={() => setDraft(fromDeal(d))}>
                        <p className="font-medium text-[#0F172A]">{d.name}</p>
                        {d.amount_minor !== null && <p className="text-[13px] tabular-nums text-[#334155]">{money(d.amount_minor, d.currency)}</p>}
                        {d.next_step && (
                          <p className={`mt-1 text-[12px] ${late ? "text-[#B4231F]" : "text-[#64748B]"}`}>
                            {late ? "Overdue: " : ""}{d.next_step}{d.next_step_on ? `, ${new Date(`${d.next_step_on}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}` : ""}
                          </p>
                        )}
                        {d.owner && <p className="mt-1 text-[12px] text-[#64748B]">{d.owner}</p>}
                      </button>
                      {!ended && index < columns.length - 2 && (
                        <button type="button" disabled={busy} onClick={() => move(d, columns[index + 1])} className="mt-2 block text-left text-[12px] font-medium text-[#4F46E5] disabled:opacity-50">
                          Move to {STAGE_NAMES[columns[index + 1]]}
                        </button>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

      {draft && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#0F172A]/40 p-4 sm:items-center" onClick={() => !busy && setDraft(null)}>
          <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl" aria-labelledby="deal-heading">
            <h3 id="deal-heading" className="cc-h2">{draft.id ? draft.name : draft.kind === "investor" ? "New investor" : "New business"}</h3>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <label className="cc-label col-span-2">Name
                <input required maxLength={200} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="cc-field" autoFocus />
              </label>
              <label className="cc-label col-span-2">Contact
                <input maxLength={300} placeholder="Person, email or phone" value={draft.contact} onChange={(e) => setDraft({ ...draft, contact: e.target.value })} className="cc-field" />
              </label>
              <label className="cc-label">Stage
                <select value={draft.stage} onChange={(e) => setDraft({ ...draft, stage: e.target.value })} className="cc-field">
                  {(stages[draft.kind] ?? []).map((s) => <option key={s} value={s}>{STAGE_NAMES[s] ?? s}</option>)}
                </select>
              </label>
              <label className="cc-label">Who owns it
                <input maxLength={100} placeholder="Kishore" value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })} className="cc-field" />
              </label>
              <label className="cc-label">{draft.kind === "investor" ? "Cheque" : "Yearly value"}
                <input inputMode="decimal" placeholder="150000" value={draft.amount} onChange={(e) => setDraft({ ...draft, amount: e.target.value })} className="cc-field" />
              </label>
              <label className="cc-label">Currency
                <select value={draft.currency} onChange={(e) => setDraft({ ...draft, currency: e.target.value })} className="cc-field">
                  {["GBP", "INR", "USD", "EUR"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              <label className="cc-label">Next step
                <input maxLength={500} placeholder="Send the deck" value={draft.next_step} onChange={(e) => setDraft({ ...draft, next_step: e.target.value })} className="cc-field" />
              </label>
              <label className="cc-label">By
                <input type="date" value={draft.next_step_on} onChange={(e) => setDraft({ ...draft, next_step_on: e.target.value })} className="cc-field" />
              </label>
              <label className="cc-label col-span-2">Notes
                <textarea rows={4} maxLength={5000} value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} className="cc-field" />
              </label>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              {draft.id ? <button type="button" disabled={busy} onClick={remove} className="text-[14px] font-medium text-[#B4231F] disabled:opacity-50">Delete</button> : <span />}
              <div className="flex gap-2">
                <button type="button" disabled={busy} onClick={() => setDraft(null)} className="cc-secondary">Cancel</button>
                <button type="submit" disabled={busy} className="cc-primary">{draft.id ? "Save changes" : "Add to pipeline"}</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}
