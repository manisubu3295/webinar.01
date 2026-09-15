import { comparisonData } from '@/content/raw/comparisonData';
import { groupTitle, type GroupKey } from '@/content/groups';
import { Eyebrow } from '@/components/shared/Misc';
import { RoughSketch } from '@/components/diagrams/RoughSketch';
import { drawArchComparisonSketch, drawInfraStackSketch } from '@/components/diagrams/sketches';

type Comparison = { title: string; tagline: string; columns: string[]; rows: string[][] };

export function ComparisonSlide({ groupKey }: { groupKey: GroupKey }) {
  const d = (comparisonData as unknown as Record<string, Comparison>)[groupKey];
  if (!d) return null;
  return (
    <div className="text-pane">
      <div className="detail-content">
        <Eyebrow>
          {groupTitle[groupKey].toUpperCase()} &middot; COMPARISON
        </Eyebrow>
        <h2>{d.title}</h2>
        <div className="modal-tagline">{d.tagline}</div>
        <table className="compare-table">
          <thead>
            <tr>
              {d.columns.map((c, i) => (
                <th key={i}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {groupKey === 'architecture' && (
          <>
            <h3>Sketch: Monolith vs. Microservices</h3>
            <RoughSketch draw={drawArchComparisonSketch} viewBox="0 0 340 160" height={160} maxWidth={360} />
          </>
        )}
        {groupKey === 'infra' && (
          <>
            <h3>Sketch: Four Layers, Not Four Choices</h3>
            <RoughSketch draw={drawInfraStackSketch} viewBox="0 0 340 150" height={150} maxWidth={360} />
          </>
        )}
      </div>
    </div>
  );
}
