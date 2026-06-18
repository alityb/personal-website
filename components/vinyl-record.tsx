"use client"

import { useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

type LastFmTrack = {
  name: string | null
  url?: string
  image?: string | null
  nowPlaying?: boolean
}

type VinylRecordProps = {
  side?: "left" | "right"
  degreesPerSecond?: number
  className?: string
  initialTrack?: LastFmTrack | null
}

export function VinylRecord({
  side = "left",
  degreesPerSecond = 40,
  className,
  initialTrack = null,
}: VinylRecordProps) {
  const [track, setTrack] = useState<LastFmTrack | null>(initialTrack)
  const [playing, setPlaying] = useState(true)
  const [ready, setReady] = useState(!initialTrack?.image)

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch("/api/lastfm")
        const data = await res.json()
        setTrack(data)
      } catch {
        // keep existing track data on error
      }
    }
    const interval = setInterval(fetchTrack, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!track?.image) {
      setReady(true)
      return
    }
    const img = new window.Image()
    img.onload = () => setReady(true)
    img.onerror = () => setReady(true)
    img.src = track.image
  }, [track?.image])

  const togglePlaying = useCallback(() => setPlaying((p) => !p), [])

  const spinDuration = `${360 / degreesPerSecond}s`

  return (
    <div className={cn("relative h-full w-full", className)}>
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2",
          side === "left"
            ? "left-0 -translate-x-1/2 sm:-translate-x-2/5"
            : "right-0 translate-x-1/2 sm:translate-x-2/5",
        )}
      >
        <div className={ready ? "animate-vinyl-swoop" : "opacity-0"}>
          <button
            type="button"
            onClick={togglePlaying}
            aria-label={playing ? "Pause record" : "Play record"}
            className="block cursor-pointer rounded-full outline-none"
          >
            <div
              className="relative aspect-square w-[14rem] select-none sm:w-[17rem] md:w-[20rem] lg:w-[24rem] animate-vinyl-spin"
              style={{
                animationDuration: spinDuration,
                animationPlayState: playing ? "running" : "paused",
              }}
            >
              <Disc art={track?.image || null} title={track?.name || ""} />
            </div>
          </button>
        </div>
      </div>

    </div>
  )
}

function Disc({ art, title }: { art: string | null; title: string }) {
  return (
    <div
      className="relative h-full w-full rounded-full"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #161616 0%, #0c0c0c 55%, #050505 86%, #000 100%)",
        boxShadow:
          "0 30px 60px -15px rgba(0,0,0,0.8), 0 10px 20px -8px rgba(0,0,0,0.6), inset 0 0 2px 1px rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0px, rgba(0,0,0,0.06) 1.5px)",
          opacity: 0.5,
          maskImage:
            "radial-gradient(circle at 50% 50%, transparent 19%, #000 24%, #000 92%, transparent 96%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, transparent 19%, #000 24%, #000 92%, transparent 96%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.18) 22deg, rgba(255,255,255,0) 70deg, rgba(255,255,255,0) 180deg, rgba(255,255,255,0.12) 205deg, rgba(255,255,255,0) 255deg, rgba(255,255,255,0) 360deg)",
          mixBlendMode: "screen",
          opacity: 0.9,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(60% 60% at 34% 28%, rgba(255,255,255,0.16), rgba(255,255,255,0) 60%)",
          mixBlendMode: "screen",
        }}
      />

      <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_24px_8px_rgba(0,0,0,0.55)]" />

      <div className="absolute left-1/2 top-1/2 aspect-square w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/60 shadow-[inset_0_0_8px_2px_rgba(0,0,0,0.6)]" />

      <div className="absolute left-1/2 top-1/2 aspect-square w-[38%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.12)]">
        {art ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={art}
            alt={`Album art for ${title}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-black" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_35%_30%,rgba(255,255,255,0.22),transparent_60%)]" />
      </div>

      <div className="absolute left-1/2 top-1/2 aspect-square w-[2.6%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] ring-1 ring-white/10" />
    </div>
  )
}
