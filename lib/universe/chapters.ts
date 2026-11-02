// Where each chapter of the journey sits along the page's scroll, from 0 to 1.
// The words and the 3D scene both read these, so they can't drift apart.
export const CHAPTERS = {
  hero: [0, 0.1],
  type: [0.1, 0.27],
  settle: [0.27, 0.4],
  own: [0.4, 0.5],
  app: [0.5, 0.66],
  cards: [0.66, 0.77],
  trips: [0.77, 1],
} as const

export type ChapterName = keyof typeof CHAPTERS

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
export const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
/** 0 before `from`, 1 after `to`, eased between. */
export const between = (p: number, from: number, to: number) => smooth((p - from) / (to - from))
