"use client"

import Link from "next/link"
import { useEffect, useMemo, useState, type FormEvent } from "react"
import {
  ArrowRight,
  CheckCircle2,
  Crown,
  Gift,
  Globe2,
  LockKeyhole,
  Medal,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Stamp,
  TicketCheck,
  Trophy,
  UsersRound,
} from "lucide-react"
import { PayagoWordmark } from "@/components/payago-wordmark"
import { captureEvent } from "@/lib/analytics"
import { WAITLIST_EMAIL_ERROR, WAITLIST_EMAIL_INPUT_PATTERN, isValidWaitlistEmail } from "@/lib/waitlist-email"

const WAITLIST_ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT?.trim()
const FALLBACK_EMAIL = "support@payago.in"
const FOUNDING_MEMBER_LIMIT = "1,000"
const GOLDEN_PASSPORT_DISCLAIMER = "This is a collectible membership product issued by Payago and is not a government-issued passport or travel document."

type Status = "idle" | "loading" | "success" | "error" | "unconfigured"

const CAMPAIGN_LABELS: Record<string, string> = {
  "universal-qr": "Universal QR invite",
}

const PASSPORT_FIELDS = [
  "Your name",
  "Membership ID",
  "Lifetime access status",
  "Personalized travel identity",
]

const PASSPORT_BENEFITS = [
  {
    icon: TicketCheck,
    title: "Your own physical Golden Passport",
    body: "A premium collectible passport issued by Payago with your name, membership ID, lifetime access status, and personalized travel identity.",
  },
  {
    icon: Stamp,
    title: "Collect real travel stamps",
    body: "Every trip booked through Payago becomes part of your travel story. Every 3-4 months, members can send their Golden Passport collectible to our team for destination stamps.",
  },
  {
    icon: Gift,
    title: "Unlock surprise travel rewards",
    body: "Members can receive sponsored trips, discounted flights, hotel upgrades, travel merchandise, premium backpacks, limited-edition gear, and exclusive drops.",
  },
  {
    icon: LockKeyhole,
    title: "Lifetime access",
    body: "No monthly renewals. No hidden charges. Once you enter the Golden Passport Club, your membership stays active for life.",
  },
]

const REWARD_ITEMS = [
  "Sponsored trips",
  "Discounted flights",
  "Free hotel upgrades",
  "Travel merchandise",
  "Premium backpacks",
  "Limited-edition travel gear",
  "VIP travel benefits",
  "Exclusive member drops",
]

const MEMBERSHIP_TIERS = [
  {
    icon: Medal,
    name: "Golden Passport Member",
    label: "Base founding member",
    threshold: "Claim one of the first 1,000 places",
    benefits: ["Lifetime membership", "Physical Golden Passport", "Travel stamps", "Quarterly rewards", "Exclusive drops", "Founding member status"],
    accent: "#d8a43a",
  },
  {
    icon: Sparkles,
    name: "Platinum Voyager",
    label: "Referral upgrade tier",
    threshold: "Unlocked through successful referrals and active travel participation",
    benefits: ["Higher reward priority", "Bigger travel discounts", "Faster reward eligibility", "Premium merchandise", "Early access features", "Priority support"],
    accent: "#8ec5ff",
  },
  {
    icon: Crown,
    name: "Black Horizon Member",
    label: "Elite ambassador tier",
    threshold: "Reserved for top community ambassadors and elite explorers",
    benefits: ["VIP sponsored trips", "Future lounge partnerships", "Annual elite gifts", "Special passport design", "Invitation-only experiences", "Lifetime recognition"],
    accent: "#0b0f18",
  },
]

const REFERRAL_REWARDS = [
  "Sponsored trips",
  "Bigger travel discounts",
  "Exclusive travel gear",
  "Premium passport upgrades",
  "Priority access features",
  "VIP community recognition",
]

const STAMP_DESTINATIONS = ["Germany", "Dubai", "Singapore", "Bali", "London"]

function sanitizeCampaign(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9-]/g, "").slice(0, 64)
}

function readCampaignFromLocation() {
  if (typeof window === "undefined") return ""

  try {
    return sanitizeCampaign(new URL(window.location.href).searchParams.get("c") ?? "")
  } catch {
    return ""
  }
}

