'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { nav, site } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';
import { scrollToId } from '@/components/providers/SmoothScroll';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const ids = [...nav.map((n) => n.href.slice(1)), 'booking'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  // The overlay's show/hide is driven by React state below (reliable in
  // every engine). GSAP only staggers the links in when it opens.
  useEffect(() => {
    const el = overlay.current;
    if (!el || !open) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    // Animate only the transform — links keep opacity:1, so their
    // visibility never depends on the tween completing.
    gsap.from(el.querySelectorAll('.m-link'), {
      y: 26,
      duration: 0.5,
      stagger: 0.06,
      delay: 0.08,
      ease: 'power3.out',
      overwrite: 'auto',
      clearProps: 'transform',
    });
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    // allow menu close before scrolling
    setTimeout(() => scrollToId(href), open ? 500 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[130] transition-all duration-500 ease-editorial ${
          scrolled
            ? 'border-b border-line bg-canvas/70 py-3 backdrop-blur-xl'
            : 'border-b border-transparent py-5'
        }`}
      >
        <nav className="shell flex items-center justify-between">
          <button onClick={() => go('#top')} data-cursor="link" aria-label="ShriRam Clinic — home">
            <Logo tone="ink" />
          </button>

          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => go(item.href)}
                  data-cursor="link"
                  className={`link-underline text-sm transition-colors duration-300 ${
                    active === item.href.slice(1) ? 'text-gold' : 'text-ink/70 hover:text-ink'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${site.phoneHref}`}
              data-cursor="link"
              className="hidden text-sm text-ink/70 transition-colors hover:text-ink sm:block"
            >
              {site.phoneDisplay}
            </a>
            <button
              onClick={() => go('#booking')}
              data-cursor="link"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-sm text-canvas transition-colors duration-500 hover:bg-gold md:inline-block"
            >
              Book appointment
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              data-cursor="link"
              className="relative z-[130] flex h-11 w-11 items-center justify-center lg:hidden"
            >
              {open ? (
                // explicit close icon — not dependent on CSS transitions
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-ink" aria-hidden="true">
                  <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
                </svg>
              ) : (
                <span className="flex flex-col gap-[6px]" aria-hidden="true">
                  <span className="h-px w-6 bg-ink" />
                  <span className="h-px w-6 bg-ink" />
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* fullscreen mobile menu */}
      <div
        ref={overlay}
        className="fixed inset-0 z-[120] bg-canvas lg:hidden"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          pointerEvents: open ? 'auto' : 'none',
        }}
        aria-hidden={!open}
      >
        <div className="shell flex h-full flex-col justify-center pt-20">
          <ul className="flex flex-col gap-1">
            {nav.map((item, i) => (
              <li key={item.href} className="m-link">
                <button
                  onClick={() => go(item.href)}
                  className="flex items-baseline gap-4 py-2 text-left active:text-gold"
                >
                  <span className="font-display text-xs text-gold">0{i + 1}</span>
                  <span className="font-display text-4xl tracking-tight text-ink">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="m-link mt-10 border-t border-line pt-6">
            <button
              onClick={() => go('#booking')}
              className="w-full rounded-full bg-ink py-4 text-center text-sm font-medium text-canvas active:bg-gold"
            >
              Book appointment
            </button>
            <div className="mt-6 flex flex-col gap-1">
              <a href={`tel:${site.phoneHref}`} className="text-lg text-ink">
                {site.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-ink/80"
              >
                WhatsApp
              </a>
              <span className="text-sm text-muted">{site.email}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
