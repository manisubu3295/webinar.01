import { conceptDetails } from '@/content/raw/conceptDetails';
import { groupTitle, type GroupKey } from '@/content/groups';
import { RoughSketch } from '@/components/diagrams/RoughSketch';
import {
  drawCicdSketch,
  drawRollbackSketch,
  drawHybridSketch,
  drawInterviewSketch,
  drawObservationSketch,
  drawDocStudySketch,
  drawPrototypeSketch,
  drawWorkshopSketch,
  drawHireSketch,
  drawTeamSkillSketch,
  drawEcosystemSketch,
  drawOperateSketch,
  drawMonolithSketch,
  drawModularSketch,
  drawMicroservicesSketch,
  drawUnitTestSketch,
  drawIntegrationTestSketch,
  drawConcurrencySketch,
  drawMonitoringSketch,
  drawReturnSequenceSketch,
  type SketchEntry,
} from '@/components/diagrams/sketches';

type ConceptDetail = { name: string; tagline: string; explanation: string; example: string; whenToUse: string; sketch?: string };

// A flat, hand-drawn diagram per concept — grounded in the same retail
// billing project every module walks through — replacing the generic
// floating 3D shape this slide used to carry.
const itemSketches: Record<string, SketchEntry> = {
  interview: { title: 'One Question at a Time', draw: drawInterviewSketch, viewBox: '0 0 280 120', height: 120 },
  observation: { title: 'Watch, Don’t Ask', draw: drawObservationSketch, viewBox: '0 0 280 120', height: 120 },
  docstudy: { title: 'Every Form Currently in Use', draw: drawDocStudySketch, viewBox: '0 0 330 100', height: 100 },
  prototype: { title: 'A Clickable Mock, First', draw: drawPrototypeSketch, viewBox: '0 0 300 135', height: 135 },
  workshop: { title: 'One Room, Facilitated', draw: drawWorkshopSketch, viewBox: '0 0 280 145', height: 145 },
  hire: { title: 'Five Years From Now', draw: drawHireSketch, viewBox: '0 0 280 145', height: 145 },
  teamskill: { title: 'Familiar Beats Fashionable', draw: drawTeamSkillSketch, viewBox: '0 0 180 130', height: 130 },
  ecosystem: { title: 'Does the Ecosystem Fit?', draw: drawEcosystemSketch, viewBox: '0 0 300 125', height: 125 },
  operate: { title: 'Fewer Moving Parts', draw: drawOperateSketch, viewBox: '0 0 280 130', height: 130 },
  monolith: { title: 'One Program, Everything Inside', draw: drawMonolithSketch, viewBox: '0 0 300 150', height: 150 },
  modular: { title: 'Divided Inside, One Deploy', draw: drawModularSketch, viewBox: '0 0 300 150', height: 150 },
  microservices: { title: 'Many Small, Independent Programs', draw: drawMicroservicesSketch, viewBox: '0 0 280 150', height: 150 },
  unit: { title: 'One Function, Checked Alone', draw: drawUnitTestSketch, viewBox: '0 0 280 115', height: 115 },
  integration: { title: 'Code Plus the Real Database', draw: drawIntegrationTestSketch, viewBox: '0 0 300 115', height: 115 },
  concurrency: { title: 'Two Counters, Same Second', draw: drawConcurrencySketch, viewBox: '0 0 280 135', height: 135 },
  monitoring: { title: 'A Checkup Every Second', draw: drawMonitoringSketch, viewBox: '0 0 300 135', height: 135 },
};

export function ConceptDetailSlide({ groupKey, itemKey, index, total }: { groupKey: GroupKey; itemKey: string; index: number; total: number }) {
  const d = (conceptDetails as Record<string, ConceptDetail>)[itemKey];
  if (!d) return null;
  const sketch = itemSketches[itemKey];
  return (
    <div className="text-pane">
      <div className="detail-content">
        <div className="eyebrow">
          {groupTitle[groupKey].toUpperCase()} &middot; {index + 1} OF {total}
        </div>
        <h2>{d.name}</h2>
        <div className="modal-tagline">{d.tagline}</div>
        <h3>What it actually means</h3>
        <p style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.6, maxWidth: '80ch', margin: '0 0 4px 0' }}>{d.explanation}</p>
        <h3>Example</h3>
        <div className="example-box">
          <strong>In practice:</strong> {d.example}
        </div>
        <h3>When to use it</h3>
        <div className="example-box">{d.whenToUse}</div>
        {sketch && (
          <>
            <h3>{sketch.title}</h3>
            <RoughSketch draw={sketch.draw} viewBox={sketch.viewBox} height={sketch.height} maxWidth={520} />
          </>
        )}
        {d.sketch === 'cicd' && (
          <>
            <h3>Sketch</h3>
            <RoughSketch draw={drawCicdSketch} viewBox="0 0 480 150" height={150} />
          </>
        )}
        {d.sketch === 'rollback' && (
          <>
            <h3>Sketch</h3>
            <RoughSketch draw={drawRollbackSketch} viewBox="0 0 480 150" height={150} />
          </>
        )}
        {groupKey === 'architecture' && itemKey === 'hybrid' && (
          <>
            <h3>Sketch: The Shape We Actually Build</h3>
            <RoughSketch draw={drawHybridSketch} viewBox="0 0 350 175" height={175} maxWidth={400} />
          </>
        )}
        {itemKey === 'interview' && (
          <>
            <h3>Sequence: A Return, Start to Finish</h3>
            <RoughSketch draw={drawReturnSequenceSketch} viewBox="0 0 480 225" height={225} maxWidth={560} />
          </>
        )}
      </div>
    </div>
  );
}
