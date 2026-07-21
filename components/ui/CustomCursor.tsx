'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Context-aware custom cursor. A small dot tracks precisely while a
 * larger ring lags behind. Elements can opt into states via
 * `data-cursor="view" | "drag" | "link"`. Pointer / touch devices and
 * reduced-motion users keep the native cursor.
 */
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    document.body.classList.add('has-custom-cursor');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    const dotSet = gsap.quickSetter(dot.current, 'css');

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      dotSet({ transform: `translate(${e.clientX}px, ${e.clientY}px)` });
    };

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
      }
    };
    gsap.ticker.add(tick);

    const enter = (e: Event) => {
      const t = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null;
      if (t) {
        setActive(true);
        setLabel(t.dataset.cursor === 'view' ? 'View' : t.dataset.cursor === 'drag' ? 'Drag' : '');
      }
    };
    const leave = () => {
      setActive(false);
      setLabel('');
    };

    document.addEventListener('pointermove', onMove);
    document.querySelectorAll('[data-cursor]').forEach((el) => {
      el.addEventListener('pointerenter', enter);
      el.addEventListener('pointerleave', leave);
    });
    // catch dynamically-added targets via delegation
    document.addEventListener('pointerover', enter);
    document.addEventListener('pointerout', leave);

    return () => {
      gsap.ticker.remove(tick);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', enter);
      document.removeEventListener('pointerout', leave);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[150] hidden md:block" aria-hidden="true">
      <div
        ref={ring}
        className="fixed left-0 top-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-ink/40 transition-[width,height,background-color,border-color] duration-300 ease-editorial"
        style={
          active
            ? { width: 68, height: 68, marginLeft: -34, marginTop: -34, backgroundColor: 'rgba(184,144,101,0.12)', borderColor: 'rgba(184,144,101,0.6)' }
            : undefined
        }
      >
        {label && (
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-ink">
            {label}
          </span>
        )}
      </div>
      <div
        ref={dot}
        className="fixed left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold"
      />
    </div>
  );
}
