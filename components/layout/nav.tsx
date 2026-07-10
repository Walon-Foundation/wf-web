'use client';

import Link from 'next/link';
import { m, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40);
  });

  return (
    <m.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-canvas/95 backdrop-blur-sm border-b border-hairline py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="font-fraunces font-medium text-ink text-lg tracking-tight"
        >
          Walon Foundation
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-mist">
          <Link href="/work" className="hover:text-ink transition-colors">
            Work
          </Link>
          <Link href="/team" className="hover:text-ink transition-colors">
            Team
          </Link>
          <a
            href="https://github.com/Walon-Foundation"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors"
          >
            GitHub
          </a>
        </nav>

        <Link
          href="/book"
          className="text-sm font-medium text-canvas bg-clay px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Book a session
        </Link>
      </div>
    </m.header>
  );
}
