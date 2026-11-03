import { POUNDS, type LocalMoney } from "@/lib/local-money"

// Reads a trip out of a sentence for the preview on the home page. It runs in the
// browser and saves nothing. Whole trips aren't open yet: this shows the idea, and
// the plans it shows are examples, not offers.

export type DemoTrip = {
  place: string
  lat: number
  lng: number
  days: number
  people: number
  plans: { name: string; detail: string; price: string }[]
}

const PLACES: { words: string[]; place: string; lat: number; lng: number; base: number }[] = [
  { words: ["japan", "tokyo", "kyoto", "osaka"], place: "Japan", lat: 35.68, lng: 139.69, base: 780 },
  { words: ["barcelona", "spain", "madrid"], place: "Spain", lat: 41.39, lng: 2.17, base: 260 },
  { words: ["bali", "indonesia"], place: "Bali", lat: -8.41, lng: 115.19, base: 720 },
  { words: ["goa", "india", "mumbai", "delhi", "kerala", "chennai", "bangalore"], place: "India", lat: 15.3, lng: 74.12, base: 560 },
  { words: ["dubai", "uae"], place: "Dubai", lat: 25.2, lng: 55.27, base: 520 },
  { words: ["new york", "nyc", "america", "usa"], place: "New York", lat: 40.71, lng: -74.0, base: 690 },
  { words: ["paris", "france"], place: "Paris", lat: 48.85, lng: 2.35, base: 240 },
  { words: ["lisbon", "portugal", "algarve"], place: "Portugal", lat: 38.72, lng: -9.14, base: 280 },
  { words: ["greece", "santorini", "athens"], place: "Greece", lat: 36.39, lng: 25.46, base: 340 },
  { words: ["italy", "rome", "amalfi", "milan"], place: "Italy", lat: 41.9, lng: 12.49, base: 300 },
  { words: ["thailand", "bangkok", "phuket"], place: "Thailand", lat: 13.75, lng: 100.5, base: 680 },
  { words: ["australia", "sydney", "melbourne"], place: "Australia", lat: -33.87, lng: 151.21, base: 1080 },
  { words: ["cape town", "south africa"], place: "South Africa", lat: -33.92, lng: 18.42, base: 760 },
  { words: ["iceland", "reykjavik"], place: "Iceland", lat: 64.14, lng: -21.94, base: 460 },
]

const WORD_NUMBERS: Record<string, number> = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 }

function count(text: string, pattern: RegExp) {
  const found = text.match(pattern)?.[1]
  if (!found) return null
  return WORD_NUMBERS[found] ?? Number(found)
}

function priced(value: number, money: LocalMoney) {
  const amount = Math.round((value * money.tripRate) / money.tripRound) * money.tripRound
  return `${money.symbol}${amount.toLocaleString(money.numberLocale)}`
}

export function readDemoTrip(sentence: string, money: LocalMoney = POUNDS): DemoTrip | null {
  const text = sentence.toLowerCase()
  const match = PLACES.find((place) => place.words.some((word) => text.includes(word)))
  if (!match) return null
  const unit = "(\\d+|two|three|four|five|six|seven|eight|nine|ten)"
  const weekend = text.includes("weekend")
  const days = Math.min(count(text, new RegExp(`${unit}[ -]*(?:days?|nights?)`)) ?? (weekend ? 3 : 7), 30)
  const people = Math.min(count(text, new RegExp(`(?:for |with )?${unit}\\s*(?:people|friends|of us|adults|mates)`)) ?? count(text, new RegExp(`\\bfor ${unit}\\s*$`)) ?? 4, 20)
  const scale = 0.6 + days * 0.06
  return {
    place: match.place,
    lat: match.lat,
    lng: match.lng,
    days,
    people,
    plans: [
      { name: "Basic", detail: "One stop, simple stays", price: priced(match.base * scale * 0.8, money) },
      { name: "Standard", detail: "Direct, a good hotel", price: priced(match.base * scale, money) },
      { name: "Premium", detail: "Premium cabin, top stays", price: priced(match.base * scale * 1.3, money) },
    ],
  }
}
