'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Logo } from './Logo';

/**
 * First-visit loading sequence: a counter climbs to 100 while the
 * wordmark settles, then two panels part to reveal the page. Dispatches
 * `shriram:loaded` so the hero can begin its own entrance.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();

    let closed = false;
    const dismiss = () => {
      if (closed) return;
      closed = true;
      setDone(true);
      lenis?.start();
      window.dispatchEvent(new Event('shriram:loaded'));
    };

    const finish = () => {
      const tl = gsap.timeline({ onComplete: dismiss });
      tl.to('.pl-content', { autoAlpha: 0, y: -20, duration: 0.6, ease: 'power2.in' })
        .to('.pl-panel', {
          scaleY: 0,
          duration: 1,
          ease: 'power4.inOut',
          stagger: 0.08,
          transformOrigin: 'top',
        }, '-=0.2');
    };

    if (reduce) {
      setCount(100);
      dismiss();
      return;
    }

    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: 100,
      duration: 2.1,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(obj.v)),
      onComplete: () => gsap.delayedCall(0.25, finish),
    });

    // Hard safety net: never let the loader trap the page if the GSAP
    // chain is interrupted (e.g. StrictMode double-invoke in dev).
    const fallback = window.setTimeout(dismiss, 5200);

    return () => {
      tween.kill();
      window.clearTimeout(fallback);
      lenis?.start();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="pl-panel absolute inset-0 h-full w-1/2 bg-canvas" />
      <div className="pl-panel absolute inset-0 left-1/2 h-full w-1/2 bg-canvas" />
      <div className="pl-content relative flex flex-col items-center gap-8 text-ink">
        <Logo tone="ink" withWordmark={false} className="scale-[1.4]" />
        <div className="overflow-hidden">
          <p className="font-display text-2xl tracking-tight">श्रीराम क्लिनिक</p>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="eyebrow">Alandi · Pune</span>
          <span className="font-display text-sm tabular-nums text-muted">{count}</span>
        </div>
      </div>
    </div>
  );
}
