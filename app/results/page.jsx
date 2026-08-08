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
  faTrophy,
  faCamera,
  faUpload,
  faDownload,
  faShareNodes,
  faRotateRight,
  faGamepad,
  faCheckCircle,
  faLock,
  faFeather,
  faArrowLeft,
  faCrown,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';

// Puzzle definitions for Galle Fort
const ALL_PUZZLES = [
  { id: '1', name: 'Lighthouse Street', icon: '📍', desc: 'Historic street towards the lighthouse' },
  { id: '2', name: 'Rampart Street', icon: '🧱', desc: 'Defensive ocean fortifications' },
  { id: '3', name: 'Pedlar Street', icon: '☕', desc: 'Lively heart of Galle Fort' },
  { id: '4', name: 'Clock Tower', icon: '🕰️', desc: 'Victorian landmark bastion' },
  { id: '5', name: 'Dutch Hospital', icon: '🏛️', desc: 'Colonial heritage complex' },
];

function ResultsContent() {
  const searchParams = useSearchParams();

  // Extract query parameters from game
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

  // Determine Rank based on score
  let rankTitle = 'Novice Adventurer';
  if (score >= 300) rankTitle = 'Legendary Sky Master 👑';
  else if (score >= 200) rankTitle = 'Galle Fort Champion 🥇';
  else if (score >= 100) rankTitle = 'High Flyer Explorer 🥈';
  else if (score > 0) rankTitle = 'Fort Navigator 🥉';

  // State for Photo Studio
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' | 'upload'
  const [playerName, setPlayerName] = useState('');
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [shareSuccess, setShareSuccess] = useState(false);

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
    if (activeTab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [activeTab]);

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
    
    // Mirror standard camera snapshot
    ctx.translate(tempCanvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, 0, 0);

    const dataUrl = tempCanvas.toDataURL('image/png');
    setPhotoDataUrl(dataUrl);
  };

  // Upload Photo handler
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoDataUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Draw Souvenir Card on Canvas whenever photo, score, character, or name changes
  useEffect(() => {
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

    // Draw Photo Frame Shadow/Background
    ctx.fillStyle = '#e2ddd5';
    ctx.fillRect(photoX, photoY, photoW, photoH);

    if (photoDataUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Draw user photo with cover crop
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
      // Placeholder illustration if no photo captured yet
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(photoX + 4, photoY + 4, photoW - 8, photoH - 8);

      ctx.fillStyle = '#4a9ec4';
      ctx.font = 'bold 60px sans-serif';
      ctx.fillText('📸', width / 2, photoY + photoH / 2 - 10);

      ctx.fillStyle = '#6b6860';
      ctx.font = '16px "Inter", sans-serif';
      ctx.fillText('Take or upload a photo to render memory badge', width / 2, photoY + photoH / 2 + 40);

      drawOverlays();
    }

    function drawOverlays() {
      // Photo frame border overlay
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#ffffff';
      ctx.strokeRect(photoX, photoY, photoW, photoH);

      // 5. Character Mascot Stamp (Bottom Right of Photo)
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
  }, [photoDataUrl, score, levelsPassed, character, playerName]);

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

  // Share Memory
  const shareMemory = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My FeatherFly Galle Fort Flight Record!',
          text: `I scored ${score} points in FeatherFly! Check out my memory certificate.`,
          url: window.location.href,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } catch (err) {
        console.log('Share canceled or failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 3000);
    }
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

        {/* Hero Header */}
        <div className={styles.heroHeader}>
          <div className={styles.badge}>
            <FontAwesomeIcon icon={faTrophy} /> Game Results & Memory Certificate
          </div>
          <h1 className={styles.title}>
            Flight Record <span className={styles.highlightText}>& Souvenir Studio</span>
          </h1>
          <p className={styles.subtitle}>
            You completed your run in Galle Fort, Sri Lanka! Review your stats below and snap a souvenir photo memory.
          </p>
        </div>

        {/* Main 2-Column Grid */}
        <div className={styles.mainGrid}>
          {/* Column 1: Game Stats Dashboard */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <FontAwesomeIcon icon={faCrown} />
              </div>
              <h2 className={styles.cardTitle}>Passed Game Data</h2>
            </div>

            {/* Character Banner */}
            <div className={styles.characterBanner}>
              <div className={styles.characterAvatar}>
                {character === 'Mayura' ? '🦚' : '🐓'}
              </div>
              <div className={styles.characterInfo}>
                <h4>{character}</h4>
                <p>
                  {character === 'Mayura'
                    ? 'The Regal Peacock — Graceful flight over colonial bastions'
                    : 'The Sri Lankan Junglefowl — National bird of Sri Lanka'}
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className={styles.statsRow}>
              <div className={`${styles.statBox} ${styles.statBoxPrimary}`}>
                <div className={styles.statLabel}>Total Score</div>
                <div className={styles.statValue}>{score}</div>
                <div className={styles.statRank}>{rankTitle}</div>
              </div>

              <div className={`${styles.statBox} ${styles.statBoxSecondary}`}>
                <div className={styles.statLabel}>Levels Passed</div>
                <div className={styles.statValue}>{levelsPassed}</div>
              </div>

              <div className={`${styles.statBox} ${styles.statBoxSecondary}`}>
                <div className={styles.statLabel}>Max Unlocked</div>
                <div className={styles.statValue}>Lvl {maxLevel}</div>
              </div>
            </div>

            {/* Solved Puzzles Section */}
            <div className={styles.puzzlesSection}>
              <div className={styles.puzzlesTitle}>
                <span>
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '6px', color: '#ff9543' }} />
                  Galle Fort Puzzles
                </span>
                <span style={{ fontSize: '0.85rem', color: '#6b6860', fontWeight: '500' }}>
                  {solvedPuzzleIds.length} / {ALL_PUZZLES.length} Solved
                </span>
              </div>

              <div className={styles.puzzleGrid}>
                {ALL_PUZZLES.map((puzzle) => {
                  const isUnlocked = solvedPuzzleIds.includes(puzzle.id) || solvedPuzzleIds.includes(puzzle.name);
                  return (
                    <div
                      key={puzzle.id}
                      className={`${styles.puzzleCard} ${
                        isUnlocked ? styles.puzzleCardUnlocked : styles.puzzleCardLocked
                      }`}
                    >
                      <div className={styles.puzzleIcon}>{puzzle.icon}</div>
                      <div className={styles.puzzleName}>{puzzle.name}</div>
                      <div className={styles.puzzleStatus}>
                        {isUnlocked ? (
                          <span>
                            <FontAwesomeIcon icon={faCheckCircle} /> Solved
                          </span>
                        ) : (
                          <span>
                            <FontAwesomeIcon icon={faLock} /> Locked
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Photo Memory Studio */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon} style={{ background: 'linear-gradient(135deg, #ff9543, #f57f17)' }}>
                <FontAwesomeIcon icon={faCamera} />
              </div>
              <h2 className={styles.cardTitle}>Take or Submit Photo Memory</h2>
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

            {/* Tab 1: Live Webcam View */}
            {activeTab === 'camera' && (
              <div>
                <div className={styles.cameraBox}>
                  <video ref={videoRef} className={styles.videoElement} playsInline muted />
                  {countdown !== null && <div className={styles.countdownOverlay}>{countdown}</div>}
                </div>

                {cameraError ? (
                  <p style={{ color: '#d32f2f', fontSize: '0.9rem', marginBottom: '16px', textAlign: 'center' }}>
                    {cameraError}
                  </p>
                ) : null}

                <div className={styles.cameraControls}>
                  <button className={`${styles.actionBtn} ${styles.btnPrimary}`} onClick={triggerCapture}>
                    <FontAwesomeIcon icon={faCamera} /> Snap Photo (3s)
                  </button>

                  <button className={`${styles.actionBtn} ${styles.btnSecondary}`} onClick={takeSnapshot}>
                    Instant Snap
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: File Upload Zone */}
            {activeTab === 'upload' && (
              <div>
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

            {/* Player Name Tag Input */}
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Enter Your Name (for Souvenir Card):</label>
              <input
                type="text"
                placeholder="e.g. Captain Aviator"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className={styles.textInput}
                maxLength={25}
              />
            </div>
          </div>
        </div>

        {/* Live Souvenir Card Canvas Preview & Download Area */}
        <div className={styles.souvenirContainer}>
          <h3 className={styles.souvenirTitle}>
            <FontAwesomeIcon icon={faFeather} style={{ color: '#2e86de', marginRight: '8px' }} />
            Your Galle Fort Memory Badge Preview
          </h3>

          <div className={styles.canvasWrapper}>
            <canvas ref={canvasRef} className={styles.souvenirCanvas} />
          </div>

          <div className={styles.actionsGroup}>
            <button className={`${styles.actionBtn} ${styles.btnSuccess}`} onClick={downloadSouvenir}>
              <FontAwesomeIcon icon={faDownload} /> Save Memory Photo (PNG)
            </button>

            <button className={`${styles.actionBtn} ${styles.btnSecondary}`} onClick={shareMemory}>
              <FontAwesomeIcon icon={faShareNodes} /> Share Memory
            </button>

            <a href="https://miusoftgames.github.io/FeatherFly/game/">
              <button className={`${styles.actionBtn} ${styles.btnPrimary}`}>
                <FontAwesomeIcon icon={faGamepad} /> End Play Game
              </button>
            </a>
          </div>

          {shareSuccess && (
            <div className={styles.shareNotice}>
              <FontAwesomeIcon icon={faCheckCircle} /> Memory link copied / shared!
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ minHeight: '80vh', padding: '100px 20px', textAlign: 'center' }}>Loading game results...</div>}>
        <ResultsContent />
      </Suspense>
      <Footer />
      <BackToTop />
      <MusicToggle />
    </>
  );
}
