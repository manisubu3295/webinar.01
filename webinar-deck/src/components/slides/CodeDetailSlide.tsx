import { techDetails } from '@/content/raw/techDetails';
import { groupTitle, type GroupKey } from '@/content/groups';
import { FolderTree, CodeBlock } from '@/components/shared/CodeBlocks';
import { CodeRunner } from '@/components/playground/CodeRunner';
import { LiveDemoPanel } from '@/components/playground/LiveDemoPanel';
import { TechLogo } from '@/components/shared/TechLogo';

type TechDetail = {
  name: string;
  tagline: string;
  whatIsIt: string;
  realExample: string;
  structureLabel?: string;
  folder: string;
  code: string;
  runnable?: string;
  runLang?: string;
  demoUrl: string;
  demoNote?: string;
};

/** A frontend/backend technology tutorial: what it is, a starter project
 * layout, a runnable snippet, and a live-demo panel calling the
 * presenter's real backend. */
export function CodeDetailSlide({ groupKey, itemKey, index, total }: { groupKey: GroupKey; itemKey: string; index: number; total: number }) {
  const d = (techDetails as Record<string, TechDetail>)[itemKey];
  if (!d) return null;
  return (
    <div className="text-pane">
      <div className="detail-content">
        <div className="eyebrow">
          {groupTitle[groupKey].toUpperCase()} &middot; {index + 1} OF {total}
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
        <h3>{d.structureLabel || 'Project structure'}</h3>
        <div className="modal-columns">
          <FolderTree>{d.folder}</FolderTree>
          <CodeBlock>{d.code}</CodeBlock>
        </div>
        <div className="modal-note">The code block above is a minimal starter skeleton, not the live build. Swap it for the real billing-system implementation during the session.</div>
        <CodeRunner itemKey={itemKey} detail={d} />
        <h3>Live demo &mdash; call the real backend</h3>
        <LiveDemoPanel itemKey={itemKey} demoUrl={d.demoUrl} demoNote={d.demoNote} />
      </div>
    </div>
  );
}
