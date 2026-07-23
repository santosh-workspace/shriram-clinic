'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reveal } from '@/components/ui/Reveal';
import { RevealText } from '@/components/ui/RevealText';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { useContent } from '@/components/providers/LanguageProvider';

type ServiceItem = { n: string; title: string; body: string };

// real photography for the cursor-follow preview
const previewImgs = [
  '/images/consultation.jpg',
  '/images/reception.jpg',
  '/images/waiting.jpg',
  '/images/facilities.jpg',
];

function ServiceRow({
  s,
  i,
  onEnter,
  onLeave,
}: {
  s: ServiceItem;
  i: number;
  onEnter: (i: number) => void;
  onLeave: () => void;
}) {
  const wash = useRef<HTMLSpanElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const arrow = useRef<HTMLSpanElement>(null);

  const reduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const enter = () => {
    onEnter(i);
    if (reduced()) return;
    gsap.to(wash.current, { scaleX: 1, transformOrigin: 'left', duration: 0.6, ease: 'power3.out' });
    gsap.to(num.current, { scale: 1.35, color: '#B89065', duration: 0.45, ease: 'power3.out' });
    gsap.to(title.current, { x: 18, duration: 0.55, ease: 'power3.out' });
    gsap.to(arrow.current, { autoAlpha: 1, x: 0, duration: 0.45, ease: 'power3.out' });
  };

  const leave = () => {
    onLeave();
    if (reduced()) return;
    gsap.to(wash.current, { scaleX: 0, transformOrigin: 'right', duration: 0.5, ease: 'power3.inOut' });
    gsap.to(num.current, { scale: 1, duration: 0.45, ease: 'power3.inOut' });
    gsap.to(title.current, { x: 0, duration: 0.55, ease: 'power3.inOut' });
    gsap.to(arrow.current, { autoAlpha: 0, x: -10, duration: 0.3 });
  };

  return (
    <li
      className="svc-row relative overflow-hidden border-b border-line"
      onMouseEnter={enter}
      onMouseLeave={leave}
      data-cursor="view"
    >
      <span ref={wash} className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gold/[0.08]" />
      <div className="relative grid grid-cols-12 items-center gap-4 py-7 md:py-9">
        <span
          ref={num}
          className="col-span-2 inline-block font-display text-sm text-gold md:col-span-1"
          style={{ transformOrigin: 'left center' }}
        >
          {s.n}
        </span>
        <h3
          ref={title}
          className="col-span-10 font-display text-2xl text-ink md:col-span-5 md:text-[2rem]"
        >
          {s.title}
        </h3>
        <p className="col-span-12 col-start-3 text-muted md:col-span-5 md:col-start-7">{s.body}</p>
        <span
          ref={arrow}
          className="hidden justify-self-end text-xl text-gold opacity-0 md:col-span-1 md:block"
          style={{ transform: 'translateX(-10px)' }}
        >
          &rarr;
        </span>
      </div>
    </li>
  );
}

export function Services() {
  const c = useContent();
  const services = c.services.items;
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!preview.current) return;
    gsap.to(preview.current, { x: e.clientX, y: e.clientY, duration: 0.8, ease: 'power3.out' });
  };

  // staggered scroll reveal for the rows + a hairline that draws across
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.svc-rule', {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.svc-list', start: 'top 85%' },
      });
      // Transform-only entrance — rows keep opacity:1, so they stay
      // visible even if the ScrollTrigger never fires.
      gsap.from('.svc-row', {
        y: 44,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.07,
        clearProps: 'transform',
        scrollTrigger: { trigger: '.svc-list', start: 'top 82%' },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={root} className="relative bg-surface py-28 md:py-40" onMouseMove={onMove}>
      <div className="shell">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow mb-6">{c.services.eyebrow}</p>
            </Reveal>
            <RevealText as="h2" className="max-w-[14ch] font-display text-display-sm text-ink">
              {c.services.heading}
            </RevealText>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-muted">{c.services.intro}</p>
          </Reveal>
        </div>

        <div className="svc-list">
          <div className="svc-rule h-px w-full origin-left bg-ink/15" />
          <ul onMouseLeave={() => setHovered(null)}>
            {services.map((s, i) => (
              <ServiceRow key={s.title} s={s} i={i} onEnter={setHovered} onLeave={() => setHovered(null)} />
            ))}
          </ul>
        </div>
      </div>

      {/* cursor-following photo preview (desktop) */}
      <div
        ref={preview}
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden aspect-[4/3] w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] md:block"
        style={{
          opacity: hovered !== null ? 1 : 0,
          scale: hovered !== null ? '1' : '0.85',
          transition: 'opacity .5s var(--ease-editorial), scale .5s var(--ease-editorial)',
        }}
        aria-hidden="true"
      >
        {hovered !== null && (
          <EditorialImage
            src={previewImgs[hovered % previewImgs.length]}
            tone="c"
            alt=""
            label={services[hovered].title}
            sizes="320px"
          />
        )}
      </div>
    </section>
  );
}
