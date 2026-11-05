import { between } from "@/lib/universe/chapters"

// The opening is drawn over the film, in the film's own sky and the plane's colours: a white body, navy
// lettering and a purple sweep. The hole in the "o" of PayaGo is cut through to the film, and flying
// through the letter is the way in.

export const LIVE_FROM = 0.07
export const ZOOM_FROM = 0.21
export const ZOOM_TO = 0.33

export type GateExample = { message: string; label: string; amount: string; share: string }

const WORD = "PayaGo"
const WORD_SIZE = 9.6
const PHONE_W = 48.6
const PHONE_H = 100
const SCREEN_INSET = 1.75

type Counter = { x: number; y: number; rx: number; ry: number }

/** Where the hole in the "o" sits, read from the font itself: as shares of the font size, from the o's origin. */
function measureCounter(font: string): Counter {
  const size = 400
  const probe = document.createElement("canvas")
  probe.width = size
  probe.height = size
  const ctx = probe.getContext("2d", { willReadFrequently: true })
  const fallback = { x: 0.3, y: -0.26, rx: 0.17, ry: 0.17 }
  if (!ctx) return fallback
  const baseline = 300
  ctx.font = `600 ${size * 0.8}px ${font}`
  ctx.fillText("o", 40, baseline)
  const { data } = ctx.getImageData(0, 0, size, size)
  const solid = (x: number, y: number) => data[(y * size + x) * 4 + 3] > 128
  let left = size
  let right = 0
  let top = size
  let bottom = 0
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!solid(x, y)) continue
      left = Math.min(left, x)
      right = Math.max(right, x)
      top = Math.min(top, y)
      bottom = Math.max(bottom, y)
    }
  }
  if (right <= left) return fallback
  const cx = Math.round((left + right) / 2)
  const cy = Math.round((top + bottom) / 2)
  if (solid(cx, cy)) return fallback
  let east = cx
  while (east < right && !solid(east, cy)) east++
  let south = cy
  while (south < bottom && !solid(cx, south)) south++
  const unit = size * 0.8
  return { x: (cx - 40) / unit, y: (cy - baseline) / unit, rx: (east - cx) / unit, ry: (south - cy) / unit }
}

function softSprite(inner: string, outer: string) {
  const sprite = document.createElement("canvas")
  sprite.width = 256
  sprite.height = 256
  const ctx = sprite.getContext("2d")
  if (ctx) {
    const glow = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    glow.addColorStop(0, inner)
    glow.addColorStop(1, outer)
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, 256, 256)
  }
  return sprite
}

const CLOUDS = [
  { x: 0.16, y: 0.82, size: 0.62, speed: 0.021, phase: 0.4, alpha: 0.5 },
  { x: 0.46, y: 0.92, size: 0.78, speed: 0.016, phase: 2.1, alpha: 0.42 },
  { x: 0.74, y: 0.8, size: 0.58, speed: 0.024, phase: 3.7, alpha: 0.46 },
  { x: 0.98, y: 0.9, size: 0.7, speed: 0.018, phase: 5.2, alpha: 0.42 },
]

const MOTES = Array.from({ length: 42 }, (_, i) => ({
  x: (i * 0.618034) % 1,
  y: (i * 0.754877) % 1,
  size: 0.6 + ((i * 7) % 5) * 0.28,
  speed: 0.006 + ((i * 3) % 7) * 0.002,
}))

