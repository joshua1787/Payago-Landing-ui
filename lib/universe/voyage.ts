import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"

import { clamp01, smooth } from "./chapters"

// One unbroken shot of a trip, driven by scroll: a flight rushes in through the clouds and
// lands on a beach, the camera goes through a hotel and out the back, and off a bungee
// platform into the gorge behind it. Everything is built here in code, so nothing downloads.

const ISLAND = { x: 0, z: -1250, size: 1500 }
const PLATEAU = 110
const DOOR_Z = -1325
const LOBBY_END_Z = -1405
const PLATFORM_Z = -1448

const VIOLET = "#7C5CFF"
const BLUE = "#3B6BF0"
const FONT = '"Outfit Variable", "Helvetica Neue", Arial, sans-serif'

const hash = (x: number, z: number) => {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453
  return s - Math.floor(s)
}
function noise(x: number, z: number) {
  const ix = Math.floor(x)
  const iz = Math.floor(z)
  const fx = x - ix
  const fz = z - iz
  const u = fx * fx * (3 - 2 * fx)
  const v = fz * fz * (3 - 2 * fz)
  const a = hash(ix, iz) + (hash(ix + 1, iz) - hash(ix, iz)) * u
  const b = hash(ix, iz + 1) + (hash(ix + 1, iz + 1) - hash(ix, iz + 1)) * u
  return a + (b - a) * v
}
function fbm(x: number, z: number, octaves = 4) {
  let sum = 0
  let amp = 0.5
  let f = 1
  for (let i = 0; i < octaves; i++) {
    sum += noise(x * f, z * f) * amp
    amp *= 0.5
    f *= 2.03
  }
  return sum
}
const mix = (a: number, b: number, t: number) => a + (b - a) * t
const band = (edge0: number, edge1: number, x: number) => smooth((x - edge0) / (edge1 - edge0))

/** The island: a beach with a landing strip, a cliff with a flat top for the hotel, a gorge, a mountain. */
function groundHeight(x: number, z: number) {
  const u = -z
  const dist = Math.hypot(x / 520, (z - ISLAND.z) / 430) + (fbm(x * 0.004 + 3, z * 0.004 + 7, 3) - 0.45) * 0.34
  const land = 1 - band(0.82, 1, dist)
  const inland = 1 - band(0.45, 0.85, dist)
  let h = mix(-16, 3 + inland * fbm(x * 0.012, z * 0.012) * 70, land)
  // The cliff the hotel stands on.
  const xFade = 1 - band(150, 290, Math.abs(x))
  const rise = band(1130, 1262, u) * xFade
  const flat = 1 - band(90, 150, Math.abs(x))
  h = mix(h, PLATEAU + (1 - flat) * (fbm(x * 0.02, z * 0.02) - 0.5) * 22, rise)
  // Mountain behind the gorge.
  const mountain = band(1530, 1610, u) * land
  h = mix(h, Math.max(h, 190 * (0.55 + fbm(x * 0.006, z * 0.006))), mountain)
  // The gorge runs clean across the island, so the sea fills it as a river.
  h = mix(h, -7, 1 - band(34, 52, Math.abs(u - 1490)))
  // The landing strip.
  const stripX = 1 - band(100, 175, Math.abs(x))
  const stripZ = band(826, 852, u) * (1 - band(1120, 1150, u))
  return mix(h, 1.6, stripX * stripZ)
}

