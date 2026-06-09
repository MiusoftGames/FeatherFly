import Image from 'next/image';
import styles from './Gameplay.module.css';

const steps = [
  {
    icon: '👆',
    num: '01',
    title: 'Tap to Fly',
    desc: 'Every tap lifts Kukula. Release and gravity does the rest. Simple input, deep challenge.',
  },
  {
    icon: '🏛️',
    num: '02',
    title: 'Avoid Obstacles',
    desc: 'Navigate through the iconic archways and walls of Galle Fort without clipping the edges.',
  },
  {
    icon: '🧩',
    num: '03',
    title: 'Collect Puzzle Pieces',
    desc: 'Grab hidden pieces scattered through each run to unlock stunning scenes of Galle Fort.',
  },
  {
    icon: '🔓',
    num: '04',
    title: 'Unlock New Levels',
    desc: 'Progress through the historic fort, discovering new environments and harder challenges.',
  },
];

export default function Gameplay() {
  return (
    <section className={styles.section} id="gameplay">
      <div className="container">
        <div className={styles.layout}>

          {/* Left: image */}
          <div className={styles.imageWrap}>
            <Image
              src="/images/gameplay.png"
              alt="FeatherFly gameplay in action"
              width={520}
              height={560}
              className={styles.img}
            />
          </div>

          {/* Right: content */}
          <div className={styles.content}>
            <span className={styles.tag}>Mechanics</span>
            <h2 className={styles.title}>Simple to Play.<br />Hard to Master.</h2>
            <p className={styles.subtitle}>
              One-touch controls anyone can learn in seconds — but mastering
              the tight gaps of Galle Fort's ancient archways will keep you coming back.
            </p>

            <ul className={styles.steps}>
              {steps.map((step) => (
                <li key={step.num} className={styles.step}>
                  <div className={styles.stepIcon}>{step.icon}</div>
                  <div className={styles.stepBody}>
                    <span className={styles.stepNum}>{step.num}</span>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
