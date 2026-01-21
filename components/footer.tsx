"use client"

import Link from "next/link"
import { Twitter, Linkedin, Instagram, Github, Mail } from "lucide-react"

const footerLinks = {
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
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/privacy" },
  ],
  social: [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Instagram", href: "#", icon: Instagram },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#04060A]">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
                <img src="/payago-logo.jpg" alt="PayaGo" className="w-full h-full object-cover scale-[1.35]" />
              </div>
              <div>
                <span className="text-3xl font-bold text-white block mb-1">PayaGo</span>
                <span className="text-white/40 text-sm tracking-wide">Travel. Pay. Live.</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm mb-6 max-w-xs leading-relaxed">
              The only wallet that splits payments automatically.
              Create group wallets, get virtual cards, and never chase anyone for money again.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {footerLinks.social.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#C9A962] hover:border-[#C9A962]/30 hover:bg-[#C9A962]/10 transition-all duration-300"
                    aria-label={item.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@payago.in"
                  className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  support@payago.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+447721873786"
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  +44 7721 873786
                </a>
              </li>
              <li className="text-white/50 text-sm">
                London, United Kingdom
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/30 text-sm">
            © 2026 PAYAGO LTD. Registered in England & Wales. Company No. 12345678.
          </div>

          <div className="flex items-center gap-6 text-white/30 text-sm">
            <span>Regulated by the FCA</span>
            <span className="hidden md:inline">•</span>
            <span>PCI-DSS Level 1 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
