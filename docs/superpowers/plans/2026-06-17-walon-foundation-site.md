# Walon Foundation Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Walon Foundation marketing site — two routes (`/` landing and `/book` booking) with Framer Motion scroll-driven animations, a custom topographic SVG motif, and a Resend-powered booking intake.

**Architecture:** App Router layout wraps both routes with shared Nav and Footer; landing page composes eight section components; booking page is a focused single-column form backed by a Next.js API route for email delivery. All animation is Framer Motion; design tokens live as CSS variables defined in Tailwind v4's `@theme` block.

**Tech Stack:** Next.js 16.2.1 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Resend, next/font (Fraunces + Geist Sans + Geist Mono)

## Global Constraints

- No database, no auth, no state library, no CMS — two routes only (`/` and `/book`)
- No emoji anywhere in copy, UI, code, or comments — ever
- Minimal icons: only GitHub mark and thin arrow links; no icon grids
- Palette: `canvas` #F4F0E8 · `ink` #1A1714 · `clay` #C75C36 · `forest` #0E1F18 · `mist` #8A8174 · `hairline` #E5E1D8
- Display font: Fraunces (Google Fonts, variable axes `opsz SOFT WONK`)
- Body font: Geist Sans (Google Fonts)
- Mono font: Geist Mono (Google Fonts)
- All "Book a session" CTAs navigate to `/book` — no scroll anchors or modals
- Copy: plain, active voice — use only real content from the spec; no lorem ipsum
- `prefers-reduced-motion` must disable all transforms, path-draws, and parallax
- Mobile-first, fully responsive
- Cloudflare Pages deploy target; `proxy.ts` already in repo — keep it
- Package manager: bun (`bun install`, `bun run dev`, `bun run build`)
- Env vars: `RESEND_API_KEY`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_CF_ANALYTICS_TOKEN`
- Section vertical padding: `py-24 md:py-32` throughout

## File Map

```
app/
  layout.tsx               # Root layout: fonts, JSON-LD, OG meta, CF analytics
  page.tsx                 # / — landing page assembly
  not-found.tsx            # Styled 404
  book/
    page.tsx               # /book — booking page
  api/
    book/
      route.ts             # POST: Resend email, honeypot, rate-limit
  sitemap.ts               # /sitemap.xml
  robots.ts                # /robots.txt

components/
  layout/
    nav.tsx                # Sticky nav; scroll-shrink via useScroll
    footer.tsx             # Shared footer
  landing/
    hero.tsx               # Viewport hero: parallax + entrance stagger
    mission.tsx            # Mission paragraph
    manifest.tsx           # Product grid with stagger cascade
    product-card.tsx       # Single card with hover/tap spring
    services.tsx           # Services list + CTA
    how-it-works.tsx       # 4-step numbered process
    closing-cta.tsx        # Forest dark band, final CTA
  booking/
    booking-form.tsx       # Controlled form, validation, POST, success/error
    scheduling-embed.tsx   # Commented placeholder for Cal.com
  ui/
    contour.tsx            # Topographic SVG: scroll-linked pathLength draw

lib/
  fonts.ts                 # next/font instances (Fraunces, Geist, Geist Mono)
  products.ts              # Typed product data array
  rate-limit.ts            # In-memory per-IP rate limiter

public/
  og-image.svg             # Static OG image (SVG; replace with PNG for production)

.env.example
README.md
```

---

### Task 1: Project reset + dependency installation

**Files:**
- Delete: `app/admin/`, `app/api/inquiry/`, `app/api/quotes/`, `app/projects/`, `app/start-a-project/`
- Delete: `components/github-repo-meta.tsx`, `components/hero-panel.tsx`, `components/quote-builder.tsx`, `components/reveal.tsx`, `components/section-nav.tsx`
- Delete: `lib/` (all existing content), `drizzle.config.ts`
- Modify: `package.json`
- Create: `.env.example`
- Keep: `app/favicon.ico`, `app/globals.css` (overwritten Task 2), `app/layout.tsx` (overwritten Task 2), `app/page.tsx` (overwritten Task 8), `next.config.ts`, `proxy.ts`, `postcss.config.mjs`, `tsconfig.json`

**Interfaces:**
- Produces: clean project with `framer-motion` and `resend` installed and importable

- [ ] **Step 1: Remove stale files and scaffold new directories**

```bash
rm -rf app/admin app/api/inquiry app/api/quotes app/projects app/start-a-project
rm -f components/github-repo-meta.tsx components/hero-panel.tsx components/quote-builder.tsx components/reveal.tsx components/section-nav.tsx
rm -rf lib drizzle.config.ts
mkdir -p lib components/layout components/landing components/booking components/ui app/api/book app/book
```

- [ ] **Step 2: Replace `package.json`**

```json
{
  "name": "wf-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "framer-motion": "^12.0.0",
    "next": "16.2.1",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "resend": "^4.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.1",
    "tailwindcss": "^4",
    "typescript": "^5"
  },
  "trustedDependencies": ["sharp", "unrs-resolver"]
}
```

- [ ] **Step 3: Install**

```bash
bun install
```

Expected: `framer-motion` and `resend` appear in `node_modules`.

- [ ] **Step 4: Create `.env.example`**

```
RESEND_API_KEY=re_your_key_here
NEXT_PUBLIC_WHATSAPP=23276000000
NEXT_PUBLIC_CF_ANALYTICS_TOKEN=your_token_here
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: reset project — remove old routes/deps, add framer-motion and resend"
```

---

### Task 2: Design system — tokens, fonts, globals, root layout

**Files:**
- Create: `lib/fonts.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces:
  - CSS variables: `--canvas`, `--ink`, `--clay`, `--forest`, `--mist`, `--hairline`
  - Tailwind utilities: `bg-canvas`, `text-ink`, `text-clay`, `bg-forest`, `text-mist`, `border-hairline`
  - Font CSS vars: `--font-fraunces`, `--font-geist-sans`, `--font-geist-mono`
  - Font Tailwind utilities: `font-fraunces`, `font-sans` (Geist), `font-mono` (Geist Mono)
  - Root `<html>` carries all font class names; layout includes JSON-LD + CF analytics

