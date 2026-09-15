'use client';

import { useDeckStore } from '@/lib/useDeckStore';
import { SlideRenderer } from './SlideRenderer';
import { slideMeta } from './slideMeta';
import { SceneCanvas } from '@/components/scene/SceneCanvas';

export function Stage() {
  const current = useDeckStore((s) => s.current);
  const leaving = useDeckStore((s) => s.leaving);
  const slides = useDeckStore((s) => s.slides);

  const currentSlide = slides[current];
  const currentMeta = slideMeta(currentSlide);
  const leavingSlide = leaving !== null ? slides[leaving] : null;
  const leavingMeta = leavingSlide ? slideMeta(leavingSlide) : null;

  return (
    <div className="stage">
      {leavingSlide && leavingMeta && (
        <div className={`slide-pane leaving ${leavingMeta.className}`}>
          <SlideRenderer slide={leavingSlide} />
        </div>
      )}
      <div className={`slide-pane active ${currentMeta.className}`}>
        <SlideRenderer slide={currentSlide} />
      </div>
      {currentMeta.sceneId && (
        <div className="stage-canvas-pane">
          <SceneCanvas sceneId={currentMeta.sceneId} />
        </div>
      )}
      {currentMeta.imageSrc && (
        <div className="stage-image-pane">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, external asset dropped into /public */}
          <img src={currentMeta.imageSrc} alt="" />
        </div>
      )}
    </div>
  );
}
