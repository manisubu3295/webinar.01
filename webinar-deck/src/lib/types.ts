import type { GroupKey } from '@/content/groups';

export type TechListItem = {
  num: string;
  name: string;
  desc: string;
  clickable?: boolean;
  key?: string;
  tutorial?: boolean;
};

export type MetaItem = { label: string; value: string };
export type Callout = { label?: string; body: string };

export type AnchorSlideContent = {
  id: string;
  seg: string;
  expand?: string;
  eyebrow: string;
  title: string;
  techList: TechListItem[];
  callout?: Callout;
  meta: MetaItem[];
  compareGroup?: string;
  sketch?: { title: string; svgId: string };
  sceneId?: string;
};

export type ModuleDividerContent = {
  id: string;
  seg: string;
  num: string;
  title: string;
  desc: string;
  contents: string[];
};

export type TitleContent = {
  brandLine: string;
  brandSub: string;
  heroTitle: string;
  heroSub: string;
  heroTag: string;
  desc: string;
  panel: { initials: string; name: string; role: string }[];
};

export type OverviewContent = {
  eyebrow: string;
  title: string;
  items: { num: string; name: string; desc: string }[];
  sceneId?: string;
};

// The flattened, ordered slide list — the direct equivalent of what
// expandAnchors() produces at runtime in the original deck, but computed
// once, statically, as typed data.
export type Slide =
  | { kind: 'title'; seg: '0' }
  | { kind: 'overview'; seg: '0' }
  | { kind: 'divider'; seg: string }
  | { kind: 'anchor'; seg: string; sub?: string; anchorId: string }
  | {
      kind: 'concept';
      seg: string;
      sub?: string;
      groupKey: GroupKey;
      itemKey: string;
      index: number;
      total: number;
      sceneId: string;
    }
  | {
      kind: 'code';
      seg: string;
      sub?: string;
      groupKey: GroupKey;
      itemKey: string;
      index: number;
      total: number;
    }
  | {
      kind: 'dbTypeOverview';
      seg: string;
      sub: string;
      typeKey: string;
      sceneId: string;
    }
  | {
      kind: 'database';
      seg: string;
      sub: string;
      itemKey: string;
      index: number;
      total: number;
    }
  | {
      kind: 'infraTypeOverview';
      seg: string;
      sub: string;
      typeKey: string;
      sceneId: string;
    }
  | {
      kind: 'infra';
      seg: string;
      sub: string;
      itemKey: string;
      index: number;
      total: number;
    }
  | { kind: 'comparison'; seg: string; groupKey: GroupKey; sceneId: string; sub: string }
  | { kind: 'quiz'; seg: string; groupKey: GroupKey; sub: string }
  | { kind: 'aiImpact'; seg: string }
  | { kind: 'career'; seg: string };

export type JumpIndex = Record<string, Record<string, number>>;
