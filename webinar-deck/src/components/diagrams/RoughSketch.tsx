'use client';

import { useEffect, useRef } from 'react';
import rough from 'roughjs';

export type SketchDrawFn = (rc: ReturnType<typeof rough.svg>, svg: SVGSVGElement) => void;

/** A hand-drawn, Excalidraw-style diagram, generated at runtime by
 * rough.js — no external assets, fully reproducible, on-brand colors. */
export function RoughSketch({ draw, viewBox, height = 150, maxWidth = 480 }: { draw: SketchDrawFn; viewBox: string; height?: number; maxWidth?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const rc = rough.svg(svg);
    draw(rc, svg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draw]);
  return <svg ref={ref} width="100%" height={height} viewBox={viewBox} style={{ maxWidth }} />;
}
