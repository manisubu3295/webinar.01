'use client';

import { useDeckStore } from '@/lib/useDeckStore';
import { schedule, segTitles } from '@/content/schedule';
import { slideSub, slideKindIcon } from './slideMeta';
import { JumpMenu } from './JumpMenu';

export function TopBar() {
  const current = useDeckStore((s) => s.current);
  const slides = useDeckStore((s) => s.slides);
  const sidebarOpen = useDeckStore((s) => s.sidebarOpen);
  const toggleSidebar = useDeckStore((s) => s.toggleSidebar);
  const slide = slides[current];

  const segLabel = segTitles[slide.seg] ?? '';
  const sub = slideSub(slide);
  const block = schedule.find((b) => b.seg === slide.seg);
  const kindIcon = slideKindIcon(slide);

  return (
    <div id="topBar">
      <button
        type="button"
        className="curriculum-toggle"
        onClick={toggleSidebar}
        aria-expanded={sidebarOpen}
        aria-label="Toggle curriculum"
      >
        &#9776;
      </button>
      <div id="moduleBreadcrumb">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, external asset in /public */}
        {kindIcon && <img className="slide-kind-icon" src={kindIcon} alt="" />}
        {segLabel && (
          <>
            {segLabel}
            {sub && (
              <>
                <span className="crumb-sep">&rsaquo;</span>
                <span className="crumb-sub">{sub}</span>
              </>
            )}
          </>
        )}
      </div>
      <div id="clockRange">{block?.clock ?? ''}</div>
      <JumpMenu />
      <div id="progress-label">
        <b>{String(current + 1).padStart(2, '0')}</b> / <span>{slides.length}</span>
      </div>
    </div>
  );
}
