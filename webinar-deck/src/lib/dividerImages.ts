// Hero illustrations for the title slide and each of the 8 module
// dividers — one consistent visual family (navy/steel-blue/amber
// explainer style) generated externally and dropped into
// public/images/dividers/. Keyed by the same `seg` every divider slide
// already carries.
export const titleCoverImage = '/images/dividers/title-cover.png';

export const dividerImageBySeg: Record<string, string> = {
  '1': '/images/dividers/divider-01-requirement-gathering.png',
  '2': '/images/dividers/divider-02-technology-selection.png',
  '3': '/images/dividers/divider-03-database.png',
  '4': '/images/dividers/divider-04-architecture.png',
  '5': '/images/dividers/divider-05-build-testing.png',
  '6': '/images/dividers/divider-06-devops-infrastructure.png',
  '7': '/images/dividers/divider-07-closing.png',
  '8': '/images/dividers/divider-08-live-qa.png',
};

// Anchor (segment-intro) hero illustrations, keyed by the anchor's own
// id (anchorSlides.ts). Slide-3 and slide-12 deliberately reuse the
// matching divider image (same content, no need for a near-duplicate);
// slide-8 (Architecture) keeps its 3D scene per slideMeta.ts.
export const anchorImageByAnchorId: Record<string, string> = {
  'slide-2': '/images/anchors/anchor-02-introduction.png',
  'slide-3': dividerImageBySeg['1'],
  'slide-4': '/images/anchors/anchor-04-frontend.png',
  'slide-5': '/images/anchors/anchor-05-backend.png',
  'slide-6': '/images/anchors/anchor-06-how-to-choose.png',
  'slide-7': '/images/anchors/anchor-07-three-shapes.png',
  'slide-9': '/images/anchors/anchor-09-branch-to-merge.png',
  'slide-10': '/images/anchors/anchor-10-deploy-alert-rollback.png',
  'slide-11': '/images/anchors/anchor-11-faster-vs-unchanged.png',
  'slide-12': dividerImageBySeg['8'],
};

// AI Impact reflection-slide illustrations, one per content module (1-6).
export const aiImpactImageBySeg: Record<string, string> = {
  '1': '/images/ai-impact/ai-impact-01-requirement-gathering.png',
  '2': '/images/ai-impact/ai-impact-02-technology-selection.png',
  '3': '/images/ai-impact/ai-impact-03-database.png',
  '4': '/images/ai-impact/ai-impact-04-architecture.png',
  '5': '/images/ai-impact/ai-impact-05-build-testing.png',
  '6': '/images/ai-impact/ai-impact-06-devops-infrastructure.png',
};

// Career Path roadmap illustrations — one per content module (1-6),
// plus the module-7 full-stack capstone roadmap.
export const careerPathImageBySeg: Record<string, string> = {
  '1': '/images/career/career-01-requirement-gathering.png',
  '2': '/images/career/career-02-technology-selection.png',
  '3': '/images/career/career-03-database.png',
  '4': '/images/career/career-04-architecture.png',
  '5': '/images/career/career-05-build-testing.png',
  '6': '/images/career/career-06-devops-infrastructure.png',
  '7': '/images/career/career-07-fullstack-roadmap.png',
};
