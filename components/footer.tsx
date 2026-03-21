"use client"

import Link from "next/link"
import { Twitter, Linkedin, Instagram, Mail, MapPin, ArrowUpRight } from "lucide-react"

const footerLinks = {
  product: [
    { name: "How it works", href: "/how-it-works" },
    { name: "Features", href: "/features" },
    { name: "Early Access", href: "/#early-access" },
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
    { name: "Cookie Policy", href: "/cookie-policy" },
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
    <footer id="contact" className="relative border-t border-slate-200 bg-[#F5F3EF]">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="overflow-hidden inline-block mb-6" style={{ width: '152px', height: '34px' }}>
              <img src="/payago-logo-new.png" alt="PayaGo" style={{ width: '400px', maxWidth: 'none', marginTop: '-109px', marginLeft: '-120px' }} />
            </Link>
            <p className="text-slate-400 text-[13px] mb-6 max-w-xs leading-[1.7]">
              The world&apos;s first AI travel planning platform. One sentence to a fully booked group trip.
            </p>
            <div className="flex items-center gap-2.5">
              {footerLinks.social.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300"
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
            <h4 className="text-slate-500 font-semibold text-[13px] uppercase tracking-widest mb-5">Product</h4>
            <ul className="space-y-3.5">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-slate-400 hover:text-slate-700 transition-colors duration-300 text-[13px] flex items-center gap-1 group">
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-50 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-slate-500 font-semibold text-[13px] uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3.5">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-400 hover:text-slate-700 transition-colors duration-300 text-[13px]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-slate-500 font-semibold text-[13px] uppercase tracking-widest mb-5">Legal</h4>
            <ul className="space-y-3.5">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-400 hover:text-slate-700 transition-colors duration-300 text-[13px]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-500 font-semibold text-[13px] uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-3.5">
              <li>
                <a href="mailto:support@payago.in" className="text-slate-400 hover:text-slate-700 transition-colors duration-300 text-[13px] flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  support@payago.in
                </a>
              </li>
              <li className="text-slate-400 text-[13px] flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                London, UK
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-300 text-[12px]">
            © 2026 PayaGo Ltd. Registered in England & Wales.
          </div>
          <div className="flex items-center gap-6 text-slate-300 text-[12px]">
            <span className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-emerald-400" />
              GDPR Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-emerald-400" />
              UK Registered Company
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
