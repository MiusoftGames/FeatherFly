import Image from 'next/image';
import styles from './AboutFort.module.css';

const facts = [
  { icon: '📅', label: 'Founded', value: '1588 AD' },
  { icon: '🇱🇰', label: 'Location', value: 'Southern Sri Lanka' },
  { icon: '🏛️', label: 'Status', value: 'UNESCO World Heritage' },
  { icon: '🌊', label: 'Faces', value: 'Indian Ocean' },
];

export default function AboutFort() {
  return (
    <section className={styles.section} id="about-fort">
      <div className="container">
        <div className={styles.layout}>

          {/* Left: image */}
          <div className={styles.imageWrap}>
            <Image
              src="/images/about-fort.png"
              alt="Galle Fort, Sri Lanka"
              width={520}
              height={540}
              className={styles.img}
            />
          </div>

          {/* Right: content */}
          <div className={styles.content}>
            <span className={styles.tag}>The Setting</span>
            <h2 className={styles.title}>
              A Fort Built by Empires,{' '}
              <span className={styles.accent}>Loved by All.</span>
            </h2>
            <p className={styles.body}>
              Galle Fort, on the southwestern tip of Sri Lanka, was first built by
              the Portuguese in 1588 and later fortified by the Dutch East India Company
              in the 17th century. Today it stands as one of the best-preserved examples
              of a fortified city built by Europeans in South and Southeast Asia.
            </p>
            <p className={styles.body}>
              Declared a UNESCO World Heritage Site in 1988, the fort is still a living,
              breathing town — colonial architecture, charming streets, and ocean views
              that make it one of Sri Lanka's most visited destinations.
            </p>

            <div className={styles.factsGrid}>
              {facts.map((f, i) => (
                <div key={i} className={styles.factCard}>
                  <span className={styles.factIcon}>{f.icon}</span>
                  <div>
                    <span className={styles.factLabel}>{f.label}</span>
                    <span className={styles.factValue}>{f.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://whc.unesco.org/en/list/366"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.learnLink}
            >
              Learn more on UNESCO.org →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
