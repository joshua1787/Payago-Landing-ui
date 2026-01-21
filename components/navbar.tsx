"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = {
    product: [
        { name: "How it works", href: "/how-it-works" },
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "FAQ", href: "/faq" },
    ],
    company: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
        { name: "Careers", href: "/careers" },
    ],
}

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#04060A]/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
                            <img src="/payago-logo.jpg" alt="PayaGo" className="w-full h-full object-cover scale-[1.35]" />
                        </div>
                        <span className="text-white font-bold text-2xl tracking-tight">PayaGo</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {/* Product Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('product')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="text-white/70 hover:text-white transition-colors py-2 flex items-center gap-1">
                                Product
                                <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'product' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {activeDropdown === 'product' && (
                                <div className="absolute top-full left-0 pt-2">
                                    <div className="bg-[#0B1220] border border-white/10 rounded-xl p-2 min-w-[180px] shadow-2xl">
                                        {navItems.product.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Company Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('company')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="text-white/70 hover:text-white transition-colors py-2 flex items-center gap-1">
                                Company
                                <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'company' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {activeDropdown === 'company' && (
                                <div className="absolute top-full left-0 pt-2">
                                    <div className="bg-[#0B1220] border border-white/10 rounded-xl p-2 min-w-[180px] shadow-2xl">
                                        {navItems.company.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link
                            href="/"
                            className="bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1E3A5F] px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm"
                        >
                            Get Early Access
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-white p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden border-t border-white/5 bg-[#04060A]">
                    <div className="px-6 py-4 space-y-4">
                        <div>
                            <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Product</div>
                            {navItems.product.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block py-2 text-white/70 hover:text-white transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div>
                            <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Company</div>
                            {navItems.company.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block py-2 text-white/70 hover:text-white transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <Link
                            href="/"
                            className="block w-full text-center bg-gradient-to-r from-[#C9A962] to-[#E5C77D] text-[#1E3A5F] px-6 py-3 rounded-xl font-semibold mt-4"
                            onClick={() => setIsOpen(false)}
                        >
                            Get Early Access
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
