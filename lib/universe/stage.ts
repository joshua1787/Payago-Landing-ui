import * as THREE from "three"

import type { LocalMoney } from "@/lib/local-money"

import { smooth } from "./chapters"

const PAPER_INK = "#0F172A"
const PAPER_SOFT = "#64748B"
const BRAND = "#3B6BF0"
const VIOLET = "#7C5CFF"
const FONT = '"Outfit Variable", "Helvetica Neue", Arial, sans-serif'

type World = "money" | "trips"
type SwarmSeed = { dir: THREE.Vector3; reach: number; z: number; size: number; spin: THREE.Vector3; seed: number }

type Floater = {
  object: THREE.Object3D
  home: THREE.Vector3
  size: number
  spin: THREE.Vector3
  turn: THREE.Euler
  seed: number
  world: World
  /** Paper has one printed side, so it sways rather than turns. */
  sways: boolean
}

function canvasTexture(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  if (ctx) draw(ctx)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

/** A till receipt with a torn bottom edge. */
function receiptTexture(title: string, amount: string, each: string) {
  return canvasTexture(360, 560, (ctx) => {
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(360, 0)
    ctx.lineTo(360, 530)
    for (let x = 360; x > 0; x -= 30) {
      ctx.lineTo(x - 15, 556)
      ctx.lineTo(x - 30, 530)
    }
    ctx.closePath()
    ctx.fillStyle = "#FFFFFF"
    ctx.fill()
    ctx.fillStyle = PAPER_INK
    ctx.font = `700 40px ${FONT}`
    ctx.fillText(title, 32, 76)
    ctx.fillStyle = "#E2E8F0"
    for (let y = 120; y < 330; y += 42) ctx.fillRect(32, y, y % 84 === 36 ? 296 : 210, 12)
    ctx.fillStyle = PAPER_SOFT
    ctx.font = `500 28px ${FONT}`
    ctx.fillText("Total", 32, 400)
    ctx.fillStyle = PAPER_INK
    ctx.font = `700 54px ${FONT}`
    ctx.fillText(amount, 32, 458)
    ctx.fillStyle = BRAND
    ctx.font = `600 28px ${FONT}`
    ctx.fillText(each, 32, 504)
  })
}

function boardingPassTexture(from: string, to: string, seat: string) {
  return canvasTexture(640, 280, (ctx) => {
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, 640, 280)
    const band = ctx.createLinearGradient(0, 0, 640, 0)
    band.addColorStop(0, BRAND)
    band.addColorStop(1, VIOLET)
    ctx.fillStyle = band
    ctx.fillRect(0, 0, 640, 72)
    ctx.fillStyle = "#FFFFFF"
    ctx.font = `700 34px ${FONT}`
    ctx.fillText("PayaGo", 28, 48)
    ctx.fillStyle = PAPER_INK
    ctx.font = `700 76px ${FONT}`
    ctx.fillText(from, 28, 172)
    ctx.fillText(to, 268, 172)
    ctx.strokeStyle = "#94A3B8"
    ctx.lineWidth = 4
    ctx.setLineDash([10, 10])
    ctx.beginPath()
    ctx.moveTo(196, 148)
    ctx.lineTo(258, 148)
    ctx.stroke()
    ctx.moveTo(492, 72)
    ctx.lineTo(492, 280)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = PAPER_SOFT
    ctx.font = `500 28px ${FONT}`
    ctx.fillText(`Seat ${seat}`, 28, 240)
    ctx.fillStyle = PAPER_INK
    for (let i = 0; i < 16; i++) ctx.fillRect(516 + i * 6, 112, i % 3 === 0 ? 4 : 2, 128)
  })
}

/** Out-of-focus gold, for the objects nearest the lens. */
function bokehTexture() {
  return canvasTexture(128, 128, (ctx) => {
    const fill = ctx.createRadialGradient(64, 64, 34, 64, 64, 62)
    fill.addColorStop(0, "rgba(246,200,96,0.95)")
    fill.addColorStop(0.72, "rgba(226,170,60,0.82)")
    fill.addColorStop(1, "rgba(226,170,60,0)")
    ctx.fillStyle = fill
    ctx.fillRect(0, 0, 128, 128)
  })
}

type RibbonShape = (t: number, time: number, centre: THREE.Vector3) => number

