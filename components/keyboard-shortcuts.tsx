"use client"

import { useEffect, useState, useCallback } from "react"

export default function KeyboardShortcuts() {
  const [lastKey, setLastKey] = useState<string | null>(null)

  const flash = useCallback((key: string) => {
    setLastKey(key)
    setTimeout(() => setLastKey(null), 600)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === "Escape") return

      if (e.key === "c") {
        window.dispatchEvent(new CustomEvent("openContact"))
        flash("c")
        return
      }

      const sections: Record<string, string> = { e: "work", p: "projects", b: "blog" }
      if (sections[e.key]) {
        document.getElementById(sections[e.key])?.scrollIntoView({ behavior: "smooth" })
        flash(e.key)
        return
      }

      if (e.key === "g") {
        window.scrollTo({ top: 0, behavior: "smooth" })
        flash("g")
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [flash])

  const hints = [
    { key: "e", label: "exp" },
    { key: "p", label: "projects" },
    { key: "b", label: "blog" },
    { key: "c", label: "contact" },
  ]

  return (
    <div className="fixed bottom-5 left-4 z-40 hidden lg:flex items-center gap-3 select-none pointer-events-none">
      {hints.map(({ key, label }) => (
        <span
          key={key}
          className="font-mono text-[10px] transition-colors duration-200"
          style={{ color: lastKey === key ? "#98c379" : "#262626" }}
        >
          [{key}] {label}
        </span>
      ))}
    </div>
  )
}
