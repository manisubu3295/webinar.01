import { infraTypeGroups } from '@/content/raw/infraTypeGroups';
import { infraDetails } from '@/content/raw/infraDetails';
import { Eyebrow } from '@/components/shared/Misc';
import { TechList } from '@/components/shared/TechList';
import { RoughSketch } from '@/components/diagrams/RoughSketch';
import { drawInfraStackHighlighted } from '@/components/diagrams/sketches';

const HIGHLIGHTABLE = new Set(['os', 'cloud', 'orchestration', 'appserver']);

export function InfraTypeOverviewSlide({ typeKey }: { typeKey: string }) {
  const typeGroup = infraTypeGroups.find((g) => g.key === typeKey);
  if (!typeGroup) return null;
  const items = typeGroup.items.map((key, i) => {
    const d = (infraDetails as Record<string, { name: string; tagline: string }>)[key];
    return { num: String(i + 1), name: d.name, desc: d.tagline, clickable: true, key, tutorial: true };
  });
  return (
    <div className="text-pane">
      <div className="detail-content">
        <Eyebrow>INFRASTRUCTURE &amp; CLOUD &middot; TYPE OVERVIEW</Eyebrow>
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
        {HIGHLIGHTABLE.has(typeKey) && (
          <>
            <h3>Sketch: Where This Layer Sits</h3>
            <RoughSketch draw={drawInfraStackHighlighted(typeKey as 'os' | 'cloud' | 'orchestration' | 'appserver')} viewBox="0 0 340 150" height={150} maxWidth={500} />
          </>
        )}
        <h3>Technologies in this category</h3>
        <TechList items={items} groupKey="infra" />
      </div>
    </div>
  );
}
