import type { Slide } from '@/lib/types';
import { anchorSlides } from '@/content/anchorSlides';
import { titleCoverImage, dividerImageBySeg, anchorImageByAnchorId, aiImpactImageBySeg } from '@/lib/dividerImages';

// The only two slides that keep a 3D scene: the opening agenda (right
// after the title) and the architecture walkthrough — one hero moment at
// the start, one at the module that's genuinely about spatial structure.
// Every other slide reasons in flat diagrams instead of a floating shape,
// so its.text-pane can use the full width.
const ARCHITECTURE_ANCHOR_ID = 'slide-8';

/** The CSS modifier classes a slide's pane needs, which scene (if any)
 * should render in the shared canvas while it's active, and which hero
 * illustration (if any) fills the opposite half. Mirrors the original
 * deck's per-slide classes (.detail-slide, .text-only, .module-divider)
 * exactly. */
export function slideMeta(slide: Slide): { className: string; sceneId: string | undefined; imageSrc: string | undefined } {
  switch (slide.kind) {
    case 'title':
      return { className: 'title-slide', sceneId: undefined, imageSrc: titleCoverImage };
    case 'overview':
      return { className: '', sceneId: 'c1', imageSrc: undefined };
    case 'divider':
      return { className: 'module-divider', sceneId: undefined, imageSrc: dividerImageBySeg[slide.seg] };
    case 'anchor': {
      const isArchitecture = slide.anchorId === ARCHITECTURE_ANCHOR_ID;
      if (isArchitecture) {
        const anchor = anchorSlides.find((a) => a.id === slide.anchorId);
        return { className: '', sceneId: anchor?.sceneId, imageSrc: undefined };
      }
      return { className: 'detail-slide', sceneId: undefined, imageSrc: anchorImageByAnchorId[slide.anchorId] };
    }
    case 'concept':
      return { className: 'detail-slide text-only', sceneId: undefined, imageSrc: undefined };
    case 'code':
      return { className: 'detail-slide text-only', sceneId: undefined, imageSrc: undefined };
    case 'database':
      return { className: 'detail-slide text-only', sceneId: undefined, imageSrc: undefined };
    case 'infra':
      return { className: 'detail-slide text-only', sceneId: undefined, imageSrc: undefined };
    case 'dbTypeOverview':
      return { className: 'detail-slide text-only', sceneId: undefined, imageSrc: undefined };
    case 'infraTypeOverview':
      return { className: 'detail-slide text-only', sceneId: undefined, imageSrc: undefined };
    case 'comparison':
      return { className: 'detail-slide text-only', sceneId: undefined, imageSrc: undefined };
    case 'quiz':
      return { className: 'detail-slide text-only', sceneId: undefined, imageSrc: undefined };
    case 'aiImpact':
      return { className: 'detail-slide ai-impact-slide', sceneId: undefined, imageSrc: aiImpactImageBySeg[slide.seg] };
  }
}

// One small, consistent icon per slide *kind* (not per slide) — the
// disciplined way to put "an icon on every slide" without reopening the
// seductive-details problem the dense content slides were deliberately
// cleared of earlier in this project. Kinds that already carry a full
// hero illustration (title, divider, the 3D-scene slides) get none.
const KIND_ICON: Partial<Record<Slide['kind'], string>> = {
  anchor: '/images/kind-icons/anchor.webp',
  concept: '/images/kind-icons/concept.webp',
  code: '/images/kind-icons/code.webp',
  database: '/images/kind-icons/database.webp',
  infra: '/images/kind-icons/infra.webp',
  dbTypeOverview: '/images/kind-icons/typeOverview.webp',
  infraTypeOverview: '/images/kind-icons/typeOverview.webp',
  comparison: '/images/kind-icons/comparison.webp',
  quiz: '/images/kind-icons/quiz.webp',
  aiImpact: '/images/kind-icons/aiImpact.webp',
};

export function slideKindIcon(slide: Slide): string | undefined {
  // The one anchor slide that keeps its 3D scene already carries plenty
  // of visual weight — skip the icon there specifically.
  if (slide.kind === 'anchor' && slide.anchorId === ARCHITECTURE_ANCHOR_ID) return undefined;
  return KIND_ICON[slide.kind];
}

/** The breadcrumb sub-label, when this slide's kind carries one. */
export function slideSub(slide: Slide): string | undefined {
  switch (slide.kind) {
    case 'concept':
    case 'code':
    case 'database':
    case 'infra':
      return slide.sub;
    case 'dbTypeOverview':
    case 'infraTypeOverview':
      return slide.sub;
    case 'comparison':
    case 'quiz':
      return slide.sub;
    default:
      return undefined;
  }
}
