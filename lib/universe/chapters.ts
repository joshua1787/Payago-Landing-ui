// Where each chapter of the journey sits along the page's scroll, from 0 to 1.
// The words and the 3D scene both read these, so they can't drift apart.
export const CHAPTERS = {
  // The page opens on the flight film above; this journey starts at the Earth.
  hero: [0, 0.008],
  // Trips are the main story. Split & Wallet is how the group's money works, and it's live today.
  trips: [0.008, 0.2],
  plans: [0.2, 0.33],
  book: [0.33, 0.47],
  guide: [0.47, 0.6],
  type: [0.6, 0.69],
  settle: [0.69, 0.78],
  app: [0.78, 0.86],
  own: [0.86, 0.93],
  cards: [0.93, 1],
} as const

export type ChapterName = keyof typeof CHAPTERS

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
export const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
/** 0 before `from`, 1 after `to`, eased between. */
export const between = (p: number, from: number, to: number) => smooth((p - from) / (to - from))
