import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Preloader } from '@/components/ui/Preloader';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { FloatingActions } from '@/components/ui/FloatingActions';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Journey } from '@/components/sections/Journey';
import { Doctor } from '@/components/sections/Doctor';
import { Testimonials } from '@/components/sections/Testimonials';
import { Faq } from '@/components/sections/Faq';
import { Location } from '@/components/sections/Location';
import { BookingCta } from '@/components/sections/BookingCta';

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <FloatingActions />
      <div className="grain-overlay animate-grain" aria-hidden="true" />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Journey />
        <Doctor />
        <Testimonials />
        <Faq />
        <Location />
        <BookingCta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
