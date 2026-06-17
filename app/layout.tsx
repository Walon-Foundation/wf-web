import type { Metadata } from 'next';
import { fraunces, geistSans, geistMono } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Walon Foundation — Software for Sierra Leone',
    template: '%s | Walon Foundation',
  },
  description:
    'An open-source software collective in Freetown, Sierra Leone. MIT-licensed tools built for local constraints — and custom software for hire.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Walon Foundation',
    title: 'Walon Foundation — Software for Sierra Leone',
    description:
      'Open-source software collective in Freetown, Sierra Leone. Custom software for clients worldwide.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Walon Foundation — Software for Sierra Leone',
    description: 'Open-source software collective in Freetown, Sierra Leone.',
    images: ['/og-image.svg'],
  },
  metadataBase: new URL('https://walonfoundation.com'),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Walon Foundation',
  url: 'https://walonfoundation.com',
  email: 'walonfoundation@gmail.com',
  logo: 'https://walonfoundation.com/og-image.svg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Freetown',
    addressCountry: 'SL',
  },
  sameAs: ['https://github.com/Walon-Foundation'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} grain`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}"}`}
          />
        )}
      </head>
      <body className="bg-canvas text-ink">{children}</body>
    </html>
  );
}
