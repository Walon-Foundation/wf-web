'use client';

import { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Contour } from '@/components/ui/contour';

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE },
  },
};

const STATS = [
  '14 repositories',
  '4 domains',
  'MIT-licensed',
  'built to run on 3G',
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const backdropY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-canvas pt-24"
    >
      {/* Contour backdrop — parallax layer */}
      <motion.div
        style={
          prefersReduced
            ? {}
            : { y: backdropY, scale: backdropScale }
        }
        className="absolute inset-0 flex items-center text-ink pointer-events-none"
        aria-hidden="true"
      >
        <Contour
          scrollProgress={prefersReduced ? undefined : scrollYProgress}
          className="opacity-[0.12]"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={
          prefersReduced ? {} : { y: contentY, opacity: contentOpacity }
        }
        className="relative z-10 max-w-6xl mx-auto px-6 py-24"
      >
        <motion.div
          variants={container}
          initial={prefersReduced ? 'show' : 'hidden'}
          animate="show"
        >
          <motion.p
            variants={item}
            className="font-mono text-xs text-mist tracking-[0.2em] uppercase mb-8"
          >
            KUSHƐ · BUILT IN FREETOWN
          </motion.p>

          <motion.h1
            variants={item}
            className="font-fraunces font-medium text-ink text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.04em] max-w-4xl mb-8"
          >
            Software for Sierra Leone, built by Sierra Leoneans.
          </motion.h1>

          <motion.p
            variants={item}
            className="text-mist text-lg md:text-xl leading-relaxed max-w-xl mb-10"
          >
            Walon Foundation builds custom software for clients worldwide —
            securing their data where it matters, and open-sourcing what we can
            under the MIT license.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link
              href="/book"
              className="inline-flex items-center px-6 py-3 bg-clay text-canvas text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Book a session
            </Link>
            <a
              href="#work"
              className="inline-flex items-center px-6 py-3 border border-ink/20 text-ink text-sm font-medium rounded-lg hover:border-ink/40 transition-colors"
            >
              See our work
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-wrap gap-6 text-xs font-mono text-mist"
          >
            {STATS.map((stat) => (
              <span key={stat} className="tabular-nums">
                {stat}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {!prefersReduced && (
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-[1px] h-14 bg-gradient-to-b from-ink/0 via-ink/30 to-ink/0"
          />
        </motion.div>
      )}
    </section>
  );
}
