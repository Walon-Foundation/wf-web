import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import { TeamGrid } from '@/components/landing/team';

export const metadata: Metadata = {
  title: 'The team',
  description:
    'Meet the Sierra Leoneans building software systems at Walon Foundation.',
};

export default function TeamPage() {
  return (
    <>
      <Nav />
      <main className="bg-canvas min-h-screen pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-mist text-sm hover:text-ink transition-colors mb-12"
          >
            <span aria-hidden="true">←</span>
            Back
          </Link>

          <div className="mb-14">
            <p className="font-mono text-xs text-mist tracking-[0.18em] uppercase mb-3">
              The team
            </p>
            <h1 className="font-fraunces font-medium text-ink text-4xl md:text-5xl mb-4">
              Built by Sierra Leoneans.
            </h1>
            <p className="text-mist max-w-lg leading-relaxed">
              A small, focused team in Freetown building software systems for
              clients worldwide. Everyone on the team ships end to end.
            </p>
          </div>

          <TeamGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
