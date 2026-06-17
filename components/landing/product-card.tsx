'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Product } from '@/lib/products';

const EASE = [0.22, 1, 0.36, 1] as const;
const POPUP_W = 380;

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!hovered) return;
    const close = () => setHovered(false);
    window.addEventListener('scroll', close, { passive: true });
    return () => window.removeEventListener('scroll', close);
  }, [hovered]);

  function openPopup() {
    if (prefersReduced || !cardRef.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    const rect = cardRef.current.getBoundingClientRect();
    const left = Math.max(12, Math.min(rect.left, window.innerWidth - POPUP_W - 12));
    setCoords({ top: rect.bottom + window.scrollY + 12, left });
    setHovered(true);
  }

  function delayClose() {
    timerRef.current = setTimeout(() => setHovered(false), 140);
  }

  function cancelClose() {
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  return (
    <>
      <div ref={cardRef} onMouseEnter={openPopup} onMouseLeave={delayClose}>
        <m.a
          href={`https://github.com/Walon-Foundation/${product.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={prefersReduced ? {} : { y: -3, boxShadow: '0 8px 24px rgba(26,23,20,0.08)' }}
          whileTap={prefersReduced ? {} : { scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="flex flex-col p-6 border border-hairline rounded-xl bg-canvas hover:border-ink/20 transition-colors h-full"
        >
          <p className="font-mono text-xs text-mist mb-3">{product.domain}</p>
          <h3 className="font-mono text-sm text-ink font-medium mb-2">
            {product.repo}
          </h3>
          <p className="text-mist text-sm leading-relaxed mb-4 flex-1">
            {product.description}
          </p>
          <p className="font-mono text-xs text-mist/60">{product.language}</p>
        </m.a>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {hovered && (
            <m.div
              style={{
                position: 'absolute',
                top: coords.top,
                left: coords.left,
                width: POPUP_W,
                zIndex: 9999,
              }}
              initial={{ opacity: 0, y: -12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.22, ease: EASE }}
              onMouseEnter={cancelClose}
              onMouseLeave={() => setHovered(false)}
              className="rounded-2xl bg-forest shadow-[0_24px_64px_rgba(0,0,0,0.35)] overflow-hidden"
            >
              {/* Contour texture watermark */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <svg
                  viewBox="0 0 380 220"
                  preserveAspectRatio="xMidYMid slice"
                  className="w-full h-full opacity-[0.08]"
                >
                  <path d="M-20 170 Q 95 128 190 148 Q 285 168 400 136" stroke="#F4F0E8" strokeWidth="1.2" fill="none"/>
                  <path d="M-20 148 Q 95 104 190 124 Q 285 144 400 112" stroke="#F4F0E8" strokeWidth="1.2" fill="none"/>
                  <path d="M 30 126 Q 120 78 190 100 Q 264 120 380 86" stroke="#F4F0E8" strokeWidth="1" fill="none"/>
                  <path d="M 100 102 Q 168 52 210 76 Q 260 98 350 60" stroke="#F4F0E8" strokeWidth="0.8" fill="none"/>
                </svg>
              </div>

              <div className="relative p-7">
                {/* Domain badge */}
                <p className="font-mono text-xs text-canvas/40 uppercase tracking-[0.2em] mb-4">
                  {product.domain}
                </p>

                {/* Repo name */}
                <h3 className="font-fraunces font-medium text-canvas text-3xl leading-none tracking-tight mb-3">
                  {product.repo}
                </h3>

                {/* Description */}
                <p className="text-canvas/65 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs text-canvas/55 border border-canvas/12 rounded-lg px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-canvas/10 pt-5">
                  <span className="font-mono text-xs text-canvas/30">
                    MIT Licensed
                  </span>
                  <span className="font-mono text-xs text-clay flex items-center gap-1.5">
                    View on GitHub
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
