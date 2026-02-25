"use client"

import Link from "next/link"
import { Twitter, Linkedin, Instagram, Mail, MapPin, ArrowUpRight } from "lucide-react"

const footerLinks = {
  product: [
    { name: "How it works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Early Access", href: "#early-access" },
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
    { name: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  ],
  social: [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Instagram", href: "#", icon: Instagram },
  ],
}

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/[0.04] bg-[#010306]">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center ring-1 ring-white/[0.06] group-hover:ring-blue-500/20 transition-all duration-500">
                <img src="/payago-logo.jpg" alt="PayaGo" className="w-full h-full object-cover scale-[1.35]" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">PayaGo<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ml-0.5">AI</span></span>
            </Link>
            <p className="text-white/30 text-[13px] mb-6 max-w-xs leading-[1.7]">
              The world&apos;s first AI travel planning platform. One sentence to a fully booked group trip.
            </p>
            <div className="flex items-center gap-2.5">
              {footerLinks.social.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="w-9 h-9 rounded-xl bg-white/[0.025] border border-white/[0.05] flex items-center justify-center text-white/25 hover:text-blue-400 hover:border-blue-500/20 hover:bg-blue-500/5 transition-all duration-500"
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
            <h4 className="text-white/70 font-semibold text-[13px] uppercase tracking-widest mb-5">Product</h4>
            <ul className="space-y-3.5">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-white/30 hover:text-white/70 transition-colors duration-300 text-[13px] flex items-center gap-1 group">
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-50 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white/70 font-semibold text-[13px] uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3.5">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/30 hover:text-white/70 transition-colors duration-300 text-[13px]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white/70 font-semibold text-[13px] uppercase tracking-widest mb-5">Legal</h4>
            <ul className="space-y-3.5">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/30 hover:text-white/70 transition-colors duration-300 text-[13px]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/70 font-semibold text-[13px] uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-3.5">
              <li>
                <a href="mailto:support@payago.in" className="text-white/30 hover:text-white/70 transition-colors duration-300 text-[13px] flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  support@payago.in
                </a>
              </li>
              <li className="text-white/30 text-[13px] flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                London, UK
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/15 text-[12px]">
            © 2026 PayaGo Ltd. Registered in England & Wales.
          </div>
          <div className="flex items-center gap-6 text-white/15 text-[12px]">
            <span className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-emerald-400/40" />
              GDPR Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-emerald-400/40" />
              EU Data Residency
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
