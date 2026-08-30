import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'ShriRam Clinic',
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F7F4',
    theme_color: '#F8F7F4',
    lang: 'en-IN',
    categories: ['medical', 'health', 'business'],
    icons: [
      { src: '/images/logo.png', sizes: '523x418', type: 'image/png' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
