'use client';

import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faFeather } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';
import { GAME_LINK } from '@/lib/config';

const navLinks = [
  { label: 'Gameplay', href: '#gameplay' },
  { label: 'Learn', href: '#educational' },
  { label: 'About Fort', href: '#about-fort' },
  { label: 'Features', href: '#features' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <a href="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoIcon}>
            <FontAwesomeIcon icon={faFeather} />
          </span>
          <span className={styles.logoText}>FeatherFly</span>
        </a>

        {/* Desktop nav */}
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href={ GAME_LINK } target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
          Play Now
        </a>

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
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className={styles.drawerLink} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <a href={ GAME_LINK } target="_blank" rel="noopener noreferrer" className={styles.drawerCta} onClick={closeMenu}>
          Play Now
        </a>
      </div>
    </header>
  );
}
