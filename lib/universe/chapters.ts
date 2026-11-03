// Where each chapter of the journey sits along the page's scroll, from 0 to 1.
// The words and the 3D scene both read these, so they can't drift apart.
export const CHAPTERS = {
  hero: [0, 0.06],
  // Split & Wallet and Trips each get the same share of the journey.
  type: [0.06, 0.154],
  settle: [0.154, 0.248],
  app: [0.248, 0.342],
  own: [0.342, 0.436],
  cards: [0.436, 0.53],
  trips: [0.53, 0.6475],
  plans: [0.6475, 0.765],
  book: [0.765, 0.8825],
  guide: [0.8825, 1],
} as const

export type ChapterName = keyof typeof CHAPTERS

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
export const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
/** 0 before `from`, 1 after `to`, eased between. */
export const between = (p: number, from: number, to: number) => smooth((p - from) / (to - from))
