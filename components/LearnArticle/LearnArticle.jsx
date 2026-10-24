import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import BackToTop from '@/components/BackToTop/BackToTop';
import PlayButton from '@/components/PlayButton/PlayButton';
import { getImageUrl } from '@/lib/config';
import credits from '@/lib/learnImageCredits.json';
import styles from '@/app/learn/[slug]/page.module.css';

export function learnMetadata(entry, path) {
  if (!entry) return { title: 'Entry Not Found' };
  const photo = credits[entry.imageKey];
  const url = `https://miusoftgames.github.io/FeatherFly/learn/${path}/`;
  const image = `https://miusoftgames.github.io${getImageUrl(photo?.path || entry.image)}`;
  return {
    title: `${entry.name} | Explore Galle Fort Heritage`, description: entry.description,
    alternates: { canonical: url },
    openGraph: { title: entry.name, description: entry.description, url, images: [{ url: image, alt: entry.name }] },
    twitter: { card: 'summary_large_image', title: entry.name, description: entry.description, images: [image] },
  };
}

export default function LearnArticle({ entry }) {
  const photo = credits[entry.imageKey];
  const location = entry.location;
  const mapQuery = location ? encodeURIComponent(location.query) : '';
  const sources = entry.sources || [{ label: 'UNESCO — Old Town of Galle and its Fortifications', url: 'https://whc.unesco.org/en/list/451/' }];
  return <>
    <Header />
    <main className={styles.page}>
      <section className={styles.section}>
        <div className={`container ${styles.articleContainer}`}><Link href="/learn/" className={styles.backLink}><FontAwesomeIcon icon={faArrowLeft} /> Back to Learn</Link></div>
        <div className={`container ${styles.articleContainer} ${styles.layout}`}>
          <figure className={styles.imageWrap}>
            <Image src={getImageUrl(photo?.path || entry.image)} alt={photo ? `${entry.name} — reference photograph` : (entry.imageAlt || `${entry.name} map in FeatherFly`)} width={photo?.width || 700} height={photo?.height || 550} className={styles.img} unoptimized priority />
          </figure>
          <div className={styles.content}>
            <span className={styles.tag}>{entry.tag}</span>
            <h1 className={styles.title}><span className={styles.accent}>{entry.accentTitle}</span> {entry.titleEnd}</h1>
            <p className={styles.body}>{entry.description}</p>
            <div className={styles.factsGrid}>{entry.facts.map(fact => <div className={styles.factCard} key={fact.label}><span className={styles.factIcon} aria-hidden="true">{fact.icon}</span><div><span className={styles.factLabel}>{fact.label}</span><span className={styles.factValue}>{fact.value}</span></div></div>)}</div>
          </div>
        </div>
      </section>
      <section className={styles.historySection}><div className={`container ${styles.articleContainer}`}><div className={styles.historyContent}>
        <span className={styles.tag}>Discover the story</span>
        <h2 className={styles.historyTitle}>About <span className={styles.accent}>{entry.name}</span></h2>
        <p className={styles.historyBody}>{entry.history}</p>
        {entry.lookFor && <><h2 className={styles.subheading}>Look a little closer</h2><p className={styles.historyBody}>{entry.lookFor}</p></>}
        {entry.note && <aside className={styles.note}><strong>About the images</strong><p>{entry.note}</p></aside>}
        {entry.artwork && <section id="puzzle-in-game" className={styles.gamePromo} aria-labelledby="game-promo-title">
          <Image src={getImageUrl(entry.artwork)} alt={entry.imageAlt} width={280} height={220} className={styles.puzzlePreview} unoptimized />
          <div className={styles.promoContent}>
            <span className={styles.tag}>Discover it in FeatherFly</span>
            <h2 id="game-promo-title" className={styles.promoTitle}>Fly through the fort. Piece together its stories.</h2>
            <p className={styles.body}>Explore Galle Fort in FeatherFly. Fly through historic streets, collect puzzle pieces, and complete scenes like this one as you discover the stories behind the landmarks.</p>
            <PlayButton className={styles.promoButton}>Play Now</PlayButton>
          </div>
        </section>}
        {location && <section className={styles.locationSection} aria-labelledby="location-title">
          <span className={styles.tag}>On the map</span>
          <h2 id="location-title" className={styles.subheading}>{location.label}</h2>
          {location.note && <p className={styles.historyBody}>{location.note}</p>}
          <iframe
            title={`Map: ${location.label}`}
            src={`https://www.google.com/maps?q=${mapQuery}&z=${location.zoom}&hl=en&output=embed`}
            width="760" height="380" className={styles.locationMap}
            loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"
          />
          {location.source && <div className={styles.mapLinks}><a href={location.source.url} target="_blank" rel="noopener noreferrer">{location.source.label} ↗</a></div>}
        </section>}
        <h2 className={styles.sourcesHeading}>Sources & further reading</h2>
        <ul className={styles.sources}>{sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul>
        {photo && <p className={styles.caption}>Photo: <a href={photo.source} target="_blank" rel="noopener noreferrer">{photo.author}</a> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">{photo.license}</a></p>}

      </div></div></section>
    </main><Footer /><BackToTop />
  </>;
}
