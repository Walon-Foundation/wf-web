'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  {
    name: 'Web applications',
    detail: 'Full-stack, React, Next.js — performant on slow connections',
  },
  {
    name: 'Mobile apps',
    detail: 'Expo and React Native, with mobile-money integration',
  },
  {
    name: 'Payment integration',
    detail: 'Monime, mobile money, and local payment rails',
  },
  {
    name: 'AI and RAG features',
    detail: 'Chatbots, retrieval pipelines, document Q&A',
  },
  {
    name: 'PWAs for slow networks',
    detail: 'Offline-capable apps built to work on 3G',
  },
];

export function Services() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="services" className="py-24 md:py-32 bg-canvas">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 className="font-fraunces font-medium text-ink text-4xl md:text-5xl mb-6">
              We build software for you
            </h2>
            <p className="text-mist leading-relaxed mb-8">
              Businesses, NGOs, and individuals hire the foundation to build
              software that works for Sierra Leone — and beyond. We understand
              the local infrastructure, the payment landscape, and the
              constraints your users actually face.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center px-6 py-3 bg-clay text-canvas text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Book a session
            </Link>
          </motion.div>

          <motion.ul
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            {SERVICES.map((s) => (
              <li
                key={s.name}
                className="flex flex-col py-5 border-b border-hairline last:border-b-0"
              >
                <span className="text-ink font-medium text-sm mb-1">
                  {s.name}
                </span>
                <span className="text-mist text-sm">{s.detail}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
