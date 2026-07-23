'use client';

import { Reveal } from '@/components/ui/Reveal';
import { RevealText } from '@/components/ui/RevealText';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { useContent } from '@/components/providers/LanguageProvider';

export function About() {
  const c = useContent();
  const stats = c.about.stats;
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="shell">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-12">
          {/* left rail */}
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <p className="eyebrow mb-6">{c.about.eyebrow}</p>
            </Reveal>
            <RevealText as="h2" className="font-display text-display-sm text-ink">
              {c.about.heading}
            </RevealText>
          </div>

          {/* right column */}
          <div className="col-span-12 flex flex-col justify-between md:col-span-6 md:col-start-7">
            <div className="max-w-lg">
              <RevealText className="text-xl leading-relaxed text-ink/80" stagger={0.05}>
                {c.about.p1}
              </RevealText>
              <RevealText className="mt-6 text-lg leading-relaxed text-muted" stagger={0.04}>
                {c.about.p2}
              </RevealText>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-line pt-10">
              {stats.map((s, i) => (
                <Reveal key={s.l} delay={i * 0.08}>
                  <div>
                    <p className="font-display text-4xl text-ink md:text-5xl">{s.v}</p>
                    <p className="mt-2 text-caption uppercase tracking-wider text-muted">{s.l}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* full-width horizontal clinic photograph */}
        <Reveal variant="clip" className="mt-16 md:mt-24">
          <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-sm md:aspect-[21/9]">
            <EditorialImage
              tone="c"
              alt="ShriRam Clinic — the clinic exterior in Alandi, Pune"
              label="Clinic storefront — save your photo as /images/clinic.jpg"
              src="/images/clinic.jpg"
              sizes="100vw"
            />
            <figcaption className="pointer-events-none absolute bottom-5 left-5 rounded-full bg-canvas/85 px-4 py-2 text-caption uppercase tracking-wider text-ink backdrop-blur-sm">
              {c.about.caption}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
