import type { Slide } from '@/lib/types';
import { anchorSlides } from '@/content/anchorSlides';

// The only two slides that keep a 3D scene: the opening agenda (right
// after the title) and the architecture walkthrough — one hero moment at
// the start, one at the module that's genuinely about spatial structure.
// Every other slide reasons in flat diagrams instead of a floating shape,
// so its.text-pane can use the full width.
const ARCHITECTURE_ANCHOR_ID = 'slide-8';

/** The CSS modifier classes a slide's pane needs, and which scene (if
 * any) should render in the shared canvas while it's active. Mirrors the
 * original deck's per-slide classes (.detail-slide, .text-only,
 * .module-divider) exactly. */
export function slideMeta(slide: Slide): { className: string; sceneId: string | undefined } {
  switch (slide.kind) {
    case 'title':
      return { className: 'title-slide', sceneId: undefined };
    case 'overview':
      return { className: '', sceneId: 'c1' };
    case 'divider':
      return { className: 'module-divider', sceneId: undefined };
    case 'anchor': {
      const isArchitecture = slide.anchorId === ARCHITECTURE_ANCHOR_ID;
      if (isArchitecture) {
        const anchor = anchorSlides.find((a) => a.id === slide.anchorId);
        return { className: '', sceneId: anchor?.sceneId };
      }
      return { className: 'detail-slide text-only', sceneId: undefined };
    }
    case 'concept':
      return { className: 'detail-slide text-only', sceneId: undefined };
    case 'code':
      return { className: 'detail-slide text-only', sceneId: undefined };
    case 'database':
      return { className: 'detail-slide text-only', sceneId: undefined };
    case 'infra':
      return { className: 'detail-slide text-only', sceneId: undefined };
    case 'dbTypeOverview':
      return { className: 'detail-slide text-only', sceneId: undefined };
    case 'infraTypeOverview':
      return { className: 'detail-slide text-only', sceneId: undefined };
    case 'comparison':
      return { className: 'detail-slide text-only', sceneId: undefined };
    case 'quiz':
      return { className: 'detail-slide text-only', sceneId: undefined };
  }
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
