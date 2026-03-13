import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const siteUrl = "https://www.payago.in"

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date("2026-03-13")

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: siteUrl,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${siteUrl}/how-it-works`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${siteUrl}/features`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${siteUrl}/pricing`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/faq`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/about`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },

        {
            url: `${siteUrl}/destinations`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${siteUrl}/destinations/barcelona`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/destinations/tokyo`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/destinations/lisbon`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/destinations/paris`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/destinations/amsterdam`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/blog`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/blog/how-to-split-travel-costs`,
            lastModified: new Date("2026-03-05"),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${siteUrl}/blog/best-group-travel-apps-2026`,
            lastModified: new Date("2026-03-10"),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${siteUrl}/blog/group-travel-tokyo-itinerary`,
            lastModified: new Date("2026-03-08"),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${siteUrl}/blog/barcelona-group-trip-budget`,
            lastModified: new Date("2026-03-12"),
            changeFrequency: "monthly",
            priority: 0.7,
        },
                {
            url: `${siteUrl}/blog/ai-travel-planning-2026`,
            lastModified: new Date("2026-02-15"),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${siteUrl}/blog/best-european-cities-group-travel`,
            lastModified: new Date("2026-02-12"),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${siteUrl}/blog/why-we-built-payago`,
            lastModified: new Date("2026-02-08"),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${siteUrl}/contact`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: `${siteUrl}/careers`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${siteUrl}/affiliate-disclosure`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${siteUrl}/privacy`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${siteUrl}/terms`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ]

    return staticRoutes
}
