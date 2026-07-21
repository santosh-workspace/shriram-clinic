'use client';

import { site } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';
import { RevealText } from '@/components/ui/RevealText';

const landmarks = ['Near Alandi Devasthan', 'Alandi–Markal Road', 'Moshi · Dighi · Chakan nearby'];

export function Location() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${site.name}, ${site.locality}, ${site.city}, ${site.region}`,
  )}&z=14&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${site.name}, ${site.locality}, ${site.city}`,
  )}`;

  return (
    <section id="location" className="relative bg-surface py-28 md:py-40">
      <div className="shell">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow mb-6">Visit us</p>
            </Reveal>
            <RevealText as="h2" className="max-w-[14ch] font-display text-display-sm text-ink">
              Find us in the heart of Alandi.
            </RevealText>
          </div>
          <Reveal delay={0.1}>
            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="link-underline text-sm text-ink"
            >
              Get directions &rarr;
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-y-10 md:gap-x-12">
          <Reveal variant="clip" className="col-span-12 md:col-span-7">
            <div className="aspect-[16/11] w-full overflow-hidden rounded-sm border border-line">
              <iframe
                src={mapSrc}
                title={`Map to ${site.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale-[0.2]"
              />
            </div>
          </Reveal>

          <div className="col-span-12 flex flex-col gap-8 md:col-span-4 md:col-start-9">
            <Reveal>
              <div>
                <p className="text-caption uppercase tracking-wider text-muted">Address</p>
                <p className="mt-2 text-lg leading-relaxed text-ink">
                  {site.name}, {site.streetAddress}
                  <br />
                  {site.city}, {site.region} {site.postalCode}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                <p className="text-caption uppercase tracking-wider text-muted">Hours</p>
                <ul className="mt-2 space-y-1.5">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4 text-ink">
                      <span className="text-muted">{h.day}</span>
                      <span className="text-right">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="text-caption uppercase tracking-wider text-muted">Nearby</p>
                <ul className="mt-2 space-y-1.5 text-ink">
                  {landmarks.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-col gap-1 border-t border-line pt-6">
                <a href={`tel:${site.phoneHref}`} data-cursor="link" className="link-underline text-lg text-ink">
                  {site.phoneDisplay}
                </a>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="link-underline w-fit text-ink/80"
                >
                  WhatsApp
                </a>
                <a href={`mailto:${site.email}`} data-cursor="link" className="link-underline w-fit text-muted">
                  {site.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
