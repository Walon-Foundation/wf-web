export type Product = {
  repo: string;
  description: string;
  domain: string;
  language: string;
  tech: string[];
};

export const PRODUCTS: Product[] = [
  {
    repo: 'fundwave',
    description:
      'Crowdfunding built for Sierra Leoneans, with mobile-money payments',
    domain: 'Fintech',
    language: 'TypeScript',
    tech: ['Next.js', 'TypeScript', 'Monime API', 'Tailwind CSS'],
  },
  {
    repo: 'tele-health',
    description:
      'Anonymous mental-health counseling PWA — works on 3G, asks for no personal info',
    domain: 'Health',
    language: 'TypeScript / PWA',
    tech: ['Next.js', 'TypeScript', 'PWA', 'Service Worker'],
  },
  {
    repo: 'business-directory',
    description:
      'Hackathon-winning registry with real-time verification of Sierra Leonean businesses',
    domain: 'Civic',
    language: 'TypeScript',
    tech: ['TypeScript', 'Next.js', 'PostgreSQL', 'REST API'],
  },
  {
    repo: 'edu-ai',
    description: 'Turns PDFs into summaries, flashcards, and Q&A',
    domain: 'Education',
    language: 'TypeScript',
    tech: ['TypeScript', 'OpenAI', 'Next.js', 'PDF.js'],
  },
  {
    repo: 'health-chatbot',
    description:
      'RAG health assistant (Hono, Pinecone, OpenAI/OpenRouter, PostgreSQL)',
    domain: 'Health',
    language: 'TypeScript',
    tech: ['Hono', 'Pinecone', 'OpenAI', 'PostgreSQL'],
  },
  {
    repo: 'deen-track',
    description:
      'Privacy-first tracker for Muslims to log reflections and spiritual progress',
    domain: 'Community',
    language: 'TypeScript',
    tech: ['TypeScript', 'React', 'localStorage', 'No backend'],
  },
  {
    repo: 'monime-package',
    description: 'Typed helpers for Monime mobile-money payments',
    domain: 'Fintech tooling',
    language: 'TypeScript / Go',
    tech: ['TypeScript', 'Go', 'npm', 'Monime API'],
  },
  {
    repo: 'chatbot-react',
    description:
      'Drop-in React/Next.js chatbot component, CSS bundled inline',
    domain: 'Developer tooling',
    language: 'React / CSS',
    tech: ['React', 'TypeScript', 'CSS Modules', 'npm'],
  },
];
