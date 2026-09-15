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
        {typeKey === 'orchestration' && (
          <>
            <h3>Server vs. Docker vs. Container</h3>
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, external asset in /public */}
            <img
              src="/images/ai-impact/ai-impact-devops-server-docker-container.png"
              alt="A layered diagram showing a server running Docker, which runs several isolated containers, plus a before/after comparison of apps installed directly versus sealed in containers"
              style={{ width: '100%', maxWidth: 720, borderRadius: 6, marginBottom: 4 }}
            />
          </>
        )}
        {HIGHLIGHTABLE.has(typeKey) && (
          <>
            <h3>Sketch: Where This Layer Sits</h3>
            <RoughSketch draw={drawInfraStackHighlighted(typeKey as 'os' | 'cloud' | 'orchestration' | 'appserver')} viewBox="0 0 340 150" maxWidth={640} />
          </>
        )}
        <h3>Technologies in this category</h3>
        <TechList items={items} groupKey="infra" />
      </div>
    </div>
  );
}
