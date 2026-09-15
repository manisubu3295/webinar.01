import type { Slide, JumpIndex } from './types';
import { moduleDividers } from '@/content/moduleDividers';
import { anchorSlides } from '@/content/anchorSlides';
import { groupItems, groupTitle, type GroupKey } from '@/content/groups';
import { techDetails } from '@/content/raw/techDetails';
import { conceptDetails } from '@/content/raw/conceptDetails';
import { infraDetails } from '@/content/raw/infraDetails';
import { dbTypeGroups } from '@/content/raw/dbTypeGroups';
import { infraTypeGroups } from '@/content/raw/infraTypeGroups';
import { comparisonData } from '@/content/raw/comparisonData';
import { quizData } from '@/content/raw/quizData';
import { aiImpact } from '@/content/aiImpact';

export type JumpTarget = { label: string; tag: string; index: number };

type Named = Record<string, { name: string }>;
const names: Record<string, string> = {
  ...Object.fromEntries(Object.entries(techDetails as Named).map(([k, v]) => [k, v.name])),
  ...Object.fromEntries(Object.entries(conceptDetails as Named).map(([k, v]) => [k, v.name])),
  ...Object.fromEntries(Object.entries(infraDetails as Named).map(([k, v]) => [k, v.name])),
};

/** Every slide in the deck a presenter would reasonably want to jump
 * straight to, live — every module, every segment intro, every
 * technology/concept/infra tutorial, every comparison table, every quiz
 * — flattened into one searchable list. Built once from the same
 * content the rest of the deck already renders from, not duplicated. */
export function buildJumpTargets(slides: Slide[], jumpIndex: JumpIndex): JumpTarget[] {
  const targets: JumpTarget[] = [];

  moduleDividers.forEach((d) => {
    const idx = slides.findIndex((s) => s.kind === 'divider' && s.seg === d.seg);
    if (idx >= 0) targets.push({ label: d.title, tag: `Module ${d.num}`, index: idx });
  });

  anchorSlides.forEach((a) => {
    const idx = slides.findIndex((s) => s.kind === 'anchor' && s.anchorId === a.id);
    if (idx >= 0) targets.push({ label: a.title.replace(/\n/g, ' '), tag: 'Segment', index: idx });
  });

  (Object.keys(groupItems) as GroupKey[]).forEach((groupKey) => {
    groupItems[groupKey].forEach((itemKey) => {
      const idx = jumpIndex[groupKey]?.[itemKey];
      if (typeof idx === 'number') {
        targets.push({ label: names[itemKey] ?? itemKey, tag: groupTitle[groupKey], index: idx });
      }
    });
  });

  Object.entries(comparisonData as Record<string, { title: string }>).forEach(([groupKey, d]) => {
    const idx = jumpIndex[groupKey]?.__comparison;
    if (typeof idx === 'number') targets.push({ label: d.title, tag: 'Comparison', index: idx });
  });

  Object.entries(quizData as Record<string, { title: string }>).forEach(([groupKey, d]) => {
    const idx = jumpIndex[groupKey]?.__quiz;
    if (typeof idx === 'number') targets.push({ label: d.title, tag: 'Quiz', index: idx });
  });

  dbTypeGroups.forEach((g) => {
    const idx = slides.findIndex((s) => s.kind === 'dbTypeOverview' && s.typeKey === g.key);
    if (idx >= 0) targets.push({ label: g.title, tag: 'Database Type', index: idx });
  });

  infraTypeGroups.forEach((g) => {
    const idx = slides.findIndex((s) => s.kind === 'infraTypeOverview' && s.typeKey === g.key);
    if (idx >= 0) targets.push({ label: g.title, tag: 'Infra Type', index: idx });
  });

  moduleDividers.forEach((d) => {
    if (!aiImpact[d.seg]) return;
    const idx = slides.findIndex((s) => s.kind === 'aiImpact' && s.seg === d.seg);
    if (idx >= 0) targets.push({ label: `AI Impact — ${d.title}`, tag: 'AI Impact', index: idx });
  });

  return targets;
}
