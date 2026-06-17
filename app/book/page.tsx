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
              <div className="bg-forest rounded-2xl p-7 space-y-6">
                <p className="text-canvas/80 text-sm leading-relaxed">
                  A real person on the Walon Foundation team reads every
                  request and replies personally. No automated responses.
                </p>

                <div className="h-px bg-canvas/10" />

                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <span className="font-mono text-xs text-canvas/40 pt-0.5 shrink-0">01</span>
                    <p className="text-canvas/70 leading-relaxed">
                      Web apps, mobile apps, payment integrations, and AI features — built to work in Sierra Leone's network conditions.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-xs text-canvas/40 pt-0.5 shrink-0">02</span>
                    <p className="text-canvas/70 leading-relaxed">
                      Your information is used only to respond to your request. Never shared, never sold.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-xs text-canvas/40 pt-0.5 shrink-0">03</span>
                    <p className="text-canvas/70 leading-relaxed">
                      We reply within two business days. Usually faster.
                    </p>
                  </div>
                </div>

                <div className="h-px bg-canvas/10" />

                <p className="text-sm text-canvas/50">
                  Prefer a faster start?{' '}
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-canvas hover:text-clay transition-colors underline underline-offset-2"
                  >
                    Message us on WhatsApp
                  </a>
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
