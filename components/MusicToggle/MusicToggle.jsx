'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faPause } from '@fortawesome/free-solid-svg-icons';
import styles from './MusicToggle.module.css';

export default function MusicToggle() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = new Audio();
        audio.src = 'music/music.mp3';
        audio.loop = true;

        audio.addEventListener('error', () => {
            console.error('Audio failed to load. Check the file path:', audio.src);
        });

        audioRef.current = audio;

        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((err) => {
                console.error('Playback failed:', err);
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <button
            className={`${styles.btn} ${isPlaying ? styles.playing : ''}`}
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            title={isPlaying ? 'Pause music' : 'Play music'}
        >
            <FontAwesomeIcon icon={isPlaying ? faPause : faMusic} />
        </button>
    );
}