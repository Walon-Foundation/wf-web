import { headers } from 'next/headers';
import { rateLimit } from '@/lib/rate-limit';
import { createAirtableRecord } from '@/lib/airtable';

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

  const {
    name,
    email,
    organization,
    buildType,
    details,
    budget,
    contactPreference,
    contactHandle,
  } = body;

  if (!name || !email || !details) {
    return Response.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  await createAirtableRecord({
    Name: name,
    Email: email,
    Organization: organization || '',
    'Build Type': buildType || '',
    Details: details,
    Budget: budget || '',
    'Contact Preference': contactPreference || '',
    'Contact Handle': contactHandle || '',
    'Submitted At': new Date().toISOString(),
    Status: 'New',
  });

  return Response.json({ success: true });
}