- [ ] **Step 1: Write `lib/fonts.ts`**

```typescript
import { Fraunces, Geist, Geist_Mono } from 'next/font/google';

export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

export const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});
```

- [ ] **Step 2: Write `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  /* Palette */
  --color-canvas: #F4F0E8;
  --color-ink: #1A1714;
  --color-clay: #C75C36;
  --color-forest: #0E1F18;
  --color-mist: #8A8174;
  --color-hairline: #E5E1D8;

  /* Font families */
  --font-fraunces: var(--font-fraunces-var), Georgia, serif;
  --font-sans: var(--font-geist-sans), system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), 'Courier New', monospace;
}

@layer base {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    background-color: #F4F0E8;
    color: #1A1714;
    font-family: var(--font-sans);
    font-size: 18px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: var(--font-fraunces);
    line-height: 0.98;
    letter-spacing: -0.03em;
    text-wrap: balance;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  :focus-visible {
    outline: 2px solid #C75C36;
    outline-offset: 3px;
    border-radius: 2px;
  }
}

/* Subtle film-grain overlay — kept barely perceptible */
@layer utilities {
  .grain::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    background-size: 200px;
    opacity: 0.03;
    z-index: 9999;
  }
}
```

Note: `--font-fraunces-var` is the CSS variable name next/font emits when you use `variable: '--font-fraunces'` — it will be available as `var(--font-fraunces)` on `<html>`. Adjust to match whatever variable name next/font actually injects (check the generated `<style>` tag at runtime if the font doesn't load).

- [ ] **Step 3: Write `app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { fraunces, geistSans, geistMono } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Walon Foundation — Software for Sierra Leone',
    template: '%s | Walon Foundation',
  },
  description:
    'An open-source software collective in Freetown, Sierra Leone. MIT-licensed tools built for local constraints — and custom software for hire.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Walon Foundation',
    title: 'Walon Foundation — Software for Sierra Leone',
    description:
      'Open-source software collective in Freetown, Sierra Leone. Custom software for clients worldwide.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Walon Foundation — Software for Sierra Leone',
    description: 'Open-source software collective in Freetown, Sierra Leone.',
    images: ['/og-image.svg'],
  },
  metadataBase: new URL('https://walonfoundation.com'),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Walon Foundation',
  url: 'https://walonfoundation.com',
  email: 'walonfoundation@gmail.com',
  logo: 'https://walonfoundation.com/og-image.svg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Freetown',
    addressCountry: 'SL',
  },
  sameAs: ['https://github.com/Walon-Foundation'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} grain`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}"}`}
          />
        )}
      </head>
      <body className="bg-canvas text-ink">{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Add stub `app/page.tsx` so the project compiles**

```tsx
export default function Home() {
  return <main />;
}
```

- [ ] **Step 5: Typecheck**

```bash
bun run typecheck
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: design system — tokens, fonts, globals, root layout with JSON-LD"
```

---

### Task 3: Shared Nav + Footer

**Files:**
- Create: `components/layout/nav.tsx`
- Create: `components/layout/footer.tsx`

**Interfaces:**
- Consumes: `framer-motion` (`motion`, `useScroll`, `useMotionValueEvent`); `next/link`; CSS tokens from Task 2
- Produces:
  - `export function Nav()` — sticky, shrinks on scroll past 40px; wordmark left; Work/Services/GitHub anchors; clay "Book a session" link to `/book`
  - `export function Footer()` — wordmark, short tagline, GitHub, email, WhatsApp (`wa.me/${NEXT_PUBLIC_WHATSAPP}`), MIT note, location

- [ ] **Step 1: Write `components/layout/nav.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40);
  });

  return (
    <motion.header
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
          <Link href="/#work" className="hover:text-ink transition-colors">
            Work
          </Link>
          <Link href="/#services" className="hover:text-ink transition-colors">
            Services
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
    </motion.header>
  );
}
```

- [ ] **Step 2: Write `components/layout/footer.tsx`**

```tsx
export function Footer() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? '23276000000';

  return (
    <footer className="bg-canvas border-t border-hairline py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="font-fraunces font-medium text-lg text-ink mb-2">
              Walon Foundation
            </p>
            <p className="text-mist text-sm max-w-xs">
              Open-source software collective. Freetown, Sierra Leone.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-mist">
            <a
              href="https://github.com/Walon-Foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:walonfoundation@gmail.com"
              className="hover:text-ink transition-colors"
            >
              walonfoundation@gmail.com
            </a>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-hairline flex flex-col sm:flex-row justify-between gap-2 text-xs text-mist">
          <span>Freetown, Sierra Leone</span>
          <span>MIT-licensed — open by default</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Update `app/page.tsx` stub to include Nav + Footer**

```tsx
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main />
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Typecheck**

```bash
bun run typecheck
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Nav and Footer components"
```

---

### Task 4: Topographic contour SVG motif

**Files:**
- Create: `components/ui/contour.tsx`

**Interfaces:**
- Consumes: `framer-motion` (`motion`, `useReducedMotion`, `MotionValue`)
- Produces:
  - `export function Contour({ scrollProgress, className }: { scrollProgress?: MotionValue<number>; className?: string })` — SVG with 7 mountain-contour paths. When `scrollProgress` is provided, paths draw via `pathLength` tied to scroll. When not provided, they animate in on mount. Respects `prefers-reduced-motion` (instant opacity, no path animation).
  - `export function ContourDivider({ className }: { className?: string })` — static wrapper using `<Contour />` for section breaks.

- [ ] **Step 1: Write `components/ui/contour.tsx`**

```tsx
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
```

- [ ] **Step 2: Typecheck**

```bash
bun run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: topographic contour SVG with scroll-linked pathLength draw"
```

---

### Task 5: Hero section

**Files:**
- Create: `components/landing/hero.tsx`

**Interfaces:**
- Consumes: `Contour` from `@/components/ui/contour`; `framer-motion` (`motion`, `useScroll`, `useTransform`, `useReducedMotion`); `next/link`
- Produces: `export function Hero()` — full-viewport section with sticky scroll parallax, orchestrated entrance stagger (eyebrow → headline → subhead → CTAs → stat strip), and scroll-linked contour backdrop

- [ ] **Step 1: Write `components/landing/hero.tsx`**

```tsx
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
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
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

  const backdropY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

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
            Walon Foundation ships open-source tools built for the constraints
            people actually live with — and builds custom software for clients
            who need it done right.
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
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
bun run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: Hero section with parallax backdrop and entrance stagger"
```

---

### Task 6: Mission + Manifest sections

**Files:**
- Create: `lib/products.ts`
- Create: `components/landing/mission.tsx`
- Create: `components/landing/product-card.tsx`
- Create: `components/landing/manifest.tsx`

**Interfaces:**
- Consumes: `framer-motion`; `ContourDivider` from `@/components/ui/contour`
- Produces:
  - `export type Product` and `export const PRODUCTS: Product[]` (8 real products)
  - `export function Mission()` — single editorial paragraph
  - `export function ProductCard({ product }: { product: Product })` — card with spring hover/tap
  - `export function Manifest()` — `#work` section with staggered card grid

- [ ] **Step 1: Write `lib/products.ts`**

```typescript
export type Product = {
  repo: string;
  description: string;
  domain: string;
  language: string;
};

export const PRODUCTS: Product[] = [
  {
    repo: 'fundwave',
    description:
      'Crowdfunding built for Sierra Leoneans, with mobile-money payments',
    domain: 'Fintech',
    language: 'TypeScript',
  },
  {
    repo: 'tele-health',
    description:
      'Anonymous mental-health counseling PWA — works on 3G, asks for no personal info',
    domain: 'Health',
    language: 'TypeScript / PWA',
  },
  {
    repo: 'business-directory',
    description:
      'Hackathon-winning registry with real-time verification of Sierra Leonean businesses',
    domain: 'Civic',
    language: 'TypeScript',
  },
  {
    repo: 'edu-ai',
    description: 'Turns PDFs into summaries, flashcards, and Q&A',
    domain: 'Education',
    language: 'TypeScript',
  },
  {
    repo: 'health-chatbot',
    description:
      'RAG health assistant (Hono, Pinecone, OpenAI/OpenRouter, PostgreSQL)',
    domain: 'Health',
    language: 'TypeScript',
  },
  {
    repo: 'deen-track',
    description:
      'Privacy-first tracker for Muslims to log reflections and spiritual progress',
    domain: 'Community',
    language: 'TypeScript',
  },
  {
    repo: 'monime-package',
    description: 'Typed helpers for Monime mobile-money payments',
    domain: 'Fintech tooling',
    language: 'TypeScript / Go',
  },
  {
    repo: 'chatbot-react',
    description:
      'Drop-in React/Next.js chatbot component, CSS bundled inline',
    domain: 'Developer tooling',
    language: 'React / CSS',
  },
];
```

- [ ] **Step 2: Write `components/landing/mission.tsx`**

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ContourDivider } from '@/components/ui/contour';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Mission() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 md:py-32 bg-canvas">
      <ContourDivider className="text-ink/10 mb-16" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-fraunces font-medium text-ink text-2xl md:text-3xl leading-tight max-w-3xl"
        >
          Sierra Leone has the problems. The engineers are here. The foundation
          ships the software — open source, MIT-licensed, built for low
          bandwidth, mobile money, and the constraints that people actually live
          with. Not for screenshots.
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write `components/landing/product-card.tsx`**

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.a
      href={`https://github.com/Walon-Foundation/${product.repo}`}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={
        prefersReduced
          ? {}
          : { y: -3, boxShadow: '0 8px 24px rgba(26,23,20,0.08)' }
      }
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
    </motion.a>
  );
}
```

- [ ] **Step 4: Write `components/landing/manifest.tsx`**

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from './product-card';

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export function Manifest() {
  const prefersReduced = useReducedMotion();

  const cardItem = {
    hidden: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <section id="work" className="py-24 md:py-32 bg-canvas">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12"
        >
          <h2 className="font-fraunces font-medium text-ink text-4xl md:text-5xl mb-4">
            What we've shipped
          </h2>
          <p className="text-mist max-w-lg">
            Eight open-source products across fintech, health, education, civic
            tech, and developer tooling.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {PRODUCTS.map((product) => (
            <motion.div key={product.repo} variants={cardItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Typecheck**

```bash
bun run typecheck
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: Mission, product data, Manifest with stagger card cascade"
```

---

### Task 7: Services + HowItWorks + ClosingCTA

**Files:**
- Create: `components/landing/services.tsx`
- Create: `components/landing/how-it-works.tsx`
- Create: `components/landing/closing-cta.tsx`

**Interfaces:**
- Consumes: `framer-motion`; `next/link`
- Produces:
  - `export function Services()` — `#services` section, 5 service rows, clay CTA to `/book`
  - `export function HowItWorks()` — 4-step numbered grid, hairline borders, no icons
  - `export function ClosingCTA()` — `bg-forest` dark band, centered headline, clay CTA

