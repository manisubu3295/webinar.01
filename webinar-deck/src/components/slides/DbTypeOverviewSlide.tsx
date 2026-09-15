import { dbTypeGroups } from '@/content/raw/dbTypeGroups';
import { techDetails } from '@/content/raw/techDetails';
import { Eyebrow } from '@/components/shared/Misc';
import { TechList } from '@/components/shared/TechList';
import { RoughSketch } from '@/components/diagrams/RoughSketch';
import { drawDbSchemaSketch, drawNoSqlSketch } from '@/components/diagrams/sketches';

export function DbTypeOverviewSlide({ typeKey }: { typeKey: string }) {
  const typeGroup = dbTypeGroups.find((g) => g.key === typeKey);
  if (!typeGroup) return null;
  const items = typeGroup.items.map((key, i) => {
    const d = (techDetails as Record<string, { name: string; tagline: string }>)[key];
    return { num: String(i + 1), name: d.name, desc: d.tagline, clickable: true, key, tutorial: true };
  });
  return (
    <div className="text-pane">
      <div className="detail-content">
        <Eyebrow>DATABASE TECHNOLOGY &middot; TYPE OVERVIEW</Eyebrow>
        <h2>{typeGroup.title}</h2>
        <div className="modal-tagline">{typeGroup.tagline}</div>
        <h3>What it actually means</h3>
        <p style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.6, maxWidth: '80ch', margin: '0 0 4px 0' }}>{typeGroup.explanation}</p>
        <h3>Example</h3>
        <div className="example-box">
          <strong>In practice:</strong> {typeGroup.example}
        </div>
        <h3>When to use it</h3>
        <div className="example-box">{typeGroup.whenToUse}</div>
        {typeKey === 'relational' && (
          <>
            <h3>Sketch: One Customer, Many Invoices</h3>
            <RoughSketch draw={drawDbSchemaSketch} viewBox="0 0 400 110" maxWidth={700} />
          </>
        )}
        {typeKey === 'nosql' && (
          <>
            <h3>Sketch: No Fixed Shape</h3>
            <RoughSketch draw={drawNoSqlSketch} viewBox="0 0 370 130" maxWidth={700} />
          </>
        )}
        <h3>Databases in this category</h3>
        <TechList items={items} groupKey="database" />
      </div>
    </div>
  );
}
