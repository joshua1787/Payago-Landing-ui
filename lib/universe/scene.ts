import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"

import { CHAPTERS, between, clamp01, smooth } from "./chapters"

// The PayaGo universe. A coin, a ring for what exists today, and a journey outward:
// bills, debts, your own money, cards, and at the far end the Earth.

const TEAL = new THREE.Color("#19E4CC")
const GOLD = new THREE.Color("#FFC94F")
const VIOLET = new THREE.Color("#8C86FF")
const CORAL = new THREE.Color("#FF9E85")
const PEOPLE_COLOURS = [TEAL, GOLD, VIOLET, CORAL, new THREE.Color("#7DF0A8")]
const DISPLAY_FONT = '"Sora Variable", "Helvetica Neue", Arial, sans-serif'
const GLOBE_RADIUS = 2.1
const HOME = { lat: 51.5, lng: -0.12 }

export type ExpenseCard = { label: string; amount: string; detail: string }

type Options = { mobile: boolean; still: boolean; landDots: Float32Array }

function latLng(lat: number, lng: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = ((lng + 180) * Math.PI) / 180
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function glowTexture() {
  const size = 128
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = size
  const ctx = canvas.getContext("2d")!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, "rgba(255,255,255,1)")
  g.addColorStop(0.22, "rgba(255,255,255,0.55)")
  g.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function coinFace(relief: boolean) {
  const size = 1024
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = size
  const ctx = canvas.getContext("2d")!
  if (relief) {
    ctx.fillStyle = "#7f7f7f"
    ctx.fillRect(0, 0, size, size)
  } else {
    const g = ctx.createRadialGradient(size * 0.36, size * 0.3, 40, size / 2, size / 2, size * 0.62)
    g.addColorStop(0, "#FFF2BE")
    g.addColorStop(0.5, "#FFCB55")
    g.addColorStop(1, "#C47C12")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
  }
  ctx.strokeStyle = relief ? "#ffffff" : "rgba(122,74,6,0.5)"
  ctx.lineWidth = relief ? 18 : 8
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size * 0.41, 0, Math.PI * 2)
  ctx.stroke()
  ctx.fillStyle = relief ? "#ffffff" : "#8A5608"
  ctx.font = `700 ${size * 0.5}px ${DISPLAY_FONT}`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("£", size / 2, size / 2 + size * 0.03)
  const texture = new THREE.CanvasTexture(canvas)
  if (!relief) texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

function expenseTexture(card: ExpenseCard, fresh: boolean) {
  const w = 720
  const h = 300
  const canvas = document.createElement("canvas")
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")!
  roundedRect(ctx, 6, 6, w - 12, h - 12, 44)
  ctx.fillStyle = "rgba(7,44,41,0.94)"
  ctx.fill()
  ctx.lineWidth = fresh ? 6 : 3
  ctx.strokeStyle = fresh ? "#19E4CC" : "rgba(25,228,204,0.45)"
  ctx.stroke()
  ctx.fillStyle = "#FFFFFF"
  ctx.textBaseline = "alphabetic"
  ctx.font = `600 52px ${DISPLAY_FONT}`
  ctx.textAlign = "left"
  let label = card.label
  while (ctx.measureText(label).width > 370 && label.length > 3) label = `${label.slice(0, -2).trimEnd()}…`
  ctx.fillText(label, 44, 104)
  ctx.textAlign = "right"
  ctx.fillText(card.amount, w - 44, 104)
  ctx.textAlign = "left"
  ctx.font = `500 34px ${DISPLAY_FONT}`
  ctx.fillStyle = "#19E4CC"
  ctx.fillText(card.detail, 44, 214)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

function avatarTexture(letter: string, colour: THREE.Color) {
  const size = 256
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = size
  const ctx = canvas.getContext("2d")!
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size / 2 - 8, 0, Math.PI * 2)
  ctx.fillStyle = `#${colour.getHexString()}`
  ctx.fill()
  ctx.fillStyle = "#04201E"
  ctx.font = `700 118px ${DISPLAY_FONT}`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(letter, size / 2, size / 2 + 8)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function cardFaceTexture(name: string, tint: string, ink: string) {
  const w = 1024
  const h = 640
  const canvas = document.createElement("canvas")
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")!
  const g = ctx.createLinearGradient(0, 0, w, h)
  g.addColorStop(0, tint)
  g.addColorStop(1, "#04201E")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = "rgba(255,255,255,0.09)"
  ctx.lineWidth = 3
  for (let i = 1; i < 5; i++) {
    ctx.beginPath()
    ctx.ellipse(w * 0.84, h * 0.2, 150 * i, 62 * i, -0.3, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.fillStyle = "#FFC94F"
  ctx.beginPath()
  ctx.arc(w * 0.84, h * 0.2, 46, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = ink
  ctx.font = `600 76px ${DISPLAY_FONT}`
  ctx.fillText("PayaGo", 66, 128)
  ctx.font = `500 46px ${DISPLAY_FONT}`
  ctx.fillText(name, 66, h - 70)
  const chip = ctx.createLinearGradient(66, 280, 196, 370)
  chip.addColorStop(0, "#FFE9A6")
  chip.addColorStop(1, "#C78A1E")
  ctx.fillStyle = chip
  roundedRect(ctx, 66, 270, 132, 100, 18)
  ctx.fill()
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

const SKY_VERTEX = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 1.0, 1.0); }`
const SKY_FRAGMENT = `
precision mediump float;
varying vec2 vUv;
uniform float uTime; uniform float uDepth; uniform float uAspect;
float blob(vec2 p, vec2 c, float r){ float d = length((p-c)*vec2(uAspect,1.0)); return smoothstep(r, 0.0, d); }
void main(){
  vec2 p = vUv;
  vec3 ink = mix(vec3(0.012,0.09,0.085), vec3(0.018,0.05,0.09), uDepth);
  vec3 c = ink;
  float t = uTime*0.05;
  c += vec3(0.05,0.42,0.38) * blob(p, vec2(0.74+0.05*sin(t), 0.56+0.05*cos(t*0.8)), 0.86) * (0.52-0.2*uDepth);
  c += vec3(0.22,0.17,0.52) * blob(p, vec2(0.08+0.06*cos(t*0.7), 0.12+0.04*sin(t)), 0.8) * (0.4+0.3*uDepth);
  c += vec3(0.02,0.24,0.34) * blob(p, vec2(0.45+0.1*sin(t*0.5), 1.02), 0.7) * 0.38;
  gl_FragColor = vec4(c, 1.0);
}`

const MORPH_VERTEX = `
attribute vec3 aStart; attribute float aSeed;
uniform float uMorph; uniform float uTime; uniform float uSize; uniform float uSpin;
varying float vFacing; varying float vArrive;
void main(){
  float local = clamp((uMorph*1.5) - aSeed*0.5, 0.0, 1.0);
  float e = local*local*(3.0-2.0*local);
  vec3 swirl = aStart;
  float a = (1.0-e)*2.6 + uTime*0.06*(1.0-e);
  swirl = vec3(swirl.x*cos(a)-swirl.z*sin(a), swirl.y, swirl.x*sin(a)+swirl.z*cos(a));
  float c = cos(uSpin); float s = sin(uSpin);
  vec3 globe = vec3(position.x*c - position.z*s, position.y, position.x*s + position.z*c);
  vec3 p = mix(swirl, globe, e);
  p += normalize(p+0.001) * sin(e*3.14159) * 1.1 * (aSeed-0.3);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vec3 n = normalize(normalMatrix * normalize(p));
  vFacing = mix(1.0, smoothstep(-0.18, 0.5, dot(n, normalize(-mv.xyz))), e);
  vArrive = e;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.42 + 0.58*e) / -mv.z;
}`
const MORPH_FRAGMENT = `
precision mediump float;
uniform float uOpacity;
varying float vFacing; varying float vArrive;
void main(){
  float d = length(gl_PointCoord-0.5);
  if(d>0.5) discard;
  vec3 gold = vec3(1.0,0.79,0.31); vec3 teal = vec3(0.26,0.95,0.86);
  vec3 c = mix(gold, teal, vArrive);
  gl_FragColor = vec4(c, smoothstep(0.5,0.22,d) * vFacing * uOpacity);
}`
const HALO_VERTEX = `varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`
const HALO_FRAGMENT = `precision mediump float; varying vec3 vN; varying vec3 vV; uniform float uOpacity; void main(){ float f = pow(1.0-abs(dot(vN,vV)), 4.2); gl_FragColor = vec4(vec3(0.1,0.9,0.8), f*uOpacity); }`

type Key = { at: number; pos: [number, number, number]; look: [number, number, number] }

// The camera's route. On wide screens the subject sits right of centre, so the
// words have the left; on phones it sits above them.
const WIDE_ROUTE: Key[] = [
  { at: 0, pos: [-2.85, 0.5, 8.3], look: [-2.85, 0.05, 0] },
  { at: CHAPTERS.type[0] + 0.03, pos: [-3.05, 1.3, 8.4], look: [-3.05, 0, 0] },
  { at: CHAPTERS.type[1] - 0.02, pos: [-3.15, 1.5, 8.1], look: [-3.15, 0, 0] },
  { at: CHAPTERS.settle[0] + 0.03, pos: [-2.75, 0.1, 6.5], look: [-2.75, 0, 0] },
  { at: CHAPTERS.settle[1] - 0.01, pos: [-2.75, 0.05, 6.2], look: [-2.75, 0, 0] },
  { at: CHAPTERS.own[0] + 0.03, pos: [-2.5, 0.2, 6.5], look: [-2.5, 0, 0] },
  { at: CHAPTERS.own[1] - 0.01, pos: [-2.45, 0.15, 6.2], look: [-2.45, 0, 0] },
  { at: CHAPTERS.cards[0] + 0.03, pos: [-2.85, 0.2, 7], look: [-2.85, 0, 0] },
  { at: CHAPTERS.cards[1] - 0.01, pos: [-2.8, 0, 6.6], look: [-2.8, 0, 0] },
  { at: CHAPTERS.trips[0] + 0.07, pos: [-3.05, 0.3, 8.7], look: [-3.05, 0, 0] },
  { at: 1, pos: [-3.05, 0.15, 8.2], look: [-3.05, 0, 0] },
]
const NARROW_ROUTE: Key[] = [
  { at: 0, pos: [0, 0.4, 11.6], look: [0, -2.3, 0] },
  { at: CHAPTERS.type[0] + 0.03, pos: [0, 1.4, 15.5], look: [0, -3.4, 0] },
  { at: CHAPTERS.type[1] - 0.02, pos: [0, 1.6, 15.5], look: [0, -3.4, 0] },
  { at: CHAPTERS.settle[0] + 0.03, pos: [0, 0, 12.4], look: [0, -2.1, 0] },
  { at: CHAPTERS.settle[1] - 0.01, pos: [0, 0, 12], look: [0, -2.1, 0] },
  { at: CHAPTERS.own[0] + 0.03, pos: [0, 0.2, 14], look: [0, -2.9, 0] },
  { at: CHAPTERS.own[1] - 0.01, pos: [0, 0.2, 13.6], look: [0, -2.8, 0] },
  { at: CHAPTERS.cards[0] + 0.03, pos: [0, 0.2, 14.5], look: [0, -2.9, 0] },
  { at: CHAPTERS.cards[1] - 0.01, pos: [0, 0, 14], look: [0, -2.8, 0] },
  { at: CHAPTERS.trips[0] + 0.07, pos: [0, 0.2, 19], look: [0, -4.9, 0] },
  { at: 1, pos: [0, 0, 18], look: [0, -4.6, 0] },
]

export class MoneyUniverse {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200)
  private sky: THREE.ShaderMaterial
  private skyScene = new THREE.Scene()
  private skyCamera = new THREE.Camera()
  private clock = new THREE.Clock()
  private frame = 0
  private running = false
  private target = 0
  private progress = 0
  private lookNow = new THREE.Vector3()
  private route: Key[] = WIDE_ROUTE
  private readonly mobile: boolean
  private readonly still: boolean
  private glow = glowTexture()

  private coin = new THREE.Group()
  private coinMaterials: THREE.MeshStandardMaterial[] = []
  private system = new THREE.Group()
  private rings: { line: THREE.Object3D; material: THREE.Material & { opacity: number }; radius: number }[] = []
  private bodies: { sprites: THREE.Sprite[]; core: THREE.Mesh; phase: number; radius: number; speed: number }[] = []
  private expenses: { sprite: THREE.Mesh; angle: number; born: number; radius: number; height: number }[] = []
  private cardsGroup = new THREE.Group()
  private settle = new THREE.Group()
  private tangled: THREE.Mesh[] = []
  private clean: { line: THREE.Line; pulse: THREE.Sprite; from: THREE.Vector3; to: THREE.Vector3 }[] = []
  private people: THREE.Sprite[] = []
  private gauge: THREE.Mesh
  private gaugeTrack: THREE.Mesh
  private payCards = new THREE.Group()
  private payCardMeshes: { mesh: THREE.Mesh; from: THREE.Vector3; to: THREE.Vector3; turn: number }[] = []
  private morph: THREE.Points
  private morphMaterial: THREE.ShaderMaterial
  private halo: THREE.Mesh
  private haloMaterial: THREE.ShaderMaterial
  private flight = new THREE.Group()
  private arc?: THREE.Mesh
  private arcReveal = 1
  private arcTarget?: THREE.Vector3
  private pin?: THREE.Sprite
  private plane?: THREE.Sprite
  private arcCurve?: THREE.QuadraticBezierCurve3
  private globeSpin = 0
  private globeSpinTarget = 0

  constructor(canvas: HTMLCanvasElement, options: Options) {
    this.mobile = options.mobile
    this.still = options.still
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: !options.mobile, alpha: false, powerPreference: "high-performance" })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, options.mobile ? 1.5 : 2))
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.1
    this.renderer.autoClear = false

    const pmrem = new THREE.PMREMGenerator(this.renderer)
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.09).texture
    pmrem.dispose()

    this.sky = new THREE.ShaderMaterial({
      vertexShader: SKY_VERTEX,
      fragmentShader: SKY_FRAGMENT,
      depthTest: false,
      depthWrite: false,
      uniforms: { uTime: { value: 0 }, uDepth: { value: 0 }, uAspect: { value: 1 } },
    })
    this.skyScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.sky))

    const key = new THREE.DirectionalLight(0xfff1cf, 2.6)
    key.position.set(4, 6, 6)
    const rim = new THREE.DirectionalLight(0x19e4cc, 2.2)
    rim.position.set(-6, -2, -3)
    this.scene.add(key, rim, new THREE.AmbientLight(0x224d48, 0.7))

    this.buildStars()
    this.buildCoin()
    this.buildSystem()
    this.buildSettle()
    const gaugePath = new THREE.CatmullRomCurve3(
      Array.from({ length: 121 }, (_, i) => {
        const a = (i / 120) * Math.PI * 2
        return new THREE.Vector3(Math.sin(a) * 1.5, Math.cos(a) * 1.5, 0)
      }),
    )
    this.gaugeTrack = new THREE.Mesh(
      new THREE.TubeGeometry(gaugePath, 240, 0.012, 8),
      new THREE.MeshBasicMaterial({ color: 0x19e4cc, transparent: true, opacity: 0, toneMapped: false, depthTest: false }),
    )
    this.gauge = new THREE.Mesh(
      new THREE.TubeGeometry(gaugePath, 240, 0.034, 10),
      new THREE.MeshBasicMaterial({ color: 0x19e4cc, transparent: true, opacity: 0, toneMapped: false, depthTest: false }),
    )
    this.gaugeTrack.renderOrder = this.gauge.renderOrder = 2
    this.scene.add(this.gaugeTrack, this.gauge)
    this.buildPayCards()

    const { points, material } = this.buildMorph(options.landDots)
    this.morph = points
    this.morphMaterial = material
    this.haloMaterial = new THREE.ShaderMaterial({
      vertexShader: HALO_VERTEX,
      fragmentShader: HALO_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      uniforms: { uOpacity: { value: 0 } },
    })
    this.halo = new THREE.Mesh(new THREE.SphereGeometry(GLOBE_RADIUS * 1.07, 48, 48), this.haloMaterial)
    this.scene.add(this.morph, this.halo, this.flight)

    this.resize()
  }

  private buildStars() {
    const count = this.mobile ? 700 : 1800
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(18 + Math.random() * 60)
      positions.set([v.x, v.y, v.z], i * 3)
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    this.scene.add(
      new THREE.Points(
        geometry,
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.13, map: this.glow, transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending }),
      ),
    )
  }

  private buildCoin() {
    const edge = new THREE.MeshStandardMaterial({ color: 0xe8a93a, metalness: 1, roughness: 0.26, envMapIntensity: 1.2, transparent: true })
    const relief = coinFace(true)
    const face = () =>
      new THREE.MeshStandardMaterial({ map: coinFace(false), bumpMap: relief, bumpScale: 2.4, metalness: 0.92, roughness: 0.42, envMapIntensity: 1, transparent: true })
    const front = face()
    const back = face()
    this.coinMaterials = [edge, front, back]
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.16, 96, 1, true), edge)
    barrel.rotation.x = Math.PI / 2
    const frontDisc = new THREE.Mesh(new THREE.CircleGeometry(1, 96), front)
    frontDisc.position.z = 0.08
    const backDisc = new THREE.Mesh(new THREE.CircleGeometry(1, 96), back)
    backDisc.position.z = -0.08
    backDisc.rotation.y = Math.PI
    const body = new THREE.Group()
    body.add(barrel, frontDisc, backDisc)
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1, 0.05, 20, 128), edge)
    this.coin.add(body, rim)
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.glow, color: GOLD, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending }))
    halo.scale.setScalar(4.6)
    halo.name = "coin-halo"
    this.coin.add(halo)
    this.scene.add(this.coin)
  }

  private buildSystem() {
    this.system.rotation.set(1.18, 0, -0.22)
    this.scene.add(this.system)
    ;[{ radius: 2.1, live: true }, { radius: 3.15, live: false }, { radius: 4.3, live: false }].forEach(({ radius, live }, index) => {
      const points: THREE.Vector3[] = []
      for (let i = 0; i <= 240; i++) {
        const a = (i / 240) * Math.PI * 2
        points.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
      }
      if (live) {
        const material = new THREE.MeshBasicMaterial({ color: TEAL, transparent: true, opacity: 0.95, toneMapped: false })
        const line = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.009, 8, 240), material)
        this.system.add(line)
        this.rings.push({ line, material, radius })
      } else {
        const material = new THREE.LineDashedMaterial({ color: TEAL, transparent: true, opacity: 0.5, dashSize: 0.12, gapSize: 0.16, toneMapped: false })
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material)
        line.computeLineDistances()
        this.system.add(line)
        this.rings.push({ line, material, radius })
      }
      if (index === 0) {
        for (let b = 0; b < 4; b++) this.addBody(radius, b / 4, PEOPLE_COLOURS[b])
      }
    })
    this.scene.add(this.cardsGroup)
    this.addExpense({ label: "Dinner", amount: "£84.00", detail: "£21.00 each" }, false)
    this.addExpense({ label: "The flat", amount: "£420.00", detail: "£105.00 each" }, false)
    this.addExpense({ label: "Taxi", amount: "£18.50", detail: "£4.63 each" }, false)
  }

  private addBody(radius: number, phase: number, colour: THREE.Color) {
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.075, 24, 24), new THREE.MeshBasicMaterial({ color: colour, transparent: true, toneMapped: false }))
    this.system.add(core)
    const sprites: THREE.Sprite[] = []
    for (let i = 0; i < 12; i++) {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: this.glow, color: colour, transparent: true, opacity: i === 0 ? 0.8 : 0.34 * (1 - i / 12), depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }),
      )
      sprite.scale.setScalar(i === 0 ? 0.5 : 0.17 * (1 - i / 16))
      this.system.add(sprite)
      sprites.push(sprite)
    }
    this.bodies.push({ sprites, core, phase, radius, speed: 0.1 })
  }

  /** Adds a card to the orbit. New ones arrive from the coin, where you can see them. */
  addExpense(card: ExpenseCard, fresh = true) {
    const texture = expenseTexture(card, fresh)
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 0.625),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, opacity: 0, toneMapped: false }),
    )
    mesh.renderOrder = 4
    this.cardsGroup.add(mesh)
    const index = this.expenses.length
    this.expenses.push({
      sprite: mesh,
      angle: fresh ? 0.9 : (index / 3) * Math.PI * 2 + 0.4,
      born: fresh ? this.clock.getElapsedTime() : -10,
      radius: 2.75,
      height: (index % 3) * 0.14 - 0.14,
    })
    // Space them around the orbit, and keep the sky from filling up.
    if (this.expenses.length > 7) {
      const old = this.expenses.shift()!
      this.cardsGroup.remove(old.sprite)
      ;(old.sprite.material as THREE.MeshBasicMaterial).map?.dispose()
      ;(old.sprite.material as THREE.Material).dispose()
      old.sprite.geometry.dispose()
    }
    if (fresh) this.expenses.forEach((item, i) => {
      if (i !== this.expenses.length - 1) item.angle += 0.0
    })
    this.requestDraw()
  }

  private buildSettle() {
    const names = ["Y", "S", "P", "T", "A"]
    const places = [
      new THREE.Vector3(-0.85, 1.42, 0),
      new THREE.Vector3(1.25, 0.98, 0),
      new THREE.Vector3(1.62, -0.72, 0),
      new THREE.Vector3(-0.08, -1.5, 0),
      new THREE.Vector3(-1.68, -0.44, 0),
    ]
    places.forEach((place, i) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: avatarTexture(names[i], PEOPLE_COLOURS[i]), transparent: true, opacity: 0, depthWrite: false, depthTest: false, toneMapped: false }))
      sprite.scale.setScalar(0.46)
      sprite.position.copy(place)
      sprite.renderOrder = 6
      this.people.push(sprite)
      this.settle.add(sprite)
    })
    const curve = (a: THREE.Vector3, b: THREE.Vector3, bend: number) => {
      const mid = a.clone().add(b).multiplyScalar(0.5)
      const n = new THREE.Vector3(-(b.y - a.y), b.x - a.x, 0).normalize().multiplyScalar(bend)
      return new THREE.QuadraticBezierCurve3(a, mid.add(n), b)
    }
    const tangle: [number, number, number][] = [
      [0, 2, 0.35],
      [1, 3, -0.4],
      [2, 4, 0.3],
      [3, 0, -0.3],
      [4, 1, 0.45],
      [0, 3, 0.6],
    ]
    tangle.forEach(([a, b, bend], i) => {
      const material = new THREE.MeshBasicMaterial({ color: PEOPLE_COLOURS[i % PEOPLE_COLOURS.length], transparent: true, opacity: 0, toneMapped: false })
      const line = new THREE.Mesh(new THREE.TubeGeometry(curve(places[a], places[b], bend), 48, 0.008, 6), material)
      this.tangled.push(line)
      this.settle.add(line)
    })
    const payments: [number, number][] = [
      [4, 1],
      [3, 2],
    ]
    payments.forEach(([a, b]) => {
      const tube = new THREE.TubeGeometry(curve(places[a], places[b], 0.12), 40, 0.016, 8)
      const line = new THREE.Mesh(tube, new THREE.MeshBasicMaterial({ color: TEAL, transparent: true, opacity: 0, toneMapped: false })) as unknown as THREE.Line
      const pulse = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.glow, color: 0xffffff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }))
      pulse.scale.setScalar(0.42)
      pulse.renderOrder = 5
      this.clean.push({ line, pulse, from: places[a], to: places[b] })
      this.settle.add(line, pulse)
    })
    this.scene.add(this.settle)
  }

  private buildPayCards() {
    const shape = new THREE.Shape()
    const w = 2.3
    const h = 1.44
    const r = 0.11
    shape.moveTo(-w / 2 + r, -h / 2)
    shape.lineTo(w / 2 - r, -h / 2)
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
    shape.lineTo(w / 2, h / 2 - r)
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2)
    shape.lineTo(-w / 2 + r, h / 2)
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r)
    shape.lineTo(-w / 2, -h / 2 + r)
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)
    const body = new THREE.ExtrudeGeometry(shape, { depth: 0.03, bevelEnabled: false, curveSegments: 12 })
    body.translate(0, 0, -0.015)
    const faceGeometry = new THREE.ShapeGeometry(shape, 12)
    const uv = faceGeometry.attributes.uv as THREE.BufferAttribute
    const position = faceGeometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < uv.count; i++) uv.setXY(i, position.getX(i) / w + 0.5, position.getY(i) / h + 0.5)
    const cards = [
      { name: "Sam", tint: "#5A50E8", to: new THREE.Vector3(-0.85, 0.72, -0.6), turn: 0.26 },
      { name: "Priya", tint: "#0B7A71", to: new THREE.Vector3(0.85, -0.62, -0.3), turn: -0.2 },
      { name: "You", tint: "#A9700E", to: new THREE.Vector3(0, 0, 0.3), turn: 0.04 },
    ]
    cards.forEach((card, i) => {
      const group = new THREE.Mesh(
        body,
        new THREE.MeshStandardMaterial({ color: new THREE.Color(card.tint).multiplyScalar(0.55), metalness: 0.85, roughness: 0.3, transparent: true, opacity: 0 }),
      )
      const face = new THREE.Mesh(faceGeometry, new THREE.MeshBasicMaterial({ map: cardFaceTexture(card.name, card.tint, "#FFFFFF"), transparent: true, opacity: 0, toneMapped: false }))
      face.position.z = 0.017
      group.add(face)
      group.renderOrder = 3 + i
      this.payCards.add(group)
      this.payCardMeshes.push({ mesh: group, from: new THREE.Vector3(0, 0, -3), to: card.to, turn: card.turn })
    })
    this.scene.add(this.payCards)
  }

  private buildMorph(dots: Float32Array) {
    const stride = this.mobile ? 2 : 1
    const count = Math.floor(dots.length / 2 / stride)
    const positions = new Float32Array(count * 3)
    const starts = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const v = latLng(dots[i * 2 * stride], dots[i * 2 * stride + 1], GLOBE_RADIUS)
      positions.set([v.x, v.y, v.z], i * 3)
      // Every dot starts on the coin's face, and leaves it to become the Earth.
      const a = Math.random() * Math.PI * 2
      const r = Math.sqrt(Math.random())
      starts.set([Math.cos(a) * r, Math.sin(a) * r, (Math.random() - 0.5) * 0.1], i * 3)
      seeds[i] = Math.random()
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("aStart", new THREE.BufferAttribute(starts, 3))
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1))
    const material = new THREE.ShaderMaterial({
      vertexShader: MORPH_VERTEX,
      fragmentShader: MORPH_FRAGMENT,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uMorph: { value: 0 },
        uTime: { value: 0 },
        uOpacity: { value: 0 },
        uSpin: { value: 0 },
        uSize: { value: (this.mobile ? 62 : 46) * this.renderer.getPixelRatio() },
      },
    })
    const points = new THREE.Points(geometry, material)
    points.frustumCulled = false
    points.visible = false
    return { points, material }
  }

  /** Draws a flight from London to here, and turns the world so you can see it. */
  flyTo(lat: number, lng: number) {
    this.flight.clear()
    const from = latLng(HOME.lat, HOME.lng, GLOBE_RADIUS * 1.005)
    const to = latLng(lat, lng, GLOBE_RADIUS * 1.005)
    const lift = 1 + from.angleTo(to) * 0.28
    const mid = from.clone().add(to).normalize().multiplyScalar(GLOBE_RADIUS * lift)
    this.arcCurve = new THREE.QuadraticBezierCurve3(from, mid, to)
    this.arc = new THREE.Mesh(
      new THREE.TubeGeometry(this.arcCurve, 96, 0.016, 8),
      new THREE.MeshBasicMaterial({ color: GOLD }),
    )
    this.arc.renderOrder = 8
    this.arcReveal = 0
    this.arcTarget = to
    const dot = (position: THREE.Vector3, colour: THREE.Color, size: number) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.glow, color: colour, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
      sprite.position.copy(position)
      sprite.scale.setScalar(size)
      sprite.renderOrder = 9
      this.flight.add(sprite)
      return sprite
    }
    dot(from, TEAL, 0.26)
    this.pin = dot(to, GOLD, 0.01)
    this.plane = dot(from, new THREE.Color(0xffffff), 0.3)
    this.flight.add(this.arc)
    // Turn the globe so the middle of the journey faces the viewer.
    const midLng = Math.atan2(mid.x, mid.z)
    // The shortest way round, so it never spins the long way.
    const turn = Math.atan2(Math.sin(midLng - this.globeSpinTarget), Math.cos(midLng - this.globeSpinTarget))
    this.globeSpinTarget += turn
    this.requestDraw()
  }

  setProgress(p: number) {
    this.target = clamp01(p)
    this.requestDraw()
  }

  resize() {
    const canvas = this.renderer.domElement
    const parent = canvas.parentElement
    if (!parent) return
    const width = parent.clientWidth
    const height = parent.clientHeight
    this.renderer.setSize(width, height, false)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.sky.uniforms.uAspect.value = width / height
    this.route = width / height >= 1.05 ? WIDE_ROUTE : NARROW_ROUTE
    this.requestDraw()
  }

  start() {
    if (this.running) return
    this.running = true
    this.loop()
  }

  stop() {
    this.running = false
    cancelAnimationFrame(this.frame)
  }

  dispose() {
    this.stop()
    this.renderer.dispose()
  }

  private requestDraw() {
    if (!this.running && this.still) this.draw(true)
  }

  private loop = () => {
    if (!this.running) return
    this.draw(false)
    this.frame = requestAnimationFrame(this.loop)
  }

  private cameraAt(p: number) {
    const route = this.route
    let i = 0
    while (i < route.length - 2 && p > route[i + 1].at) i++
    const a = route[i]
    const b = route[i + 1]
    const t = smooth((p - a.at) / (b.at - a.at))
    return {
      pos: new THREE.Vector3(...a.pos).lerp(new THREE.Vector3(...b.pos), t),
      look: new THREE.Vector3(...a.look).lerp(new THREE.Vector3(...b.look), t),
    }
  }

  private draw(immediate: boolean) {
    const time = this.still ? 8 : this.clock.getElapsedTime()
    this.progress = immediate ? this.target : this.progress + (this.target - this.progress) * 0.09
    const p = this.progress
    const wide = this.route === WIDE_ROUTE
    const offset = wide ? -1.7 : -1.45 // the subject's place in the frame

    const { pos, look } = this.cameraAt(p)
    this.camera.position.copy(pos)
    this.lookNow.lerp(look, immediate || this.lookNow.lengthSq() === 0 ? 1 : 0.12)
    this.camera.lookAt(this.lookNow)

    // Where the system sits. On wide screens it moves right of the words.
    const anchor = wide ? new THREE.Vector3(offset + 3.6 - 3.6, 0, 0) : new THREE.Vector3(0, 0, 0)
    const inTrips = between(p, CHAPTERS.trips[0] - 0.02, CHAPTERS.trips[0] + 0.08)
    const settleIn = between(p, CHAPTERS.settle[0] - 0.015, CHAPTERS.settle[0] + 0.035) * (1 - between(p, CHAPTERS.settle[1] - 0.025, CHAPTERS.settle[1] + 0.005))
    const untangle = between(p, CHAPTERS.settle[0] + 0.05, CHAPTERS.settle[1] - 0.05)
    const ownIn = between(p, CHAPTERS.own[0] - 0.01, CHAPTERS.own[0] + 0.03) * (1 - between(p, CHAPTERS.own[1] - 0.02, CHAPTERS.own[1] + 0.005))
    const cardIn = between(p, CHAPTERS.cards[0] - 0.005, CHAPTERS.cards[0] + 0.05) * (1 - between(p, CHAPTERS.cards[1] - 0.015, CHAPTERS.cards[1] + 0.01))
    const typeIn = between(p, CHAPTERS.type[0] - 0.02, CHAPTERS.type[0] + 0.03) * (1 - between(p, CHAPTERS.type[1] - 0.025, CHAPTERS.type[1] + 0.005))

    // Coin: at home until the journey reaches the Earth, when it gives way to its dots.
    const coinGone = between(p, CHAPTERS.trips[0] - 0.015, CHAPTERS.trips[0] + 0.015)
    const coinHide = Math.min(1, settleIn * 1.2 + cardIn * 1.2)
    const coinScale = (1 - coinGone * 0.3) * (1 - coinHide * 0.6)
    this.coin.position.copy(anchor).setX(anchor.x)
    this.coin.scale.setScalar(coinScale * (this.still ? 1 : 1 + 0.008 * Math.sin(time * 0.9)))
    this.coin.rotation.set(0.08 + Math.sin(time * 0.3) * 0.04, -0.28 + Math.sin(time * 0.24) * 0.26, 0)
    this.coin.visible = coinGone < 0.995 && coinHide < 0.99
    const coinOpacity = (1 - coinGone) * (1 - coinHide)
    this.coinMaterials.forEach((m) => (m.opacity = coinOpacity))
    const haloSprite = this.coin.getObjectByName("coin-halo") as THREE.Sprite
    ;(haloSprite.material as THREE.SpriteMaterial).opacity = 0.22 * coinOpacity

    // Rings fade to quiet when another subject is on stage.
    this.system.position.copy(anchor)
    const quiet = 1 - Math.max(settleIn, cardIn * 0.85, inTrips, ownIn * 0.55)
    this.rings.forEach((ring, i) => {
      const base = i === 0 ? 0.95 : 0.5
      ring.material.opacity = base * quiet
      ring.line.visible = quiet > 0.01
    })
    this.bodies.forEach((body) => {
      const a = (this.still ? 0.5 : time * body.speed) * Math.PI * 2 + body.phase * Math.PI * 2
      const place = (angle: number) => new THREE.Vector3(Math.cos(angle) * body.radius, Math.sin(angle) * body.radius, 0)
      body.core.position.copy(place(a))
      ;(body.core.material as THREE.MeshBasicMaterial).opacity = quiet
      body.core.visible = quiet > 0.01
      body.sprites.forEach((sprite, i) => {
        sprite.position.copy(place(a - i * 0.05))
        sprite.visible = quiet > 0.01
        const m = sprite.material as THREE.SpriteMaterial
        m.opacity = (i === 0 ? 0.8 : 0.34 * (1 - i / 12)) * quiet
      })
    })

    // Expense cards orbit, always facing you, and only in their chapter.
    this.cardsGroup.position.copy(anchor)
    this.cardsGroup.visible = typeIn > 0.01
    this.expenses.forEach((item, i) => {
      const age = time - item.born
      const pop = this.still ? 1 : smooth(age / 0.9)
      const a = item.angle + (this.still ? 0 : time * 0.12) + (i * Math.PI * 2) / Math.max(this.expenses.length, 3) * 0
      const radius = item.radius * pop
      const x = Math.cos(a) * radius
      const z = Math.sin(a) * radius * 0.62
      item.sprite.position.set(x, item.height + Math.sin(a) * -0.55 + (this.still ? 0 : Math.sin(time + i) * 0.03), z)
      item.sprite.quaternion.copy(this.camera.quaternion)
      const depth = 0.82 + 0.18 * ((z / (radius * 0.62 || 1) + 1) / 2)
      const fade = (this.mobile ? 0.86 : 1) * pop
      item.sprite.scale.setScalar(depth * fade * (this.mobile ? 0.95 : 1))
      // On wide screens a card fades as it passes behind the words.
      const clear = wide ? smooth((x + 3) / 1.6) : 1
      ;(item.sprite.material as THREE.MeshBasicMaterial).opacity = typeIn * (0.55 + 0.45 * depth) * clear
    })

    // Debts: six tangled lines give way to two payments.
    this.settle.position.copy(anchor)
    this.settle.visible = settleIn > 0.01
    this.settle.quaternion.copy(this.camera.quaternion)
    this.people.forEach((person) => ((person.material as THREE.SpriteMaterial).opacity = settleIn))
    this.tangled.forEach((line) => (((line.material as THREE.MeshBasicMaterial).opacity = settleIn * (1 - untangle) * 0.9), (line.visible = untangle < 0.99)))
    this.clean.forEach((payment, i) => {
      ;((payment.line as unknown as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = settleIn * untangle
      const t = this.still ? 0.6 : (time * 0.35 + i * 0.5) % 1
      payment.pulse.position.lerpVectors(payment.from, payment.to, t)
      ;(payment.pulse.material as THREE.SpriteMaterial).opacity = settleIn * untangle
    })

    // Your own money: the budget, as a ring closing around the coin.
    const fill = 0.62 * between(p, CHAPTERS.own[0] + 0.005, CHAPTERS.own[0] + 0.07)
    this.gauge.position.copy(anchor)
    this.gaugeTrack.position.copy(anchor)
    this.gauge.geometry.setDrawRange(0, Math.floor((this.gauge.geometry.index?.count ?? 0) * fill))
    ;(this.gauge.material as THREE.MeshBasicMaterial).opacity = ownIn
    ;(this.gaugeTrack.material as THREE.MeshBasicMaterial).opacity = ownIn * 0.3
    this.gauge.visible = this.gaugeTrack.visible = ownIn > 0.01
    this.gauge.quaternion.copy(this.camera.quaternion)
    this.gaugeTrack.quaternion.copy(this.camera.quaternion)

    // Cards fly out from behind the coin and settle into a fan.
    this.payCards.position.copy(anchor)
    this.payCards.visible = cardIn > 0.01
    this.payCardMeshes.forEach(({ mesh, from, to, turn }, i) => {
      const local = clamp01(cardIn * 1.5 - i * 0.2)
      mesh.position.lerpVectors(from, to, smooth(local))
      mesh.rotation.set(
        -0.18 + (this.still ? 0 : Math.sin(time * 0.6 + i) * 0.035),
        (1 - smooth(local)) * 1.9 + 0.22 + (this.still ? 0 : Math.sin(time * 0.45 + i) * 0.05),
        turn,
      )
      const material = mesh.material as THREE.MeshStandardMaterial
      material.opacity = local
      const face = mesh.children[0] as THREE.Mesh
      ;(face.material as THREE.MeshBasicMaterial).opacity = local
    })

    // The coin comes apart, and its dots become the Earth.
    const morph = between(p, CHAPTERS.trips[0] - 0.015, CHAPTERS.trips[0] + 0.1)
    this.morph.visible = morph > 0.001
    this.morph.position.copy(anchor)
    this.morphMaterial.uniforms.uMorph.value = morph
    this.morphMaterial.uniforms.uOpacity.value = clamp01(morph * 6)
    this.morphMaterial.uniforms.uTime.value = time
    this.globeSpin += (this.globeSpinTarget - this.globeSpin) * (immediate ? 1 : 0.04)
    const spin = this.globeSpin
    this.morphMaterial.uniforms.uSpin.value = spin
    this.halo.position.copy(anchor)
    this.haloMaterial.uniforms.uOpacity.value = smooth((morph - 0.7) / 0.3) * 0.7
    this.halo.visible = morph > 0.7

    this.flight.position.copy(anchor)
    this.flight.rotation.y = -spin
    this.flight.visible = morph > 0.98
    if (this.arc && this.arcCurve && this.flight.visible) {
      this.arcReveal = immediate ? 1 : Math.min(1, this.arcReveal + 0.011)
      const reveal = smooth(this.arcReveal)
      const index = this.arc.geometry.index
      if (index) this.arc.geometry.setDrawRange(0, Math.floor(index.count * reveal))
      this.plane?.position.copy(this.arcCurve.getPoint(reveal))
      if (this.pin) this.pin.scale.setScalar(smooth((this.arcReveal - 0.85) / 0.15) * (0.42 + (this.still ? 0 : Math.sin(time * 3) * 0.05)))
    }

    this.sky.uniforms.uTime.value = time
    this.sky.uniforms.uDepth.value = inTrips
    this.renderer.clear()
    this.renderer.render(this.skyScene, this.skyCamera)
    this.renderer.clearDepth()
    this.renderer.render(this.scene, this.camera)
  }
}