- [ ] **Step 1: Write `components/landing/services.tsx`**

```tsx
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
```

- [ ] **Step 2: Write `components/landing/how-it-works.tsx`**

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    n: '01',
    title: 'Book a session',
    detail: 'Fill out the intake form. Takes two minutes.',
  },
  {
    n: '02',
    title: 'Scope the work',
    detail:
      'We talk through what you need, agree on the approach and timeline.',
  },
  {
    n: '03',
    title: 'Build',
    detail: 'The team ships in iterations, with regular check-ins.',
  },
  {
    n: '04',
    title: 'Ship',
    detail:
      'You get working software, source code, and a handoff that makes sense.',
  },
];

export function HowItWorks() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 md:py-32 bg-canvas">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12"
        >
          <h2 className="font-fraunces font-medium text-ink text-4xl md:text-5xl">
            How it works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="py-6 pr-8 border-t border-hairline"
            >
              <p className="font-mono text-xs text-mist mb-4">{step.n}</p>
              <h3 className="font-fraunces font-medium text-ink text-xl mb-2">
                {step.title}
              </h3>
              <p className="text-mist text-sm leading-relaxed">{step.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write `components/landing/closing-cta.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

export function ClosingCTA() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 md:py-32 bg-forest">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="font-mono text-xs text-canvas/40 tracking-widest uppercase mb-6">
            KUSHƐ · WALON FOUNDATION
          </p>
          <h2 className="font-fraunces font-medium text-canvas text-4xl md:text-5xl lg:text-6xl leading-tight max-w-2xl mx-auto mb-8">
            Need software built? Let's talk.
          </h2>
          <p className="text-canvas/60 text-lg max-w-md mx-auto mb-10">
            Tell us what you want to build. A reply within two business days.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center px-8 py-4 bg-clay text-canvas text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Book a session
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Typecheck**

```bash
bun run typecheck
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Services, HowItWorks, ClosingCTA sections"
```

---

### Task 8: Landing page assembly

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Nav`, `Footer`, `Hero`, `Mission`, `Manifest`, `Services`, `HowItWorks`, `ClosingCTA` from Tasks 3–7
- Produces: `/` route — complete landing page

- [ ] **Step 1: Write `app/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/landing/hero';
import { Mission } from '@/components/landing/mission';
import { Manifest } from '@/components/landing/manifest';
import { Services } from '@/components/landing/services';
import { HowItWorks } from '@/components/landing/how-it-works';
import { ClosingCTA } from '@/components/landing/closing-cta';

export const metadata: Metadata = {
  title: 'Walon Foundation — Software for Sierra Leone',
  description:
    'Open-source software collective in Freetown, Sierra Leone. MIT-licensed tools and custom software for clients worldwide.',
};

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Mission />
        <Manifest />
        <Services />
        <HowItWorks />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
bun run typecheck
```

Expected: no errors.

- [ ] **Step 3: Dev server smoke test**

```bash
bun run dev
```

Open `http://localhost:3000`. Verify:
- Fraunces loads for h1
- Nav is fixed at top, "Book a session" links to `/book`
- Hero contour SVG visible behind text
- All sections render in order
- No console errors

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: landing page — assemble all sections at /"
```

---

### Task 9: Booking form component

**Files:**
- Create: `components/booking/booking-form.tsx`
- Create: `components/booking/scheduling-embed.tsx`

**Interfaces:**
- Consumes: `react` (`useState`); `framer-motion` (`motion`, `AnimatePresence`, `useReducedMotion`); `NEXT_PUBLIC_WHATSAPP` env var
- Produces:
  - `export function BookingForm()` — controlled form; all 8 fields; client-side validation; honeypot field; POSTs JSON to `/api/book`; shows success and error states; error state includes WhatsApp fallback link
  - `export function SchedulingEmbed()` — returns `null` with a comment pointing to where Cal.com/Calendly goes

- [ ] **Step 1: Write `components/booking/scheduling-embed.tsx`**

```tsx
// Placeholder for Cal.com / Calendly embed.
// To activate: replace this component with your embed snippet.
// Example: import Cal from '@calcom/embed-react'; return <Cal calLink="walonfoundation/session" />;

export function SchedulingEmbed() {
  return null;
}
```

- [ ] **Step 2: Write `components/booking/booking-form.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

type Fields = {
  name: string;
  email: string;
  organization: string;
  buildType: string;
  details: string;
  budget: string;
  contactPreference: string;
  contactHandle: string;
  _honeypot: string;
};

const EMPTY: Fields = {
  name: '',
  email: '',
  organization: '',
  buildType: '',
  details: '',
  budget: '',
  contactPreference: '',
  contactHandle: '',
  _honeypot: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';
type FieldErrors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): FieldErrors {
  const errors: FieldErrors = {};
  if (!f.name.trim()) {
    errors.name = 'Your name is required.';
  }
  if (!f.email.trim()) {
    errors.email = 'An email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    errors.email = "That email address doesn't look right — check for typos.";
  }
  if (!f.details.trim()) {
    errors.details = 'Tell us what you want to build.';
  }
  return errors;
}

const input =
  'w-full px-4 py-3 bg-canvas border border-hairline rounded-lg text-ink text-sm placeholder:text-mist focus:outline-none focus:border-ink/40 transition-colors';

const label = 'block text-sm text-ink font-medium mb-1.5';

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-clay text-xs mt-1.5"
          role="alert"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function BookingForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const prefersReduced = useReducedMotion();
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? '23276000000';

  function field(key: keyof Fields) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error('server');
      setStatus('success');
      setFields(EMPTY);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="py-16 text-center"
      >
        <p className="font-fraunces text-ink text-2xl mb-3">We've got it.</p>
        <p className="text-mist text-sm">
          Expect a reply within two business days. Check your inbox for a
          confirmation.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot — hidden from real users, traps bots */}
      <div className="hidden" aria-hidden="true">
        <input
          tabIndex={-1}
          autoComplete="off"
          value={fields._honeypot}
          onChange={field('_honeypot')}
        />
      </div>

      <div>
        <label htmlFor="name" className={label}>
          Name <span className="text-clay">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className={input}
          value={fields.name}
          onChange={field('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-err' : undefined}
        />
        <FieldError message={errors.name} />
      </div>

      <div>
        <label htmlFor="email" className={label}>
          Email <span className="text-clay">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={input}
          value={fields.email}
          onChange={field('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-err' : undefined}
        />
        <FieldError message={errors.email} />
      </div>

      <div>
        <label htmlFor="organization" className={label}>
          Organization{' '}
          <span className="text-mist font-normal">(optional)</span>
        </label>
        <input
          id="organization"
          type="text"
          autoComplete="organization"
          className={input}
          value={fields.organization}
          onChange={field('organization')}
        />
      </div>

      <div>
        <label htmlFor="buildType" className={label}>
          What do you want to build?
        </label>
        <select
          id="buildType"
          className={input}
          value={fields.buildType}
          onChange={field('buildType')}
        >
          <option value="">Select one...</option>
          <option value="web-app">Web app</option>
          <option value="mobile-app">Mobile app</option>
          <option value="payment-integration">
            Payment or mobile-money integration
          </option>
          <option value="ai-chatbot">AI or chatbot feature</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="details" className={label}>
          Project details <span className="text-clay">*</span>
        </label>
        <textarea
          id="details"
          rows={5}
          className={`${input} resize-none`}
          placeholder="Describe the problem you're solving and who it's for."
          value={fields.details}
          onChange={field('details')}
          aria-invalid={!!errors.details}
          aria-describedby={errors.details ? 'details-err' : undefined}
        />
        <FieldError message={errors.details} />
      </div>

      <div>
        <label htmlFor="budget" className={label}>
          Budget range <span className="text-mist font-normal">(optional)</span>
        </label>
        <select
          id="budget"
          className={input}
          value={fields.budget}
          onChange={field('budget')}
        >
          <option value="">Select a range...</option>
          <option value="under-25k">Under SLE 25,000 (~$1k)</option>
          <option value="25k-120k">SLE 25k–120k (~$1–5k)</option>
          <option value="120k-350k">SLE 120k–350k (~$5–15k)</option>
          <option value="350k-plus">SLE 350k+ (~$15k+)</option>
          <option value="not-sure">Not sure</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contactPreference" className={label}>
            Preferred contact{' '}
            <span className="text-mist font-normal">(optional)</span>
          </label>
          <select
            id="contactPreference"
            className={input}
            value={fields.contactPreference}
            onChange={field('contactPreference')}
          >
            <option value="">Select...</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="call">Call</option>
          </select>
        </div>
        <div>
          <label htmlFor="contactHandle" className={label}>
            Contact handle{' '}
            <span className="text-mist font-normal">(optional)</span>
          </label>
          <input
            id="contactHandle"
            type="text"
            className={input}
            placeholder="Phone, WhatsApp number, etc."
            value={fields.contactHandle}
            onChange={field('contactHandle')}
          />
        </div>
      </div>

      {status === 'error' && (
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border border-clay/30 rounded-lg bg-clay/5"
          role="alert"
        >
          <p className="text-sm text-ink">
            Something went wrong on our end. You can also reach us on{' '}
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-clay underline underline-offset-2"
            >
              WhatsApp
            </a>{' '}
            or at{' '}
            <a
              href="mailto:walonfoundation@gmail.com"
              className="text-clay underline underline-offset-2"
            >
              walonfoundation@gmail.com
            </a>
            .
          </p>
        </motion.div>
      )}

      <motion.button
        type="submit"
        disabled={status === 'submitting'}
        whileHover={prefersReduced ? {} : { opacity: 0.9 }}
        whileTap={prefersReduced ? {} : { scale: 0.99 }}
        className="w-full sm:w-auto px-8 py-3.5 bg-clay text-canvas text-sm font-medium rounded-lg disabled:opacity-60 transition-opacity"
      >
        {status === 'submitting' ? 'Sending...' : 'Send request'}
      </motion.button>
    </form>
  );
}
```

- [ ] **Step 3: Typecheck**

```bash
bun run typecheck
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: BookingForm with validation, honeypot, success/error states"
```

---

### Task 10: /book page

**Files:**
- Create: `app/book/page.tsx`

**Interfaces:**
- Consumes: `Nav`, `Footer`, `BookingForm`, `SchedulingEmbed`; `NEXT_PUBLIC_WHATSAPP` env var
- Produces: `/book` route — back link, heading, form column, reassurance aside, scheduling placeholder

- [ ] **Step 1: Write `app/book/page.tsx`**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import { BookingForm } from '@/components/booking/booking-form';
import { SchedulingEmbed } from '@/components/booking/scheduling-embed';

export const metadata: Metadata = {
  title: 'Book a session',
  description:
    'Tell us what you want to build. We reply within two business days.',
};

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? '23276000000';

export default function BookPage() {
  return (
    <>
      <Nav />
      <main className="bg-canvas min-h-screen pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-mist text-sm hover:text-ink transition-colors mb-12"
          >
            <span aria-hidden="true">←</span>
            Back
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16 items-start">
            <div>
              <h1 className="font-fraunces font-medium text-ink text-4xl md:text-5xl mb-3">
                Tell us what you want to build.
              </h1>
              <p className="text-mist mb-10">
                We'll read it and reply within two business days.
              </p>
              <BookingForm />
            </div>

            <aside className="lg:pt-[7.5rem]">
              <div className="border-t border-hairline pt-6 space-y-6 text-sm text-mist">
                <p>
                  After you send this, a real person on the Walon Foundation
                  team reads it and replies. No automated responses.
                </p>
                <p>
                  We build web apps, mobile apps, payment integrations, and AI
                  features — with a focus on what works in Sierra Leone's
                  network conditions.
                </p>
                <p>
                  Prefer a faster start?{' '}
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-clay transition-colors"
                  >
                    Message us on WhatsApp
                  </a>{' '}
                  instead.
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-20 pt-12 border-t border-hairline">
            {/*
              Scheduling embed placeholder.
              To activate Cal.com/Calendly, edit components/booking/scheduling-embed.tsx
              and replace the null return with your embed component.
            */}
            <SchedulingEmbed />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
bun run typecheck
```

