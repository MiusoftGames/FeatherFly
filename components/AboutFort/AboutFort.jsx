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

        {/* Section label */}
        <div className={styles.layout}>
          <div className={styles.content}>
            <span className={styles.tag}>The Setting</span>
            <h2 className={styles.title}>
              A Fort Built<br />
              by Empires,<br />
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
              breathing town — with colonial architecture, charming streets, and ocean
              views that make it one of Sri Lanka's most visited destinations.
            </p>
            <a
              href="https://whc.unesco.org/en/list/366"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.learnLink}
            >
              Learn more on UNESCO.org →
            </a>
          </div>

          {/* Right: Fact cards */}
          <div className={styles.facts}>
            <div className={styles.fortVisual}>
              <div className={styles.fortScene}>
                {/* Stylized fort silhouette */}
                <div className={styles.ocean} />
                <div className={styles.sky} />
                <div className={styles.wall} />
                <div className={styles.tower} />
                <div className={styles.towerTop} />
                <div className={styles.flag}>🏴</div>
                <div className={styles.sunEmoji}>☀️</div>
                <div className={styles.wavesEmoji}>🌊</div>
              </div>
            </div>
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
          </div>
        </div>

      </div>
    </section>
  );
}
