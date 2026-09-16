// Auto-extracted from AAMEC_Session01_3D_WebApp.html — do not hand-edit,
// re-run extract-content.js against the source deck if it changes upstream.

export const infraDetails = {
  linux: {
    name: "Linux",
    tagline: "The operating system nearly all production servers run on \u2014 free, stable, and infinitely configurable.",
    whatIsIt: "A free, open-source operating system running the vast majority of the world's servers — from tiny cloud instances to the world's fastest supercomputers.",
    realExample: "Nearly every website you've ever visited, including Google, Amazon, and Netflix, is served from Linux machines running in a data center somewhere.",
    steps: [
      "Choose a distribution suited to production: Ubuntu Server or Debian for simplicity, RHEL/Rocky for enterprise support contracts",
      "Manage services with systemd: systemctl start / stop / enable",
      "Use a package manager (apt, or yum/dnf) to install and update software",
      "Set up a firewall (ufw or firewalld) and keep the system patched"
    ],
    structureLabel: "Common directory layout",
    folder:
`/etc/            configuration files
/var/log/        system and app logs
/opt/            third-party applications
/home/           user directories
/usr/local/bin/  custom scripts and binaries`,
    code:
`systemctl status billing-api

<span class="code-placeholder"># TODO: point this at your real service name</span>`,
    commands: [
      { label: "Check running services", command: "systemctl list-units --type=service --state=running", response: "billing-api.service    loaded active running\nnginx.service           loaded active running\npostgresql.service     loaded active running" },
      { label: "Check disk usage", command: "df -h", response: "Filesystem   Size  Used Avail Use% Mounted on\n/dev/sda1     50G   32G   18G  64% /" }
    ]
  },
  aws: {
    name: "AWS",
    tagline: "The largest cloud provider. If a service exists, AWS probably has it \u2014 the challenge is knowing which one to use.",
    whatIsIt: "Amazon's cloud computing platform — rents servers, databases, storage, and hundreds of other services by the hour, instead of buying physical hardware.",
    realExample: "Netflix runs almost entirely on AWS, streaming to over 200 million subscribers without owning a single server of its own.",
    steps: [
      "Start with EC2 (virtual servers) or Elastic Beanstalk (managed app hosting) for a simple deploy",
      "Use RDS for a managed PostgreSQL or MySQL database instead of running your own",
      "Store files in S3, not on the server's local disk",
      "Set up IAM roles with least-privilege access from day one"
    ],
    structureLabel: "Typical resource layout",
    folder:
`VPC/
  EC2 instances (billing-api)
  RDS (PostgreSQL)
  S3 buckets (invoice PDFs)
  IAM roles & policies
  CloudWatch (logs & alarms)`,
    code:
`aws ec2 describe-instances

<span class="code-placeholder"># TODO: point this at your real AWS account/region</span>`,
    commands: [
      { label: "List EC2 instance states", command: "aws ec2 describe-instances --query 'Reservations[].Instances[].State.Name'", response: ["running","running","stopped"] },
      { label: "Check S3 bucket contents", command: "aws s3 ls s3://billing-invoices/", response: "2026-09-18 10:32:00   4213 INV-00123.pdf\n2026-09-18 10:35:00   3890 INV-00124.pdf" }
    ]
  },
  azure: {
    name: "Azure",
    tagline: "Microsoft's cloud platform \u2014 the natural fit if you're already running .NET or a Windows-based enterprise stack.",
    whatIsIt: "Microsoft's cloud computing platform — similar building blocks to AWS, with strong integration for companies already on Windows, Office 365, or .NET.",
    realExample: "Walmart runs significant parts of its e-commerce infrastructure on Azure, partly to avoid depending on its retail rival Amazon's AWS.",
    steps: [
      "Start with App Service for a managed way to run your app without touching a VM",
      "Use Azure SQL Database or Azure Database for PostgreSQL for a managed database",
      "Store files in Blob Storage",
      "Manage access with Azure Active Directory and role assignments"
    ],
    structureLabel: "Typical resource layout",
    folder:
`Resource Group/
  App Service (billing-api)
  Azure SQL Database
  Blob Storage (invoice PDFs)
  Azure Monitor (logs & alerts)`,
    code:
`az webapp show --name billing-api --query state

<span class="code-placeholder"># TODO: point this at your real Azure subscription</span>`,
    commands: [
      { label: "List resource groups", command: "az group list --output table", response: "Name              Location\nbilling-rg        eastus" },
      { label: "Check app service status", command: "az webapp show --name billing-api --query state", response: "\"Running\"" }
    ]
  },
  kubernetes: {
    name: "Kubernetes",
    tagline: "Runs and manages containers across many machines \u2014 restarting failed ones, scaling under load, and routing traffic automatically.",
    whatIsIt: "Runs and manages containers across a cluster of machines — restarting failed ones, scaling up under load, and routing traffic to healthy instances.",
    realExample: "Spotify runs its backend services on Kubernetes, letting hundreds of independent engineering teams deploy without stepping on each other.",
    steps: [
      "Package your app as a container image with Docker first",
      "Define a Deployment (how many copies to run) and a Service (how traffic reaches them)",
      "Use a ConfigMap or Secret for configuration instead of hardcoding it into the image",
      "Let Kubernetes handle restarts, scaling, and rolling updates for you"
    ],
    structureLabel: "Manifest layout",
    folder:
`k8s/
  deployment.yaml
  service.yaml
  configmap.yaml
  secret.yaml
  ingress.yaml`,
    code:
`apiVersion: apps/v1
kind: Deployment
metadata:
  name: billing-api
spec:
  replicas: 3
  <span class="code-placeholder"># TODO: point this at your real container image</span>`,
    commands: [
      { label: "Get running pods", command: "kubectl get pods", response: "NAME                READY   STATUS    RESTARTS\nbilling-api-7d9f8   1/1     Running   0\nbilling-api-8a2c1   1/1     Running   0" },
      { label: "Check rollout status", command: "kubectl rollout status deployment/billing-api", response: "deployment \"billing-api\" successfully rolled out" }
    ]
  },
  openshift: {
    name: "OpenShift",
    tagline: "Red Hat's enterprise Kubernetes platform \u2014 adds developer tooling, stricter security defaults, and support contracts on top of plain Kubernetes.",
    whatIsIt: "Red Hat's enterprise version of Kubernetes — developer tooling, stricter security defaults, and a paid support contract on top of the open-source project.",
    realExample: "Many banks and government agencies choose OpenShift over plain Kubernetes specifically because it comes with a support contract and compliance certifications they are legally required to have.",
    steps: [
      "Everything in plain Kubernetes still applies \u2014 OpenShift runs real Kubernetes underneath",
      "Use oc new-app to build and deploy directly from source, without hand-writing YAML first",
      "Routes replace plain Kubernetes Ingress for exposing services externally",
      "Expect stricter default security contexts than vanilla Kubernetes"
    ],
    structureLabel: "Manifest layout",
    folder:
`openshift/
  deploymentconfig.yaml
  route.yaml
  buildconfig.yaml`,
    code:
`oc new-app billing-api --image-stream=billing-api:latest

<span class="code-placeholder"># TODO: point this at your real OpenShift project</span>`,
    commands: [
      { label: "List projects", command: "oc get projects", response: "NAME           DISPLAY NAME    STATUS\nbilling-prod                   Active" },
      { label: "Check build status", command: "oc get builds", response: "NAME              STATUS\nbilling-api-3     Complete" }
    ]
  },
  tomcat: {
    name: "Tomcat",
    tagline: "A lightweight Java servlet container. Runs Java web apps packaged as WAR files \u2014 simpler than a full application server.",
    whatIsIt: "A lightweight server for Java web apps packaged as WAR files — simpler than a full application server, handling just the essentials.",
    realExample: "Many mid-sized Java web applications, like internal enterprise tools and university systems, run on Tomcat because it's free, simple, and good enough for their scale.",
    steps: [
      "Package your Java web app as a .war file",
      "Drop it into Tomcat's webapps/ directory, or deploy via the manager UI",
      "Configure server.xml for ports, connectors, and virtual hosts",
      "Tune JVM heap size and thread pool for your expected load"
    ],
    structureLabel: "Install layout",
    folder:
`tomcat/
  webapps/
    billing-api.war
  conf/
    server.xml
    context.xml
  logs/
    catalina.out`,
    code:
`systemctl status tomcat

<span class="code-placeholder"># TODO: point this at your real Tomcat instance</span>`,
    commands: [
      { label: "Check Tomcat status", command: "systemctl status tomcat", response: "active (running) since Thu 2026-09-18 09:00:00" },
      { label: "Tail application logs", command: "tail -f logs/catalina.out", response: "18-Sep-2026 10:32:01 INFO [main] Starting ProtocolHandler [\"http-nio-8080\"]" }
    ]
  },
  jboss: {
    name: "JBoss / WildFly",
    tagline: "A full Java EE application server \u2014 more built-in features than Tomcat (messaging, transactions, clustering), common in large enterprise Java shops.",
    whatIsIt: "A full Java EE application server with built-in messaging, transactions, and clustering — more capable than Tomcat when those enterprise features are needed.",
    realExample: "Large enterprise systems that need guaranteed message delivery, like insurance claim processing pipelines, often run on JBoss for its built-in transaction and messaging support.",
    steps: [
      "Deploy your app by dropping a .war or .ear file into standalone/deployments/",
      "Configure standalone.xml for data sources, connection pools, and messaging",
      "Use the built-in admin console or CLI (jboss-cli.sh) for management",
      "Enable clustering mode for high availability across multiple nodes"
    ],
    structureLabel: "Install layout",
    folder:
`jboss/
  standalone/
    deployments/
      billing-api.war
    configuration/
      standalone.xml
    log/
      server.log`,
    code:
`jboss-cli.sh -c ':read-attribute(name=server-state)'

<span class="code-placeholder"># TODO: point this at your real JBoss instance</span>`,
    commands: [
      { label: "Check server status", command: "jboss-cli.sh -c ':read-attribute(name=server-state)'", response: "\"running\"" },
      { label: "List deployments", command: "jboss-cli.sh -c 'deployment-info'", response: "NAME              RUNTIME-NAME       STATE\nbilling-api.war   billing-api.war    OK" }
    ]
  },

  // ---- CI/CD Tools ----
  jenkins: {
    name: "Jenkins",
    tagline: "The oldest and still most-installed CI/CD server — free, endlessly pluggable, and still what a lot of large enterprises run.",
    whatIsIt: "A free, open-source automation server that runs a pipeline of build/test/deploy steps every time code changes, configured through either its UI or a Jenkinsfile checked into the repo.",
    realExample: "LinkedIn and Netflix both ran large-scale Jenkins deployments for years before layering newer tools on top of it.",
    structureLabel: "Pipeline layout",
    folder:
`billing-api/
  Jenkinsfile
  src/
  Dockerfile`,
    code:
`jenkins-cli build billing-api-pipeline

<span class="code-placeholder"># TODO: point this at your real Jenkins server</span>`,
    commands: [
      { label: "Trigger a build", command: "jenkins-cli build billing-api-pipeline", response: "Started build #142 for billing-api-pipeline" },
      { label: "Check build status", command: "jenkins-cli console billing-api-pipeline -f", response: "Finished: SUCCESS" }
    ]
  },
  githubactions: {
    name: "GitHub Actions",
    tagline: "CI/CD built directly into GitHub — a workflow file in the repo is the entire pipeline, no separate server to run.",
    whatIsIt: "GitHub's own CI/CD system — YAML workflow files stored right in the repository trigger on events like a push or a pull request, with no separate server to install or maintain.",
    realExample: "GitHub itself, along with a huge share of open-source projects on the platform, runs its own CI entirely on GitHub Actions.",
    structureLabel: "Workflow layout",
    folder:
`.github/
  workflows/
    ci.yml
    deploy.yml`,
    code:
`name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    <span class="code-placeholder"># TODO: point this at your real test command</span>`,
    commands: [
      { label: "List recent workflow runs", command: "gh run list --workflow=ci.yml", response: "completed  success  CI  main  #142" },
      { label: "Watch a run in progress", command: "gh run watch", response: "✓ test\n✓ build\n✓ deploy" }
    ]
  },
  gitlab: {
    name: "GitLab",
    tagline: "One platform for source control and CI/CD together — a .gitlab-ci.yml file runs pipelines without any extra tool.",
    whatIsIt: "A single platform combining Git hosting, issue tracking, and CI/CD — pipelines are defined in one YAML file and run automatically on every push, with no separate CI server needed.",
    realExample: "GitLab itself, and companies like Siemens, run their entire software delivery process on self-hosted GitLab instances.",
    structureLabel: "Pipeline layout",
    folder:
`billing-api/
  .gitlab-ci.yml
  src/`,
    code:
`stages: [test, build, deploy]

<span class="code-placeholder"># TODO: point this at your real GitLab project</span>`,
    commands: [
      { label: "List pipelines", command: "glab ci list", response: "#88  passed  main  billing-api" },
      { label: "View pipeline status", command: "glab ci status", response: "Pipeline #88: passed" }
    ]
  },
  circleci: {
    name: "CircleCI",
    tagline: "A hosted CI/CD service built for speed — parallel test splitting and caching are first-class, not bolted on.",
    whatIsIt: "A cloud-hosted CI/CD service configured through one YAML file, known for fast parallel test runs and aggressive caching of dependencies between builds.",
    realExample: "Coinbase and Samsung both use CircleCI to run large parallelized test suites across their engineering teams.",
    structureLabel: "Config layout",
    folder:
`.circleci/
  config.yml`,
    code:
`version: 2.1
jobs:
  test:
    <span class="code-placeholder"># TODO: point this at your real test job</span>`,
    commands: [
      { label: "Trigger a pipeline", command: "circleci pipeline trigger", response: "Pipeline triggered: #221" },
      { label: "Check job status", command: "circleci status", response: "test: success\nbuild: success" }
    ]
  },
  drone: {
    name: "Drone",
    tagline: "A lightweight, container-native CI/CD server — every pipeline step runs inside its own Docker container.",
    whatIsIt: "An open-source CI/CD server where every single pipeline step runs inside its own container, defined in one .drone.yml file checked into the repo.",
    realExample: "Several self-hosted engineering teams choose Drone specifically because it's small enough to run and maintain themselves, unlike a full Jenkins install.",
    structureLabel: "Pipeline layout",
    folder:
`billing-api/
  .drone.yml
  src/`,
    code:
`kind: pipeline
type: docker
steps:
  - name: test
    <span class="code-placeholder"># TODO: point this at your real test image</span>`,
    commands: [
      { label: "List builds", command: "drone build ls billing-api", response: "142  success  main" },
      { label: "View build log", command: "drone log billing-api 142", response: "+ npm test\n  ✓ 24 passing" }
    ]
  },

  // ---- Version Control & Collaboration ----
  git: {
    name: "Git",
    tagline: "The version control system almost everything else in this category assumes you're already using.",
    whatIsIt: "A distributed version control system that tracks every change to a codebase, letting many people work on the same project in parallel without overwriting each other's work.",
    realExample: "Every company in this deck's own comparison tables — from Facebook to Netflix — uses Git; it's the one constant underneath all of them.",
    structureLabel: "The pull-request workflow",
    folder:
`billing-api/
  .git/
  src/
  README.md`,
    code:
`git checkout -b feature/returns-flow
git commit -m "Add returns endpoint"
git push origin feature/returns-flow

<span class="code-placeholder"># TODO: open a pull request from here</span>`,
    commands: [
      { label: "Check branch status", command: "git status", response: "On branch feature/returns-flow\nnothing to commit, working tree clean" },
      { label: "View commit history", command: "git log --oneline -3", response: "a3f21c9 Add returns endpoint\n7b8e0d1 Fix tax rounding\n02c9a44 Initial billing-api commit" }
    ]
  },
  github: {
    name: "GitHub",
    tagline: "The place Git repositories actually live for most teams — plus pull requests, code review, and CI, all in one place.",
    whatIsIt: "A hosting platform for Git repositories that adds pull requests, code review, issue tracking, and CI/CD (GitHub Actions) on top of plain Git.",
    realExample: "GitHub hosts the source code for millions of companies, including this deck's own comparison-table names — React, Kubernetes, and PostgreSQL are all developed in the open on GitHub.",
    structureLabel: "Repository layout",
    folder:
`github.com/org/billing-api/
  pulls/
  actions/
  issues/`,
    code:
`gh pr create --title "Add returns endpoint" --body "..."

<span class="code-placeholder"># TODO: point this at your real repository</span>`,
    commands: [
      { label: "List open pull requests", command: "gh pr list", response: "#42  Add returns endpoint  feature/returns-flow" },
      { label: "Check PR review status", command: "gh pr status", response: "✓ Approved by 1 reviewer" }
    ]
  },
  bitbucket: {
    name: "Bitbucket",
    tagline: "Atlassian's Git hosting platform — the natural pairing when a team already lives in Jira.",
    whatIsIt: "A Git repository host from Atlassian, built to integrate tightly with Jira and Confluence — a pull request can link directly to the Jira ticket it resolves.",
    realExample: "Teams already standardized on Jira for project tracking often choose Bitbucket specifically for that tight, built-in integration between a PR and its ticket.",
    structureLabel: "Repository layout",
    folder:
`bitbucket.org/org/billing-api/
  pull-requests/
  pipelines/`,
    code:
`git push origin feature/returns-flow

<span class="code-placeholder"># TODO: point this at your real Bitbucket workspace</span>`,
    commands: [
      { label: "List pull requests", command: "bb pr list", response: "#17  Add returns endpoint  OPEN" },
      { label: "Check pipeline status", command: "bb pipeline status", response: "✓ build-and-test: SUCCESSFUL" }
    ]
  },

  // ---- Project Management ----
  jira: {
    name: "Jira",
    tagline: "The industry-default issue tracker — the ticket a developer picks up almost always started life here.",
    whatIsIt: "An issue and project tracker where a requirement becomes a ticket, gets assigned, moves through a workflow (To Do, In Progress, Done), and links directly to the code that resolved it.",
    realExample: "Spotify and eBay both run large parts of their engineering workflow through Jira, from the original ticket to the linked pull request.",
    structureLabel: "Ticket layout",
    folder:
`BILL-142/
  description
  linked PR
  comments`,
    code:
`# From Module 1's interview: "handle returns"
# becomes a ticket:
BILL-142: Add return flow to billing API

<span class="code-placeholder"># TODO: link this to your real sprint board</span>`,
    commands: [
      { label: "List my open tickets", command: "jira issue list --assignee=me", response: "BILL-142  In Progress  Add return flow" },
      { label: "Move a ticket to Done", command: "jira issue move BILL-142 Done", response: "BILL-142 moved to Done" }
    ]
  },
  // ---- Monitoring Tools ----
  grafana: {
    name: "Grafana",
    tagline: "Turns metrics from Prometheus or almost anywhere else into the dashboards a team actually watches.",
    whatIsIt: "An open-source dashboarding tool that turns metrics — from Prometheus, a database, or almost any other source — into the live charts and alerts a team actually keeps open.",
    realExample: "Grafana's own published case studies include Bloomberg and PayPal using it to watch exactly this kind of production metric in real time.",
    structureLabel: "Dashboard layout",
    folder:
`grafana/
  dashboards/
    billing-latency.json
  alerts/
    error-rate.yml`,
    code:
`# A Grafana panel query, not a code file:
rate(http_requests_total{job="billing-api"}[5m])

<span class="code-placeholder"># TODO: point this at your real metrics source</span>`,
    commands: [
      { label: "List dashboards", command: "grafana-cli dashboards list", response: "Billing API Latency\nError Rate by Store" },
      { label: "Check alert status", command: "grafana-cli alerts status", response: "error-rate: OK" }
    ]
  },
  datadog: {
    name: "Datadog",
    tagline: "A commercial, all-in-one monitoring platform — metrics, logs, and traces in one dashboard, no separate tools to wire together.",
    whatIsIt: "A paid, hosted monitoring platform that combines metrics, logs, and distributed tracing in one product — the trade-off for not having to run and connect Prometheus, Grafana, and a log store yourself.",
    realExample: "Peloton and Samsung both use Datadog to watch infrastructure health across hundreds of services from one dashboard.",
    structureLabel: "Config layout",
    folder:
`datadog/
  datadog.yaml
  conf.d/
    billing-api.yaml`,
    code:
`# A Datadog monitor definition:
query: "avg(last_5m):avg:billing.latency{*} > 500"

<span class="code-placeholder"># TODO: point this at your real service tag</span>`,
    commands: [
      { label: "Check monitor status", command: "dog monitor show billing-latency", response: "Status: OK" },
      { label: "Search recent logs", command: "dog logs search \"service:billing-api status:error\"", response: "3 matching log lines" }
    ]
  },
  newrelic: {
    name: "New Relic",
    tagline: "One of the original application-performance-monitoring tools — traces a single request across every service it touches.",
    whatIsIt: "An application performance monitoring (APM) platform that traces a single request end-to-end across every service and database call it touches, pinpointing exactly where time was spent.",
    realExample: "GitHub itself has published how it uses New Relic to trace slow requests across its own service boundaries.",
    structureLabel: "Config layout",
    folder:
`newrelic/
  newrelic.yml`,
    code:
`# A New Relic transaction trace, not a code file:
GET /api/invoices/:id — 412ms
  → billing-db query — 380ms

<span class="code-placeholder"># TODO: point this at your real app name</span>`,
    commands: [
      { label: "Check app health", command: "newrelic apm application get --name billing-api", response: "Health: green" },
      { label: "List recent slow transactions", command: "newrelic apm transaction list --slow", response: "GET /api/invoices/:id — 412ms" }
    ]
  },

  // ---- Logging Tools ----
  graylog: {
    name: "Graylog",
    tagline: "Open-source, centralized log management — every service's logs land in one searchable place instead of scattered server files.",
    whatIsIt: "An open-source platform that collects logs from every service into one place and makes them searchable — instead of SSH-ing into each server individually to tail a file.",
    realExample: "Graylog's own customer list includes companies like SAP and Cisco using it to centralize logs across large, multi-service deployments.",
    structureLabel: "Stream layout",
    folder:
`graylog/
  streams/
    billing-api-errors
  inputs/
    syslog-udp`,
    code:
`# A Graylog search query, not a code file:
service:billing-api AND level:ERROR

<span class="code-placeholder"># TODO: point this at your real log stream</span>`,
    commands: [
      { label: "Search recent errors", command: "graylog search \"service:billing-api level:ERROR\"", response: "3 matches in the last hour" },
      { label: "List active streams", command: "graylog streams list", response: "billing-api-errors\nbilling-api-access" }
    ]
  },
  elastic: {
    name: "Elastic Stack (ELK)",
    tagline: "Elasticsearch stores and searches logs, Kibana is the dashboard on top — together, the ELK stack.",
    whatIsIt: "A trio of open-source tools used together: Logstash or Filebeat ships logs in, Elasticsearch stores and indexes them for fast search, and Kibana is the dashboard a team actually looks at.",
    realExample: "Netflix and Uber both run large self-hosted Elastic Stack deployments for exactly this — centralized, searchable logs across hundreds of services.",
    structureLabel: "Index layout",
    folder:
`elastic/
  filebeat.yml
  kibana/
    dashboards/
      billing-errors.json`,
    code:
`# An Elasticsearch query, not a code file:
GET billing-api-logs/_search
{ "query": { "match": { "level": "ERROR" } } }

<span class="code-placeholder"># TODO: point this at your real index</span>`,
    commands: [
      { label: "Search logs", command: "curl -X GET \"localhost:9200/billing-api-logs/_search?q=level:ERROR\"", response: "3 hits" },
      { label: "Check cluster health", command: "curl -X GET \"localhost:9200/_cluster/health\"", response: "\"status\": \"green\"" }
    ]
  },
  splunk: {
    name: "Splunk",
    tagline: "The enterprise-standard, commercial log platform — powerful search language, and the pricing to match.",
    whatIsIt: "A commercial log management and analysis platform, common in large enterprises for its powerful search language and long history of compliance/audit use cases, at a cost that reflects it.",
    realExample: "Many banks and large enterprises run Splunk specifically for compliance and audit trails, alongside whatever tool their engineering team uses day to day.",
    structureLabel: "Index layout",
    folder:
`splunk/
  indexes/
    billing-api`,
    code:
`# A Splunk search, not a code file:
index=billing-api level=ERROR | stats count by endpoint

<span class="code-placeholder"># TODO: point this at your real index</span>`,
    commands: [
      { label: "Search recent errors", command: "splunk search \"index=billing-api level=ERROR\"", response: "3 results in the last hour" },
      { label: "Check index status", command: "splunk list index billing-api", response: "Status: enabled" }
    ]
  },

  // ---- API Design Tools ----
  postman: {
    name: "Postman",
    tagline: "The tool almost every team uses to try an API by hand before any frontend code calls it.",
    whatIsIt: "A tool for building, testing, and sharing API requests by hand — a team agrees a request/response shape and tries it in Postman before a single line of frontend code calls it for real.",
    realExample: "Postman's own numbers put its user base above 30 million developers — it's close to the default first step for trying out any new API.",
    structureLabel: "Collection layout",
    folder:
`billing-api.postman_collection.json
  Invoices/
    GET /invoices/:id
    POST /invoices`,
    code:
`GET /api/invoices/INV-00123

<span class="code-placeholder"># TODO: point this at your real API base URL</span>`,
    commands: [
      { label: "Run a saved request", command: "postman run \"GET /invoices/:id\"", response: "200 OK — 45ms" },
      { label: "Run the full collection", command: "newman run billing-api.postman_collection.json", response: "12 requests, 12 passed" }
    ]
  },
  swagger: {
    name: "Swagger / OpenAPI",
    tagline: "Documents an API's exact shape — every endpoint, every field — in a format both humans and tools can read.",
    whatIsIt: "A specification format (OpenAPI, still commonly called Swagger) for describing an API's exact shape — every endpoint, every field, every response code — readable by both a human and code-generation tools.",
    realExample: "Most public APIs you've ever integrated with, from Stripe to Twilio, publish an OpenAPI/Swagger spec so client libraries can be generated automatically from it.",
    structureLabel: "Spec layout",
    folder:
`billing-api/
  openapi.yaml`,
    code:
`paths:
  /invoices/{id}:
    get:
      responses:
        '200':
          <span class="code-placeholder"># TODO: describe your real response schema</span>`,
    commands: [
      { label: "Validate the spec", command: "swagger-cli validate openapi.yaml", response: "openapi.yaml is valid" },
      { label: "Serve interactive docs", command: "swagger-ui-watcher openapi.yaml", response: "Docs running at http://localhost:3200" }
    ]
  },

  // ---- Security Tools ----
  vault: {
    name: "HashiCorp Vault",
    tagline: "Where a real secret — a password, an API key — actually belongs instead of sitting in code.",
    whatIsIt: "A secrets-management tool that stores passwords, API keys, and certificates securely, handing them out to an app at runtime instead of letting them sit hardcoded in a config file or committed to Git.",
    realExample: "Every one of this module's own command playgrounds has a \"TODO: replace with your real...\" placeholder for credentials — Vault is the actual industry answer to where those belong instead of in code.",
    structureLabel: "Secret layout",
    folder:
`secret/
  billing-api/
    db-password
    stripe-api-key`,
    code:
`vault kv get secret/billing-api/db-password

<span class="code-placeholder"># TODO: point this at your real Vault instance</span>`,
    commands: [
      { label: "Read a secret", command: "vault kv get secret/billing-api/db-password", response: "db-password: ********" },
      { label: "Check Vault status", command: "vault status", response: "Sealed: false" }
    ]
  },
  sonarqube: {
    name: "SonarQube",
    tagline: "Scans code on every commit for bugs, security vulnerabilities, and quality issues — before a human reviewer even opens the file.",
    whatIsIt: "A code-quality and security-scanning tool that runs automatically in the CI/CD pipeline, flagging bugs, vulnerabilities, and code smells before a human reviewer even opens the pull request.",
    realExample: "Over 400,000 organizations use SonarQube, per its own published numbers, to catch exactly this class of issue automatically on every commit.",
    structureLabel: "Config layout",
    folder:
`billing-api/
  sonar-project.properties`,
    code:
`sonar.projectKey=billing-api
sonar.sources=src

<span class="code-placeholder"># TODO: point this at your real SonarQube server</span>`,
    commands: [
      { label: "Run a scan", command: "sonar-scanner", response: "ANALYSIS SUCCESSFUL" },
      { label: "Check quality gate status", command: "sonar-scanner -Dsonar.qualitygate.wait=true", response: "Quality Gate: PASSED" }
    ]
  },
} as const;
