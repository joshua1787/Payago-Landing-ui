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

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Plan every trip")
  await expect(page.getByRole("link", { name: "Open PayaGo" }).first()).toHaveAttribute("href", "https://app.payago.in")
})

test("an expense joins the orbit and plain chat stays chat", async ({ page }) => {
  await page.goto("/#chapter-type")
  const note = page.getByTestId("expense-note")

  await page.getByLabel("Type an expense").fill("£84 dinner")
  await page.getByRole("button", { name: "Send" }).click()
  await expect(note).toContainText("Dinner")
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
  await expect(page.getByRole("heading", { name: "End-to-end trips.", exact: true })).toBeVisible()
  await expect(page.getByText("Coming", { exact: true }).first()).toBeVisible()
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

test("trips lead the page, with split and wallet still in it", async ({ page }) => {
  await page.goto("/")
  const top = (name: string) => page.evaluate((id) => document.getElementById(id)?.getBoundingClientRect().top ?? -1, `chapter-${name}`)
  const [trips, guide, type, cards] = [await top("trips"), await top("guide"), await top("type"), await top("cards")]
  expect(trips).toBeGreaterThan(0)
  expect(trips).toBeLessThan(guide)
  expect(guide).toBeLessThan(type)
  expect(type).toBeLessThan(cards)
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Plan every trip.")
})

test("a trip for 3 stays a trip for 3, with or without the word people", async ({ page }) => {
  await page.goto("/#chapter-trips")
  await page.getByLabel("Describe a trip").fill("5 days in New York for 3")
  await page.keyboard.press("Enter")
  await expect(page.getByTestId("trip-plans")).toContainText("for 3")
})

test("an admin can sign in with a code and act on a report", async ({ page }) => {
  let reports = [
    {
      id: 7,
      reported_at: "2026-11-04T10:00:00Z",
      body: '[payago-card]{"title":"Rent","amount":"£100.00"}',
      message_removed: false,
      group: "Flat 3B",
      reporter: "Asha",
      author_id: "a1",
      author: "Rude Rob",
      author_email: "rob@example.com",
      author_suspended: false,
    },
  ]
  const acted: string[] = []
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  }
  await page.route("**/api/v1/**", async (route) => {
    const url = route.request().url()
    if (route.request().method() === "OPTIONS") return route.fulfill({ status: 204, headers })
    if (url.endsWith("/auth/email-otp/request")) return route.fulfill({ json: {}, headers })
    if (url.endsWith("/auth/email-otp/verify")) return route.fulfill({ json: { access_token: "t" }, headers })
    if (url.endsWith("/admin/moderation/reports")) return route.fulfill({ json: { reports, blocks_total: 2 }, headers })
    acted.push(url.split("/admin/moderation/")[1])
    reports = []
    return route.fulfill({ json: {}, headers })
  })
  page.on("dialog", (dialog) => dialog.accept())

  await page.goto("/admin/moderation/")
  await expect(page.getByLabel("Admin email")).toHaveValue("joshuacto@payago.in")
  await page.getByRole("button", { name: "Email me a code" }).click()
  await page.getByLabel("Code from your email").fill("123456")
  await page.getByRole("button", { name: "Sign in" }).click()

  await expect(page.getByTestId("report")).toContainText("Expense card: Rent £100.00")
  await expect(page.getByTestId("report")).toContainText("Rude Rob")
  await page.getByRole("button", { name: "Remove message" }).click()

  await expect(page.getByText("Nothing to review.")).toBeVisible()
  expect(acted).toEqual(["reports/7/remove-message"])
})

test("the waitlist admin signs in with an emailed code, not a password", async ({ page }) => {
  const sent: string[] = []
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  }
  await page.route("**/api/v1/**", async (route) => {
    const url = route.request().url()
    if (route.request().method() === "OPTIONS") return route.fulfill({ status: 204, headers })
    if (url.includes("/auth/email-otp/")) sent.push(`${url.split("/").pop()} ${route.request().postData()}`)
    if (url.endsWith("/auth/email-otp/verify")) return route.fulfill({ json: { access_token: "t" }, headers })
    if (url.includes("/admin/waitlist")) return route.fulfill({ status: 403, json: {}, headers })
    return route.fulfill({ json: {}, headers })
  })

  await page.goto("/admin/waitlist/")
  await expect(page.getByLabel("Email")).toHaveValue("joshuacto@payago.in")
  await expect(page.getByLabel("Password")).toHaveCount(0)
  await page.getByRole("button", { name: "Email me a code" }).click()
  await page.getByLabel("Code from your email").fill("123456")
  await page.getByRole("button", { name: "Open dashboard" }).click()

  await expect.poll(() => sent.length).toBe(2)
  expect(sent[0]).toContain("joshuacto@payago.in")
  expect(sent[1]).toContain('"code":"123456"')
})

test("how it works shows money in the visitor's own currency", async ({ browser }) => {
  const india = await browser.newContext({ timezoneId: "Asia/Kolkata", locale: "en-IN" })
  const page = await india.newPage()
  await page.goto("/how-it-works/")
  await expect(page.getByText("₹640 left for today")).toBeVisible()
  await expect(page.getByText("£24 left for today")).toHaveCount(0)
  await india.close()

  const uk = await browser.newContext({ timezoneId: "Europe/London", locale: "en-GB" })
  const ukPage = await uk.newPage()
  await ukPage.goto("/how-it-works/")
  await expect(ukPage.getByText("£24 left for today")).toBeVisible()
  await uk.close()
})

test("the film's files load and the words move with the scroll", async ({ page }) => {
  for (const scene of ["flight", "hotel", "table", "earth"]) {
    for (const file of ["wide.mp4", "lite.mp4", "tall.mp4", "slow.mp4", "wide.jpg", "tall.jpg"]) {
      expect((await page.request.get(`/film/${scene}-${file}`)).ok()).toBe(true)
    }
  }
  for (const file of [] as string[]) {
    expect((await page.request.get(`/film/${file}`)).ok()).toBe(true)
  }
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Plan every trip.")
  await page.evaluate(() => {
    const film = document.querySelector("[data-testid=film]") as HTMLElement
    window.scrollTo(0, film.offsetTop + (film.offsetHeight - innerHeight) * 0.85)
  })
  await expect(page.getByRole("heading", { name: "Every trip starts with the flight." })).toBeVisible()
})

test("the first scroll shows the part that works today", async ({ browser }) => {
  const india = await browser.newContext({ timezoneId: "Asia/Kolkata", locale: "en-IN" })
  const page = await india.newPage()
  await page.goto("/")
  await expect(page.getByText("Free to start, in India and the UK.")).toBeVisible()
  await page.evaluate(() => {
    const film = document.querySelector("[data-testid=film]") as HTMLElement
    window.scrollTo(0, film.offsetTop + (film.offsetHeight - innerHeight) * 0.2)
  })
  const live = page.getByTestId("film-live")
  await expect(live.getByRole("heading", { name: "Send a bill. Everyone sees their share." })).toBeVisible()
  await expect(live).toContainText("sign up free")
  await india.close()
})

