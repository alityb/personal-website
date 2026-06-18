"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"

const contacts = [
  { label: "email", value: "ali.moh.islam.1@gmail.com", href: "", copy: true },
  { label: "x", value: "@amtayb", href: "https://x.com/amtayb" },
  { label: "github", value: "alityb", href: "https://github.com/alityb" },
  { label: "linkedin", value: "amtayeb", href: "https://linkedin.com/in/amtayeb" },
]

export function CommandBar() {
  const router = useRouter()
  const pathname = usePathname()
  const [contactOpen, setContactOpen] = useState(false)
  const [contactIndex, setContactIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  const isHome = pathname === "/"

  const closeContact = useCallback(() => setContactOpen(false), [])

  const go = useCallback((path: string) => {
    router.push(path)
  }, [router])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA") return

      if (contactOpen) {
        if (e.key === "Escape" || e.key === "q") {
          e.preventDefault()
          closeContact()
          return
        }
        if (e.key === "j" || e.key === "ArrowDown") {
          e.preventDefault()
          setContactIndex((i) => (i + 1) % contacts.length)
        } else if (e.key === "k" || e.key === "ArrowUp") {
          e.preventDefault()
          setContactIndex((i) => (i - 1 + contacts.length) % contacts.length)
        } else if (e.key === "Enter") {
          e.preventDefault()
          const c = contacts[contactIndex]
          if (c.copy) {
            navigator.clipboard.writeText(c.value)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          } else {
            window.open(c.href, "_blank")
          }
        }
        return
      }

      if (!isHome && (e.key === "Escape" || e.key === "q")) {
        e.preventDefault()
        go("/")
        return
      }

      switch (e.key) {
        case "p":
          e.preventDefault()
          go("/projects")
          break
        case "e":
          e.preventDefault()
          go("/experience")
          break
        case "c":
          e.preventDefault()
          setContactOpen(true)
          setContactIndex(0)
          break
        case "b":
          e.preventDefault()
          go("/blog")
          break
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [contactOpen, contactIndex, closeContact, isHome, go])

  return (
    <>
      <nav className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
        {!isHome && (
          <button onClick={() => go("/")} className="mr-2 flex items-center gap-1.5 transition-colors hover:text-foreground">
            <kbd className="rounded border border-border bg-card px-1.5 py-0.5 text-[10px]">esc</kbd>
            <span>back</span>
          </button>
        )}
        <button onClick={() => go("/projects")} className="flex items-center gap-1.5 transition-colors hover:text-foreground">
          <kbd className="rounded border border-border bg-card px-1.5 py-0.5 text-[10px]">p</kbd>
          <span>projects</span>
        </button>
        <button onClick={() => go("/experience")} className="flex items-center gap-1.5 transition-colors hover:text-foreground">
          <kbd className="rounded border border-border bg-card px-1.5 py-0.5 text-[10px]">e</kbd>
          <span>experience</span>
        </button>
        <button onClick={() => { setContactOpen(true); setContactIndex(0) }} className="flex items-center gap-1.5 transition-colors hover:text-foreground">
          <kbd className="rounded border border-border bg-card px-1.5 py-0.5 text-[10px]">c</kbd>
          <span>contact</span>
        </button>
        <button onClick={() => go("/blog")} className="flex items-center gap-1.5 transition-colors hover:text-foreground">
          <kbd className="rounded border border-border bg-card px-1.5 py-0.5 text-[10px]">b</kbd>
          <span>blog</span>
        </button>
      </nav>

      {contactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={closeContact}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-mono text-sm uppercase tracking-wider text-foreground">contact</h2>
              <span className="font-mono text-[10px] text-muted-foreground">esc to close</span>
            </div>
            <p className="mb-3 font-mono text-[11px] text-muted-foreground/70">
              <kbd className="rounded border border-border bg-background px-1 py-0.5 text-[10px]">j</kbd>/<kbd className="rounded border border-border bg-background px-1 py-0.5 text-[10px]">k</kbd> navigate · <kbd className="rounded border border-border bg-background px-1 py-0.5 text-[10px]">enter</kbd> open
            </p>
            <div className="space-y-1">
              {contacts.map((c, i) =>
                c.copy ? (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(c.value)
                      setCopied(true)
                      setTimeout(() => setCopied(false), 1500)
                    }}
                    className={`flex w-full items-center justify-between rounded px-3 py-2 font-mono text-sm transition-colors ${
                      i === contactIndex
                        ? "bg-foreground/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{c.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {copied ? "copied!" : c.value}
                    </span>
                  </button>
                ) : (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between rounded px-3 py-2 font-mono text-sm transition-colors ${
                      i === contactIndex
                        ? "bg-foreground/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{c.label}</span>
                    <span className="text-xs text-muted-foreground">{c.value}</span>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
