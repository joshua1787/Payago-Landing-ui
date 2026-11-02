// Builds public/data/land-dots.bin: evenly spaced points on the Earth's land, as
// lat/lng pairs, for the globe. Run once with `node scripts/make-land-dots.mjs`.
import { readFileSync, writeFileSync } from "node:fs"
import { geoContains } from "d3-geo"
import { feature } from "topojson-client"

const world = JSON.parse(readFileSync("node_modules/world-atlas/land-110m.json", "utf8"))
const land = feature(world, world.objects.land)
const SAMPLES = 42000
const golden = Math.PI * (3 - Math.sqrt(5))
const out = []
for (let i = 0; i < SAMPLES; i++) {
  const y = 1 - (i / (SAMPLES - 1)) * 2
  const lat = (Math.asin(y) * 180) / Math.PI
  const lng = ((((golden * i) % (Math.PI * 2)) * 180) / Math.PI + 540) % 360 - 180
  if (geoContains(land, [lng, lat])) out.push(lat, lng)
}
writeFileSync("public/data/land-dots.bin", Buffer.from(new Float32Array(out).buffer))
console.log(`${out.length / 2} dots, ${out.length * 4} bytes`)
