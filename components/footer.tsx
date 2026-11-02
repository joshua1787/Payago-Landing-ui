import Link from "next/link"
import { Mail, MapPin, ArrowUpRight } from "lucide-react"

import { PayagoWordmark } from "@/components/payago-wordmark"

const footerLinks = {
  product: [
    { name: "Open PayaGo", href: "https://app.payago.in" },
    { name: "What's coming", href: "/#next" },
    { name: "Trips waitlist", href: "/early-access/" },
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
    <footer id="contact" className="scroll-stable-section relative border-t border-slate-200 bg-[#F1F6F4]">

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex mb-6">
              <PayagoWordmark />
            </Link>
            <p className="text-[#36514D] text-[14px] mb-6 max-w-xs leading-[1.7]">
              Split, track and travel, all in one app. Splitting and your own spending are live today. Cards and whole trips are coming next.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[#06211E] font-semibold text-[14px] mb-5">Product</h4>
            <ul className="space-y-3.5">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[#36514D] hover:text-[#06211E] transition-colors duration-300 text-[13px] flex items-center gap-1 group">
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#06211E] font-semibold text-[14px] mb-5">Company</h4>
            <ul className="space-y-3.5">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[#36514D] hover:text-[#06211E] transition-colors duration-300 text-[13px]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[#06211E] font-semibold text-[14px] mb-5">Legal</h4>
            <ul className="space-y-3.5">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[#36514D] hover:text-[#06211E] transition-colors duration-300 text-[13px]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#06211E] font-semibold text-[14px] mb-5">Contact</h4>
            <ul className="space-y-3.5">
              <li>
                <a href="mailto:support@payago.in" className="text-[#36514D] hover:text-[#06211E] transition-colors duration-300 text-[13px] flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  support@payago.in
                </a>
              </li>
              <li className="text-[#36514D] text-[13px] flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                London, UK
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#6B8280] text-[13px]">
            © 2026 PayaGo Ltd. Registered in England and Wales, company number 16971574.
          </div>
        </div>
      </div>
    </footer>
  )
}
