import { expect, test } from "@playwright/test"

test("hero CTA opens the early-access page", async ({ page }) => {
  await page.goto("/")

  await page
    .getByRole("link", { name: "Join the PayaGo early-access waitlist" })
    .click()

  await expect(page).toHaveURL(/\/early-access\/$/)
  await expect(
    page.getByRole("heading", { name: /welcome to the payago golden passport club/i }),
  ).toBeVisible()
  await expect(
    page.getByText("This is a collectible membership product issued by Payago and is not a government-issued passport or travel document.").first(),
  ).toBeVisible()
})

test("golden passport claim submits to the configured waitlist endpoint", async ({ page }) => {
  const waitlistRequest: { payload: Record<string, unknown> | null } = { payload: null }

  await page.route("**/*", async (route) => {
    const request = route.request()
    const postData = request.postData()

    if (request.method() === "POST" && postData?.includes('"interest":"golden-passport-club"')) {
      waitlistRequest.payload = JSON.parse(postData) as Record<string, unknown>

      await route.fulfill({
        status: 202,
        contentType: "application/json",
        headers: {
          "access-control-allow-origin": "*",
        },
        body: JSON.stringify({ accepted: true, ok: true }),
      })
      return
    }

    await route.continue()
  })

  await page.goto("/early-access/?c=universal-qr&ref=GP-2026-ABCD1234")

  await page.getByLabel("Email for Golden Passport Club").fill("founder@example.com")
  await expect(page.getByLabel(/referral code or inviter email/i)).toHaveValue("GP-2026-ABCD1234")
  await page.getByRole("button", { name: "Claim founding place" }).click()

  await expect(
    page.getByRole("heading", { name: /you are on the golden passport list/i }),
  ).toBeVisible()
  expect(waitlistRequest.payload?.email).toBe("founder@example.com")
  expect(waitlistRequest.payload?.source).toBe("qr-universal-qr")
  expect(waitlistRequest.payload?.campaign).toBe("universal-qr")
  expect(waitlistRequest.payload?.page).toBe("/early-access")
  expect(waitlistRequest.payload?.interest).toBe("golden-passport-club")
  expect(waitlistRequest.payload?.referrer).toBe("GP-2026-ABCD1234")

  const metadata = waitlistRequest.payload?.metadata as Record<string, unknown> | undefined
  expect(metadata?.url_referral).toBe("GP-2026-ABCD1234")
  expect(metadata?.referral_source).toBe("url_ref")
  if (metadata?.browser_referrer) {
    expect(typeof metadata.browser_referrer).toBe("string")
  }
})

test("universal QR route redirects to early access with campaign parameters", async ({ page }) => {
  await page.goto("/qr/?c=launch-party&ref=poster&utm_source=stall")

  await expect.poll(() => page.url()).toContain("/early-access/")

  const redirectedUrl = new URL(page.url())
  expect(redirectedUrl.pathname).toBe("/early-access/")
  expect(redirectedUrl.searchParams.get("c")).toBe("launch-party")
  expect(redirectedUrl.searchParams.get("ref")).toBe("poster")
  expect(redirectedUrl.searchParams.get("utm_source")).toBe("stall")
  expect(redirectedUrl.searchParams.get("utm_medium")).toBe("offline")
  expect(redirectedUrl.searchParams.get("utm_campaign")).toBe("universal_qr")
})

test("pricing page loads the early-access plan", async ({ page }) => {
  await page.goto("/pricing/")

  await expect(page.getByRole("heading", { name: /start planning in early access/i })).toBeVisible()
  await expect(page.getByText("Free to join early access")).toBeVisible()
  await expect(page.getByRole("heading", { name: "Simple plans" })).toBeVisible()
})

test("secondary page conversion CTAs target the early access page", async ({ page }) => {
  const ctas = [
    { path: "/pricing/", name: "Get Early Access" },
    { path: "/about/", name: "Get Early Access" },
    { path: "/features/", name: "Get Early Access" },
    { path: "/how-it-works/", name: "Get Early Access" },
    { path: "/faq/", name: "Get Early Access" },
    { path: "/blog/", name: "Get Early Access" },
    { path: "/blog/why-we-built-payago/", name: "Get Early Access" },
    { path: "/blog/best-group-travel-apps-2026/", name: "Get Early Access" },
    { path: "/blog/how-to-split-travel-costs/", name: "Get Early Access" },
    { path: "/blog/group-travel-tokyo-itinerary/", name: "Get Early Access" },
    { path: "/blog/ai-travel-planning-2026/", name: "Get Early Access" },
    { path: "/blog/barcelona-group-trip-budget/", name: "Get Early Access" },
    { path: "/blog/best-european-cities-group-travel/", name: "Plan Your Group Trip" },
  ]

  for (const cta of ctas) {
    await page.goto(cta.path)
    await expect(page.getByRole("link", { name: cta.name }).last()).toHaveAttribute(
      "href",
      "/early-access/",
    )
  }

  await page.goto("/pricing/")
  await expect(page.getByRole("link", { name: "Contact Us" })).toHaveAttribute("href", "/contact/")
})

test("mobile menu opens and exposes navigation links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  await page.getByRole("button", { name: "Open navigation menu" }).click()

  await expect(page.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute(
    "aria-expanded",
    "true",
  )
  await expect(page.getByRole("link", { name: "Pricing" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Get Early Access" })).toBeVisible()
})

test("cookie banner can be dismissed and persists declined consent", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByRole("dialog", { name: "Cookie consent" })).toBeVisible()
  await page.getByRole("button", { name: "Decline" }).click()

  await expect(page.getByRole("dialog", { name: "Cookie consent" })).toBeHidden()
  await expect(
    page.evaluate(() => window.localStorage.getItem("payago-cookie-consent")),
  ).resolves.toBe("declined")
})
