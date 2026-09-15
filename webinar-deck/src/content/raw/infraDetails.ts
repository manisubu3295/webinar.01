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
  }
} as const;