export function createPhoneGate(canvas: HTMLCanvasElement, fontFrom: HTMLElement, still: boolean) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return null
  const cloud = softSprite("rgba(255,244,224,.85)", "rgba(255,236,204,0)")
  const shadow = softSprite("rgba(84,52,28,.5)", "rgba(84,52,28,0)")

  let width = 0
  let height = 0
  let ratio = 1
  let font = ""
  let counter: Counter = { x: 0.3, y: -0.26, rx: 0.17, ry: 0.17 }
  let wordWidth = 1
  let beforeO = 0
  let example: GateExample | null = null
  let lookX = 0
  let lookY = 0
  let wantX = 0
  let wantY = 0
  let headingTop = 0

  const readFont = () => {
    font = getComputedStyle(fontFrom).fontFamily
    ctx.font = `600 100px ${font}`
    wordWidth = ctx.measureText(WORD).width / 100
    beforeO = ctx.measureText(WORD.slice(0, -1)).width / 100
    counter = measureCounter(font)
  }

  const resize = () => {
    ratio = Math.min(window.devicePixelRatio || 1, window.innerWidth < 900 ? 1.25 : 2)
    width = canvas.clientWidth
    height = canvas.clientHeight
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(height * ratio)
    headingTop = fontFrom.getBoundingClientRect().top
  }

  const look = (event: PointerEvent) => {
    wantX = (event.clientX / window.innerWidth - 0.5) * 2
    wantY = (event.clientY / window.innerHeight - 0.5) * 2
  }
  if (!still && window.matchMedia("(pointer: fine)").matches) window.addEventListener("pointermove", look, { passive: true })

  readFont()
  resize()
  void document.fonts?.ready.then(() => {
    readFont()
    resize()
  })

  const rounded = (x: number, y: number, w: number, h: number, r: number | number[]) => {
    ctx.beginPath()
    ctx.roundRect(x, y, w, h, r)
  }

  // Cloud drifting across the film, and flecks of light in the air, so the sky moves while the film waits.
  const drawSky = (time: number) => {
    const reach = Math.max(width, height)
    CLOUDS.forEach(({ x, y, size, speed, phase, alpha }) => {
      const drift = time * speed + phase
      const across = (x + Math.sin(drift) * 0.09) * width
      const up = (y + Math.cos(drift * 1.3) * 0.04) * height
      const side = reach * size
      ctx.globalAlpha = alpha
      ctx.drawImage(cloud, across - side / 2, up - side / 2, side, side * 0.55)
    })
    ctx.globalAlpha = 0.7
    ctx.fillStyle = "#fff6e2"
    const motes = width < 900 ? MOTES.slice(0, 16) : MOTES
    motes.forEach(({ x, y, size, speed }) => {
      const up = ((y - time * speed) % 1 + 1) % 1
      ctx.beginPath()
      ctx.arc(x * width, up * height, size, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.globalAlpha = 1
  }

  const drawPhone = (scroll: number, time: number, wordAlpha: number, zoom: number, holeX: number, holeY: number, holeR: number) => {
    const w = PHONE_W
    const h = PHONE_H
    const left = -w / 2
    const top = -h / 2

    // A soft shadow on the air behind the phone, as the plane has against the cloud.
    if (zoom < 0.5) {
      ctx.globalAlpha = 0.75 * (1 - zoom * 2)
      ctx.drawImage(shadow, -w * 0.95, -h * 0.68, w * 2, h * 1.42)
      ctx.globalAlpha = 1
    }

    ctx.fillStyle = "#c9c4bb"
    ;[
      [left - 0.42, -31, 6],
      [left - 0.42, -21, 11],
      [left - 0.42, -8, 11],
      [-left - 0.08, -17, 16],
    ].forEach(([x, y, length]) => {
      rounded(x, y, 0.5, length, 0.25)
      ctx.fill()
    })

    const metal = ctx.createLinearGradient(left, top, -left, -top)
    metal.addColorStop(0, "#ffffff")
    metal.addColorStop(0.22, "#d8d3ca")
    metal.addColorStop(0.55, "#b9b4ab")
    metal.addColorStop(0.82, "#e4dfd6")
    metal.addColorStop(1, "#ffffff")
    ctx.fillStyle = metal
    rounded(left, top, w, h, 8.2)
    ctx.fill()
    ctx.fillStyle = "#1b2150"
    rounded(left + 0.55, top + 0.55, w - 1.1, h - 1.1, 7.7)
    ctx.fill()

    const sx = left + SCREEN_INSET
    const sy = top + SCREEN_INSET
    const sw = w - SCREEN_INSET * 2
    const sh = h - SCREEN_INSET * 2
    ctx.save()
    rounded(sx, sy, sw, sh, 6.6)
    ctx.clip()
    const screen = ctx.createLinearGradient(sx, sy, sx, sy + sh)
    screen.addColorStop(0, "#ffffff")
    screen.addColorStop(1, "#fbf5ea")
    ctx.fillStyle = screen
    ctx.fillRect(sx, sy, sw, sh)

    // The plane's tail, sweeping up from the corner of the screen.
    const tail = ctx.createLinearGradient(sx, sy + sh, sx + sw * 0.7, sy + sh * 0.68)
    tail.addColorStop(0, "#2b1f7a")
    tail.addColorStop(1, "#6d3fd0")
    ctx.fillStyle = tail
    ctx.beginPath()
    ctx.moveTo(sx, sy + sh * 0.76)
    ctx.quadraticCurveTo(sx + sw * 0.5, sy + sh * 0.86, sx + sw, sy + sh * 0.8)
    ctx.lineTo(sx + sw, sy + sh)
    ctx.lineTo(sx, sy + sh)
    ctx.closePath()
    ctx.fill()

    // A band of sunlight crossing the glass, moved by the scroll and by time.
    const sweep = sx - sw + ((scroll * 26 + time * 0.09) % 1) * sw * 3
    const band = ctx.createLinearGradient(sweep, sy, sweep + sw * 0.45, sy + sh * 0.14)
    band.addColorStop(0, "rgba(255,206,140,0)")
    band.addColorStop(0.5, "rgba(255,206,140,.2)")
    band.addColorStop(1, "rgba(255,206,140,0)")
    ctx.fillStyle = band
    ctx.fillRect(sx, sy, sw, sh)
    ctx.restore()

    ctx.fillStyle = "#02030a"
    rounded(-6.75, top + 3.5, 13.5, 3.7, 1.85)
    ctx.fill()

    if (wordAlpha > 0.01) {
      // The sun in the letter lights the screen around it.
      const pulse = still ? 1 : 0.86 + Math.sin(time * 1.5) * 0.14
      const sun = holeR * (3.6 + zoom * 8) * pulse
      const halo = ctx.createRadialGradient(holeX, holeY, holeR * 0.7, holeX, holeY, sun)
      halo.addColorStop(0, `rgba(255,190,104,${0.75 * wordAlpha})`)
      halo.addColorStop(0.4, `rgba(255,190,104,${0.22 * wordAlpha})`)
      halo.addColorStop(1, "rgba(255,178,92,0)")
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(holeX, holeY, sun, 0, Math.PI * 2)
      ctx.fill()

      ctx.globalAlpha = wordAlpha
      // Navy like the plane's name, paling as it nears so the way through stays full of light.
      const pale = between(zoom, 0.12, 0.42)
      ctx.fillStyle = `rgb(${27 + 228 * pale},${33 + 216 * pale},${80 + 158 * pale})`
      ctx.font = `600 ${WORD_SIZE}px ${font}`
      ctx.textBaseline = "alphabetic"
      ctx.textAlign = "left"
      ctx.fillText(WORD, (-wordWidth * WORD_SIZE) / 2, WORD_SIZE * 0.32)
      ctx.globalAlpha = 1
    }
  }

  /** The part that works today, happening on the phone's own screen. */
  const drawBill = (scroll: number) => {
    if (!example) return
    const inFrom = LIVE_FROM + 0.008
    const bubble = between(scroll, inFrom, inFrom + 0.016) * (1 - between(scroll, ZOOM_FROM - 0.016, ZOOM_FROM - 0.002))
    const card = between(scroll, inFrom + 0.02, inFrom + 0.036) * (1 - between(scroll, ZOOM_FROM - 0.016, ZOOM_FROM - 0.002))
    if (bubble < 0.01) return
    const edge = PHONE_W / 2 - SCREEN_INSET - 3.4
    ctx.textBaseline = "middle"

    ctx.globalAlpha = bubble
    ctx.font = `500 3.3px ${font}`
    const bubbleW = ctx.measureText(example.message).width + 5.6
    const bubbleY = -15 + (1 - bubble) * 4
    ctx.fillStyle = "#1b2150"
    rounded(edge - bubbleW, bubbleY, bubbleW, 7.2, [3.2, 3.2, 0.9, 3.2])
    ctx.fill()
    ctx.fillStyle = "#fff"
    ctx.textAlign = "left"
    ctx.fillText(example.message, edge - bubbleW + 2.8, bubbleY + 3.75)

    if (card > 0.01) {
      const cardW = edge * 2
      const cardY = -4.6 + (1 - card) * 5
      ctx.globalAlpha = card
      ctx.fillStyle = "#f1ecff"
      rounded(-edge, cardY, cardW, 15.6, 3.6)
      ctx.fill()
      ctx.fillStyle = "#1b2150"
      ctx.font = `600 3.3px ${font}`
      ctx.textAlign = "left"
      ctx.fillText(example.label, -edge + 2.6, cardY + 4.7)
      ctx.textAlign = "right"
      ctx.fillText(example.amount, edge - 2.6, cardY + 4.7)
      ctx.fillStyle = "#4a4f80"
      ctx.font = `400 2.8px ${font}`
      ctx.textAlign = "left"
      ctx.fillText("4 people", -edge + 2.6, cardY + 10.9)
      ctx.textAlign = "right"
      ctx.fillText(example.share, edge - 2.6, cardY + 10.9)
    }
    ctx.globalAlpha = 1
  }

  const draw = (scroll: number, now: number) => {
    const time = still ? 0 : now / 1000
    lookX += (wantX - lookX) * 0.06
    lookY += (wantY - lookY) * 0.06

    const wide = width >= 1024
    // On phones the words sit below, so the phone fills the space above them and never runs behind the
    // headline. It grows for the bill, when there are fewer words to make room for.
    const NAV = 72
    const roomAbove = Math.max(headingTop - NAV - 20, 96)
    const phoneHeight = wide ? height * 0.74 : roomAbove
    const em = phoneHeight / PHONE_H
    const zoom = clamp((scroll - ZOOM_FROM) / (ZOOM_TO - ZOOM_FROM))
    const settle = clamp(scroll / ZOOM_FROM)

    // The phone floats, and turns towards the camera through the first part of the scroll.
    const float = still ? 0 : Math.sin(time * 0.8) * 0.006
    const homeX = (wide ? 0.69 : 0.5) * width + lookX * 10 - (wide ? settle * width * 0.05 : 0)
    const grow = between(scroll, LIVE_FROM - 0.008, LIVE_FROM + 0.02)
    const liveHeight = Math.max(height * 0.46, phoneHeight)
    const narrowY = NAV + 10 + (phoneHeight + (liveHeight - phoneHeight) * grow) / 2
    const homeY = (wide ? 0.53 * height : narrowY) + float * height + lookY * 6
    const push = wide ? 1 + settle * settle * 0.14 : 1 + (liveHeight / phoneHeight - 1) * grow
    const turn = ((2.4 - settle * 3.9 + lookX * 1.1 + (still ? 0 : Math.sin(time * 0.55) * 0.35)) * Math.PI) / 180 * (1 - clamp(zoom * 2.2))
    const shear = (lookX * 0.012 + (1 - settle) * 0.016) * (1 - clamp(zoom * 2.2))

    const live = between(scroll, LIVE_FROM + 0.002, LIVE_FROM + 0.012) * (1 - between(scroll, ZOOM_FROM - 0.012, ZOOM_FROM))
    const wordAlpha = 1 - live

    const holeX = (-wordWidth / 2 + beforeO + counter.x) * WORD_SIZE
    const holeY = 0.32 * WORD_SIZE + counter.y * WORD_SIZE
    const holeRX = counter.rx * WORD_SIZE
    const holeRY = counter.ry * WORD_SIZE

    // The camera flies at the hole: the zoom is exponential so the speed feels constant all the way in.
    const needed = (Math.hypot(width, height) / (holeRX * em * push)) * 1.15
    const eased = zoom * zoom * (1.7 - 0.7 * zoom)
    const flight = Math.exp(Math.log(Math.max(needed, 1)) * eased)
    const scale = em * push * flight

    const cos = Math.cos(turn)
    const sin = Math.sin(turn)
    const restX = homeX + (cos * holeX - sin * holeY) * em * push
    const restY = homeY + (sin * holeX + cos * holeY) * em * push
    const centre = clamp(zoom * 1.6)
    const smooth = centre * centre * (3 - 2 * centre)
    const aimX = restX + (width / 2 - restX) * smooth
    const aimY = restY + (height / 2 - restY) * smooth
    const originX = aimX - (cos * holeX - sin * holeY) * scale
    const originY = aimY - (sin * holeX + cos * holeY) * scale

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    ctx.clearRect(0, 0, width, height)
    // Once the phone fills the view, the sky behind it can't be seen.
    if (zoom < 0.4) drawSky(time)

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(ratio, ratio)
    ctx.translate(originX, originY)
    ctx.rotate(turn)
    ctx.transform(1, shear, 0, 1, 0, 0)
    ctx.scale(scale, scale)
    drawPhone(scroll, time, wordAlpha, zoom, holeX, holeY, holeRX)
    drawBill(scroll)

    if (wordAlpha > 0.01) {
      ctx.globalCompositeOperation = "destination-out"
      ctx.globalAlpha = wordAlpha
      ctx.beginPath()
      ctx.ellipse(holeX, holeY, holeRX * 1.02, holeRY * 1.02, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = "source-over"

      // At rest the letter holds a small sun, whatever part of the film is behind it. It clears as the
      // camera gets close enough to see the sky through it.
      const glow = wordAlpha * (1 - between(zoom, 0.04, 0.3))
      if (glow > 0.01) {
        const sunDisc = ctx.createRadialGradient(holeX, holeY, 0, holeX, holeY, holeRX)
        sunDisc.addColorStop(0, `rgba(255,244,200,${glow})`)
        sunDisc.addColorStop(1, `rgba(255,176,84,${glow})`)
        ctx.fillStyle = sunDisc
        ctx.beginPath()
        ctx.ellipse(holeX, holeY, holeRX * 1.03, holeRY * 1.03, 0, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Sunlight floods in through the letter just before it passes the camera.
    const flood = Math.sin(Math.PI * between(zoom, 0.5, 1))
    if (flood > 0.005) {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      const light = ctx.createRadialGradient(aimX, aimY, 0, aimX, aimY, Math.hypot(width, height) * 0.75)
      light.addColorStop(0, `rgba(255,246,226,${0.55 * flood})`)
      light.addColorStop(0.5, `rgba(255,224,176,${0.3 * flood})`)
      light.addColorStop(1, "rgba(255,206,140,0)")
      ctx.fillStyle = light
      ctx.fillRect(0, 0, width, height)
    }
  }

  return {
    draw,
    resize,
    setExample(next: GateExample) {
      example = next
    },
    dispose() {
      window.removeEventListener("pointermove", look)
    },
  }
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value))
}
