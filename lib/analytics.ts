export type AnalyticsEventValue = string | number | boolean | null | undefined

export type AnalyticsEventParams = Record<string, AnalyticsEventValue>
export type AnalyticsConsentState = "granted" | "denied"
export type AnalyticsConsentChangeDetail = {
    analyticsStorage: AnalyticsConsentState
}

export type GtagConsentParams = {
    analytics_storage: AnalyticsConsentState
    ad_storage?: AnalyticsConsentState
    ad_user_data?: AnalyticsConsentState
    ad_personalization?: AnalyticsConsentState
    wait_for_update?: number
}

type GtagConfigParams = {
    send_page_view?: boolean
}

type GtagFunction = {
    (command: "event", eventName: string, params?: AnalyticsEventParams): void
    (command: "consent", action: "default" | "update", params: GtagConsentParams): void
    (command: "js", date: Date): void
    (command: "config", measurementId: string, params?: GtagConfigParams): void
}

type GtagArguments =
    | ["event", string, AnalyticsEventParams?]
    | ["consent", "default" | "update", GtagConsentParams]
    | ["js", Date]
    | ["config", string, GtagConfigParams?]

const analyticsConsentEvent = "payago:analytics-consent"

declare global {
    interface Window {
        dataLayer?: GtagArguments[]
        gtag?: GtagFunction
        payagoConfiguredGaIds?: string[]
        payagoConsentDefaultSet?: boolean
    }
}

function ensureGtagBase() {
    if (typeof window === "undefined") {
        return
    }

    window.dataLayer = window.dataLayer ?? []

    if (typeof window.gtag !== "function") {
        // gtag.js only processes dataLayer entries that are the raw `arguments`
        // object (this is exactly what Google's official snippet pushes). The
        // previous version spread into a plain array, which gtag.js silently
        // ignores — so no /collect beacon was ever sent and GA received no data.
        window.gtag = function gtag() {
            // eslint-disable-next-line prefer-rest-params
            window.dataLayer?.push(arguments as unknown as GtagArguments)
        } as GtagFunction
    }

    // Consent Mode default MUST be set exactly once, before any config. Re-pushing
    // it (this ran on every enable/re-render) re-denied analytics_storage AFTER it
    // had been granted, so gtag never sent a single /collect beacon — GA showed
    // "No data received". Guard it so it fires only once.
    if (!window.payagoConsentDefaultSet) {
        window.payagoConsentDefaultSet = true
        window.gtag("consent", "default", {
            analytics_storage: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
            wait_for_update: 500,
        })
    }
}

export function enableGoogleAnalytics(measurementId: string) {
    if (typeof window === "undefined" || typeof document === "undefined") {
        return
    }

    ensureGtagBase()

    window.gtag?.("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
    })

    const scriptId = `payago-gtag-${measurementId}`
    if (!document.getElementById(scriptId)) {
        const script = document.createElement("script")
        script.id = scriptId
        script.async = true
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
        document.head.appendChild(script)
    }

    window.payagoConfiguredGaIds = window.payagoConfiguredGaIds ?? []
    if (!window.payagoConfiguredGaIds.includes(measurementId)) {
        window.gtag?.("js", new Date())
        window.gtag?.("config", measurementId)
        window.payagoConfiguredGaIds.push(measurementId)
    }
}

export function setAnalyticsConsent(analyticsStorage: AnalyticsConsentState) {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
        return
    }

    window.gtag("consent", "update", {
        analytics_storage: analyticsStorage,
    })
}

export function notifyAnalyticsConsent(analyticsStorage: AnalyticsConsentState) {
    if (typeof window === "undefined") {
        return
    }

    setAnalyticsConsent(analyticsStorage)
    window.dispatchEvent(
        new CustomEvent<AnalyticsConsentChangeDetail>(analyticsConsentEvent, {
            detail: { analyticsStorage },
        })
    )
}

export function onAnalyticsConsentChange(
    callback: (detail: AnalyticsConsentChangeDetail) => void,
) {
    if (typeof window === "undefined") {
        return () => undefined
    }

    const handler = (event: Event) => {
        const detail = (event as CustomEvent<AnalyticsConsentChangeDetail>).detail
        if (detail?.analyticsStorage === "granted" || detail?.analyticsStorage === "denied") {
            callback(detail)
        }
    }

    window.addEventListener(analyticsConsentEvent, handler)
    return () => window.removeEventListener(analyticsConsentEvent, handler)
}

export function captureEvent(eventName: string, params: AnalyticsEventParams = {}) {
    if (typeof window === "undefined") {
        return
    }

    window.dispatchEvent(
        new CustomEvent("payago:analytics", {
            detail: {
                eventName,
                params,
            },
        })
    )

    if (typeof window.gtag === "function") {
        window.gtag("event", eventName, params)
    }
}
