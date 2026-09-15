// Auto-extracted from AAMEC_Session01_3D_WebApp.html — do not hand-edit,
// re-run extract-content.js against the source deck if it changes upstream.

export const comparisonData = {
  frontend: {
    title: "Frontend Options, Side by Side",
    tagline: "All five are legitimate choices. The differences are trade-offs, not right vs. wrong.",
    columns: ["Framework","Learning Curve","Ecosystem","Performance","Best For"],
    rows: [
      ["React","Moderate","Largest","Good","Most product teams"],
      ["Angular","Steep","Large, opinionated","Good","Large enterprise teams"],
      ["Vue","Gentle","Large, growing","Good","Small-to-mid teams"],
      ["Svelte","Gentle","Smaller","Excellent","Performance-critical apps"],
      ["Next.js","Moderate","Largest (React-based)","Excellent","SEO-heavy, full-stack apps"]
    ]
  },
  backend: {
    title: "Backend Options, Side by Side",
    tagline: "Six real choices for a production billing system. None of them is objectively \u201cbest.\u201d",
    columns: ["Language","Hiring Pool","Ecosystem Fit","Performance","Ops Simplicity"],
    rows: [
      ["Java / Spring","Very Large","Excellent (enterprise)","Good","Moderate"],
      ["C# / .NET","Large","Excellent (enterprise)","Good","Moderate"],
      ["Python / Django","Very Large","Good (rapid dev)","Moderate","Good"],
      ["Node / TypeScript","Very Large","Good (JS ecosystem)","Good","Good"],
      ["Go","Growing","Good (infra tools)","Excellent","Excellent"],
      ["PHP / Laravel","Large","Good (SME / web)","Moderate","Good"]
    ]
  },
  database: {
    title: "Database Options, Side by Side",
    tagline: "Six real choices, three different shapes. Pick by how you'll query it, not by reputation.",
    columns: ["Database","Type","Consistency","Best For","Hosting Cost"],
    rows: [
      ["PostgreSQL","Relational","Strong (ACID)","Structured, correctness-critical data","Low-Moderate"],
      ["MySQL","Relational","Strong (ACID)","SME and web apps","Low"],
      ["MS SQL Server","Relational","Strong (ACID)","Windows / .NET enterprises","High (licensing)"],
      ["Oracle","Relational","Strong (ACID)","Large legacy enterprises","Very High (licensing)"],
      ["MongoDB","Document","Eventual / tunable","Flexible, evolving data shapes","Low-Moderate"],
      ["Redis","Key-Value","N/A (cache)","Caching, sessions","Low"]
    ]
  },
  architecture: {
    title: "Architecture Shapes, Side by Side",
    tagline: "The hard constraint should pick the shape \u2014 not habit, and not what's trending.",
    columns: ["Shape","Team Size Fit","Deploy Complexity","Fault Isolation","Ops Cost"],
    rows: [
      ["Monolith","Small (1\u20135)","Very Low","None (all-or-nothing)","Very Low"],
      ["Modular Monolith","Small\u2013Medium","Low","Partial (logical only)","Low"],
      ["Microservices","Large (multi-team)","High","Strong","High"],
      ["Hybrid (ours)","Small\u2013Medium","Moderate","Strong (per-store)","Moderate"]
    ]
  },
  infra: {
    title: "Infrastructure & Cloud, Side by Side",
    tagline: "Seven real building blocks across four layers \u2014 pick per-layer, not all-or-nothing.",
    columns: ["Technology","Category","Best For","Operational Complexity"],
    rows: [
      ["Linux","Operating System","Nearly all production servers","Low-Moderate"],
      ["AWS","Cloud Provider","Broadest service catalog","Moderate-High"],
      ["Azure","Cloud Provider",".NET / Windows-heavy shops","Moderate-High"],
      ["Kubernetes","Orchestration","Multi-service, auto-scaling deployments","High"],
      ["OpenShift","Orchestration","Enterprise Kubernetes with support","High"],
      ["Tomcat","Application Server","Simple Java web apps","Low"],
      ["JBoss / WildFly","Application Server","Full Java EE enterprise apps","Moderate"]
    ]
  }
} as const;
