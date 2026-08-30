import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, Instrument_Serif, Tiro_Devanagari_Marathi, Mukta } from 'next/font/google';
import './globals.css';
import { site, faqs, doctors, reviews, services } from '@/lib/site';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Devanagari faces — appended to the font stacks so Marathi glyphs render
// in a proper typeface while Latin stays on Fraunces / Inter.
const displayMr = Tiro_Devanagari_Marathi({
  subsets: ['devanagari'],
  variable: '--font-display-mr',
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

const sansMr = Mukta({
  subsets: ['devanagari'],
  variable: '--font-sans-mr',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#F8F7F4',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — General Physician in ${site.locality}, ${site.city}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  manifest: '/manifest.webmanifest',
  category: 'healthcare',
  authors: [{ name: 'Dr. Vikas Bade', url: site.url }],
  creator: site.name,
  keywords: [
    'General Physician in Alandi',
    'General Physician in Pune',
    'clinic in Alandi Pune',
    'family doctor Alandi',
    'family physician near me',
    'best doctor in Alandi Pune',
    'diabetes management Alandi',
    'hypertension care Pune',
    'child and family medicine Alandi',
    'vaccination clinic Alandi',
    'ShriRam Clinic',
    'Dr. Vikas Bade',
  ],
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/',
      mr: '/',
    },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/images/logo.png', sizes: '523x418' }],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Healthcare with compassion`,
    description: site.description,
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 800,
        alt: `${site.name} — Alandi, Pune`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — General Physician in ${site.locality}`,
    description: site.description,
    images: ['/images/hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  // Optional: uncomment once you have verified the site in Google Search Console.
  // verification: {
  //   google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
  // },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['MedicalBusiness', 'LocalBusiness', 'Physician'],
      '@id': `${site.url}#clinic`,
      name: site.name,
      description: site.description,
      url: site.url,
      telephone: site.phoneDisplay,
      email: site.email,
      medicalSpecialty: 'GeneralPractice',
      priceRange: '₹₹',
      image: `${site.url}/images/doctor.png`,
      logo: `${site.url}/images/logo.png`,
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, UPI, Credit Card',
      availableLanguage: ['English', 'Marathi', 'Hindi'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.streetAddress,
        addressLocality: site.locality,
        addressRegion: site.region,
        postalCode: site.postalCode,
        addressCountry: site.country,
      },
      geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
      areaServed: ['Alandi', 'Moshi', 'Chakan', 'Dighi', 'Bhosari'],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '21:30',
        },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '09:00', closes: '12:30' },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: reviews.rating,
        reviewCount: reviews.count.replace(/\D/g, ''),
      },
      sameAs: [site.social.instagram, site.social.facebook].filter((u) => u && u !== '#'),
      employee: doctors.map((d) => ({
        '@type': 'Physician',
        name: d.name,
        medicalSpecialty: 'GeneralPractice',
      })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Medical services',
        itemListElement: services.map((s, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: { '@type': 'Service', name: s.title, description: s.body },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: ['en-IN', 'mr'],
      publisher: { '@id': `${site.url}#clinic` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${site.url}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: site.url }],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${sans.variable} ${displayMr.variable} ${sansMr.variable}`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning on <html> and <body>: browser extensions
          (Grammarly, QuillBot, etc.) inject attributes onto these elements
          before hydration. This ignores only those one-level attribute diffs,
          never genuine mismatches deeper in the tree. */}
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
      </body>
    </html>
  );
}
