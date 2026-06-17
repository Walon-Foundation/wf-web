import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms governing Walon Foundation services and open-source software.',
};

export default function TermsPage() {
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
            Terms of Service
          </p>
          <h1 className="font-fraunces font-medium text-ink text-4xl md:text-5xl mb-3">
            Plain terms for working with us.
          </h1>
          <p className="text-mist text-sm mb-12">
            Effective date: 17 June 2026
          </p>

          <div className="space-y-10 text-sm text-ink leading-relaxed">
            <section>
              <h2 className="font-fraunces font-medium text-xl text-ink mb-3">
                What we do
              </h2>
              <p className="text-mist">
                Walon Foundation builds custom software for clients: web
                applications, mobile apps, payment integrations, AI features,
                and offline-capable PWAs. We also maintain open-source
                repositories released under the MIT license. These terms apply
                to both.
              </p>
            </section>

            <section>
              <h2 className="font-fraunces font-medium text-xl text-ink mb-3">
                Custom software engagements
              </h2>
              <p className="text-mist mb-4">
                Before any paid work begins, we agree in writing on the scope,
                timeline, and payment terms. That agreement governs the
                engagement. These terms set the baseline where nothing else is
                specified.
              </p>
              <ul className="text-mist space-y-3 list-none">
                <li className="flex gap-3">
                  <span className="text-clay shrink-0">—</span>
                  <span>
                    <strong className="text-ink font-medium">Ownership.</strong>{' '}
                    Software we build for you is yours. On final payment, all
                    intellectual property in the deliverables transfers to you.
                    We retain the right to describe the work publicly unless
                    you ask us not to.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-clay shrink-0">—</span>
                  <span>
                    <strong className="text-ink font-medium">Client data.</strong>{' '}
                    When your project involves user data, we handle it with
                    care. Specific data security requirements — encryption,
                    access controls, retention policies — are agreed before
                    development begins and documented in the project scope.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-clay shrink-0">—</span>
                  <span>
                    <strong className="text-ink font-medium">Honesty.</strong>{' '}
                    We ask that you represent your project accurately. We
                    reserve the right to decline or end an engagement if the
                    work would require us to build something harmful or illegal.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-clay shrink-0">—</span>
                  <span>
                    <strong className="text-ink font-medium">Payment.</strong>{' '}
                    Payment terms are set per engagement. Unpaid invoices past
                    30 days may result in work being paused.
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-fraunces font-medium text-xl text-ink mb-3">
                Open-source software
              </h2>
              <p className="text-mist">
                All Walon Foundation open-source repositories are released under
                the MIT License. They are provided as-is, without warranty of
                any kind. We make no guarantee that they are fit for any
                particular purpose. You are free to use, copy, modify, and
                distribute them under the terms of the MIT license included in
                each repository.
              </p>
            </section>

            <section>
              <h2 className="font-fraunces font-medium text-xl text-ink mb-3">
                Limitation of liability
              </h2>
              <p className="text-mist">
                To the extent permitted by law, Walon Foundation's liability
                for any claim arising from a custom engagement is limited to
                the fees paid in the 30 days before the claim arose. We are not
                liable for indirect, incidental, or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="font-fraunces font-medium text-xl text-ink mb-3">
                Governing law
              </h2>
              <p className="text-mist">
                These terms are governed by the laws of Sierra Leone. Disputes
                that cannot be resolved directly should be referred to
                arbitration in Freetown before any court proceedings.
              </p>
            </section>

            <section>
              <h2 className="font-fraunces font-medium text-xl text-ink mb-3">
                Contact
              </h2>
              <p className="text-mist">
                Questions about these terms?{' '}
                <a
                  href="mailto:walonfoundation@gmail.com"
                  className="text-ink underline underline-offset-2"
                >
                  walonfoundation@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
