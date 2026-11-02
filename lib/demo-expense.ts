// The landing page's small expense reader. It runs in the visitor's browser and
// saves nothing. The app's real reader is on the server and understands far more;
// this handles enough for someone to feel how typing an expense works.

export type DemoExpense = {
  label: string
  amount: number
  symbol: string
}

const MONEY = /([£$€₹])?\s*(\d[\d,]*(?:\.\d{1,2})?)\s*(k)?\b/i
const SPOKEN = /\b(paid|spent|gave|bought)\b/i
const NOT_MONEY = /\b(pm|am|people|pax|days?|nights?|hours?|mins?|minutes?)\b/i

function titleCase(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/** Reads one message, or returns null when it is just chat. */
export function readDemoExpense(message: string, defaultSymbol = "£"): DemoExpense | null {
  const text = message.trim()
  if (!text || text.endsWith("?")) return null

  const found = text.match(MONEY)
  if (!found || found.index === undefined) return null

  const before = text.slice(0, found.index).trim()
  const after = text.slice(found.index + found[0].length).trim()
  const hasSymbol = Boolean(found[1])

  if (!hasSymbol && !SPOKEN.test(text)) {
    if (NOT_MONEY.test(after)) return null
    if (/\b(at|for|by|in|on|around|about)$/i.test(before)) return null
    if (/\d/.test(after)) return null
  }

  const amount = Number(found[2].replace(/,/g, "")) * (found[3] ? 1000 : 1)
  if (!Number.isFinite(amount) || amount <= 0) return null

  const words = [before, after]
    .join(" ")
    .replace(SPOKEN, " ")
    .replace(/\bI\b/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  const given = words.match(/^(?:for|to|on|at)\s+(.+)$/i)
  const named = given && /^[A-Z]/.test(given[1]) && /^(?:for|to)\s/i.test(words)
  const label = given
    ? named
      ? `Given to ${given[1]}`
      : titleCase(given[1])
    : titleCase(words.replace(/\s+(?:for|on|at|to)$/i, "")) || "Expense"

  return { label, amount, symbol: found[1] ?? defaultSymbol }
}

export function formatDemoMoney(amount: number, symbol: string) {
  return `${symbol}${amount.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
