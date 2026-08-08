'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import BackToTop from '@/components/BackToTop/BackToTop';
import MusicToggle from '@/components/MusicToggle/MusicToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faUpload,
  faDownload,
  faGamepad,
  faFeather,
  faArrowLeft,
  faRotateRight,
  faXmark,
  faShareNodes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';

function ResultsContent() {
  const searchParams = useSearchParams();

  // Extract query parameters from game
  const rawPlayerName = searchParams.get('player_name');
  const rawScore = searchParams.get('score');
  const rawLevelsPassed = searchParams.get('levels_passed');
  const rawMaxLevel = searchParams.get('max_level');
  const rawCharacter = searchParams.get('character');
  const rawPuzzles = searchParams.get('puzzles');

  const score = parseInt(rawScore || '0', 10);
  const levelsPassed = parseInt(rawLevelsPassed || '0', 10);
  const maxLevel = parseInt(rawMaxLevel || '1', 10);
  const character = rawCharacter || 'Kukula';
  const solvedPuzzleIds = rawPuzzles ? rawPuzzles.split(',').map((p) => p.trim()) : [];

  // Console log passed game data on mount
  useEffect(() => {
    console.log('Passed Game Data:', {
      playerName: rawPlayerName || 'N/A',
      score,
      levelsPassed,
      maxLevel,
      character,
      puzzles: solvedPuzzleIds,
    });
  }, [rawPlayerName, score, levelsPassed, maxLevel, character, rawPuzzles]);

  // State for Player Name (pre-filled if passed, but editable)
  const [playerName, setPlayerName] = useState(rawPlayerName || '');
  const [shareMsg, setShareMsg] = useState('');

  // Sync if rawPlayerName changes
  useEffect(() => {
    if (rawPlayerName) {
      setPlayerName(rawPlayerName);
    }
  }, [rawPlayerName]);

  // State for Photo Studio & Modal
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' | 'upload'
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Start Camera
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false,
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Could not access camera. Please check permissions or upload a photo.');
      setCameraActive(false);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    if (activeTab === 'camera' && !modalOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [activeTab, modalOpen]);

  // Capture Snapshot from Camera with 3s countdown
  const triggerCapture = () => {
    let count = 3;
    setCountdown(count);
    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setCountdown(null);
        takeSnapshot();
      }
    }, 1000);
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = videoRef.current.videoWidth || 640;
    tempCanvas.height = videoRef.current.videoHeight || 480;
    const ctx = tempCanvas.getContext('2d');

    // Mirror camera snapshot
    ctx.translate(tempCanvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, 0, 0);

    const dataUrl = tempCanvas.toDataURL('image/png');
    setPhotoDataUrl(dataUrl);
    setModalOpen(true);
  };

  // Upload Photo handler
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoDataUrl(event.target.result);
        setModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Retake Photo
  const retakePhoto = () => {
    setPhotoDataUrl(null);
    setModalOpen(false);
    if (activeTab === 'camera') {
      startCamera();
    }
  };

  // Share Souvenir Badge image or link
  const shareSouvenir = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      if (canvas.toBlob) {
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], `FeatherFly_Memory_${playerName.replace(/\s+/g, '_') || 'Explorer'}.png`, {
            type: 'image/png',
          });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'FeatherFly Galle Fort Souvenir Badge',
              text: `Check out my FeatherFly Galle Fort Memory Badge! Score: ${score}`,
              files: [file],
            });
            return;
          } else if (navigator.share) {
            await navigator.share({
              title: 'FeatherFly Galle Fort Souvenir Badge',
              text: `Check out my FeatherFly Galle Fort Memory Badge! Score: ${score}`,
              url: window.location.href,
            });
            return;
          }

          // Fallback to clipboard link
          await navigator.clipboard.writeText(window.location.href);
          setShareMsg('Link copied to clipboard!');
          setTimeout(() => setShareMsg(''), 3000);
        });
      }
    } catch (err) {
      console.log('Share error/cancelled:', err);
    }
  };

  // Draw Souvenir Card on Canvas whenever photo, score, character, or name changes
  useEffect(() => {
    if (!modalOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 600;
    const height = 750;
    canvas.width = width;
    canvas.height = height;

    // 1. Background gradient (Galle Fort Sky theme)
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#d6eefa');
    bgGradient.addColorStop(0.5, '#ffffff');
    bgGradient.addColorStop(1, '#f8fbff');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Outer Decorative Border
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#2e86de';
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ff9543';
    ctx.strokeRect(18, 18, width - 36, height - 36);

    // 3. Card Header
    ctx.fillStyle = '#1e1c18';
    ctx.font = 'bold 24px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('FEATHERFLY SOUVENIR', width / 2, 54);

    ctx.fillStyle = '#2e86de';
    ctx.font = 'bold 14px "Inter", sans-serif';
    ctx.fillText('GALLE FORT • SRI LANKA MEMORY CARD', width / 2, 76);

    // 4. Photo Frame Area
    const photoX = 50;
    const photoY = 95;
    const photoW = 500;
    const photoH = 380;

    // Draw Photo Frame Background
    ctx.fillStyle = '#e2ddd5';
    ctx.fillRect(photoX, photoY, photoW, photoH);

    if (photoDataUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const imgRatio = img.width / img.height;
        const frameRatio = photoW / photoH;
        let sWidth = img.width;
        let sHeight = img.height;
        let sx = 0;
        let sy = 0;

        if (imgRatio > frameRatio) {
          sWidth = img.height * frameRatio;
          sx = (img.width - sWidth) / 2;
        } else {
          sHeight = img.width / frameRatio;
          sy = (img.height - sHeight) / 2;
        }

        ctx.drawImage(img, sx, sy, sWidth, sHeight, photoX, photoY, photoW, photoH);
        drawOverlays();
      };
      img.src = photoDataUrl;
    } else {
      drawOverlays();
    }

    function drawOverlays() {
      // Photo frame border overlay
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#ffffff';
      ctx.strokeRect(photoX, photoY, photoW, photoH);

      // 5. Character Mascot Stamp
      const stampX = photoX + photoW - 100;
      const stampY = photoY + photoH - 100;
      ctx.save();
      ctx.beginPath();
      ctx.arc(stampX + 40, stampY + 40, 42, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#ff9543';
      ctx.stroke();

      ctx.font = '40px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(character === 'Mayura' ? '🦚' : '🐓', stampX + 40, stampY + 40);
      ctx.restore();

      // 6. Player Name Tag
      const displayName = playerName.trim() || 'Galle Fort Explorer';
      ctx.fillStyle = '#2e86de';
      ctx.beginPath();
      ctx.roundRect(photoX, photoY + photoH + 20, photoW, 50, 10);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`PLAYER: ${displayName.toUpperCase()}`, width / 2, photoY + photoH + 45);

      // 7. Stats Grid Section
      const statsY = photoY + photoH + 90;

      // Score Badge Box
      ctx.fillStyle = '#f4f1ec';
      ctx.beginPath();
      ctx.roundRect(50, statsY, 150, 70, 8);
      ctx.fill();
      ctx.strokeStyle = '#e2ddd5';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#6b6860';
      ctx.font = '11px "Inter", sans-serif';
      ctx.fillText('TOTAL SCORE', 125, statsY + 22);
      ctx.fillStyle = '#2e86de';
      ctx.font = 'bold 26px "Space Grotesk", sans-serif';
      ctx.fillText(`${score}`, 125, statsY + 52);

      // Levels Passed Box
      ctx.fillStyle = '#f4f1ec';
      ctx.beginPath();
      ctx.roundRect(225, statsY, 150, 70, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#6b6860';
      ctx.font = '11px "Inter", sans-serif';
      ctx.fillText('LEVELS PASSED', 300, statsY + 22);
      ctx.fillStyle = '#4a8c3f';
      ctx.font = 'bold 26px "Space Grotesk", sans-serif';
      ctx.fillText(`${levelsPassed}`, 300, statsY + 52);

      // Character Box
      ctx.fillStyle = '#f4f1ec';
      ctx.beginPath();
      ctx.roundRect(400, statsY, 150, 70, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#6b6860';
      ctx.font = '11px "Inter", sans-serif';
      ctx.fillText('HERO', 475, statsY + 22);
      ctx.fillStyle = '#ff9543';
      ctx.font = 'bold 22px "Space Grotesk", sans-serif';
      ctx.fillText(`${character}`, 475, statsY + 52);

      // 8. Footer Seal & Date
      ctx.fillStyle = '#6b6860';
      ctx.font = '13px "Inter", sans-serif';
      const dateStr = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      ctx.fillText(`Issued by FeatherFly • ${dateStr}`, width / 2, height - 32);
    }
  }, [photoDataUrl, score, levelsPassed, character, playerName, modalOpen]);

  // Download Canvas as PNG image
  const downloadSouvenir = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `FeatherFly_Memory_${playerName.replace(/\s+/g, '_') || 'Explorer'}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <main className={styles.page}>
      <div className={`container ${styles.container}`}>
        {/* Back Link */}
        <div className={styles.backRow}>
          <Link href="/" className={styles.backBtn}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back to FeatherFly
          </Link>
        </div>

        {/* Split Grid for Desktop: Left Info/Controls, Right Camera Viewport */}
        <div className={styles.studioGrid}>
          {/* Left Column: Hero Title & Input Controls */}
          <div className={styles.leftCol}>
            <div className={styles.heroHeader}>
              <div className={styles.badge}>
                <FontAwesomeIcon icon={faCamera} /> Memory Photo Studio
              </div>
              <h1 className={styles.title}>
                Capture Your <span className={styles.highlightText}>Game Memory</span>
              </h1>
              <p className={styles.subtitle}>
                Take a photo with your camera or upload a picture to generate your custom FeatherFly Galle Fort souvenir badge!
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <FontAwesomeIcon icon={faCamera} />
                </div>
                <h2 className={styles.cardTitle}>Take or Submit Photo Memory</h2>
              </div>

              {/* Player Name Input */}
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Player Name (for Memory Badge):</label>
                <input
                  type="text"
                  placeholder="e.g. Captain Aviator"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className={styles.textInput}
                  maxLength={25}
                />
              </div>

              {/* Studio Mode Selector Tabs */}
              <div className={styles.studioTabs}>
                <button
                  className={`${styles.tabBtn} ${activeTab === 'camera' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('camera')}
                >
                  <FontAwesomeIcon icon={faCamera} /> Take Picture
                </button>
                <button
                  className={`${styles.tabBtn} ${activeTab === 'upload' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('upload')}
                >
                  <FontAwesomeIcon icon={faUpload} /> Submit / Upload Picture
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Viewport Window (Webcam / Upload dropzone) */}
          <div className={styles.rightCol}>
            <div className={styles.viewportCard}>
              {/* Tab 1: Live Webcam View */}
              {activeTab === 'camera' && (
                <div className={styles.cameraWrapper}>
                  <div className={styles.cameraBox}>
                    <video ref={videoRef} className={styles.videoElement} playsInline muted />
                    {countdown !== null && <div className={styles.countdownOverlay}>{countdown}</div>}
                  </div>

                  {cameraError ? (
                    <p style={{ color: '#d32f2f', fontSize: '0.9rem', marginBottom: '12px', textAlign: 'center' }}>
                      {cameraError}
                    </p>
                  ) : null}

                  <div className={styles.cameraControls}>
                    <button className={`${styles.actionBtn} ${styles.btnPrimary}`} onClick={triggerCapture}>
                      <FontAwesomeIcon icon={faCamera} /> Snap Photo (3s)
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: File Upload Zone */}
              {activeTab === 'upload' && (
                <div className={styles.uploadWrapper}>
                  <div className={styles.uploadZone} onClick={() => fileInputRef.current?.click()}>
                    <div className={styles.uploadIcon}>
                      <FontAwesomeIcon icon={faUpload} />
                    </div>
                    <div className={styles.uploadTitle}>Click to choose a photo</div>
                    <div className={styles.uploadHint}>Supports PNG, JPG, WEBP (Max 10MB)</div>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className={styles.fileInput}
                    onChange={handleFileUpload}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Popup Preview for Memory Badge */}
        {modalOpen && (
          <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
            <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setModalOpen(false)} aria-label="Close modal">
                <FontAwesomeIcon icon={faXmark} />
              </button>

              <div className={styles.modalGrid}>
                {/* Modal Left: Image Output Canvas */}
                <div className={styles.modalLeft}>
                  <div className={styles.canvasWrapper}>
                    <canvas ref={canvasRef} className={styles.souvenirCanvas} />
                  </div>
                </div>

                {/* Modal Right: Title & Action Buttons */}
                <div className={styles.modalRight}>
                  <div className={styles.modalHeaderInfo}>
                    <div className={styles.modalTitle}>
                      <FontAwesomeIcon icon={faFeather} style={{ color: '#2e86de' }} />
                      Your Memory Badge
                    </div>
                    <p className={styles.modalSubtitle}>
                      Your custom Galle Fort souvenir badge is ready! Save or share it to keep your memory.
                    </p>
                  </div>

                  <div className={styles.actionsGroup}>
                    <button className={`${styles.actionBtn} ${styles.btnSuccess}`} onClick={downloadSouvenir}>
                      <FontAwesomeIcon icon={faDownload} /> Save Memory Photo (PNG)
                    </button>

                    <button className={`${styles.actionBtn} ${styles.btnShare}`} onClick={shareSouvenir}>
                      <FontAwesomeIcon icon={shareMsg ? faCheck : faShareNodes} /> {shareMsg || 'Share Badge'}
                    </button>

                    <button className={`${styles.actionBtn} ${styles.btnSecondary}`} onClick={retakePhoto}>
                      <FontAwesomeIcon icon={faRotateRight} /> Retake Photo
                    </button>

                    <a href="https://miusoftgames.github.io/FeatherFly/game/" className={styles.fullWidthLink}>
                      <button className={`${styles.actionBtn} ${styles.btnPrimary}`}>
                        <FontAwesomeIcon icon={faGamepad} /> Play again
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ResultsClient() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ minHeight: '80vh', padding: '100px 20px', textAlign: 'center' }}>Loading photo studio...</div>}>
        <ResultsContent />
      </Suspense>
      <Footer />
      <BackToTop />
      <MusicToggle />
    </>
  );
}
