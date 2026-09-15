'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useDeckStore } from '@/lib/useDeckStore';
import { moduleDividers } from '@/content/moduleDividers';
import { buildJumpTargets, type JumpTarget } from '@/lib/jumpTargets';

/** A "jump to anything" menu — the fast way to move around an 81-slide
 * deck live. Empty search shows the 8 modules (coarse jump); typing
 * searches every module, segment, tutorial, comparison, and quiz in the
 * deck by name (fine jump) — "redis", "ci/cd", "architecture" all
 * resolve straight to that slide, instead of hunting through 81 dots. */
export function JumpMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const slides = useDeckStore((s) => s.slides);
  const jumpIndex = useDeckStore((s) => s.jumpIndex);
  const goTo = useDeckStore((s) => s.goTo);
  const current = useDeckStore((s) => s.current);
  const currentSeg = slides[current]?.seg;

  const allTargets = useMemo(() => buildJumpTargets(slides, jumpIndex), [slides, jumpIndex]);
  const moduleTargets = useMemo(
    () => moduleDividers.map((d) => allTargets.find((t) => t.tag === `Module ${d.num}`)).filter((t): t is JumpTarget => !!t),
    [allTargets],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return moduleTargets;
    return allTargets.filter((t) => t.label.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q)).slice(0, 14);
  }, [query, allTargets, moduleTargets]);

  function close() {
    setOpen(false);
    setQuery('');
  }

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      if (e.key === 'Enter' && results[0]) {
        goTo(results[0].index);
        close();
      }
    }
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) close();
    }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, results]);

  function jump(index: number) {
    goTo(index);
    close();
  }

  return (
    <div className="jump-menu" ref={panelRef}>
      <button type="button" className="jump-menu-trigger" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="true">
        Jump to <span className="jump-menu-caret">{open ? '⌃' : '⌄'}</span>
      </button>
      {open && (
        <div className="jump-menu-panel" role="menu">
          <input
            ref={inputRef}
            type="text"
            className="jump-menu-search"
            placeholder="Search any topic… react, redis, ci/cd"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {results.length === 0 && <div className="jump-menu-empty">No match.</div>}
          {results.map((t, i) => (
            <button
              key={`${t.tag}-${t.label}-${i}`}
              type="button"
              role="menuitem"
              className={`jump-menu-item${!query && slides[t.index]?.seg === currentSeg ? ' active' : ''}`}
              onClick={() => jump(t.index)}
            >
              <span className="jump-menu-title">{t.label}</span>
              <span className="jump-menu-tag">{t.tag}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
