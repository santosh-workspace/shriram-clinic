'use client';

import { useEffect, useRef } from 'react';

/** Hairline progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[110] h-[2px] bg-transparent" aria-hidden="true">
      <div
        ref={bar}
        className="h-full w-full origin-left scale-x-0 bg-gold"
      />
    </div>
  );
}
