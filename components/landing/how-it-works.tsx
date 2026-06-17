'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    n: '01',
    title: 'Book a session',
    detail: 'Fill out the intake form. Takes two minutes.',
  },
  {
    n: '02',
    title: 'Scope the work',
    detail:
      'We talk through what you need, agree on the approach and timeline.',
  },
  {
    n: '03',
    title: 'Build',
    detail: 'The team ships in iterations, with regular check-ins.',
  },
  {
    n: '04',
    title: 'Ship',
    detail:
      'You get working software, source code, and a handoff that makes sense.',
  },
];

export function HowItWorks() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 md:py-32 bg-canvas">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12"
        >
          <h2 className="font-fraunces font-medium text-ink text-4xl md:text-5xl">
            How it works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="py-6 pr-8 border-t border-hairline"
            >
              <p className="font-mono text-xs text-mist mb-4">{step.n}</p>
              <h3 className="font-fraunces font-medium text-ink text-xl mb-2">
                {step.title}
              </h3>
              <p className="text-mist text-sm leading-relaxed">{step.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
