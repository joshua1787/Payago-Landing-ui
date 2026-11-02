"use client"

import { useEffect, useRef, useState } from "react"

// The same picture as the app: a coin, and money in orbit around it. Here each
// ring is a phase of PayaGo. The solid inner ring is what exists today, with people
// moving on it. The dashed rings are what comes next, and nothing moves on them yet.

const SQUASH = 0.36
const TILT = -0.3
const RINGS = [
  { scale: 1, live: true },
  { scale: 1.62, live: false },
  { scale: 2.16, live: false },
]
const BODIES = ["#19E4CC", "#FFC65C", "#A29CFF", "#FF9E85"]
const STARS = 70
// Front of the inner ring, top right of the middle, top left of the outer.
const LABEL_ANGLES = [1.72, -0.92, -2.02]

type Label = { text: string; status: string; x: number; y: number; live: boolean; below: boolean }

// Fixed seed: the sky is the same on every visit.
function seeded(seed: number) {
  let value = seed
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

export function OrbitField({ labels }: { labels: { text: string; status: string }[] }) {
  const host = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [placed, setPlaced] = useState<Label[]>([])

  useEffect(() => {
    const element = canvas.current
    const box = host.current
    if (!element || !box) return
    const ctx = element.getContext("2d")
    if (!ctx) return

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const random = seeded(4817)
    const stars = Array.from({ length: STARS }, () => ({
      x: random(),
      y: random(),
      bright: random(),
    }))

    let width = 0
    let height = 0
    let cx = 0
    let cy = 0
    let base = 0
    let nodes: Label[] = []

    const pointOn = (radius: number, angle: number) => {
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius * SQUASH
      return {
        x: cx + x * Math.cos(TILT) - y * Math.sin(TILT),
        y: cy + x * Math.sin(TILT) + y * Math.cos(TILT),
      }
    }

    const measure = () => {
      const rect = box.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      element.width = Math.round(width * dpr)
      element.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const wide = width >= 1024
      cx = width * (wide ? 0.725 : 0.66)
      cy = height * (wide ? 0.5 : 0.19)
      base = wide ? Math.min(width * 0.15, height * 0.26) : Math.min(width * 0.3, 118)
      // Each label sits at its own part of its own ring, so they never meet.
      nodes = wide
        ? RINGS.map((ring, index) => {
            const at = pointOn(base * ring.scale, LABEL_ANGLES[index])
            return { ...labels[index], x: at.x, y: at.y, live: ring.live, below: index === 0 }
          })
        : []
      setPlaced(nodes)
    }

    const ring = (index: number, front: boolean, reveal: number) => {
      const { scale, live } = RINGS[index]
      const radius = base * scale * (0.86 + 0.14 * reveal)
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(TILT)
      ctx.setLineDash(live ? [] : [5, 7])
      ctx.lineWidth = live ? 1.6 : 1.2
      ctx.strokeStyle = `rgba(25,228,204,${(live ? 0.85 : 0.5) * reveal * (front ? 1 : 0.6)})`
      ctx.beginPath()
      ctx.ellipse(0, 0, radius, radius * SQUASH, 0, front ? 0 : Math.PI, front ? Math.PI : Math.PI * 2)
      ctx.stroke()
      ctx.restore()
      return radius
    }

    const body = (radius: number, angle: number, colour: string, reveal: number) => {
      const depth = 0.68 + 0.32 * Math.sin(angle)
      const size = Math.max(3.4, base * 0.034) * depth
      for (let step = 8; step >= 1; step--) {
        const trail = pointOn(radius, angle - step * 0.032)
        ctx.globalAlpha = 0.24 * depth * (1 - step / 9) * reveal
        ctx.fillStyle = colour
        ctx.beginPath()
        ctx.arc(trail.x, trail.y, size * (1 - step / 11), 0, Math.PI * 2)
        ctx.fill()
      }
      const at = pointOn(radius, angle)
      const glow = ctx.createRadialGradient(at.x, at.y, 0, at.x, at.y, size * 3.4)
      glow.addColorStop(0, colour)
      glow.addColorStop(1, "transparent")
      ctx.globalAlpha = 0.45 * depth * reveal
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(at.x, at.y, size * 3.4, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = reveal
      ctx.fillStyle = colour
      ctx.beginPath()
      ctx.arc(at.x, at.y, size, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
    }

    const coin = (reveal: number) => {
      const size = base * 0.3 * (0.9 + 0.1 * reveal)
      // Teal, not gold: a gold glow on teal goes the colour of mud.
      const halo = ctx.createRadialGradient(cx, cy, size * 0.8, cx, cy, base * 2.3)
      halo.addColorStop(0, "rgba(25,228,204,0.2)")
      halo.addColorStop(1, "rgba(25,228,204,0)")
      ctx.globalAlpha = reveal
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(cx, cy, base * 2.3, 0, Math.PI * 2)
      ctx.fill()
      const rim = ctx.createRadialGradient(cx, cy, size, cx, cy, size * 1.5)
      rim.addColorStop(0, "rgba(255,201,79,0.45)")
      rim.addColorStop(1, "rgba(255,201,79,0)")
      ctx.fillStyle = rim
      ctx.beginPath()
      ctx.arc(cx, cy, size * 1.5, 0, Math.PI * 2)
      ctx.fill()
      const face = ctx.createRadialGradient(cx - size * 0.38, cy - size * 0.45, 0, cx, cy, size * 1.15)
      face.addColorStop(0, "#FFF0B8")
      face.addColorStop(0.5, "#FFC94F")
      face.addColorStop(1, "#C77F12")
      ctx.fillStyle = face
      ctx.beginPath()
      ctx.arc(cx, cy, size, 0, Math.PI * 2)
      ctx.fill()
      ctx.lineWidth = Math.max(1.5, size * 0.05)
      ctx.strokeStyle = "#FFE9A6"
      ctx.stroke()
      ctx.fillStyle = "#8A5608"
      ctx.font = `700 ${size * 1.05}px "Sora Variable", "Helvetica Neue", Arial, sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("£", cx, cy + size * 0.05)
      ctx.globalAlpha = 1
    }

    const draw = (time: number, reveal: number) => {
      ctx.clearRect(0, 0, width, height)
      for (const star of stars) {
        ctx.fillStyle = `rgba(255,255,255,${(0.1 + star.bright * 0.42) * reveal})`
        ctx.beginPath()
        ctx.arc(star.x * width, star.y * height, 0.5 + star.bright * 0.7, 0, Math.PI * 2)
        ctx.fill()
      }
      const spin = time / 9000
      const people = BODIES.map((colour, index) => ({
        colour,
        angle: spin + (index / BODIES.length) * Math.PI * 2 + 0.6,
      }))
      for (let index = RINGS.length - 1; index >= 0; index--) ring(index, false, reveal)
      const inner = base * RINGS[0].scale * (0.86 + 0.14 * reveal)
      for (const person of people) {
        if (Math.sin(person.angle) < 0) body(inner, person.angle, person.colour, reveal)
      }
      coin(reveal)
      for (let index = 0; index < RINGS.length; index++) ring(index, true, reveal)
      for (const person of people) {
        if (Math.sin(person.angle) >= 0) body(inner, person.angle, person.colour, reveal)
      }
      // A marker where each label meets its ring: hollow means not here yet.
      for (const node of nodes) {
        ctx.globalAlpha = reveal
        ctx.beginPath()
        ctx.arc(node.x, node.y, 4.5, 0, Math.PI * 2)
        ctx.fillStyle = node.live ? "#19E4CC" : "#07302D"
        ctx.fill()
        ctx.lineWidth = 1.4
        ctx.strokeStyle = node.live ? "#19E4CC" : "rgba(255,255,255,0.75)"
        ctx.stroke()
        ctx.globalAlpha = 1
      }
    }

    measure()
    const resize = new ResizeObserver(() => {
      measure()
      if (still) draw(0, 1)
    })
    resize.observe(box)

    let frame = 0
    let start = 0
    let visible = true
    const loop = (now: number) => {
      if (!start) start = now
      const t = Math.min((now - start) / 1400, 1)
      draw(now, 1 - Math.pow(1 - t, 3))
      if (visible) frame = requestAnimationFrame(loop)
    }

    // One sweep in on arrival, then only ever slow. Off-screen, it costs nothing.
    let watch: IntersectionObserver | undefined
    if (still) {
      draw(0, 1)
      void document.fonts?.ready.then(() => draw(0, 1))
    } else {
      frame = requestAnimationFrame(loop)
      watch = new IntersectionObserver(([entry]) => {
        const nowVisible = entry.isIntersecting
        if (nowVisible && !visible) frame = requestAnimationFrame(loop)
        visible = nowVisible
      })
      watch.observe(box)
    }

    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      watch?.disconnect()
    }
  }, [labels])

  return (
    <div ref={host} className="absolute inset-0" aria-hidden="true">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      {placed.map((label) => (
        <div
          key={label.text}
          className={`absolute -translate-x-1/2 text-center ${label.below ? "pt-2.5" : "-translate-y-full pb-2.5"}`}
          style={{ left: label.x, top: label.y }}
        >
          <div className="rounded-xl bg-[#07302D]/80 px-3 py-1.5">
          <div className={`whitespace-nowrap font-display text-[15px] font-semibold ${label.live ? "text-white" : "text-white/85"}`}>
            {label.text}
          </div>
          <div className={`whitespace-nowrap text-[13px] ${label.live ? "text-[#19E4CC]" : "text-white/60"}`}>{label.status}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
