'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.a
      href={`https://github.com/Walon-Foundation/${product.repo}`}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={
        prefersReduced
          ? {}
          : { y: -3, boxShadow: '0 8px 24px rgba(26,23,20,0.08)' }
      }
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
    </motion.a>
  );
}
