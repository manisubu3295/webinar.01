'use client';

import { useDeckStore } from '@/lib/useDeckStore';

// The dot row (one dot per slide) stopped being usable once the deck
// passed 80+ slides and got worse as more were added — the sidebar
// (CurriculumSidebar) and progress label now cover "where am I", so
// nav is just prev/next plus a live position readout.
export function NavControls() {
  const current = useDeckStore((s) => s.current);
  const slides = useDeckStore((s) => s.slides);
  const next = useDeckStore((s) => s.next);
  const prev = useDeckStore((s) => s.prev);

  return (
    <div id="nav">
      <button className="nav-btn" type="button" aria-label="Previous" onClick={prev}>
        &#8592;
      </button>
      <div id="navPosition">
        {current + 1} / {slides.length}
      </div>
      <button className="nav-btn" type="button" aria-label="Next" onClick={next}>
        &#8594;
      </button>
    </div>
  );
}
