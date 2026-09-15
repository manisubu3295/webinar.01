// Auto-extracted from AAMEC_Session01_3D_WebApp.html — do not hand-edit,
// re-run extract-content.js against the source deck if it changes upstream.

export const infraTypeGroups = [
  {
    key: 'os',
    title: 'Operating System',
    tagline: "Everything else in this section runs on top of this layer. Almost always Linux, in production.",
    explanation: "The operating system manages hardware, processes, and files underneath everything else you deploy. In production, this is overwhelmingly Linux \u2014 free, stable, and the default target for nearly every deployment tool in this deck.",
    example: "Your Kubernetes nodes, your database server, and your CI/CD runners are all, almost certainly, Linux machines underneath.",
    whenToUse: "You don't really choose this one per-project \u2014 you choose a distribution once for your organization and standardize on it.",
    items: ['linux']
  },
  {
    key: 'cloud',
    title: 'Cloud Providers',
    tagline: "Rented infrastructure, billed by the hour \u2014 so you don't own or rack a single physical server.",
    explanation: "Cloud providers rent you compute, storage, and managed services instead of you buying and racking physical servers. The three major players (AWS, Azure, and Google Cloud) all offer largely equivalent building blocks under different names.",
    example: "Instead of buying a database server, you click a button and rent a fully managed one \u2014 backups, patching, and failover handled for you.",
    whenToUse: "Almost every new project today starts here rather than with owned hardware, unless data residency or cost at massive scale argues otherwise.",
    items: ['aws','azure']
  },
  {
    key: 'orchestration',
    title: 'Container & Orchestration',
    tagline: "Runs many containers across many machines, and keeps them running.",
    explanation: "Once your app is packaged as a container, you still need something to decide which machine runs which container, restart failed ones, and route traffic. That's what an orchestrator does.",
    example: "If a server hosting 3 of your containers crashes at 2 a.m., the orchestrator reschedules them onto healthy machines automatically, before anyone gets paged.",
    whenToUse: "Once you have more than a handful of services, or need automatic scaling and self-healing you don't want to build by hand.",
    items: ['kubernetes','openshift']
  },
  {
    key: 'appserver',
    title: 'Application Servers',
    tagline: "The runtime that actually hosts a Java web application and handles incoming requests.",
    explanation: "A Java web application doesn't run on its own \u2014 it needs a servlet container or full application server to load it, manage its lifecycle, and hand it incoming HTTP requests.",
    example: "The same billing-api.war file can run on either Tomcat or JBoss \u2014 the choice is about which extra enterprise features (messaging, clustering) you actually need.",
    whenToUse: "Whenever you're deploying a traditional Java web application (WAR/EAR) rather than a self-contained runnable jar.",
    items: ['tomcat','jboss']
  },
  {
    key: 'cicd',
    title: 'CI/CD Tools',
    tagline: "The concrete products behind the CI/CD Pipeline idea — an automatic checklist that tests and ships every code change.",
    explanation: "CI/CD Pipeline (earlier in this module) is the idea; these are the real products teams actually run to do it — each defines the same lint/test/build/deploy stages, just in its own config format and hosting model.",
    example: "A team choosing between Jenkins and GitHub Actions is really choosing between running their own server (Jenkins) and using the one already built into wherever their code already lives (GitHub Actions).",
    whenToUse: "Jenkins or GitLab for a self-hosted, highly customizable setup; GitHub Actions or CircleCI when the code already lives on that platform and a separate server is overhead nobody wants to run.",
    items: ['jenkins','githubactions','gitlab','circleci','drone']
  },
  {
    key: 'vcs',
    title: 'Version Control & Collaboration',
    tagline: "The tools a team uses to change code together without overwriting each other — and to review that change before it ships.",
    explanation: "Git tracks every change; GitHub and Bitbucket host that history and add the pull-request workflow — propose a change, get it reviewed, merge it — on top.",
    example: "The \"branch to merge\" story told in Module 5's Build & Testing segment is this category in practice: a real pull request, reviewed and merged, with tests running against it automatically.",
    whenToUse: "Git itself is not optional — GitHub is the default choice for most teams; Bitbucket is the natural pick specifically when a team is already standardized on Jira.",
    items: ['git','github','bitbucket']
  },
  {
    key: 'pm',
    title: 'Project Management',
    tagline: "Where a requirement from Module 1 actually becomes a tracked, assigned piece of work.",
    explanation: "A ticket tracker turns a vague requirement into something with an owner, a status, and a link to the code that resolved it — the connective tissue between Module 1's interviews and Module 5's pull requests.",
    example: "\"Handle returns\", the requirement surfaced back in Module 1's interview, becomes a real ticket a developer picks up, works, and links a pull request to.",
    whenToUse: "Jira for most teams past a handful of people; Trello when a board is genuinely all a small team needs; Confluence alongside either one for the documentation this deck's last review flagged as missing.",
    items: ['jira','trello','confluence']
  },
  {
    key: 'monitoring',
    title: 'Monitoring Tools',
    tagline: "The concrete products behind the Monitoring idea — a checkup that runs every second, not once a year.",
    explanation: "Monitoring (earlier in this module) is the idea; these are the real products, splitting into an open-source pairing you run yourself (Prometheus storing the numbers, Grafana drawing the dashboard) and commercial all-in-one platforms.",
    example: "A team running its own Kubernetes cluster very often pairs Prometheus and Grafana specifically because Prometheus is already the default metrics store for Kubernetes itself.",
    whenToUse: "Prometheus + Grafana when a team is comfortable running and connecting open-source tools themselves; Datadog or New Relic when the budget exists to pay for one product that already does all of it.",
    items: ['grafana','prometheus','datadog','newrelic']
  },
  {
    key: 'logging',
    title: 'Logging Tools',
    tagline: "Every service's logs, searchable from one place, instead of SSH-ing into each server to read a file.",
    explanation: "Once a system has more than one server, \"check the log file\" stops working — these tools centralize every service's logs into one searchable place instead.",
    example: "A failing payment integration is far faster to diagnose searching \"service:billing-api level:ERROR\" in one place than SSH-ing into forty individual store servers one at a time.",
    whenToUse: "Graylog or the Elastic Stack for an open-source, self-hosted setup; Splunk specifically when compliance and audit-trail requirements are already driving the tooling budget.",
    items: ['graylog','elastic','splunk']
  },
  {
    key: 'api',
    title: 'API Design Tools',
    tagline: "The tools that make sure frontend and backend agree on a request/response shape before either side finishes building.",
    explanation: "Postman is where a team tries an API request by hand before any frontend code calls it for real; Swagger/OpenAPI is the written specification that describes that request/response shape precisely enough for tools to generate code from it.",
    example: "The \"Request / Response Flow\" sketch shown in this deck's own Backend Technology segment is exactly the contract these tools make explicit and testable, instead of leaving it as an assumption both sides discover mid-build.",
    whenToUse: "Postman during active development, to try requests by hand; a published OpenAPI/Swagger spec once the API is stable enough that other teams or external partners need to integrate against it.",
    items: ['postman','swagger']
  },
  {
    key: 'security',
    title: 'Security Tools',
    tagline: "Where secrets, dependency vulnerabilities, and code-quality issues actually get caught — automatically, not by hoping someone notices.",
    explanation: "Four different jobs: Vault keeps secrets out of code, SonarQube scans the code you wrote, Snyk scans the dependencies you didn't write, and Auth0 handles login/permissions so a team isn't building auth from scratch.",
    example: "Every \"TODO: replace with your real credentials\" placeholder across this module's own command playgrounds is exactly the gap Vault exists to close in a real deployment.",
    whenToUse: "All four are close to standard practice on any production system handling real customer or payment data — which describes the billing system this entire session builds.",
    items: ['vault','sonarqube','snyk','auth0']
  }
] as const;
