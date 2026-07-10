'use client';

import { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const FAQS = [
  {
    q: 'Do you work with clients outside Sierra Leone?',
    a: 'Yes — most of our clients are global. We build software that works for your users wherever they are, and we communicate async via email, WhatsApp, or video call.',
  },
  {
    q: 'What does it cost?',
    a: 'It depends on scope. Focused projects start around $1k. Full systems — backend, mobile, AI, and DevOps — typically run $5k–$20k+. We scope everything before any commitment.',
  },
  {
    q: 'How long does a project take?',
    a: 'A focused web app typically takes 2–6 weeks. Full-stack systems with mobile, AI, or DevOps components run 6–16 weeks. We agree on a timeline before work starts.',
  },
  {
    q: 'Can you work on an existing codebase, or only greenfield projects?',
    a: 'Both. We regularly step into existing systems — to add features, fix performance, or take over from a previous team.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do. On final payment, all intellectual property in the deliverables transfers to you — source code, design assets, everything.',
  },
  {
    q: 'What happens after we launch?',
    a: 'We offer ongoing maintenance and support. Many clients stay with us as their technical team long after the initial build.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. We handle every engagement with discretion and are happy to sign a mutual NDA before we discuss your project in detail.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <div className="border-b border-hairline last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-5 text-left group"
      >
        <span className="text-sm font-medium text-ink group-hover:text-clay transition-colors duration-150">
          {q}
        </span>
        <span
          className={`font-mono text-mist/60 text-sm shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="text-sm text-mist leading-relaxed pb-5 max-w-2xl">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 md:py-32 bg-canvas">
      <div className="max-w-6xl mx-auto px-6">
        <m.div
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12"
        >
          <h2 className="font-fraunces font-medium text-ink text-4xl md:text-5xl">
            Common questions
          </h2>
        </m.div>

        <m.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="max-w-3xl"
        >
          {FAQS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
