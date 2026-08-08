'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faFeather } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';
import PlayButton from '../PlayButton/PlayButton';

const navLinks = [
  { label: 'Gameplay', hash: '#gameplay' },
  { label: 'Learn', hash: '#educational' },
  { label: 'About Fort', hash: '#about-fort' },
  { label: 'Features', hash: '#features' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/' || pathname === '/FeatherFly' || pathname === '/FeatherFly/';

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoIcon}>
            <FontAwesomeIcon icon={faFeather} />
          </span>
          <span className={styles.logoText}>FeatherFly</span>
        </Link>

        {/* Desktop nav */}
        <nav className={styles.nav}>
          {navLinks.map((link) => {
            const href = isHome ? link.hash : `/${link.hash}`;
            return (
              <Link key={link.hash} href={href} className={styles.navLink}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <PlayButton className={styles.ctaBtn}>
          Play Now
        </PlayButton>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        {navLinks.map((link) => {
          const href = isHome ? link.hash : `/${link.hash}`;
          return (
            <Link key={link.hash} href={href} className={styles.drawerLink} onClick={closeMenu}>
              {link.label}
            </Link>
          );
        })}
        <PlayButton className={styles.drawerCta}>
          Play Now
        </PlayButton>
      </div>
    </header>
  );
}
