import { moduleDividers } from '@/content/moduleDividers';
import { SheetStamp } from '@/components/shared/Misc';
import { RoughSketch } from '@/components/diagrams/RoughSketch';
import { drawRoadmapSketch } from '@/components/diagrams/sketches';

// Which roadmap stage(s) each module divider lights up — the same 8-stage
// journey (Gather → Tech → Database → Architect → Build → Test → Deploy →
// Run) the requirement travels through, end to end.
const stageIndices: Record<string, number[]> = {
  '1': [0],
  '2': [1],
  '3': [2],
  '4': [3],
  '5': [4, 5],
  '6': [6, 7],
};

export function ModuleDividerSlide({ seg }: { seg: string }) {
  const divider = moduleDividers.find((d) => d.seg === seg);
  if (!divider) return null;
  const stages = stageIndices[seg];
  return (
    <div className="text-pane">
      <SheetStamp num={divider.num} of="of 8 modules" />
      <h1 className="divider-title">{divider.title}</h1>
      <p className="divider-desc">{divider.desc}</p>
      <div className="divider-contents">
        {divider.contents.map((c, i) => (
          <div className="divider-content-item" key={i}>
            {c}
          </div>
        ))}
      </div>
      {stages && (
        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
          <RoughSketch draw={drawRoadmapSketch(stages)} viewBox="0 0 360 80" height={80} maxWidth={480} />
        </div>
      )}
    </div>
  );
}