Expected: no errors.

- [ ] **Step 3: Dev server smoke test**

```bash
bun run dev
```

Open `http://localhost:3000/book`. Verify: form renders with all fields, back arrow returns to `/`, reassurance rail visible on desktop, WhatsApp link present.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: /book page with form, reassurance rail, and scheduling placeholder"
```

---

### Task 11: /api/book — email, honeypot, rate-limit

**Files:**
- Create: `lib/rate-limit.ts`
- Create: `app/api/book/route.ts`

**Interfaces:**
- Consumes: `resend` npm package; `RESEND_API_KEY` env var; `headers()` from `next/headers`
- Produces:
  - `export function rateLimit(key: string, max?: number, windowMs?: number): boolean` — returns `true` if allowed, `false` if limit exceeded
  - `export async function POST(req: Request)` — returns `Response.json({ success: true })` or `Response.json({ error: string }, { status: N })`

- [ ] **Step 1: Write `lib/rate-limit.ts`**

```typescript
type Entry = { count: number; reset: number };

const store = new Map<string, Entry>();

export function rateLimit(
  key: string,
  max = 5,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + windowMs });
    return true;
  }

  if (entry.count >= max) return false;
  entry.count++;
  return true;
}
```

- [ ] **Step 2: Write `app/api/book/route.ts`**

```typescript
import { Resend } from 'resend';
import { headers } from 'next/headers';
import { rateLimit } from '@/lib/rate-limit';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const TEAM_EMAIL = 'walonfoundation@gmail.com';
const FROM = 'Walon Foundation <noreply@walonfoundation.com>';

