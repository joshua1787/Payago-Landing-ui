"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PayagoWordmark } from "@/components/payago-wordmark"
import { Menu, X } from "lucide-react"
import { captureEvent } from "@/lib/analytics"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border/50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <PayagoWordmark />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </a>
            <a href="/#planner" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Trip Planner
            </a>
            <a href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Link
                href="/contact"
                onClick={() => captureEvent("cta_click", { location: "navigation_desktop", label: "contact" })}
              >
                Contact
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              <Link
                href="/early-access/"
                onClick={() => captureEvent("cta_click", { location: "navigation_desktop", label: "get_early_access" })}
              >
                Get Early Access
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <a href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </a>
              <a href="/#planner" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Trip Planner
              </a>
              <a href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <Button asChild variant="ghost" size="sm" className="justify-start">
                  <Link
                    href="/contact"
                    onClick={() => captureEvent("cta_click", { location: "navigation_mobile", label: "contact" })}
                  >
                    Contact
                  </Link>
                </Button>
                <Button asChild size="sm" className="bg-primary text-primary-foreground">
                  <Link
                    href="/early-access/"
                    onClick={() => captureEvent("cta_click", { location: "navigation_mobile", label: "get_early_access" })}
                  >
                    Get Early Access
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
