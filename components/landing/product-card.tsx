'use client';

import { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Product } from '@/lib/products';

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="relative"
      onMouseEnter={() => !prefersReduced && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <m.a
        href={`https://github.com/Walon-Foundation/${product.repo}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={prefersReduced ? {} : { y: -3, boxShadow: '0 8px 24px rgba(26,23,20,0.08)' }}
        whileTap={prefersReduced ? {} : { scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="flex flex-col p-6 border border-hairline rounded-xl bg-canvas hover:border-ink/20 transition-colors h-full"
      >
        <p className="font-mono text-xs text-mist mb-3">{product.domain}</p>
        <h3 className="font-mono text-sm text-ink font-medium mb-2">
          {product.repo}
        </h3>
        <p className="text-mist text-sm leading-relaxed mb-4 flex-1">
          {product.description}
        </p>
        <p className="font-mono text-xs text-mist/60">{product.language}</p>
      </m.a>

      <AnimatePresence>
        {hovered && (
          <m.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-forest rounded-xl p-5 shadow-xl pointer-events-none"
            aria-hidden="true"
          >
            {/* Arrow pointing up */}
            <div className="absolute bottom-full left-6 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[7px] border-b-forest" />

            <p className="font-mono text-xs text-canvas/40 uppercase tracking-widest mb-3">
              {product.domain}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs text-canvas/70 border border-canvas/15 rounded-md px-2 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="font-mono text-xs text-clay/80 truncate">
              github.com/Walon-Foundation/{product.repo}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
