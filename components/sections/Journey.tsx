'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '@/components/providers/LanguageProvider';

/**
 * Pinned horizontal storytelling. The section holds while five panels
 * pass through, a hairline "spine" draws across, and each step settles
 * into focus. Collapses to a vertical stack under reduced-motion.
 */
export function Journey() {
  const c = useContent();
  const journey = c.journey.steps;
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = root.current;
    const el = track.current;
    if (!section || !el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const distance = el.scrollWidth - window.innerWidth;

      const tl = gsap.to(el, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance + window.innerHeight * 0.5}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // draw the spine in sync
      gsap.fromTo(
        '.journey-spine',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance + window.innerHeight * 0.5}`,
            scrub: 1,
          },
        },
      );

      // gently rise each panel's content
      gsap.utils.toArray<HTMLElement>('.journey-panel').forEach((panel) => {
        gsap.from(panel.querySelectorAll('.j-anim'), {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tl,
            start: 'left 75%',
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={root} className="relative overflow-hidden bg-ink text-canvas">
      <div className="pointer-events-none absolute left-0 top-1/2 z-10 h-px w-full bg-canvas/10">
        <div className="journey-spine h-full w-full origin-left scale-x-0 bg-gold" />
      </div>

      <div
        ref={track}
        className="flex h-[100svh] w-max items-center md:flex-nowrap"
      >
        {/* intro panel */}
        <div className="journey-panel flex h-full w-screen shrink-0 flex-col justify-center px-[8vw]">
          <p className="j-anim eyebrow mb-6 text-canvas/50">{c.journey.eyebrow}</p>
          <h2 className="j-anim max-w-[12ch] font-display text-display-md">{c.journey.heading}</h2>
          <p className="j-anim mt-8 max-w-sm text-lg text-canvas/60">{c.journey.sub}</p>
          <p className="j-anim mt-10 text-caption uppercase tracking-[0.2em] text-canvas/40">
            {c.journey.scroll}
          </p>
        </div>

        {journey.map((s) => (
          <article
            key={s.step}
            className="journey-panel flex h-full w-[86vw] shrink-0 flex-col justify-center px-[6vw] md:w-[46vw]"
          >
            <div className="j-anim flex items-center gap-4">
              <span className="font-display text-6xl text-gold md:text-7xl">{s.step}</span>
              <span className="h-px flex-1 bg-canvas/15" />
            </div>
            <h3 className="j-anim mt-8 font-display text-4xl md:text-5xl">{s.title}</h3>
            <p className="j-anim mt-5 max-w-sm text-lg leading-relaxed text-canvas/60">
              {s.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
