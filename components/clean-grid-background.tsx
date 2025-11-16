"use client"

export default function CleanGridBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(171, 178, 191, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(171, 178, 191, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
  )
}

