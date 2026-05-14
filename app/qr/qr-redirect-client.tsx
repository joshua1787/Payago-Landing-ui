"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, QrCode } from "lucide-react"
import { PayagoWordmark } from "@/components/payago-wordmark"
import { captureEvent } from "@/lib/analytics"

const DEFAULT_TARGET = "/early-access/"
const DEFAULT_QR_HREF = "/early-access/?c=universal-qr&utm_source=qr&utm_medium=offline&utm_campaign=universal_qr"
const QR_REDIRECT_DELAY_MS = 120
const preservedQueryKeys = new Set(["c", "ref", "location", "campaign"])

function getBaseTarget(origin: string) {
  const configuredTarget = process.env.NEXT_PUBLIC_QR_TARGET_URL?.trim()

  if (!configuredTarget) {
    return new URL(DEFAULT_TARGET, origin)
  }

  try {
    return new URL(configuredTarget)
  } catch {
    return new URL(configuredTarget.startsWith("/") ? configuredTarget : `/${configuredTarget}`, origin)
  }
}

function buildTargetUrl() {
  if (typeof window === "undefined") {
    return DEFAULT_QR_HREF
  }

  const current = new URL(window.location.href)
  const target = getBaseTarget(window.location.origin)

  for (const [key, value] of current.searchParams.entries()) {
    if (key.startsWith("utm_") || preservedQueryKeys.has(key)) {
      target.searchParams.set(key, value)
    }
  }

  if (!target.searchParams.get("c")) {
    target.searchParams.set("c", "universal-qr")
  }

  if (!target.searchParams.get("utm_source")) {
    target.searchParams.set("utm_source", "qr")
  }

  if (!target.searchParams.get("utm_medium")) {
    target.searchParams.set("utm_medium", "offline")
  }

  if (!target.searchParams.get("utm_campaign")) {
    target.searchParams.set("utm_campaign", "universal_qr")
  }

  if (target.origin === window.location.origin) {
    return `${target.pathname}${target.search}${target.hash}`
  }

  return target.toString()
}

export function QrRedirectClient() {
  const [targetHref, setTargetHref] = useState(DEFAULT_QR_HREF)

  useEffect(() => {
    const target = buildTargetUrl()
    setTargetHref(target)
    captureEvent("universal_qr_redirect", {
      target,
    })
    const id = window.setTimeout(() => {
      window.location.replace(target)
    }, QR_REDIRECT_DELAY_MS)

    return () => window.clearTimeout(id)
  }, [])

  return (
    <main className="grid min-h-dvh place-items-center overflow-x-clip bg-[#f8f3e8] px-5 py-8 text-[#09111f]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(135deg,#fffaf0_0%,#eef8f5_52%,#f3ebdc_100%)]" />
      <section className="w-full max-w-md rounded-[2rem] border border-[#09111f]/10 bg-white p-5 text-center shadow-[0_24px_70px_rgba(12,27,43,0.12)] sm:p-7" aria-label="Universal QR redirect">
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-[1.35rem] bg-[#09111f] text-white shadow-[0_18px_38px_rgba(9,17,31,0.20)]">
          <QrCode className="h-8 w-8" aria-hidden="true" />
        </div>
        <div className="mb-5 flex justify-center">
          <PayagoWordmark />
        </div>
        <p className="mx-auto mb-3 w-fit rounded-full border border-[#09111f]/10 bg-[#f6f0e4] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-600">
          Golden Passport scan
        </p>
        <h1 className="text-balance text-4xl font-black leading-[0.92] tracking-[-0.07em] text-slate-950" style={{ fontFamily: "var(--font-outfit)" }}>
          Opening Golden Passport Club.
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-600">
          One universal QR for the PayaGo Golden Passport Club. You will be sent to the founding-member claim page automatically.
        </p>
        <div className="mx-auto mt-6 h-1.5 w-28 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#00d4ff] via-[#7c5cff] to-[#4ad7a2]" />
        </div>
        <Link href={targetHref} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#09111f] px-5 py-4 text-sm font-black text-white shadow-[0_14px_32px_rgba(9,17,31,0.20)] transition hover:bg-[#13233d]">
          Continue to Golden Passport
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </main>
  )
}
