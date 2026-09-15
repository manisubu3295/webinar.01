import { techDetails } from '@/content/raw/techDetails';
import { FolderTree, CodeBlock } from '@/components/shared/CodeBlocks';
import { DbQueryPlayground } from '@/components/playground/DbQueryPlayground';
import { LiveDemoPanel } from '@/components/playground/LiveDemoPanel';
import { TechLogo } from '@/components/shared/TechLogo';

type DbDetail = {
  name: string;
  tagline: string;
  whatIsIt: string;
  realExample: string;
  structureLabel?: string;
  folder: string;
  code: string;
  demoUrl: string;
  demoNote?: string;
  dbQueries?: { label: string; query: string; response: unknown }[];
};

export function DatabaseDetailSlide({ itemKey, index, total }: { itemKey: string; index: number; total: number }) {
  const d = (techDetails as unknown as Record<string, DbDetail>)[itemKey];
  if (!d) return null;
  return (
    <div className="text-pane">
      <div className="detail-content">
        <div className="eyebrow">
          DATABASE TECHNOLOGY &middot; {index + 1} OF {total}
        </div>
        <h2>
          <TechLogo itemKey={itemKey} size={26} />
          {d.name}
        </h2>
        <div className="modal-tagline">{d.tagline}</div>
        <h3>What is it?</h3>
        <p style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.6, maxWidth: '80ch', margin: '0 0 4px 0' }}>{d.whatIsIt}</p>
        <h3>Real-world example</h3>
        <div className="example-box">
          <strong>In practice:</strong> {d.realExample}
        </div>
        <h3>{d.structureLabel || 'Schema'}</h3>
        <div className="modal-columns">
          <FolderTree>{d.folder}</FolderTree>
          <CodeBlock>{d.code}</CodeBlock>
        </div>
        <DbQueryPlayground itemKey={itemKey} queries={d.dbQueries ?? []} />
        <h3>Live demo &mdash; call the real backend</h3>
        <LiveDemoPanel itemKey={itemKey} demoUrl={d.demoUrl} demoNote={d.demoNote} />
      </div>
    </div>
  );
}