export async function POST(req: Request) {
  const headersList = await headers();
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

  if (!rateLimit(ip, 5, 60_000)) {
    return Response.json(
      { error: 'Too many requests. Please wait a minute and try again.' },
      { status: 429 }
    );
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (body._honeypot) {
    return Response.json({ success: true });
  }

  const { name, email, organization, buildType, details, budget, contactPreference, contactHandle } =
    body;

  if (!name || !email || !details) {
    return Response.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const teamText = [
    `New session request from ${name}`,
    '',
    `Email: ${email}`,
    `Organization: ${organization || '—'}`,
    `What they want to build: ${buildType || '—'}`,
    `Budget: ${budget || '—'}`,
    `Contact preference: ${contactPreference || '—'}`,
    `Contact handle: ${contactHandle || '—'}`,
    '',
    'Project details:',
    details,
  ].join('\n');

  const clientText = [
    `Hi ${name},`,
    '',
    "We've got your request. Expect a reply within two business days.",
    '',
    "Here's what you sent:",
    '---',
    details,
    '---',
    '',
    'If you need to reach us sooner, email walonfoundation@gmail.com or message us on WhatsApp.',
    '',
    'Walon Foundation',
    'Freetown, Sierra Leone',
  ].join('\n');

  if (resend) {
    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: TEAM_EMAIL,
        subject: `New session request from ${name}`,
        text: teamText,
      }),
      resend.emails.send({
        from: FROM,
        to: email,
        subject: "We've got your request — Walon Foundation",
        text: clientText,
      }),
    ]);
  } else {
    console.log('[/api/book] RESEND_API_KEY not set — logging request:\n', teamText);
  }

  return Response.json({ success: true });
}
```

- [ ] **Step 3: Typecheck**

```bash
bun run typecheck
```

Expected: no errors.

- [ ] **Step 4: Test the route in dev**

```bash
bun run dev
```

In a second terminal:

```bash
curl -s -X POST http://localhost:3000/api/book \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","details":"I want a mobile app","_honeypot":""}' | cat
```

Expected output: `{"success":true}`

Check the dev server terminal for the `[/api/book]` log line confirming the request was processed.

- [ ] **Step 5: Test honeypot rejection**

```bash
curl -s -X POST http://localhost:3000/api/book \
  -H "Content-Type: application/json" \
  -d '{"name":"Bot","email":"bot@x.com","details":"spam","_honeypot":"yes"}' | cat
