export default function Hero() {
  return (
    <div style={{ marginTop: 32 }}>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-muted)" }}>
        Hey, I am Ali!
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-muted)", marginTop: 12 }}>
        I study CS @ CMU, currently working on inference @{" "}
        <a
          href="https://overshoot.ai"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          Overshoot (YC W26)
        </a>
        .
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-muted)", marginTop: 12 }}>
        I was born and raised between Egypt and Saudi Arabia, and developed a lot of
        beliefs; one that I keep to heart is working on whatever brings out a childlike
        obsession. For now that's making these models more efficient, but other stuff I've
        been exploring: compilers, RL, mech. interp.
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-muted)", marginTop: 12 }}>
        On the side, I am a huge{" "}
        <a
          href="https://www.last.fm/user/amtayeb"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          music
        </a>{" "}
        fan, speedcuber, and a lifelong Dortmund supporter!
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-muted)", marginTop: 12 }}>
        Life's short, so if any of this sounds interesting, let's talk! Reach me at{" "}
        <a
          href="mailto:ali.moh.islam.1@gmail.com"
          style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          ali.moh.islam.1@gmail.com
        </a>
        .
      </p>
    </div>
  )
}
