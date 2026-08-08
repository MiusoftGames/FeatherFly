'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

const footerNavLinks = [
  { label: 'Gameplay', hash: '#gameplay' },
  { label: 'Learn', hash: '#educational' },
  { label: 'About Fort', hash: '#about-fort' },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/FeatherFly' || pathname === '/FeatherFly/';

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.topRow}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>
                <FontAwesomeIcon icon={faFeather} />
              </span>
              <span className={styles.logoText}>FeatherFly</span>
            </Link>
            <p className={styles.tagline}>
              A fun & educational flappy-style adventure exploring the rich history of Galle Fort, Sri Lanka.
            </p>
          </div>

          <div className={styles.navLinks}>
            {footerNavLinks.map((link) => {
              const href = isHome ? link.hash : `/${link.hash}`;
              return (
                <Link key={link.hash} href={href} className={styles.navLink}>
                  {link.label}
                </Link>
              );
            })}
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