```

Expected: `{"success":true}` — silent accept so bots don't know they were caught.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: /api/book with Resend, honeypot, and per-IP rate limiting"
```

---

### Task 12: SEO — 404, sitemap, robots, OG image

**Files:**
- Create: `app/not-found.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `public/og-image.svg`

**Interfaces:**
- Consumes: `next/link`; Next.js metadata route conventions; `Nav`, `Footer`
- Produces: styled `/404` page; `/sitemap.xml`; `/robots.txt`; `/og-image.svg` brand asset

- [ ] **Step 1: Write `app/not-found.tsx`**

```tsx
import Link from 'next/link';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="bg-canvas min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-xs text-mist tracking-widest uppercase mb-6">
          404
        </p>
        <h1 className="font-fraunces font-medium text-ink text-4xl md:text-5xl mb-4">
          Nothing here.
        </h1>
        <p className="text-mist text-sm mb-8 max-w-sm">
          That page doesn't exist. If you were looking for something specific,
          start from the homepage.
        </p>
        <Link
          href="/"
          className="text-sm text-clay hover:opacity-70 transition-opacity"
        >
          Back to Walon Foundation
        </Link>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Write `app/sitemap.ts`**

```typescript
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://walonfoundation.com';
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${base}/book`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
```

- [ ] **Step 3: Write `app/robots.ts`**

```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://walonfoundation.com/sitemap.xml',
  };
}
```

- [ ] **Step 4: Create `public/og-image.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F4F0E8"/>
  <g stroke="#1A1714" stroke-width="1" fill="none" opacity="0.07">
    <path d="M-50 440 Q 300 310, 600 360 Q 900 410, 1250 330"/>
    <path d="M-50 410 Q 300 272, 600 322 Q 900 372, 1250 292"/>
    <path d="M-50 378 Q 320 236, 600 282 Q 892 328, 1250 248"/>
    <path d="M 180 360 Q 480 188, 700 238 Q 880 278, 1080 208"/>
    <path d="M 200 335 Q 480 155, 700 205 Q 880 248, 1070 172"/>
    <path d="M 430 308 Q 575 120, 730 178"/>
    <path d="M 445 282 Q 575 94, 720 152"/>
  </g>
  <text x="600" y="296" font-family="Georgia, serif" font-size="52" font-weight="500" fill="#1A1714" text-anchor="middle" letter-spacing="-1.5">Walon Foundation</text>
  <text x="600" y="348" font-family="monospace" font-size="15" fill="#8A8174" text-anchor="middle" letter-spacing="4">FREETOWN · SIERRA LEONE</text>
