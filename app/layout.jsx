import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { PlayerGateProvider } from './contexts/PlayerGateContext';

config.autoAddCss = false;

export const metadata = {
  title: {
    default: 'FeatherFly',
    template: '%s | FeatherFly',
  },
  description:
    'FeatherFly is a fun, educational flappy-style adventure game set inside the historic walls of Galle Fort, Sri Lanka. Tap to fly, avoid obstacles, collect puzzle pieces, and discover UNESCO World Heritage history.',
  keywords: [
    'FeatherFly',
    'Galle Fort',
    'Sri Lanka',
    'educational game',
    'flappy game',
    'UNESCO World Heritage',
    'casual game',
    'browser game',
    'mobile game',
    'Kukula game',
    'Miusoft',
    'Imagine Island',
    'Galle Fort history',
  ],
  authors: [{ name: 'Miusoft', url: 'https://miusoftgames.github.io/' }],
  creator: 'Miusoft',
  publisher: 'Imagine Island',
  metadataBase: new URL('https://miusoftgames.github.io/FeatherFly/'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://miusoftgames.github.io/FeatherFly/',
    siteName: 'FeatherFly',
    title: 'FeatherFly — Fly. Learn. Explore Galle Fort.',
    description:
      'A fun + educational flappy-style game set inside the historic walls of Galle Fort, Sri Lanka. Play in your browser or download on Android!',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FeatherFly game preview featuring Galle Fort adventure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FeatherFly — Fly. Learn. Explore Galle Fort.',
    description:
      'A fun + educational flappy-style game set inside the historic walls of Galle Fort, Sri Lanka.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'VideoGame',
      '@id': 'https://miusoftgames.github.io/FeatherFly/#game',
      name: 'FeatherFly',
      url: 'https://miusoftgames.github.io/FeatherFly/',
      description:
        'FeatherFly is a fun, educational flappy-style game set inside the historic walls of Galle Fort, Sri Lanka. Tap to fly, avoid obstacles, collect puzzle pieces, and discover UNESCO World Heritage history.',
      genre: ['Educational', 'Casual', 'Arcade'],
      gamePlatform: ['Web Browser', 'Android'],
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      author: {
        '@type': 'Organization',
        name: 'Miusoft',
        url: 'https://miusoftgames.github.io/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Imagine Island',
      },
      inLanguage: 'en',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://miusoftgames.github.io/FeatherFly/#website',
      url: 'https://miusoftgames.github.io/FeatherFly/',
      name: 'FeatherFly',
      description: 'Official website for FeatherFly - an educational flappy game exploring Galle Fort, Sri Lanka.',
      publisher: {
        '@type': 'Organization',
        name: 'Miusoft',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <PlayerGateProvider>
          {children}
        </PlayerGateProvider>
      </body>
    </html>
  );
}
