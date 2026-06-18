import { CommandBar } from "@/components/command-bar"

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

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-20 sm:px-10">
        <div className="mb-10">
          <CommandBar />
        </div>

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
        </div>
        <a
          href="https://github.com/alityb"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block font-mono text-[11px] text-muted-foreground/40 transition-colors hover:text-muted-foreground"
        >
          + a couple others in archive
        </a>
      </div>
    </main>
  )
}
