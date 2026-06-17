'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Product } from '@/lib/products';

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('scroll', close, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function openModal() {
    if (prefersReduced) return;
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <div onMouseEnter={openModal} onMouseLeave={closeModal}>
        <m.a
          href={`https://github.com/Walon-Foundation/${product.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={prefersReduced ? {} : {
            y: -4,
            scale: 1.02,
            zIndex: 10,
            boxShadow: '0 12px 32px rgba(26,23,20,0.12)',
          }}
          whileTap={prefersReduced ? {} : { scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 360, damping: 26 }}
          className="relative flex flex-col p-6 border border-hairline rounded-xl bg-canvas hover:border-ink/20 transition-colors h-full"
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
          {open && (
            <>
              {/* Backdrop */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
                className="bg-ink/50 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              />

              {/* Centering shell — pointer-events off so backdrop click-through works */}
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 10000,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                <m.div
                  initial={{ opacity: 0, scale: 0.88, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 14 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  style={{ width: 'min(90vw, 520px)', pointerEvents: 'auto' }}
                  onMouseEnter={openModal}
                  onMouseLeave={closeModal}
                  className="relative bg-forest rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.55)]"
                >
                  {/* Contour texture watermark */}
                  <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <svg
                      viewBox="0 0 520 300"
                      preserveAspectRatio="xMidYMid slice"
                      className="w-full h-full opacity-[0.07]"
                    >
                      <path d="M-20 210 Q 130 158 260 180 Q 390 202 540 166" stroke="#F4F0E8" strokeWidth="1.4" fill="none"/>
                      <path d="M-20 182 Q 130 128 260 152 Q 390 174 540 138" stroke="#F4F0E8" strokeWidth="1.4" fill="none"/>
                      <path d="M 30 154 Q 152 96 260 120 Q 372 144 520 104" stroke="#F4F0E8" strokeWidth="1.1" fill="none"/>
                      <path d="M 110 124 Q 202 62 270 90 Q 344 116 480 72" stroke="#F4F0E8" strokeWidth="0.9" fill="none"/>
                    </svg>
                  </div>

                  <div className="relative p-8 sm:p-10">
                    <p className="font-mono text-xs text-canvas/40 uppercase tracking-[0.2em] mb-5">
                      {product.domain}
                    </p>

                    <h3 className="font-fraunces font-medium text-canvas text-4xl sm:text-5xl leading-none tracking-tight mb-4">
                      {product.repo}
                    </h3>

                    <p className="text-canvas/70 text-base leading-relaxed mb-7">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {product.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-xs text-canvas/55 border border-canvas/12 rounded-lg px-3 py-1.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-canvas/10 pt-6">
                      <span className="font-mono text-xs text-canvas/30">
                        MIT Licensed
                      </span>
                      <a
                        href={`https://github.com/Walon-Foundation/${product.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm text-clay hover:text-canvas transition-colors flex items-center gap-2"
                      >
                        View on GitHub
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </m.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
