import ResultsClient from './ResultsClient';

export const metadata = {
  title: 'Game Results & Achievement Certificate',
  description:
    'View your FeatherFly high scores, unlocked Galle Fort street cards, and download your customized player memory certificate.',
  alternates: {
    canonical: '/results',
  },
  openGraph: {
    title: 'Game Results & Achievement Certificate | FeatherFly',
    description:
      'View high scores and download your customized Galle Fort adventure player memory card.',
    url: 'https://miusoftgames.github.io/FeatherFly/results',
  },
  twitter: {
    title: 'Game Results & Achievement Certificate | FeatherFly',
    description:
      'View high scores and download your customized Galle Fort adventure player memory card.',
  },
};

export default function ResultsPage() {
  return <ResultsClient />;
}
