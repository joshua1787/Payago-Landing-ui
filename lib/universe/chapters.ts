// Where each chapter of the journey sits along the page's scroll, from 0 to 1.
// The words and the 3D scene both read these, so they can't drift apart.
export const CHAPTERS = {
  hero: [0, 0.07],
  // Trips are the main story. Split & Wallet is how the group's money works, and it's live today.
  trips: [0.07, 0.3],
  // The three plans are shown with the trip now, so this has no words of its own.
  plans: [0.3, 0.3],
  book: [0.3, 0.46],
  guide: [0.46, 0.58],
  type: [0.58, 0.68],
  settle: [0.68, 0.77],
  app: [0.77, 0.86],
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
