'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reviews } from '@/lib/site';
import { useContent } from '@/components/providers/LanguageProvider';

/** Google's four-colour "G" mark. */
function GoogleG({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function Stars({ size = 16 }: { size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#F5A623">
          <path d="M12 17.3l-6.16 3.7 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.48 4.73 1.64 7.03z" />
        </svg>
      ))}
    </span>
  );
}

/** Compact Google-reviews trust badge. */
function GoogleBadge({ reviewsOn }: { reviewsOn: string }) {
  return (
    <a
      href={reviews.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="link"
      className="group inline-flex items-center gap-4 rounded-xl border border-line bg-surface px-5 py-4 transition-colors duration-500 ease-editorial hover:border-gold/50"
    >
      <GoogleG size={30} />
      <span className="flex flex-col">
        <span className="flex items-center gap-2">
          <span className="font-display text-2xl leading-none text-ink">{reviews.rating}</span>
          <Stars />
        </span>
        <span className="mt-1 text-caption text-muted">
          {reviews.count} {reviewsOn} <span className="font-medium text-ink">Google</span>
        </span>
      </span>
    </a>
  );
}

export function Testimonials() {
  const c = useContent();
  const rb = c.reviewsBlock;
  const testimonials = rb.items;
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduce(true);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: `+=${testimonials.length * 60}%`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const idx = Math.min(
          testimonials.length - 1,
          Math.floor(self.progress * testimonials.length),
        );
        setI(idx);
      },
    });
    return () => st.kill();
  }, []);

  const Header = (
    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
      <div>
        <div className="mb-5 inline-flex items-center gap-2">
          <GoogleG size={18} />
          <span className="eyebrow !tracking-[0.2em]">{rb.eyebrow}</span>
        </div>
        <h2 className="max-w-[16ch] font-display text-display-md text-ink">{rb.heading}</h2>
      </div>
      <GoogleBadge reviewsOn={rb.reviewsOn} />
    </div>
  );

  if (reduce) {
    return (
      <section id="testimonials" className="py-28">
        <div className="shell space-y-14">
          {Header}
          <div className="space-y-12">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="max-w-3xl border-t border-line pt-8">
                <Stars />
                <p className="mt-4 font-display text-2xl leading-snug text-ink">{t.quote}</p>
                <footer className="mt-4 flex items-center gap-2 text-muted">
                  <span className="text-ink">{t.name}</span>
                  <span>· {t.detail}</span>
                  <GoogleG size={14} />
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" ref={root} className="relative h-[100svh] overflow-hidden">
      <div className="shell flex h-full flex-col justify-center py-24">
        {Header}

        <div className="relative mt-10 h-[38vh] md:h-[34vh]">
          {testimonials.map((t, idx) => (
            <blockquote
              key={t.name}
              className="absolute inset-0 flex max-w-4xl flex-col justify-center transition-all duration-700 ease-editorial"
              style={{ opacity: idx === i ? 1 : 0, transform: `translateY(${(idx - i) * 24}px)` }}
              aria-hidden={idx !== i}
            >
              <Stars size={18} />
              <p className="mt-5 text-balance font-display text-[clamp(1.6rem,3.2vw,3rem)] leading-[1.18] text-ink">
                {t.quote}
              </p>
              <footer className="mt-7 flex items-center gap-3 text-muted">
                <span className="h-px w-8 bg-gold" />
                <span className="text-ink">{t.name}</span>
                <span>· {t.detail}</span>
                <span className="ml-1 inline-flex items-center gap-1.5 text-caption">
                  <GoogleG size={14} /> {rb.postedOn}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-6">
          <div className="flex flex-1 gap-2">
            {testimonials.map((_, idx) => (
              <span
                key={idx}
                className="h-px flex-1 origin-left"
                style={{
                  background: idx <= i ? 'var(--gold)' : 'var(--line)',
                  transition: 'background .5s var(--ease-editorial)',
                }}
              />
            ))}
          </div>
          <p className="font-display text-sm tabular-nums text-muted">
            <span className="text-ink">{String(i + 1).padStart(2, '0')}</span> /{' '}
            {String(testimonials.length).padStart(2, '0')}
          </p>
        </div>
      </div>
    </section>
  );
}
