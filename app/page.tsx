import type { Metadata } from 'next';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/landing/hero';
import { Mission } from '@/components/landing/mission';
import { Services } from '@/components/landing/services';
import { Testimonials } from '@/components/landing/testimonials';
import { HowItWorks } from '@/components/landing/how-it-works';
import { FAQ } from '@/components/landing/faq';
import { ClosingCTA } from '@/components/landing/closing-cta';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export const metadata: Metadata = {
  title: 'Walon Foundation — Software for Sierra Leone',
  description:
    'Walon Foundation builds complete software systems — frontend, backend, mobile, AI, and DevOps — for businesses and organizations worldwide. Based in Freetown, Sierra Leone.',
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Mission />
        <Services />
        <Testimonials />
        <HowItWorks />
        <FAQ />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
