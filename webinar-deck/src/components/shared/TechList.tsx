'use client';

import { useDeckStore } from '@/lib/useDeckStore';
import type { TechListItem } from '@/lib/types';
import { TechLogo } from './TechLogo';

/** The numbered list of items used on every anchor and overview slide.
 * Clickable items (data-tech in the original) jump straight to that
 * item's own detail slide. */
export function TechList({ items, groupKey }: { items: TechListItem[]; groupKey?: string }) {
  const jumpToItem = useDeckStore((s) => s.jumpToItem);
  return (
    <div className="tech-list">
      {items.map((item, i) => {
        const clickable = item.clickable && groupKey && item.key;
        const Wrapper = clickable ? 'button' : 'div';
        return (
          <Wrapper
            key={i}
            type={clickable ? 'button' : undefined}
            className={`tech-item${clickable ? ' tech-clickable' : ''}`}
            onClick={clickable ? () => jumpToItem(groupKey!, item.key!) : undefined}
            style={clickable ? { background: 'none', border: 'none', textAlign: 'left', font: 'inherit', width: '100%' } : undefined}
          >
            <div className="tech-num">{item.num}</div>
            <div>
              <div className="tech-name">
                {item.key && <TechLogo itemKey={item.key} />}
                {item.name}
                {item.tutorial && <span className="tech-hint">tutorial</span>}
              </div>
              <div className="tech-desc">{item.desc}</div>
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}
