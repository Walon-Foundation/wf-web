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
