"use client"

import { Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative py-16 lg:py-20 border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-[#04060A]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img src="/payago-symbol.png" alt="Payago" className="w-10 h-10 object-contain rounded-xl" />
            <span className="text-xl font-semibold text-foreground">Payago</span>
          </div>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground max-w-md">The future of AI-powered travel. Coming soon.</p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-[#00D4FF] hover:border-[#00D4FF]/30 transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-[#7C5CFF] hover:border-[#7C5CFF]/30 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-[#4AD7A2] hover:border-[#4AD7A2]/30 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/5 w-full">
            <p className="text-xs text-muted-foreground/60">© 2025 Payago. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
