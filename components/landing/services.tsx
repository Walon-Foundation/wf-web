'use client';

import Link from 'next/link';
import { m, useReducedMotion } from 'framer-motion';

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
    name: 'Data security & privacy',
    detail: 'Proper authentication, encrypted storage, and privacy-first architecture for client data',
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

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const listItem = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

export function Services() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="services" className="py-24 md:py-32 bg-canvas">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <m.div
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="font-fraunces font-medium text-ink text-4xl md:text-5xl mb-6">
              We build software for you
            </h2>
            <p className="text-mist leading-relaxed mb-8">
              Businesses, NGOs, and individuals hire the foundation to build
              software that works. We handle client data with care — securing
              it properly wherever the work calls for it. We know the local
              infrastructure, the payment landscape, and the constraints your
              users actually face.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center px-6 py-3 bg-clay text-canvas text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Book a session
            </Link>
          </m.div>

          <m.ul
            variants={prefersReduced ? undefined : listContainer}
            initial={prefersReduced ? { opacity: 0, y: 16 } : 'hidden'}
            whileInView={prefersReduced ? { opacity: 1, y: 0 } : 'show'}
            viewport={{ once: true, margin: '-80px' }}
            transition={prefersReduced ? { duration: 0.7, ease: EASE } : undefined}
          >
            {SERVICES.map((s) => (
              <m.li
                key={s.name}
                variants={prefersReduced ? undefined : listItem}
                className="flex flex-col py-5 border-b border-hairline last:border-b-0"
              >
                <span className="text-ink font-medium text-sm mb-1">
                  {s.name}
                </span>
                <span className="text-mist text-sm">{s.detail}</span>
              </m.li>
            ))}
          </m.ul>
        </div>
      </div>
    </section>
  );
}
