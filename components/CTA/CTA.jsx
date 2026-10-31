import styles from './CTA.module.css';
import { GAME_LINK_ANDROID } from '@/lib/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import PlayButton from '../PlayButton/PlayButton';

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
          <div className={styles.characterFloat}>◈</div>

          <span className={styles.tag}>Get Started</span>
          <h2 className={styles.title}>Ready to Fly?</h2>
          <p className={styles.subtitle}>
            Kukula and Mayura are waiting at the gates of Galle Fort.
            How far can you go?
          </p>

          <div className={styles.buttons}>
            <PlayButton className={styles.btnPrimary}>
               &ensp;Play in Browser
            </PlayButton>
            <a href={GAME_LINK_ANDROID} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
              <FontAwesomeIcon icon={faGooglePlay} /> &ensp;Google Play
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
