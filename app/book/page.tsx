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
                <p className="flex gap-2">
                  <span className="text-ink font-medium shrink-0">Privacy.</span>
                  Your information is used only to respond to your request.
                  We do not share it with third parties, sell it, or store it
                  beyond what is needed to reply.
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