function canvas(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const element = document.createElement("canvas")
  element.width = width
  element.height = height
  const ctx = element.getContext("2d")
  if (ctx) draw(ctx)
  const texture = new THREE.CanvasTexture(element)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

const SKY_KEYS: { at: number; top: string; horizon: string; sun: string; dir: [number, number, number] }[] = [
  { at: 0, top: "#1F6FE0", horizon: "#CDE9FF", sun: "#FFFFFF", dir: [0.35, 0.72, -0.6] },
  { at: 0.34, top: "#1A78E8", horizon: "#BFEAFF", sun: "#FFF6E0", dir: [0.45, 0.62, -0.64] },
  { at: 0.56, top: "#3457C9", horizon: "#FFD79B", sun: "#FFCB7E", dir: [0.62, 0.27, -0.74] },
  { at: 0.84, top: "#35278C", horizon: "#FF8A58", sun: "#FF7C45", dir: [0.72, 0.1, -0.69] },
  { at: 1, top: "#20175F", horizon: "#FF7468", sun: "#FF6A4A", dir: [0.74, 0.05, -0.67] },
]

const SKY_VERTEX = `varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = projectionMatrix * mat4(mat3(modelViewMatrix)) * vec4(position, 1.0); gl_Position = p.xyww; }`
const SKY_FRAGMENT = `
precision highp float;
varying vec3 vDir;
uniform vec3 uTop; uniform vec3 uHorizon; uniform vec3 uSunColor; uniform vec3 uSunDir;
void main(){
  vec3 d = normalize(vDir);
  float h = clamp(d.y, 0.0, 1.0);
  vec3 c = mix(uHorizon, uTop, pow(h, 0.55));
  if (d.y < 0.0) c = uHorizon;
  float s = max(dot(d, uSunDir), 0.0);
  c += uSunColor * (pow(s, 900.0) * 3.0 + pow(s, 40.0) * 0.32 + pow(s, 6.0) * 0.16);
  gl_FragColor = vec4(c, 1.0);
  #include <colorspace_fragment>
}`

const SEA_VERTEX = `varying vec3 vWorld; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`
const SEA_FRAGMENT = `
precision highp float;
varying vec3 vWorld;
uniform float uTime; uniform vec3 uTop; uniform vec3 uHorizon; uniform vec3 uSunColor; uniform vec3 uSunDir; uniform vec3 uCam;
uniform sampler2D uHeight; uniform vec3 uIsland;
float n(vec2 p){ return sin(p.x)*sin(p.y); }
void main(){
  vec2 xz = vWorld.xz;
  vec2 uv = (xz - uIsland.xy) / uIsland.z + 0.5;
  float inside = step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
  float ground = mix(-16.0, texture2D(uHeight, uv).r * 21.0 - 16.0, inside);
  float depth = max(-ground, 0.0);
  float t = uTime;
  vec2 a = xz * 0.09 + vec2(t * 0.5, t * 0.32);
  vec2 b = xz * 0.23 + vec2(-t * 0.7, t * 0.45);
  vec2 c = xz * 0.71 + vec2(t * 1.1, -t * 0.8);
  vec3 N = normalize(vec3((cos(a.x)*sin(a.y))*0.05 + (cos(b.x)*sin(b.y))*0.035 + (cos(c.x)*sin(c.y))*0.018, 1.0, (sin(a.x)*cos(a.y))*0.05 + (sin(b.x)*cos(b.y))*0.035 + (sin(c.x)*cos(c.y))*0.018));
  vec3 V = normalize(uCam - vWorld);
  vec3 deep = vec3(0.012, 0.21, 0.42);
  vec3 lagoon = vec3(0.06, 0.74, 0.74);
  vec3 sandy = vec3(0.56, 0.9, 0.82);
  vec3 col = mix(deep, lagoon, exp(-depth * 0.17));
  col = mix(col, sandy, exp(-depth * 1.5));
  float fres = pow(1.0 - max(dot(N, V), 0.0), 4.0);
  vec3 R = reflect(-V, N);
  vec3 skyR = mix(uHorizon, uTop, pow(clamp(R.y, 0.0, 1.0), 0.55));
  col = mix(col, skyR, fres * 0.85);
  float spec = pow(max(dot(R, uSunDir), 0.0), 240.0);
  col += uSunColor * spec * 2.4;
  float wobble = n(xz * 0.35 + t * 0.2) * 0.5 + n(xz * 1.1 - t * 0.3) * 0.25;
  float line = sin(depth * 5.5 - t * 1.2 + wobble * 3.0);
  float foam = smoothstep(0.55, 0.95, line) * smoothstep(2.4, 0.5, depth) + smoothstep(0.42, 0.05, depth);
  col = mix(col, vec3(1.0), clamp(foam, 0.0, 1.0) * 0.9);
  float dist = length(uCam - vWorld);
  col = mix(col, uHorizon, smoothstep(700.0, 4200.0, dist));
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`

type Key = { at: number; pos: [number, number, number]; look: [number, number, number] }
const CAMERA_KEYS: Key[] = [
  { at: 0, pos: [-15, 68, 6], look: [-16, 61, -70] },
  { at: 0.08, pos: [-34, 50, -270], look: [-24, 42, -380] },
  { at: 0.15, pos: [-74, 9, -700], look: [-26, 12, -770] },
  { at: 0.215, pos: [-62, 5, -880], look: [0, 3, -905] },
  { at: 0.27, pos: [-48, 7, -1012], look: [0, 5, -1045] },
  { at: 0.31, pos: [-34, 9, -1100], look: [-4, 7, -1050] },
  { at: 0.35, pos: [34, 24, -1092], look: [0, 92, -1262] },
  { at: 0.39, pos: [20, PLATEAU + 12, -1205], look: [0, PLATEAU + 16, -1325] },
  { at: 0.45, pos: [0, PLATEAU + 5, -1284], look: [0, PLATEAU + 6, -1326] },
  { at: 0.49, pos: [0, PLATEAU + 4, -1320], look: [0, PLATEAU + 5, -1370] },
  { at: 0.535, pos: [0, PLATEAU + 3.6, -1362], look: [0, PLATEAU + 9, -1378] },
  { at: 0.58, pos: [0, PLATEAU + 3.4, -1402], look: [0, PLATEAU + 1, -1450] },
  { at: 0.62, pos: [-3.2, PLATEAU + 4.2, -1439], look: [0, PLATEAU + 1.4, PLATFORM_Z] },
  { at: 0.665, pos: [-1.6, PLATEAU - 8, -1452], look: [0, PLATEAU - 40, -1470] },
  { at: 0.73, pos: [-2.5, 42, -1472], look: [0, 6, -1490] },
  { at: 0.785, pos: [10, 17, -1483], look: [0, 22, -1490] },
  { at: 0.845, pos: [150, 16, -1494], look: [330, 14, -1494] },
  { at: 0.92, pos: [560, 110, -1380], look: [60, 40, -1240] },
  { at: 1, pos: [760, 300, -880], look: [0, 10, -1230] },
]

export type VoyageOptions = { mobile: boolean; still: boolean }

export class Voyage {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(50, 1, 0.5, 7000)
  private clock = new THREE.Clock()
  private frame = 0
  private running = false
  private target = 0
  private progress = 0
  private flashAt = -1
  private readonly mobile: boolean
  private readonly still: boolean
  private skyUniforms = { uTop: { value: new THREE.Color() }, uHorizon: { value: new THREE.Color() }, uSunColor: { value: new THREE.Color() }, uSunDir: { value: new THREE.Vector3() } }
  private sea: THREE.ShaderMaterial
  private sun = new THREE.DirectionalLight(0xffffff, 3)
  private hemi = new THREE.HemisphereLight(0xdcefff, 0xcaa77a, 1.1)
  private posCurve: THREE.CatmullRomCurve3
  private lookCurve: THREE.CatmullRomCurve3
  private lookNow = new THREE.Vector3()
  private plane = new THREE.Group()
  private gear: THREE.Object3D[] = []
  private clouds: THREE.Sprite[] = []
  private dust: { sprite: THREE.Sprite; dir: THREE.Vector3 }[] = []
  private streaks: THREE.InstancedMesh
  private streakSeeds: { x: number; y: number; z: number; len: number }[] = []
  private doors: THREE.Object3D[] = []
  private windows: THREE.MeshStandardMaterial[] = []
  private jumper = new THREE.Group()
  private cord!: THREE.Mesh
  private chandelier = new THREE.Group()
  private pointer = new THREE.Vector2()
  private pointerNow = new THREE.Vector2()
  private onPointer = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return
    this.pointer.set((event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * 2 - 1)
  }

  constructor(element: HTMLCanvasElement, options: VoyageOptions) {
    this.mobile = options.mobile
    this.still = options.still
    this.renderer = new THREE.WebGLRenderer({ canvas: element, antialias: !options.mobile, powerPreference: "high-performance" })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, options.mobile ? 1.35 : 1.75))
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1
    if (!options.mobile) {
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    }
    this.scene.fog = new THREE.Fog(0xcde9ff, 400, 4200)
    // Metal and paint need something to reflect, or gold renders black.
    const pmrem = new THREE.PMREMGenerator(this.renderer)
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.06).texture
    this.scene.environmentIntensity = 0.55
    pmrem.dispose()

    const pos = CAMERA_KEYS.map((k) => new THREE.Vector3(...k.pos))
    const look = CAMERA_KEYS.map((k) => new THREE.Vector3(...k.look))
    this.posCurve = new THREE.CatmullRomCurve3(pos, false, "centripetal")
    this.lookCurve = new THREE.CatmullRomCurve3(look, false, "centripetal")

    this.scene.add(new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), new THREE.ShaderMaterial({ vertexShader: SKY_VERTEX, fragmentShader: SKY_FRAGMENT, uniforms: this.skyUniforms, side: THREE.BackSide, depthWrite: false, depthTest: false })))
    ;(this.scene.children[0] as THREE.Mesh).frustumCulled = false
    ;(this.scene.children[0] as THREE.Mesh).renderOrder = -10

    this.sun.castShadow = !options.mobile
    this.sun.shadow.mapSize.set(2048, 2048)
    this.sun.shadow.camera.far = 900
    this.sun.shadow.bias = -0.0006
    this.scene.add(this.sun, this.sun.target, this.hemi)
    const fill = new THREE.DirectionalLight(0xffe2c4, 0.85)
    fill.position.set(-0.6, 0.45, 0.7)
    this.scene.add(fill)

    this.sea = this.buildGround()
    this.buildPalms()
    this.buildPlane()
    this.buildClouds()
    this.buildHotel()
    this.buildBungee()

    const streakCount = options.mobile ? 60 : 160
    this.streaks = new THREE.InstancedMesh(new THREE.BoxGeometry(0.035, 0.035, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }), streakCount)
    this.streaks.frustumCulled = false
    for (let i = 0; i < streakCount; i++) {
      const a = hash(i, 1) * Math.PI * 2
      const r = 3 + hash(i, 2) * 26
      this.streakSeeds.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, z: hash(i, 3) * 90, len: 3 + hash(i, 4) * 12 })
    }
    this.scene.add(this.streaks)

    window.addEventListener("pointermove", this.onPointer, { passive: true })
    this.applySky(0)
    this.resize()
  }

  private buildGround() {
    const segments = this.mobile ? 190 : 340
    const geometry = new THREE.PlaneGeometry(ISLAND.size, ISLAND.size, segments, segments)
    geometry.rotateX(-Math.PI / 2)
    geometry.translate(ISLAND.x, 0, ISLAND.z)
    const place = geometry.attributes.position as THREE.BufferAttribute
    const colours = new Float32Array(place.count * 3)
    // Every height once: the slope and the sea's depth map read this grid instead of recomputing.
    const side = segments + 1
    const step = ISLAND.size / segments
    const heights = new Float32Array(place.count)
    for (let i = 0; i < place.count; i++) heights[i] = groundHeight(place.getX(i), place.getZ(i))
    const sand = new THREE.Color("#F6DFB0")
    const wet = new THREE.Color("#CFAF7E")
    const grass = new THREE.Color("#2F8F4B")
    const deepGrass = new THREE.Color("#176B3A")
    const rock = new THREE.Color("#B99A79")
    const strata = new THREE.Color("#8E7154")
    const c = new THREE.Color()
    for (let i = 0; i < place.count; i++) {
      const x = place.getX(i)
      const z = place.getZ(i)
      const h = heights[i]
      place.setY(i, h)
      const east = (i + 1) % side === 0 ? h : heights[i + 1]
      const south = i + side >= place.count ? h : heights[i + side]
      const slope = Math.hypot(east - h, south - h) / step
      c.copy(grass).lerp(deepGrass, fbm(x * 0.03, z * 0.03))
      c.lerp(sand, 1 - band(3.5, 7.5, h + (fbm(x * 0.05, z * 0.05) - 0.5) * 3))
      if (h < 1.1) c.lerp(wet, 1 - band(0, 1.1, h))
      const layered = c.clone().copy(rock).lerp(strata, 0.5 + 0.5 * Math.sin(h * 0.55 + fbm(x * 0.02, z * 0.02) * 9))
      c.lerp(layered, band(0.95, 1.5, slope))
      if (h > 150) c.lerp(layered, band(150, 190, h))
      // Sand has ripples and damp patches, not one flat colour.
      if (h < 7) c.multiplyScalar(0.93 + 0.14 * fbm(x * 0.22, z * 0.09))
      colours.set([c.r, c.g, c.b], i * 3)
    }
    geometry.setAttribute("color", new THREE.BufferAttribute(colours, 3))
    geometry.computeVertexNormals()
    const land = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.96 }))
    land.receiveShadow = !this.mobile
    this.scene.add(land)

    const data = new Uint8Array(place.count * 4)
    for (let i = 0; i < place.count; i++) {
      data[i * 4] = Math.round(clamp01((heights[i] + 16) / 21) * 255)
      data[i * 4 + 3] = 255
    }
    const height = new THREE.DataTexture(data, side, side)
    height.magFilter = height.minFilter = THREE.LinearFilter
    height.needsUpdate = true
    const material = new THREE.ShaderMaterial({
      vertexShader: SEA_VERTEX,
      fragmentShader: SEA_FRAGMENT,
      uniforms: { ...this.skyUniforms, uTime: { value: 0 }, uCam: { value: new THREE.Vector3() }, uHeight: { value: height }, uIsland: { value: new THREE.Vector3(ISLAND.x, ISLAND.z, ISLAND.size) } },
    })
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(14000, 14000), material)
    sea.rotation.x = -Math.PI / 2
    sea.position.z = -1000
    this.scene.add(sea)
    return material
  }

  private buildPalms() {
    const count = this.mobile ? 110 : 320
    const fronds = 7
    const trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.22, 0.42, 1, 7), new THREE.MeshStandardMaterial({ color: 0x7c5a3c, roughness: 1 }), count)
    const frondGeometry = new THREE.ConeGeometry(0.9, 1, 5)
    frondGeometry.translate(0, 0.5, 0)
    frondGeometry.scale(1, 1, 0.18)
    const leaf = new THREE.InstancedMesh(frondGeometry, new THREE.MeshStandardMaterial({ color: 0x1f9a4e, roughness: 0.75, side: THREE.DoubleSide }), count * fronds)
    const dummy = new THREE.Object3D()
    let placed = 0
    let tries = 0
    while (placed < count && tries < 40000) {
      tries++
      const onCliff = placed % 4 === 0
      const x = (hash(tries, 11) - 0.5) * (onCliff ? 230 : 560)
      const z = onCliff ? -1250 - hash(tries, 12) * 170 : -840 - hash(tries, 12) * 340
      const h = groundHeight(x, z)
      if (onCliff ? Math.abs(x) < 72 && z < -1300 && h < PLATEAU - 1 : h < 2.6 || h > 26) continue
      if (!onCliff && Math.abs(x) < 46) continue
      if (onCliff && Math.abs(x) < 26) continue
      const tall = 9 + hash(tries, 13) * 8
      dummy.position.set(x, h + tall / 2 - 0.3, z)
      dummy.rotation.set((hash(tries, 14) - 0.5) * 0.28, 0, (hash(tries, 15) - 0.5) * 0.28)
      dummy.scale.set(1, tall, 1)
      dummy.updateMatrix()
      trunk.setMatrixAt(placed, dummy.matrix)
      const top = new THREE.Vector3(0, 0.5, 0).applyMatrix4(dummy.matrix)
      for (let f = 0; f < fronds; f++) {
        dummy.position.copy(top)
        dummy.rotation.set(1.75 + (f % 2) * 0.28, (f / fronds) * Math.PI * 2 + hash(tries, f), 0, "YXZ")
        const s = 3.4 + hash(tries + f, 16) * 2
        dummy.scale.set(s * 0.8, s * 1.5, s)
        dummy.updateMatrix()
        leaf.setMatrixAt(placed * fronds + f, dummy.matrix)
      }
      dummy.rotation.order = "XYZ"
      placed++
    }
    trunk.castShadow = leaf.castShadow = !this.mobile
    this.scene.add(trunk, leaf)

    // Sunbeds and parasols along the sand, so the beach reads as somewhere you'd book.
    const beds = this.mobile ? 30 : 80
    const shade = new THREE.InstancedMesh(new THREE.ConeGeometry(2.4, 1.1, 10), new THREE.MeshStandardMaterial({ roughness: 0.6 }), beds)
    const pole = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.07, 0.07, 3), new THREE.MeshStandardMaterial({ color: 0xffffff }), beds)
    const paints = ["#FFFFFF", "#FFD27A", "#7C5CFF", "#FFFFFF", "#F0755A"].map((p) => new THREE.Color(p))
    for (let i = 0; i < beds; i++) {
      const side = i % 2 ? 1 : -1
      const x = side > 0 ? 58 + (i % 8) * 10 : -(112 + (i % 8) * 10)
      const z = -846 - Math.floor(i / 2) * 7
      const h = Math.max(groundHeight(x, z), 1)
      dummy.position.set(x, h + 1.5, z)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      pole.setMatrixAt(i, dummy.matrix)
      dummy.position.y = h + 3.2
      dummy.updateMatrix()
      shade.setMatrixAt(i, dummy.matrix)
      shade.setColorAt(i, paints[i % paints.length])
    }
    shade.castShadow = !this.mobile
    this.scene.add(shade, pole)
  }

  private buildPlane() {
    const skin = canvas(2048, 1024, (ctx) => {
      const w = 2048
      const h = 1024
      ctx.fillStyle = "#FBFCFF"
      ctx.fillRect(0, 0, w, h)
      // The belly, then a violet line along each side.
      ctx.fillStyle = "#C9D2E6"
      ctx.fillRect(w * 0.33, 0, w * 0.34, h)
      ctx.fillStyle = VIOLET
      ctx.fillRect(w * 0.285, 0, w * 0.018, h)
      ctx.fillRect(w * 0.697, 0, w * 0.018, h)
      ctx.fillStyle = "#1B2340"
      for (let y = h * 0.14; y < h * 0.88; y += 15) {
        ctx.fillRect(w * 0.205, y, 15, 8)
        ctx.fillRect(w * 0.785, y, 15, 8)
      }
    })
    const body = new THREE.MeshPhysicalMaterial({ map: skin, roughness: 0.22, metalness: 0.08, clearcoat: 1, clearcoatRoughness: 0.12 })
    const white = new THREE.MeshPhysicalMaterial({ color: 0xf2f4fa, roughness: 0.28, metalness: 0.2, clearcoat: 0.8 })
    const brand = new THREE.MeshPhysicalMaterial({ color: 0x5a3ff0, roughness: 0.25, clearcoat: 1 })
    const gold = new THREE.MeshStandardMaterial({ color: 0xe8a93a, metalness: 1, roughness: 0.25 })
    const dark = new THREE.MeshStandardMaterial({ color: 0x141a2c, roughness: 0.5, metalness: 0.4 })

    const profile: [number, number][] = [[0.02, -20.5], [0.5, -19.5], [1, -17], [1.75, -12], [2.35, -6], [2.45, 0], [2.45, 10], [2.35, 14], [2.05, 17], [1.5, 19], [0.8, 20.2], [0.02, 20.8]]
    const curve = new THREE.CatmullRomCurve3(profile.map(([r, y]) => new THREE.Vector3(r, y, 0)))
    const fuselage = new THREE.Mesh(new THREE.LatheGeometry(curve.getPoints(70).map((p) => new THREE.Vector2(Math.max(p.x, 0.02), p.y)), 48), body)
    fuselage.rotation.x = -Math.PI / 2
    this.plane.add(fuselage)
    const cockpit = new THREE.Mesh(new THREE.SphereGeometry(1.1, 16, 12), new THREE.MeshPhysicalMaterial({ color: 0x0b1020, roughness: 0.05, clearcoat: 1 }))
    cockpit.scale.set(1.15, 0.42, 0.75)
    cockpit.position.set(0, 1.05, -18.3)
    cockpit.rotation.x = 0.5
    this.plane.add(cockpit)

    const blade = (points: [number, number][], thickness: number, material: THREE.Material) => {
      const shape = new THREE.Shape()
      points.forEach(([a, b], i) => (i === 0 ? shape.moveTo(a, b) : shape.lineTo(a, b)))
      shape.closePath()
      return new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 1 }), material)
    }
    ;[-1, 1].forEach((side) => {
      const wing = blade([[1.8, 5], [1.8, -4.5], [21, 6.5], [21, 8.2]], 0.32, white)
      wing.rotation.set(Math.PI / 2, 0, 0)
      const holder = new THREE.Group()
      holder.add(wing)
      holder.scale.x = side
      holder.rotation.z = side * 0.09
      holder.position.y = -1.1
      this.plane.add(holder)
      const tip = blade([[0, 0], [1.5, 0], [0.55, 3.2], [0, 3.2]], 0.1, brand)
      tip.rotation.y = -side * Math.PI / 2
      tip.position.set(side * 20.9, 0.75, 6.8)
      this.plane.add(tip)
      const engine = new THREE.Group()
      const nacelle = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 0.85, 4.8, 28), white)
      nacelle.rotation.x = Math.PI / 2
      const lip = new THREE.Mesh(new THREE.TorusGeometry(1.14, 0.1, 10, 28), gold)
      lip.position.z = -2.4
      const fan = new THREE.Mesh(new THREE.CircleGeometry(1.05, 24), dark)
      fan.position.z = -2.42
      fan.rotation.y = Math.PI
      engine.add(nacelle, lip, fan)
      engine.position.set(side * 8.2, -2.15, -1.3)
      this.plane.add(engine)
      const stabiliser = blade([[0.9, 3.2], [0.9, -0.8], [8.2, 2.6], [8.2, 3.8]], 0.16, white)
      stabiliser.rotation.set(Math.PI / 2, 0, 0)
      const tailHolder = new THREE.Group()
      tailHolder.add(stabiliser)
      tailHolder.scale.x = side
      tailHolder.position.set(0, 0.5, 15.2)
      this.plane.add(tailHolder)
    })
    const fin = blade([[0, 5.6], [0, -1.6], [8.6, 3.4], [8.6, 6.4]], 0.22, brand)
    fin.rotation.set(0, Math.PI / 2, Math.PI / 2)
    fin.position.set(-0.11, 1.6, 15.6)
    this.plane.add(fin)

    const name = canvas(512, 128, (ctx) => {
      ctx.fillStyle = BLUE
      ctx.font = `700 92px ${FONT}`
      ctx.textBaseline = "middle"
      ctx.fillText("PayaGo", 30, 68)
    })
    ;[-1, 1].forEach((side) => {
      const label = new THREE.Mesh(new THREE.PlaneGeometry(9, 2.25), new THREE.MeshBasicMaterial({ map: name, transparent: true, toneMapped: false }))
      label.rotation.y = side * Math.PI / 2
      label.position.set(side * 2.47, 0.55, -6)
      this.plane.add(label)
    })

    const wheel = (x: number, z: number, drop: number) => {
      const leg = new THREE.Group()
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, drop), dark)
      strut.position.y = -drop / 2
      const tyre = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.42, 16), dark)
      tyre.rotation.z = Math.PI / 2
      tyre.position.y = -drop
      leg.add(strut, tyre)
      leg.position.set(x, -2.2, z)
      this.plane.add(leg)
      this.gear.push(leg)
    }
    wheel(-3.4, 1.5, 2.2)
    wheel(3.4, 1.5, 2.2)
    wheel(0, -15, 2.2)
    this.plane.traverse((o) => {
      if (o instanceof THREE.Mesh) o.castShadow = !this.mobile
    })
    this.scene.add(this.plane)
  }

  private buildClouds() {
    const puff = canvas(256, 256, (ctx) => {
      for (let i = 0; i < 26; i++) {
        const x = 128 + (hash(i, 21) - 0.5) * 130
        const y = 128 + (hash(i, 22) - 0.5) * 80
        const r = 26 + hash(i, 23) * 44
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, "rgba(255,255,255,0.42)")
        g.addColorStop(1, "rgba(255,255,255,0)")
        ctx.fillStyle = g
        ctx.fillRect(0, 0, 256, 256)
      }
    })
    const count = this.mobile ? 46 : 110
    for (let i = 0; i < count; i++) {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: puff, transparent: true, depthWrite: false, opacity: 0.9, fog: false }))
      const near = i < count * 0.62
      const size = near ? 34 + hash(i, 31) * 60 : 140 + hash(i, 31) * 240
      sprite.scale.set(size, size * 0.56, 1)
      sprite.position.set(
        near ? (hash(i, 32) - 0.5) * 260 : (hash(i, 32) - 0.5) * 3400,
        near ? 18 + hash(i, 33) * 78 : 150 + hash(i, 33) * 260,
        near ? 30 - hash(i, 34) * 700 : -hash(i, 34) * 3600 + 400,
      )
      this.clouds.push(sprite)
      this.scene.add(sprite)
    }
    const dustMap = canvas(128, 128, (ctx) => {
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 62)
      g.addColorStop(0, "rgba(246,223,176,0.8)")
      g.addColorStop(1, "rgba(246,223,176,0)")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 128, 128)
    })
    for (let i = 0; i < 16; i++) {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: dustMap, transparent: true, depthWrite: false, opacity: 0 }))
      this.dust.push({ sprite, dir: new THREE.Vector3((i % 2 ? 1 : -1) * (0.4 + hash(i, 41)), hash(i, 42) * 0.7, 0.4 + hash(i, 43)) })
      this.scene.add(sprite)
    }
  }

  private buildHotel() {
    const y0 = PLATEAU + 0.1
    const hotel = new THREE.Group()
    const plaster = new THREE.MeshStandardMaterial({ color: 0xfaf5ea, roughness: 0.62 })
    const gold = new THREE.MeshStandardMaterial({ color: 0xe6ad45, metalness: 1, roughness: 0.22 })
    const glass = new THREE.MeshPhysicalMaterial({ color: 0xbfe3ff, roughness: 0.04, transparent: true, opacity: 0.28, metalness: 0.1 })

    const facade = (repeatX: number, repeatY: number) => {
      const paint = (lit: boolean) =>
        canvas(256, 256, (ctx) => {
          ctx.fillStyle = lit ? "#000000" : "#F5EFE2"
          ctx.fillRect(0, 0, 256, 256)
          for (let x = 0; x < 2; x++) {
            ctx.fillStyle = lit ? "#FFC777" : "#7FA8CC"
            ctx.fillRect(22 + x * 128, 26, 84, 170)
          }
          if (!lit) {
            ctx.fillStyle = "#E6AD45"
            ctx.fillRect(0, 216, 256, 10)
          }
        })
      const map = paint(false)
      const glow = paint(true)
      ;[map, glow].forEach((t) => {
        t.wrapS = t.wrapT = THREE.RepeatWrapping
        t.repeat.set(repeatX, repeatY)
      })
      const material = new THREE.MeshStandardMaterial({ map, emissiveMap: glow, emissive: 0xffffff, emissiveIntensity: 0, roughness: 0.45 })
      this.windows.push(material)
      return material
    }
    const box = (w: number, h: number, d: number, x: number, y: number, z: number, material: THREE.Material) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material)
      mesh.position.set(x, y, z)
      mesh.castShadow = mesh.receiveShadow = !this.mobile
      hotel.add(mesh)
      return mesh
    }

    // Wings either side of the lobby, then floors stepping back above it.
    ;[-1, 1].forEach((side) => {
      box(84, 30, 76, side * 64, y0 + 15, DOOR_Z - 38, facade(14, 5))
      box(1.2, 30.4, 76.6, side * 106.6, y0 + 15, DOOR_Z - 38, gold)
    })
    const floors = 6
    for (let i = 0; i < floors; i++) {
      const w = 196 - i * 24
      const y = y0 + 14.5 + i * 5.4
      box(w, 5.2, 66 - i * 5, 0, y + 2.6, DOOR_Z - 38 - i * 2.5, facade(Math.round(w / 6.5), 1))
      box(w + 2, 0.45, 69 - i * 5, 0, y + 5.3, DOOR_Z - 38 - i * 2.5, gold)
    }

    // The way in: a wall with a door in it, a canopy and two gold columns.
    box(16, 14, 1, -14.5, y0 + 7, DOOR_Z, plaster)
    box(16, 14, 1, 14.5, y0 + 7, DOOR_Z, plaster)
    box(13, 5, 1, 0, y0 + 11.5, DOOR_Z, plaster)
    const canopy = box(22, 0.8, 16, 0, y0 + 9.8, DOOR_Z + 7, gold)
    canopy.castShadow = true
    ;[-9.5, 9.5].forEach((x) => box(0.8, 9.6, 0.8, x, y0 + 4.8, DOOR_Z + 14, gold))
    ;[-1, 1].forEach((side) => {
      const hinge = new THREE.Group()
      hinge.position.set(side * 6.5, y0 + 4.5, DOOR_Z)
      const panel = new THREE.Mesh(new THREE.BoxGeometry(6.4, 9, 0.2), glass)
      panel.position.x = -side * 3.2
      hinge.add(panel)
      ;[[6.5, 0.16, 0, 4.5], [6.5, 0.16, 0, -4.5], [0.16, 9, 3.2, 0], [0.16, 9, -3.2, 0]].forEach(([w, h, x, y]) => {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.26), gold)
        bar.position.set(-side * 3.2 + x, y, 0)
        hinge.add(bar)
      })
      hinge.userData.side = side
      hotel.add(hinge)
      this.doors.push(hinge)
    })
    const sign = canvas(1024, 200, (ctx) => {
      ctx.fillStyle = "#E6AD45"
      ctx.font = `600 124px ${FONT}`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("The Bay Hotel", 512, 104)
    })
    const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(26, 5), new THREE.MeshBasicMaterial({ map: sign, transparent: true, toneMapped: false }))
    signMesh.position.set(0, y0 + 11.6, DOOR_Z + 15.2)
    hotel.add(signMesh)

    const court = new THREE.Mesh(new THREE.PlaneGeometry(130, 72), new THREE.MeshStandardMaterial({ color: 0xece2d0, roughness: 0.55 }))
    court.rotation.x = -Math.PI / 2
    court.position.set(0, y0 + 0.12, DOOR_Z + 34)
    court.receiveShadow = !this.mobile
    hotel.add(court)

    // Inside: marble, gold pillars, a chandelier, and light at the far end.
    const marble = canvas(1024, 1024, (ctx) => {
      ctx.fillStyle = "#F4EFE6"
      ctx.fillRect(0, 0, 1024, 1024)
      ctx.strokeStyle = "rgba(160,132,92,0.34)"
      for (let i = 0; i < 44; i++) {
        ctx.lineWidth = 0.6 + hash(i, 51) * 2.4
        ctx.beginPath()
        let x = hash(i, 52) * 1024
        let y = hash(i, 53) * 1024
        ctx.moveTo(x, y)
        for (let s = 0; s < 8; s++) {
          x += (hash(i, s + 60) - 0.4) * 120
          y += (hash(i, s + 70) - 0.5) * 120
          ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      ctx.strokeStyle = "rgba(230,173,69,0.55)"
      ctx.lineWidth = 4
      ctx.strokeRect(2, 2, 1020, 1020)
    })
    marble.wrapS = marble.wrapT = THREE.RepeatWrapping
    marble.repeat.set(5, 10)
    const lobbyLength = DOOR_Z - LOBBY_END_Z
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(44, lobbyLength + 40), new THREE.MeshPhysicalMaterial({ map: marble, roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.08 }))
    floor.rotation.x = -Math.PI / 2
    floor.position.set(0, y0 + 0.18, DOOR_Z - lobbyLength / 2 - 12)
    hotel.add(floor)
    const wall = new THREE.MeshStandardMaterial({ color: 0xf3e6cf, roughness: 0.7, side: THREE.DoubleSide })
    box(1, 14, lobbyLength, -22, y0 + 7, DOOR_Z - lobbyLength / 2, wall)
    box(1, 14, lobbyLength, 22, y0 + 7, DOOR_Z - lobbyLength / 2, wall)
    box(45, 0.6, lobbyLength, 0, y0 + 14, DOOR_Z - lobbyLength / 2, wall)
    for (let i = 0; i < 5; i++) {
      ;[-14, 14].forEach((x) => {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 14, 24), gold)
        pillar.position.set(x, y0 + 7, DOOR_Z - 10 - i * 15)
        hotel.add(pillar)
      })
    }
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(10, lobbyLength - 8), new THREE.MeshStandardMaterial({ color: 0x4a2fd0, roughness: 0.92 }))
    rug.rotation.x = -Math.PI / 2
    rug.position.set(0, y0 + 0.26, DOOR_Z - lobbyLength / 2)
    hotel.add(rug)
    box(14, 2.4, 2.4, 16, y0 + 1.2, DOOR_Z - 40, gold).rotation.y = Math.PI / 2
    this.chandelier.position.set(0, y0 + 11.5, DOOR_Z - 48)
    const bulb = new THREE.MeshBasicMaterial({ color: 0xfff0c8, toneMapped: false })
    const bulbGeometry = new THREE.SphereGeometry(0.13, 8, 6)
    ;[[4.4, 26, 0], [3.2, 20, -1.1], [2, 14, -2.2], [0.9, 8, -3.1]].forEach(([r, n, y]) => {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2
        const light = new THREE.Mesh(bulbGeometry, bulb)
        light.position.set(Math.cos(a) * r, y + Math.sin(a * 3) * 0.14, Math.sin(a) * r)
        this.chandelier.add(light)
      }
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.05, 8, 40), gold)
      ring.rotation.x = Math.PI / 2
      ring.position.y = y
      this.chandelier.add(ring)
    })
    hotel.add(this.chandelier)
    const warm = new THREE.PointLight(0xffd9a0, 900, 70, 1.8)
    warm.position.copy(this.chandelier.position).add(new THREE.Vector3(0, -2, 0))
    const warmer = new THREE.PointLight(0xffc98a, 500, 60, 1.8)
    warmer.position.set(0, y0 + 9, DOOR_Z - 14)
    hotel.add(warm, warmer)

    // The terrace behind the lobby and an infinity pool beside it.
    const terrace = new THREE.Mesh(new THREE.BoxGeometry(150, 1, 32), plaster)
    terrace.position.set(0, y0 - 0.45, LOBBY_END_Z - 15)
    terrace.receiveShadow = true
    hotel.add(terrace)
    const pool = new THREE.Mesh(new THREE.BoxGeometry(46, 0.2, 18), new THREE.MeshPhysicalMaterial({ color: 0x15d7d0, roughness: 0.05, clearcoat: 1, emissive: 0x0a9d96, emissiveIntensity: 0.5 }))
    pool.position.set(46, y0 + 0.1, LOBBY_END_Z - 15)
    hotel.add(pool)
    ;[-1, 1].forEach((side) => box(58, 1.1, 0.14, side * 40, y0 + 0.6, LOBBY_END_Z - 31, glass))
    this.scene.add(hotel)
  }

  private buildBungee() {
    const y0 = PLATEAU + 0.1
    const steel = new THREE.MeshStandardMaterial({ color: 0x2b3148, metalness: 0.8, roughness: 0.4 })
    const gold = new THREE.MeshStandardMaterial({ color: 0xe6ad45, metalness: 1, roughness: 0.22 })
    const deck = new THREE.Mesh(new THREE.BoxGeometry(5, 0.35, 22), steel)
    deck.position.set(0, y0 - 0.2, PLATFORM_Z + 9.5)
    const arch = new THREE.Group()
    ;[-2.6, 2.6].forEach((x) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.28, 9, 0.28), gold)
      post.position.set(x, y0 + 4.5, PLATFORM_Z - 0.4)
      arch.add(post)
    })
    const beam = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.3, 0.3), gold)
    beam.position.set(0, y0 + 9, PLATFORM_Z - 0.4)
    arch.add(beam)
    this.scene.add(deck, arch)

    // A jumper: bright enough to follow all the way down.
    const suit = new THREE.MeshStandardMaterial({ color: 0xf0512e, roughness: 0.55 })
    const skin = new THREE.MeshStandardMaterial({ color: 0xc58a5c, roughness: 0.7 })
    const limb = (length: number, radius: number, material: THREE.Material) => new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 4, 10), material)
    const torso = limb(0.62, 0.21, suit)
    torso.position.y = 1.12
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 12), skin)
    head.position.y = 1.72
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.185, 16, 10, 0, Math.PI * 2, 0, 1.5), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }))
    helmet.position.y = 1.74
    this.jumper.add(torso, head, helmet)
    ;[-1, 1].forEach((side) => {
      const arm = limb(0.55, 0.075, suit)
      arm.position.set(side * 0.46, 1.42, 0)
      arm.rotation.z = side * 1.25
      const leg = limb(0.7, 0.095, new THREE.MeshStandardMaterial({ color: 0x20245a, roughness: 0.7 }))
      leg.position.set(side * 0.13, 0.42, 0)
      this.jumper.add(arm, leg)
    })
    this.jumper.scale.setScalar(1.5)
    this.scene.add(this.jumper)
    this.cord = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1, 8), new THREE.MeshStandardMaterial({ color: 0xffc83d, roughness: 0.45, emissive: 0x6a4300 }))
    this.scene.add(this.cord)
  }

  private applySky(t: number) {
    let i = 0
    while (i < SKY_KEYS.length - 2 && t > SKY_KEYS[i + 1].at) i++
    const a = SKY_KEYS[i]
    const b = SKY_KEYS[i + 1]
    const k = smooth((t - a.at) / (b.at - a.at))
    const u = this.skyUniforms
    u.uTop.value.set(a.top).lerp(new THREE.Color(b.top), k)
    u.uHorizon.value.set(a.horizon).lerp(new THREE.Color(b.horizon), k)
    u.uSunColor.value.set(a.sun).lerp(new THREE.Color(b.sun), k)
    u.uSunDir.value.set(...a.dir).lerp(new THREE.Vector3(...b.dir), k).normalize()
    ;(this.scene.fog as THREE.Fog).color.copy(u.uHorizon.value)
    this.sun.color.copy(u.uSunColor.value)
    this.sun.intensity = mix(3.2, 2.1, band(0.45, 1, t))
    this.hemi.color.copy(u.uTop.value).lerp(new THREE.Color(0xffffff), 0.55)
    this.hemi.intensity = mix(1.25, 0.8, band(0.5, 1, t))
    const dusk = band(0.42, 0.72, t)
    this.windows.forEach((m) => (m.emissiveIntensity = dusk * 1.5))
  }

  playOpening() {
    if (this.still) return
    this.flashAt = this.clock.getElapsedTime()
  }

  setProgress(p: number) {
    this.target = clamp01(p)
    if (!this.running && this.still) this.draw(true)
  }

  resize() {
    const parent = this.renderer.domElement.parentElement
    if (!parent) return
    this.renderer.setSize(parent.clientWidth, parent.clientHeight, false)
    this.camera.aspect = parent.clientWidth / parent.clientHeight
    this.camera.updateProjectionMatrix()
    if (!this.running && this.still) this.draw(true)
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
    window.removeEventListener("pointermove", this.onPointer)
    this.renderer.dispose()
  }

  private loop = () => {
    if (!this.running) return
    this.draw(false)
    this.frame = requestAnimationFrame(this.loop)
  }

  private curveAt(t: number) {
    let i = 0
    while (i < CAMERA_KEYS.length - 2 && t > CAMERA_KEYS[i + 1].at) i++
    const a = CAMERA_KEYS[i]
    const b = CAMERA_KEYS[i + 1]
    return (i + (t - a.at) / (b.at - a.at)) / (CAMERA_KEYS.length - 1)
  }

  private draw(immediate: boolean) {
    const time = this.still ? 8 : this.clock.getElapsedTime()
    // Heavy, like a camera on a crane: the scroll leads and the shot catches up.
    this.progress = immediate ? this.target : this.progress + (this.target - this.progress) * 0.075
    const t = this.progress
    this.applySky(t)

    // ---- The flight. Scroll carries it down through the cloud to the sand.
    const flight = clamp01(t / 0.27)
    const fall = smooth(clamp01((flight - 0.1) / 0.68))
    const px = 0
    const py = mix(61, 4.75, fall)
    const pz = mix(-70, -1048, 1 - (1 - flight) ** 1.6)
    const flare = band(0.62, 0.8, flight) * (1 - band(0.8, 0.9, flight))
    const landed = flight > 0.8
    let flash = 1
    if (this.flashAt >= 0) {
      flash = clamp01((time - this.flashAt) / 1.9)
      if (flash >= 1) this.flashAt = -1
    }
    const rush = 1 - (1 - flash) ** 4
    const hover = this.still || landed ? 0 : Math.sin(time * 0.7) * 0.5
    this.plane.position.set(px + (1 - rush) * -7, py + hover + (1 - rush) * 7, pz + (1 - rush) * 140)
    this.plane.rotation.set(flare * 0.1 - (1 - fall) * 0.02 + (fall > 0 && fall < 1 ? -0.05 * (1 - flare) : 0) * (landed ? 0 : 1), 0, (landed ? 0 : Math.sin(time * 0.45) * 0.035) + (1 - rush) * 0.5)
    const gearOut = band(0.45, 0.62, flight)
    this.gear.forEach((leg) => {
      leg.visible = gearOut > 0.01
      leg.scale.y = gearOut
    })

    // Sand kicks up where the wheels touch.
    const touch = clamp01((flight - 0.78) / 0.2)
    this.dust.forEach((puff, i) => {
      const local = clamp01(touch * 1.3 - (i % 5) * 0.06)
      const on = local > 0 && local < 1
      puff.sprite.visible = on
      if (!on) return
      const size = 3 + local * 18
      puff.sprite.position.set(puff.dir.x * local * 14, 1.5 + puff.dir.y * local * 8, -880 + puff.dir.z * local * 26 - i * 6)
      puff.sprite.scale.set(size, size * 0.7, 1)
      ;(puff.sprite.material as THREE.SpriteMaterial).opacity = (1 - local) * 0.8
    })

    // ---- The camera.
    const u = this.curveAt(t)
    const pos = this.posCurve.getPoint(u)
    const look = this.lookCurve.getPoint(u)
    const riding = band(0.628, 0.655, t) * (1 - band(0.78, 0.825, t))
    if (riding > 0) {
      const drop = clamp01((t - 0.635) / 0.125)
      const rebound = band(0.76, 0.81, t) * (1 - band(0.81, 0.86, t) * 0.55)
      const jy = PLATEAU + 0.4 - drop ** 2.05 * 96 + rebound * 42
      const jz = PLATFORM_Z - 3 - drop * 32
      pos.lerp(new THREE.Vector3(-6.5, jy + 7.5, jz + 7), riding)
      look.lerp(new THREE.Vector3(1.4, jy - 3, jz - 4), riding)
    }
    this.camera.position.copy(pos)
    if (!this.still) {
      this.pointerNow.lerp(this.pointer, 0.05)
      const inside = t > 0.47 && t < 0.6 ? 0.25 : 1
      this.camera.position.x += this.pointerNow.x * 1.6 * inside
      this.camera.position.y -= this.pointerNow.y * 0.9 * inside
    }
    this.lookNow.lerp(look, immediate || this.lookNow.lengthSq() === 0 ? 1 : 0.18)
    this.camera.lookAt(this.lookNow)
    const falling = band(0.63, 0.67, t) * (1 - band(0.74, 0.79, t))
    const fov = 50 + (1 - rush) * 34 + falling * 28 + band(0.47, 0.5, t) * (1 - band(0.57, 0.6, t)) * 14
    if (Math.abs(this.camera.fov - fov) > 0.01) {
      this.camera.fov = fov
      this.camera.updateProjectionMatrix()
    }
    if (!this.still) {
      const shake = (1 - rush) * 0.7 + falling * 0.12 + band(0.17, 0.215, t) * (1 - band(0.215, 0.24, t)) * 0.35
      this.camera.position.x += Math.sin(time * 61) * shake
      this.camera.position.y += Math.sin(time * 83) * shake
    }

    // ---- The hotel doors open as you reach them.
    const open = band(0.44, 0.48, t)
    this.doors.forEach((hinge) => (hinge.rotation.y = (hinge.userData.side as number) * open * 1.75))
    if (!this.still) this.chandelier.rotation.y = time * 0.08

    // ---- The jump.
    const leap = band(0.625, 0.65, t)
    const drop = clamp01((t - 0.635) / 0.125)
    const rebound = band(0.76, 0.81, t) * (1 - band(0.81, 0.86, t) * 0.55)
    const jy = PLATEAU + 0.4 - drop ** 2.05 * 96 + rebound * 42
    const jz = PLATFORM_Z - leap * 3 - drop * 32
    this.jumper.position.set(0, jy, jz)
    this.jumper.rotation.x = -leap * Math.PI * 0.98
    this.jumper.rotation.y = this.still ? 0 : drop * 3
    const anchor = new THREE.Vector3(0, PLATEAU + 9, PLATFORM_Z - 0.4)
    const feet = this.jumper.position.clone().add(new THREE.Vector3(0, leap * 1.2, 0))
    const span = feet.clone().sub(anchor)
    this.cord.position.copy(anchor).addScaledVector(span, 0.5)
    this.cord.scale.y = span.length()
    this.cord.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), span.clone().normalize())

    // ---- Speed: streaks around the lens on the rush in and on the way down.
    const speed = Math.max(1 - rush, falling * 0.8, band(0.1, 0.17, t) * (1 - band(0.2, 0.25, t)) * 0.28)
    this.streaks.visible = speed > 0.02 && !this.still
    if (this.streaks.visible) {
      ;(this.streaks.material as THREE.MeshBasicMaterial).opacity = speed * 0.32
      const dummy = streakDummy
      const forward = new THREE.Vector3()
      this.camera.getWorldDirection(forward)
      this.streakSeeds.forEach((s, i) => {
        const along = ((time * 150 + s.z) % 90) - 8
        dummy.position.copy(this.camera.position).addScaledVector(forward, 82 - along)
        dummy.position.x += s.x
        dummy.position.y += s.y
        dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), forward)
        dummy.scale.set(1, 1, s.len * (0.5 + speed))
        dummy.updateMatrix()
        this.streaks.setMatrixAt(i, dummy.matrix)
      })
      this.streaks.instanceMatrix.needsUpdate = true
    }

    // ---- Clouds warm up with the light.
    const warmth = band(0.45, 0.9, t)
    const tint = cloudTint.set(0xffffff).lerp(cloudEvening, warmth)
    this.clouds.forEach((cloud, i) => {
      const m = cloud.material as THREE.SpriteMaterial
      m.color.copy(tint)
      if (!this.still) cloud.position.x += Math.sin(i) * 0.012
    })

    const sea = this.sea.uniforms
    sea.uTime.value = time
    sea.uCam.value.copy(this.camera.position)
    
    this.sun.target.position.set(Math.round(this.lookNow.x / 6) * 6, Math.round(this.lookNow.y / 6) * 6, Math.round(this.lookNow.z / 6) * 6)
    this.sun.position.copy(this.sun.target.position).addScaledVector(this.skyUniforms.uSunDir.value, 420)
    const box = this.sun.shadow.camera as THREE.OrthographicCamera
    box.left = box.bottom = -150
    box.right = box.top = 150
    box.updateProjectionMatrix()
    this.renderer.render(this.scene, this.camera)
  }
}

const streakDummy = new THREE.Object3D()
const cloudTint = new THREE.Color()
const cloudEvening = new THREE.Color("#FFB98A")