/** Two bands of foil. The tight one stays under the coin in front and over it behind, so the symbol stays clear. */
const TIGHT_RIBBON: RibbonShape = (t, time, centre) => {
  const a = t * 2.1 * Math.PI * 2 - 2.3
  const radius = 1.6 + 0.55 * Math.sin(t * Math.PI) + 0.08 * Math.sin(a * 2.3 + time * 0.7)
  centre.set(Math.cos(a) * radius, -Math.sin(a) * (1.12 + 0.28 * t) + 0.1 * Math.sin(a * 1.7 - time * 1.1) + 0.1, Math.sin(a) * radius * 0.6)
  return 0.17 * Math.sin(Math.PI * Math.min(1, t * 1.02)) ** 0.35
}
/** The sweep reaches far out to the right, and keeps left of nothing but the words' edge. */
const SWEEP_RIBBON: RibbonShape = (t, time, centre) => {
  const a = t * 1.42 * Math.PI * 2 + 0.55
  centre.set(Math.cos(a) * 3 + 0.85, -Math.sin(a) * 2.2 + 0.3 * Math.sin(a * 2.1 + time * 0.6) - 0.05, Math.sin(a) * 2.1)
  return 0.3 * Math.sin(Math.PI * t) ** 0.5
}

function ribbonGeometry(segments: number) {
  const geometry = new THREE.BufferGeometry()
  const count = (segments + 1) * 2
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3))
  const indices: number[] = []
  for (let i = 0; i < segments; i++) {
    const n = i * 2
    indices.push(n, n + 1, n + 2, n + 1, n + 3, n + 2)
  }
  geometry.setIndex(indices)
  return geometry
}

const flowCentre = new THREE.Vector3()
const flowAcross = new THREE.Vector3()
function flowRibbon(geometry: THREE.BufferGeometry, shape: RibbonShape, time: number) {
  const place = geometry.attributes.position as THREE.BufferAttribute
  const segments = place.count / 2 - 1
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const width = shape(t, time, flowCentre)
    const a = Math.atan2(flowCentre.z, flowCentre.x)
    const twist = t * 7 + Math.sin(t * 9 + time * 0.8) * 0.5
    flowAcross.set(Math.cos(a) * Math.cos(twist), Math.sin(twist), Math.sin(a) * Math.cos(twist)).multiplyScalar(width)
    place.setXYZ(i * 2, flowCentre.x + flowAcross.x, flowCentre.y + flowAcross.y, flowCentre.z + flowAcross.z)
    place.setXYZ(i * 2 + 1, flowCentre.x - flowAcross.x, flowCentre.y - flowAcross.y, flowCentre.z - flowAcross.z)
  }
  place.needsUpdate = true
  geometry.computeVertexNormals()
}

function glintTexture() {
  return canvasTexture(128, 128, (ctx) => {
    ctx.translate(64, 64)
    const beam = ctx.createRadialGradient(0, 0, 0, 0, 0, 62)
    beam.addColorStop(0, "rgba(255,255,255,1)")
    beam.addColorStop(0.3, "rgba(255,240,190,0.75)")
    beam.addColorStop(1, "rgba(255,220,130,0)")
    ctx.fillStyle = beam
    for (let i = 0; i < 2; i++) {
      ctx.rotate(Math.PI / 2)
      ctx.beginPath()
      ctx.moveTo(-62, 0)
      ctx.quadraticCurveTo(0, -5, 62, 0)
      ctx.quadraticCurveTo(0, 5, -62, 0)
      ctx.fill()
    }
    ctx.beginPath()
    ctx.arc(0, 0, 10, 0, Math.PI * 2)
    ctx.fill()
  })
}

/** A paper dart: two folded wings meeting at a notched tail, nose along +x. */
function paperPlaneGeometry() {
  const nose = [1, 0, 0]
  const notch = [-0.5, 0, 0]
  const left = [-1, 0.24, 0.8]
  const right = [-1, 0.24, -0.8]
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.Float32BufferAttribute([...nose, ...left, ...notch, ...nose, ...notch, ...right], 3))
  geometry.computeVertexNormals()
  return geometry
}

