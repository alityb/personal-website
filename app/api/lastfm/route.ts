import { NextResponse } from "next/server"
import type { LastFmRecentTracksResponse } from "@/lib/types/lastfm"

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY
  const username = process.env.LASTFM_USERNAME

  if (!apiKey || !username) {
    return NextResponse.json({ name: null })
  }

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`
    const response = await fetch(url, { cache: "no-store" })

    if (!response.ok) {
      return NextResponse.json({ name: null })
    }

    const data: LastFmRecentTracksResponse = await response.json()

    if (data.recenttracks?.track?.[0]) {
      const track = data.recenttracks.track[0]
      const raw =
        track.image?.find((img) => img.size === "extralarge")?.["#text"] ||
        track.image?.find((img) => img.size === "large")?.["#text"] ||
        ""
      const isPlaceholder = raw.includes("2a96cbd8b46e442fc41c2b86b821562f")
      const image = raw && !isPlaceholder ? raw : null

      return NextResponse.json({
        name: track.name,
        url: track.url,
        image,
        nowPlaying: track["@attr"]?.nowplaying === "true",
      })
    }

    return NextResponse.json({ name: null })
  } catch {
    return NextResponse.json({ name: null })
  }
}
