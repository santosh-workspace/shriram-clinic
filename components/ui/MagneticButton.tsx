'use client';

import { useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'solid' | 'outline' | 'ghost';
  className?: string;
  strength?: number;
  cursor?: string;
  ariaLabel?: string;
  newTab?: boolean;
};

/**
 * Button / link with a magnetic pull toward the cursor and a subtle
 * inner-label counter-move. Disabled under reduced-motion.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'solid',
  className = '',
  strength = 0.35,
  cursor,
  ariaLabel,
  newTab = false,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.6, ease: 'power3.out' });
    gsap.to(label.current, { x: x * 0.4, y: y * 0.4, duration: 0.6, ease: 'power3.out' });
  };

  const reset = () => {
    gsap.to([ref.current, label.current], {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-500 ease-editorial';
  const styles = {
    solid: 'bg-ink text-canvas hover:bg-gold',
    outline: 'border border-ink/25 text-ink hover:border-gold hover:text-gold',
    ghost: 'text-ink hover:text-gold',
  }[variant];

  const inner = (
    <span ref={label} className="inline-flex items-center gap-2">
      {children}
    </span>
  );

  const shared = {
    ref,
    onMouseMove: move,
    onMouseLeave: reset,
    'data-cursor': cursor,
    'aria-label': ariaLabel,
    className: `${base} ${styles} ${className}`,
  } as const;

  if (href) {
    return (
      <a
        href={href}
        {...shared}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} {...shared}>
      {inner}
    </button>
  );
}
