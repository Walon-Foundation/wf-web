# Build prompt: Walon Foundation landing + client booking site

Build a marketing site for **Walon Foundation** with **two routes**:
- **`/` — the landing page**: communicates who the foundation is and shows the open-source products it has shipped, and presents the for-hire services.
- **`/book` — a dedicated booking page**: a focused screen where potential clients **book a session** so Walon Foundation can build custom software for them.

Every "Book a session" call-to-action navigates to `/book` (it does not scroll or open a modal). Read this whole brief before writing code. Use the real content provided here — don't invent products or stats.

---

## 1. Who Walon Foundation is

An open-source software collective based in **Freetown, Sierra Leone**. It ships real products that solve real problems for Sierra Leoneans — built for the constraints people actually live with (low bandwidth, mobile money, local needs), MIT-licensed, on GitHub at `github.com/Walon-Foundation`. Contact email: `walonfoundation@gmail.com`.

The foundation **also offers software development services**: businesses, NGOs, and individuals can hire the team to build software for them. The site needs to convert those visitors into a booked session on `/book`.

Two audiences:
- **Community / contributors / partners** → land on `/`, see the mission and the shipped work.
- **Clients** → land on `/`, understand the services, then go to `/book` to book a session.

---

## 2. Tech stack (defaults — change in one place if you prefer)

- **Next.js (App Router) + TypeScript + Tailwind CSS.** Two routes: `/` (landing, with smooth-scroll anchor sections) and `/book` (dedicated booking page). Shared nav/footer and design system across both.
- **Framer Motion** (`framer-motion`, imported from `framer-motion`) for all animation. See section 7 for the full motion spec — this is central to the brief, not a nice-to-have.
- Fonts via `next/font` (Google for Fraunces; for the Fontshare grotesk, self-host via `next/font/local` or load its CSS).
- Deployable on **Cloudflare Pages** or Vercel. Keep build config minimal.
- **Booking intake**: the `/book` form POSTs to a Next.js API route (`/api/book`) which emails `walonfoundation@gmail.com` via **Resend** (use an env var `RESEND_API_KEY`; if missing, the route should log and still return success so local dev works). Provide a `.env.example`.
- **Optional scheduling**: on `/book`, leave a clearly-marked slot to drop in a **Cal.com / Calendly embed** later via a commented `<SchedulingEmbed />` placeholder.
- No database. No auth. No CMS. Keep it lean — two routes, nothing more.

---

## 3. Design direction — Anthropic warmth × Apple precision, grounded in Sierra Leone

The target feel combines two references, fused into one coherent identity (not a copy of either):

- **From Anthropic**: warm, calm, editorial restraint. An ivory/paper canvas, a soft coral-clay accent, a refined serif for headlines, generous whitespace, and copy that feels human and literary rather than salesy. Nothing flashy — confidence through calm.
- **From Apple**: precision and spatial generosity. Huge, tightly-tracked headlines; centered, deliberate compositions; lots of negative space; crisp alignment; and **scroll-driven storytelling** where elements scale, pin, and reveal as you move down the page (see motion spec in section 7). Premium high-contrast dark moments between the warm light sections.
- **The soul stays local.** Keep the Sierra Leone grounding so it isn't a generic big-tech clone: the Krio greeting, the Lion Mountains motif, and the real shipped products carry the identity. Render that grounding *through* the Anthropic/Apple lens — warm, precise, restrained.

This brief explicitly asks for the warm-editorial look, so lean into it fully — but elevate it with Apple-grade spacing, type scale, and scroll choreography so it reads as a deliberate choice, not a default. Avoid the acid-green-on-black and broadsheet/newspaper looks.

