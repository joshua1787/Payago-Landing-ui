import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "PayaGo",
    short_name: "PayaGo",
    description:
      "AI group travel planning for drafting itineraries, coordinating votes, and managing shared trip decisions.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#0d1220",
    lang: "en-GB",
    categories: ["travel", "productivity"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  }
}
