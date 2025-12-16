import { NextResponse } from "next/server"
import Parser from "rss-parser"

const parser = new Parser()

export async function GET() {
  const substackUrl = process.env.SUBSTACK_URL || process.env.NEXT_PUBLIC_SUBSTACK_URL

  if (!substackUrl) {
    return NextResponse.json({
      posts: [],
    })
  }

  try {
    // Clean up URL - remove trailing slash and ensure proper format
    const cleanUrl = substackUrl.trim().replace(/\/$/, "")
    
    // Substack RSS feed format: https://[domain]/feed
    // Works for both custom domains and substack.com subdomains
    // Try /feed/ first (with trailing slash) as some Substack feeds use that
    let rssUrl = cleanUrl.endsWith("/feed") || cleanUrl.endsWith("/feed/") 
      ? cleanUrl.replace(/\/feed\/?$/, "") 
      : cleanUrl
    rssUrl = `${rssUrl}/feed`
    
    // Fetching Substack RSS feed
    
    // Fetch the feed manually first to handle redirects
    const response = await fetch(rssUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      redirect: "follow",
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`)
    }
    
    const xmlText = await response.text()
    const feed = await parser.parseString(xmlText)
    
    if (!feed || !feed.items) {
      console.warn("No items found in RSS feed")
      return NextResponse.json({ posts: [] })
    }
    
    const posts = feed.items.slice(0, 3).map((item) => ({
      title: item.title || "",
      link: item.link || "",
      pubDate: item.pubDate || "",
    }))

    return NextResponse.json({ 
      posts,
      substackUrl: cleanUrl, // Return the base URL for "read more" link
    })
  } catch (error) {
    console.error("Error fetching Substack feed:", error)
    // Return empty array instead of error so component doesn't break
    return NextResponse.json({ 
      posts: [],
      error: error instanceof Error ? error.message : "Failed to fetch Substack posts"
    })
  }
}

