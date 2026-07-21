import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { site, faqs, doctors } from '@/lib/site';

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

export const viewport: Viewport = {
  themeColor: '#F8F7F4',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — General Physician in ${site.locality}, ${site.city}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    'General Physician in Alandi',
    'clinic in Alandi Pune',
    'family doctor Alandi',
    'diabetes hypertension care Pune',
    'ShriRam Clinic',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Healthcare with compassion`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — General Physician in ${site.locality}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
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
      employee: doctors.map((d) => ({
        '@type': 'Physician',
        name: d.name,
        medicalSpecialty: 'GeneralPractice',
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${sans.variable}`}
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
