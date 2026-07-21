'use client';

import { Reveal } from '@/components/ui/Reveal';
import { RevealText } from '@/components/ui/RevealText';
import { EditorialImage } from '@/components/ui/EditorialImage';

const stats = [
  { v: '12+', l: 'Years serving Alandi' },
  { v: '15k+', l: 'Patients cared for' },
  { v: '4.9', l: 'Average patient rating' },
];

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="shell">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-12">
          {/* left rail */}
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <p className="eyebrow mb-6">The clinic</p>
            </Reveal>
            <RevealText as="h2" className="font-display text-display-sm text-ink">
              A quieter kind of clinic, built on being genuinely listened to.
            </RevealText>
          </div>

          {/* right column */}
          <div className="col-span-12 flex flex-col justify-between md:col-span-6 md:col-start-7">
            <div className="max-w-lg">
              <RevealText className="text-xl leading-relaxed text-ink/80" stagger={0.05}>
                ShriRam Clinic began with a simple conviction: that good medicine starts
                with time and attention. In a world of five-minute appointments, we chose
                to slow down.
              </RevealText>
              <RevealText className="mt-6 text-lg leading-relaxed text-muted" stagger={0.04}>
                We are a family practice at heart. The same doctor sees you through a
                seasonal fever and through the long arc of managing diabetes — building the
                kind of relationship where nothing about your health feels like a stranger&rsquo;s
                problem to solve.
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
              ShriRam Clinic · Alandi, Pune
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
