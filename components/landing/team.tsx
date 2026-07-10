'use client';

import { m, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

type Member = {
  name: string;
  role: string;
  initials: string;
  bio: string;
};

const TEAM: Member[] = [
  {
    name: 'Mohamed Lamin Walon Jalloh',
    role: 'Founder & Lead Engineer',
    initials: 'MW',
    bio: 'Full-stack and backend engineer based in Freetown. Builds systems end to end — web, mobile, AI, and infrastructure — for clients worldwide.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const memberCard = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export function Team() {
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
            The team
          </p>
          <h2 className="font-fraunces font-medium text-ink text-4xl md:text-5xl">
            Built by Sierra Leoneans.
          </h2>
        </m.div>

        <m.div
          variants={prefersReduced ? undefined : container}
          initial={prefersReduced ? { opacity: 0, y: 16 } : 'hidden'}
          whileInView={prefersReduced ? { opacity: 1, y: 0 } : 'show'}
          viewport={{ once: true, margin: '-80px' }}
          transition={prefersReduced ? { duration: 0.7, ease: EASE } : undefined}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TEAM.map((member) => (
            <m.div
              key={member.name}
              variants={prefersReduced ? undefined : memberCard}
              className="flex flex-col p-6 border border-hairline rounded-2xl"
            >
              <div className="w-12 h-12 rounded-xl bg-clay/10 flex items-center justify-center mb-5">
                <span className="font-mono text-xs text-clay font-medium">
                  {member.initials}
                </span>
              </div>
              <p className="font-medium text-ink text-sm mb-0.5">{member.name}</p>
              <p className="font-mono text-xs text-mist mb-4">{member.role}</p>
              <p className="text-mist text-sm leading-relaxed">{member.bio}</p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
