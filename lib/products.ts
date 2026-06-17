export type Product = {
  repo: string;
  description: string;
  domain: string;
  language: string;
  tech: string[];
};

export const PRODUCTS: Product[] = [
  {
    repo: 'nexus-uplift',
    description:
      'Non-profit running community health workshops in Freetown — teaching children and caregivers real causes and treatments, addressing superstitions that delay care and cost lives',
    domain: 'Community health',
    language: 'TypeScript',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    repo: 'code-lang',
    description:
      'A modern interpreted programming language written in Go, extended beyond Writing An Interpreter In Go with custom features and a Rust compiler backend',
    domain: 'Programming language',
    language: 'Go / Rust',
    tech: ['Go', 'Rust', 'Interpreter', 'Compiler'],
  },
  {
    repo: 'fundwave',
    description:
      'Crowdfunding built for Sierra Leoneans, with mobile-money payments via Monime',
    domain: 'Crowdfunding',
    language: 'TypeScript',
    tech: ['Next.js', 'TypeScript', 'Monime API'],
  },
  {
    repo: 'blast',
    description:
      'Fast, config-driven API load tester and traffic generator written in Rust',
    domain: 'Developer tooling',
    language: 'Rust',
    tech: ['Rust', 'CLI', 'HTTP'],
  },
  {
    repo: 'tele-health',
    description:
      'Anonymous mental-health counseling PWA for young people in Sierra Leone — works on 3G, no personal info required',
    domain: 'Health',
    language: 'TypeScript / PWA',
    tech: ['Next.js', 'TypeScript', 'PWA', 'Service Worker'],
  },
  {
    repo: 'backend-starter-cli',
    description:
      'CLI tool that scaffolds production-ready backend projects in seconds, with intelligent defaults and best practices built in',
    domain: 'Developer tooling',
    language: 'Go',
    tech: ['Go', 'CLI', 'Code generation'],
  },
  {
    repo: 'edu-ai',
    description:
      'Ingests PDFs and uses AI to generate summaries, flashcards, and Q&A for students',
    domain: 'Education',
    language: 'TypeScript',
    tech: ['Next.js', 'TypeScript', 'OpenAI', 'PDF.js'],
  },
  {
    repo: 'health-chatbot',
    description:
      'RAG health assistant powered by Hono, Pinecone, OpenAI/OpenRouter, and PostgreSQL',
    domain: 'Health',
    language: 'TypeScript',
    tech: ['Hono', 'Pinecone', 'OpenAI', 'PostgreSQL'],
  },
];