</svg>
```

Note: For a proper raster OG image (some crawlers prefer PNG), convert this SVG to 1200×630 PNG using `sharp` or `imagemagick`. Replace `/og-image.svg` references in `layout.tsx` with `/og-image.png` when done.

- [ ] **Step 5: Typecheck + build**

```bash
bun run typecheck && bun run build
```

Expected: TypeScript clean, build succeeds. Verify `/sitemap.xml` and `/robots.txt` accessible on dev server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: 404 page, sitemap, robots.txt, OG image"
```

---

### Task 13: README + final verification

**Files:**
- Modify: `README.md`

**Interfaces:**
- N/A — documentation and final checks

- [ ] **Step 1: Replace `README.md`**

```markdown
# wf-web — Walon Foundation

Marketing site for [Walon Foundation](https://github.com/Walon-Foundation), an open-source software collective in Freetown, Sierra Leone.

**Two routes:** `/` (landing) and `/book` (booking intake).

## Stack

- Next.js 16.2.1 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- Resend (email delivery)

## Setup

```bash
bun install
cp .env.example .env.local
# Fill in values, then:
bun run dev
```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | No — dev works without it | Resend API key. Without it, bookings log to console. |
| `NEXT_PUBLIC_WHATSAPP` | No | WhatsApp number for wa.me links, digits only (e.g. `23276000000`) |
| `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` | No | Cloudflare Web Analytics token |

## Adding a scheduling embed

Edit `components/booking/scheduling-embed.tsx` and replace the `null` return with your Cal.com or Calendly embed. It renders below the booking form on `/book`.

## Deploy

Cloudflare Pages or Vercel. `proxy.ts` at the repo root enables the Cloudflare Build Adapters API introduced in Next.js 16.2.
```

- [ ] **Step 2: Final build**

```bash
bun run build
```

Expected: build succeeds with no TypeScript errors and no missing-metadata warnings.

- [ ] **Step 3: Final smoke test**

```bash
bun run dev
```

Check:
- `/` — hero loads, all sections visible, stat strip in mono, Nav "Book a session" → `/book`
- `/book` — form renders, back link → `/`, reassurance rail on desktop, WhatsApp link present
- Navigate to `/anything-nonexistent` — styled 404 renders (not Next.js default)
- On mobile viewport (375px) — hero and form are usable, no horizontal overflow

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: setup README with env vars, deploy notes, and embed instructions"
```
