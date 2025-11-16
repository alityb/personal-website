import Link from "next/link"
import { workExperiences } from "@/lib/content"

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-mono text-primary">work</h1>
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono">
            ← home
          </Link>
        </div>

        {/* Work experiences */}
        <div className="space-y-12">
          {workExperiences.map((exp) => (
            <div key={exp.id} className="space-y-3 group">
              <h2 className="text-xl font-mono text-foreground underline decoration-primary decoration-2 underline-offset-4">
                {exp.company}
              </h2>
              <div className="text-sm font-mono text-muted-foreground">{exp.role}</div>
              <div className="text-sm font-mono text-cyan-400">({exp.period})</div>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">{exp.story}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {exp.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono text-primary/70 bg-primary/10 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
