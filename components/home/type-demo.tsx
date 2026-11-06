"use client"

import { useMemo, useState } from "react"

import { captureEvent } from "@/lib/analytics"
import { formatDemoMoney, readDemoExpense } from "@/lib/demo-expense"

const EXAMPLES = ["£84 dinner", "£420 for the flat", "taxi 18.50", "60 for Sam", "table for 4"]
const PEOPLE = ["You", "Sam", "Priya", "Tom", "Asha"]

export function TypeDemo() {
  const [message, setMessage] = useState("£84 dinner")
  const [draft, setDraft] = useState("")
  const [group, setGroup] = useState(4)

  const expense = useMemo(() => readDemoExpense(message), [message])
  const others = PEOPLE.slice(1, group)
  const share = expense ? expense.amount / group : 0

  const send = (text: string) => {
    if (!text.trim()) return
    setMessage(text.trim())
    setDraft("")
    captureEvent("home_type_demo_send")
  }

  const names =
    others.length === 1
      ? others[0]
      : `${others.slice(0, -1).join(", ")} and ${others[others.length - 1]}`

  return (
    <div className="rounded-[28px] bg-[#F4F6FB] p-4 shadow-[0_40px_80px_-40px_rgba(3,27,26,0.7)] sm:p-6">
      <div className="flex min-h-[218px] flex-col justify-end gap-3" aria-live="polite">
        <p
          data-testid="demo-message"
          className="max-w-[85%] self-end rounded-[20px] rounded-br-md bg-[#0F8D83] px-4 py-2.5 text-[15px] text-[#0F172A]"
        >
          {message}
        </p>

        {expense ? (
          <div data-testid="demo-card" className="rounded-[20px] bg-[#0D3532] p-4 text-[#0F172A]">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-[17px] font-semibold">{expense.label}</span>
              <span className="font-display text-[20px] font-semibold tabular-nums">
                {formatDemoMoney(expense.amount, expense.symbol)}
              </span>
            </div>
            <p className="mt-1 text-[13px] text-[#475569]">You paid</p>
            <p className="mt-3 rounded-2xl bg-[#F4F6FB] px-3.5 py-2.5 text-[14px] leading-snug text-[#334155]">
              {names} {others.length === 1 ? "owes" : "each owe"} you{" "}
              <span className="font-semibold text-[#6D4AE8] tabular-nums">
                {formatDemoMoney(share, expense.symbol)}
              </span>
            </p>
          </div>
        ) : (
          <p data-testid="demo-chat" className="self-start rounded-2xl px-1 text-[14px] text-[#64748B]">
            That reads as chat, so it stays chat. Nothing is recorded.
          </p>
        )}
      </div>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault()
          send(draft)
        }}
      >
        <label className="sr-only" htmlFor="demo-input">
          Type an expense
        </label>
        <input
          id="demo-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type an expense"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-full bg-[#0D3532] px-5 py-3 text-[15px] text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"
        />
        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white transition-opacity hover:opacity-90 px-5 py-3 font-display text-[14px] font-semibold    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"
        >
          Send
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => send(example)}
            aria-pressed={message === example}
            className={`rounded-full px-3 py-1.5 text-[13px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF] ${
              message === example
                ? "bg-[#0F172A] text-white "
                : "bg-white border border-[#0F172A]/10 text-[#475569] hover:bg-white/15"
            }`}
          >
            {example}
          </button>
        ))}
      </div>

      <fieldset className="mt-4 flex items-center gap-3 text-[13px] text-[#475569]">
        <legend className="sr-only">How many people to split between</legend>
        <span aria-hidden="true">Split between</span>
        {[2, 3, 4, 5].map((count) => (
          <button
            key={count}
            type="button"
            aria-label={`${count} people`}
            aria-pressed={group === count}
            onClick={() => setGroup(count)}
            className={`h-8 w-8 rounded-full font-display text-[13px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF] ${
              group === count ? "bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white transition-opacity hover:opacity-90 " : "bg-white border border-[#0F172A]/10 text-[#475569] hover:bg-white/15"
            }`}
          >
            {count}
          </button>
        ))}
      </fieldset>
    </div>
  )
}
