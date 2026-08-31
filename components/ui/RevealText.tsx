'use client';

import { useEffect, useRef, ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Line-by-line editorial reveal. Each line rises from behind a mask.
 * Falls back to a plain visible block under reduced-motion.
 */
export function RevealText({
  children,
  as: Tag = 'p',
  className = '',
  stagger = 0.08,
  delay = 0,
}: {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1';
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Lazy-load split-type only when needed
    import('split-type').then(({ default: SplitType }) => {
      if (!ref.current) return;
      const split = new SplitType(el, { types: 'lines', lineClass: 'reveal-line' });

      // wrap each line so we can clip it
      const lines = el.querySelectorAll<HTMLElement>('.reveal-line');
      lines.forEach((line) => {
        const wrap = document.createElement('span');
        wrap.style.display = 'block';
        wrap.style.overflow = 'hidden';
        line.parentNode?.insertBefore(wrap, line);
        wrap.appendChild(line);
      });

      el.style.opacity = '1';

      gsap.from(el.querySelectorAll('.reveal-line'), {
        yPercent: 115,
        duration: 1.1,
        ease: 'power4.out',
        stagger,
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    });
  }, [stagger, delay]);

  // polymorphic tag — a loose cast avoids the intrinsic-element ref union
  const Comp = Tag as unknown as React.FC<Record<string, unknown>>;
  const props: Record<string, unknown> = { ref, className: `will-reveal ${className}` };
  return <Comp {...props}>{children}</Comp>;
}
