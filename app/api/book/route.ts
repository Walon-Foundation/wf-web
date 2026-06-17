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
