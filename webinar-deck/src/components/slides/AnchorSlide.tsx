import { anchorSlides } from '@/content/anchorSlides';
import { Eyebrow, MultilineText, MetaRow, Callout, CompareLink } from '@/components/shared/Misc';
import { TechList } from '@/components/shared/TechList';
import { RoughSketch } from '@/components/diagrams/RoughSketch';
import {
  drawRequestResponseSketch,
  drawTestPyramidSketch,
  drawRequirementGapSketch,
  drawGatherOverviewSketch,
  drawFrontendFlowSketch,
  drawChooseScaleSketch,
  drawDataShapesSketch,
  drawCicdSketch,
  drawClosingSketch,
  type SketchEntry,
} from '@/components/diagrams/sketches';

// One lead or supporting diagram per module-opening slide, grounded in the
// same retail-billing narrative the tutorials use. Q&A (slide-12) is an
// open floor with nothing to diagram, so it's left without one.
const anchorSketches: Record<string, SketchEntry & { position: 'before' | 'after' }> = {
  'slide-2': { title: 'From One Sentence to a Real System', draw: drawRequirementGapSketch, viewBox: '0 0 360 130', maxWidth: 640, position: 'before' },
  'slide-3': { title: 'Five Ways to Gather', draw: drawGatherOverviewSketch, viewBox: '0 0 330 90', maxWidth: 780, position: 'before' },
  'slide-4': { title: 'What the Frontend Actually Does', draw: drawFrontendFlowSketch, viewBox: '0 0 330 75', maxWidth: 720, position: 'before' },
  'slide-5': { title: 'Request / Response Flow', draw: drawRequestResponseSketch, viewBox: '0 0 460 130', maxWidth: 760, position: 'after' },
  'slide-6': { title: 'How the Choice Tips', draw: drawChooseScaleSketch, viewBox: '0 0 300 140', maxWidth: 560, position: 'before' },
  'slide-7': { title: 'Three Shapes of Data', draw: drawDataShapesSketch, viewBox: '0 0 380 125', maxWidth: 720, position: 'before' },
  'slide-9': { title: 'The Testing Pyramid', draw: drawTestPyramidSketch, viewBox: '0 0 340 140', maxWidth: 620, position: 'after' },
  'slide-10': { title: 'Ship Safely, Automatically', draw: drawCicdSketch, viewBox: '0 0 480 90', maxWidth: 780, position: 'before' },
  'slide-11': { title: 'What Changed, What Didn’t', draw: drawClosingSketch, viewBox: '0 0 440 170', maxWidth: 680, position: 'after' },
};

export function AnchorSlide({ anchorId }: { anchorId: string }) {
  const anchor = anchorSlides.find((a) => a.id === anchorId);
  if (!anchor) return null;
  const sketch = anchorSketches[anchorId];

  const sketchBlock = sketch && (
    <div style={{ margin: sketch.position === 'before' ? '18px 0 6px' : '20px 0 0' }}>
      <h3 style={{ marginTop: 0 }}>{sketch.title}</h3>
      <RoughSketch draw={sketch.draw} viewBox={sketch.viewBox} maxWidth={sketch.maxWidth} />
    </div>
  );

  return (
    <div className="text-pane">
      <Eyebrow>{anchor.eyebrow}</Eyebrow>
      <h1 className="slide-title" style={anchor.title.length > 24 ? { fontSize: 'clamp(28px,3.6vw,44px)' } : undefined}>
        <MultilineText text={anchor.title} />
      </h1>
      {sketch?.position === 'before' && sketchBlock}
      <TechList items={anchor.techList} groupKey={anchor.expand} />
      <Callout callout={anchor.callout} />
      {sketch?.position === 'after' && sketchBlock}
      <MetaRow items={anchor.meta} />
      {anchor.compareGroup && <CompareLink groupKey={anchor.compareGroup} />}
    </div>
  );
}
