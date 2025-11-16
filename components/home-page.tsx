"use client"

import type React from "react"

import { useEffect, useState, useActionState } from "react"
import Header from "@/components/header"
import CleanGridBackground from "@/components/clean-grid-background"
import SubstackBlog from "@/components/substack-blog"
import { workExperiences, projects, publications } from "@/lib/content"
import { sendEmail } from "@/lib/actions"

export default function HomePage() {
  const [showCursor, setShowCursor] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [state, formAction, isPending] = useActionState(sendEmail, null)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <CleanGridBackground />

      <Header />
      <main className="min-h-screen relative z-10 pt-20 pb-12">
        <div className="fixed inset-0 pointer-events-none z-20 scanlines opacity-5" />

        <div className="max-w-[800px] mx-auto px-4 md:px-6 space-y-16">
          <div
            className={`space-y-3 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="font-mono text-3xl md:text-4xl">
              <span className="text-[#abb2bf]">$ ali tayeb</span>
              <span
                className={`text-[#98c379] transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`}
              >
                ▊
              </span>
            </div>

            <div className="space-y-1 font-mono text-sm md:text-base">
              <p className="text-[#5c6370]">cs @ cmu. interested in systems, dev tools and under-the-hood optimization. i like sports, speedcubing and music too! currently exploring nlp. </p>
              <br />
              <p className="text-[#5c6370]">
                feel free to reach out at{" "}
                <a
                  href="mailto:ali.moh.islam.1@gmail.com"
                  className="text-[#98c379] hover:text-[#61afef] transition-colors"
                >
                  ali.moh.islam.1@gmail.com
                </a>
                
              </p>
            </div>
          </div>

          <div
            className={`grid md:grid-cols-2 gap-12 transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <section id="work" className="space-y-6">
              <h2 className="font-mono text-2xl text-[#98c379] flex items-center gap-2">
                <span className="text-[#61afef]">~/</span>experiences
              </h2>
              <div className="space-y-4">
                {workExperiences.map((work, index) => (
                  <div
                    key={work.id}
                    className="border border-dashed border-[#262626] rounded-lg p-6 bg-[#0a0a0a] hover:border-[#98c379]/20 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <div className="font-mono text-sm">
                          <span className="text-[#abb2bf]">{work.role},</span>{" "}
                          <span className="text-[#98c379] underline decoration-[#98c379]/30 hover:decoration-[#98c379]/60 underline-offset-2 transition-colors">
                            {work.company}
                          </span>
                        </div>
                        <div className="font-mono text-xs text-[#5c6370]">
                          {work.period}
                        </div>
                      </div>
                      <p className="font-mono text-xs text-[#5c6370] leading-relaxed max-w-none">{work.story}</p>
                      {work.tags && work.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {work.tags.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="text-xs font-mono text-[#5c6370] border border-[#262626] px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="projects" className="space-y-6">
              <h2 className="font-mono text-2xl text-[#98c379] flex items-center gap-2">
                <span className="text-[#61afef]">~/</span>projects
              </h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="border border-dashed border-[#262626] rounded-lg p-6 bg-[#0a0a0a] hover:border-[#98c379]/20 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-3">
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-sm text-[#98c379] underline decoration-[#98c379]/30 hover:decoration-[#98c379]/60 hover:text-[#61afef] underline-offset-2 transition-colors"
                          >
                            {project.name}
                          </a>
                        ) : (
                          <h3 className="font-mono text-sm text-[#98c379] underline decoration-[#98c379]/30 hover:decoration-[#98c379]/60 underline-offset-2 transition-colors">
                            {project.name}
                          </h3>
                        )}
                      </div>
                      <p className="font-mono text-xs text-[#5c6370] leading-relaxed">{project.description}</p>
                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {project.tech.map((tech, techIdx) => (
                            <span
                              key={techIdx}
                              className="text-xs font-mono text-[#5c6370] border border-[#262626] px-2 py-0.5 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section
            id="publications"
            className={`space-y-6 transition-all duration-1000 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h2 className="font-mono text-2xl text-[#98c379] glow-text flex items-center gap-2">
              <span className="text-[#61afef]">~/</span>publications
            </h2>
            <div className="space-y-4">
              {publications.map((pub, index) => {
                // Make "Ali M. Tayeb" bold in authors
                const authorParts = pub.authors.split(", ").map((author, idx) => {
                  const isBold = author.includes("Ali M. Tayeb") || author.includes("Ali M Tayeb")
                  return (
                    <span key={idx}>
                      {idx > 0 && ", "}
                      {isBold ? (
                        <strong className="font-bold">{author}</strong>
                      ) : (
                        author
                      )}
                    </span>
                  )
                })

                return (
                  <div
                    key={pub.id}
                    className="border border-dashed border-[#262626] rounded-lg p-6 bg-[#0a0a0a] hover:border-[#98c379]/20 transition-colors"
                  >
                    <div className="space-y-2">
                      <h3 className="font-mono text-sm text-[#98c379] underline decoration-[#98c379]/30 hover:decoration-[#98c379]/60 underline-offset-2 transition-colors">
                        {pub.title}
                      </h3>
                      <div className="font-mono text-xs text-[#5c6370] space-y-1">
                        <p>{authorParts}</p>
                        <p className="text-[#61afef]">
                          {pub.venue}, {pub.year}
                        </p>
                      </div>
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#98c379] text-xs hover:text-[#61afef] transition-colors inline-flex items-center gap-1 group"
                        >
                          read paper
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section
            id="blog"
            className={`space-y-6 transition-all duration-1000 delay-450 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h2 className="font-mono text-2xl text-[#98c379] glow-text flex items-center gap-2">
              <span className="text-[#61afef]">~/</span>blog
            </h2>
            <SubstackBlog />
          </section>

          <section
            id="contact"
            className={`space-y-6 transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h2 className="font-mono text-2xl text-[#98c379] glow-text flex items-center gap-2">
              <span className="text-[#61afef]">~/</span>contact
            </h2>
            <div className="border border-dashed border-[#262626] rounded-lg p-6 bg-[#0a0a0a] hover:border-[#98c379]/20 transition-colors">
              <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-mono text-[#abb2bf]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    maxLength={500}
                    className="w-full px-4 py-2 bg-[#282c34] border border-dashed border-[#5c6370] rounded font-mono text-sm text-[#abb2bf] focus:border-solid focus:border-[#5c6370] focus:outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-mono text-[#abb2bf]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    maxLength={500}
                    className="w-full px-4 py-2 bg-[#282c34] border border-dashed border-[#5c6370] rounded font-mono text-sm text-[#abb2bf] focus:border-solid focus:border-[#5c6370] focus:outline-none transition-all"
                    placeholder="johndoe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-mono text-[#abb2bf]">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    maxLength={250}
                    className="w-full px-4 py-2 bg-[#282c34] border border-dashed border-[#5c6370] rounded font-mono text-sm text-[#abb2bf] focus:border-solid focus:border-[#5c6370] focus:outline-none transition-all"
                    placeholder="Your subject must be 250 characters or fewer."
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-mono text-[#abb2bf]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={2500}
                    rows={5}
                    className="w-full px-4 py-2 bg-[#282c34] border border-dashed border-[#5c6370] rounded font-mono text-sm text-[#abb2bf] focus:border-solid focus:border-[#5c6370] focus:outline-none transition-all resize-none"
                    placeholder="Your message must be 2500 characters or fewer."
                  />
                </div>
                {state?.error && (
                  <div className="text-xs font-mono text-red-400">{state.error}</div>
                )}
                {state?.data && (
                  <div className="text-xs font-mono text-[#98c379]">Message sent successfully!</div>
                )}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full px-6 py-3 bg-[#cccccc] text-[#1a1a1a] font-mono text-sm rounded hover:bg-[#d0d0d0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "sending..." : "Submit"}
                </button>
              </form>
            </div>
          </section>

          <div className="fixed bottom-8 right-8 text-xs text-muted-foreground/40 font-mono space-y-1 pointer-events-none">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>system online</span>
            </div>
            <div>uptime: {Math.floor(Date.now() / 1000 / 60 / 60 / 24)} days</div>
          </div>
        </div>
      </main>
    </>
  )
}
