import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.topRow}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>
                <FontAwesomeIcon icon={faFeather} />
              </span>
              <span className={styles.logoText}>FeatherFly</span>
            </div>
            <p className={styles.tagline}>
              A fun & educational flappy-style adventure exploring the rich history of Galle Fort, Sri Lanka.
            </p>
          </div>

          <div className={styles.navLinks}>
            <Link href="/#gameplay" className={styles.navLink}>Gameplay</Link>
            <Link href="/#educational" className={styles.navLink}>Learn</Link>
            <Link href="/#about-fort" className={styles.navLink}>About Fort</Link>
            <Link href="/privacy-policy" className={styles.navLink}>Privacy Policy</Link>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.credit}>
            A game by <a href="https://www.instagram.com/island.imagine/" className={styles.creditLink} target="_blank" rel="noopener noreferrer">Imagine Island</a> • Developed by{' '}
            <a href="https://miusoftgames.github.io/" className={styles.creditLink} target="_blank" rel="noopener noreferrer">
              Miusoft
            </a>
          </p>
          <p className={styles.legal}>
            © {new Date().getFullYear()} FeatherFly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
