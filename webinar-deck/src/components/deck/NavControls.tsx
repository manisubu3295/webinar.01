'use client';

import { useDeckStore } from '@/lib/useDeckStore';

export function NavControls() {
  const current = useDeckStore((s) => s.current);
  const slides = useDeckStore((s) => s.slides);
  const next = useDeckStore((s) => s.next);
  const prev = useDeckStore((s) => s.prev);
  const goTo = useDeckStore((s) => s.goTo);

  return (
    <div id="nav">
      <button className="nav-btn" type="button" aria-label="Previous" onClick={prev}>
        &#8592;
      </button>
      <div id="dots">
        {slides.map((s, i) => {
          const nextSeg = slides[i + 1]?.seg;
          return (
            <div
              key={i}
              className={`dot${i === current ? ' active' : ''}`}
              style={i < slides.length - 1 && s.seg !== nextSeg ? { marginRight: 13 } : undefined}
              onClick={() => goTo(i)}
            />
          );
        })}
      </div>
      <button className="nav-btn" type="button" aria-label="Next" onClick={next}>
        &#8594;
      </button>
    </div>
  );
}
