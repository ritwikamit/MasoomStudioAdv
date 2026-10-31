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
  title: 'Masoom Studio | Wedding Photography & Cinematic Films',
  description:
    'Official portfolio of Masoom Studio. Luxury wedding photography, cinematic films, pre-wedding stories, and grand celebrations based in Patna, Bihar and across India.',
  metadataBase: new URL('https://masoomstudio.vercel.app'),
  alternates: {
    canonical: 'https://masoomstudio.vercel.app',
  },
  icons: {
    icon: [
      { url: '/MasoomStudioLogo.png', sizes: 'any' },
      { url: '/MasoomStudioLogo.webp', type: 'image/webp' },
    ],
    shortcut: '/MasoomStudioLogo.png',
    apple: '/MasoomStudioLogo.png',
  },
  openGraph: {
    title: 'Masoom Studio | Wedding Photography & Cinematic Films',
    description:
      'Official portfolio of Masoom Studio. Luxury wedding photography, cinematic films, pre-wedding stories, and grand celebrations based in Patna, Bihar and across India.',
    url: 'https://masoomstudio.vercel.app',
    siteName: 'Masoom Studio',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://masoomstudio.vercel.app/og-image.jpg',
        secureUrl: 'https://masoomstudio.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Masoom Studio Wedding Cinema & Photography',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masoom Studio | Wedding Photography & Cinematic Films',
    description:
      'Official portfolio of Masoom Studio. Luxury wedding photography, cinematic films, pre-wedding stories, and grand celebrations based in Patna, Bihar and across India.',
    images: ['https://masoomstudio.vercel.app/og-image.jpg'],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Masoom Studio',
    image: 'https://masoomstudio.vercel.app/MasoomStudioLogo.png',
    description:
      'Luxury wedding photography, cinematic films, pre-wedding stories, and grand celebrations based in Patna, Bihar and across India.',
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
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="/MasoomStudioLogo.png" />
        <link rel="shortcut icon" type="image/png" href="/MasoomStudioLogo.png" />
        <link rel="apple-touch-icon" href="/MasoomStudioLogo.png" />

        {/* Universal Social Media Link Preview Tags (WhatsApp, Facebook, Twitter, iMessage, LinkedIn, Telegram) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Masoom Studio" />
        <meta property="og:title" content="Masoom Studio | Wedding Photography &amp; Cinematic Films" />
        <meta property="og:description" content="Official portfolio of Masoom Studio. Luxury wedding photography, cinematic films, pre-wedding stories, and grand celebrations based in Patna, Bihar and across India." />
        <meta property="og:url" content="https://masoomstudio.vercel.app" />
        <meta property="og:image" content="https://masoomstudio.vercel.app/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://masoomstudio.vercel.app/og-image.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Masoom Studio Wedding Cinema &amp; Photography" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Masoom Studio | Wedding Photography &amp; Cinematic Films" />
        <meta name="twitter:description" content="Luxury wedding photography and cinematic films across Patna, Bihar and India. Real emotions, vibrant stories." />
        <meta name="twitter:image" content="https://masoomstudio.vercel.app/og-image.jpg" />
        <meta name="twitter:image:alt" content="Masoom Studio Wedding Cinema &amp; Photography" />

        <link rel="image_src" href="https://masoomstudio.vercel.app/og-image.jpg" />
        <meta itemprop="name" content="Masoom Studio | Wedding Photography &amp; Cinematic Films" />
        <meta itemprop="description" content="Official portfolio of Masoom Studio. Luxury wedding photography, cinematic films, pre-wedding stories, and grand celebrations based in Patna, Bihar and across India." />
        <meta itemprop="image" content="https://masoomstudio.vercel.app/og-image.jpg" />

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
