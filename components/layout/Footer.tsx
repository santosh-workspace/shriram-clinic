'use client';

import { site } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';
import { scrollToId } from '@/components/providers/SmoothScroll';
import { useContent } from '@/components/providers/LanguageProvider';

export function Footer() {
  const c = useContent();
  const f = c.footer;
  return (
    <footer className="relative bg-ink text-canvas">
      <div className="shell py-20">
        <div className="grid grid-cols-12 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <Logo tone="inverse" />
            <p className="mt-8 max-w-xs text-lg leading-relaxed text-canvas/60">
              {f.tagline}
            </p>
            <p className="mt-6 text-caption uppercase tracking-wider text-canvas/40">
              {f.localityLine}
            </p>
          </div>

          <nav className="col-span-6 md:col-span-3" aria-label="Footer">
            <p className="mb-5 text-caption uppercase tracking-wider text-canvas/40">{f.explore}</p>
            <ul className="space-y-2.5">
              {c.nav.map((n) => (
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
            <p className="mb-5 text-caption uppercase tracking-wider text-canvas/40">{f.reachUs}</p>
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
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="mt-8 inline-block rounded-full border border-canvas/30 px-6 py-3 text-sm transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              {c.ui.book}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-canvas/10 pt-8 text-caption text-canvas/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. {f.rights}
          </p>
          <p>
            {f.emergency1} <span className="text-canvas/70">108</span> {f.emergency2}
          </p>
        </div>
      </div>
    </footer>
  );
}
