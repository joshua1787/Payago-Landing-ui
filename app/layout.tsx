import type React from "react"
import type { Metadata } from "next"
import { Inter, Outfit, Michroma } from "next/font/google"
import "./globals.css"
import { SmoothScroll } from "@/components/smooth-scroll"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })
const michroma = Michroma({ weight: "400", subsets: ["latin"], variable: "--font-michroma" })

export const metadata: Metadata = {
  title: "Payago — The Future of AI-Powered Travel",
  description:
    "Something intelligent, global, and extraordinary is arriving soon. Get early access to the future of travel.",
}

export const viewport = {
  themeColor: "#04060A",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SmoothScroll />
        {/* Film grain overlay */}
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
