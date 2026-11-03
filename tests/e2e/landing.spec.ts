import { expect, test } from "@playwright/test"

test.use({ locale: "en-GB", timezoneId: "Europe/London" })

test("the trips waitlist opens the early-access page", async ({ page }) => {
  await page.goto("/#chapter-guide")

  await page.getByRole("link", { name: "Join the trips waitlist" }).last().click()

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

test("pricing page says what is free and what is not priced yet", async ({ page }) => {
  await page.goto("/pricing/")

  await expect(page.getByRole("heading", { name: "Free to start." })).toBeVisible()
  await expect(page.getByRole("heading", { name: "What we haven't priced yet." })).toBeVisible()
})

test("secondary page conversion CTAs target the early access page", async ({ page }) => {
  const ctas = [
    { path: "/features/", name: "Join the trips waitlist" },
    { path: "/how-it-works/", name: "Join the trips waitlist" },
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
  const menu = page.locator("#mobile-navigation")
  await expect(menu.getByRole("link", { name: "Trips" })).toBeVisible()
  await expect(menu.getByRole("link", { name: "Open PayaGo" })).toHaveAttribute("href", "https://app.payago.in")
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

test("the home page says what is live and sends people to the app", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Share the wallet")
  await expect(page.getByRole("link", { name: "Open PayaGo" }).first()).toHaveAttribute("href", "https://app.payago.in")
})

test("an expense joins the orbit and plain chat stays chat", async ({ page }) => {
  await page.goto("/#chapter-type")
  const note = page.getByTestId("expense-note")

  await page.getByLabel("Type an expense").fill("£84 dinner")
  await page.getByRole("button", { name: "Send" }).click()
  await expect(note).toContainText("Dinner joined the orbit")
  await expect(note).toContainText("£21.00")

  await page.getByLabel("Type an expense").fill("table for 4")
  await page.getByRole("button", { name: "Send" }).click()
  await expect(note).toContainText("stays chat")
})

test("a trip gets three example plans, marked as a preview", async ({ page }) => {
  await page.goto("/#chapter-trips")

  await page.getByLabel("Describe a trip").fill("10 days in Bali for 2 people")
  await page.getByRole("button", { name: "Go" }).click()
  await expect(page.getByTestId("trip-plans")).toContainText("10 days in Bali for 2")
  await expect(page.getByTestId("trip-plans")).toContainText("Premium")
  await expect(page.getByText("A preview of what we're building. Plans and prices here are examples.")).toBeVisible()
})

test("pages about trips say they are not live yet", async ({ page }) => {
  for (const path of ["/destinations/", "/destinations/tokyo/", "/blog/ai-travel-planning-2026/", "/trip/"]) {
    await page.goto(path)
    await expect(page.getByText("This page talks about whole trips, which are coming.")).toBeVisible()
  }

  await page.goto("/features/")
  await expect(page.getByRole("heading", { name: "Trips.", exact: true })).toBeVisible()
  await expect(page.getByText("Coming after").first()).toBeVisible()
})

test("the nav's Open PayaGo button stays navy on every kind of page", async ({ page }) => {
  for (const path of ["/", "/features/", "/privacy/"]) {
    await page.goto(path)
    const button = page.getByRole("navigation").first().getByRole("link", { name: "Open PayaGo" }).first()
    await expect(button).toHaveCSS("background-color", "rgb(15, 23, 42)")
  }
})

test.describe("a visitor in India", () => {
  test.use({ locale: "en-IN", timezoneId: "Asia/Kolkata" })

  test("sees rupees, and trips from Delhi", async ({ page }) => {
    await page.goto("/#chapter-type")
    await expect(page.getByRole("button", { name: "₹840 dinner" })).toBeVisible()
    await page.goto("/#chapter-trips")
    await expect(page.getByTestId("trip-plans")).toContainText("from Delhi")
    await expect(page.getByTestId("trip-plans")).toContainText("₹")
  })
})

test("the home page shows the real app and only the store that is live", async ({ page }) => {
  await page.goto("/#chapter-app")
  await expect(page.getByRole("heading", { name: "This is the real app." })).toBeVisible()
  await expect(page.getByRole("link", { name: "Get it on Google Play" }).first()).toHaveAttribute("href", /play\.google\.com.*com\.payago\.app/)
  await expect(page.getByRole("link", { name: /app store/i })).toHaveCount(0)
})

test("the delete account page says how, and what is kept", async ({ page }) => {
  await page.goto("/delete-account/")
  await expect(page.getByRole("heading", { name: "Delete your account" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "What is kept" })).toBeVisible()
  await expect(page.getByRole("link", { name: "privacy@payago.in" })).toHaveAttribute("href", /^mailto:privacy@payago\.in/)
})

test("split, wallet and trips get the same share of the journey", async () => {
  const { CHAPTERS } = await import("../../lib/universe/chapters")
  const share = (first: keyof typeof CHAPTERS, last: keyof typeof CHAPTERS) => CHAPTERS[last][1] - CHAPTERS[first][0]
  expect(share("type", "settle")).toBeCloseTo(share("own", "cards"))
  expect(share("own", "cards")).toBeCloseTo(share("trips", "guide"))
})

test("a trip for 3 stays a trip for 3, with or without the word people", async ({ page }) => {
  await page.goto("/#chapter-trips")
  await page.getByLabel("Describe a trip").fill("5 days in New York for 3")
  await page.keyboard.press("Enter")
  await expect(page.getByTestId("trip-plans")).toContainText("for 3")
})
