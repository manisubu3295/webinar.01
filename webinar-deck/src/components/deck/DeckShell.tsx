'use client';

import { useEffect } from 'react';
import { useDeckStore } from '@/lib/useDeckStore';
import { TopBar } from './TopBar';
import { ScheduleRail } from './ScheduleRail';
import { Stage } from './Stage';
import { NavControls } from './NavControls';

export function DeckShell() {
  const next = useDeckStore((s) => s.next);
  const prev = useDeckStore((s) => s.prev);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const tag = (document.activeElement?.tagName ?? '').toUpperCase();
      if (tag === 'TEXTAREA' || tag === 'INPUT') return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [next, prev]);

  return (
    <div id="app">
      <TopBar />
      <ScheduleRail />
      <Stage />
      <NavControls />
    </div>
  );
}
