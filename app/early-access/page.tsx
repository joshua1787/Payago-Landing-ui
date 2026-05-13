import { Suspense } from "react"
import { EarlyAccessClient } from "./early-access-client"

export const metadata = {
  title: "Early Access — PayaGo",
  description:
    "You found us. Limited early-access spots into PayaGo's AI travel concierge — Voyager Pass eligibility, lifetime discount, and Wave-1 priority.",
  robots: { index: true, follow: true },
}

export default function EarlyAccessPage() {
  return (
    <Suspense fallback={null}>
      <EarlyAccessClient />
    </Suspense>
  )
}
