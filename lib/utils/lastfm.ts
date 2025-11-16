import type { Track } from "../types/lastfm"

export async function fetchRecentTracks(): Promise<Track | null> {
  try {
    const response = await fetch("/api/lastfm")
    
    if (!response.ok) {
      throw new Error("Failed to fetch recent tracks")
    }

    const data = await response.json()
    
    if (data.error) {
      throw new Error(data.error)
    }

    // Return the track data in a format compatible with our component
    // Check if it's a placeholder (no credentials) or actual track
    if (data.name && data.name !== "—" && data.name !== "song name") {
      return {
        name: data.name,
        artist: {
          "#text": data.artist,
          mbid: "",
        },
        url: data.url || "",
        streamable: "",
        image: [],
        mbid: "",
        album: {
          mbid: "",
          "#text": "",
        },
      } as Track
    }

    return null
  } catch (error) {
    console.error("Error fetching recent tracks:", error)
    return null
  }
}

