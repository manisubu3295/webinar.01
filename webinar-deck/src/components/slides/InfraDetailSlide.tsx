import { infraDetails } from '@/content/raw/infraDetails';
import { FolderTree, CodeBlock } from '@/components/shared/CodeBlocks';
import { InfraCommandPlayground } from '@/components/playground/InfraCommandPlayground';
import { TechLogo } from '@/components/shared/TechLogo';

type InfraDetail = {
  name: string;
  tagline: string;
  whatIsIt: string;
  realExample: string;
  structureLabel?: string;
  folder: string;
  code: string;
  commands?: { label: string; command: string; response: unknown }[];
};

export function InfraDetailSlide({ itemKey, index, total }: { itemKey: string; index: number; total: number }) {
  const d = (infraDetails as unknown as Record<string, InfraDetail>)[itemKey];
  if (!d) return null;
  return (
    <div className="text-pane">
      <div className="detail-content">
        <div className="eyebrow">
          INFRASTRUCTURE &amp; CLOUD &middot; {index + 1} OF {total}
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
        <h3>{d.structureLabel || 'Layout'}</h3>
        <div className="modal-columns">
          <FolderTree>{d.folder}</FolderTree>
          <CodeBlock>{d.code}</CodeBlock>
        </div>
        <InfraCommandPlayground itemKey={itemKey} commands={d.commands ?? []} />
      </div>
    </div>
  );
}