**Palette** — warm Anthropic base, deep forest for Apple-style high-contrast moments. Define as CSS variables / Tailwind theme tokens:
- `canvas` `#F4F0E8` — warm ivory paper (primary light background, Anthropic-like)
- `ink` `#1A1714` — warm near-black (primary text)
- `clay` `#C75C36` — soft coral-clay accent (CTAs, links, highlights — used sparingly), doubles as the laterite/red-earth local nod
- `forest` `#0E1F18` — deep forest green for dark high-contrast sections (Apple-style premium moments + the local green)
- `mist` `#8A8174` — muted warm grey for secondary/caption text
- plus white and a faint warm hairline color derived from the above.

**Typography** — this is the single biggest lever for a premium feel, so treat it carefully. Editorial serif display (Anthropic warmth) paired with a precise, characterful grotesk (Apple precision):
- Display: a **high-quality editorial serif with optical sizing** — first choice **Fraunces** (warm, characterful, has true optical sizes and a soft/wonky axis worth tuning), alternative **Newsreader** or **Source Serif 4**. Set hero/section headlines large with tight line-height (~0.95–1.05), slightly negative letter-spacing, and a real weight (500–600, not 700-everywhere). Tune optical size to the display setting so big text gets the high-contrast cut it deserves.
- Body / UI: a **premium grotesk**, not default Inter. Prefer a Fontshare face — **General Sans**, **Switzer**, or **Satoshi** — for a more distinctive, expensive feel; if sticking to Google Fonts, use **Geist**. Body copy ~17–19px, generous leading (1.6–1.7), `mist`-toned for secondary text.
- Utility/mono: **Geist Mono** or **Space Mono** for repo names, language tags, and data labels. Meaningful, not decorative — it signals real code.
- Get the details right: consistent type scale (don't freestyle sizes), tabular figures for the stat strip, balanced headline wrapping (`text-wrap: balance`), and tracking that tightens as size grows. The type tuning is what makes it read as crafted rather than generated.

**Signature element**: "Sierra Leone" means *Lion Mountains*. Use an abstract **topographic / contour-line motif** (thin SVG lines suggesting mountain elevation). Treat it like an Apple product moment — large, precise, and **scroll-reactive** (it draws in and responds to scroll, see section 7) — rendered in warm, low-opacity tones so it stays calm. Use it in the hero and as section dividers. This is the one place to spend visual boldness; keep everything else quiet.

**Krio touch**: use **"Kushɛ"** (Krio for welcome/hello) as the hero eyebrow — these tools are built for people who speak it.

**Tone of copy**: plain, confident, specific, with a touch of editorial warmth (Anthropic) — never salesy. Active voice. Say what things do, not how impressive they are. A button says exactly what happens ("Book a session", not "Get started").

**Hard styling rules — these define the polish:**
- **No emoji.** None, anywhere — not in copy, not in headings, not in UI, not in the form. Ever.
- **Minimal icons.** Avoid the icon-per-feature look entirely. Let typography, spacing, hairline rules, and the contour motif carry meaning instead. If an icon is truly necessary (e.g. a single GitHub mark, an arrow on a link), keep it to a tiny, consistent set: thin-stroke, monochrome, sized to match the text. No colorful icon grids, no decorative glyphs.
- **Spacing is the styling.** Use a strict spacing scale and lean on generous whitespace (Apple) rather than boxes and borders. Sections should breathe. Alignment must be exact — nothing a pixel off.
- **Hairlines over boxes.** Prefer thin warm-toned dividers (1px, low-contrast) to heavy cards/containers. When cards are used (the product manifest), keep them flat with subtle borders and very soft shadows — no chunky drop shadows, no heavy radii (8–14px max).
- **Restrained color.** The page is mostly `canvas` and `ink`. `clay` appears rarely and intentionally (primary CTA, links, one or two accents). `forest` is for full dark sections only. Color should feel earned, not sprinkled.
- **Subtle texture.** A faint film grain / paper-noise overlay (very low opacity) on the warm backgrounds adds the analog warmth Anthropic has — optional but encouraged, kept barely perceptible.
- **Details that signal craft:** focus states designed (not browser default), buttons with considered padding and a slight hover state, consistent corner radii, optically-aligned text, and a real favicon/wordmark treatment.

---

## 4. Page structure (in order)

### Landing page (`/`)

1. **Sticky top nav** (shared across both routes) — "Walon Foundation" wordmark left; anchors right: Work, Services, and a GitHub link. A clear "Book a session" button styled in `clay` that links to `/book`.

2. **Hero** — topographic backdrop. Eyebrow `KUSHƐ · BUILT IN FREETOWN`. Headline along the lines of *"Software for Sierra Leone, built by Sierra Leoneans."* One-paragraph subhead explaining the foundation builds open tools for home **and** builds custom software for clients. Two CTAs: primary "Book a session" (→ `/book`), secondary "See our work" (scrolls to the manifest). Below, an honest stat strip in mono: `14 repositories · 4 domains · MIT-licensed · built to run on 3G`.

3. **Mission strip** — one strong short paragraph on why the foundation exists: real problems, real constraints, open source.

4. **Work / product manifest** (the centerpiece) — heading + a grid of "build cards". Each card: repo name in mono, a plain one-line description, a domain tag, the language, and a link to the repo. Use the real products below.

5. **Services / "We build software for you"** — explains the for-hire side. List what the team builds: web apps, mobile apps (Expo/React Native), mobile-money & payment integration (Monime), AI / RAG features, and PWAs that work on slow connections. Make the value concrete and local. Ends with a prominent "Book a session" CTA → `/book`.

6. **How it works** — a short, plain four-step process so clients can picture working with the team: **Book a session → Scope the work → Build → Ship**. One line each, no icon grid — use numbered type, hairlines, and spacing. This is real trust-building content, keep it concrete and honest.

7. **Closing CTA strip** — a calm, confident band (consider the `forest` dark treatment) restating the offer and linking to `/book`. The page's final conversion nudge.

8. **Footer** (shared) — wordmark, short line, GitHub link, `walonfoundation@gmail.com`, a **WhatsApp link** (`wa.me/<number>`, use a `NEXT_PUBLIC_WHATSAPP` env var with a placeholder number), "Freetown, Sierra Leone", MIT note.

### Booking page (`/book`)

A focused, uncluttered screen — its single job is to get the session booked. Same nav, footer, and design system; lighter on motion than the landing page (clarity over spectacle).

1. **Compact header** — a back link to `/` (text + thin arrow, no heavy icon), the wordmark, and a short heading like *"Tell us what you want to build."* with a one-line subhead setting expectations (e.g. a reply within 2 business days).
2. **Intake form** — the full form from section 6, given generous space and a clean single-column layout. This is the centerpiece of the page.
3. **Reassurance rail / aside** — a quiet supporting column (or band below on mobile) with 2–3 plain lines on what happens next and what the team builds, so the client feels oriented. Include a **"Prefer WhatsApp?" link** (`wa.me/<number>`) for clients who'd rather start a chat than fill a form — this is how a lot of local business actually happens, so make it easy to find but secondary to the form. No icon grid — text and hairlines only.
4. **`<SchedulingEmbed />` placeholder** — clearly marked, beneath the form, for a future Cal.com/Calendly embed.

---

## 5. Real product data (use exactly this content)

| Repo | One-line description | Domain | Language |
|------|---------------------|--------|----------|
| `fundwave` | Crowdfunding built for Sierra Leoneans, with mobile-money payments | Fintech | TypeScript |
| `tele-health` (SafeSpace Salone) | Anonymous mental-health counseling PWA — works on 3G, asks for no personal info | Health | TypeScript / PWA |
| `business-directory` | Hackathon-winning registry with real-time verification of Sierra Leonean businesses | Civic | TypeScript |
| `edu-ai` | Turns PDFs into summaries, flashcards, and Q&A | Education | TypeScript |
| `health-chatbot` | RAG health assistant (Hono, Pinecone, OpenAI/OpenRouter, PostgreSQL) | Health | TypeScript |
| `deen-track` | Privacy-first tracker for Muslims to log reflections and spiritual progress | Community | TypeScript |
| `monime-package` / `monime-package-go` | Typed helpers for Monime mobile-money payments | Fintech tooling | TypeScript / Go |
| `chatbot-react` | Drop-in React/Next.js chatbot component, CSS bundled inline | Developer tooling | React / CSS |

All repo links are `https://github.com/Walon-Foundation/<repo>`.

**Domains to group by**: Fintech & mobile money · Health · Education · Civic & business · Developer tooling.

---

## 6. Booking / intake form spec (lives on `/book`)

The form is the centerpiece of the `/book` page. Fields:
- **Name** (required)
- **Email** (required, validated)
- **Organization** (optional)
- **What do you want to build?** — select: Web app / Mobile app / Payment or mobile-money integration / AI or chatbot feature / Not sure yet
- **Project details** (textarea, required) — placeholder prompting them to describe the problem and who it's for
- **Budget range** (optional select) — frame in **local currency first**: show Leones with a USD reference, e.g. `Under SLE 25,000 (~$1k)` / `SLE 25k–120k (~$1–5k)` / `SLE 120k–350k (~$5–15k)` / `SLE 350k+ (~$15k+)` / `Not sure`. (Round the conversions sensibly; the point is to read as built for a local client, not a foreign agency.)
- **Preferred way to reach you** (optional: email / WhatsApp / call) + an optional contact handle field

Behavior:
- Client-side validation with clear inline errors (in the interface's voice — explain what's wrong and how to fix it).
- On submit → POST JSON to `/api/book` → email the details to `walonfoundation@gmail.com` via Resend.
- **Auto-reply to the client**: also send a confirmation email back to the submitter via Resend ("We've got your request — expect a reply within 2 business days") so the form never feels like it vanished. Keep the copy warm and plain.
- **Spam hardening**: include a hidden honeypot field (reject if filled) and basic rate-limiting on the `/api/book` route (e.g. per-IP, in-memory or a lightweight KV) so the inbox doesn't get flooded.
- Show a real success state on the page after submit, and a graceful error state that doesn't blame the user and offers the WhatsApp fallback.
- No HTML `<form>` reload behavior issues — handle via React state/handlers.
- Leave the `<SchedulingEmbed />` placeholder beneath the form for a future Cal.com embed.

---

## 7. Quality bar (non-negotiable)

- Fully **responsive**, mobile-first. It must look right on a small phone.
- **Accessible**: semantic HTML, labelled form fields, visible keyboard focus, sufficient contrast, `prefers-reduced-motion` respected for the scroll/hero animations.
- **Performant / lightweight** — the audience is on slow connections, so this is part of the brief, not an afterthought. No heavy libraries for things CSS can do. Lazy-load anything non-critical.
- **SEO + social**: proper per-route `<title>` and meta description, Open Graph / Twitter tags, and a real OG image. See section 7b for the full discoverability set.

### Animation (Framer Motion) — Anthropic calm × Apple scroll-choreography

The goal is motion that feels *choreographed and premium*, not a page where everything independently fades in. Two flavors working together: **Apple-style scroll-driven storytelling** (elements scale, pin, and transform tied to scroll progress) and **Anthropic-style calm restraint** (slow, soft, confident — never busy). Use crafted easing (e.g. `[0.22, 1, 0.36, 1]`), not default linear/ease.

**Apple-style scroll-driven motion (the standout layer):**
- Use `useScroll` + `useTransform` to tie animation to scroll progress, not just on-enter triggers. Elements should feel physically connected to the scroll.
- **Pinned/sticky hero moment.** As the user scrolls out of the hero, let the contour motif and headline scale and fade with `scrollYProgress` (a gentle parallax + scale, Apple-product-reveal style). Consider a `position: sticky` section where content transforms while the section stays pinned briefly.
- **Parallax layers.** The contour backdrop moves at a different rate than the foreground text as you scroll — subtle depth, not gimmicky.
- **Scroll-linked contour draw.** The Lion Mountains divider lines draw (`pathLength` driven by scroll progress) as each section enters — the mountains literally render as you descend the page.

**Hero load sequence (first paint):**
- One orchestrated entrance with `staggerChildren`: contour backdrop draws in, then eyebrow → headline → subhead → CTAs → stat strip rise and fade in sequence (`y` 16–24px, opacity 0→1). Reveal the headline by word or line for editorial polish. Keep the whole sequence under ~1.2s — calm but not sluggish.

**Scroll-triggered reveals (the quieter layer):**
- `whileInView` with `viewport={{ once: true, margin: "-80px" }}` for sections: soft fade + rise. Stagger the product manifest cards so they cascade as the grid enters.

**Micro-interactions:**
- Product cards: `whileHover` lifts with a soft shadow and a thin `clay`/`forest` edge; `whileTap` a small press. Spring-based, quick.
- Buttons/CTAs: `whileHover` + `whileTap` on every interactive element.
- Stat strip: optionally count numbers up when they scroll into view, once.
- Nav: subtle load entrance; shrink/raise its background on scroll via `useScroll`.

**Restraint rules (don't skip):**
- Respect motion preferences: wire up `useReducedMotion()` and, when true, drop transforms/path-draws/scroll-links to simple instant opacity — no movement, no parallax.
- The memorable trio is: the hero load sequence + the scroll-linked contour/parallax + the card cascade. Keep everything else quiet.
- Tight durations, intentional easing. Apple's motion is smooth and *slow-feeling but precise* — match that; avoid bouncy-everywhere or sluggish motion, both read as amateur.
- Motion must never block content or hurt performance on a slow connection — text stays readable even before/if JS hydrates.

---

## 7b. Discoverability, analytics & error pages

- **Structured data**: an `Organization` JSON-LD block (name, Freetown/Sierra Leone, email, GitHub URL, logo) in the root layout so search engines and social previews understand the org.
- **`sitemap.xml` and `robots.txt`** generated for the two routes (use Next's metadata/route conventions). Allow indexing.
- **OG image**: a real Open Graph image in the brand style (wordmark + warm canvas + a hint of the contour motif). A static asset is fine; a generated `opengraph-image` via Next is better.
- **Analytics**: **Cloudflare Web Analytics** (privacy-friendly, no cookie banner needed, fits the deploy target). Add the snippet behind a `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` env var so it no-ops when unset.
- **Designed 404** (`not-found.tsx`): in the same design system — warm canvas, a calm line of copy in the interface's voice, and a link back to `/`. No default Next.js error screen.
- **Favicon / app icons**: a simple wordmark-derived favicon and apple-touch-icon.

---

## 8. Deliverables

- A runnable Next.js (App Router) + TypeScript + Tailwind project with **two routes**: `/` (landing) and `/book` (booking).
- Shared layout: `Nav` and `Footer` used by both routes; Tailwind theme wired to the palette and fonts above.
- Landing components: `Hero`, `Mission`, `Manifest` (+ `ProductCard`), `Services`, `HowItWorks`, `ClosingCTA`.
- Booking page components: `BookingForm`, `SchedulingEmbed` (placeholder).
- The `/api/book` route (email to team + auto-reply + honeypot + rate-limit), a `not-found.tsx`, `sitemap`/`robots`, `.env.example` (with `RESEND_API_KEY`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_CF_ANALYTICS_TOKEN`), and a short `README.md` covering setup, env vars, and how to swap in Cal.com.

## 9. Don't

- Don't over-engineer: no database, no auth, no state library, no CMS.
- Don't use placeholder lorem ipsum — use the real copy and product data here.
- Don't fall back to a generic template hero (big number + gradient). Lead with the mission and let the shipped-work manifest carry the proof.
- Don't add features I didn't ask for. Ship the two routes (`/` and `/book`) and the booking flow, nothing more.