"use client"

import { useEffect, useState } from "react"

interface LastCommit {
  repo: string
  message: string
  sha: string
  date: string
  private: boolean
  branch: string
}

function timeAgo(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks}w ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

export function GithubActivity() {
  const [lastCommit, setLastCommit] = useState<LastCommit | null>(null)

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => {
        setLastCommit(data.lastCommit || null)
      })
      .catch(() => {})
  }, [])

  if (!lastCommit) return null

  return (
    <aside
      aria-label="Current work"
      className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-3 py-1"
    >
      <p className="pt-1 font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground/55">
        In progress
      </p>

      <div className="min-w-0 space-y-1.5">
        {lastCommit.private ? (
          <span className="group inline-block cursor-default overflow-hidden font-sans text-base font-medium tracking-tight text-foreground">
            <span className="blur-[4px] transition-[filter] duration-200 group-hover:blur-none">
              {lastCommit.repo.replace("alityb/", "")}
            </span>
          </span>
        ) : (
          <a
            href={`https://github.com/${lastCommit.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-base font-medium tracking-tight text-foreground transition-colors hover:text-muted-foreground"
          >
            {lastCommit.repo.replace("alityb/", "")}
          </a>
        )}

        {lastCommit.private ? (
          <p className="group w-fit cursor-default overflow-hidden font-mono text-[11px] leading-relaxed text-muted-foreground/70">
            <span className="blur-[4px] transition-[filter] duration-200 group-hover:blur-none">
              {lastCommit.message || "private commit details"}
            </span>
          </p>
        ) : (
          <p className="font-mono text-[11px] leading-relaxed text-muted-foreground/70">
            {lastCommit.message}
          </p>
        )}

        <p className="flex flex-wrap items-center gap-x-1.5 font-mono text-[10px] text-muted-foreground/40">
          <span>{lastCommit.sha || "•••••••"}</span>
          <span>·</span>
          <span>{lastCommit.private ? "private" : lastCommit.branch || "main"}</span>
          <span>·</span>
          <span>{timeAgo(lastCommit.date)}</span>
        </p>
      </div>
    </aside>
  )
}
