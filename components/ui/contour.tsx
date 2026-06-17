'use client';

import { motion, useReducedMotion, type MotionValue } from 'framer-motion';

const PATHS = [
  'M-50 300 Q 150 180, 400 220 Q 650 260, 900 200 Q 1100 160, 1300 210',
  'M-50 280 Q 150 155, 400 195 Q 650 235, 900 175 Q 1100 135, 1300 185',
  'M-50 260 Q 170 130, 400 168 Q 640 208, 900 148 Q 1110 108, 1300 158',
  'M 200 240 Q 380 90, 550 140 Q 720 190, 850 120',
  'M 220 220 Q 380 65, 550 115 Q 720 165, 840 98',
  'M 350 180 Q 460 40, 570 100',
  'M 360 160 Q 460 20, 560 78',
];

const EASE = [0.22, 1, 0.36, 1] as const;

interface ContourProps {
  scrollProgress?: MotionValue<number>;
  className?: string;
}

export function Contour({ scrollProgress, className = '' }: ContourProps) {
  const prefersReduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 1200 320"
      preserveAspectRatio="xMidYMid slice"
      className={`w-full ${className}`}
      aria-hidden="true"
    >
      {PATHS.map((d, i) =>
        prefersReduced ? (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.25"
          />
        ) : scrollProgress ? (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            style={{ pathLength: scrollProgress, opacity: 0.25 }}
          />
        ) : (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 }}
            transition={{
              pathLength: {
                delay: i * 0.08,
                duration: 1.4,
                ease: EASE,
              },
              opacity: { delay: i * 0.08, duration: 0.3 },
            }}
          />
        )
      )}
    </svg>
  );
}

export function ContourDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`text-ink overflow-hidden ${className}`} aria-hidden="true">
      <Contour />
    </div>
  );
}