function hotelKeyTexture(name: string, room: string) {
  return canvasTexture(520, 320, (ctx) => {
    const fill = ctx.createLinearGradient(0, 0, 520, 320)
    fill.addColorStop(0, "#1E1B4B")
    fill.addColorStop(1, VIOLET)
    ctx.fillStyle = fill
    ctx.fillRect(0, 0, 520, 320)
    ctx.fillStyle = "#FFD27A"
    ctx.font = `700 46px ${FONT}`
    ctx.fillText(name, 32, 84)
    ctx.fillStyle = "#FFFFFF"
    ctx.font = `600 34px ${FONT}`
    ctx.fillText(room, 32, 136)
    ctx.fillStyle = "rgba(255,255,255,0.22)"
    ctx.fillRect(0, 214, 520, 54)
  })
}

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-9 * t))

/**
 * The showroom around the coin: a stand under it, a foil ribbon through it, and
 * real objects in the air at different distances. Money objects on the way down
 * the page, then travel objects once the journey reaches the Earth.
 */
export class HeroStage {
  readonly group = new THREE.Group()
  private ribbons: { mesh: THREE.Mesh; shape: RibbonShape; count: number; worlds: World[] }[] = []
  private swarms: { mesh: THREE.InstancedMesh; seeds: SwarmSeed[]; world: World }[] = []
  private ring: THREE.Mesh
  private flash: THREE.Sprite
  private sweepLight = new THREE.PointLight(0xfff2c8, 40, 14)
  private glints: { sprite: THREE.Sprite; shape: RibbonShape; at: number; seed: number }[] = []
  private burstAt = -1
  private firedAt: Record<World, number> = { trips: -1, money: -1 }
  /** How hard the coin is hitting right now, 0 to 1. The scene shakes the camera with it. */
  impact = 0
  private stand = new THREE.Group()
  private floaters: Floater[] = []
  private bokeh: { sprite: THREE.Sprite; home: THREE.Vector3; size: number; seed: number }[] = []

