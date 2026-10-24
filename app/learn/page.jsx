import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { learnCatalog } from '@/lib/learnCatalog';
import { journalGroups } from '@/lib/journalOrder';
import { getImageUrl } from '@/lib/config';
import styles from './[slug]/page.module.css';

export const metadata = {
  title: 'Fort Journal | Learn about Galle Fort',
  description: 'Explore the streets, puzzle stories and creative places from the FeatherFly Fort Journal.',
  alternates: { canonical: 'https://miusoftgames.github.io/FeatherFly/learn/' },
};

export default function LearnIndex() {
  return <><Header /><main className={styles.catalog}>
    <div className="container">
      <span className={styles.tag}>FeatherFly · Learn</span>
      <div className={styles.journalHeading}>
        <Image src={getImageUrl('/images/learn/journal-book.png')} alt="" width={144} height={192} className={styles.journalBook} unoptimized priority />
        <div className={styles.journalIntro}>
          <h1 className={styles.title}>Your <span className={styles.accent}>Fort Journal</span></h1>
          <p className={styles.body}>Explore alongside your in-game Fort Journal. Find more details about Galle’s creative spaces, historic streets, and the stories behind each puzzle.</p>
          <nav className={styles.groupNav} aria-label="Journal sections">
            {journalGroups.map(group => <a key={group.id} href={`#${group.id}`}>{group.name} ↓</a>)}
          </nav>
        </div>
      </div>
      {journalGroups.map(group => <section className={styles.catalogSection} id={group.id} key={group.id}>
        <h2 className={styles.historyTitle}>{group.name}</h2>
        <div className={styles.cardGrid}>
          {group.cards.map((card, index) => {
            const entry = learnCatalog[card.path];
            return <Link href={`/learn/${card.path}/`} className={styles.entryCard} key={`${card.path}-${index}`}>
              <Image src={getImageUrl(card.image || entry.image)} alt="" width={320} height={240} unoptimized className={styles.cardImage} />
              <h3 className={styles.cardTitle}>{card.title || entry.name}</h3>
            </Link>;
          })}
        </div>
      </section>)}
    </div>
  </main><Footer /></>;
}
