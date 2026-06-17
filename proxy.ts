import type { NextRequest } from 'next/server';

export default function middleware(_req: NextRequest) {}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
