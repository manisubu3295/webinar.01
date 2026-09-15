import type { Slide } from '@/lib/types';
import { TitleSlide } from '@/components/slides/TitleSlide';
import { OverviewSlide } from '@/components/slides/OverviewSlide';
import { ModuleDividerSlide } from '@/components/slides/ModuleDividerSlide';
import { AnchorSlide } from '@/components/slides/AnchorSlide';
import { ConceptDetailSlide } from '@/components/slides/ConceptDetailSlide';
import { CodeDetailSlide } from '@/components/slides/CodeDetailSlide';
import { DatabaseDetailSlide } from '@/components/slides/DatabaseDetailSlide';
import { DbTypeOverviewSlide } from '@/components/slides/DbTypeOverviewSlide';
import { InfraDetailSlide } from '@/components/slides/InfraDetailSlide';
import { InfraTypeOverviewSlide } from '@/components/slides/InfraTypeOverviewSlide';
import { ComparisonSlide } from '@/components/slides/ComparisonSlide';
import { QuizSlide } from '@/components/slides/QuizSlide';
import { AiImpactSlide } from '@/components/slides/AiImpactSlide';

export function SlideRenderer({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case 'title':
      return <TitleSlide />;
    case 'overview':
      return <OverviewSlide />;
    case 'divider':
      return <ModuleDividerSlide seg={slide.seg} />;
    case 'anchor':
      return <AnchorSlide anchorId={slide.anchorId} />;
    case 'concept':
      return <ConceptDetailSlide groupKey={slide.groupKey} itemKey={slide.itemKey} index={slide.index} total={slide.total} />;
    case 'code':
      return <CodeDetailSlide groupKey={slide.groupKey} itemKey={slide.itemKey} index={slide.index} total={slide.total} />;
    case 'database':
      return <DatabaseDetailSlide itemKey={slide.itemKey} index={slide.index} total={slide.total} />;
    case 'dbTypeOverview':
      return <DbTypeOverviewSlide typeKey={slide.typeKey} />;
    case 'infra':
      return <InfraDetailSlide itemKey={slide.itemKey} index={slide.index} total={slide.total} />;
    case 'infraTypeOverview':
      return <InfraTypeOverviewSlide typeKey={slide.typeKey} />;
    case 'comparison':
      return <ComparisonSlide groupKey={slide.groupKey} />;
    case 'quiz':
      return <QuizSlide groupKey={slide.groupKey} />;
    case 'aiImpact':
      return <AiImpactSlide seg={slide.seg} />;
    default:
      return null;
  }
}
