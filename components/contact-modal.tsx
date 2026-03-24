"use client"

import { useEffect, useState, useCallback } from "react"

const CONTACTS = [
  { label: "email",    value: "ali.moh.islam.1@gmail.com", href: "mailto:ali.moh.islam.1@gmail.com", copy: true },
  { label: "github",   value: "github.com/alityb",          href: "https://github.com/alityb",        copy: false },
  { label: "linkedin", value: "linkedin.com/in/amtayeb",    href: "https://linkedin.com/in/amtayeb",  copy: false },
  { label: "x",        value: "x.com/amtayb",               href: "https://x.com/amtayb",             copy: false },
  { label: "scholar",  value: "scholar.google.com",          href: "https://scholar.google.com/citations?user=PVyEd4oAAAAJ&hl=en", copy: false },
]

export function ContactTrigger() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("openContact"))}
      className="inline-flex items-center justify-center font-mono text-[11px] text-[#5c6370] border border-[#3e4451] rounded px-1.5 hover:border-[#98c379]/60 hover:text-[#98c379] transition-colors" style={{ lineHeight: "1.6", verticalAlign: "middle", position: "relative", top: "-1px" }}
    >
      c
    </button>
  )
}

export function ContactModal() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(0)
  const [emailCopied, setEmailCopied] = useState(false)

  const close = useCallback(() => {
    setOpen(false)
    setSelected(0)
  }, [])

  const activate = useCallback((index: number) => {
    const contact = CONTACTS[index]
    if (contact.copy) {
      navigator.clipboard.writeText(contact.value).then(() => {
        setEmailCopied(true)
        setTimeout(() => setEmailCopied(false), 1500)
      })
    } else {
      window.open(contact.href, "_blank", "noopener,noreferrer")
    }
  }, [])

  useEffect(() => {
    const handler = () => { setOpen(true); setSelected(0) }
    window.addEventListener("openContact", handler)
    return () => window.removeEventListener("openContact", handler)
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
        case "c":
          e.preventDefault()
          close()
          break
        case "j":
        case "ArrowDown":
          e.preventDefault()
          setSelected((s) => (s + 1) % CONTACTS.length)
          break
        case "k":
        case "ArrowUp":
          e.preventDefault()
          setSelected((s) => (s - 1 + CONTACTS.length) % CONTACTS.length)
          break
        case "l":
        case "ArrowRight":
        case "Enter":
          e.preventDefault()
          activate(selected)
          break
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, selected, close, activate])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={close}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative border border-dashed border-[#3e4451] rounded-xl bg-[#0a0a0a] w-full max-w-[400px] mx-4 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-dashed border-[#1e1e1e]">
          <span className="font-mono text-sm text-[#98c379] flex items-center gap-1">
            <span className="text-[#61afef]">~/</span>contact
          </span>
          <div className="flex items-center gap-3 font-mono text-[10px] text-[#3e4451]">
            <span>[j/k] navigate</span>
            <span>[l] open</span>
            <button onClick={close} className="hover:text-[#abb2bf] transition-colors ml-1">[esc]</button>
          </div>
        </div>

        {/* Contacts */}
        <div className="py-2">
          {CONTACTS.map(({ label, value, href, copy }, i) => {
            const isSelected = selected === i
            return (
              <div
                key={label}
                className={`flex items-center gap-4 px-5 py-2.5 cursor-pointer transition-colors ${
                  isSelected ? "bg-[#141414]" : ""
                }`}
                onMouseEnter={() => setSelected(i)}
                onClick={() => activate(i)}
              >
                <span
                  className="font-mono text-xs w-3 shrink-0 transition-colors"
                  style={{ color: isSelected ? "#98c379" : "transparent" }}
                >
                  ▸
                </span>
                <span
                  className="font-mono text-[11px] w-16 shrink-0 transition-colors"
                  style={{ color: isSelected ? "#abb2bf" : "#3e4451" }}
                >
                  {label}
                </span>
                <span
                  className="font-mono text-xs flex-1 min-w-0 truncate transition-colors"
                  style={{ color: isSelected ? "#abb2bf" : "#5c6370" }}
                >
                  {value}
                </span>
                <span
                  className="font-mono text-[10px] shrink-0 ml-4 transition-colors"
                  style={{
                    color: copy && emailCopied && isSelected
                      ? "#98c379"
                      : isSelected
                      ? "#3e4451"
                      : "transparent",
                  }}
                >
                  {copy ? (emailCopied && isSelected ? "copied!" : "copy") : "↗"}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
