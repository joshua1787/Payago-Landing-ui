"use client"

import { useEffect } from "react"

import {
  enableGoogleAnalytics,
  onAnalyticsConsentChange,
  setAnalyticsConsent,
} from "@/lib/analytics"

type AnalyticsLoaderProps = {
  measurementId: string
}

function getSavedAnalyticsConsent() {
  try {
    return window.localStorage.getItem("payago-cookie-consent") === "accepted"
      ? "granted"
      : "denied"
  } catch {
    return "denied"
  }
}

export function AnalyticsLoader({ measurementId }: AnalyticsLoaderProps) {
  useEffect(() => {
    const applyConsent = (analyticsStorage: "granted" | "denied") => {
      if (analyticsStorage === "granted") {
        enableGoogleAnalytics(measurementId)
        return
      }

      setAnalyticsConsent("denied")
    }

    applyConsent(getSavedAnalyticsConsent())

    return onAnalyticsConsentChange(({ analyticsStorage }) => {
      applyConsent(analyticsStorage)
    })
  }, [measurementId])

  return null
}
