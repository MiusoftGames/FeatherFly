import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Imagine Island collects and uses your information when you play FeatherFly.',
};

const LAST_UPDATED = 'June 26, 2026';

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.backLink}>← Back to FeatherFly</Link>

        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Privacy Policy
        </div>

        <h1 className={styles.title}>Your privacy, plainly explained</h1>
        <p className={styles.updated}>Last updated: {LAST_UPDATED}</p>

        <p className={styles.intro}>
          Imagine Island X Miusoft ("we", "us", "our") develops and publishes FeatherFly. This Privacy Policy explains what information we collect when you play the game,
          why we collect it, and how you can control your information.
        </p>

        <section className={styles.section}>
          <h2>1. Information we collect</h2>
          <p>When you play FeatherFly in your browser, we ask for:</p>
          <ul>
            <li><strong>Your name</strong> : so we know who's playing.</li>
            <li><strong>Your email address</strong> : so we can reach you.</li>
          </ul>
          <p>
            We don't collect passwords, payment details, or any other personal information
            through this form.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. How we use your information</h2>
          <p>We use the name and email you provide to:</p>
          <ul>
            <li>Let you access and play FeatherFly.</li>
            <li>Understand who is playing our game and how many people are playing.</li>
            <li>
              Send you news, updates, and marketing communications about FeatherFly and
              other Imagine Island projects.
            </li>
          </ul>
          <p>
            You can opt out of marketing emails at any time by using the unsubscribe link in
            any email we send, or by contacting us directly (see Section 7).
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Where your information is stored</h2>
          <p>
            Submissions are stored in a secure Google Sheets document accessible only to
            the Imagine Island team. We do not sell your information to third parties.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Children's privacy</h2>
          <p>
            FeatherFly is designed to be enjoyed by a general audience, including younger
            players. If you are under the age of 16, please ask a parent or guardian for
            permission before entering your name and email, and have them assist you with
            this step.
          </p>
          <p>
            If you are a parent or guardian and believe your child has submitted
            information without your consent, please contact us (see Section 7) and we
            will remove it promptly.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Cookies and local storage</h2>
          <p>
            FeatherFly's website does not use tracking cookies. The game itself may use
            your browser's local storage to save game progress on your device; this data
            stays on your device and is not sent to us.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Your rights</h2>
          <p>You can ask us at any time to:</p>
          <ul>
            <li>Tell you what information we hold about you.</li>
            <li>Correct inaccurate information.</li>
            <li>Delete your information from our records.</li>
            <li>Stop sending you marketing communications.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>7. Contact us</h2>
          <p>
            For any questions about this policy, or to exercise any of the rights above,
            contact us at{' '}
            <a href="mailto:miusoft.games@gmail.com" className={styles.inlineLink}>
              miusoft.games@gmail.com
            </a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. We'll update the "Last updated"
            date above when we do. Continued use of FeatherFly after a change means you
            accept the updated policy.
          </p>
        </section>
      </div>
    </main>
  );
}
