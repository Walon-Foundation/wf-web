'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from './product-card';

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export function Manifest() {
  const prefersReduced = useReducedMotion();

  const cardItem = {
    hidden: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <section id="work" className="py-24 md:py-32 bg-canvas">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12"
        >
          <h2 className="font-fraunces font-medium text-ink text-4xl md:text-5xl mb-4">
            What we've shipped
          </h2>
          <p className="text-mist max-w-lg">
            Eight open-source products across fintech, health, education, civic
            tech, and developer tooling.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {PRODUCTS.map((product) => (
            <motion.div key={product.repo} variants={cardItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
