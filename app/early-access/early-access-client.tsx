"use client"

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react"
import { useSearchParams } from "next/navigation"

const WAITLIST_ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT?.trim()
const FALLBACK_EMAIL = "support@payago.in"

type Status = "idle" | "loading" | "success" | "error" | "unconfigured"

const CAMPAIGN_LABELS: Record<string, string> = {
  "airport-heathrow": "Heathrow Terminal 5 · London",
  "airport-gatwick": "Gatwick · London",
  "airport-stansted": "Stansted · London",
  "airport-cdg": "Paris CDG",
  "airport-schiphol": "Amsterdam Schiphol",
  "airport-berlin": "Berlin BER",
  "voice-booth-london": "Voice Booth · London",
  "voice-booth-paris": "Voice Booth · Paris",
  "drone-thames": "Drone Skyline · Thames",
  "reddit-ama": "Reddit AMA",
  "conference": "Conference",
  "business-card": "Business Card",
  "mystery-trip": "Mystery Trip Stunt",
  "voyager-pass": "Voyager Pass Holders",
}

function buildMailto(email: string) {
  const subject = encodeURIComponent("PayaGo early access waitlist")
  const body = encodeURIComponent(
    `Please add me to the PayaGo early-access waitlist.\n\nEmail: ${email}`,
  )
  return `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`
}

