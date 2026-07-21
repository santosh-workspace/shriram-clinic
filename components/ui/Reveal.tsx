'use client';

import { useEffect, useRef, ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Generic scroll reveal — a soft rise + fade, or a clip-path wipe for
 * images. Purposely restrained so sections share one motion language.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  variant = 'rise',
  delay = 0,
  y = 40,
}: {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  variant?: 'rise' | 'clip' | 'scale';
  delay?: number;
  y?: number;
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

    const common = {
      duration: 1.2,
      ease: 'power3.out',
      delay,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    };

    let tween: gsap.core.Tween;
    if (variant === 'clip') {
      gsap.set(el, { clipPath: 'inset(0 0 100% 0)' });
      el.style.opacity = '1';
      tween = gsap.to(el, { clipPath: 'inset(0 0 0% 0)', ...common, duration: 1.4 });
    } else if (variant === 'scale') {
      el.style.opacity = '1';
      tween = gsap.from(el, { scale: 1.12, ...common });
    } else {
      tween = gsap.fromTo(el, { autoAlpha: 0, y }, { autoAlpha: 1, y: 0, ...common });
    }

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [variant, delay, y]);

  // polymorphic tag — a loose cast avoids the intrinsic-element ref union
  const Comp = Tag as unknown as React.FC<Record<string, unknown>>;
  const props: Record<string, unknown> = {
    ref,
    className: variant === 'rise' ? `will-reveal ${className}` : className,
  };
  return <Comp {...props}>{children}</Comp>;
}
