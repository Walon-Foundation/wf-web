import Link from 'next/link';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="bg-canvas min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-xs text-mist tracking-widest uppercase mb-6">
          404
        </p>
        <h1 className="font-fraunces font-medium text-ink text-4xl md:text-5xl mb-4">
          Nothing here.
        </h1>
        <p className="text-mist text-sm mb-8 max-w-sm">
          That page doesn't exist. If you were looking for something specific,
          start from the homepage.
        </p>
        <Link
          href="/"
          className="text-sm text-clay hover:opacity-70 transition-opacity"
        >
          Back to Walon Foundation
        </Link>
      </main>
      <Footer />
    </>
  );
}
