// Which items belong to each expandable group, how each item should be
// rendered, and the display title for the group. Mirrors the original
// deck's groupItems / groupType / groupTitle tables exactly.

export const groupItems = {
  gather: ['interview', 'observation', 'docstudy', 'prototype', 'workshop'],
  frontend: ['react', 'angular', 'vue', 'svelte', 'nextjs'],
  backend: ['java', 'csharp', 'python', 'node', 'go', 'php'],
  choose: ['hire', 'teamskill', 'ecosystem', 'operate', 'apidesign'],
  database: ['postgresql', 'mysql', 'mssql', 'oracle', 'mongodb', 'redis'],
  architecture: ['monolith', 'modular', 'microservices', 'hybrid'],
  testing: ['unit', 'integration', 'concurrency', 'security', 'documentation', 'performance', 'accessibility'],
  devops: ['cicd', 'monitoring', 'rollback', 'maintenance'],
  infra: [
    'linux', 'aws', 'azure', 'kubernetes', 'openshift', 'tomcat', 'jboss',
    'jenkins', 'githubactions', 'gitlab', 'circleci', 'drone',
    'git', 'github', 'bitbucket',
    'jira', 'trello', 'confluence',
    'grafana', 'prometheus', 'datadog', 'newrelic',
    'graylog', 'elastic', 'splunk',
    'postman', 'swagger',
    'vault', 'sonarqube', 'snyk', 'auth0',
  ],
} as const;

export type GroupKey = keyof typeof groupItems;

export const groupType: Record<GroupKey, 'concept' | 'code' | 'database' | 'infra'> = {
  gather: 'concept',
  frontend: 'code',
  backend: 'code',
  choose: 'concept',
  database: 'database',
  architecture: 'concept',
  testing: 'concept',
  devops: 'concept',
  infra: 'infra',
};

export const groupTitle: Record<GroupKey, string> = {
  gather: 'Requirement Gathering',
  frontend: 'Frontend Technology',
  backend: 'Backend Technology',
  choose: 'How to Choose',
  database: 'Database Technology',
  architecture: 'Architecture Shapes',
  testing: 'Testing',
  devops: 'DevOps',
  infra: 'Infrastructure & Cloud',
};

// Groups whose sub-items don't repeat the group name in the breadcrumb sub-label
// (the module name alone is enough context for these).
export const redundantSubGroups = new Set<GroupKey>(['gather', 'testing', 'architecture']);

// Groups that get a "side by side" comparison table + grid scene after their items.
export const comparisonGroups = new Set<GroupKey>(['frontend', 'backend', 'database', 'architecture']);
