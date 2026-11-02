// Pounds for most visitors, rupees for visitors in India. Worked out in the browser
// from the time zone and language, and never sent anywhere.

export type LocalMoney = {
  symbol: string
  home: { lat: number; lng: number; name: string }
  expenseChips: string[]
  orbitCards: { label: string; amount: string; detail: string }[]
  leftToday: string
  /** Multiplies the trip demo's example prices, which are written in pounds. */
  tripRate: number
  tripRound: number
  numberLocale: string
}

export const POUNDS: LocalMoney = {
  symbol: "£",
  home: { lat: 51.5, lng: -0.12, name: "London" },
  expenseChips: ["£84 dinner", "£420 for the flat", "taxi 18.50", "60 for Sam"],
  orbitCards: [
    { label: "Dinner", amount: "£84.00", detail: "£21.00 each" },
    { label: "The flat", amount: "£420.00", detail: "£105.00 each" },
    { label: "Taxi", amount: "£18.50", detail: "£4.63 each" },
  ],
  leftToday: "£24",
  tripRate: 1,
  tripRound: 10,
  numberLocale: "en-GB",
}

export const RUPEES: LocalMoney = {
  symbol: "₹",
  home: { lat: 28.61, lng: 77.21, name: "Delhi" },
  expenseChips: ["₹840 dinner", "₹24,000 for the flat", "auto 180", "600 for Sam"],
  orbitCards: [
    { label: "Dinner", amount: "₹840.00", detail: "₹210.00 each" },
    { label: "The flat", amount: "₹24,000.00", detail: "₹6,000.00 each" },
    { label: "Taxi", amount: "₹420.00", detail: "₹105.00 each" },
  ],
  leftToday: "₹640",
  tripRate: 100,
  tripRound: 1000,
  numberLocale: "en-IN",
}

export function detectMoney(): LocalMoney {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const inIndia = zone === "Asia/Kolkata" || zone === "Asia/Calcutta" || navigator.language.endsWith("-IN")
  return inIndia ? RUPEES : POUNDS
}

export const PLAY_URL = "https://play.google.com/store/apps/details?id=com.payago.app"
