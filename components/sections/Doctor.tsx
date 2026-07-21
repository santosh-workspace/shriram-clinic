'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { doctors } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';
import { RevealText } from '@/components/ui/RevealText';
import { EditorialImage } from '@/components/ui/EditorialImage';

const creds = [
  { k: 'Qualification', v: 'B.A.M.S.' },
  { k: 'Registration', v: 'I-100789-A' },
  { k: 'Focus', v: 'Family & general medicine' },
  { k: 'Languages', v: 'Marathi · Hindi · English' },
];

export function Doctor() {
  const sig = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = sig.current;
    if (!path) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: path, start: 'top 85%', once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="doctor" className="relative bg-surface py-28 md:py-40">
      <div className="shell grid grid-cols-12 gap-y-12 md:gap-x-12">
        <div className="col-span-12 md:col-span-6">
          <Reveal variant="clip">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <EditorialImage
                tone="c"
                alt={`${doctors[0].name}, ${doctors[0].role}`}
                label="Doctor portrait — /images/doctor.png"
                src="/images/doctor.png"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 flex flex-col justify-center md:col-span-5 md:col-start-8">
          <Reveal>
            <p className="eyebrow mb-6">Meet your doctor</p>
          </Reveal>
          <RevealText as="h2" className="font-display text-display-sm text-ink">
            {doctors[0].name}
          </RevealText>
          <Reveal delay={0.1}>
            <p className="mt-3 text-muted">
              {doctors[0].creds} · {doctors[0].role}
            </p>
          </Reveal>

          <RevealText className="mt-8 text-lg leading-relaxed text-ink/80" stagger={0.04}>
            &ldquo;Medicine taught me the science. My patients taught me the rest — that
            being unwell is frightening, and that the first treatment is to be truly heard.&rdquo;
          </RevealText>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8">
            {creds.map((c, i) => (
              <Reveal key={c.k} delay={i * 0.06}>
                <div>
                  <p className="text-caption uppercase tracking-wider text-muted">{c.k}</p>
                  <p className="mt-1.5 text-ink">{c.v}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* animated signature */}
          <svg
            viewBox="0 0 320 90"
            className="mt-10 h-16 w-56 text-gold"
            fill="none"
            aria-hidden="true"
          >
            <path
              ref={sig}
              d="M8 62c14-2 20-40 30-40s6 46 14 46 12-40 22-40 6 34 16 34 14-44 26-44 8 46 18 46 16-42 30-42c10 0 14 20 24 20 12 0 20-16 34-16 18 0 30 18 60 8"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-2 text-caption uppercase tracking-wider text-muted">
            Alongside {doctors[1].name}, {doctors[1].creds}
          </p>
        </div>
      </div>
    </section>
  );
}
