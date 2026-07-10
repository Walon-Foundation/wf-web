'use client';

import { m, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Walon Foundation built our entire platform — design, backend, deployment. They understood the brief immediately and shipped something we're proud of. Working with a team that knows the local context made a real difference.",
    name: 'Nematulai Barrie',
    title: 'Founder & CEO, Ikigai',
    initials: 'NB',
  },
  {
    quote:
      "From the first call to launch day, the team was professional and fast. They handled everything — web app, database, hosting. We didn't have to worry about the technical side at all.",
    name: 'Fatima Joaque',
    title: 'Founder & CEO, Nexus Uplift',
    initials: 'FJ',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Testimonials() {
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
          <p className="font-mono text-xs text-mist tracking-[0.18em] uppercase mb-3">
            What clients say
          </p>
          <h2 className="font-fraunces font-medium text-ink text-4xl md:text-5xl">
            Trusted by founders.
          </h2>
        </m.div>

        <m.div
          variants={prefersReduced ? undefined : container}
          initial={prefersReduced ? { opacity: 0, y: 16 } : 'hidden'}
          whileInView={prefersReduced ? { opacity: 1, y: 0 } : 'show'}
          viewport={{ once: true, margin: '-80px' }}
          transition={prefersReduced ? { duration: 0.7, ease: EASE } : undefined}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <m.div
              key={t.name}
              variants={prefersReduced ? undefined : card}
              className="flex flex-col p-8 border border-hairline rounded-2xl bg-canvas"
            >
              <p className="text-ink text-base leading-relaxed mb-8 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-forest flex items-center justify-center shrink-0">
                  <span className="font-mono text-[10px] text-canvas/70 font-medium">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="text-xs text-mist">{t.title}</p>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
