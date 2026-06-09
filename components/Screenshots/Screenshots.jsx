import Image from 'next/image';
import styles from './Screenshots.module.css';

const shots = [
  {
    label: 'Main Menu',
    desc: 'The golden arch greets you on launch — pick your character and dive straight in.',
    img: '/images/screen-menu.png',
  },
  {
    label: 'Mid-Flight Gameplay',
    desc: "Tight gaps, smooth controls. Every pixel of Galle Fort's walls is an obstacle waiting.",
    img: '/images/screen-gameplay.png',
  },
  {
    label: 'Quiz on Crash',
    desc: 'Crash? No problem. Answer a quick question about Galle Fort and earn bonus points.',
    img: '/images/screen-quiz.png',
  },
  {
    label: 'Puzzle Unlock',
    desc: 'Collect pieces through every run and piece together stunning scenes of the fort.',
    img: '/images/screen-puzzle.png',
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

        <div className={styles.rows}>
          {shots.map((s, i) => (
            <div
              key={i}
              className={`${styles.row} ${i % 2 === 1 ? styles.rowReverse : ''}`}
            >
              <div className={styles.imgWrap}>
                <Image
                  src={s.img}
                  alt={s.label}
                  width={540}
                  height={380}
                  className={styles.img}
                />
              </div>
              <div className={styles.rowContent}>
                <span className={styles.rowNum}>0{i + 1}</span>
                <h3 className={styles.rowLabel}>{s.label}</h3>
                <p className={styles.rowDesc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
