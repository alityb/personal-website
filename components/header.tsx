"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import LastPlayed from "./last-played"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
      <nav className="max-w-[800px] mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between font-mono text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[#abb2bf] hover:text-[#98c379] transition-colors">
              ali
            </Link>
            <LastPlayed />
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:ali.moh.islam.1@gmail.com"
              className="text-[#5c6370] hover:text-[#98c379] transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/amtayb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5c6370] hover:text-[#98c379] transition-colors"
              title="X (Twitter)"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://github.com/alityb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5c6370] hover:text-[#98c379] transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/amtayeb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5c6370] hover:text-[#98c379] transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://scholar.google.com/citations?user=PVyEd4oAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5c6370] hover:text-[#98c379] transition-colors"
              title="Google Scholar"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
