import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "PayaGo",
    short_name: "PayaGo",
    description:
      "Split with your people and see where your own money goes. Cards and whole trips are coming next.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#04201E",
    theme_color: "#04201E",
    lang: "en-GB",
    categories: ["finance", "travel"],
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
