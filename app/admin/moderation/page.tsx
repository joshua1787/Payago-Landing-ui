import type { Metadata } from "next"

import { ModerationClient } from "./moderation-client"

export const metadata: Metadata = {
  title: "Reports: PayaGo",
  description: "Private review queue for approved PayaGo staff.",
  robots: { index: false, follow: false },
}

export default function ModerationPage() {
  return <ModerationClient />
}
