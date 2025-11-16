"use client"

import Link from "next/link"
import { projects } from "@/lib/content"
import CleanGridBackground from "@/components/clean-grid-background"

export default function ProjectsPage() {
  return (
    <>
      <CleanGridBackground />
      <main className="min-h-screen bg-background relative z-10 p-4 md:p-6">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-mono text-[#98c379]">projects</h1>
            <Link 
              href="/" 
              className="text-base font-mono text-[#abb2bf] hover:text-[#98c379] transition-colors"
            >
              ali
            </Link>
          </div>

        {/* Projects */}
        <div className="space-y-12">
          {projects.map((project) => (
            <div key={project.id} className="space-y-3 group">
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-mono text-[#98c379] underline decoration-[#98c379]/30 hover:decoration-[#98c379]/60 hover:text-[#61afef] underline-offset-2 transition-colors inline-block"
                >
                  {project.name}
                </a>
              ) : (
                <h2 className="text-lg font-mono text-[#98c379]">
                  {project.name}
                </h2>
              )}
              <p className="leading-relaxed text-[#abb2bf] text-sm">
                {project.description}
              </p>
              <div className="space-y-2">
                <div className="text-sm font-mono text-[#5c6370]">
                  tech stack:
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs font-mono px-2 py-1 rounded text-[#abb2bf] bg-[#abb2bf]/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-mono text-[#5c6370]">
                  outcomes:
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm text-[#5c6370]">
                  {project.outcomes.map((outcome, idx) => (
                    <li key={idx}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
    </>
  )
}
