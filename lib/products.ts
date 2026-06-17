export type Product = {
  repo: string;
  description: string;
  domain: string;
  language: string;
};

export const PRODUCTS: Product[] = [
  {
    repo: 'fundwave',
    description:
      'Crowdfunding built for Sierra Leoneans, with mobile-money payments',
    domain: 'Fintech',
    language: 'TypeScript',
  },
  {
    repo: 'tele-health',
    description:
      'Anonymous mental-health counseling PWA — works on 3G, asks for no personal info',
    domain: 'Health',
    language: 'TypeScript / PWA',
  },
  {
    repo: 'business-directory',
    description:
      'Hackathon-winning registry with real-time verification of Sierra Leonean businesses',
    domain: 'Civic',
    language: 'TypeScript',
  },
  {
    repo: 'edu-ai',
    description: 'Turns PDFs into summaries, flashcards, and Q&A',
    domain: 'Education',
    language: 'TypeScript',
  },
  {
    repo: 'health-chatbot',
    description:
      'RAG health assistant (Hono, Pinecone, OpenAI/OpenRouter, PostgreSQL)',
    domain: 'Health',
    language: 'TypeScript',
  },
  {
    repo: 'deen-track',
    description:
      'Privacy-first tracker for Muslims to log reflections and spiritual progress',
    domain: 'Community',
    language: 'TypeScript',
  },
  {
    repo: 'monime-package',
    description: 'Typed helpers for Monime mobile-money payments',
    domain: 'Fintech tooling',
    language: 'TypeScript / Go',
  },
  {
    repo: 'chatbot-react',
    description:
      'Drop-in React/Next.js chatbot component, CSS bundled inline',
    domain: 'Developer tooling',
    language: 'React / CSS',
  },
];
