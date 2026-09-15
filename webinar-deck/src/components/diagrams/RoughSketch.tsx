'use client';

import { useEffect, useRef } from 'react';
import rough from 'roughjs';

export type SketchDrawFn = (rc: ReturnType<typeof rough.svg>, svg: SVGSVGElement) => void;

/** A hand-drawn, Excalidraw-style diagram, generated at runtime by
 * rough.js — no external assets, fully reproducible, on-brand colors.
 *
 * Sizes itself from the viewBox's own aspect ratio (via CSS
 * `aspect-ratio`) rather than a fixed pixel height, so it always fills
 * the width it's given instead of rendering as a short strip — and sits
 * inside a bordered, padded frame so it reads as a deliberate figure,
 * not a stray doodle in the corner. */
export function RoughSketch({ draw, viewBox, maxWidth = 720 }: { draw: SketchDrawFn; viewBox: string; maxWidth?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const parts = viewBox.trim().split(/\s+/).map(Number);
  const [, , vbW, vbH] = parts.length === 4 ? parts : [0, 0, 480, 200];

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const rc = rough.svg(svg);
    draw(rc, svg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draw]);

  return (
    <div className="sketch-frame" style={{ maxWidth }}>
      <svg ref={ref} viewBox={viewBox} style={{ display: 'block', width: '100%', aspectRatio: `${vbW} / ${vbH}` }} />
    </div>
  );
}
