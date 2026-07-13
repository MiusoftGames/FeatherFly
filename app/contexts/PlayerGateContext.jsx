'use client';

import { createContext, useContext, useState } from 'react';
import PlayerGateForm from '@/components/PlayerGateForm/PlayerGateForm';
import { GAME_LINK } from '@/lib/config';

const PlayerGateContext = createContext(null);

export function PlayerGateProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openGate = () => setIsOpen(true);
  const closeGate = () => setIsOpen(false);

  // Modal stays open on success so the player sees the confirmation +
  // fallback link; it only closes when they click the X.
  const handleSuccess = () => {
    window.location.href = GAME_LINK;
  };

  return (
    <PlayerGateContext.Provider value={{ openGate, closeGate }}>
      {children}
      <PlayerGateForm isOpen={isOpen} onClose={closeGate} onSuccess={handleSuccess} />
    </PlayerGateContext.Provider>
  );
}

export function usePlayerGate() {
  const ctx = useContext(PlayerGateContext);
  if (!ctx) {
    throw new Error('usePlayerGate must be used inside <PlayerGateProvider>');
  }
  return ctx;
}