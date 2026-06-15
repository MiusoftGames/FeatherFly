import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaintBrush,
  faGamepad,
  faGraduationCap,
  faGlobe,
  faPuzzlePiece,
  faMobile,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Features.module.css';

const features = [
  {
    icon: faPaintBrush,
    title: 'Stylized Visuals',
    desc: 'Stylized 2D art inspired by the real stone walls and golden archways of Galle Fort.',
    color: 'gold',
  },
  {
    icon: faGamepad,
    title: 'Addictive Gameplay',
    desc: 'One-tap mechanics that are instantly familiar but progressively more challenging to master.',
    color: 'sky',
  },
  {
    icon: faGraduationCap,
    title: 'Educational Questions',
    desc: '50+ curated quiz questions about Galle Fort history. Learn without even trying.',
    color: 'grass',
  },
  {
    icon: faGlobe,
    title: 'Web + Android',
    desc: 'Play instantly in your browser with no install, or grab the Android app for offline sessions.',
    color: 'sky',
  },
  {
    icon: faPuzzlePiece,
    title: 'Puzzle Progression',
    desc: 'Collect scattered puzzle pieces to unlock stunning artwork panels of the fort.',
    color: 'gold',
  },
  {
    icon: faMobile,
    title: 'Mobile Optimized',
    desc: 'Designed for thumbs-first play. Smooth on phones, tablets, and desktop browsers alike.',
    color: 'grass',
  },
];

export default function Features() {
  return (
    <section className={styles.section} id="features">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>Features</span>
          <h2 className={styles.title}>Everything You Need<br />to Fly and Learn</h2>
        </div>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <div key={i} className={`${styles.card} ${styles[`card_${f.color}`]}`}>
              <div className={`${styles.iconWrap} ${styles[`icon_${f.color}`]}`}>
                <FontAwesomeIcon icon={f.icon} />
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
