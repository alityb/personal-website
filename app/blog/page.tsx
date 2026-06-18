import { CommandBar } from "@/components/command-bar"

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-20 sm:px-10">
        <div className="mb-10">
          <CommandBar />
        </div>

        <p className="font-mono text-sm text-muted-foreground">todo</p>
      </div>
    </main>
  )
}
