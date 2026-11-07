import type { Metadata } from "next"

import { CommandClient } from "./command-client"

export const metadata: Metadata = {
  title: "Command centre: PayaGo",
  description: "Private dashboard for the PayaGo founders.",
  robots: { index: false, follow: false },
}

export default function CommandPage() {
  return <CommandClient />
}
