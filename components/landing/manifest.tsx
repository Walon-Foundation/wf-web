'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from './product-card';

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EASE },
  },
};

export function Manifest() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="work" className="py-24 md:py-32 bg-canvas">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 24, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
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
          variants={prefersReduced ? undefined : container}
          initial={prefersReduced ? { opacity: 0 } : 'hidden'}
          whileInView={prefersReduced ? { opacity: 1 } : 'show'}
          viewport={{ once: true, margin: '-80px' }}
          transition={prefersReduced ? { duration: 0.6 } : undefined}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.repo}
              variants={prefersReduced ? undefined : cardVariant}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
