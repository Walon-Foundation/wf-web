import type { Metadata } from 'next';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/landing/hero';
import { Mission } from '@/components/landing/mission';
import { Manifest } from '@/components/landing/manifest';
import { Services } from '@/components/landing/services';
import { HowItWorks } from '@/components/landing/how-it-works';
import { ClosingCTA } from '@/components/landing/closing-cta';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export const metadata: Metadata = {
  title: 'Walon Foundation — Software for Sierra Leone',
  description:
    'Open-source software collective in Freetown, Sierra Leone. MIT-licensed tools and custom software for clients worldwide.',
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Mission />
        <Manifest />
        <Services />
        <HowItWorks />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
