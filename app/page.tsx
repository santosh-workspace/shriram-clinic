import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { LangBoundary } from '@/components/providers/LangBoundary';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Preloader } from '@/components/ui/Preloader';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { FloatingActions } from '@/components/ui/FloatingActions';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Sections } from '@/components/Sections';

export default function Home() {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <Preloader />
      <ScrollProgress />
      <FloatingActions />
      <div className="grain-overlay animate-grain" aria-hidden="true" />

        <LangBoundary>
          <Navbar />
          <main>
            <Sections />
          </main>
          <Footer />
        </LangBoundary>
      </SmoothScroll>
    </LanguageProvider>
  );
}
