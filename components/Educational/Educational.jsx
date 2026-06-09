import Image from 'next/image';
import styles from './Educational.module.css';

export default function Educational() {
  return (
    <section className={styles.section} id="educational">
      <div className="container">
        <div className={styles.layout}>

          {/* Left: content — image is on the RIGHT this time */}
          <div className={styles.content}>
            <span className={styles.tag}>Education</span>
            <h2 className={styles.title}>Learn While You Play</h2>
            <p className={styles.body}>
              Every crash unlocks a question about Galle Fort's rich history.
              Answer correctly, earn bonus points, and retry with a little more
              knowledge in your pocket.
            </p>
            <p className={styles.body}>
              It never feels like a lesson — it feels like a reward.
              The more you play, the more you discover about one of Asia's
              most remarkable UNESCO World Heritage Sites.
            </p>

            <ul className={styles.highlights}>
              <li className={styles.highlight}>
                <span className={styles.highlightIcon}>🎯</span>
                <div>
                  <strong>Quiz on crash</strong>
                  <span>No punishment, just curiosity sparked</span>
                </div>
              </li>
              <li className={styles.highlight}>
                <span className={styles.highlightIcon}>📖</span>
                <div>
                  <strong>50+ unique facts</strong>
                  <span>Curated history about Galle Fort</span>
                </div>
              </li>
              <li className={styles.highlight}>
                <span className={styles.highlightIcon}>🏆</span>
                <div>
                  <strong>Bonus scoring</strong>
                  <span>Right answers add to your high score</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: image */}
          <div className={styles.imageWrap}>
            <Image
              src="/images/educational.png"
              alt="FeatherFly quiz screen after crash"
              width={520}
              height={560}
              className={styles.img}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
