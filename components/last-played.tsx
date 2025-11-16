"use client"

import { useEffect, useState } from "react"
import { fetchRecentTracks } from "@/lib/utils/lastfm"
import type { Track } from "@/lib/types/lastfm"

export default function LastPlayed() {
  const [track, setTrack] = useState<Track | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTrack = async () => {
      const data = await fetchRecentTracks()
      setTrack(data)
      setLoading(false)
    }

    loadTrack()
    // Refresh every 30 seconds
    const interval = setInterval(loadTrack, 30000)
    return () => clearInterval(interval)
  }, [])

  const label = track
    ? `${track.name} by ${track.artist["#text"]}`
    : loading
    ? "loading…"
    : "song name - artist name"

  if (loading) {
    return (
      <span className="text-[#5c6370] text-xs font-mono hidden sm:inline">
        last played: <span className="text-[#abb2bf]">loading…</span>
      </span>
    )
  }

  return (
    <span className="text-[#5c6370] text-xs font-mono hidden sm:inline">
      last played:{" "}
      {track?.url ? (
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#98c379] hover:text-[#61afef] transition-colors cursor-pointer underline decoration-[#98c379]/30 hover:decoration-[#61afef]/50 underline-offset-2"
          title={label}
        >
          {track.name} - {track.artist["#text"]}
        </a>
      ) : (
        <span className="text-[#98c379] cursor-default" title={label}>
          {label}
        </span>
      )}
    </span>
  )
}

