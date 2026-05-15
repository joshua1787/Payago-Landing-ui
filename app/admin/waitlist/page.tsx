import type { Metadata } from "next"
import { WaitlistAdminClient } from "./waitlist-admin-client"

export const metadata: Metadata = {
  title: "Waitlist CRM — PayaGo",
  description: "Private PayaGo waitlist dashboard for approved internal users.",
  robots: { index: false, follow: false },
}

export default function WaitlistAdminPage() {
  return <WaitlistAdminClient />
}
