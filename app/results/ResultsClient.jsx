'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getImageUrl } from '@/lib/config';
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
  faCopy,
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
  const [copiedPost, setCopiedPost] = useState(false);

  const sampleText = `Check out my FeatherFly Galle Fort Memory Badge! Score: ${score} #FeatherFly`;

  const copySamplePost = () => {
    navigator.clipboard.writeText(sampleText);
    setCopiedPost(true);
    setTimeout(() => setCopiedPost(false), 2500);
  };

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

  // Share Souvenir Badge image or link with #FeatherFly
  const shareSouvenir = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const shareText = `Check out my FeatherFly Galle Fort Memory Badge! Score: ${score} #FeatherFly #GalleFort`;

    try {
      if (canvas.toBlob) {
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], `FeatherFly_Memory_${playerName.replace(/\s+/g, '_') || 'Explorer'}.png`, {
            type: 'image/png',
          });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'FeatherFly Galle Fort Souvenir Badge #FeatherFly',
              text: shareText,
              files: [file],
            });
            return;
          } else if (navigator.share) {
            await navigator.share({
              title: 'FeatherFly Galle Fort Souvenir Badge #FeatherFly',
              text: shareText,
              url: window.location.href,
            });
            return;
          }

          // Fallback to clipboard link
          await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
          setShareMsg('Link & #FeatherFly copied!');
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
    const width = 1080;
    const height = 1350;
    canvas.width = width;
    canvas.height = height;

    // Load Frame Image
    const frameImg = new Image();
    frameImg.crossOrigin = 'anonymous';
    const frameSrc = getImageUrl('/images/website photo frame.png');

    frameImg.onload = () => {
      renderCanvas(frameImg);
    };
    frameImg.onerror = () => {
      renderCanvas(null);
    };
    frameImg.src = frameSrc;

    function renderCanvas(frame) {
      // 1. Clear background
      ctx.clearRect(0, 0, width, height);

      // Soft Sky Fill Background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#cce7ff');
      skyGrad.addColorStop(1, '#ffffff');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Arch Photo Slot Bounds
      const photoX = 270;
      const photoY = 140;
      const photoW = 540;
      const photoH = 810;

      // Draw Photo inside arch slot
      if (photoDataUrl) {
        const userImg = new Image();
        userImg.crossOrigin = 'anonymous';
        userImg.onload = () => {
          const imgRatio = userImg.width / userImg.height;
          const frameRatio = photoW / photoH;
          let sWidth = userImg.width;
          let sHeight = userImg.height;
          let sx = 0;
          let sy = 0;

          if (imgRatio > frameRatio) {
            sWidth = userImg.height * frameRatio;
            sx = (userImg.width - sWidth) / 2;
          } else {
            sHeight = userImg.width / frameRatio;
            sy = (userImg.height - sHeight) / 2;
          }

          ctx.drawImage(userImg, sx, sy, sWidth, sHeight, photoX, photoY, photoW, photoH);
          finishCanvas(frame);
        };
        userImg.onerror = () => finishCanvas(frame);
        userImg.src = photoDataUrl;
      } else {
        // Fallback photo background if no photo data
        ctx.fillStyle = '#e2ddd5';
        ctx.fillRect(photoX, photoY, photoW, photoH);
        finishCanvas(frame);
      }
    }

    function finishCanvas(frame) {
      // 3. Draw Frame Overlay
      if (frame) {
        ctx.drawImage(frame, 0, 0, width, height);
      }

      // 4. Player Name Banner (Center Base above logo)
      const displayName = playerName.trim() || 'Galle Fort Explorer';

      const bannerW = 460;
      const bannerH = 52;
      const bannerX = (width - bannerW) / 2;
      const bannerY = 960;

      ctx.save();
      // Drop Shadow for Banner
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 4;

      ctx.fillStyle = '#2e86de';
      ctx.beginPath();
      ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 14);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 14);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`PLAYER: ${displayName.toUpperCase()}`, width / 2, bannerY + bannerH / 2);

      // 5. Left Stone Pillar: Score Badge
      drawPillarBadge(60, 480, 'TOTAL SCORE', `${score}`, '#2e86de');

      // 6. Left Stone Pillar Lower: Hero Mascot Stamp
      drawMascotBadge(60, 600, character);

      // 7. Right Stone Pillar: Levels Passed Badge
      drawPillarBadge(860, 480, 'LEVELS PASSED', `${levelsPassed}`, '#4a8c3f');
    }

    function drawPillarBadge(x, y, label, val, color) {
      const w = 160;
      const h = 80;
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 14);
      ctx.fill();

      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = '#555555';
      ctx.font = 'bold 11px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, x + w / 2, y + 24);

      ctx.fillStyle = color;
      ctx.font = 'bold 28px "Space Grotesk", sans-serif';
      ctx.fillText(val, x + w / 2, y + 58);
    }

    function drawMascotBadge(x, y, heroName) {
      const w = 160;
      const h = 80;
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 14);
      ctx.fill();

      ctx.strokeStyle = '#ff9543';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = '#555555';
      ctx.font = 'bold 11px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('HERO', x + w / 2, y + 24);

      ctx.fillStyle = '#ff9543';
      ctx.font = 'bold 20px "Space Grotesk", sans-serif';
      ctx.fillText(`${heroName === 'Mayura' ? '🦚' : '🐓'} ${heroName}`, x + w / 2, y + 56);
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
                    {/* Live Frame Overlay for Face Alignment */}
                    <img
                      src={getImageUrl('/images/website photo frame.png')}
                      alt="Photo Frame Overlay"
                      className={styles.frameOverlay}
                    />
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

                    {/* Copyable Sample Social Post */}
                    <div className={styles.samplePostBox} onClick={copySamplePost} title="Click to copy sample post">
                      <div className={styles.samplePostHeader}>
                        <span className={styles.samplePostTitle}>Sample Social Post</span>
                        <span className={styles.copyPostChip}>
                          <FontAwesomeIcon icon={copiedPost ? faCheck : faCopy} /> {copiedPost ? 'Copied!' : 'Copy Text'}
                        </span>
                      </div>
                      <p className={styles.samplePostText}>{sampleText}</p>
                    </div>
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
