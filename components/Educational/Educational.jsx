import styles from './Educational.module.css';

const quizExamples = [
  { q: 'When was Galle Fort built?', a: '16th century by Portuguese' },
  { q: 'What is it listed as?', a: 'UNESCO World Heritage Site' },
  { q: 'Which ocean does Galle face?', a: 'The Indian Ocean' },
];

export default function Educational() {
  return (
    <section className={styles.section} id="educational">
      <div className="container">
        <div className={styles.layout}>

          {/* Left: Quiz mockup */}
          <div className={styles.mockup}>
            <div className={styles.mockupCard}>
              <div className={styles.mockupHeader}>
                <span className={styles.crashIcon}>💥</span>
                <span className={styles.crashText}>Oh no! You crashed!</span>
              </div>
              <div className={styles.quizBlock}>
                <p className={styles.quizLabel}>📚 Quick Quiz</p>
                <p className={styles.quizQuestion}>
                  "Which colonial power first built the fort at Galle?"
                </p>
                <div className={styles.options}>
                  {['Portuguese', 'British', 'Dutch', 'French'].map((opt, i) => (
                    <button key={i} className={`${styles.option} ${i === 0 ? styles.optionCorrect : ''}`}>
                      {opt}
                      {i === 0 && <span className={styles.correctBadge}>✓</span>}
                    </button>
                  ))}
                </div>
                <p className={styles.quizResult}>
                  Correct! +10 points. Try again?
                </p>
              </div>
              <button className={styles.mockupRetry}>▶ Retry</button>
            </div>

            {/* Floating knowledge pills */}
            {quizExamples.map((item, i) => (
              <div key={i} className={`${styles.floatingPill} ${styles[`pill${i}`]}`}>
                <span className={styles.pillQ}>{item.q}</span>
                <span className={styles.pillA}>{item.a}</span>
              </div>
            ))}
          </div>

          {/* Right: Copy */}
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

        </div>
      </div>
    </section>
  );
}
