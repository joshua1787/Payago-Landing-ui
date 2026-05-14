"use client"

import { useEffect } from "react"

const SCROLL_IDLE_DELAY_MS = 140

export function ScrollPerformanceGuard() {
  useEffect(() => {
    const root = document.documentElement
    let startFrameId = 0
    let idleTimer = 0
    let isScrolling = false

    const startScrolling = () => {
      if (isScrolling || startFrameId) {
        return
      }

      startFrameId = window.requestAnimationFrame(() => {
        startFrameId = 0
        root.dataset.scrolling = "true"
        isScrolling = true
      })
    }

    const stopScrolling = () => {
      if (startFrameId) {
        window.cancelAnimationFrame(startFrameId)
        startFrameId = 0
      }

      if (isScrolling) {
        delete root.dataset.scrolling
        isScrolling = false
      }
    }

    const markScrolling = () => {
      startScrolling()

      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(stopScrolling, SCROLL_IDLE_DELAY_MS)
    }

    window.addEventListener("scroll", markScrolling, { passive: true })
    window.addEventListener("wheel", markScrolling, { passive: true })
    window.addEventListener("touchmove", markScrolling, { passive: true })

    return () => {
      window.removeEventListener("scroll", markScrolling)
      window.removeEventListener("wheel", markScrolling)
      window.removeEventListener("touchmove", markScrolling)
      window.clearTimeout(idleTimer)
      stopScrolling()
    }
  }, [])

  return null
}
