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
// floating 3D shape this slide used to carry. Sized close to the full
// column width so it reads as the slide's centerpiece, not a corner note.
const itemSketches: Record<string, SketchEntry> = {
  interview: { title: 'One Question at a Time', draw: drawInterviewSketch, viewBox: '0 0 280 120', maxWidth: 620 },
  observation: { title: 'Watch, Don’t Ask', draw: drawObservationSketch, viewBox: '0 0 280 120', maxWidth: 600 },
  docstudy: { title: 'Every Form Currently in Use', draw: drawDocStudySketch, viewBox: '0 0 330 100', maxWidth: 680 },
  prototype: { title: 'A Clickable Mock, First', draw: drawPrototypeSketch, viewBox: '0 0 300 135', maxWidth: 560 },
  workshop: { title: 'One Room, Facilitated', draw: drawWorkshopSketch, viewBox: '0 0 280 145', maxWidth: 560 },
  hire: { title: 'Five Years From Now', draw: drawHireSketch, viewBox: '0 0 280 145', maxWidth: 560 },
  teamskill: { title: 'Familiar Beats Fashionable', draw: drawTeamSkillSketch, viewBox: '0 0 180 130', maxWidth: 440 },
  ecosystem: { title: 'Does the Ecosystem Fit?', draw: drawEcosystemSketch, viewBox: '0 0 300 125', maxWidth: 640 },
  operate: { title: 'Fewer Moving Parts', draw: drawOperateSketch, viewBox: '0 0 280 130', maxWidth: 560 },
  monolith: { title: 'One Program, Everything Inside', draw: drawMonolithSketch, viewBox: '0 0 300 150', maxWidth: 560 },
  modular: { title: 'Divided Inside, One Deploy', draw: drawModularSketch, viewBox: '0 0 300 150', maxWidth: 560 },
  microservices: { title: 'Many Small, Independent Programs', draw: drawMicroservicesSketch, viewBox: '0 0 280 150', maxWidth: 580 },
  unit: { title: 'One Function, Checked Alone', draw: drawUnitTestSketch, viewBox: '0 0 280 115', maxWidth: 600 },
  integration: { title: 'Code Plus the Real Database', draw: drawIntegrationTestSketch, viewBox: '0 0 300 115', maxWidth: 640 },
  concurrency: { title: 'Two Counters, Same Second', draw: drawConcurrencySketch, viewBox: '0 0 280 135', maxWidth: 580 },
  monitoring: { title: 'A Checkup Every Second', draw: drawMonitoringSketch, viewBox: '0 0 300 135', maxWidth: 640 },
};

// The concrete "without this / with this" consequence for our 40-store
// build — the payoff that turns "here's what X is" into "here's why it
// matters for the system we're actually building." Scoped to the
// architecture and DevOps decisions, where the stakes are clearest.
const impactNotes: Record<string, string> = {
  monolith: 'A bug in the returns logic takes billing down in all 40 stores at once, until it’s fixed and redeployed.',
  modular: 'A bug stays contained to its module in the code — but the whole system still deploys, restarts, and goes down together.',
  microservices: 'A bug in one service doesn’t take down billing elsewhere — but now 40 stores depend on several independent services staying in sync with each other.',
  hybrid: 'Each store keeps its own local copy running, so billing never fully stops — even the day the link to head office drops.',
  cicd: 'Without it: a typo in the refund logic ships straight to all 40 stores. With it: caught in the test stage before it reaches a single one.',
  monitoring: 'Without it: a failing payment integration goes unnoticed until store staff start calling head office. With it: an alert fires within seconds.',
  rollback: 'Without it: a bad deploy stays broken in 40 stores until someone fixes it live. With it: the system reverts to the last working version automatically.',
};

export function ConceptDetailSlide({ groupKey, itemKey, index, total }: { groupKey: GroupKey; itemKey: string; index: number; total: number }) {
  const d = (conceptDetails as Record<string, ConceptDetail>)[itemKey];
  if (!d) return null;
  const sketch = itemSketches[itemKey];
  const impact = impactNotes[itemKey];
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
            <RoughSketch draw={sketch.draw} viewBox={sketch.viewBox} maxWidth={sketch.maxWidth} />
          </>
        )}
        {d.sketch === 'cicd' && (
          <>
            <h3>Sketch</h3>
            <RoughSketch draw={drawCicdSketch} viewBox="0 0 480 150" maxWidth={780} />
          </>
        )}
        {d.sketch === 'rollback' && (
          <>
            <h3>Sketch</h3>
            <RoughSketch draw={drawRollbackSketch} viewBox="0 0 480 150" maxWidth={780} />
          </>
        )}
        {groupKey === 'architecture' && itemKey === 'hybrid' && (
          <>
            <h3>Sketch: The Shape We Actually Build</h3>
            <RoughSketch draw={drawHybridSketch} viewBox="0 0 350 175" maxWidth={620} />
          </>
        )}
        {itemKey === 'interview' && (
          <>
            <h3>Sequence: A Return, Start to Finish</h3>
            <RoughSketch draw={drawReturnSequenceSketch} viewBox="0 0 480 225" maxWidth={780} />
          </>
        )}
        {impact && (
          <div className="impact-box">
            <span className="impact-label">Impact on our 40 stores</span>
            {impact}
          </div>
        )}
      </div>
    </div>
  );
}
