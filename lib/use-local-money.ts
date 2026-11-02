"use client"

import { useEffect, useState } from "react"

import { POUNDS, detectMoney } from "@/lib/local-money"

export function useLocalMoney() {
  const [money, setMoney] = useState(POUNDS)
  useEffect(() => setMoney(detectMoney()), [])
  return money
}
