"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { captureEvent } from "@/lib/analytics"

const LINKS = [
  { name: "How it works", href: "/how-it-works/" },
  { name: "Features", href: "/features/" },
  { name: "Trips", href: "/#chapter-trips" },
  { name: "Pricing", href: "/pricing/" },
  { name: "About", href: "/about/" },
  { name: "Blog", href: "/blog/" },
]

export function HomeNav({ appUrl }: { appUrl: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const onHome = usePathname() === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open || !onHome ? "bg-[#04201E]/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5 font-display text-[22px] font-semibold tracking-[-0.03em] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19E4CC]">
          <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-[radial-gradient(circle_at_34%_30%,#FFF0B8,#FFC94F_52%,#C77F12)] text-[14px] font-bold text-[#7A4A06]">£</span>
          PayaGo
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <a key={link.name} href={link.href} className="text-[15px] text-white/75 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19E4CC]">
              {link.name}
            </a>
          ))}
        </div>

        <a
          href={appUrl}
          onClick={() => captureEvent("navbar_desktop_cta_click")}
          className="hidden rounded-full bg-[#fff] px-5 py-2.5 font-display text-[14px] font-semibold text-[#04201E] transition-colors hover:bg-[#D9FBF6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19E4CC] lg:inline-block"
        >
          Open PayaGo
        </a>

        <button
          type="button"
          className="rounded-lg p-2 text-white lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19E4CC]"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="grid gap-1 px-6 pb-6 lg:hidden">
          {LINKS.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setOpen(false)} className="py-3 text-[17px] text-white/85">
              {link.name}
            </a>
          ))}
          <a href={appUrl} className="mt-3 rounded-full bg-[#19E4CC] py-3.5 text-center font-display text-[15px] font-semibold text-[#04201E]">
            Open PayaGo
          </a>
        </div>
      )}
    </nav>
  )
}
