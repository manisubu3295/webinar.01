import {
  siReact,
  siAngular,
  siVuedotjs,
  siSvelte,
  siNextdotjs,
  siOpenjdk,
  siDotnet,
  siPython,
  siNodedotjs,
  siGo,
  siPhp,
  siPostgresql,
  siMysql,
  siMongodb,
  siRedis,
  siLinux,
  siKubernetes,
  siRedhatopenshift,
  siApachetomcat,
  siJenkins,
  siGithubactions,
  siGitlab,
  siCircleci,
  siDrone,
  siGit,
  siGithub,
  siBitbucket,
  siJira,
  siGrafana,
  siDatadog,
  siNewrelic,
  siGraylog,
  siElastic,
  siSplunk,
  siPostman,
  siSwagger,
  siVault,
  siSonarqubeserver,
} from 'simple-icons';

// Real, official brand marks — bundled locally at build time (simple-icons
// is an installed dependency, not a runtime CDN fetch), so this stays
// fully offline-safe like the rest of the deck. A handful of named items
// have no mark in simple-icons at all (mssql, oracle, aws, azure, jboss,
// and Slack — verified during implementation, not guessed) and fall back
// to no logo.
const LOGO_BY_ITEM_KEY: Record<string, { path: string; hex: string; title: string }> = {
  react: siReact,
  angular: siAngular,
  vue: siVuedotjs,
  svelte: siSvelte,
  nextjs: siNextdotjs,
  java: siOpenjdk,
  csharp: siDotnet,
  python: siPython,
  node: siNodedotjs,
  go: siGo,
  php: siPhp,
  postgresql: siPostgresql,
  mysql: siMysql,
  mongodb: siMongodb,
  redis: siRedis,
  linux: siLinux,
  kubernetes: siKubernetes,
  openshift: siRedhatopenshift,
  tomcat: siApachetomcat,
  // CI/CD Tools
  jenkins: siJenkins,
  githubactions: siGithubactions,
  gitlab: siGitlab,
  circleci: siCircleci,
  drone: siDrone,
  // Version Control & Collaboration (Jira grouped in here alongside Git hosting)
  git: siGit,
  github: siGithub,
  bitbucket: siBitbucket,
  jira: siJira,
  // Monitoring Tools
  grafana: siGrafana,
  datadog: siDatadog,
  newrelic: siNewrelic,
  // Logging Tools
  graylog: siGraylog,
  elastic: siElastic,
  splunk: siSplunk,
  // API Design Tools
  postman: siPostman,
  swagger: siSwagger,
  // Security Tools
  vault: siVault,
  sonarqube: siSonarqubeserver,
};

export function hasTechLogo(itemKey: string): boolean {
  return itemKey in LOGO_BY_ITEM_KEY;
}

/** One real technology logo, in its own brand color, sized to sit inline
 * next to that technology's name. Renders nothing for the handful of
 * named items with no mark in simple-icons. */
export function TechLogo({ itemKey, size = 18 }: { itemKey: string; size?: number }) {
  const icon = LOGO_BY_ITEM_KEY[itemKey];
  if (!icon) return null;
  return (
    <svg
      className="tech-logo"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={`#${icon.hex}`}
      role="img"
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );
}
