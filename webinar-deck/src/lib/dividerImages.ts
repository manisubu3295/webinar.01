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
