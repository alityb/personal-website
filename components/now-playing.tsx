"use client"

import { useEffect, useState } from "react"
import { Volume2 } from "lucide-react"

type Track = {
  name: string | null
  url?: string
  image?: string | null
  nowPlaying?: boolean
}

export function NowPlaying({ initialTrack }: { initialTrack?: Track | null }) {
  const [track, setTrack] = useState<Track | null>(initialTrack ?? null)

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch("/api/lastfm")
        const data = await res.json()
        setTrack(data)
      } catch {
        // keep existing
      }
    }
    const interval = setInterval(fetchTrack, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!track?.name) return null

  return (
    <a
      href={track.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-border bg-card/80 px-4 py-2.5 backdrop-blur-sm transition-colors hover:bg-card"
    >
      <Volume2 className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      <span className="max-w-[10rem] truncate font-mono text-xs uppercase tracking-wider text-foreground">
        {track.name}
      </span>
    </a>
  )
}