export function EarlyAccessClient() {
  const params = useSearchParams()
  const rawCampaign = (params?.get("c") ?? "").toLowerCase().trim()
  const safeCampaign = rawCampaign.replace(/[^a-z0-9-]/g, "").slice(0, 64)
  const campaignLabel = useMemo(
    () => CAMPAIGN_LABELS[safeCampaign] ?? null,
    [safeCampaign],
  )
  const source = safeCampaign ? `qr-${safeCampaign}` : "qr-unknown"

  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [feedback, setFeedback] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Auto-focus the input after a beat so iOS/Android keyboards open
    const t = setTimeout(() => inputRef.current?.focus(), 350)
    return () => clearTimeout(t)
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
        "Waitlist capture is offline. We opened an email draft instead — you're not on the list until you send it.",
      )
      window.location.href = buildMailto(normalized)
      return
    }

    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalized,
          source,
          referrer: typeof document !== "undefined" ? document.referrer : "",
        }),
      })
      if (!res.ok) throw new Error(`status_${res.status}`)
      setStatus("success")
      setEmail("")
    } catch (err) {
      setStatus("error")
      setFeedback(
        `We couldn't add you. Try again, or email ${FALLBACK_EMAIL}.`,
      )
    }
  }

  return (
    <main className="ea">
      <div className="ea__bg" aria-hidden="true" />
      <div className="ea__inner">
        <header className="ea__header">
          <a href="/" className="ea__brand">
            <span className="ea__mark" />
            <span>PayaGo</span>
          </a>
          {campaignLabel ? (
            <span className="ea__pill">From: {campaignLabel}</span>
          ) : (
            <span className="ea__pill ea__pill--mint">Scan-only access</span>
          )}
        </header>

        {status === "success" ? (
          <section className="ea__success">
            <div className="ea__success__icon">✓</div>
            <h1 className="ea__h1">
              You&rsquo;re <em>in.</em>
            </h1>
            <p className="ea__deck">
              We just sent a confirmation to your inbox. When your wave is up,
              you&rsquo;ll get one email with your install link.
            </p>
            <div className="ea__success__after">
              <div className="ea__step">
                <span className="ea__step__n">01</span>
                <div>
                  <strong>Check your inbox.</strong>
                  <p>
                    A welcome note is on its way — sometimes Gmail drops it in
                    Promotions.
                  </p>
                </div>
              </div>
              <div className="ea__step">
                <span className="ea__step__n">02</span>
                <div>
                  <strong>Follow along.</strong>
                  <p>
                    We post every weekday on{" "}
                    <a href="https://x.com/payago_app" className="ea__link">
                      @payago_app
                    </a>{" "}
                    — behind-the-scenes builds, mystery-trip drops, Voyager
                    Pass winners.
                  </p>
                </div>
              </div>
              <div className="ea__step">
                <span className="ea__step__n">03</span>
                <div>
                  <strong>Wave 1 opens soon.</strong>
                  <p>
                    First come, first flown. Top-1,000 referrers get a real
                    metal Voyager Pass shipped to them.
                  </p>
                </div>
              </div>
            </div>
            <a href="/" className="ea__back">
              Back to payago.in →
            </a>
          </section>
        ) : (
          <section className="ea__main">
            <h1 className="ea__h1">
              You found us.<br />
              Welcome to <em>the inside lane.</em>
            </h1>
            <p className="ea__deck">
              Scan-only early access. PayaGo — the AI travel concierge for
              groups — is opening in the UK first, then across Europe. Drop
              your email and you&rsquo;re first in line.
            </p>

            <form className="ea__form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@anywhere.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
                aria-label="Email address"
              />
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Joining…" : "Get early access"}
              </button>
            </form>
            {feedback && <p className="ea__feedback">{feedback}</p>}
            <p className="ea__micro">
              No spam. One email when your wave opens.{" "}
              <a href="/privacy" className="ea__link">
                Privacy
              </a>
              .
            </p>

            <div className="ea__benefits">
              <h2 className="ea__h2">
                What you actually <em>get</em>
              </h2>
              <ul className="ea__list">
                <li>
                  <span className="ea__chip ea__chip--gold">★</span>
                  <div>
                    <strong>Voyager Pass eligibility.</strong>
                    <span>
                      Top 1,000 referrers receive a real metal NFC card. Tap to
                      share any trip.
                    </span>
                  </div>
                </li>
                <li>
                  <span className="ea__chip ea__chip--cyan">⚡</span>
                  <div>
                    <strong>Wave 1 priority.</strong>
                    <span>
                      First in line when PayaGo opens — UK first, then across
                      Europe.
                    </span>
                  </div>
                </li>
                <li>
                  <span className="ea__chip ea__chip--violet">∞</span>
                  <div>
                    <strong>Lifetime 20% off Premium tier.</strong>
                    <span>
                      Editorial-curated luxury trips, Aman / Soho House
                      partners.
                    </span>
                  </div>
                </li>
                <li>
                  <span className="ea__chip ea__chip--mint">£</span>
                  <div>
                    <strong>£50 launch credit.</strong>
                    <span>
                      Applied to your first Voice Pay booking. No card needed
                      to claim.
                    </span>
                  </div>
                </li>
                <li>
                  <span className="ea__chip">👥</span>
                  <div>
                    <strong>Founders&rsquo; chat.</strong>
                    <span>
                      Direct line to the team in a private community for early
                      members.
                    </span>
                  </div>
                </li>
                <li>
                  <span className="ea__chip">📜</span>
                  <div>
                    <strong>Curated trip templates.</strong>
                    <span>
                      50 ready-to-clone itineraries from PayaGo&rsquo;s
                      editorial team.
                    </span>
                  </div>
                </li>
                <li>
                  <span className="ea__chip">🎁</span>
                  <div>
                    <strong>Mystery-trip lottery.</strong>
                    <span>
                      30 fully-paid surprise trips hidden in the app at launch
                      — Tokyo, Reykjavik, Marrakech.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="ea__scarce">
              <span className="ea__scarce__dot" />
              <span>
                <strong>1,000 Voyager Passes</strong> remaining in this wave
              </span>
            </div>
          </section>
        )}

        <footer className="ea__footer">
          <p>
            © 2026 PayaGo Ltd · London ·{" "}
            <a href="/terms" className="ea__link">
              Terms
            </a>{" "}
            ·{" "}
            <a href="/privacy" className="ea__link">
              Privacy
            </a>
          </p>
        </footer>
      </div>

      <style jsx>{`
        :root {
          --canvas: oklch(0.985 0.005 90);
          --ink: oklch(0.22 0.02 250);
          --ink-soft: oklch(0.45 0.02 250);
          --surface: #ffffff;
          --n-3: oklch(0.90 0.015 250);
          --n-12: oklch(0.10 0.02 250);
          --cyan: oklch(0.81 0.13 218);
          --violet: oklch(0.59 0.22 285);
          --mint: oklch(0.79 0.13 165);
          --gold: oklch(0.74 0.10 80);
          --gradient: linear-gradient(135deg, var(--cyan) 0%, var(--violet) 33%, var(--mint) 66%, var(--cyan) 100%);
        }

        .ea {
          min-height: 100vh;
          background: var(--canvas, #FAFAF8);
          color: var(--ink, #232f42);
          font-family: var(--font-inter, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif);
          font-size: 16px;
          line-height: 1.55;
          padding: 24px 20px 40px;
          position: relative;
          overflow-x: hidden;
        }
        .ea__bg {
          position: fixed;
          inset: -10% -10% auto -10%;
          height: 70%;
          background:
            radial-gradient(ellipse 65% 55% at 20% 25%, oklch(0.81 0.13 218 / 0.13), transparent 65%),
            radial-gradient(ellipse 50% 45% at 90% 60%, oklch(0.74 0.10 80 / 0.07), transparent 65%);
          z-index: 0;
          pointer-events: none;
        }
        .ea__inner {
          max-width: 540px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .ea__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 4px;
        }
        .ea__brand {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: "Fraunces", Georgia, serif;
          font-weight: 900;
          font-size: 1.25rem;
          letter-spacing: -0.04em;
          color: var(--ink);
          text-decoration: none;
        }
        .ea__mark {
          width: 24px;
          height: 24px;
          border-radius: 7px;
          background: var(--gradient);
          background-size: 200% 200%;
          box-shadow: 0 0 24px oklch(0.81 0.13 218 / 0.4);
          animation: shimmer 8s ease-in-out infinite;
        }
        .ea__pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 11px;
          border-radius: 999px;
          background: oklch(0.74 0.10 80 / 0.16);
          color: oklch(0.42 0.10 80);
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .ea__pill--mint {
          background: oklch(0.79 0.13 165 / 0.16);
          color: oklch(0.38 0.13 165);
        }
        .ea__pill--mint::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--mint);
          box-shadow: 0 0 10px var(--mint);
          animation: pulse 1.8s ease-in-out infinite;
        }

        .ea__main, .ea__success {
          background: var(--surface);
          border: 1px solid var(--n-3);
          border-radius: 24px;
          padding: 36px 28px 32px;
          box-shadow:
            0 24px 56px oklch(0.22 0.02 250 / 0.10),
            0 6px 20px oklch(0.22 0.02 250 / 0.05);
        }

        .ea__h1 {
          font-family: "Fraunces", Georgia, serif;
          font-size: clamp(2rem, 8vw, 2.7rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.02;
          margin: 0 0 14px;
          color: var(--ink);
        }
        .ea__h1 em {
          font-style: italic;
          font-variation-settings: "opsz" 144;
          background: var(--gradient);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 8s ease-in-out infinite;
        }
        .ea__deck {
          color: var(--ink-soft);
          font-size: 1.02rem;
          margin: 0 0 24px;
        }

        .ea__form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 0 0 14px;
        }
        .ea__form input {
          padding: 16px 18px;
          border-radius: 14px;
          border: 1.5px solid var(--n-3);
          font-size: 1rem;
          font-family: inherit;
          background: var(--canvas);
          color: var(--ink);
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          width: 100%;
        }
        .ea__form input:focus {
          outline: 0;
          border-color: var(--cyan);
          box-shadow: 0 0 0 4px oklch(0.81 0.13 218 / 0.15);
        }
        .ea__form button {
          padding: 16px;
          border-radius: 14px;
          background: var(--n-12);
          color: var(--canvas);
          border: 0;
          font-weight: 700;
          font-size: 1rem;
          font-family: inherit;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .ea__form button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px oklch(0.22 0.02 250 / 0.18);
        }
        .ea__form button:disabled { opacity: 0.7; cursor: progress; }

        .ea__feedback {
          color: oklch(0.50 0.18 25);
          font-size: 0.88rem;
          margin: 8px 0 0;
        }
        .ea__micro {
          font-size: 0.82rem;
          color: var(--ink-soft);
          margin: 4px 0 28px;
        }
        .ea__link {
          color: var(--violet);
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .ea__h2 {
          font-family: "Fraunces", Georgia, serif;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }
        .ea__h2 em {
          font-style: italic;
          font-variation-settings: "opsz" 144;
          color: var(--violet);
        }
        .ea__benefits { margin-top: 8px; padding-top: 28px; border-top: 1px solid var(--n-3); }
        .ea__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .ea__list li {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 0.93rem;
        }
        .ea__list strong {
          display: block;
          color: var(--ink);
          font-weight: 700;
          margin-bottom: 2px;
        }
        .ea__list span:not(.ea__chip) { color: var(--ink-soft); }
        .ea__chip {
          width: 30px;
          height: 30px;
          border-radius: 9px;
          display: grid;
          place-items: center;
          font-size: 0.9rem;
          font-weight: 800;
          background: oklch(0.94 0.012 250);
          color: var(--ink);
          flex-shrink: 0;
        }
        .ea__chip--gold { background: oklch(0.74 0.10 80 / 0.18); color: oklch(0.42 0.10 80); }
        .ea__chip--cyan { background: oklch(0.81 0.13 218 / 0.14); color: oklch(0.38 0.12 218); }
        .ea__chip--violet { background: oklch(0.59 0.22 285 / 0.14); color: oklch(0.40 0.20 285); }
        .ea__chip--mint { background: oklch(0.79 0.13 165 / 0.16); color: oklch(0.38 0.12 165); }

        .ea__scarce {
          margin-top: 24px;
          padding: 12px 16px;
          background: oklch(0.74 0.10 80 / 0.10);
          border: 1px solid oklch(0.74 0.10 80 / 0.3);
          border-radius: 14px;
          color: oklch(0.40 0.10 80);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ea__scarce__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 10px var(--gold);
          animation: pulse 1.6s infinite;
        }

        /* Success state */
        .ea__success__icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: oklch(0.79 0.13 165 / 0.18);
          color: oklch(0.38 0.13 165);
          display: grid;
          place-items: center;
          font-size: 2rem;
          font-weight: 900;
          margin: 0 auto 20px;
        }
        .ea__success { text-align: center; }
        .ea__success .ea__h1, .ea__success .ea__deck { text-align: center; }
        .ea__success__after {
          margin: 28px 0 12px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          text-align: left;
        }
        .ea__step { display: flex; gap: 12px; align-items: flex-start; }
        .ea__step__n {
          font-family: "JetBrains Mono", "SF Mono", Menlo, monospace;
          font-size: 0.72rem;
          color: var(--ink-soft);
          padding-top: 3px;
          flex-shrink: 0;
        }
        .ea__step strong { display: block; font-weight: 700; margin-bottom: 2px; }
        .ea__step p { margin: 0; color: var(--ink-soft); font-size: 0.92rem; }
        .ea__back {
          display: inline-block;
          margin-top: 24px;
          color: var(--violet);
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
        }

        .ea__footer {
          text-align: center;
          color: var(--ink-soft);
          font-size: 0.82rem;
        }

        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ea__mark, .ea__h1 em, .ea__pill--mint::before, .ea__scarce__dot {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  )
}
