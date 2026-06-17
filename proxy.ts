import type { NextRequest } from 'next/server';

export function middleware(_req: NextRequest) {}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