  constructor(
    private readonly options: { mobile: boolean; still: boolean; money: LocalMoney; coinFace: THREE.Texture; glow: THREE.Texture },
  ) {
    const gold = new THREE.MeshPhysicalMaterial({ color: 0xf0b73e, metalness: 1, roughness: 0.16, clearcoat: 0.8, clearcoatRoughness: 0.2, iridescence: 0.35, iridescenceIOR: 1.6, envMapIntensity: 1.7, side: THREE.DoubleSide })
    const segments = options.mobile ? 180 : 360
    ;([[TIGHT_RIBBON, ["money"]], [SWEEP_RIBBON, ["money", "trips"]]] as [RibbonShape, World[]][]).forEach(([shape, worlds]) => {
      const geometry = ribbonGeometry(segments)
      flowRibbon(geometry, shape, 0)
      const mesh = new THREE.Mesh(geometry, gold)
      mesh.frustumCulled = false
      this.group.add(mesh)
      this.ribbons.push({ mesh, shape, count: geometry.index?.count ?? 0, worlds })
    })

    const glintMap = glintTexture()
    ;[[SWEEP_RIBBON, 0.3], [SWEEP_RIBBON, 0.62], [SWEEP_RIBBON, 0.84], [TIGHT_RIBBON, 0.28], [TIGHT_RIBBON, 0.55], [TIGHT_RIBBON, 0.8]].forEach(([shape, at], i) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: glintMap, transparent: true, depthWrite: false, depthTest: false, toneMapped: false }))
      sprite.renderOrder = 4
      this.group.add(sprite)
      this.glints.push({ sprite, shape: shape as RibbonShape, at: at as number, seed: i * 1.9 })
    })

    // Hundreds of coins burst from the coin; a flock of paper planes bursts from the Earth.
    this.addSwarm(
      "money",
      new THREE.CylinderGeometry(1, 1, 0.16, 24),
      new THREE.MeshStandardMaterial({ color: 0xf2bb48, emissive: 0x6a4300, emissiveIntensity: 0.55, metalness: 0.85, roughness: 0.32, envMapIntensity: 1.3 }),
      options.mobile ? 80 : 170,
    )
    const planes = this.addSwarm("trips", paperPlaneGeometry(), new THREE.MeshStandardMaterial({ roughness: 0.55, side: THREE.DoubleSide, envMapIntensity: 0.9 }), options.mobile ? 55 : 130)
    const paints = [0xffffff, 0xffffff, 0xffffff, 0xffd27a, 0x7c5cff, 0x3b6bf0].map((c) => new THREE.Color(c))
    for (let i = 0; i < planes.count; i++) planes.setColorAt(i, paints[i % paints.length])

    this.ring = new THREE.Mesh(new THREE.TorusGeometry(1, 0.035, 12, 160), new THREE.MeshBasicMaterial({ color: 0xf6c860, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }))
    this.ring.rotation.x = Math.PI / 2 - 0.22
    this.ring.position.y = -1.05
    this.flash = new THREE.Sprite(new THREE.SpriteMaterial({ map: options.glow, color: 0xffe9a8, transparent: true, opacity: 0, depthWrite: false, depthTest: false, toneMapped: false }))
    this.flash.renderOrder = 3
    this.flash.scale.setScalar(9)
    this.group.add(this.ring, this.flash, this.sweepLight)

    this.buildStand(gold)
    this.buildMoney()
    this.buildTrips()
  }

  private addSwarm(world: World, geometry: THREE.BufferGeometry, material: THREE.Material, count: number) {
    const mobile = this.options.mobile
    const mesh = new THREE.InstancedMesh(geometry, material, count)
    mesh.frustumCulled = false
    const random = (i: number) => Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1)
    const seeds: SwarmSeed[] = []
    for (let i = 0; i < count; i++) {
      const a = random(i * 3 + 1) * Math.PI * 2
      let x = Math.cos(a)
      const y = Math.sin(a) * (mobile ? 0.8 : 0.72)
      // Most fly right, so the words on the left stay clear.
      if (!mobile && x < 0) x *= 0.42
      seeds.push({
        dir: new THREE.Vector3(x, y, 0),
        reach: (world === "trips" ? 2.4 : 1.5) + random(i * 3 + 2) ** 1.5 * (mobile ? 3.2 : 6.2),
        z: -5 + random(i * 3 + 3) * 10.5,
        size: world === "trips" ? 0.07 + random(i * 7 + 4) ** 2 * 0.2 : 0.03 + random(i * 7 + 4) ** 2 * 0.11,
        spin: new THREE.Vector3(random(i + 5) * 2 - 1, random(i + 6) * 2 - 1, random(i + 7) * 2 - 1),
        seed: random(i + 8) * 10,
      })
    }
    this.group.add(mesh)
    this.swarms.push({ mesh, seeds, world })
    return mesh
  }

  /** A subject lands. Everything else on the stage comes out of this moment. Each world bursts once. */
  fire(world: World, time: number) {
    if (this.firedAt[world] >= 0) return
    this.firedAt[world] = time
    this.burstAt = time
  }

  private buildStand(gold: THREE.Material) {
    const stone = new THREE.MeshPhysicalMaterial({ color: 0x4f3fe0, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1 })
    const top = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.25, 0.16, 96), stone)
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.62, 1.7, 0.2, 96), stone)
    base.position.y = -0.18
    const trim = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.016, 12, 128), gold)
    trim.rotation.x = Math.PI / 2
    trim.position.y = 0.08
    const light = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.options.glow, color: 0xf6c860, transparent: true, opacity: 0.55, depthWrite: false }))
    light.scale.set(2.6, 0.55, 1)
    light.position.y = 0.13
    this.stand.add(top, base, trim, light)
    this.group.add(this.stand)
  }

  private add(object: THREE.Object3D, home: [number, number, number], size: number, seed: number, world: Floater["world"]) {
    this.group.add(object)
    this.floaters.push({
      object,
      home: new THREE.Vector3(...home),
      size,
      seed,
      world,
      sways: object instanceof THREE.Mesh && (object.material as THREE.MeshStandardMaterial).alphaTest > 0,
      turn: new THREE.Euler(seed * 1.7, seed * 2.9, seed * 0.8),
      spin: new THREE.Vector3(0.16 + (seed % 0.3), 0.26 + (seed % 0.4), 0.08),
    })
  }

  private miniCoin() {
    const edge = new THREE.MeshStandardMaterial({ color: 0xe8a93a, metalness: 1, roughness: 0.24, envMapIntensity: 1.3 })
    const face = new THREE.MeshStandardMaterial({ map: this.options.coinFace, metalness: 0.9, roughness: 0.3, envMapIntensity: 1.2 })
    const coin = new THREE.Group()
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.2, 48, 1, true), edge)
    barrel.rotation.x = Math.PI / 2
    const front = new THREE.Mesh(new THREE.CircleGeometry(1, 48), face)
    front.position.z = 0.1
    const back = new THREE.Mesh(new THREE.CircleGeometry(1, 48), face)
    back.position.z = -0.1
    back.rotation.y = Math.PI
    coin.add(barrel, front, back)
    return coin
  }

  private paper(map: THREE.Texture, width: number, height: number) {
    const geometry = new THREE.PlaneGeometry(width, height, 16, 4)
    const place = geometry.attributes.position
    for (let i = 0; i < place.count; i++) place.setZ(i, Math.sin((place.getX(i) / width + 0.5) * Math.PI) * width * 0.09)
    geometry.computeVertexNormals()
    return new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ map, alphaTest: 0.5, roughness: 0.62, side: THREE.DoubleSide, envMapIntensity: 0.9 }))
  }

  private buildMoney() {
    const { mobile, money } = this.options
    const [first, second] = money.orbitCards
    this.add(this.paper(receiptTexture(first.label, first.amount, first.detail), 0.9, 1.4), [2.75, 1.3, -1.2], 1, 0.7, "money")
    this.add(this.paper(receiptTexture(second.label, second.amount, second.detail), 0.9, 1.4), [2.65, -1.9, 0.9], 0.62, 1.9, "money")
    const coins: [number, number, number, number, number][] = [
      [-1.55, -2.0, 1, 0.26, 2.3],
      [1.15, 2.25, -0.9, 0.24, 3.1],
      [2.05, -1.25, 0.6, 0.15, 4.2],
      [-1.15, 1.95, 0.4, 0.2, 5.3],
      [4.2, 2.15, -3, 0.34, 6.1],
    ]
    coins.slice(0, mobile ? 3 : coins.length).forEach(([x, y, z, size, seed]) => this.add(this.miniCoin(), [x, y, z], size, seed, "money"))
    const nearLens: [number, number, number, number][] = [
      [3.3, -2.2, 3.6, 1.1],
      [3.9, 2.35, 3.2, 0.8],
      [1.8, -3.1, 4.6, 1.5],
    ]
    if (!mobile) {
      const map = bokehTexture()
      nearLens.forEach(([x, y, z, size], i) => {
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map, transparent: true, opacity: 0, depthWrite: false }))
        this.group.add(sprite)
        this.bokeh.push({ sprite, home: new THREE.Vector3(x, y, z), size, seed: i * 2.1 })
      })
    }
  }

  private suitcase() {
    const shell = new THREE.MeshPhysicalMaterial({ color: 0x2415a8, roughness: 0.34, envMapIntensity: 0.4 })
    const metal = new THREE.MeshStandardMaterial({ color: 0xe8a93a, metalness: 1, roughness: 0.28 })
    const bag = new THREE.Group()
    const body = new THREE.Mesh(new THREE.BoxGeometry(1, 1.4, 0.5, 2, 2, 2), shell)
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 12, 32, Math.PI), metal)
    handle.position.y = 0.7
    bag.add(body, handle)
    ;[-0.28, 0, 0.28].forEach((x) => {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.42, 0.52), metal)
      rib.position.x = x
      bag.add(rib)
    })
    return bag
  }

  private buildTrips() {
    const { mobile } = this.options
    this.add(this.paper(boardingPassTexture("LHR", "HND", "14A"), 1.7, 0.74), [1.95, -2.15, 2.4], 0.72, 1.2, "trips")
    // A short hop from the visitor's own country: a weekend away from London, or Delhi to Goa.
    const [hopFrom, hopTo] = this.options.money.symbol === "₹" ? ["DEL", "GOI"] : ["LHR", "BCN"]
    if (!mobile) this.add(this.paper(boardingPassTexture(hopFrom, hopTo, "6C"), 1.7, 0.74), [1.6, 2.65, -1], 0.72, 2.4, "trips")
    this.add(this.paper(hotelKeyTexture("Hotel Kyoto", "Room 412"), 1.15, 0.71), [2.85, 1.1, -0.6], 0.8, 8.4, "trips")
    this.add(this.suitcase(), [-1.95, -1.6, 0.9], 0.62, 7.7, "trips")
    const pin = (colour: number) => {
      const skin = new THREE.MeshPhysicalMaterial({ color: colour, roughness: 0.42, envMapIntensity: 0.3 })
      const group = new THREE.Group()
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 24), skin)
      const point = new THREE.Mesh(new THREE.ConeGeometry(0.33, 0.8, 32), skin)
      point.rotation.x = Math.PI
      point.position.y = -0.52
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }))
      eye.position.z = 0.33
      group.add(head, point, eye)
      return group
    }
    this.add(pin(0xe0381c), [-2.05, 2.25, 0.8], 0.42, 3.6, "trips")
    this.add(pin(0x1438d8), [-2.2, -2.45, 0.6], 0.36, 4.7, "trips")
    if (!mobile) this.add(pin(0x4a1fd8), [2.85, 0.2, -1.6], 0.3, 5.8, "trips")
    this.add(this.miniCoin(), [2.55, 2.0, 0.2], 0.2, 6.9, "trips")
  }

  update(state: { time: number; wide: boolean; moneyIn: number; tripsIn: number; standIn: number; tripSpread: number; moneySpread: number; explode: number; anchor: THREE.Vector3 }) {
    const { time, wide, moneyIn, tripsIn, standIn, tripSpread, moneySpread, explode, anchor } = state
    const moving = !this.options.still
    this.group.position.copy(anchor)

    // Everything is born at the subject and flies out fast, then hangs almost still.
    const sinceFired = (world: World) => (moving ? (this.firedAt[world] < 0 ? -1 : time - this.firedAt[world]) : 10)
    const burstOf = (world: World) => {
      const passed = sinceFired(world)
      return passed < 0 ? 0 : easeOutExpo(passed / 1.5)
    }
    const burst = { money: burstOf("money"), trips: burstOf("trips") }
    const since = moving ? (this.burstAt < 0 ? -1 : time - this.burstAt) : 10
    this.impact = since < 0 ? 0 : Math.max(0, 1 - since / 0.45) ** 2

    const ringT = since < 0 ? 1 : Math.min(1, since / 0.9)
    this.ring.visible = ringT < 1
    this.ring.scale.setScalar(0.8 + easeOutExpo(ringT) * 6.5)
    ;(this.ring.material as THREE.MeshBasicMaterial).opacity = (1 - ringT) * 0.95
    this.flash.visible = since >= 0 && since < 0.5
    ;(this.flash.material as THREE.SpriteMaterial).opacity = this.flash.visible ? (1 - since / 0.5) * 0.85 : 0

    // The ribbons whip out with the burst and unwind as the subject leaves.
    const worldShow = (world: World) => smooth(world === "money" ? moneyIn : tripsIn) * easeOutExpo(Math.max(0, sinceFired(world)) / 1.1)
    this.ribbons.forEach((ribbon) => {
      const show = Math.max(...ribbon.worlds.map(worldShow))
      ribbon.mesh.visible = show > 0.01
      if (!ribbon.mesh.visible) return
      if (moving) flowRibbon(ribbon.mesh.geometry, ribbon.shape, time)
      ribbon.mesh.scale.setScalar(wide ? 1 : 0.76)
      ribbon.mesh.geometry.setDrawRange(0, Math.floor((ribbon.count * show) / 6) * 6)
    })

    // A hard highlight travels around the coin and along the foil.
    this.sweepLight.position.set(Math.cos(time * 0.8) * 3, 1 + Math.sin(time * 0.5), 2.6 + Math.sin(time * 0.8))
    this.sweepLight.intensity = 40 * Math.max(moneyIn, tripsIn)

    this.glints.forEach((glint) => {
      const sparkle = moving ? Math.max(0, Math.sin(time * 1.3 + glint.seed)) ** 10 : 0.5
      const on = sparkle * Math.max(worldShow("trips") * (glint.shape === SWEEP_RIBBON ? 1 : 0), worldShow("money"))
      glint.sprite.visible = on > 0.02
      if (!glint.sprite.visible) return
      glint.shape(glint.at, time, flowCentre)
      glint.sprite.position.copy(flowCentre)
      glint.sprite.scale.setScalar(0.3 + on * 1.05)
      ;(glint.sprite.material as THREE.SpriteMaterial).opacity = on
    })

    // The swarms: thrown out, hanging, then streaming past the lens as you scroll.
    this.swarms.forEach(({ mesh, seeds, world }) => {
      const flock = world === "trips"
      const shownIn = (flock ? tripsIn : moneyIn) * burst[world]
      mesh.visible = shownIn > 0.01
      if (!mesh.visible) return
      const spread = flock ? tripSpread : moneySpread
      const faceRadius = flock ? 2.2 : 1
      seeds.forEach((item, i) => {
        const reach = item.reach * burst[world] * (flock ? 1 + explode * 3.5 : 1)
        let z = item.z * burst[world] + spread * 13
        z = ((z + 6) % 14) - 6
        let x = item.dir.x * reach + 0.2
        // The lens sits at x = -1.35, so anything right of it can't drift over the words at any depth.
        if (wide) x = Math.max(x, z > 0 ? -1.25 : -1.9)
        // Nearer ones project further up the frame, so they stop lower to stay clear of the menu.
        const y = Math.min(item.dir.y * reach, (wide ? 2.5 : 2.2) - Math.max(0, z) * 0.32) + (moving ? Math.sin(time * 0.5 + item.seed) * 0.07 : 0)
        stageDummy.position.set(x, y, z)
        // Nothing passes in front of the subject's face, and nothing nears the lens at full size.
        const clearFace = z > 0 ? smooth((Math.hypot(x, y) - faceRadius) / 0.6) : 1
        const nearLens = 1 - smooth((z - 2) / 4) * 0.65
        const turn = (moving ? time : 2) * 0.7 + item.seed
        // Planes show their wings to the lens and fly outward, banking a little.
        if (flock) stageDummy.rotation.set(1.15 + Math.sin(turn) * 0.22, 0, Math.atan2(item.dir.y, item.dir.x) + Math.sin(turn * 0.7) * 0.12, "ZXY")
        else stageDummy.rotation.set(item.spin.x * turn + Math.PI / 2, item.spin.y * turn, item.spin.z * turn, "XYZ")
        stageDummy.scale.setScalar(item.size * clearFace * nearLens * Math.max(0, Math.min(1, shownIn * 1.6 - (i % 7) * 0.02 + 0.1)))
        stageDummy.updateMatrix()
        mesh.setMatrixAt(i, stageDummy.matrix)
      })
      mesh.instanceMatrix.needsUpdate = true
    })

    // The stand slams up to meet the coin, and sinks out of frame as the story moves on.
    this.stand.visible = standIn * burst.money > 0.01
    this.stand.position.y = -1.86 - (1 - smooth(standIn * burst.money)) * 3.2
    this.stand.rotation.y = moving ? time * 0.05 : 0

    this.floaters.forEach((item, i) => {
      const money = item.world === "money"
      const want = (money ? moneyIn : tripsIn) * burst[item.world]
      const shown = smooth(want * 1.45 - (i % 5) * 0.09)
      item.object.visible = shown > 0.01
      if (!item.object.visible) return
      const bob = moving ? Math.sin(time * 0.7 + item.seed) * 0.08 : 0
      item.object.position.copy(item.home).multiplyScalar(burst[item.world] * (money ? 1 + moneySpread * 0.18 : 1 + explode * 2))
      item.object.position.y += bob
      item.object.scale.setScalar(item.size * shown * (this.options.mobile ? 0.85 : 1))
      const clock = moving ? time : 2
      if (item.sways) {
        item.object.rotation.set(Math.sin(clock * item.spin.x + item.seed) * 0.16, Math.sin(clock * item.spin.y + item.seed) * 0.42 - 0.2, (item.seed % 0.6) - 0.3)
      } else {
        item.object.rotation.set(Math.sin(clock * item.spin.x + item.seed) * 0.32, item.seed + clock * item.spin.y * 0.55, Math.sin(clock * item.spin.z) * 0.14)
      }
    })

    this.bokeh.forEach((item) => {
      const drift = moving ? Math.sin(time * 0.4 + item.seed) * 0.12 : 0
      item.sprite.position.copy(item.home).multiplyScalar(burst.money).add(new THREE.Vector3(drift, drift * 0.6, 0))
      item.sprite.scale.setScalar(item.size)
      ;(item.sprite.material as THREE.SpriteMaterial).opacity = 0.42 * moneyIn * burst.money
      item.sprite.visible = moneyIn * burst.money > 0.01
    })
  }
}

const stageDummy = new THREE.Object3D()
