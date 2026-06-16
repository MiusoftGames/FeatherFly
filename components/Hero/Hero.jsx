import Image from 'next/image';
import styles from './Hero.module.css';
import { GAME_LINK } from '@/lib/config';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.skyBg} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* Left: text */}
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Free to Play · Web &amp; Android
          </div>

          <h1 className={styles.headline}>
            Fly. Fail. Learn.<br />
            <span className={styles.headlineAccent}>Explore Galle Fort.</span>
          </h1>

          <p className={styles.subtext}>
            Join Kukula and Mayura on an adventure through Galle Fort.
            Inspired by Flappy Bird and Braid, it brings together fun gameplay and educational discovery.
          </p>

          <div className={styles.buttons}>
            <a href={GAME_LINK} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>▶&ensp;Play in Browser</a>
            {/*  <a href="#" className={styles.btnSecondary}>↓&ensp;Get on Android</a> */}
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

        {/* Right: image */}
        <div className={styles.imageWrap}>
          <img
            src="images/hero.png"
            alt="FeatherFly gameplay preview"
            width={520}
            height={560}
            className={styles.heroImg}
          />
        </div>
      </div>
    </section>
  );
}
