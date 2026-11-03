import type { Metadata } from "next"
import Link from "next/link"
import { PayagoWordmark } from "@/components/payago-wordmark"
import { ArrowLeft } from "lucide-react"

const title = "Delete your account — PayaGo"
const description = "How to delete your PayaGo: Split Expenses account, what is deleted, and what is kept."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: "https://payago.in/delete-account",
    },
    openGraph: {
        title,
        description,
        url: "https://payago.in/delete-account",
        siteName: "PayaGo",
        type: "article",
    },
}

const DELETED = [
    "Your name, email address, phone number, profile photo and payment handle such as your UPI ID",
    "Your password and any devices registered for notifications",
    "Your own spending ledger, budget, bills and notifications",
    "Payments read from bank messages, your merchant labels and your private Shortcut link",
    "Your Family Map and the person you named, who can no longer ask for access",
]

const KEPT = [
    "Expenses and messages you posted in groups with other people, so their balances stay correct. Your name on them is replaced with “Deleted User”",
    "Groups you created with other people in them",
    "Photos and voice notes you shared, which can remain in our storage",
    "Payment and reward records we must keep for accounting, tax or legal reasons, and a record that the account was deleted",
]

export default function DeleteAccountPage() {
    return (
        <main className="min-h-screen bg-white">
            <header className="border-b border-slate-100 sticky top-0 z-50 bg-white/95">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <PayagoWordmark />
                    </Link>
                    <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-slate-900">
                    Delete your account
                </h1>
                <p className="text-slate-500 text-sm mb-12">PayaGo: Split Expenses, by PayaGo Ltd. Last updated: November 2026</p>

                <div className="space-y-10 text-slate-600 leading-relaxed text-lg">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">In the app</h2>
                        <ol className="list-decimal pl-6 space-y-2">
                            <li>Open PayaGo and go to your Profile.</li>
                            <li>Scroll down and tap Delete Account.</li>
                            <li>Enter your password. If you sign in with Google, Apple or an email code, tap “No password? Email me a code” and enter the code we send you.</li>
                            <li>Tap Delete.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Without the app</h2>
                        <p>
                            Email <a href="mailto:privacy@payago.in?subject=Delete%20my%20PayaGo%20account" className="text-[#0B766F] underline">privacy@payago.in</a> from
                            the address on your account, with the subject “Delete my PayaGo account”. We will reply within 30 days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">What is deleted</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            {DELETED.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">What is kept</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            {KEPT.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                        <p className="mt-4">
                            Copies of our database, including deleted data, stay in our backups for up to 30 days. More detail is in
                            our <Link href="/privacy" className="text-[#0B766F] underline">privacy policy</Link>.
                        </p>
                    </section>
                </div>
            </div>

            <footer className="py-8 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
                    © 2026 PayaGo Ltd. Company No. 16971574. Registered in England & Wales.
                </div>
            </footer>
        </main>
    )
}
