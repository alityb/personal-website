"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import CleanGridBackground from "@/components/clean-grid-background"
import SubstackBlog from "@/components/substack-blog"
import LastPlayed from "@/components/last-played"
import KeyboardShortcuts from "@/components/keyboard-shortcuts"
import { ContactModal, ContactTrigger } from "@/components/contact-modal"
import { workExperiences, projects } from "@/lib/content"

export default function HomePage() {
  const [showCursor, setShowCursor] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <CleanGridBackground />
      <Header />
      <LastPlayed />
      <KeyboardShortcuts />
      <ContactModal />

      <main className="min-h-screen relative z-10 pt-20 pb-24">
        <div className="fixed inset-0 pointer-events-none z-20 scanlines opacity-5" />

        <div className="max-w-[800px] mx-auto px-4 md:px-6 space-y-8">

          {/* Bio */}
          <div
            className={`space-y-2 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="font-mono text-3xl md:text-4xl">
              <span className="text-[#abb2bf]">$ ali tayeb</span>
              <span
                className={`text-[#98c379] transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`}
              >
                ▊
              </span>
            </div>
            <div className="font-mono text-sm text-[#5c6370] leading-relaxed space-y-1">
              <p>
                cs @ cmu. interested in systems, and dev tools. i like sports,{" "}
                <a
                  href="https://www.worldcubeassociation.org/persons/2024TAYE01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[#5c6370]/30 hover:decoration-[#5c6370]/50 underline-offset-2"
                >
                  speedcubing
                </a>
                {" "}and{" "}
                <a
                  href="https://www.last.fm/user/amtayeb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[#5c6370]/30 hover:decoration-[#5c6370]/50 underline-offset-2"
                >
                  music
                </a>
                {" "}too! currently exploring cuda.
              </p>
              <p>
                reach out at{" "}
                <a
                  href="mailto:ali.moh.islam.1@gmail.com"
                  className="text-[#98c379] hover:text-[#61afef] transition-colors"
                >
                  ali.moh.islam.1@gmail.com
                </a>
                {" "}or <ContactTrigger />
              </p>
            </div>
          </div>

          {/* Experiences + Projects grid */}
          <div
            className={`grid md:grid-cols-2 gap-8 mt-6 transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {/* Experiences */}
            <section id="work" className="space-y-3">
              <h2 className="font-mono text-xl text-[#98c379] flex items-center gap-1.5">
                <span className="text-[#61afef]">~/</span>experiences
              </h2>
              <div className="space-y-2">
                {workExperiences.map((work) => (
                  <div
                    key={work.id}
                    className="border border-dashed border-[#262626] rounded-lg p-3.5 bg-[#0a0a0a] hover:border-[#98c379]/20 transition-colors"
                  >
                    <div className="space-y-1.5">
                      {/* Role, Company — period on right */}
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-1.5 min-w-0 flex-wrap">
                          <span className="font-mono text-xs text-[#abb2bf]">{work.role},</span>
                          <span className="font-mono text-xs text-[#98c379]">{work.company}</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#3e4451] shrink-0 whitespace-nowrap">{work.period}</span>
                      </div>
                      <p className="font-mono text-[11px] text-[#5c6370] leading-relaxed">{work.story}</p>
                      {work.tags && work.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {work.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono text-[#3e4451] border border-[#1e1e1e] px-1.5 rounded"
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

            {/* Projects */}
            <section id="projects" className="space-y-3">
              <h2 className="font-mono text-xl text-[#98c379] flex items-center gap-1.5">
                <span className="text-[#61afef]">~/</span>projects
              </h2>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="border border-dashed border-[#262626] rounded-lg p-3.5 bg-[#0a0a0a] hover:border-[#98c379]/20 transition-colors"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        {/* Name links to demo site or github */}
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-[#98c379] hover:text-[#61afef] transition-colors"
                          >
                            {project.name}
                          </a>
                        ) : project.github ? (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-[#98c379] hover:text-[#61afef] transition-colors"
                          >
                            {project.name}
                          </a>
                        ) : (
                          <span className="font-mono text-xs text-[#98c379]">{project.name}</span>
                        )}

                        {/* gh / post links */}
                        <div className="flex items-center gap-2 shrink-0">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[10px] text-[#3e4451] hover:text-[#abb2bf] transition-colors"
                            >
                              gh
                            </a>
                          )}
                          {project.blog && (
                            <a
                              href={project.blog}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[10px] text-[#3e4451] hover:text-[#abb2bf] transition-colors"
                            >
                              post
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="font-mono text-[11px] text-[#5c6370] leading-relaxed">{project.description}</p>
                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono text-[#3e4451] border border-[#1e1e1e] px-1.5 rounded"
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
              <a
                href="https://github.com/alityb"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#5c6370] hover:text-[#98c379] transition-colors inline-block"
              >
                show all →
              </a>
            </section>
          </div>

          {/* Blog */}
          <section
            id="blog"
            className={`space-y-4 transition-all duration-1000 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h2 className="font-mono text-xl text-[#98c379] glow-text flex items-center gap-1.5">
              <span className="text-[#61afef]">~/</span>blog
            </h2>
            <SubstackBlog />
          </section>

        </div>
      </main>
    </>
  )
}
