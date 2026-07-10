import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import { ProductCard } from '@/components/landing/product-card';
import { PRODUCTS } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Our work',
  description:
    'Client systems and open-source tools built by Walon Foundation — across health, education, fintech, developer tooling, and AI.',
};

export default function WorkPage() {
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
              What we've shipped
            </p>
            <h1 className="font-fraunces font-medium text-ink text-4xl md:text-5xl mb-4">
              Our work.
            </h1>
            <p className="text-mist max-w-lg leading-relaxed">
              Client systems and open-source tools — across community health,
              education, fintech, developer tooling, and AI. Built to run in
              real conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.repo} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
