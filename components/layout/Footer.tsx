'use client';

import { nav, site } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';
import { scrollToId } from '@/components/providers/SmoothScroll';

export function Footer() {
  return (
    <footer className="relative bg-ink text-canvas">
      <div className="shell py-20">
        <div className="grid grid-cols-12 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <Logo tone="inverse" />
            <p className="mt-8 max-w-xs text-lg leading-relaxed text-canvas/60">
              {site.tagline}
            </p>
            <p className="mt-6 text-caption uppercase tracking-wider text-canvas/40">
              {site.locality}, {site.city} · {site.region}
            </p>
          </div>

          <nav className="col-span-6 md:col-span-3" aria-label="Footer">
            <p className="mb-5 text-caption uppercase tracking-wider text-canvas/40">Explore</p>
            <ul className="space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <button
                    onClick={() => scrollToId(n.href)}
                    data-cursor="link"
                    className="link-underline text-canvas/80 hover:text-canvas"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-4">
            <p className="mb-5 text-caption uppercase tracking-wider text-canvas/40">Reach us</p>
            <ul className="space-y-2.5">
              <li>
                <a href={`tel:${site.phoneHref}`} data-cursor="link" className="link-underline text-canvas/80 hover:text-canvas">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" data-cursor="link" className="link-underline text-canvas/80 hover:text-canvas">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} data-cursor="link" className="link-underline text-canvas/80 hover:text-canvas">
                  {site.email}
                </a>
              </li>
            </ul>
            <button
              onClick={() => scrollToId('#booking')}
              data-cursor="link"
              className="mt-8 rounded-full border border-canvas/30 px-6 py-3 text-sm transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              Book appointment
            </button>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-canvas/10 pt-8 text-caption text-canvas/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            Not for emergencies — call <span className="text-canvas/70">108</span> for an ambulance.
          </p>
        </div>
      </div>
    </footer>
  );
}
