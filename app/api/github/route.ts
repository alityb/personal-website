import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

interface LastCommit {
  repo: string
  message: string
  sha: string
  date: string
  private: boolean
  branch: string
}

function decodeEntities(value: string) {
  return value
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&amp;", "&")
}

async function getLastPublicCommit(username: string): Promise<LastCommit | null> {
  try {
    const timelineRes = await fetch(`https://github.com/${username}.atom`)
    if (!timelineRes.ok) return null

    const timeline = await timelineRes.text()
    const pushEntry = timeline
      .match(/<entry>[\s\S]*?<\/entry>/g)
      ?.find((entry) => /<id>[^<]*:push\//.test(entry))
    if (!pushEntry) return null

    const repoName = pushEntry
      .match(/<title type="html">\s*[^<]+ pushed ([^<]+)<\/title>/)?.[1]
      ?.trim()
    const branch = decodeEntities(
      pushEntry.match(/pushed to[\s\S]*?\/tree\/([^&]+)&quot;/)?.[1] || "main",
    )
    if (!repoName) return null

    const repo = `${username}/${repoName}`
    const commitsRes = await fetch(
      `https://github.com/${repo}/commits/${encodeURIComponent(branch)}.atom`,
    )

    if (commitsRes.ok) {
      const commits = await commitsRes.text()
      const entry = commits.match(/<entry>[\s\S]*?<\/entry>/)?.[0]
      const sha = entry?.match(/Grit::Commit\/([a-f\d]+)/)?.[1]
      const date = entry?.match(/<updated>([^<]+)<\/updated>/)?.[1]
      const encodedMessage = entry?.match(/&lt;pre[\s\S]*?&gt;([\s\S]*?)&lt;\/pre&gt;/)?.[1]

      if (entry && sha && date && encodedMessage) {
        return {
          repo,
          message: decodeEntities(encodedMessage).trim().split("\n")[0],
          sha: sha.slice(0, 7),
          date,
          private: false,
          branch,
        }
      }
    }

    const sha = pushEntry.match(/\/commit\/([a-f\d]+)&quot;/)?.[1]
    const date = pushEntry.match(/<updated>([^<]+)<\/updated>/)?.[1]
    const encodedMessage = pushEntry.match(/&lt;blockquote&gt;\s*([\s\S]*?)\s*&lt;\/blockquote&gt;/)?.[1]
    if (!sha || !date || !encodedMessage) return null

    return {
      repo,
      message: decodeEntities(encodedMessage).trim(),
      sha: sha.slice(0, 7),
      date,
      private: false,
      branch,
    }
  } catch {
    return null
  }
}

async function getLastCommit(username: string): Promise<LastCommit | null> {
  try {
    const token = process.env.GITHUB_TOKEN
    if (!token) return getLastPublicCommit(username)

    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    }
    const eventsRes = await fetch(`https://api.github.com/users/${username}/events?per_page=10`, {
      headers,
    })
    if (!eventsRes.ok) return getLastPublicCommit(username)
    const events = await eventsRes.json()

    for (const event of events) {
      if (event.type !== "PushEvent") continue
      const repoFull = event.repo.name
      const [owner, repo] = repoFull.split("/")
      const commitSha = event.payload?.commits?.[0]?.sha
      const created = event.created_at
      const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers })
      const repoData = repoRes.ok ? await repoRes.json() : null
      const isPrivate = repoData?.private === true
      const branch = repoData?.default_branch || "main"

      if (commitSha) {
        const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${commitSha}`, {
          headers,
        })
        if (commitRes.ok) {
          const commit = await commitRes.json()
          return {
            repo: repoFull,
            message: commit.commit.message.split("\n")[0],
            sha: commitSha.slice(0, 7),
            date: created,
            private: isPrivate,
            branch,
          }
        }
        if (commitRes.status === 404) {
          return {
            repo: repoFull,
            message: "",
            sha: "",
            date: created,
            private: true,
            branch,
          }
        }
      }

      // Fallback: try latest commit on the repo
      const latestRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
        headers,
      })
      if (latestRes.ok) {
        const commits = await latestRes.json()
        if (commits[0]) {
          return {
            repo: repoFull,
            message: commits[0].commit.message.split("\n")[0],
            sha: commits[0].sha.slice(0, 7),
            date: commits[0].commit.author.date,
            private: isPrivate,
            branch,
          }
        }
      }

      if (latestRes.status === 404) {
        return {
          repo: repoFull,
          message: "",
          sha: "",
          date: created,
          private: true,
          branch,
        }
      }
    }
    return getLastPublicCommit(username)
  } catch {
    return getLastPublicCommit(username)
  }
}

export async function GET() {
  const username = "alityb"
  const lastCommit = await getLastCommit(username)

  return NextResponse.json({ lastCommit })
}
