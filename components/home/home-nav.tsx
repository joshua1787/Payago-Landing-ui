"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { PayagoWordmark } from "@/components/payago-wordmark"
import { Menu, X } from "lucide-react"

import { captureEvent } from "@/lib/analytics"

const LINKS: { name: string; href: string }[] = [
  { name: "How it works", href: "/how-it-works/" },
  { name: "Trips", href: "/#chapter-trips" },
  { name: "Split & Wallet", href: "/#chapter-type" },
  { name: "Pricing", href: "/pricing/" },
  { name: "About", href: "/about/" },
  { name: "Blog", href: "/blog/" },
]

export function HomeNav({ appUrl }: { appUrl: string }) {
  const [open, setOpen] = useState(false)
  const onHome = usePathname() === "/"
  const [overFilm, setOverFilm] = useState(onHome)

  // Over the film the bar is see-through, so the sky runs to the top of the screen.
  useEffect(() => {
    const onScroll = () => {
      const film = document.querySelector<HTMLElement>("[data-testid=film]")
      setOverFilm(Boolean(film) && window.scrollY < (film!.offsetHeight - window.innerHeight) * 0.985)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const clear = overFilm && !open

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        clear ? "bg-gradient-to-b from-[#0F172A]/45 to-transparent" : open ? "bg-white" : "bg-white/95"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        <a href="/" aria-label="PayaGo home" className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]">
          <PayagoWordmark className={`text-[1.5rem] ${clear ? "text-white [&_*]:!text-white" : "text-[#0F172A]"}`} />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <a key={link.name} href={link.href} className={`text-[15px] transition-colors ${clear ? "text-white [text-shadow:0_1px_12px_rgba(10,16,40,0.55)] hover:text-white/75" : "text-[#475569] hover:text-[#0F172A]"} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]`}>
              {link.name}
            </a>
          ))}
        </div>

        <a
          href={appUrl}
          onClick={() => captureEvent("navbar_desktop_cta_click")}
          className="hidden rounded-full bg-[#0F172A] text-white px-5 py-2.5 font-display text-[14px] font-semibold    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF] lg:inline-block"
        >
          Open PayaGo
        </a>

        <button
          type="button"
          className={`rounded-lg p-2 lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF] ${clear ? "text-white" : "text-[#0F172A]"}`}
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
            <a key={link.name} href={link.href} onClick={() => setOpen(false)} className="py-3 text-[17px] text-[#334155]">
              {link.name}
            </a>
          ))}
          <a href={appUrl} className="mt-3 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white transition-opacity hover:opacity-90 py-3.5 text-center font-display text-[15px] font-semibold ">
            Open PayaGo
          </a>
        </div>
      )}
    </nav>
  )
}
