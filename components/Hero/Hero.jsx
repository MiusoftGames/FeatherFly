import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* Sky + stone texture background */}
      <div className={styles.skyBg} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* Left: text */}
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Free to Play · Web &amp; Android
          </div>

          <h1 className={styles.headline}>
            Fly. Learn.<br />
            <span className={styles.headlineAccent}>Explore Galle Fort.</span>
          </h1>

          <p className={styles.subtext}>
            Navigate Kukula the rooster through the historic archways of
            Galle Fort — a UNESCO World Heritage Site in Sri Lanka.
            A flappy-style game that's as educational as it is addictive.
          </p>

          <div className={styles.buttons}>
            <a href="#" className={styles.btnPrimary}>
              ▶&ensp;Play in Browser
            </a>
            <a href="#" className={styles.btnSecondary}>
              ↓&ensp;Get on Android
            </a>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>50+</span>
              <span className={styles.statLabel}>Quiz questions</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>Free</span>
              <span className={styles.statLabel}>No ads, no cost</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>Web</span>
              <span className={styles.statLabel}>Play anywhere</span>
            </div>
          </div>
        </div>

        {/* Right: game mockup arch */}
        <div className={styles.visual}>
          <div className={styles.arch}>
            {/* Arch columns */}
            <div className={`${styles.column} ${styles.columnLeft}`} />
            <div className={`${styles.column} ${styles.columnRight}`} />

            {/* Arch frame top */}
            <div className={styles.archTop} />

            {/* Sky window */}
            <div className={styles.archWindow}>
              <div className={styles.archSky}>
                {/* Floating clouds */}
                <div className={`${styles.cloud} ${styles.cloud1}`} />
                <div className={`${styles.cloud} ${styles.cloud2}`} />

                {/* Score pill */}
                <div className={styles.scorePill}>
                  🏆 Score: 29
                </div>

                {/* Character Kukula */}
                <div className={styles.character} aria-label="Kukula the rooster">
                  🐓
                </div>

                {/* Obstacles (pipes) */}
                <div className={`${styles.obstacle} ${styles.obstacleTop}`} />
                <div className={`${styles.obstacle} ${styles.obstacleBottom}`} />
              </div>
            </div>

            {/* Arch base */}
            <div className={styles.archBase}>
              <div className={styles.grassStrip} />
            </div>

            {/* Name plate */}
            <div className={styles.namePlate}>
              ◀ Kukula ▶
            </div>
          </div>

          {/* Floating flowers */}
          <div className={`${styles.flowerAccent} ${styles.flowerLeft}`}>🌸</div>
          <div className={`${styles.flowerAccent} ${styles.flowerRight}`}>🌸</div>
        </div>
      </div>

      {/* Wave divider */}
      <div className={styles.waveDivider} aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="var(--color-off-white)"
          />
        </svg>
      </div>
    </section>
  );
}
