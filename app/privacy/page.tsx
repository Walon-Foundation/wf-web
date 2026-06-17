import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Walon Foundation handles your information.',
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="bg-canvas min-h-screen pt-28 pb-24">
        <div className="max-w-2xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-mist text-sm hover:text-ink transition-colors mb-12"
          >
            <span aria-hidden="true">←</span>
            Back
          </Link>

          <p className="font-mono text-xs text-mist tracking-widest uppercase mb-4">
            Privacy Policy
          </p>
          <h1 className="font-fraunces font-medium text-ink text-4xl md:text-5xl mb-3">
            Your information stays yours.
          </h1>
          <p className="text-mist text-sm mb-12">
            Effective date: 17 June 2026
          </p>

          <div className="space-y-10 text-sm text-ink leading-relaxed">
            <section>
              <h2 className="font-fraunces font-medium text-xl text-ink mb-3">
                What we collect
              </h2>
              <p className="text-mist">
                When you submit the booking form on{' '}
                <Link href="/book" className="text-ink underline underline-offset-2">
                  /book
                </Link>
                , we receive whatever you choose to share: your name, email
                address, organisation, project description, budget range, and
                preferred contact method. We collect nothing else. We do not use
                cookies, analytics trackers, or third-party scripts beyond an
                optional Cloudflare Web Analytics beacon — which collects
                aggregate page views with no personal identifiers.
              </p>
            </section>

            <section>
              <h2 className="font-fraunces font-medium text-xl text-ink mb-3">
                How we use it
              </h2>
              <p className="text-mist">
                We use your submission solely to read your request and send you
                a reply. That reply comes from a real person on the Walon
                Foundation team. We do not send newsletters, marketing emails,
                or automated sequences. If you ask us to stop contacting you, we
                will.
              </p>
            </section>

            <section>
              <h2 className="font-fraunces font-medium text-xl text-ink mb-3">
                What we do not do
              </h2>
              <ul className="text-mist space-y-2 list-none">
                <li className="flex gap-3">
                  <span className="text-clay shrink-0">—</span>
                  We do not sell your information to anyone, ever.
                </li>
                <li className="flex gap-3">
                  <span className="text-clay shrink-0">—</span>
                  We do not share it with third-party advertisers or data brokers.
                </li>
                <li className="flex gap-3">
                  <span className="text-clay shrink-0">—</span>
                  We do not store it in a marketing database or CRM beyond what
                  is needed to reply to your request.
                </li>
                <li className="flex gap-3">
                  <span className="text-clay shrink-0">—</span>
                  We do not use it to build a profile on you.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-fraunces font-medium text-xl text-ink mb-3">
                Data security
              </h2>
              <p className="text-mist">
                Booking submissions are delivered by Resend, an email delivery
                provider, to our team inbox. We treat email as private
                correspondence. For projects that require handling sensitive
                client data — user records, payment information, health data —
                we apply appropriate security measures: encryption at rest,
                role-based access controls, and minimal data collection
                practices. The security requirements for your project will be
                agreed on before work begins.
              </p>
            </section>

            <section>
              <h2 className="font-fraunces font-medium text-xl text-ink mb-3">
                Open-source repositories
              </h2>
              <p className="text-mist">
                The Walon Foundation repositories on GitHub are public and
                MIT-licensed. If you open an issue, submit a pull request, or
                leave a comment, that activity is subject to{' '}
                <a
                  href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline underline-offset-2"
                >
                  GitHub's privacy policy
                </a>
                , not ours.
              </p>
            </section>

            <section>
              <h2 className="font-fraunces font-medium text-xl text-ink mb-3">
                Contact
              </h2>
              <p className="text-mist">
                Questions about this policy or how your data is handled? Email
                us at{' '}
                <a
                  href="mailto:walonfoundation@gmail.com"
                  className="text-ink underline underline-offset-2"
                >
                  walonfoundation@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-fraunces font-medium text-xl text-ink mb-3">
                Changes
              </h2>
              <p className="text-mist">
                If we update this policy materially, we will change the
                effective date at the top of this page. We will not use your
                information in a way that contradicts what is written here
                without asking first.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
