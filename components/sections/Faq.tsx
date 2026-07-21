'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { faqs } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';
import { RevealText } from '@/components/ui/RevealText';

function Item({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  const body = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  // Set the collapsed state before first paint (no flash of open content).
  useLayoutEffect(() => {
    if (body.current) gsap.set(body.current, { height: 0 });
  }, []);

  // GSAP drives the height frame-by-frame (rAF), so it doesn't depend on
  // CSS height transitions — reliable across every engine.
  useLayoutEffect(() => {
    const el = body.current;
    if (!el) return;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.to(el, {
      height: open ? el.scrollHeight : 0,
      duration: reduce ? 0 : 0.5,
      ease: 'power3.inOut',
      onComplete: () => {
        if (open) el.style.height = 'auto'; // absorb responsive reflow
      },
    });
  }, [open]);

  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor="link"
        aria-expanded={open}
        className="flex w-full items-center gap-6 py-7 text-left"
      >
        <span className="font-display text-sm text-gold">{String(i + 1).padStart(2, '0')}</span>
        <span className="flex-1 font-display text-xl text-ink md:text-2xl">{q}</span>
        <span className="relative h-4 w-4 shrink-0">
          <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-ink" />
          <span
            className={`absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-ink transition-transform duration-500 ease-editorial ${
              open ? 'rotate-90' : ''
            }`}
          />
        </span>
      </button>
      <div ref={body} className="overflow-hidden">
        <p className="max-w-2xl pb-7 pl-10 text-lg leading-relaxed text-muted">{a}</p>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="relative py-28 md:py-40">
      <div className="shell grid grid-cols-12 gap-y-10 md:gap-x-12">
        <div className="col-span-12 md:col-span-4">
          <Reveal>
            <p className="eyebrow mb-6">Good to know</p>
          </Reveal>
          <RevealText as="h2" className="font-display text-display-sm text-ink">
            Questions, answered plainly.
          </RevealText>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          {faqs.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
