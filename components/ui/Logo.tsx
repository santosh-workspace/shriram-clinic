'use client';

import { useState, useRef, useEffect } from 'react';
import { site } from '@/lib/site';

/**
 * Brand lockup. Renders the real clinic emblem from /images/logo.png
 * (drop a transparent PNG there). If it's missing, it falls back to a
 * recreated SVG mark so the header never shows a broken image.
 */
export function Logo({
  className = '',
  tone = 'ink',
  withWordmark = true,
}: {
  className?: string;
  tone?: 'ink' | 'gold' | 'brand' | 'inverse';
  withWordmark?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const stroke = tone === 'inverse' ? '#F8F7F4' : tone === 'gold' ? '#B89065' : 'currentColor';

  // Catch a 404 that fired before hydration (React can't replay that error event).
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <span className={`inline-flex items-center gap-3 ${className}`} aria-hidden="true">
      {failed ? (
        <svg viewBox="0 0 64 64" width="38" height="38" fill="none" className="shrink-0">
          <path d="M52 40a22 22 0 1 0-40 0" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          <path
            d="M14 46c6 3 12 4 18 4s12-1 18-4"
            stroke={stroke}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path d="M32 18v14M25 25h14" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        </svg>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src="/images/logo.webp"
          alt="ShriRam Clinic"
          width={523}
          height={418}
          className="h-11 w-auto shrink-0 object-contain"
          onError={() => setFailed(true)}
        />
      )}
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className="font-display text-[1.05rem] tracking-tight"
            style={{ color: tone === 'inverse' ? '#F8F7F4' : undefined }}
          >
            ShriRam
          </span>
          <span
            className="mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.24em]"
            style={{ color: tone === 'inverse' ? 'rgba(248,247,244,.6)' : 'var(--muted)' }}
          >
            Clinic · {site.locality}
          </span>
        </span>
      )}
    </span>
  );
}
