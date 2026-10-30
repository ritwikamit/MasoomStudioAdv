import type {Metadata} from 'next';
import {Cormorant_Garamond, Plus_Jakarta_Sans, Great_Vibes} from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Masoom Studio — Wedding Photography & Cinematic Films',
  description:
    'Official portfolio of Masoom Studio. Luxury wedding photography, cinematic films, pre-wedding stories, and grand celebrations based in Patna, Bihar & across India.',
  metadataBase: new URL('https://masoomstudio.vercel.app'),
  icons: {
    icon: '/MasoomStudioLogo.png',
    shortcut: '/MasoomStudioLogo.png',
    apple: '/MasoomStudioLogo.png',
  },
  openGraph: {
    title: 'Masoom Studio — Wedding Photography & Cinematic Films',
    description:
      'Official portfolio of Masoom Studio. Luxury wedding photography, cinematic films, pre-wedding stories, and grand celebrations based in Patna, Bihar & across India.',
    url: 'https://masoomstudio.vercel.app',
    siteName: 'Masoom Studio',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/MasoomStudioLogo.png',
        width: 800,
        height: 600,
        alt: 'Masoom Studio — Patna, Bihar',
      },
      {
        url: '/Gallary/LandingPage1.jpg',
        width: 1200,
        height: 630,
        alt: 'Masoom Studio Wedding Cinema',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masoom Studio — Wedding Photography & Cinematic Films',
    description:
      'Luxury wedding photography and cinematic films across Patna, Bihar and India. Real emotions, vibrant stories.',
    images: ['/MasoomStudioLogo.png', '/Gallary/LandingPage1.jpg'],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Masoom Studio',
    image: 'https://masoomstudio.vercel.app/MasoomStudioLogo.png',
    description:
      'Luxury wedding photography, cinematic films, pre-wedding stories, and grand celebrations based in Patna, Bihar & across India.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pillar No. 42, Pandey Palace, Bailey Road',
      addressLocality: 'Patna',
      addressRegion: 'Bihar',
      postalCode: '800004',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.6063075',
      longitude: '85.0820087',
    },
    telephone: '+91-7488458213',
    url: 'https://masoomstudio.vercel.app',
    priceRange: '₹₹₹',
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${greatVibes.variable}`}
    >
      <head>
        <link rel="icon" type="image/png" href="/MasoomStudioLogo.png" />
        <link rel="shortcut icon" type="image/png" href="/MasoomStudioLogo.png" />
        <link rel="apple-touch-icon" href="/MasoomStudioLogo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-black text-[#0f0f0e] font-sans antialiased selection:bg-[#ff3333]/20 selection:text-[#0f0f0e]"
      >
        {children}
      </body>
    </html>
  );
}

