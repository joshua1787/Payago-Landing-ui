"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import { captureEvent } from "@/lib/analytics"
import { PayagoWordmark } from "@/components/payago-wordmark"
import { TripsNotice } from "@/components/trips-notice"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const aboutTrips = pathname?.startsWith("/trip")

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-[#FAFAF8]/95 shadow-sm">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex h-10 w-[210px] flex-shrink-0 items-center">
                        <PayagoWordmark className="text-[1.55rem]" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {[
                            { name: "How it works", href: "/#how-it-works" },
                            { name: "Today", href: "/#features" },
                            { name: "What's coming", href: "/#next" },
                            { name: "About", href: "/about" },
                            { name: "Blog", href: "/blog" },
                        ].map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-slate-500 hover:text-slate-900 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors duration-200 hover:bg-slate-100"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href="/early-access/"
                            className="relative group px-6 py-2.5 rounded-xl text-sm font-semibold overflow-hidden"
                            onClick={() => captureEvent("navbar_desktop_cta_click")}
                        >
                            <div className="absolute inset-0 bg-[#0B766F] group-hover:bg-[#08524D] transition-colors duration-200" />
                            <span className="relative text-white text-[13px]">Trips waitlist</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-controls="mobile-navigation"
                        aria-expanded={isOpen}
                        onClick={() => {
                            if (!isOpen) {
                                captureEvent("navbar_mobile_menu_open")
                            }
                            setIsOpen(!isOpen)
                        }}
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {aboutTrips && <TripsNotice />}

            {/* Mobile Menu */}
            {isOpen && (
                <div id="mobile-navigation" className="lg:hidden border-t border-slate-200 bg-[#FAFAF8] shadow-sm">
                    <div className="px-6 py-6 space-y-1.5">
                        {[
                            { name: "How it works", href: "/#how-it-works" },
                            { name: "Today", href: "/#features" },
                            { name: "What's coming", href: "/#next" },
                            { name: "About", href: "/about" },
                            { name: "Blog", href: "/blog" },
                        ].map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block py-3 text-slate-600 hover:text-slate-900 transition-colors font-medium text-[15px]"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <a
                            href="/early-access/"
                            className="block w-full text-center bg-[#0B766F] text-white px-6 py-3.5 rounded-xl font-semibold text-[14px] mt-4"
                            onClick={() => {
                                captureEvent("navbar_mobile_cta_click")
                                setIsOpen(false)
                            }}
                        >
                            Trips waitlist
                        </a>
                    </div>
                </div>
            )}
        </nav>
    )
}
