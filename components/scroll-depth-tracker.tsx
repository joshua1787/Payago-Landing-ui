"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { captureEvent } from "@/lib/analytics"

const scrollThresholds = [25, 50, 75, 100] as const
const TRACK_THROTTLE_MS = 250

export function ScrollDepthTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const emitted = new Set<number>()
    let pendingTimer = 0

    const trackScrollDepth = () => {
      const documentElement = document.documentElement
      const body = document.body
      const pageHeight = Math.max(documentElement.scrollHeight, body.scrollHeight, window.innerHeight)
      const viewedHeight = window.scrollY + window.innerHeight
      const percentViewed = Math.min(100, Math.floor((viewedHeight / pageHeight) * 100))

      for (const threshold of scrollThresholds) {
        if (percentViewed >= threshold && !emitted.has(threshold)) {
          emitted.add(threshold)
          captureEvent("scroll_depth", {
            percent: threshold,
            path: pathname || window.location.pathname,
          })
        }
      }
    }

    const scheduleTrack = () => {
      if (pendingTimer) {
        return
      }

      pendingTimer = window.setTimeout(() => {
        pendingTimer = 0
        trackScrollDepth()
      }, TRACK_THROTTLE_MS)
    }

    trackScrollDepth()
    window.addEventListener("scroll", scheduleTrack, { passive: true })
    window.addEventListener("resize", scheduleTrack)

    return () => {
      window.removeEventListener("scroll", scheduleTrack)
      window.removeEventListener("resize", scheduleTrack)

      if (pendingTimer) {
        window.clearTimeout(pendingTimer)
      }
    }
  }, [pathname])

  return null
}
