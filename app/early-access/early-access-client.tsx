"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"

const WAITLIST_ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT?.trim()
const FALLBACK_EMAIL = "support@payago.in"

type Status = "idle" | "loading" | "success" | "error" | "unconfigured"

const CAMPAIGN_LABELS: Record<string, string> = {
  "airport-heathrow": "Heathrow T5",
  "airport-gatwick": "Gatwick",
  "airport-stansted": "Stansted",
  "airport-cdg": "Paris CDG",
  "airport-schiphol": "Amsterdam Schiphol",
  "airport-berlin": "Berlin BER",
  "voice-booth-london": "London voice booth",
  "voice-booth-paris": "Paris voice booth",
  "drone-thames": "Thames launch drop",
  "reddit-ama": "Reddit AMA",
  conference: "Conference invite",
  "business-card": "Business card",
  "mystery-trip": "Mystery trip drop",
  "voyager-pass": "Voyager Pass",
}

const BENEFITS = [
  {
    label: "01",
    title: "UK launch priority",
    body: "Be first in line for the UK private access wave before wider Europe rollout.",
  },
  {
    label: "02",
    title: "Founder updates",
    body: "Get short build notes, launch dates, and product previews before public announcements.",
  },
  {
    label: "03",
    title: "Voyager Pass shortlist",
    body: "Early members can be considered for limited launch experiments and invite-only drops.",
  },
  {
    label: "04",
    title: "Group-trip templates",
    body: "Receive city-break and weekend-trip templates built around UK and Europe departures.",
  },
]

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
    : "QR invite"
}

