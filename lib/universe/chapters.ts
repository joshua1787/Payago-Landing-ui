// Where each chapter of the journey sits along the page's scroll, from 0 to 1.
// The words and the 3D scene both read these, so they can't drift apart.
export const CHAPTERS = {
  hero: [0, 0.09],
  app: [0.09, 0.22],
  // The three things PayaGo is for get the same share of the journey.
  type: [0.22, 0.35],
  settle: [0.35, 0.48],
  own: [0.48, 0.61],
  cards: [0.61, 0.74],
  trips: [0.74, 0.87],
  guide: [0.87, 1],
} as const

export type ChapterName = keyof typeof CHAPTERS

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
export const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
/** 0 before `from`, 1 after `to`, eased between. */
export const between = (p: number, from: number, to: number) => smooth((p - from) / (to - from))
