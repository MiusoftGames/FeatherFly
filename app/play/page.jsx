import styles from './page.module.css';

export default function PlayPage() {
  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.gameContainer}>
          <iframe
            frameBorder="0"
            src="https://itch.io/embed-upload/17930593?color=ddeaf7"
            allowFullScreen
            width="100%"
            height="100%"
            title="FeatherFly game"
          >
            <a href="https://miusoft.itch.io/featherfly">Play FeatherFly on itch.io</a>
          </iframe>
        </div>
      </div>
    </main>
  );
}