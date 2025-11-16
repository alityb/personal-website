export interface WorkExperience {
  id: string
  company: string
  role: string
  period: string
  story: string
  tags: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  tech: string[]
  outcomes: string[]
  link?: string
}

export interface Publication {
  id: string
  title: string
  authors: string
  venue: string
  year: string
  link?: string
}

export interface BlogPost {
  id: string
  title: string
  date: string
  preview: string
  content: string
  tags: string[]
}

export const workExperiences: WorkExperience[] = [
  {
    id: "scottylabs",
    company: "ScottyLabs",
    role: "Software Engineer",
    period: "aug '25 - present",
    story:
      "tinkering campuse-wide applications for CMU students.",
    tags: ["Rust"],
  },
  {
    id: "datamb",
    company: "DataMB",
    role: "Software Engineer",
    period: "aug '24 - jul '25",
    story:
      "built visualization and automation tools for football analytics. developed data pipelines and interactive dashboards for performance analysis.",
    tags: ["Python", "Typescript", "React", "Docker", "Redis"],
  },
  {
    id: "kfupm",
    company: "King Fahd University of Petroleum & Minerals",
    role: "Research Assistant",
    period: "jul '23 - sep '24",
    story:
      "convinced my mentor to pursue an ML project for the first time. researched deep learning applications in polymers.",
    tags: ["Machine Learning", "Python", "TensorFlow"],
  },
  {
    id: "bas",
    company: "Bulgarian Academy of Sciences",
    role: "Research Intern",
    period: "sep '23 - oct '23",
    story:
      "worked on algorithm optimization.",
    tags: ["Algorithms", "C++", "Optimization"],
  },
]

export const projects: Project[] = [
  {
    id: "synccli",
    name: "synccli",
    description:
      "a lightweight rsync-like tool for developers.",
    tech: ["C++", "CLI", "POSIX", "std::regex"],
    outcomes: ["instant codebase sharing", "LLM-friendly formatting", "smart file filtering", "cross-platform support"],
    link: "https://github.com/alityb/synccli",
  },
  {
    id: "smartfilecmd",
    name: "smartfilecmd",
    description:
      "natural language file manager for the terminal. built to fix my messy downloads folder.",
    tech: ["Python", "C++", "CLI", "JSON"],
    outcomes: [
      "intuitive file operations",
      "natural language processing",
      "terminal-native experience",
      "batch operations support",
    ],
    link: "https://github.com/alityb/smartfilecmd",
  },
]

export const publications: Publication[] = [
  {
    id: "pub1",
    title: "Machine Learning for Predicting and Optimizing the CO2 Uptake in Porous Organic Polymers",
    authors: "Hamid Zentou, Ali M. Tayeb, Islam M. Tayeb, Mahmoud M. Abdelnaby",
    venue: "Journal of Environmental Chemical Engineering",
    year: "2025",
    link: "https://doi.org/10.1016/j.jece.2025.119315",
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: "blog1",
    title: "BIG THINGS. STAY TUNED",
    date: "2025",
    preview: "",
    content: ``,
    tags: ["cook"],
  },
]

export function searchContent(query: string): {
  work: WorkExperience[]
  projects: Project[]
  publications: Publication[]
  blog: BlogPost[]
} {
  const lowerQuery = query.toLowerCase()

  return {
    work: workExperiences.filter(
      (w) =>
        w.company.toLowerCase().includes(lowerQuery) ||
        w.role.toLowerCase().includes(lowerQuery) ||
        w.story.toLowerCase().includes(lowerQuery) ||
        w.tags.some((t) => t.toLowerCase().includes(lowerQuery)),
    ),
    projects: projects.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.tech.some((t) => t.toLowerCase().includes(lowerQuery)) ||
        p.outcomes.some((o) => o.toLowerCase().includes(lowerQuery)),
    ),
    publications: publications.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.authors.toLowerCase().includes(lowerQuery) ||
        p.venue.toLowerCase().includes(lowerQuery),
    ),
    blog: blogPosts.filter(
      (b) =>
        b.title.toLowerCase().includes(lowerQuery) ||
        b.preview.toLowerCase().includes(lowerQuery) ||
        b.content.toLowerCase().includes(lowerQuery) ||
        b.tags.some((t) => t.toLowerCase().includes(lowerQuery)),
    ),
  }
}