function buildMailto(email: string) {
  const subject = encodeURIComponent("PayaGo early access")
  const body = encodeURIComponent(
    `Please add me to the PayaGo early-access list.\n\nEmail: ${email}`,
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

export function EarlyAccessClient() {
  const [campaign, setCampaign] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [feedback, setFeedback] = useState("")
  const campaignLabel = useMemo(() => getCampaignLabel(campaign), [campaign])

  useEffect(() => {
    setCampaign(readCampaignFromLocation())
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const normalized = email.trim()
    if (!normalized) return

    setStatus("loading")
    setFeedback("")

    if (!WAITLIST_ENDPOINT) {
      setStatus("unconfigured")
      setFeedback(
        "Online capture is temporarily unavailable. We opened an email draft instead.",
      )
      window.location.href = buildMailto(normalized)
      return
    }

    const waitlistEndpoint = getAbsoluteHttpEndpoint(WAITLIST_ENDPOINT)

    if (!waitlistEndpoint) {
      setStatus("error")
      setFeedback(`Online capture is misconfigured. Please email ${FALLBACK_EMAIL}.`)
      return
    }

    try {
      const activeCampaign = campaign || readCampaignFromLocation()
      const source = activeCampaign ? `qr-${activeCampaign}` : "qr-general"

      const res = await fetch(waitlistEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalized,
          source,
          referrer: typeof document !== "undefined" ? document.referrer : "",
        }),
      })

      if (!res.ok) throw new Error(`status_${res.status}`)
      if (!(await isAcceptedResponse(res))) {
        throw new Error(`waitlist_endpoint_unconfirmed_${res.status}`)
      }

      setStatus("success")
      setEmail("")
    } catch {
      setStatus("error")
      setFeedback(`We could not add you. Try again, or email ${FALLBACK_EMAIL}.`)
    }
  }

  return (
    <main className="ea">
      <div className="ea__grain" aria-hidden="true" />
      <section className="ea__shell" aria-label="PayaGo early access">
        <header className="ea__nav">
          <a href="/" className="ea__brand" aria-label="PayaGo home">
            <span className="ea__brand-mark" aria-hidden="true" />
            <span>PayaGo</span>
          </a>
          <span className="ea__source">{campaignLabel}</span>
        </header>

        {status === "success" ? (
          <section className="ea__success" aria-live="polite">
            <p className="ea__eyebrow">Early access request received</p>
            <h1>You are on the UK launch list.</h1>
            <p className="ea__lead">
              Your request is saved. We will send the next early-access message
              when the UK invite wave opens.
            </p>
            <div className="ea__next-card">
              <span className="ea__stamp">Next</span>
              <div>
                <strong>Watch your inbox.</strong>
                <p>
                  The first message covers launch timing, early-access benefits,
                  and how to join the private feedback wave. Invite source:
                  {" "}<span>{campaignLabel}</span>.
                </p>
              </div>
            </div>
            <a href="/" className="ea__secondary-link">
              Back to payago.in
            </a>
          </section>
        ) : (
          <div className="ea__grid">
            <section className="ea__hero">
              <p className="ea__eyebrow">Scan-only early access</p>
              <h1>
                Join PayaGo before the UK launch wave opens.
              </h1>
              <p className="ea__lead">
                PayaGo is an AI travel concierge for groups. Scan the QR, see
                the launch benefits, leave your email, and we will send your
                early-access message when your wave is ready.
              </p>

              <form className="ea__form" onSubmit={handleSubmit}>
                <label htmlFor="early-access-email">Email for early access</label>
                <div className="ea__form-row">
                  <input
                    id="early-access-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                  />
                  <button type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "Joining..." : "Join the list"}
                  </button>
                </div>
              </form>

              {feedback && <p className="ea__feedback">{feedback}</p>}
              <p className="ea__privacy">
                No spam. We use your email only for PayaGo early access and
                launch updates. <a href="/privacy">Privacy</a>
              </p>
            </section>

            <aside className="ea__pass" aria-label="Early access benefits">
              <div className="ea__pass-top">
                <span>UK first</span>
                <span>Europe next</span>
              </div>
              <div className="ea__route" aria-hidden="true">
                <span>LON</span>
                <i />
                <span>EUR</span>
              </div>
              <h2>What early access gives you</h2>
              <div className="ea__benefits">
                {BENEFITS.map((benefit) => (
                  <article className="ea__benefit" key={benefit.label}>
                    <span>{benefit.label}</span>
                    <div>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.body}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="ea__pass-footer">
                <span>Invite source</span>
                <strong>{campaignLabel}</strong>
              </div>
            </aside>
          </div>
        )}
      </section>

      <footer className="ea__footer">
        <span>PayaGo Ltd, London</span>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
      </footer>

      <style jsx>{`
        .ea,
        .ea *,
        .ea *::before,
        .ea *::after {
          box-sizing: border-box;
        }

        .ea {
          --ea-ink: #0a1624;
          --ea-muted: #536174;
          --ea-soft: #7a8796;
          --ea-paper: #fffaf2;
          --ea-card: #ffffff;
          --ea-line: rgba(10, 22, 36, 0.12);
          --ea-navy: #0c1b2b;
          --ea-teal: #00a6a6;
          --ea-coral: #ff7a59;
          --ea-gold: #c9902f;
          width: 100%;
          max-width: 100vw;
          min-height: 100svh;
          min-height: 100dvh;
          overflow-x: hidden;
          overflow-x: clip;
          position: relative;
          padding: 28px;
          background:
            radial-gradient(circle at 14% 12%, rgba(0, 166, 166, 0.18), transparent 30%),
            radial-gradient(circle at 82% 18%, rgba(255, 122, 89, 0.16), transparent 28%),
            linear-gradient(135deg, #fff7ec 0%, #f2fbf9 48%, #f9f3e8 100%);
          color: var(--ea-ink);
          font-family: var(--font-outfit), "Avenir Next", "Helvetica Neue", Arial, sans-serif;
        }

        .ea__grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.28;
          background-image:
            linear-gradient(rgba(10, 22, 36, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 22, 36, 0.035) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: linear-gradient(to bottom, black, transparent 78%);
        }

        .ea__shell {
          position: relative;
          z-index: 1;
          width: min(1120px, calc(100vw - 56px));
          max-width: 100%;
          overflow: hidden;
          min-height: calc(100svh - 112px);
          margin: 0 auto;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 36px;
          background: rgba(255, 250, 242, 0.74);
          box-shadow: 0 30px 90px rgba(10, 22, 36, 0.14);
          backdrop-filter: blur(20px);
        }

        .ea__nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 54px;
        }

        .ea__brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--ea-ink);
          text-decoration: none;
          min-width: 0;
          font-size: 1.08rem;
          font-weight: 900;
          letter-spacing: -0.04em;
        }

        .ea__brand-mark {
          width: 29px;
          height: 29px;
          border-radius: 11px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.72), rgba(255,255,255,0) 44%),
            linear-gradient(135deg, var(--ea-teal), #104967 52%, var(--ea-coral));
          box-shadow: 0 12px 30px rgba(0, 166, 166, 0.24);
        }

        .ea__source {
          max-width: 52vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 8px 14px;
          border: 1px solid rgba(0, 166, 166, 0.22);
          border-radius: 999px;
          background: rgba(0, 166, 166, 0.1);
          color: #075f63;
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .ea__grid {
          display: grid;
          grid-template-columns: minmax(0, 1.04fr) minmax(300px, 0.76fr);
          gap: 30px;
          align-items: stretch;
          min-width: 0;
        }

        .ea__hero,
        .ea__pass,
        .ea__success {
          border: 1px solid var(--ea-line);
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.72);
          box-shadow: 0 18px 60px rgba(10, 22, 36, 0.1);
          min-width: 0;
          overflow: hidden;
        }

        .ea__hero {
          padding: clamp(30px, 5vw, 58px);
        }

        .ea__eyebrow {
          width: fit-content;
          margin: 0 0 20px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 122, 89, 0.13);
          color: #9b3f29;
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        h1,
        h2,
        h3,
        p {
          margin-top: 0;
        }

        .ea__hero h1,
        .ea__success h1 {
          max-width: 780px;
          margin-bottom: 22px;
          color: var(--ea-ink);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(3rem, 7vw, 6.6rem);
          font-weight: 900;
          letter-spacing: -0.08em;
          line-height: 0.9;
          text-wrap: balance;
        }

        .ea__lead {
          max-width: 660px;
          margin-bottom: 34px;
          color: var(--ea-muted);
          font-size: clamp(1.04rem, 1.7vw, 1.25rem);
          line-height: 1.62;
          text-wrap: pretty;
        }

        .ea__lead strong {
          color: var(--ea-ink);
        }

        .ea__form {
          max-width: 720px;
          margin-bottom: 14px;
        }

        .ea__form label {
          display: block;
          margin-bottom: 10px;
          color: var(--ea-ink);
          font-size: 0.86rem;
          font-weight: 900;
          letter-spacing: 0.04em;
        }

        .ea__form-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 10px;
          padding: 8px;
          border: 1px solid rgba(10, 22, 36, 0.14);
          border-radius: 22px;
          background: #fff;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 14px 38px rgba(10, 22, 36, 0.08);
        }

        .ea__form input {
          min-width: 0;
          border: 0;
          border-radius: 16px;
          padding: 16px 14px;
          background: transparent;
          color: var(--ea-ink);
          font: inherit;
          font-size: 1.02rem;
        }

        .ea__form input::placeholder {
          color: #9aa5b2;
        }

        .ea__form input:focus {
          outline: 0;
          box-shadow: inset 0 0 0 2px rgba(0, 166, 166, 0.24);
        }

        .ea__form button {
          border: 0;
          border-radius: 16px;
          padding: 15px 22px;
          background: var(--ea-navy);
          color: #fffaf2;
          cursor: pointer;
          font: inherit;
          font-size: 0.95rem;
          font-weight: 900;
          box-shadow: 0 12px 26px rgba(12, 27, 43, 0.24);
          transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
        }

        .ea__form button:hover:not(:disabled) {
          transform: translateY(-1px);
          background: #132b43;
          box-shadow: 0 16px 32px rgba(12, 27, 43, 0.3);
        }

        .ea__form button:disabled {
          cursor: progress;
          opacity: 0.72;
        }

        .ea__feedback {
          margin: 12px 0 0;
          color: #9b3f29;
          font-size: 0.92rem;
          font-weight: 800;
        }

        .ea__privacy {
          max-width: 620px;
          margin: 0;
          color: var(--ea-soft);
          font-size: 0.9rem;
        }

        .ea__privacy a,
        .ea__footer a,
        .ea__secondary-link {
          color: #075f63;
          font-weight: 900;
          text-decoration: none;
        }

        .ea__privacy a:hover,
        .ea__footer a:hover,
        .ea__secondary-link:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .ea__pass {
          position: relative;
          overflow: hidden;
          padding: 26px;
          background:
            linear-gradient(180deg, rgba(12, 27, 43, 0.96), rgba(15, 37, 58, 0.94)),
            var(--ea-navy);
          color: #fffaf2;
        }

        .ea__pass::before,
        .ea__pass::after {
          content: "";
          position: absolute;
          top: 132px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #fff8ee;
          box-shadow: inset 0 0 0 1px rgba(10, 22, 36, 0.08);
        }

        .ea__pass::before {
          left: -17px;
        }

        .ea__pass::after {
          right: -17px;
        }

        .ea__pass-top,
        .ea__pass-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .ea__pass-top span,
        .ea__pass-footer span {
          color: rgba(255, 250, 242, 0.64);
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .ea__route {
          display: grid;
          grid-template-columns: auto minmax(52px, 1fr) auto;
          gap: 12px;
          align-items: center;
          margin: 34px 0 30px;
        }

        .ea__route span {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 900;
          letter-spacing: -0.08em;
          line-height: 1;
        }

        .ea__route i {
          height: 1px;
          background: repeating-linear-gradient(90deg, rgba(255, 250, 242, 0.3) 0 10px, transparent 10px 18px);
          position: relative;
        }

        .ea__route i::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--ea-coral);
          transform: translate(-50%, -50%);
          box-shadow: 0 0 0 6px rgba(255, 122, 89, 0.16);
        }

        .ea__pass h2 {
          margin-bottom: 20px;
          color: #fffaf2;
          font-size: 1.2rem;
          letter-spacing: -0.03em;
        }

        .ea__benefits {
          display: grid;
          gap: 13px;
        }

        .ea__benefit {
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 12px;
          padding: 14px;
          border: 1px solid rgba(255, 250, 242, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.055);
        }

        .ea__benefit > span {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border-radius: 13px;
          background: rgba(0, 166, 166, 0.17);
          color: #77e4df;
          font-size: 0.8rem;
          font-weight: 900;
        }

        .ea__benefit h3 {
          margin-bottom: 3px;
          color: #fffaf2;
          font-size: 0.98rem;
          letter-spacing: -0.02em;
        }

        .ea__benefit p {
          margin-bottom: 0;
          color: rgba(255, 250, 242, 0.67);
          font-size: 0.9rem;
          line-height: 1.48;
        }

        .ea__pass-footer {
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px dashed rgba(255, 250, 242, 0.2);
        }

        .ea__pass-footer strong {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #fffaf2;
          font-size: 0.86rem;
        }

        .ea__success {
          max-width: 760px;
          margin: 0 auto;
          padding: clamp(34px, 7vw, 72px);
        }

        .ea__next-card {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 16px;
          margin: 34px 0 28px;
          padding: 18px;
          border: 1px solid rgba(0, 166, 166, 0.18);
          border-radius: 22px;
          background: rgba(0, 166, 166, 0.08);
        }

        .ea__stamp {
          display: grid;
          place-items: center;
          width: 54px;
          height: 54px;
          border-radius: 18px;
          background: var(--ea-navy);
          color: #fffaf2;
          font-size: 0.76rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .ea__next-card strong {
          display: block;
          margin-bottom: 4px;
          color: var(--ea-ink);
        }

        .ea__next-card p {
          margin-bottom: 0;
          color: var(--ea-muted);
        }

        .ea__next-card span {
          color: var(--ea-ink);
          font-weight: 900;
        }

        .ea__footer {
          position: relative;
          z-index: 1;
          width: min(1120px, calc(100vw - 56px));
          max-width: 100%;
          margin: 16px auto 0;
          display: flex;
          justify-content: center;
          gap: 18px;
          color: rgba(10, 22, 36, 0.58);
          font-size: 0.84rem;
        }

        @media (max-width: 860px) {
          .ea {
            width: 100vw;
            max-width: 100vw;
            padding: 14px;
          }

          .ea__shell {
            width: calc(100vw - 28px);
            max-width: calc(100vw - 28px);
            min-height: auto;
            padding: 16px;
            border-radius: 28px;
            overflow: hidden;
          }

          .ea__nav {
            display: grid;
            grid-template-columns: minmax(0, auto) minmax(0, 1fr);
            align-items: center;
            margin-bottom: 26px;
            min-width: 0;
          }

          .ea__grid {
            display: flex;
            width: 100%;
            max-width: 100%;
            min-width: 0;
            flex-direction: column;
            gap: 18px;
          }

          .ea__hero,
          .ea__pass,
          .ea__success {
            width: 100%;
            max-width: 100%;
            min-width: 0;
          }

          .ea__hero {
            padding: 26px 20px 24px;
          }

          .ea__hero h1,
          .ea__success h1 {
            max-width: 100%;
            font-size: clamp(2.05rem, 9vw, 3rem);
            letter-spacing: -0.055em;
            line-height: 1;
            overflow-wrap: break-word;
          }

          .ea__lead,
          .ea__form,
          .ea__privacy {
            max-width: 100%;
            min-width: 0;
          }

          .ea__form-row {
            grid-template-columns: 1fr;
          }

          .ea__form input,
          .ea__form button {
            width: 100%;
          }

          .ea__pass {
            padding: 22px;
            overflow-x: clip;
          }

          .ea__source {
            justify-self: end;
            min-width: 0;
            max-width: 100%;
            letter-spacing: 0.08em;
          }

          .ea__footer {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 440px) {
          .ea {
            width: 100vw;
            max-width: 100vw;
            padding: 10px;
          }

          .ea__shell {
            width: calc(100vw - 20px);
            max-width: calc(100vw - 20px);
            padding: 10px;
          }

          .ea__nav {
            grid-template-columns: 1fr;
            align-items: flex-start;
            gap: 8px;
          }

          .ea__brand {
            flex-shrink: 0;
            font-size: 1rem;
          }

          .ea__source {
            justify-self: start;
            max-width: 100%;
            padding-inline: 10px;
            font-size: 0.66rem;
          }

          .ea__hero {
            padding: 22px 18px;
          }

          .ea__hero h1,
          .ea__success h1 {
            font-size: clamp(1.86rem, 8.2vw, 2.28rem);
            letter-spacing: -0.045em;
          }

          .ea__lead {
            font-size: 1rem;
            line-height: 1.55;
          }

          .ea__eyebrow {
            max-width: 100%;
            overflow-wrap: anywhere;
          }

          .ea__form-row {
            padding: 6px;
            border-radius: 18px;
          }

          .ea__form input {
            padding: 13px 12px;
            font-size: 0.98rem;
          }

          .ea__form button {
            padding: 13px 16px;
          }

          .ea__route {
            grid-template-columns: auto minmax(28px, 1fr) auto;
            gap: 8px;
          }

          .ea__route span {
            font-size: clamp(1.8rem, 13vw, 2.7rem);
          }

          .ea__pass-top,
          .ea__pass-footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
          }

          .ea__benefit {
            grid-template-columns: 36px 1fr;
            padding: 12px;
          }
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        @media (max-width: 640px) {
          [role="region"][aria-label="Install PayaGo"] {
            display: none !important;
          }

          [role="dialog"][aria-label="Cookie consent"],
          [role="dialog"][aria-label="Cookie consent"] * {
            box-sizing: border-box;
          }

          [role="dialog"][aria-label="Cookie consent"] {
            padding: 8px !important;
            z-index: 70 !important;
          }

          [role="dialog"][aria-label="Cookie consent"] > div {
            width: 100% !important;
            max-width: calc(100vw - 16px) !important;
            padding: 10px !important;
            border-radius: 16px !important;
            gap: 8px !important;
          }

          [role="dialog"][aria-label="Cookie consent"] > div > div:first-child {
            display: none !important;
          }

          [role="dialog"][aria-label="Cookie consent"] p {
            font-size: 10.5px !important;
            line-height: 1.3 !important;
          }

          [role="dialog"][aria-label="Cookie consent"] p:first-child {
            margin-bottom: 2px !important;
            font-size: 11.5px !important;
          }

          [role="dialog"][aria-label="Cookie consent"] > div > div:last-child {
            display: grid !important;
            width: 100% !important;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
            gap: 8px !important;
          }

          [role="dialog"][aria-label="Cookie consent"] button {
            min-width: 0 !important;
            padding: 8px 9px !important;
            border-radius: 11px !important;
            font-size: 11.5px !important;
            white-space: nowrap !important;
          }
        }
      `}</style>
    </main>
  )
}
