export type CaseStudy = {
  overview: string;
  challenge: string;
  solution: string;
  whyItMatters: string;
  highlights: string[];
};

export type FeaturedProject = {
  slug: string;
  mark: string;
  name: string;
  label: string;
  href: string;
  owner: string;
  repo: string;
  outcome: string;
  tags: string[];
  summary: string;
  caseStudy?: CaseStudy;
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "business-directory",
    mark: "BD",
    name: "Business Directory",
    label: "Public Platform",
    href: "https://github.com/Walon-Foundation/business-directory",
    owner: "Walon-Foundation",
    repo: "business-directory",
    outcome: "Business verification for Sierra Leone",
    tags: ["Next.js", "Search", "Directory"],
    summary:
      "A verification and discovery platform for Sierra Leonean businesses built for trust, searchability, and public usefulness.",
    caseStudy: {
      overview:
        "A public platform designed to make business legitimacy easier to verify and trust in a local context where discoverability and confidence matter.",
      challenge:
        "Business information is often fragmented, hard to verify, or difficult for regular users to navigate. That creates trust problems for consumers, institutions, and the businesses themselves.",
      solution:
        "The platform organizes business data into a searchable, verification-oriented product surface with practical filters, clearer business records, and a stronger emphasis on public utility over visual novelty.",
      whyItMatters:
        "It shows the foundation's interest in software that solves public-facing trust problems, not just developer-only or internal workflows.",
      highlights: [
        "Search-first experience designed around verification",
        "Public utility framing instead of generic directory UI",
        "Built as a real platform concept, not just a design exercise",
      ],
    },
  },
  {
    slug: "edu-ai",
    mark: "EA",
    name: "Edu-AI",
    label: "AI System",
    href: "https://github.com/Walon-Foundation/edu-ai",
    owner: "Walon-Foundation",
    repo: "edu-ai",
    outcome: "PDFs turned into study material",
    tags: ["React", "AI", "Education"],
    summary:
      "A document-to-learning platform that turns PDFs into summaries, flash cards, and question-driven study material.",
    caseStudy: {
      overview:
        "An AI-assisted education workflow that takes dense source material and transforms it into study-friendly outputs that are more actionable than raw documents.",
      challenge:
        "Students and learners often have access to source material but not enough structure. Large PDFs and course documents are difficult to convert into useful, repeatable learning tools.",
      solution:
        "Edu-AI ingests PDFs, processes the content, and generates summaries, flash cards, and Q&A-oriented outputs through an app-router full-stack flow with AI generation and data plumbing behind it.",
      whyItMatters:
        "It demonstrates applied AI thinking with a practical user problem, not AI layered onto a product without a clear use case.",
      highlights: [
        "PDF ingestion tied directly to study outputs",
        "AI workflow designed around usefulness, not novelty",
        "Full-stack implementation spanning UI, storage, and generation",
      ],
    },
  },
  {
    slug: "safespace-salone",
    mark: "SS",
    name: "SafeSpace Salone",
    label: "Health Product",
    href: "https://github.com/Walon-Foundation/tele-health",
    owner: "Walon-Foundation",
    repo: "tele-health",
    outcome: "Low-bandwidth mental health support",
    tags: ["PWA", "Health", "Access"],
    summary:
      "A low-bandwidth mental health support platform designed around privacy, accessibility, and practical delivery constraints.",
    caseStudy: {
      overview:
        "A product concept aimed at making mental health support more reachable under real-world constraints like low bandwidth, privacy sensitivity, and limited infrastructure.",
      challenge:
        "Mental health support is often least accessible where stigma, privacy concerns, and infrastructure limitations are strongest. A product in this space has to treat constraints as core product inputs.",
      solution:
        "SafeSpace Salone focuses on lightweight delivery, anonymous interaction patterns, and a product shape that prioritizes access and privacy from the beginning instead of treating them as add-ons.",
      whyItMatters:
        "It shows a product mindset shaped by context, not just a stack choice. The software is designed around realities on the ground.",
      highlights: [
        "Low-bandwidth-first product thinking",
        "Privacy and access as first-order design concerns",
        "Public-interest software with practical delivery constraints",
      ],
    },
  },
  {
    slug: "health-chatbot",
    mark: "HC",
    name: "Health Chatbot",
    label: "RAG Infrastructure",
    href: "https://github.com/Walon-Foundation/health-chatbot",
    owner: "Walon-Foundation",
    repo: "health-chatbot",
    outcome: "Document-grounded health responses",
    tags: ["RAG", "Hono", "Pinecone"],
    summary:
      "A healthcare-focused retrieval and document processing system built to power better responses with real source grounding.",
  },
  {
    slug: "monime-package",
    mark: "MP",
    name: "Monime Package",
    label: "SDK",
    href: "https://github.com/Walon-Foundation/monime-package",
    owner: "Walon-Foundation",
    repo: "monime-package",
    outcome: "Typed payment integration helpers",
    tags: ["TypeScript", "SDK", "Payments"],
    summary:
      "A TypeScript SDK for Monime with typed helpers and predictable interfaces for payment platform integration.",
  },
  {
    slug: "backend-starter-cli",
    mark: "BC",
    name: "Backend Starter CLI",
    label: "Developer Tool",
    href: "https://github.com/Walon-Foundation/backend-starter-cli",
    owner: "Walon-Foundation",
    repo: "backend-starter-cli",
    outcome: "Faster backend scaffolding",
    tags: ["Go", "CLI", "Scaffolding"],
    summary:
      "A Go-based CLI for scaffolding backend projects quickly without sacrificing useful structure and workflow clarity.",
  },
];

export const caseStudyProjects = featuredProjects.filter(
  (project): project is FeaturedProject & { caseStudy: CaseStudy } =>
    project.caseStudy !== undefined,
);

export function getProjectBySlug(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}
