'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '@/lib/site';
import { useContent } from '@/components/providers/LanguageProvider';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { scrollToId } from '@/components/providers/SmoothScroll';

export function Hero() {
  const c = useContent();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const play = () => {
      if (reduce) {
        gsap.set(el.querySelectorAll('.hero-anim'), { autoAlpha: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline();
      tl.from('.hero-line', {
        yPercent: 120,
        duration: 1.3,
        ease: 'power4.out',
        stagger: 0.12,
      })
        .from(
          '.hero-fade',
          { autoAlpha: 0, y: 24, duration: 1, ease: 'power3.out', stagger: 0.1 },
          '-=0.8',
        )
        .from('.hero-scroll', { autoAlpha: 0, duration: 1 }, '-=0.4');
    };

    // parallax on the copy as the hero scrolls away
    const parallax = gsap.to('.hero-copy', {
      yPercent: reduce ? 0 : -18,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
    });

    // slow cinematic drift + zoom on the background photograph
    const bg = gsap.fromTo(
      '.hero-bg',
      { scale: 1.05 },
      {
        scale: reduce ? 1.05 : 1.16,
        yPercent: reduce ? 0 : 8,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      },
    );

    window.addEventListener('shriram:loaded', play, { once: true });
    // in case the loader already fired (fast refresh / reduced motion)
    const t = setTimeout(() => {
      if (getComputedStyle(el.querySelector('.hero-line') as Element).transform === 'none') return;
    }, 3000);

    return () => {
      window.removeEventListener('shriram:loaded', play);
      parallax.scrollTrigger?.kill();
      bg.scrollTrigger?.kill();
      clearTimeout(t);
    };
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-32"
    >
      {/* cinematic background photograph */}
      <div className="hero-bg absolute inset-0 -z-10">
        <Image
          src="/images/hero.jpg"
          alt="A doctor in an unhurried consultation with a patient at ShriRam Clinic"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* warm legibility scrims — strong on the left where the text sits */}
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/80 to-canvas/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/5 to-canvas/40" />
      </div>

      <div className="shell hero-copy w-full">
        <p className="hero-fade eyebrow mb-8">{c.hero.eyebrow}</p>

        <h1 className="max-w-[18ch] text-[clamp(2.2rem,7.2vw,5.85rem)] leading-[0.95] tracking-[-0.02em] text-ink">
          <span className="block overflow-hidden">
            <span className="hero-line block">
              {c.hero.titlePre}
              <span className="italic text-gold">{c.hero.titleEm}</span>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block">{c.hero.titlePost}</span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md text-pretty text-lg leading-relaxed text-muted">
            {c.hero.sub}
          </p>

          <div className="hero-fade flex flex-wrap items-center gap-4">
            <MagneticButton href={site.bookingUrl} newTab cursor="link">
              {c.ui.book}
            </MagneticButton>
            <MagneticButton
              href={`tel:${site.phoneHref}`}
              variant="outline"
              cursor="link"
              ariaLabel={`${c.ui.callNow} — ${site.phoneDisplay}`}
            >
              {c.ui.callNow}
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <button
        onClick={() => scrollToId('#about')}
        className="hero-scroll shell mt-14 flex items-center gap-3 text-left"
        data-cursor="link"
        aria-label={c.ui.scrollExplore}
      >
        <span className="relative flex h-12 w-6 items-start justify-center rounded-full border border-ink/25 pt-1.5">
          <span className="h-2 w-px animate-bounce bg-ink/60" />
        </span>
        <span className="eyebrow">{c.ui.scrollExplore}</span>
      </button>
    </section>
  );
}
