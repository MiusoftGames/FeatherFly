'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { GAME_LINK } from '@/lib/config';

/**
 * Drop this anywhere a "Play" trigger is needed (navbar, hero, footer CTA...).
 * Styling is left to the caller via `className`, so it can match whatever
 * surrounding design that spot already uses (e.g. styles.btnPrimary).
 *
 *   <PlayButton className={styles.btnPrimary} />
 *   <PlayButton className={styles.navPlayBtn}>Play</PlayButton>
 *   <PlayButton className={styles.btnPrimary} icon={null}>Play now</PlayButton>
 */
export default function PlayButton({
    className,
    children = 'Play in Browser',
    icon = faPlay,
    ...rest
}) {
    const openGame = () => {
        window.location.href = GAME_LINK;
    };

    return (
        <button type="button" onClick={openGame} className={className} {...rest}>
            {icon && <FontAwesomeIcon icon={icon} />} &ensp;{children}
        </button>
    );
}