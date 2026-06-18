"use client"

import { useState } from "react"
import { CommandBar, type Section } from "./command-bar"

const projects = [
  {
    name: "hotpath",
    description: "profile LLM inference",
    tech: "C++20, Python, vLLM, SGLang, Nsight Systems",
    github: "https://github.com/alityb/hotpath",
    blog: "https://tperm.xyz/hotpath/",
  },
  {
    name: "kerndiff",
    description: "hyperfine for GPU kernels; profile and compare 2 kernels in seconds.",
    tech: "CUDA, Python, CLI, Triton",
    github: "https://github.com/alityb/kerndiff",
    blog: "https://tperm.xyz/unbound/",
  },
  {
    name: "f1muse",
    description: "f1 analytics platform with natural language querying, statmuse for f1.",
    tech: "TypeScript, React, Next.js, PostgreSQL, Python",
    github: "https://github.com/alityb/f1muse",
    live: "https://f1muse.com",
    blog: "https://tperm.xyz/latency-to-insight/",
  },
  {
    name: "synccli",
    description: "a lightweight rsync-like tool for developers.",
    tech: "C++, CLI, POSIX, std::regex",
    github: "https://github.com/alityb/synccli",
  },
]

const experiences = [
  {
    company: "Overshoot AI",
    role: "Software Engineering Intern",
    dates: "Present",
    description: "inference for VLMs.",
  },
  {
    company: "DataMB",
    role: "Software Engineer",
    dates: "Aug '24 - Jul '25",
    description:
      "built visualization and automation tools for football analytics. developed data pipelines and interactive dashboards for performance analysis.",
    tech: "Python, TypeScript, React, Docker, Redis",
  },
  {
    company: "KFUPM",
    role: "Research Assistant",
    dates: "Jul '23 - Sep '24",
    description:
      "convinced my mentor to pursue an ML project for the first time. researched deep learning applications in polymers.",
    tech: "Machine Learning, Python, PyTorch",
  },
  {
    company: "BAS",
    role: "Research Intern",
    dates: "Sep '23 - Oct '23",
    description: "worked on algorithm optimization.",
    tech: "Algorithms, C++, Optimization",
  },
]

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [section, setSection] = useState<Section>("home")

  return (
    <>
      <div className="mb-8">
        <CommandBar section={section} setSection={setSection} />
      </div>

      {section === "home" && children}

      {section === "projects" && (
        <div className="space-y-4">
          {projects.map((p) => (
            <div key={p.name} className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-sm text-foreground">{p.name}</span>
                <span className="font-mono text-xs text-muted-foreground">· {p.description}</span>
              </div>
              <p className="font-mono text-[11px] text-muted-foreground/70">{p.tech}</p>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground underline transition-colors hover:text-foreground">
                    github
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-muted-foreground underline transition-colors hover:text-foreground">
                    live
                  </a>
                )}
                {p.blog && (
                  <a href={p.blog} target="_blank" rel="noopener noreferrer" className="text-muted-foreground underline transition-colors hover:text-foreground">
                    blog
                  </a>
                )}
              </div>
            </div>
          ))}
          <a
            href="https://github.com/alityb"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-mono text-[11px] text-muted-foreground/40 transition-colors hover:text-muted-foreground"
          >
            + a couple others in archive
          </a>
        </div>
      )}

      {section === "experience" && (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.company} className="space-y-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-sm text-foreground">
                  {exp.company} <span className="text-muted-foreground">· {exp.role}</span>
                </span>
                <span className="shrink-0 font-mono text-[11px] text-muted-foreground/70">{exp.dates}</span>
              </div>
              <p className="font-mono text-xs leading-relaxed text-muted-foreground">{exp.description}</p>
              {exp.tech && (
                <p className="font-mono text-[11px] text-muted-foreground/50">{exp.tech}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {section === "blog" && (
        <p className="font-mono text-sm text-muted-foreground">todo</p>
      )}
    </>
  )
}
