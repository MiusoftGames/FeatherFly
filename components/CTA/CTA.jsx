import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section className={styles.section} id="cta">
      {/* Background arch decoration */}
      <div className={styles.archDecor} aria-hidden="true">
        <div className={styles.archLeft} />
        <div className={styles.archRight} />
      </div>

      <div className="container">
        <div className={styles.inner}>
          <div className={styles.characterFloat}>🐓</div>

          <span className={styles.tag}>Get Started</span>
          <h2 className={styles.title}>Ready to Fly?</h2>
          <p className={styles.subtitle}>
            Kukula is waiting at the gates of Galle Fort.<br />
            How long can you last?
          </p>

          <div className={styles.buttons}>
            <a href="#" className={styles.btnPrimary}>
              ▶&ensp;Play Now — Free
            </a>
            <a href="#" className={styles.btnSecondary}>
              ↓&ensp;Download on Android
            </a>
          </div>

          <p className={styles.fine}>
            No account needed. No ads. No cost.
          </p>
        </div>
      </div>
    </section>
  );
}
