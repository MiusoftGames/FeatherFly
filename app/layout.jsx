import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export const metadata = {
  title: 'FeatherFly',
  description:
    'FeatherFly is a fun, educational flappy-style game set in Galle Fort, Sri Lanka. Tap to fly, avoid obstacles, collect puzzle pieces, and discover the history of a UNESCO World Heritage Site.',
  keywords: [
    'FeatherFly', 'Galle Fort', 'casual game', 'educational game',
    'flappy game', 'Sri Lanka', 'mobile game', 'browser game',
  ],
  authors: [{ name: 'Yoo Game Art' }],
  creator: 'Yoo Game Art',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://featherfly.game',
    siteName: 'FeatherFly',
    title: 'FeatherFly — Fly. Learn. Explore Galle Fort.',
    description:
      'A fun + educational flappy-style game set inside the historic walls of Galle Fort, Sri Lanka.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FeatherFly game preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FeatherFly — Fly. Learn. Explore Galle Fort.',
    description: 'A fun + educational flappy-style game. Play in browser or download on Android.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://featherfly.game'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
