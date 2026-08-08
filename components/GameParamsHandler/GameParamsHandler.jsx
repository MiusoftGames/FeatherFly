'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GameParamsHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hasScore = searchParams.has('score');
    const hasLevels = searchParams.has('levels_passed');
    const hasCharacter = searchParams.has('character');
    const hasPlayerName = searchParams.has('player_name');

    if (hasScore || hasLevels || hasCharacter || hasPlayerName) {
      const queryString = searchParams.toString();
      router.push(`/results?${queryString}`);
    }
  }, [searchParams, router]);

  return null;
}
