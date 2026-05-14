"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { captureEvent } from "@/lib/analytics"

type InstallPromptOutcome = {
  outcome: "accepted" | "dismissed"
  platform: string
}

type BeforeInstallPromptEvent = Event & {
  readonly platforms?: string[]
  readonly userChoice: Promise<InstallPromptOutcome>
  prompt: () => Promise<void>
}

const dismissalStorageKey = "payago-pwa-install-banner-dismissed"

function normalizePathname(pathname: string | null) {
  if (!pathname || pathname === "/") return pathname
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
}

function isScanFlowPath(pathname: string | null) {
  const normalized = normalizePathname(pathname)
  return normalized === "/qr" || normalized === "/early-access"
}

function hasDismissedBanner() {
  try {
    return window.localStorage.getItem(dismissalStorageKey) === "true"
  } catch {
    return false
  }
}

function rememberDismissedBanner() {
  try {
    window.localStorage.setItem(dismissalStorageKey, "true")
  } catch {
    // Browsers can block storage; dismissal still applies for the current render.
  }
}

export function PwaInstallBanner() {
  const pathname = usePathname()
  const isScanFlow = isScanFlowPath(pathname)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isScanFlow) {
      setDeferredPrompt(null)
      setIsVisible(false)
      return
    }

    if (hasDismissedBanner()) {
      return
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()

      const promptEvent = event as BeforeInstallPromptEvent
      setDeferredPrompt(promptEvent)
      setIsVisible(true)
      captureEvent("pwa_install_prompt_shown", {
        source: "beforeinstallprompt",
        platforms: promptEvent.platforms?.join(",") || "web",
      })
    }

    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setIsVisible(false)
      captureEvent("pwa_app_installed", { source: "appinstalled" })
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [isScanFlow])

  const dismiss = (source: "banner" | "browser_prompt") => {
    rememberDismissedBanner()
    setIsVisible(false)
    setDeferredPrompt(null)
    captureEvent("pwa_install_prompt_dismissed", { source })
  }

  const install = async () => {
    if (!deferredPrompt) {
      return
    }

    setIsVisible(false)
    captureEvent("pwa_install_click", {
      source: "banner",
      platforms: deferredPrompt.platforms?.join(",") || "web",
    })

    try {
      await deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice

      if (choice.outcome === "accepted") {
        captureEvent("pwa_install_prompt_accepted", {
          source: "browser_prompt",
          platform: choice.platform || "web",
        })
      } else {
        rememberDismissedBanner()
        captureEvent("pwa_install_prompt_dismissed", {
          source: "browser_prompt",
          platform: choice.platform || "web",
        })
      }
    } finally {
      setDeferredPrompt(null)
    }
  }

  if (isScanFlow || !isVisible || !deferredPrompt) {
    return null
  }

  return (
    <div
      className="fixed bottom-6 left-4 right-4 z-[80] sm:left-auto sm:max-w-sm"
      role="region"
      aria-label="Install PayaGo"
      style={{ contain: "layout paint" }}
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#C9A962]/15 text-lg font-bold text-[#8a6b21]">
            P
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900">Install PayaGo</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Add PayaGo to your device for quick access from your home screen.
            </p>
          </div>
          <button
            type="button"
            onClick={() => dismiss("banner")}
            className="rounded-lg px-2 py-1 text-sm text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Dismiss install prompt"
          >
            x
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={install}
            className="flex-1 rounded-xl bg-gradient-to-r from-[#C9A962] to-[#E5C77D] px-4 py-2.5 text-sm font-semibold text-[#1a1a0e] transition-opacity hover:opacity-90"
          >
            Install
          </button>
          <button
            type="button"
            onClick={() => dismiss("banner")}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  )
}
