import { CommandBar } from "@/components/command-bar"

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

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-20 sm:px-10">
        <div className="mb-10">
          <CommandBar />
        </div>

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
      </div>
    </main>
  )
}
