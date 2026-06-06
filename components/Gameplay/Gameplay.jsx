import styles from './Gameplay.module.css';

const steps = [
  {
    icon: '👆',
    title: 'Tap to Fly',
    desc: 'Every tap lifts Kukula. Release and gravity does the rest. Simple input, deep challenge.',
  },
  {
    icon: '🏛️',
    title: 'Avoid Obstacles',
    desc: 'Navigate through the iconic archways and walls of Galle Fort without clipping the edges.',
  },
  {
    icon: '🧩',
    title: 'Collect Puzzle Pieces',
    desc: 'Grab hidden pieces scattered through each run to unlock stunning scenes of Galle Fort.',
  },
  {
    icon: '🔓',
    title: 'Unlock New Levels',
    desc: 'Progress through the historic fort, discovering new environments and harder challenges.',
  },
];

export default function Gameplay() {
  return (
    <section className={styles.section} id="gameplay">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>Mechanics</span>
          <h2 className={styles.title}>Simple to Play.<br />Hard to Master.</h2>
          <p className={styles.subtitle}>
            One-touch controls that anyone can learn in seconds —
            but mastering the tight gaps of Galle Fort's ancient archways
            will keep you coming back.
          </p>
        </div>

        <div className={styles.grid}>
          {steps.map((step, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardIcon}>{step.icon}</div>
              <div className={styles.cardNum}>0{i + 1}</div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Decorative tap indicator */}
        <div className={styles.tapDemo}>
          <div className={styles.tapRipple}>
            <div className={styles.tapCenter}>TAP</div>
          </div>
          <p className={styles.tapHint}>Try it — the game is one tap away</p>
        </div>
      </div>
    </section>
  );
}
