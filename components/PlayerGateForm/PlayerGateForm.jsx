'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './PlayerGateForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faXmark, faSpinner, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { SHEET_ENDPOINT, GAME_LINK } from '@/lib/config';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PlayerGateForm({ isOpen, onClose, onSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('Tell us what to call you.');
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setErrorMsg('That email doesn\'t look right.');
      return;
    }
    if (!consent) {
      setErrorMsg('Please agree to the Privacy Policy to continue.');
      return;
    }

    setErrorMsg('');
    setStatus('loading');

    try {
      // Apps Script web apps don't return CORS headers for readable responses,
      // so we fire the request and treat a resolved fetch as success.
      await fetch(SHEET_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          consent,
          source: 'featherfly-web',
          timestamp: new Date().toISOString(),
        }),
      });

      setStatus('success');
      setTimeout(() => {
        onSuccess();
      }, 700);
    } catch (err) {
      setStatus('error');
      setErrorMsg('Could not reach the server. Check your connection and try again.');
    }
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <div className={styles.card}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {status === 'success' ? (
          <div className={styles.successState}>
            <FontAwesomeIcon icon={faCircleCheck} className={styles.successIcon} />
            <p>You're in. Loading the game…</p>
            <a href={GAME_LINK} className={styles.fallbackLink}>
              Click here if not loading
            </a>
          </div>
        ) : (
          <>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              One quick step
            </div>

            <h2 id="gate-title" className={styles.title}>
              Before you take flight
            </h2>
            <p className={styles.subtext}>
              Tell us who's joining Kukula &amp; Mayura, then dive straight into Galle Fort.
            </p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="player-name" className={styles.label}>Name</label>
                <input
                  id="player-name"
                  type="text"
                  className={styles.input}
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  disabled={status === 'loading'}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="player-email" className={styles.label}>Email</label>
                <input
                  id="player-email"
                  type="email"
                  className={styles.input}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  disabled={status === 'loading'}
                />
              </div>

              <label className={styles.consentRow}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={status === 'loading'}
                />
                <span>
                  I agree to the{' '}
                  <Link href="/privacy-policy" target="_blank" className={styles.policyLink}>
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}

              <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin /> &ensp;Starting…
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPlay} /> &ensp;Start Flying
                  </>
                )}
              </button>

              {/* <p className={styles.privacyNote}>
                We use this to know who's playing and to keep you posted on Imagine Island news.
              </p> */}
            </form>
          </>
        )}
      </div>
    </div>
  );
}