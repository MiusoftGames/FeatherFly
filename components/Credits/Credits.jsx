import styles from './Credits.module.css';

export default function Credits() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.grid}>
                    <a href="https://www.instagram.com/island.imagine/" target="_blank" rel="noopener noreferrer" className={styles.card}>
                        <img
                            src="images/imagineisland.jpg"
                            alt="Imagine Island"
                            className={styles.logo}
                        />
                        <div className={styles.devInfo}>
                            <p className={styles.label}>A Game by</p>
                            <h3 className={styles.devName}>Imagine Island</h3>
                        </div>
                    </a>

                    <div className={styles.divider} aria-hidden="true" />

                    <a href="https://miusoftgames.github.io/" target="_blank" rel="noopener noreferrer" className={styles.card}>
                        <img
                            src="images/miusoft.jpg"
                            alt="Miusoft"
                            className={styles.logo}
                        />
                        <div className={styles.devInfo}>
                            <p className={styles.label}>Developed by</p>
                            <h3 className={styles.devName}>Miusoft</h3>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}