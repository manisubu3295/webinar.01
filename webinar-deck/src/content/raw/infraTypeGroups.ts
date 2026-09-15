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
  }
] as const;
