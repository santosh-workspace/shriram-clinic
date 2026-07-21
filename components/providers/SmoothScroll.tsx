'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/**
 * Global smooth-scroll layer. Lenis drives the scroll position and we
 * hand each frame to GSAP so ScrollTrigger stays in perfect sync.
 * Honours prefers-reduced-motion by skipping Lenis entirely.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const onFrame = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onFrame);
    gsap.ticker.lagSmoothing(0);

    // expose so anchor links / buttons can request a smooth scroll
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onFrame);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}

/** Programmatic smooth-scroll helper used by the nav and CTAs. */
export function scrollToId(id: string) {
  const target = document.querySelector(id);
  if (!target) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(target as HTMLElement, { offset: -10, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
