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
    type: 'video.other',
    videos: [
      {
        url: 'https://masoomstudio.vercel.app/reels/C4-bt1py9fh.mp4',
        secureUrl: 'https://masoomstudio.vercel.app/reels/C4-bt1py9fh.mp4',
        type: 'video/mp4',
        width: 720,
        height: 1280,
      },
    ],
    images: [
      {
        url: 'https://masoomstudio.vercel.app/reels/C4-bt1py9fh.jpg',
        width: 1080,
        height: 1920,
        alt: 'Masoom Studio Wedding Reel Preview',
      },
      {
        url: 'https://masoomstudio.vercel.app/Gallary/LandingPage1.webp',
        width: 1200,
        height: 630,
        alt: 'Masoom Studio Wedding Cinema & Photography',
      },
      {
        url: 'https://masoomstudio.vercel.app/MasoomStudioLogo.png',
        width: 800,
        height: 600,
        alt: 'Masoom Studio — Patna, Bihar',
      },
    ],
  },
  twitter: {
    card: 'player',
    title: 'Masoom Studio — Wedding Photography & Cinematic Films',
    description:
      'Luxury wedding photography and cinematic films across Patna, Bihar and India. Real emotions, vibrant stories.',
    images: [
      'https://masoomstudio.vercel.app/reels/C4-bt1py9fh.jpg',
      'https://masoomstudio.vercel.app/Gallary/LandingPage1.webp',
    ],
    players: {
      playerUrl: 'https://masoomstudio.vercel.app/reels/C4-bt1py9fh.mp4',
      streamUrl: 'https://masoomstudio.vercel.app/reels/C4-bt1py9fh.mp4',
      width: 720,
      height: 1280,
    },
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

        {/* Video Link Preview for Social Media (WhatsApp, Telegram, Discord, Twitter/X, Facebook, iMessage) */}
        <meta property="og:video" content="https://masoomstudio.vercel.app/reels/C4-bt1py9fh.mp4" />
        <meta property="og:video:secure_url" content="https://masoomstudio.vercel.app/reels/C4-bt1py9fh.mp4" />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:width" content="720" />
        <meta property="og:video:height" content="1280" />
        <meta property="og:image" content="https://masoomstudio.vercel.app/reels/C4-bt1py9fh.jpg" />
        <meta property="og:image:secure_url" content="https://masoomstudio.vercel.app/reels/C4-bt1py9fh.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1920" />
        <meta name="twitter:card" content="player" />
        <meta name="twitter:player" content="https://masoomstudio.vercel.app/reels/C4-bt1py9fh.mp4" />
        <meta name="twitter:player:width" content="720" />
        <meta name="twitter:player:height" content="1280" />
        <meta name="twitter:player:stream" content="https://masoomstudio.vercel.app/reels/C4-bt1py9fh.mp4" />
        <meta name="twitter:player:stream:content_type" content="video/mp4" />

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
