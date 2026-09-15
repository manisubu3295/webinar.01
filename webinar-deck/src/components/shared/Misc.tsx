'use client';

import { useDeckStore } from '@/lib/useDeckStore';
import type { Callout as CalloutType, MetaItem } from '@/lib/types';

export function MetaRow({ items }: { items: MetaItem[] }) {
  if (!items.length) return null;
  return (
    <div className="meta-row" style={{ marginTop: 16 }}>
      {items.map((m, i) => (
        <div className="meta-item" key={i}>
          <div className="meta-label">{m.label}</div>
          <div className="meta-value">{m.value}</div>
        </div>
      ))}
    </div>
  );
}

export function Callout({ callout }: { callout?: CalloutType }) {
  if (!callout) return null;
  return (
    <div className="callout">
      {callout.label && <strong>{callout.label}: </strong>}
      {callout.body}
    </div>
  );
}

export function CompareLink({ groupKey }: { groupKey: string }) {
  const jumpToItem = useDeckStore((s) => s.jumpToItem);
  return (
    <div className="back-link compare-link" style={{ marginTop: 14 }} onClick={() => jumpToItem(groupKey, '__comparison')}>
      See full comparison table &rarr;
    </div>
  );
}

export function BackLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="back-link" onClick={onClick}>
      &larr; {label}
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

/** Renders a title that may carry \n line breaks (ported from the
 * original deck's <br/> tags) as real <br/> elements. */
export function MultilineText({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

/** The "01 of 8 modules" bordered stamp on each module divider. */
export function SheetStamp({ num, of }: { num: string; of: string }) {
  return (
    <div className="sheet-stamp">
      <span className="stamp-num">{num}</span>
      <span className="stamp-of">{of}</span>
    </div>
  );
}
