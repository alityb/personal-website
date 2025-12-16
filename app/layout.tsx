import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ali tayeb",
  description: "cs @ cmu. interested in systems, dev tools and under-the-hood optimization.",
  generator: "v0.app",
  openGraph: {
    title: "ali tayeb",
    description: "cs @ cmu. interested in systems, dev tools and under-the-hood optimization.",
    url: "https://amtayeb.dev",
    siteName: "ali tayeb",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ali tayeb",
    description: "cs @ cmu. interested in systems, dev tools and under-the-hood optimization.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
