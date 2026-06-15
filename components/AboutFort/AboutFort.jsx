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
            <img
              src="images/about-fort.png"
              alt="Galle Fort, Sri Lanka"
              width={520}
              height={540}
              className={styles.img}
            />
          </div>

          {/* Right: content */}
          <div className={styles.content}>
            <span className={styles.tag}>About</span>
            <h2 className={styles.title}>
              A Fort Built by Empires,{' '}
              <span className={styles.accent}>Loved by All.</span>
            </h2>
            <p className={styles.body}>
              Galle Fort was first built by the Portuguese in 1588 and later expanded by the Dutch in the 17th century. It remains one of the best-preserved fortified cities in Asia.
            </p>
            <p className={styles.body}>
              Recognized as a UNESCO World Heritage Site, Galle Fort is known for its historic architecture, vibrant streets, and stunning ocean views.
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
              href="https://whc.unesco.org/en/list/451"
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