function getCampaignLabel(campaign: string) {
  return campaign
    ? CAMPAIGN_LABELS[campaign] ?? campaign.replace(/-/g, " ")
    : "Universal QR invite"
}

function buildMailto(email: string, campaign: string) {
  const subject = encodeURIComponent("Payago Golden Passport Club")
  const body = encodeURIComponent(
    `Please add me to the Payago Golden Passport Club founding list.\n\nEmail: ${email}\nSource: ${campaign || "universal-qr"}`,
  )
  return `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`
}

function getAbsoluteHttpEndpoint(endpoint: string | undefined) {
  if (!endpoint) return null

  try {
    const url = new URL(endpoint)
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null
  } catch {
    return null
  }
}

async function isAcceptedResponse(response: Response) {
  if ([201, 202, 204].includes(response.status)) {
    return true
  }

  if (!response.headers.get("content-type")?.includes("application/json")) {
    return false
  }

  const payload = await response.json().catch(() => null)
  if (!payload || typeof payload !== "object") {
    return false
  }

  const result = payload as Record<string, unknown>
  return result.ok === true || result.accepted === true || result.success === true
}

function GoldenPassportPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative mx-auto w-full ${compact ? "max-w-[19rem]" : "max-w-[25rem]"}`} aria-hidden="true">
      <div className="absolute -right-3 top-5 h-full w-full rotate-3 rounded-[2rem] border border-[#c99b34]/20 bg-[#151006]" />
      <div className="relative overflow-hidden rounded-[2rem] border border-[#f4c35d]/45 bg-[#080a10] p-4 shadow-[0_30px_70px_rgba(0,0,0,0.32)]">
        <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,226,147,0.16),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(74,215,162,0.13),transparent_26%)]" />
        <div className="absolute inset-x-7 top-5 h-px bg-gradient-to-r from-transparent via-[#f6be4a] to-transparent" />

        <div className="relative rounded-[1.55rem] border border-[#f4c35d]/24 bg-[linear-gradient(145deg,#20202a_0%,#070910_58%,#4d3509_100%)] p-5 text-[#fff2c8]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-[#f6be4a]/76">Payago issued</p>
              <h2
                className={`${compact ? "text-[2.15rem]" : "text-[2.85rem]"} mt-3 font-black leading-[0.82] tracking-[-0.075em] text-white`}
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Golden<br />Passport
              </h2>
            </div>
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#f6be4a] text-[#171006] shadow-[0_14px_30px_rgba(246,190,74,0.22)]">
              <Crown className="h-7 w-7" />
            </div>
          </div>

          <div className="my-6 grid gap-2 rounded-[1.2rem] border border-[#f6be4a]/18 bg-black/18 p-3">
            {PASSPORT_FIELDS.map((item) => (
              <div key={item} className="flex items-center justify-between gap-4 border-b border-[#f6be4a]/12 pb-2 last:border-b-0 last:pb-0">
                <span className="text-[0.58rem] font-black uppercase tracking-[0.18em] text-[#f6be4a]/58">Issued with</span>
                <span className="text-right text-xs font-black text-white/92 sm:text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#f6be4a]/20 bg-[#f6be4a]/9 px-4 py-3">
            <span className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#f6be4a]/74">Status</span>
            <span className="text-sm font-black text-white">Lifetime Founder</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClaimForm({
  email,
  feedback,
  status,
  onEmailChange,
  onSubmit,
}: {
  email: string
  feedback: string
  status: Status
  onEmailChange: (email: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form
      id="golden-passport-claim"
      className="rounded-[1.55rem] border border-[#24170a]/12 bg-[#11131a] p-2 text-white shadow-[0_22px_54px_rgba(10,12,18,0.22)]"
      onSubmit={onSubmit}
    >
      <div className="rounded-[1.15rem] border border-white/8 bg-[#171a22] p-4">
        <div className="mb-3 flex items-center justify-between gap-3 text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#f6be4a]">
          <span>Golden Passport claim</span>
          <span>No card needed</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
          <label className="sr-only" htmlFor="early-access-email">Email for Golden Passport Club</label>
          <input
            id="early-access-email"
            name="email"
            type="email"
            inputMode="email"
            enterKeyHint="send"
            autoComplete="email"
            placeholder="you@example.com"
            pattern={WAITLIST_EMAIL_INPUT_PATTERN}
            title={WAITLIST_EMAIL_ERROR}
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            required
            disabled={status === "loading"}
            className="min-w-0 rounded-[0.95rem] border border-white/10 bg-[#fff8e8] px-4 py-4 text-base font-bold text-slate-950 outline-none placeholder:text-slate-400 focus:shadow-[0_0_0_3px_rgba(246,190,74,0.30)] sm:px-5"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[0.95rem] bg-[#f6be4a] px-5 py-4 text-sm font-black text-[#151006] shadow-[0_14px_30px_rgba(246,190,74,0.20)] transition hover:bg-[#ffd879] disabled:cursor-progress disabled:opacity-70"
          >
            {status === "loading" ? "Claiming..." : "Claim founding place"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-3 text-xs font-semibold leading-5 text-white/64">
          Free founding claim. Shipping details are requested later after your place is confirmed.
        </p>
        <div className="mt-3 flex items-start gap-2 rounded-2xl border border-[#f6be4a]/20 bg-[#f6be4a]/10 px-3 py-3 text-xs font-semibold leading-5 text-[#ffe6a6]">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f6be4a]" aria-hidden="true" />
          <p>{GOLDEN_PASSPORT_DISCLAIMER}</p>
        </div>
        <div className="mt-2 min-h-5" aria-live="polite">
          {feedback ? <p className="text-xs font-bold text-[#ffd879]">{feedback}</p> : null}
        </div>
      </div>
    </form>
  )
}

export function EarlyAccessClient() {
  const [campaign, setCampaign] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [feedback, setFeedback] = useState("")
  const campaignLabel = useMemo(() => getCampaignLabel(campaign), [campaign])
  const source = campaign || "universal-qr"

  useEffect(() => {
    const activeCampaign = readCampaignFromLocation()
    setCampaign(activeCampaign)
    captureEvent("golden_passport_landing_view", {
      campaign: activeCampaign || "universal-qr",
      label: getCampaignLabel(activeCampaign),
    })
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalized = email.trim()
    if (!normalized) return

    const activeCampaign = campaign || readCampaignFromLocation() || "universal-qr"

    if (!isValidWaitlistEmail(normalized)) {
      setStatus("error")
      setFeedback(WAITLIST_EMAIL_ERROR)
      captureEvent("golden_passport_submit_fail", {
        campaign: activeCampaign,
        reason: "invalid_email_format",
      })
      return
    }

    setStatus("loading")
    setFeedback("")
    captureEvent("golden_passport_submit_attempt", {
      campaign: activeCampaign,
    })

    if (!WAITLIST_ENDPOINT) {
      setStatus("unconfigured")
      setFeedback("Online capture is temporarily unavailable. We opened an email draft instead.")
      captureEvent("golden_passport_unconfigured", {
        campaign: activeCampaign,
      })
      window.location.href = buildMailto(normalized, activeCampaign)
      return
    }

    const waitlistEndpoint = getAbsoluteHttpEndpoint(WAITLIST_ENDPOINT)

    if (!waitlistEndpoint) {
      setStatus("error")
      setFeedback(`Online capture is misconfigured. Please email ${FALLBACK_EMAIL}.`)
      captureEvent("golden_passport_submit_fail", {
        campaign: activeCampaign,
        reason: "invalid_endpoint",
      })
      return
    }

    try {
      const res = await fetch(waitlistEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalized,
          source: `qr-${activeCampaign}`,
          campaign: activeCampaign,
          page: "/early-access",
          interest: "golden-passport-club",
          referrer: typeof document !== "undefined" ? document.referrer : "",
        }),
      })

      if (!res.ok) {
        throw new Error(res.status === 400 ? "invalid_email_format" : `status_${res.status}`)
      }
      if (!(await isAcceptedResponse(res))) {
        throw new Error(`waitlist_endpoint_unconfirmed_${res.status}`)
      }

      setStatus("success")
      setEmail("")
      captureEvent("golden_passport_submit_success", {
        campaign: activeCampaign,
      })
    } catch (error) {
      setStatus("error")
      const reason = error instanceof Error ? error.message : "request_failed"
      setFeedback(reason === "invalid_email_format" ? WAITLIST_EMAIL_ERROR : `We could not save your request. Try again, or email ${FALLBACK_EMAIL}.`)
      captureEvent("golden_passport_submit_fail", {
        campaign: activeCampaign,
        reason,
      })
    }
  }

  return (
    <main className="min-h-dvh overflow-x-clip bg-[#f4ead7] text-[#151006]">
      <section className="relative isolate px-4 py-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(135deg,#fff8e9_0%,#f2dfb9_45%,#10131b_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.13] [background-image:linear-gradient(rgba(21,16,6,0.32)_1px,transparent_1px),linear-gradient(90deg,rgba(21,16,6,0.32)_1px,transparent_1px)] [background-size:44px_44px]" />

        <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 py-2">
          <Link href="/" aria-label="PayaGo home" className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#f6be4a]/40">
            <PayagoWordmark className="text-[1.35rem] text-[#151006] [&>span:first-child]:text-[#151006]" />
          </Link>
          <div className="inline-flex min-w-0 items-center gap-2 rounded-full border border-[#151006]/12 bg-[#fff8e9] px-3 py-2 text-[0.62rem] font-black uppercase tracking-[0.16em] text-[#6d4a10] shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="max-w-[46vw] truncate sm:max-w-none">{campaignLabel}</span>
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 py-8 sm:py-12 lg:min-h-[calc(100dvh-6rem)] lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)] lg:gap-14">
          <section className="max-w-3xl">
            {status === "success" ? (
              <div className="rounded-[2rem] border border-[#151006]/12 bg-[#fff8e9] p-5 shadow-[0_24px_70px_rgba(18,15,10,0.18)] sm:p-8" aria-live="polite">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0d6b50]/20 bg-[#dff8ed] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#0d6b50]">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Founding request saved
                </div>
                <h1
                  className="text-balance text-5xl font-black leading-[0.9] tracking-[-0.075em] text-[#151006] sm:text-6xl lg:text-7xl"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  You are on the Golden Passport list.
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-[#4c412f] sm:text-lg sm:leading-8">
                  We saved your request from the <strong className="text-[#151006]">{campaignLabel}</strong>. Watch your inbox for the next step to confirm your founding-member details and shipping information.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#151006] px-5 py-4 text-sm font-black text-white shadow-[0_14px_30px_rgba(18,15,10,0.20)] transition hover:bg-[#2a2113]">
                    Continue to website
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href="/privacy" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#151006]/12 bg-white px-5 py-4 text-sm font-black text-[#151006] transition hover:bg-[#fff8e9]">
                    Privacy
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#151006]/12 bg-[#fff8e9] px-4 py-2 text-[0.64rem] font-black uppercase tracking-[0.15em] text-[#6d4a10] shadow-sm sm:text-[0.68rem]">
                  <Crown className="h-4 w-4" aria-hidden="true" />
                  First {FOUNDING_MEMBER_LIMIT} lifetime members only
                </div>
                <h1
                  className="text-balance text-[2.85rem] font-black leading-[0.86] tracking-[-0.08em] text-[#151006] sm:text-7xl lg:text-[5.8rem] lg:leading-[0.84]"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Welcome to the Payago Golden Passport Club<span className="align-super text-[0.24em] tracking-normal">&trade;</span>
                </h1>
                <div className="mt-5 max-w-2xl space-y-3 text-pretty text-[1.02rem] leading-7 text-[#4c412f] sm:text-xl sm:leading-9">
                  <p>Travel is not just about destinations anymore.</p>
                  <p>It is about collecting memories, stamps, rewards, and experiences that stay with you for life.</p>
                  <p className="font-black text-[#151006]">Become one of the first {FOUNDING_MEMBER_LIMIT} lifetime members and receive your own exclusive Payago Golden Passport.</p>
                </div>

                <div className="mt-6 max-w-2xl sm:mt-8">
                  <ClaimForm
                    email={email}
                    feedback={feedback}
                    status={status}
                    onEmailChange={setEmail}
                    onSubmit={handleSubmit}
                  />
                </div>

                <div className="mt-4 grid gap-2 text-sm text-[#5b4b33] sm:grid-cols-3">
                  <span className="inline-flex items-center gap-2 font-bold">
                    <PackageCheck className="h-4 w-4 text-[#8a5a06]" aria-hidden="true" />
                    Physical collectible.
                  </span>
                  <span className="inline-flex items-center gap-2 font-bold">
                    <Stamp className="h-4 w-4 text-[#8a5a06]" aria-hidden="true" />
                    Real stamp ritual.
                  </span>
                  <span className="inline-flex items-center gap-2 font-bold">
                    <ShieldCheck className="h-4 w-4 text-[#8a5a06]" aria-hidden="true" />
                    Lifetime access.
                  </span>
                </div>

                <div className="my-8 lg:hidden">
                  <GoldenPassportPreview compact />
                </div>
              </>
            )}
          </section>

          <aside className="hidden lg:block lg:justify-self-end">
            <GoldenPassportPreview />
            <div className="mx-auto mt-4 grid w-full max-w-[25rem] grid-cols-3 gap-2 rounded-[1.35rem] border border-[#151006]/12 bg-[#fff8e9] p-2 text-center text-xs shadow-sm">
              <span className="rounded-2xl bg-[#151006] px-3 py-3 font-black text-white">Lifetime</span>
              <span className="rounded-2xl bg-[#ffe8a8] px-3 py-3 font-black text-[#6d4a10]">Rewards</span>
              <span className="rounded-2xl bg-white px-3 py-3 font-black text-[#151006]">Stamps</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative bg-[#fbf5e8] px-4 py-12 text-[#151006] sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8a5a06]">What you get</p>
            <h2
              className="mt-2 max-w-3xl text-4xl font-black leading-[0.9] tracking-[-0.065em] text-[#151006] sm:text-6xl"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              This is not another digital badge.
            </h2>
          </div>
          <div className="max-w-2xl space-y-3 text-base leading-7 text-[#5b4b33] lg:text-lg lg:leading-8">
            <p>
              This is a premium physical collectible shipped to your address after your founding place is confirmed. It is built to make your Payago travel history collectible.
            </p>
            <p className="rounded-2xl border border-[#151006]/10 bg-white px-4 py-3 text-sm font-bold leading-6 text-[#6d4a10] lg:text-base lg:leading-7">
              {GOLDEN_PASSPORT_DISCLAIMER}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-7 grid w-full max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Golden Passport benefits">
          {PASSPORT_BENEFITS.map((benefit) => {
            const Icon = benefit.icon
            return (
              <article key={benefit.title} className="rounded-[1.55rem] border border-[#151006]/10 bg-white p-5 shadow-[0_14px_38px_rgba(18,15,10,0.07)]">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#fff0bd] text-[#8a5a06]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-black leading-6 tracking-[-0.04em] text-[#151006]">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5b4b33]">{benefit.body}</p>
              </article>
            )
          })}
        </div>

        <div className="mx-auto grid w-full max-w-6xl gap-5 py-12 lg:grid-cols-[0.86fr_1.14fr]" aria-label="Travel stamps and rewards">
          <section className="overflow-hidden rounded-[2rem] bg-[#10131b] p-5 text-white shadow-[0_24px_60px_rgba(18,15,10,0.18)] sm:p-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f6be4a]/24 bg-[#f6be4a]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#ffd879]">
              <Stamp className="h-4 w-4" aria-hidden="true" />
              Collectible travel stamps
            </div>
            <h2
              className="mt-5 text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-5xl"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Your journey becomes collectible.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/70">
              Every trip booked through Payago becomes part of your travel story. Every 3-4 months, members can send their Golden Passport collectible to our team. We will stamp the countries and destinations explored through the app as part of a collectible member ritual.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {STAMP_DESTINATIONS.map((destination) => (
                <span key={destination} className="rounded-full border border-[#f6be4a]/20 bg-white/7 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#ffe3a1]">
                  {destination}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#151006]/10 bg-[#f2e5ca] p-5 sm:p-7" aria-label="Surprise travel rewards">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8a5a06]">Surprise travel rewards</p>
                <h2 className="mt-2 text-3xl font-black leading-[0.95] tracking-[-0.055em] text-[#151006] sm:text-4xl">The more you travel, the bigger the rewards.</h2>
              </div>
              <Gift className="h-9 w-9 shrink-0 text-[#8a5a06]" aria-hidden="true" />
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {REWARD_ITEMS.map((reward) => (
                <div key={reward} className="flex items-center gap-3 rounded-2xl border border-[#151006]/10 bg-white px-4 py-4 text-sm font-black text-[#302618] shadow-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0d6b50]" aria-hidden="true" />
                  {reward}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mx-auto w-full max-w-6xl py-2" aria-label="Membership levels">
          <div className="mb-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8a5a06]">Upgrade your status through referrals</p>
              <h2
                className="mt-2 text-4xl font-black leading-[0.9] tracking-[-0.065em] text-[#151006] sm:text-6xl"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Membership hierarchy
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#5b4b33] lg:text-lg lg:leading-8">
              At Payago, travel is not just personal. Invite friends into the Golden Passport Club and unlock higher membership tiers with exclusive rewards.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {MEMBERSHIP_TIERS.map((tier) => {
              const Icon = tier.icon
              return (
                <article key={tier.name} className="overflow-hidden rounded-[1.75rem] border border-[#151006]/10 bg-white shadow-[0_16px_42px_rgba(18,15,10,0.08)]">
                  <div className="h-2" style={{ backgroundColor: tier.accent }} />
                  <div className="p-5">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#151006] text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="mt-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#8a5a06]">{tier.label}</p>
                    <h3 className="mt-2 text-2xl font-black tracking-[-0.05em] text-[#151006]">{tier.name}</h3>
                    <p className="mt-2 text-sm font-bold leading-6 text-[#5b4b33]">{tier.threshold}</p>
                    <ul className="mt-4 grid gap-2 text-sm leading-6 text-[#4c412f]">
                      {tier.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0d6b50]" aria-hidden="true" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-5 py-12 lg:grid-cols-[1fr_1fr]" aria-label="Referral rewards">
          <div className="rounded-[2rem] border border-[#151006]/10 bg-white p-5 shadow-[0_16px_42px_rgba(18,15,10,0.08)] sm:p-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#151006]/10 bg-[#f2e5ca] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#6d4a10]">
              <UsersRound className="h-4 w-4" aria-hidden="true" />
              Travel is shared
            </div>
            <h2
              className="mt-5 text-4xl font-black leading-[0.9] tracking-[-0.06em] text-[#151006] sm:text-5xl"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              The more travelers you bring in, the more premium your status becomes.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#5b4b33]">
              Golden Passport begins your journey. Successful referrals and active travel participation can move members toward Platinum Voyager and the rare Black Horizon tier. Some journeys may even be partially funded by us.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {REFERRAL_REWARDS.map((reward) => (
              <div key={reward} className="flex items-center gap-3 rounded-2xl border border-[#151006]/10 bg-[#fff8e9] px-4 py-4 text-sm font-black text-[#302618] shadow-sm">
                <Trophy className="h-4 w-4 shrink-0 text-[#8a5a06]" aria-hidden="true" />
                {reward}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto my-2 w-full max-w-6xl overflow-hidden rounded-[2rem] bg-[#10131b] p-5 text-white shadow-[0_24px_60px_rgba(18,15,10,0.18)] sm:p-7" aria-label="Limited founding membership">
          <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-[#f6be4a] text-[#151006]">
                <Globe2 className="h-8 w-8" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffd879]">Limited founding membership</p>
                <h2 className="mt-1 text-3xl font-black tracking-[-0.05em]">Only {FOUNDING_MEMBER_LIMIT} worldwide</h2>
              </div>
            </div>
            <div>
              <p className="text-base leading-7 text-white/72">
                Only the first {FOUNDING_MEMBER_LIMIT} members worldwide will ever receive the official Payago Golden Passport. Once all memberships are claimed, this experience will be permanently closed.
              </p>
              <a href="#golden-passport-claim" className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f6be4a] px-5 py-4 text-sm font-black text-[#151006] transition hover:bg-[#ffd879]">
                Claim before it closes
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <footer className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-8 text-center text-xs font-semibold text-[#6e624f] sm:justify-between">
          <span>Payago Ltd, London</span>
          <span className="flex items-center gap-4">
            <Link href="/" onClick={() => captureEvent("golden_passport_continue_to_site_click", { campaign: source, target: "home" })} className="hover:text-[#151006]">
              Website
            </Link>
            <Link href="/terms" className="hover:text-[#151006]">Terms</Link>
            <Link href="/privacy" className="hover:text-[#151006]">Privacy</Link>
          </span>
        </footer>
      </section>
    </main>
  )
}
