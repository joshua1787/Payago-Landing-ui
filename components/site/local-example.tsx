"use client"

import { useLocalMoney } from "@/lib/use-local-money"

/** Step examples that mention money, in the visitor's own currency. */
const EXAMPLES: Record<string, { gbp: string; inr: string }> = {
  dinner: { gbp: "£84 dinner", inr: "₹840 dinner" },
  owes: { gbp: "Sam owes you £48.00", inr: "Sam owes you ₹480.00" },
  left: { gbp: "£24 left for today", inr: "₹640 left for today" },
}

export function LocalExample({ text }: { text: string }) {
  const money = useLocalMoney()
  const example = Object.values(EXAMPLES).find((candidate) => candidate.gbp === text)
  if (!example) return <>{text}</>
  return <>{money.symbol === "₹" ? example.inr : example.gbp}</>
}
