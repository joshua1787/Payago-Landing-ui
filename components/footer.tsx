import Link from "next/link"
import { Mail, MapPin, ArrowUpRight } from "lucide-react"

import { PayagoWordmark } from "@/components/payago-wordmark"

const footerLinks = {
  product: [
    { name: "How it works", href: "/how-it-works" },
    { name: "Features", href: "/features" },
    { name: "Early Access", href: "/early-access/" },
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
}

export function Footer() {
  return (
    <footer id="contact" className="scroll-stable-section relative border-t border-slate-200 bg-[#F5F3EF]">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex mb-6">
              <PayagoWordmark />
            </Link>
            <p className="text-slate-400 text-[13px] mb-6 max-w-xs leading-[1.7]">
              AI travel planning for groups. One sentence to a coordinated trip plan your friends can review, vote on, and move into provider-led handoff when ready.
            </p>
            <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-[12px] leading-5 text-slate-500">
              Early access is open. Free to plan, with final partner prices and terms reviewed before provider-led booking.
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-slate-500 font-semibold text-[13px] uppercase tracking-widest mb-5">Product</h4>
            <ul className="space-y-3.5">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-400 hover:text-slate-700 transition-colors duration-300 text-[13px] flex items-center gap-1 group">
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  </Link>
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
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              Privacy Policy Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              UK Registered Company
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
