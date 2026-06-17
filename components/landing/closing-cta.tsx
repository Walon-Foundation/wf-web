'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

export function ClosingCTA() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 md:py-32 bg-forest">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="font-mono text-xs text-canvas/40 tracking-widest uppercase mb-6">
            KUSHƐ · WALON FOUNDATION
          </p>
          <h2 className="font-fraunces font-medium text-canvas text-4xl md:text-5xl lg:text-6xl leading-tight max-w-2xl mx-auto mb-8">
            Need software built? Let's talk.
          </h2>
          <p className="text-canvas/60 text-lg max-w-md mx-auto mb-10">
            Tell us what you want to build. A reply within two business days.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center px-8 py-4 bg-clay text-canvas text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Book a session
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
