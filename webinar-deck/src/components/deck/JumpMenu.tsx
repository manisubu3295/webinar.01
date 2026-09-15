'use client';

import { useEffect, useRef, useState } from 'react';
import { useDeckStore } from '@/lib/useDeckStore';
import { moduleDividers } from '@/content/moduleDividers';

/** A "jump to module" menu — the fast way to move around an 81-slide
 * deck live, instead of hunting for the right dot in a row of 81. Opens
 * a short list of the 8 modules; picking one jumps straight to its
 * divider. Closes on outside click, Escape, or picking an item. */
export function JumpMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const slides = useDeckStore((s) => s.slides);
  const goTo = useDeckStore((s) => s.goTo);
  const current = useDeckStore((s) => s.current);
  const currentSeg = slides[current]?.seg;

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onClickOutside);
    };
  }, [open]);

  function jumpToModule(seg: string) {
    const idx = slides.findIndex((s) => s.kind === 'divider' && s.seg === seg);
    if (idx >= 0) goTo(idx);
    setOpen(false);
  }

  return (
    <div className="jump-menu" ref={panelRef}>
      <button type="button" className="jump-menu-trigger" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="true">
        Modules <span className="jump-menu-caret">{open ? '⌃' : '⌄'}</span>
      </button>
      {open && (
        <div className="jump-menu-panel" role="menu">
          {moduleDividers.map((d) => (
            <button
              key={d.id}
              type="button"
              role="menuitem"
              className={`jump-menu-item${d.seg === currentSeg ? ' active' : ''}`}
              onClick={() => jumpToModule(d.seg)}
            >
              <span className="jump-menu-num">{d.num}</span>
              <span className="jump-menu-title">{d.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
