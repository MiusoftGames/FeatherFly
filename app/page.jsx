import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Gameplay from '@/components/Gameplay/Gameplay';
import Educational from '@/components/Educational/Educational';
import AboutFort from '@/components/AboutFort/AboutFort';
import Features from '@/components/Features/Features';
import Screenshots from '@/components/Screenshots/Screenshots';
import CTA from '@/components/CTA/CTA';
import Footer from '@/components/Footer/Footer';
import BackToTop from '@/components/BackToTop/BackToTop';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Gameplay />
        <Educational />
        <AboutFort />
        <Features />
        <Screenshots />
        <CTA />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
