export interface LastFmRecentTracksResponse {
  recenttracks: {
    track: Track[];
    "@attr": {
      user: string;
      totalPages: string;
      page: string;
      perPage: string;
      total: string;
    };
  };
}

export interface Track {
  artist: {
    mbid: string;
    "#text": string;
    name?: string;
  };
  streamable: string;
  image: Array<{
    size: "small" | "medium" | "large" | "extralarge";
    "#text": string;
  }>;
  mbid: string;
  album: {
    mbid: string;
    "#text": string;
  };
  name: string;
  url: string;
  "@attr"?: {
    nowplaying: string;
  };
  date?: {
    uts: string;
    "#text": string;
  };
}

