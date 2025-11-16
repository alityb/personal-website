import { NextResponse } from "next/server"
import type { LastFmRecentTracksResponse } from "@/lib/types/lastfm"

export async function GET() {
  // Check both with and without NEXT_PUBLIC_ prefix for compatibility
  const apiKey = process.env.LASTFM_API_KEY || process.env.NEXT_PUBLIC_LASTFM_API_KEY
  const username = process.env.LASTFM_USERNAME || process.env.NEXT_PUBLIC_LASTFM_USERNAME

  if (!apiKey || !username) {
    // Return placeholder instead of error so component can still render
    return NextResponse.json({
      name: "song name",
      artist: "artist name",
    })
  }

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Failed to fetch from Last.fm API")
    }

    const data: LastFmRecentTracksResponse = await response.json()

    if (data.recenttracks?.track?.[0]) {
      const recentTrack = data.recenttracks.track[0]
      return NextResponse.json({
        name: recentTrack.name,
        artist: recentTrack.artist["#text"] || recentTrack.artist.name || "",
        url: recentTrack.url,
      })
    }

    return NextResponse.json({
      name: "—",
      artist: "",
    })
  } catch (error) {
    console.error("Error fetching last played track:", error)
    return NextResponse.json(
      { error: "Failed to fetch last played track" },
      { status: 500 }
    )
  }
}

