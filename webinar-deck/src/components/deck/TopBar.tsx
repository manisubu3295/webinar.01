'use client';

import { useDeckStore } from '@/lib/useDeckStore';
import { schedule, segTitles } from '@/content/schedule';
import { slideSub } from './slideMeta';
import { JumpMenu } from './JumpMenu';

export function TopBar() {
  const current = useDeckStore((s) => s.current);
  const slides = useDeckStore((s) => s.slides);
  const slide = slides[current];

  const segLabel = segTitles[slide.seg] ?? '';
  const sub = slideSub(slide);
  const block = schedule.find((b) => b.seg === slide.seg);

  return (
    <div id="topBar">
      <div id="moduleBreadcrumb">
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
