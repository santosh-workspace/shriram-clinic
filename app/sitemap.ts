import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// Fixed reference date so the sitemap stays stable between builds and doesn't
// trigger unnecessary re-crawls. Update this when content changes meaningfully.
const LAST_MODIFIED = new Date('2026-01-01');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
