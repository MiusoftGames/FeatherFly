import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFeather,
  faEnvelope,
  faHeart,
  faBook,
  faPalette,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css';

const links = [
  { label: 'Credits', href: '#', icon: faBook },
  { label: 'Contact', href: '#', icon: faEnvelope },
  { label: 'Portfolio', href: '#', icon: faPalette },
];

const socials = [
  { label: 'GitHub', href: '#', icon: faGithub },
  { label: 'Twitter', href: '#', icon: faTwitter },
  { label: 'Instagram', href: '#', icon: faInstagram },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>
                <FontAwesomeIcon icon={faFeather} />
              </span>
              <span className={styles.logoText}>FeatherFly</span>
            </div>
            <p className={styles.brandTagline}>
              A casual game that teaches you something real.
            </p>
            <div className={styles.socialLinks}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} className={styles.socialLink} aria-label={s.label}>
                  <FontAwesomeIcon icon={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className={styles.nav}>
            <span className={styles.navHeading}>Links</span>
            {links.map((l) => (
              <a key={l.label} href={l.href} className={styles.navLink}>
                <FontAwesomeIcon icon={l.icon} className={styles.navLinkIcon} />
                {l.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className={styles.contact}>
            <span className={styles.navHeading}>Contact</span>
            <a href="mailto:miusoft.games@gmail.com" className={styles.contactLink}>
              <FontAwesomeIcon icon={faEnvelope} />
              miusoft.games@gmail.com
            </a>
            <p className={styles.contactNote}>
              Questions, press enquiries, and partnership requests welcome.
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.credit}>
            Made with{' '}
            <FontAwesomeIcon icon={faHeart} className={styles.heart} />{' '}
            by{' '}
            <a href="https://miusoftgames.github.io/" className={styles.creditLink}>Miusoft</a>
          </p>
          <p className={styles.legal}>
            © {new Date().getFullYear()} FeatherFly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
