'use client';

import { useMemo } from 'react';
import { useDeckStore } from '@/lib/useDeckStore';
import { schedule, scheduleTotalMins } from '@/content/schedule';

export function ScheduleRail() {
  const current = useDeckStore((s) => s.current);
  const slides = useDeckStore((s) => s.slides);
  const slide = slides[current];

  const blockIndex = schedule.findIndex((b) => b.seg === slide.seg);

  const { markerLeftPct } = useMemo(() => {
    if (blockIndex < 0) return { markerLeftPct: 0 };
    let elapsed = 0;
    for (let i = 0; i < blockIndex; i++) elapsed += schedule[i].mins;
    const segSlideIdxs = slides.reduce<number[]>((arr, s, i) => {
      if (s.seg === slide.seg) arr.push(i);
      return arr;
    }, []);
    const posInSeg = Math.max(0, segSlideIdxs.indexOf(current));
    const fraction = segSlideIdxs.length > 1 ? posInSeg / (segSlideIdxs.length - 1) : 0;
    elapsed += schedule[blockIndex].mins * fraction;
    return { markerLeftPct: (elapsed / scheduleTotalMins) * 100 };
  }, [blockIndex, current, slide.seg, slides]);

  return (
    <div id="rail">
      <div id="railTrack">
        {schedule.map((b, i) => (
          <div
            key={b.seg}
            className={`rail-seg${b.isBreak ? ' is-break' : ''}${i < blockIndex ? ' done' : ''}${i === blockIndex ? ' active' : ''}`}
            style={{ width: `${(b.mins / scheduleTotalMins) * 100}%` }}
            title={`${b.label} — ${b.clock}`}
          />
        ))}
      </div>
      {blockIndex >= 0 && <div id="railMarker" style={{ left: `${markerLeftPct}%` }} />}
    </div>
  );
}
