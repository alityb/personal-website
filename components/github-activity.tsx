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
    <div className="mt-8 font-mono">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/40">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400/70" />
        </span>
        <span>working tree</span>
        <span className="h-px flex-1 bg-border" />
        <span className="normal-case tracking-normal">{timeAgo(lastCommit.date)}</span>
      </div>

      <div className="relative ml-[3px] mt-3 border-l border-border pb-1 pl-5">
        <span className="absolute -left-[4px] top-1.5 h-[7px] w-[7px] rounded-full border border-background bg-muted-foreground/70" aria-hidden="true" />
        <p className="text-[10px] text-muted-foreground/40">currently working on</p>
        {lastCommit.private ? (
          <span className="group mt-0.5 inline-block cursor-default overflow-hidden text-sm text-foreground/80">
            <span className="blur-[4px] transition-[filter] duration-200 group-hover:blur-none">
              {lastCommit.repo.replace("alityb/", "")}
            </span>
          </span>
        ) : (
          <a
            href={`https://github.com/${lastCommit.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 inline-block text-sm text-foreground/80 transition-colors hover:text-foreground"
          >
            {lastCommit.repo.replace("alityb/", "")}
          </a>
        )}

        <div className="mt-2 flex items-start gap-2 text-[11px] leading-relaxed">
          <span className="shrink-0 rounded-sm bg-foreground/[0.06] px-1.5 py-px text-muted-foreground/40">
            {lastCommit.sha || "private"}
          </span>
          {lastCommit.private ? (
            <span className="group relative inline-block cursor-default overflow-hidden rounded-sm bg-foreground/[0.05] px-1.5 text-muted-foreground/50">
              <span className="blur-[4px] transition-[filter] duration-200 group-hover:blur-none">
                {lastCommit.message || "private commit details"}
              </span>
            </span>
          ) : (
            <span className="text-muted-foreground/50">{lastCommit.message}</span>
          )}
        </div>
      </div>
    </div>
  )
}
