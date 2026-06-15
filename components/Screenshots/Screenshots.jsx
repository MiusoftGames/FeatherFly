import Image from 'next/image';
import styles from './Screenshots.module.css';

const shots = [
  {
    label: 'Main Menu',
    desc: 'The golden arch greets you on launch. Pick your character and dive straight in.',
    img: 'images/screen-menu.png',
  },
  {
    label: 'Mid-Flight Gameplay',
    desc: "Tight gaps, smooth controls. Every pixel of Galle Fort's walls is an obstacle waiting.",
    img: 'images/screen-gameplay.png',
  },
  {
    label: 'Quiz on Crash',
    desc: 'Crash? No problem. Answer a quick question about Galle Fort and earn bonus points.',
    img: 'images/screen-quiz.png',
  },
  {
    label: 'Puzzle Unlock',
    desc: 'Collect pieces through every run and piece together stunning scenes of the fort.',
    img: 'images/screen-puzzle.png',
  },
];

export default function Screenshots() {
  return (
    <section className={styles.section} id="screenshots">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>Screenshots</span>
          <h2 className={styles.title}>A Peek Inside the Fort</h2>
        </div>

        <div className={styles.grid}>
          {shots.map((s, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.imgWrap}>
                <img
                  src={s.img}
                  alt={s.label}
                  width={320}
                  height={620}
                  className={styles.img}
                />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardNum}>0{i + 1}</span>
                <h3 className={styles.cardLabel}>{s.label}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}