import { NextResponse } from "next/server"
import type { LastFmRecentTracksResponse } from "@/lib/types/lastfm"

type LastFmTrackInfoResponse = {
  track?: {
    album?: {
      image?: Array<{ size: string; "#text": string }>
    }
  }
}

function selectImage(images?: Array<{ size: string; "#text": string }>) {
  const raw =
    images?.find((image) => image.size === "extralarge")?.["#text"] ||
    images?.find((image) => image.size === "large")?.["#text"] ||
    ""

  return raw && !raw.includes("2a96cbd8b46e442fc41c2b86b821562f")
    ? raw
    : null
}

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY
  const username = process.env.LASTFM_USERNAME

  if (!apiKey || !username) {
    return NextResponse.json({ name: null })
  }

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`
    const response = await fetch(url, { next: { revalidate: 15 } })

    if (!response.ok) {
      return NextResponse.json({ name: null })
    }

    const data: LastFmRecentTracksResponse = await response.json()

    if (data.recenttracks?.track?.[0]) {
      const track = data.recenttracks.track[0]
      let image = selectImage(track.image)

      if (!image) {
        const artist = track.artist["#text"] || track.artist.name || ""
        const infoUrl = new URL("https://ws.audioscrobbler.com/2.0/")
        infoUrl.search = new URLSearchParams({
          method: "track.getInfo",
          artist,
          track: track.name,
          api_key: apiKey,
          format: "json",
        }).toString()
        const infoResponse = await fetch(infoUrl, { next: { revalidate: 3600 } })

        if (infoResponse.ok) {
          const info: LastFmTrackInfoResponse = await infoResponse.json()
          image = selectImage(info.track?.album?.image)
        }
      }

      return NextResponse.json(
        {
          name: track.name,
          url: track.url,
          image,
          nowPlaying: track["@attr"]?.nowplaying === "true",
        },
        {
          headers: {
            "Cache-Control": "public, max-age=5, s-maxage=15, stale-while-revalidate=30",
          },
        },
      )
    }

    return NextResponse.json({ name: null })
  } catch {
    return NextResponse.json({ name: null })
  }
}
