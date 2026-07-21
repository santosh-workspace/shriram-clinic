'use client';

import { useState } from 'react';
import Image from 'next/image';

const gradients: Record<string, string> = {
  a: 'linear-gradient(135deg,#efeae1 0%,#e4dccf 45%,#d8cbb6 100%)',
  b: 'linear-gradient(160deg,#eae7e0 0%,#d9d3c6 100%)',
  c: 'linear-gradient(135deg,#e9e3d7 0%,#cdbfa6 100%)',
  d: 'linear-gradient(200deg,#f0ece4 0%,#ddd3c2 100%)',
};

/**
 * Drop a real photo at `src` (in /public) and it renders through
 * next/image with AVIF/WebP + lazy loading. If the file is missing it
 * silently falls back to an art-directed placeholder, so layouts read
 * correctly before photography arrives.
 */
export function EditorialImage({
  src,
  alt,
  label,
  tone = 'a',
  priority = false,
  className = '',
  sizes = '100vw',
}: {
  src?: string;
  alt: string;
  label?: string;
  tone?: 'a' | 'b' | 'c' | 'd';
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showPhoto = src && !failed;

  return (
    <div className={`group relative h-full w-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 transition-transform duration-[1.2s] ease-editorial group-hover:scale-[1.06]">
        {showPhoto ? (
          <Image
            src={src as string}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div
            className="flex h-full w-full items-end p-6"
            style={{ background: gradients[tone] }}
            role="img"
            aria-label={alt}
          >
            <span className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-ink/45">
              {label ?? 'Photography'}
            </span>
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gold/0 transition-colors duration-700 ease-editorial group-hover:bg-gold/[0.06]" />
    </div>
  );
}
