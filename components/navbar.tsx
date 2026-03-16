"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-[#FAFAF8]/90 backdrop-blur-2xl border-b border-slate-200 shadow-sm' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img src="/payago_logo_transparent.png" alt="PayaGo" className="h-10 w-auto object-contain" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {[
                            { name: "How It Works", href: "#how-it-works" },
                            { name: "Features", href: "#features" },
                            { name: "Destinations", href: "/destinations" },
                            { name: "Pricing", href: "/pricing" },
                            { name: "Blog", href: "/blog" },
                        ].map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-slate-500 hover:text-slate-900 px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 hover:bg-slate-100"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href="#early-access"
                            className="relative group px-6 py-2.5 rounded-xl text-sm font-semibold transition-all overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-100 group-hover:opacity-90 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-80 blur-xl transition-opacity duration-700" />
                            <span className="relative text-white text-[13px]">Get Early Access</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden border-t border-slate-200 bg-[#FAFAF8]/95 backdrop-blur-2xl">
                    <div className="px-6 py-6 space-y-1.5">
                        {[
                            { name: "How It Works", href: "#how-it-works" },
                            { name: "Features", href: "#features" },
                            { name: "Destinations", href: "/destinations" },
                            { name: "Pricing", href: "/pricing" },
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
                            href="#early-access"
                            className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3.5 rounded-xl font-semibold text-[14px] mt-4"
                            onClick={() => setIsOpen(false)}
                        >
                            Get Early Access
                        </a>
                    </div>
                </div>
            )}
        </nav>
    )
}
