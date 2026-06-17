'use client';

import { m, useReducedMotion } from 'framer-motion';
import type { Product } from '@/lib/products';

const GITHUB_BASE = 'https://github.com/Walon-Foundation';

export function ProductCard({ product }: { product: Product }) {
  const prefersReduced = useReducedMotion();
  const href = product.url ?? `${GITHUB_BASE}/${product.repo}`;

  return (
    <m.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={prefersReduced ? {} : {
        y: -4,
        boxShadow: '0 12px 32px rgba(26,23,20,0.10)',
      }}
      whileTap={prefersReduced ? {} : { scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 360, damping: 26 }}
      className="flex flex-col p-6 border border-hairline rounded-xl bg-canvas hover:border-ink/20 transition-colors h-full"
    >
      <p className="font-mono text-xs text-mist mb-3">{product.domain}</p>
      <h3 className="font-mono text-sm text-ink font-medium mb-2">
        {product.repo}
      </h3>
      <p className="text-mist text-sm leading-relaxed mb-4 flex-1">
        {product.description}
      </p>
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-mist/60">{product.language}</p>
        {product.url ? (
          <span className="font-mono text-xs text-clay">live ↗</span>
        ) : (
          <span className="font-mono text-xs text-mist/40">github ↗</span>
        )}
      </div>
    </m.a>
  );
}
