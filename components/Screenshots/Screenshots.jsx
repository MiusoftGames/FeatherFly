import styles from './Screenshots.module.css';

const screenshots = [
  {
    label: 'Main Menu',
    emoji: '🏛️',
    bg: 'linear-gradient(145deg, #87CEEB 0%, #B8DFF0 100%)',
    desc: 'Golden arch menu with character preview',
  },
  {
    label: 'Gameplay',
    emoji: '🐓',
    bg: 'linear-gradient(145deg, #5aac49 0%, #3A7A2E 100%)',
    desc: 'Dodge fort walls at full speed',
  },
  {
    label: 'Quiz Screen',
    emoji: '📚',
    bg: 'linear-gradient(145deg, #E8B84B 0%, #C8922A 100%)',
    desc: 'Test your knowledge on crash',
  },
  {
    label: 'Puzzle Unlock',
    emoji: '🧩',
    bg: 'linear-gradient(145deg, #D6EFF8 0%, #87CEEB 100%)',
    desc: 'Piece together Galle Fort artwork',
  },
  {
    label: 'Fort Journal',
    emoji: '📖',
    bg: 'linear-gradient(145deg, #F4F1EC 0%, #C8C0B0 100%)',
    desc: 'Your collected facts and history',
  },
  {
    label: 'Leaderboard',
    emoji: '🏆',
    bg: 'linear-gradient(145deg, #FDF6E3 0%, #E8B84B 100%)',
    desc: 'Compete with other explorers',
  },
];

export default function Screenshots() {
  return (
    <section className={styles.section} id="screenshots">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>Screenshots</span>
          <h2 className={styles.title}>A Peek Inside the Fort</h2>
          <p className={styles.subtitle}>
            Stylized 2D visuals that bring Galle Fort's history to life.
          </p>
        </div>

        <div className={styles.grid}>
          {screenshots.map((s, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.screen} style={{ background: s.bg }}>
                {/* Mock phone frame */}
                <div className={styles.phoneBrow} />
                <div className={styles.screenContent}>
                  <div className={styles.screenEmoji}>{s.emoji}</div>
                  <div className={styles.screenLabel}>{s.label}</div>
                </div>
                {/* Mock score bar */}
                <div className={styles.scoreBar}>
                  <span>🏆 Score: {Math.floor(Math.random() * 80 + 10)}</span>
                </div>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardLabel}>{s.label}</span>
                <span className={styles.cardDesc}>{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
