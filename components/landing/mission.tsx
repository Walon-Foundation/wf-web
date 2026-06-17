'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ContourDivider } from '@/components/ui/contour';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Mission() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 md:py-32 bg-canvas">
      <ContourDivider className="text-ink/10 mb-16" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-fraunces font-medium text-ink text-2xl md:text-3xl leading-tight max-w-3xl"
        >
          Sierra Leone has the problems. The engineers are here. The foundation
          ships the software — open source, MIT-licensed, built for low
          bandwidth, mobile money, and the constraints that people actually live
          with. Not for screenshots.
        </motion.p>
      </div>
    </section>
  );
}
