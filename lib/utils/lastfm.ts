export interface RecentTrackResult {
  name: string
  artist: string
  url: string
  nowPlaying: boolean
  image: string
  dateUts: string | null
}

export async function fetchRecentTracks(): Promise<RecentTrackResult | null> {
  try {
    const response = await fetch("/api/lastfm")

    if (!response.ok) throw new Error("Failed to fetch recent tracks")

    const data = await response.json()

    if (data.error) throw new Error(data.error)

    if (data.name && data.name !== "—" && data.name !== "song name") {
      return {
        name: data.name,
        artist: data.artist,
        url: data.url || "",
        nowPlaying: data.nowPlaying === true,
        image: data.image || "",
        dateUts: data.dateUts || null,
      }
    }

    return null
  } catch (error) {
    console.error("Error fetching recent tracks:", error)
    return null
  }
}
