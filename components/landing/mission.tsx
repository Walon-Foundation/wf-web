'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ContourDivider } from '@/components/ui/contour';

const EASE = [0.22, 1, 0.36, 1] as const;

const LINES = [
  'We build software that solves real problems.',
  'Your data stays private —',
  'handled with care, secured where it needs to be.',
  'What we can open-source, we do:',
  'MIT-licensed, built for low bandwidth, mobile money,',
  'and the constraints people actually live with.',
  'Not for screenshots.',
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const line = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export function Mission() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="pt-0 pb-24 md:pb-32 bg-canvas">
      <ContourDivider className="text-ink/10 mb-12" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          variants={prefersReduced ? undefined : container}
          initial={prefersReduced ? { opacity: 0, y: 16 } : 'hidden'}
          whileInView={prefersReduced ? { opacity: 1, y: 0 } : 'show'}
          viewport={{ once: true, margin: '-80px' }}
          transition={prefersReduced ? { duration: 0.8, ease: EASE } : undefined}
          className="font-fraunces font-medium text-ink text-2xl md:text-3xl leading-tight max-w-3xl"
        >
          {prefersReduced
            ? LINES.join(' ')
            : LINES.map((l, i) => (
                <motion.span key={i} variants={line} className="inline">
                  {l}{' '}
                </motion.span>
              ))}
        </motion.p>
      </div>
    </section>
  );
}
