import {
  AgendaScene,
  RequirementCoreScene,
  GatherTechniquesScene,
  FrontendTreeScene,
  BackendStackScene,
  ChooseScaleScene,
  DatabaseDisksScene,
  ArchitectureGraphScene,
  TestingKnotScene,
  DevOpsPipelineScene,
  ClosingConeScene,
  QaOrbScene,
} from './moduleScenes';
import { conceptSceneRegistry } from './conceptScenes';
import { dbTypeSceneRegistry, infraTypeSceneRegistry } from './typeScenes';
import { ComparisonScene } from './ComparisonScene';
import { comparisonData } from '@/content/raw/comparisonData';

const moduleSceneRegistry: Record<string, React.ComponentType> = {
  c1: AgendaScene,
  c2: RequirementCoreScene,
  c3: GatherTechniquesScene,
  c4: FrontendTreeScene,
  c5: BackendStackScene,
  c6: ChooseScaleScene,
  c7: DatabaseDisksScene,
  c8: ArchitectureGraphScene,
  c9: TestingKnotScene,
  c10: DevOpsPipelineScene,
  c11: ClosingConeScene,
  c12: QaOrbScene,
};

/** Resolves a sceneId (as carried on a Slide) to the React element that
 * should render inside the shared <Canvas> for that slide. Returns null
 * for slides that carry no 3D scene (text-only tutorial detail slides). */
export function resolveScene(sceneId: string | undefined): React.ReactElement | null {
  if (!sceneId) return null;

  if (moduleSceneRegistry[sceneId]) {
    const Comp = moduleSceneRegistry[sceneId];
    return <Comp key={sceneId} />;
  }

  if (sceneId.startsWith('ci-')) {
    // ci-${groupKey}-${itemKey} — itemKey is everything after the second dash
    const itemKey = sceneId.split('-').slice(2).join('-');
    const Comp = conceptSceneRegistry[itemKey];
    return Comp ? <Comp key={sceneId} /> : null;
  }

  if (sceneId.startsWith('dbtype-')) {
    const key = sceneId.slice('dbtype-'.length);
    const Comp = dbTypeSceneRegistry[key];
    return Comp ? <Comp key={sceneId} /> : null;
  }

  if (sceneId.startsWith('infratype-')) {
    const key = sceneId.slice('infratype-'.length);
    const Comp = infraTypeSceneRegistry[key];
    return Comp ? <Comp key={sceneId} /> : null;
  }

  if (sceneId.startsWith('cmp-')) {
    const key = sceneId.slice('cmp-'.length);
    const d = (comparisonData as unknown as Record<string, { rows: unknown[]; columns: unknown[] }>)[key];
    if (!d) return null;
    return <ComparisonScene key={sceneId} rowCount={d.rows.length} colCount={d.columns.length} />;
  }

  return null;
}
