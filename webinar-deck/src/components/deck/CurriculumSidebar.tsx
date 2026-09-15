'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDeckStore } from '@/lib/useDeckStore';
import { moduleDividers } from '@/content/moduleDividers';
import { dividerImageBySeg } from '@/lib/dividerImages';
import { buildJumpTargets, type JumpTarget } from '@/lib/jumpTargets';

/** A persistent, collapsible curriculum view — the "course" cue this
 * deck was missing. Closed by default so it never interferes with live
 * presenting; reuses the same jump-target data JumpMenu already builds,
 * just grouped by module instead of flattened, plus a real "you've
 * already seen this" checkmark from the store's visited map. */
export function CurriculumSidebar() {
  const sidebarOpen = useDeckStore((s) => s.sidebarOpen);
  const toggleSidebar = useDeckStore((s) => s.toggleSidebar);
  const slides = useDeckStore((s) => s.slides);
  const jumpIndex = useDeckStore((s) => s.jumpIndex);
  const goTo = useDeckStore((s) => s.goTo);
  const current = useDeckStore((s) => s.current);
  const visited = useDeckStore((s) => s.visited);
  const currentSeg = slides[current]?.seg;

  const [expandedSeg, setExpandedSeg] = useState<string | null>(currentSeg ?? '1');

  // Keep the open module in step with wherever presenting jumps to next
  // (JumpMenu, dot-nav, keyboard) — but only while the sidebar is closed,
  // so it doesn't yank the panel out from under someone browsing it.
  useEffect(() => {
    if (!sidebarOpen) setExpandedSeg(currentSeg ?? '1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSeg, sidebarOpen]);

  const allTargets = useMemo(() => buildJumpTargets(slides, jumpIndex), [slides, jumpIndex]);

  const bySeg = useMemo(() => {
    const map: Record<string, JumpTarget[]> = {};
    allTargets.forEach((t) => {
      if (t.tag.startsWith('Module ')) return; // the divider itself is the section header, not a row
      const seg = slides[t.index]?.seg;
      if (!seg) return;
      (map[seg] ??= []).push(t);
    });
    return map;
  }, [allTargets, slides]);

  function jump(index: number) {
    goTo(index);
  }

  return (
    <>
      {sidebarOpen && (
        <>
          <div className="curriculum-scrim" onClick={toggleSidebar} />
          <div className="curriculum-sidebar" role="navigation" aria-label="Curriculum">
            <div className="curriculum-header">
              <span>NextGen Builder Initiative</span>
              <button type="button" className="curriculum-close" onClick={toggleSidebar} aria-label="Close curriculum">
                &times;
              </button>
            </div>
            <div className="curriculum-body">
              {moduleDividers.map((d) => {
                const dividerIdx = slides.findIndex((s) => s.kind === 'divider' && s.seg === d.seg);
                const items = bySeg[d.seg] ?? [];
                const open = expandedSeg === d.seg;
                return (
                  <div className={`curriculum-module${open ? ' open' : ''}`} key={d.seg}>
                    <button
                      type="button"
                      className={`curriculum-module-header${currentSeg === d.seg ? ' active' : ''}`}
                      onClick={() => {
                        setExpandedSeg(open ? null : d.seg);
                        if (dividerIdx >= 0) jump(dividerIdx);
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- static export, external asset in /public */}
                      <img className="curriculum-thumb" src={dividerImageBySeg[d.seg]} alt="" />
                      <span className="curriculum-module-title">
                        <span className="curriculum-module-num">{d.num}</span>
                        {d.title}
                      </span>
                      <span className="curriculum-caret">{open ? '⌃' : '⌄'}</span>
                    </button>
                    {open && (
                      <div className="curriculum-items">
                        {items.map((t, i) => (
                          <button
                            type="button"
                            key={`${t.tag}-${t.label}-${i}`}
                            className={`curriculum-item${t.index === current ? ' active' : ''}${visited[t.index] ? ' visited' : ''}`}
                            onClick={() => jump(t.index)}
                          >
                            <span className="curriculum-item-check">{visited[t.index] ? '✓' : ''}</span>
                            <span className="curriculum-item-title">{t.label}</span>
                            <span className="curriculum-item-tag">{t.tag}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
