import { anchorSlides } from '@/content/anchorSlides';
import { moduleDividers } from '@/content/moduleDividers';
import { groupItems, groupType, groupTitle, redundantSubGroups, comparisonGroups, type GroupKey } from '@/content/groups';
import { dbTypeGroups } from '@/content/raw/dbTypeGroups';
import { infraTypeGroups } from '@/content/raw/infraTypeGroups';
import { quizData } from '@/content/raw/quizData';
import { aiImpact } from '@/content/aiImpact';
import { careerPath } from '@/content/careerPath';
import type { JumpIndex, Slide } from './types';

/**
 * Builds the full, flat, ordered slide list — the static-data equivalent
 * of the original deck's expandAnchors(): walk each module divider, then
 * every anchor slide that belongs to it, and if the anchor is expandable,
 * insert one detail slide per item (plus type-overview and comparison and
 * quiz slides where the original algorithm calls for them) — in exactly
 * the same order, so navigation, the schedule rail and jumpIndex all line
 * up with the live event's run-of-show.
 */
export function buildDeck(): { slides: Slide[]; jumpIndex: JumpIndex } {
  const slides: Slide[] = [{ kind: 'title', seg: '0' }, { kind: 'overview', seg: '0' }];
  const jumpIndex: JumpIndex = {};

  const jump = (group: string) => (jumpIndex[group] ??= {});

  for (const divider of moduleDividers) {
    slides.push({ kind: 'divider', seg: divider.seg });

    const anchorsForSeg = anchorSlides.filter((a) => a.seg === divider.seg);
    for (const anchor of anchorsForSeg) {
      slides.push({ kind: 'anchor', seg: anchor.seg, sub: undefined, anchorId: anchor.id });

      const groupKey = anchor.expand as GroupKey | undefined;
      if (!groupKey) continue;

      const items = groupItems[groupKey];
      const type = groupType[groupKey];
      const sub = redundantSubGroups.has(groupKey) ? undefined : groupTitle[groupKey];

      if (groupKey === 'database') {
        for (const typeGroup of dbTypeGroups) {
          slides.push({ kind: 'dbTypeOverview', seg: anchor.seg, sub: typeGroup.title, typeKey: typeGroup.key, sceneId: `dbtype-${typeGroup.key}` });
          typeGroup.items.forEach((itemKey, i) => {
            slides.push({ kind: 'database', seg: anchor.seg, sub: typeGroup.title, itemKey, index: i, total: typeGroup.items.length });
            jump('database')[itemKey] = slides.length - 1;
          });
        }
      } else {
        items.forEach((itemKey, i) => {
          if (type === 'code') {
            slides.push({ kind: 'code', seg: anchor.seg, sub, groupKey, itemKey, index: i, total: items.length });
          } else {
            const sceneId = `ci-${groupKey}-${itemKey}`;
            slides.push({ kind: 'concept', seg: anchor.seg, sub, groupKey, itemKey, index: i, total: items.length, sceneId });
          }
          jump(groupKey)[itemKey] = slides.length - 1;
        });

        if (groupKey === 'devops') {
          for (const typeGroup of infraTypeGroups) {
            slides.push({ kind: 'infraTypeOverview', seg: anchor.seg, sub: typeGroup.title, typeKey: typeGroup.key, sceneId: `infratype-${typeGroup.key}` });
            typeGroup.items.forEach((itemKey, i) => {
              slides.push({ kind: 'infra', seg: anchor.seg, sub: typeGroup.title, itemKey, index: i, total: typeGroup.items.length });
              jump('infra')[itemKey] = slides.length - 1;
            });
          }
          slides.push({ kind: 'comparison', seg: anchor.seg, groupKey: 'infra' as GroupKey, sceneId: 'cmp-infra', sub: 'Comparison' });
          jump('infra').__comparison = slides.length - 1;
        }
      }

      if (comparisonGroups.has(groupKey)) {
        slides.push({ kind: 'comparison', seg: anchor.seg, groupKey, sceneId: `cmp-${groupKey}`, sub: 'Comparison' });
        jump(groupKey).__comparison = slides.length - 1;
      }

      if ((quizData as Record<string, unknown>)[groupKey]) {
        slides.push({ kind: 'quiz', seg: anchor.seg, groupKey, sub: 'Module Check' });
        jump(groupKey).__quiz = slides.length - 1;
      }
    }

    // One AI Impact reflection slide closes out each module that has
    // content to reflect on (1-6) — Closing already serves this role for
    // the whole session, Live Q&A has no content of its own.
    if (aiImpact[divider.seg]) {
      slides.push({ kind: 'aiImpact', seg: divider.seg });
      jump('aiImpact')[divider.seg] = slides.length - 1;
    }

    // Right after that, one Career Path roadmap slide — modules 1-6 get
    // a role-ladder roadmap, module 7 (Closing) gets the full-stack
    // capstone roadmap tying all six together.
    if (careerPath[divider.seg]) {
      slides.push({ kind: 'career', seg: divider.seg });
      jump('career')[divider.seg] = slides.length - 1;
    }
  }

  return { slides, jumpIndex };
}
