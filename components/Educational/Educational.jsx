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
              Discover fascinating facts about Galle Fort as you play. Answer history questions, earn bonus points, and uncover more about this iconic Sri Lankan landmark.
            </p>
            <p className={styles.body}>
              Learning is woven into the adventure, making every session both fun and rewarding. The more you explore, the more you'll discover about one of Asia's most remarkable UNESCO World Heritage Sites.
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
            <img
              src="images/educational.png"
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
