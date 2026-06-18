import { VinylRecord } from "@/components/vinyl-record"
import { NowPlaying } from "@/components/now-playing"

async function getTrack() {
  const apiKey = process.env.LASTFM_API_KEY
  const username = process.env.LASTFM_USERNAME
  if (!apiKey || !username) return null

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) return null

    const data = await res.json()
    const track = data.recenttracks?.track?.[0]
    if (!track) return null

    const raw =
      track.image?.find((img: { size: string; "#text": string }) => img.size === "extralarge")?.["#text"] ||
      track.image?.find((img: { size: string; "#text": string }) => img.size === "large")?.["#text"] ||
      ""
    const isPlaceholder = raw.includes("2a96cbd8b46e442fc41c2b86b821562f")

    return {
      name: track.name as string,
      url: track.url as string,
      image: raw && !isPlaceholder ? raw : null,
      nowPlaying: track["@attr"]?.nowplaying === "true",
    }
  } catch {
    return null
  }
}

export default async function Page() {
  const initialTrack = await getTrack()

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-y-0 right-0 z-20 hidden w-[55%] lg:block">
        <VinylRecord side="right" className="min-h-screen" initialTrack={initialTrack} />
      </div>

      <NowPlaying initialTrack={initialTrack} />

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-20 sm:px-10">
        <article className="pointer-events-auto flex max-w-xl flex-1 flex-col justify-center gap-7 text-pretty leading-relaxed">
          <h1 className="text-base text-foreground">Hey, I&apos;m Ali!</h1>

          <p className="text-muted-foreground">
            I grew up between Egypt and Saudi Arabia, currently in SF working @
            Overshoot AI on inference for VLMs. Before that, I was a big sports
            analytics nerd.
          </p>

          <p className="text-muted-foreground">
            I love making systems go faster. I tend to keep poking at a problem
            long after it&apos;s reasonable to stop, just to see what&apos;s
            underneath. Hopefully it adds up to some good stories down the line.
          </p>

          <p className="text-muted-foreground">
            On the side, I&apos;m a speedcuber, Pokémon fan, and lifelong
            Borussia Dortmund fan.
          </p>

          <p className="text-muted-foreground">
            If any of this sounds interesting (or not), let&apos;s talk! I want
            to hear what you&apos;re thinking about.
          </p>

          <hr className="my-2 max-w-xs border-border" />

          <blockquote className="text-muted-foreground">
            <p className="italic">
              &ldquo;Man is a thinking reed but his great works are done when he
              is not calculating and thinking. &lsquo;Childlikeness&rsquo; has to
              be restored with long years of training in
              self-forgetfulness.&rdquo;
            </p>
            <cite className="mt-3 block text-sm not-italic text-muted-foreground/70">
              — D. T. Suzuki
            </cite>
          </blockquote>
        </article>

        <nav className="pointer-events-auto mt-12 flex items-center gap-5 text-muted-foreground">
          <a
            href="mailto:ali.moh.islam.1@gmail.com"
            aria-label="Email"
            className="transition-colors hover:text-foreground"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
          <a
            href="https://x.com/amtayb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="transition-colors hover:text-foreground"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://github.com/alityb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/amtayeb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-foreground"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </nav>
      </div>
    </main>
  )
}
