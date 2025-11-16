"use client"

import { useEffect, useState } from "react"

interface SubstackPost {
  title: string
  link: string
  pubDate: string
}

export default function SubstackBlog() {
  const [posts, setPosts] = useState<SubstackPost[]>([])
  const [substackUrl, setSubstackUrl] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/substack")
        const data = await response.json()
        
        if (data.error) {
          console.error("Substack API error:", data.error)
          setPosts([])
        } else {
          setPosts(data.posts || [])
          setSubstackUrl(data.substackUrl || "")
        }
      } catch (error) {
        console.error("Error fetching Substack posts:", error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="font-mono text-xs text-[#5c6370]">loading…</div>
    )
  }

  if (posts.length === 0) {
    return null
  }

  return (
    <div className="space-y-1">
      {posts.map((post, index) => {
        const formattedDate = post.pubDate
          ? (() => {
              const date = new Date(post.pubDate)
              const year = date.getFullYear()
              const month = String(date.getMonth() + 1).padStart(2, "0")
              const day = String(date.getDate()).padStart(2, "0")
              return `${year}-${month}-${day}`
            })()
          : ""
        
        return (
          <a
            key={index}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="grid grid-cols-[auto_1fr] items-center gap-4 py-1.5 px-2 -mx-2 rounded hover:bg-[#1a1a1a] transition-colors group"
          >
            <span className="font-mono text-xs text-[#5c6370]">
              {formattedDate}
            </span>
            <span className="font-mono text-sm text-[#abb2bf] text-right">
              {post.title}
            </span>
          </a>
        )
      })}
      
      {posts.length >= 3 && substackUrl && (
        <div className="pt-2 mt-2 flex justify-end">
          <a
            href={substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-[#98c379] underline decoration-[#98c379]/30 hover:decoration-[#98c379]/60 underline-offset-2 transition-colors inline-flex items-center gap-1 group"
          >
            read more
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      )}
    </div>
  )
}

