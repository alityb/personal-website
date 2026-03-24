"use client"

import { useEffect, useState } from "react"
import { fetchRecentTracks } from "@/lib/utils/lastfm"

function timeAgo(uts: string | null): string {
  if (!uts) return "recently"
  const seconds = Math.floor(Date.now() / 1000) - parseInt(uts)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return "just now"
}

export default function LastPlayed() {
  const [data, setData] = useState<{
    name: string
    artist: string
    url: string
    nowPlaying: boolean
    image: string
    dateUts: string | null
  } | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const load = async () => {
      const result = await fetchRecentTracks()
      setData(result)
      setLoaded(true)
      if (result) setTimeout(() => setVisible(true), 100)
    }
    load()
    const interval = setInterval(load, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!loaded || !data) return null

  const label = data.nowPlaying ? "now playing" : `played ${timeAgo(data.dateUts)}`

  const inner = (
    <div
      className={`
        flex items-center gap-3
        border border-dashed border-[#262626] hover:border-[#98c379]/20
        rounded-lg px-4 py-2.5 bg-[#0a0a0a]/90 backdrop-blur-sm
        transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
    >
      {data.image ? (
        <img
          src={data.image}
          alt={data.name}
          className="w-8 h-8 rounded object-cover opacity-90 shrink-0"
        />
      ) : (
        <div className="w-8 h-8 rounded bg-[#141414] border border-[#1e1e1e] shrink-0 flex items-center justify-center font-mono text-[#3e4451] text-xs">
          ♫
        </div>
      )}
      <div className="min-w-0">
        <p className="font-mono text-[10px] text-[#3e4451] leading-none mb-0.5 flex items-center gap-1.5">
          {data.nowPlaying && (
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#98c379] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#98c379]" />
            </span>
          )}
          {label}
        </p>
        <p className="font-mono text-xs text-[#abb2bf] truncate max-w-[180px]">
          {data.name} — {data.artist}
        </p>
      </div>
    </div>
  )

  const wrapped = data.url ? (
    <a href={data.url} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : inner

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 hidden sm:block">
      {wrapped}
    </div>
  )
}
