import Link from "next/link"

const LINKS: { name: string; href: string }[] = [
  { name: "How it works", href: "/how-it-works/" },
  { name: "Features", href: "/features/" },
  { name: "Pricing", href: "/pricing/" },
  { name: "FAQ", href: "/faq/" },
  { name: "About", href: "/about/" },
  { name: "Blog", href: "/blog/" },
  { name: "Contact", href: "/contact/" },
  { name: "Careers", href: "/careers/" },
  { name: "Privacy", href: "/privacy/" },
  { name: "Terms", href: "/terms/" },
  { name: "Cookies", href: "/cookie-policy/" },
  { name: "Affiliate disclosure", href: "/affiliate-disclosure/" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#031B1A] px-6 py-10 text-[14px] text-white/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19E4CC]">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <p>© 2026 PayaGo Ltd. Registered in England and Wales, company number 16971574.</p>
      </div>
    </footer>
  )
}
